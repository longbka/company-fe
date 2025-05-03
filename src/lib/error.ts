import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  type: string;

  constructor(type: string, message?: string) {
    super(message);
    this.name = "CustomAuthError";
    this.type = type;
  }
}

export class InvalidEmailPasswordError extends AuthError {
  type = "Email/Password không hợp lệ";

  constructor(message?: string) {
    super(message ?? "Email/Password không hợp lệ");
    this.name = "InvalidEmailPasswordError";
  }
}

export class InActiveAccountError extends AuthError {
  type = "Tài khoản chưa được kích hoạt";

  constructor(message?: string) {
    super(message ?? "Tài khoản chưa được kích hoạt");
    this.name = "InActiveAccountError";
  }
}
