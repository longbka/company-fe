"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { handleSignIn } from "@/lib/auth-action";
import { useRouter } from "next/navigation";
import { useVerifyModal } from "@/hooks/use-verify-modal";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().email({ message: "Sai định dạng email" }),
  password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 ký tự" }),
});

export default function LoginModal() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const verifyModal = useVerifyModal();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    verifyModal.setUserMail("");
    const { username, password } = values;
    const data = await handleSignIn(username, password);
    if (data?.error) {
      setErrMsg(data.error);
      if (data?.code === 2) {
        verifyModal.setUserMail(username);
        loginModal.close();
        verifyModal.open();
      }
    } else {
      setErrMsg("");
      router.refresh();
      loginModal.close();
    }
    setLoading(false);
  };

  const onOpenRegister = () => {
    loginModal.close();
    registerModal.open();
  };

  return (
    <div>
      <Button className="cursor-pointer" onClick={loginModal.open}>
        Đăng nhập
      </Button>
      <Dialog open={loginModal.isOpen} onOpenChange={loginModal.close}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Đăng nhập</DialogTitle>
          </DialogHeader>
          {errMsg ? <p className="text-md text-red-500">{errMsg}</p> : <></>}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 py-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="block space-y-2">
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
                <div className="text-center text-sm text-blue-600 hover:underline">
                  <Link href={"/forgot-password"} onClick={loginModal.close}>Quên mật khẩu</Link>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={onOpenRegister}
                >
                  Bạn chưa có tài khoản? Đăng ký
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
