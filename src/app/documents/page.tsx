"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { serviceCategories, type DocumentType } from "@/data/services";

export default function DocumentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = useMemo(() => {
    let docs: DocumentType[] = [];
    if (activeCategory === "all") {
      docs = serviceCategories.flatMap((cat) => cat.documents);
    } else {
      const cat = serviceCategories.find((c) => c.id === activeCategory);
      docs = cat?.documents || [];
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      docs = docs.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }
    return docs;
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">文件类型</h1>
          <p className="mt-2 text-gray-500">
            选择您需要认证的文件类型，查看所需材料和费用详情
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              全部
            </button>
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.icon} {cat.title}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mt-4 max-w-md">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="搜索文件类型..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Document Cards */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {filteredDocs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">没有找到匹配的文件类型</p>
            <p className="text-gray-400 text-sm mt-2">请尝试其他关键词或分类</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => {
              const cat = serviceCategories.find((c) => c.id === doc.category);
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary font-medium">
                        {cat?.title}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {doc.description}
                    </p>

                    {/* Materials */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                        所需材料
                      </h4>
                      <ul className="space-y-1">
                        {doc.materials.map((m, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Fee & Time */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-400">参考费用</div>
                        <div className="text-lg font-bold text-primary">
                          ¥{doc.estimatedFee.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">办理周期</div>
                        <div className="text-sm font-medium text-gray-700">
                          {doc.estimatedDays === 7 ? "1周" : `${doc.estimatedDays}天`}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        router.push(`/order?doc=${doc.id}`)
                      }
                      className="mt-4 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                    >
                      立即办理
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
