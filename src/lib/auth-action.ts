"use server";
import { signIn } from "@/auth";

export async function handleSignIn(username: string, password: string) {
	try {
		const r = await signIn("credentials", {
			username: username,
			password: password,
			// callbackUrl: "/",
			redirect: false,
		});
		return r;
	} catch (error) {
		if ((error as any).name === "InvalidEmailPasswordError") {
			return { error: (error as any).type, code: 1 };
		} else if ((error as any).name === "InActiveAccountError") {
			return { error: (error as any).type, code: 2 };
		} else {
			return { error: "Internal server error", code: 3 };
		}
	}
}
