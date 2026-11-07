export type ContactField = "name" | "email" | "subject" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactLimits = { name: 80, email: 120, subject: 120, message: 4000 } as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Enter your name.";
  else if (name.length > contactLimits.name) errors.name = `Keep your name under ${contactLimits.name} characters.`;

  if (!email) errors.email = "Enter your email address.";
  else if (!emailPattern.test(email) || email.length > contactLimits.email)
    errors.email = "Enter a valid email address, like name@example.com.";

  if (!subject) errors.subject = "Add a short subject.";
  else if (subject.length > contactLimits.subject)
    errors.subject = `Keep the subject under ${contactLimits.subject} characters.`;

  if (!message) errors.message = "Write a message.";
  else if (message.length < 10) errors.message = "Add a little more detail (at least 10 characters).";
  else if (message.length > contactLimits.message)
    errors.message = `Keep the message under ${contactLimits.message} characters.`;

  return errors;
}

export type ContactState = {
  status: "idle" | "success" | "error" | "unavailable";
  message?: string;
  errors?: ContactErrors;
  values?: ContactValues;
};
