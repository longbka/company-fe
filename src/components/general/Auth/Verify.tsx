"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { sendRequest } from "@/utils/api";
import { useState } from "react";
import { sleep } from "@/utils/common";

const verifySchema = z.object({
  id: z.string(),
  code: z.string().uuid({ message: "Mã xác nhận không đúng định dạng UUID" }),
});

type VerifyCodeFormProps = {
  id: string;
};
type MessageType = {
  info: string;
  isSuccess: boolean;
};

export default function VerifyCodeForm({ id }: VerifyCodeFormProps) {
  const [message, setMessage] = useState<MessageType>({
    info: "",
    isSuccess: false,
  });
  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      id: id,
      code: "",
    },
  });

  const onSubmit = async (values: { id: string; code: string }) => {
    const { id, code } = values;
    const res = await sendRequest<IBackendRes<boolean>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
      method: "POST",
      body: {
        _id: id,
        code,
      },
    });
    if (res?.data) {
      setMessage({
        info: "Kích hoạt tài khoản thành công",
        isSuccess: true,
      });
      await sleep(3000);
      window.location.replace("/");
    } else {
      setMessage({
        info: res?.message,
        isSuccess: false,
      });
    }
  };

  return (
    <Form {...form}>
      {message.info ? (
        <p
          className={
            "text-md " + (message.isSuccess ? "text-green-500" : "text-red-500")
          }
        >
          {message.info}
        </p>
      ) : null}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã xác nhận</FormLabel>
              <FormControl hidden>
                <Input value={id} readOnly />
              </FormControl>
              <FormControl>
                <Input
                  required
                  placeholder="Nhập mã được gửi đến email của bạn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          Xác nhận
        </Button>
      </form>
    </Form>
  );
}
