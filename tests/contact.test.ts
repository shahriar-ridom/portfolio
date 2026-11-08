import { describe, expect, it } from "vitest";
import { contactLimits, validateContact, type ContactValues } from "@/lib/contact";

const valid: ContactValues = {
  name: "Ada",
  email: "ada@example.com",
  subject: "Hello",
  message: "This is a long enough message.",
};

describe("validateContact", () => {
  it("accepts valid input", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("flags empty fields", () => {
    const errors = validateContact({ name: " ", email: "", subject: "", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "subject"]);
  });

  it.each(["no-at.com", "a@b", "a b@c.com", "a@b.c"])("rejects email %s", (email) => {
    expect(validateContact({ ...valid, email }).email).toBeDefined();
  });

  it("rejects short message", () => {
    expect(validateContact({ ...valid, message: "short" }).message).toMatch(/at least 10/);
  });

  it("enforces max lengths", () => {
    const errors = validateContact({
      name: "x".repeat(contactLimits.name + 1),
      email: valid.email,
      subject: "x".repeat(contactLimits.subject + 1),
      message: "x".repeat(contactLimits.message + 1),
    });
    expect(Object.keys(errors).sort()).toEqual(["message", "name", "subject"]);
  });

  it("trims before measuring", () => {
    expect(validateContact({ ...valid, name: `  ${"x".repeat(contactLimits.name)}  ` })).toEqual({});
  });
});
