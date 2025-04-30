"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
	name: z.string().min(2, { message: "Vui lòng nhập họ và tên." }),
	phone: z.string().min(9, { message: "Vui lòng nhập số điện thoại hợp lệ." }),
	email: z.string().email({ message: "Email không hợp lệ." }).optional(),
	content: z.string().min(5, { message: "Nội dung phải có ít nhất 5 ký tự." }),
});

export default function WelcomeSection() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			phone: "",
			email: "",
			content: "",
		},
	});

	function onSubmit(values: { name: string; phone: string; content: string; email?: string }) {
		console.log(values);
	}

	return (
		<section className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8">
			{/* Left Content */}
			<div>
				<h2 className="text-2xl font-bold mb-6">CHÀO MỪNG ĐẾN VỚI LOTUS TSE JSC</h2>
				<div className="space-y-4 text-gray-700 text-sm leading-relaxed">
					<p>
						<span className="mr-1">📌</span> Giới Thiệu LOTUS TSE <span className="mr-1">📌</span> LOTUS TSE
						là đơn vị hoạt động trong lĩnh vực dịch vụ kỹ thuật, dịch vụ logistic và cung cấp thiết bị công
						nghiệp.
					</p>
					<p>
						<span className="mr-1">🔹</span> Chúng tôi là tập hợp của một tập thể <strong>cán bộ</strong>,
						công nhân viên giàu kinh nghiệm, trách nhiệm và uy tín.
					</p>
					<p>
						<span className="mr-1">🔹</span> Cam kết mang lại{" "}
						<strong>những sản phẩm và dịch vụ chất lượng cao</strong> cho khách hàng.
					</p>
					<p>
						<span className="mr-1">🔹</span> Hoạt động với phương châm:{" "}
						<strong>Chất lượng - Đổi mới - Phát triển bền vững</strong>.
					</p>
					<p>
						<span className="mr-1">⭐</span> LOTUS TSE - Đối tác tin cậy, đồng hành cùng phát triển!
					</p>
				</div>
			</div>

			{/* Right Form */}
			<Card>
				<CardHeader>
					<CardTitle>YÊU CẦU GỌI LẠI</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Họ và tên *</FormLabel>
										<FormControl>
											<Input
												placeholder="Nhập họ và tên"
												className="placeholder-white"
												{...field}
											/>
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
										<FormLabel>Số điện thoại *</FormLabel>
										<FormControl>
											<Input
												placeholder="Nhập số điện thoại"
												className="placeholder-white"
												{...field}
											/>
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
											<Input placeholder="Nhập email" className="placeholder-white" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="content"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nội dung *</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Nhập nội dung"
												className="placeholder-white"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-center">
								<Button type="submit" className="cursor-pointer">
									LIÊN HỆ
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</section>
	);
}
