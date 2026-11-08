"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";
import { buttonPrimary, errorText, field, label } from "./styles";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="mt-8">
      <label htmlFor="password" className={label}>Password</label>
      <input id="password" name="password" type="password" required autoComplete="current-password" className={field} />
      {state.message && <p role="alert" className={errorText}>{state.message}</p>}
      <button type="submit" disabled={pending} className={`${buttonPrimary} mt-6`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
