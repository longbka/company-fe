"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendRequest } from "@/utils/api";
import { sleep } from "@/utils/common";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Định nghĩa schema với Zod
const emailSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ")
    .min(1, "Email không được để trống"),
});

const resetSchema = z
  .object({
    code: z
      .string()
      .uuid({ message: "Mã xác nhận không đúng định dạng UUID" })
      .min(1, "Mã xác nhận không được để trống"),
    newPassword: z
      .string()
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
      .max(50, "Mật khẩu mới không được dài quá 50 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type EmailFormData = z.infer<typeof emailSchema>;
type ResetFormData = z.infer<typeof resetSchema>;

type MessageType = {
  info: string;
  isSuccess: boolean;
};

type RetryPasswordData = {
  email: string;
  id: string;
};

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageType>({
    info: "",
    isSuccess: false,
  });

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetForm = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (step === "email") {
      emailForm.reset({ email: "" });
      setMessage({ info: "", isSuccess: false });
    } else if (step === "reset") {
      resetForm.reset({ code: "", newPassword: "", confirmPassword: "" });
      setMessage({ info: "", isSuccess: false });
    }
  }, [step, emailForm, resetForm]);

  const handleSendEmail = async (data: EmailFormData) => {
    setMessage({ info: "", isSuccess: false });
    setLoading(true);

    try {
      const res = await sendRequest<IBackendRes<RetryPasswordData>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-password`,
        method: "POST",
        body: { email: data.email },
      });

      if (res?.data) {
        setMessage({
          info: "Mã xác nhận đã được gửi đến email của bạn",
          isSuccess: true,
        });
        setEmail(data.email);
        await sleep(1000);
        setStep("reset");
      } else {
        setMessage({ info: res?.message, isSuccess: false });
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      setMessage({
        info: "Đã có lỗi xảy ra khi gửi yêu cầu",
        isSuccess: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data: ResetFormData) => {
    setMessage({ info: "", isSuccess: false });
    setLoading(true);

    try {
      const res = await sendRequest<IBackendRes<boolean>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/reset-password`,
        method: "POST",
        body: {
          email,
          code: data.code,
          password: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
      });

      if (res?.data) {
        setMessage({ info: "Đặt lại mật khẩu thành công", isSuccess: true });
        await sleep(2000);
        window.location.href = "/";
      } else {
        setMessage({ info: res.message, isSuccess: false });
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      setMessage({
        info: "Đã có lỗi xảy ra khi gửi yêu cầu",
        isSuccess: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">
        {step === "email" ? "Quên mật khẩu" : "Đặt lại mật khẩu"}
      </h2>

      <div className="space-y-4">
        {step === "email" ? (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleSendEmail)}
              className="space-y-4"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Nhập email của bạn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {message.info && (
                <p
                  className={`text-sm ${
                    message.isSuccess ? "text-green-600" : "text-red-500"
                  }`}
                  aria-live="polite"
                >
                  {message.info}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer"
              >
                {loading ? "Đang gửi..." : "Gửi mã xác nhận"}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...resetForm} key={step}>
            <form
              onSubmit={resetForm.handleSubmit(handleResetPassword)}
              className="space-y-4"
            >
              <FormField
                control={resetForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã xác nhận</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mã xác nhận" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={resetForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={resetForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {message.info && (
                <p
                  className={`text-sm ${
                    message.isSuccess ? "text-green-600" : "text-red-500"
                  }`}
                  aria-live="polite"
                >
                  {message.info}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer"
              >
                {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
