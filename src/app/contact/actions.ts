"use server";

import { profile } from "@/data/profile";
import { clientIp, hit } from "@/lib/rate-limit";
import { validateContact, type ContactState, type ContactValues } from "@/lib/contact";

const read = (data: FormData, key: string) => {
  const v = data.get(key);
  return typeof v === "string" ? v : "";
};

export async function sendMessage(_prev: ContactState, data: FormData): Promise<ContactState> {
  // Honeypot: real visitors never fill this in.
  if (read(data, "website")) return { status: "success", message: "Message sent." };

  const values: ContactValues = {
    name: read(data, "name"),
    email: read(data, "email"),
    subject: read(data, "subject"),
    message: read(data, "message"),
  };

  // 5 messages per hour per visitor keeps the Resend quota safe from scripted spam.
  if (hit(`contact:${await clientIp()}`, 5, 60 * 60 * 1000) > 0) {
    return { status: "error", message: "You've sent a few messages already. Please try again later.", values };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Fix the errors below and try again.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;

  if (!apiKey || !from) {
    return {
      status: "unavailable",
      message: `The contact form isn't connected to an email service yet, so your message was not sent. Email ${profile.email} directly instead.`,
      values,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: values.email.trim(),
        subject: `[Portfolio] ${values.subject.replace(/[\r\n]+/g, " ").trim()}`,
        text: `From: ${values.name.trim()} <${values.email.trim()}>\n\n${values.message.trim()}`,
      }),
    });
    if (!res.ok) {
      console.error("Contact form: Resend responded", res.status, await res.text());
      return {
        status: "error",
        message: `Your message couldn't be sent. Try again, or email ${profile.email} directly.`,
        values,
      };
    }
  } catch (err) {
    console.error("Contact form: request failed", err);
    return {
      status: "error",
      message: `Couldn't reach the email service. Try again, or email ${profile.email} directly.`,
      values,
    };
  }

  return { status: "success", message: "Thanks. Your message is on its way and I'll reply soon." };
}
