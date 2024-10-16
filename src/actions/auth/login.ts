"use server";
import { AuthError } from "next-auth";
import { signIn } from "../../../auth.config";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log({ DATA: Object.fromEntries(formData) });
    await signIn("credentials", formData);
    return [];
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
  }
}
