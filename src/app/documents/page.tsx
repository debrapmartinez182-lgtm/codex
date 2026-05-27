import { Suspense } from "react";
import DocumentsClient from "@/components/DocumentsClient";

export default function DocumentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-sm">加载中...</div>
      </div>
    }>
      <DocumentsClient />
    </Suspense>
  );
}
