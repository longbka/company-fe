"use server";

import { signIn, signOut } from "@/auth";
import type { AuthError } from "next-auth";

// Định nghĩa kiểu trả về
type SignInResult =
  | { error?: undefined; code?: undefined }
  | { error: string; code: number };

export async function handleSignIn(
  username: string,
  password: string
): Promise<SignInResult> {
  try {
    const r = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (r) return {};
    return { error: "Unknown error", code: 3 };
  } catch (error: unknown) {
    const err = error as AuthError & { type?: string };
    if (err.name === "InvalidEmailPasswordError") {
      return { error: err.type ?? "Invalid credentials", code: 1 };
    } else if (err.name === "InActiveAccountError") {
      return { error: err.type ?? "Inactive account", code: 2 };
    } else {
      return { error: "Internal server error", code: 3 };
    }
  }
}

export async function handleSignOut(): Promise<void> {
  await signOut();
}
