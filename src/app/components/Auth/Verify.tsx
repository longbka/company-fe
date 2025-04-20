"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useVerifyModal } from "@/hooks/use-verify-modal";
// Schema cho code xác thực (6 số)
const verifySchema = z.object({
	code: z.string().min(6, "Mã xác nhận phải có 6 ký tự"),
});

export default function VerifyCodeModal() {
	const [loading, setLoading] = useState(false);
	const verifyModal = useVerifyModal();
	const form = useForm({
		resolver: zodResolver(verifySchema),
		defaultValues: {
			code: "",
		},
	});

	const onSubmit = async (values: { code: string }) => {
		setLoading(true);
		try {
			form.reset();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={verifyModal.isOpen} onOpenChange={verifyModal.close}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Nhập mã xác nhận</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mã xác nhận</FormLabel>
									<FormControl>
										<Input placeholder="Nhập mã gồm 6 số" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" className="w-full" disabled={loading}>
								{loading ? "Đang xác thực..." : "Xác nhận"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
