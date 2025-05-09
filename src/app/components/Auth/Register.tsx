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
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useRegisterModal } from "@/hooks/use-register-modal";

const registerSchema = z.object({
	name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
	email: z.string().email({ message: "Email không hợp lệ" }),
	password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 ký tự" }),
	phone: z.string().min(8, { message: "Số điện thoại không hợp lệ" }),
	address: z.string().min(5, { message: "Địa chỉ quá ngắn" }),
	image: z.string().url({ message: "Ảnh phải là một đường dẫn hợp lệ" }),
});

export default function RegisterModal() {
	const registerModal = useRegisterModal();
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			phone: "",
			address: "",
			image: "",
		},
	});

	const onSubmit = async (values: any) => {
		setLoading(true);
		console.log("Đăng ký với:", values);
		// Giả lập delay API
		setTimeout(() => {
			setLoading(false);
			registerModal.close()
			form.reset();
		}, 1500);
	};

	return (
		<div>
			<Dialog open={registerModal.isOpen} onOpenChange={registerModal.close}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Đăng ký tài khoản</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Họ và tên</FormLabel>
										<FormControl>
											<Input placeholder="Nhập họ tên" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
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
											<Input type="password" placeholder="Nhập mật khẩu" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Số điện thoại</FormLabel>
										<FormControl>
											<Input placeholder="Nhập số điện thoại" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Địa chỉ</FormLabel>
										<FormControl>
											<Input placeholder="Nhập địa chỉ" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ảnh đại diện (URL)</FormLabel>
										<FormControl>
											<Input placeholder="Nhập đường dẫn ảnh" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? "Đang đăng ký..." : "Đăng ký"}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
