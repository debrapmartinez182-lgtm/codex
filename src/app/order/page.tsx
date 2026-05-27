import { Suspense } from "react";
import OrderClient from "@/components/OrderClient";

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-sm">加载中...</div>
      </div>
    }>
      <OrderClient />
    </Suspense>
  );
}
