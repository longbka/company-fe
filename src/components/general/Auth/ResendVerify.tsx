"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/api";
import { useVerifyModal } from "@/hooks/use-verify-modal";
import { sleep } from "@/utils/common";

type MessageType = {
  info: string;
  isSuccess: boolean;
};

export default function ResendEmailModal() {
  const router = useRouter();
  const verifyModal = useVerifyModal();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageType>({
    info: "",
    isSuccess: false,
  });

  const handleResend = async () => {
    setLoading(true);
    const email = verifyModal.userEmail;
    try {
      const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
        method: "POST",
        body: { email },
      });

      if (res?.data) {
        setMessage({
          info: "Gửi email thành công",
          isSuccess: true,
        });
        await sleep(1000);
        verifyModal.close();
        router.push(`/verify/${res.data.id}`);
      } else {
        setMessage({
          info: "Đã có lỗi xảy ra",
          isSuccess: false,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      setMessage({
        info: "Đã có lỗi xảy ra khi gửi yêu cầu",
        isSuccess: false,
      });
      setLoading(false);
    }
  };

  return (
    <Dialog open={verifyModal.isOpen} onOpenChange={verifyModal.close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tài khoản của bạn chưa được kích hoạt</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              value={verifyModal.userEmail}
              disabled={true}
              className="mt-1 cursor-not-allowed"
            />
          </div>

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

          <DialogFooter>
            <Button
              onClick={handleResend}
              disabled={loading}
              className="w-full cursor-pointer"
            >
              {loading ? "Đang gửi..." : "Gửi lại mã xác nhận"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
