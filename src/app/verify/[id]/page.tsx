import VerifyCodeForm from "@/components/general/Auth/Verify";

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Xác nhận tài khoản</h2>
      <VerifyCodeForm id={id} />
    </div>
  );
}
