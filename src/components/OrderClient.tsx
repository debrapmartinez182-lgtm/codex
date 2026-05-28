"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { allDocuments, type DocumentType } from "@/data/services";

type OrderStep = 1 | 2 | 3;

interface OrderForm {
  docId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  timeline: string;
  shipping: string;
  files: { name: string; size: string }[];
}

export default function OrderClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState<OrderStep>(1);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [form, setForm] = useState<OrderForm>({
    docId: searchParams.get("doc") || "",
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    timeline: "standard",
    shipping: "standard-ship",
    files: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedDoc: DocumentType | undefined = form.docId
    ? allDocuments.find((d) => d.id === form.docId)
    : undefined;

  const updateField = (field: keyof OrderForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileUpload = () => {
    // Simulate file upload
    const mockFiles = [
      { name: "身份证扫描件.pdf", size: "1.2 MB" },
      { name: "护照复印件.pdf", size: "0.8 MB" },
      { name: "认证文件原件.pdf", size: "2.1 MB" },
    ];
    setForm((prev) => ({ ...prev, files: mockFiles }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.docId) errs.docId = "请选择文件类型";
    if (!form.name.trim()) errs.name = "请输入姓名";
    if (!form.phone.trim()) errs.phone = "请输入手机号";
    if (!form.email.trim()) errs.email = "请输入邮箱";
    if (!form.address.trim()) errs.address = "请输入收件地址";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      if (form.files.length === 0) {
        setErrors({ files: "请至少上传一份文件" });
        return;
      }
      setStep(3);
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"wechat" | "alipay">("wechat");

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docId: form.docId,
          docName: selectedDoc?.name || "",
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          note: form.note,
          fee: selectedDoc?.estimatedFee || 0,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ submit: data.error || "提交失败，请重试" });
        return;
      }

      setOrderId(data.order.id);
    } catch {
      setErrors({ submit: "网络错误，请重试" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as OrderStep);
  };

  // Step indicator
  const steps = [
    { num: 1, label: "选择文件类型" },
    { num: 2, label: "上传PDF扫描件" },
    { num: 3, label: "确认并支付" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {orderId ? "订单提交成功" : "在线办理"}
          </h1>
          {!orderId && (
            <div className="flex items-center gap-4 mt-6">
              {steps.map((s, idx) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                      step >= s.num
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= s.num ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                  {idx < steps.length - 1 && (
                    <div className="w-12 h-px bg-gray-200 mx-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {orderId ? (
          /* Success State */
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">订单提交成功！</h2>
            <p className="text-gray-500 mb-6">
              您的订单编号为 <span className="font-mono font-bold text-primary">{orderId}</span>
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">办理流程提醒</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
                  <span>我们将在1个工作日内审核您的材料</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
                  <span>专业俄语翻译（约2-3个工作日）</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
                  <span>提交俄罗斯官方认证机构认证（约5-7个工作日）</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">✓</span>
                  <span>认证完成后快递寄送到您手中（具有法律效力）</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push(`/dashboard?order=${orderId}`)}
                className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                查看订单进度
              </button>
              <button
                onClick={() => router.push("/")}
                className="rounded-xl border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-all"
              >
                返回首页
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            {/* Step 1: Select Document & Fill Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  选择文件类型
                </h2>

                {/* Document Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    认证文件类型 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.docId}
                    onChange={(e) => updateField("docId", e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 ${
                      errors.docId
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-primary focus:ring-primary"
                    }`}
                  >
                    <option value="">请选择文件类型</option>
                    {allDocuments.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} - ¥{doc.estimatedFee.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  {errors.docId && (
                    <p className="mt-1 text-xs text-red-500">{errors.docId}</p>
                  )}
                  {selectedDoc && (
                    <div className="mt-3 p-4 bg-primary-light rounded-xl">
                      <p className="text-sm text-primary font-medium">
                        预计费用：¥{selectedDoc.estimatedFee.toLocaleString()} |
                        办理周期：{selectedDoc.estimatedDays}个工作日
                      </p>
                    </div>
                  )}
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="请输入您的姓名"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 ${
                        errors.name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:border-primary focus:ring-primary"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      手机号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="11位手机号码"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:border-primary focus:ring-primary"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="用于接收订单通知"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-primary focus:ring-primary"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    收件地址 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="认证完成后文件寄送地址"
                    rows={2}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 ${
                      errors.address
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-primary focus:ring-primary"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    备注
                  </label>
                  <textarea
                    value={form.note}
                    onChange={(e) => updateField("note", e.target.value)}
                    placeholder="如有特殊要求请在此说明"
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Upload Files */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">上传PDF扫描件</h2>
                <p className="text-sm text-gray-500">
                  上传以下材料的清晰扫描件或照片即可，<strong className="text-green-600">无需邮寄原件</strong>。支持 PDF、JPG、PNG 格式
                </p>

                {selectedDoc && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      所需材料清单：
                    </h3>
                    <ul className="space-y-1">
                      {selectedDoc.materials.map((m, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Upload Zone */}
                {form.files.length === 0 ? (
                  <div
                    onClick={handleFileUpload}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary hover:bg-primary-light/50 transition-all cursor-pointer"
                  >
                    <svg
                      className="mx-auto w-12 h-12 text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 font-medium">
                      点击上传文件
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      支持 PDF、JPG、PNG，单文件不超过10MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {form.files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              files: prev.files.filter((_, i) => i !== idx),
                            }))
                          }
                          className="text-gray-400 hover:text-red-500"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleFileUpload}
                      className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-primary hover:text-primary transition-colors"
                    >
                      + 继续添加文件
                    </button>
                  </div>
                )}
                {errors.files && (
                  <p className="text-xs text-red-500">{errors.files}</p>
                )}
              </div>
            )}

            {/* Step 3: Confirm & Pay */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  确认并支付
                </h2>

                {/* Timeline Selection */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">选择时效</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-2">办理时效</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "standard", label: "标准办理", desc: `${selectedDoc?.estimatedDays ?? 15}个工作日`, price: 0 },
                          { value: "express", label: "加急办理", desc: "5个工作日", price: 800 },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex flex-col p-3 border-2 rounded-xl cursor-pointer transition-all ${
                              form.timeline === opt.value
                                ? "border-primary bg-primary-light/10"
                                : "border-gray-200 hover:border-primary/30"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <input
                                type="radio"
                                name="timeline"
                                value={opt.value}
                                checked={form.timeline === opt.value}
                                onChange={(e) => updateField("timeline", e.target.value)}
                                className="text-primary"
                              />
                              <span className="text-xs text-gray-500">
                                {opt.price > 0 ? `+¥${opt.price}` : "已包含"}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900 mt-1">{opt.label}</span>
                            <span className="text-xs text-gray-400">{opt.desc}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">快递时效</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "standard-ship", label: "标准快递", desc: "3-5天送达", price: 0 },
                          { value: "express-ship", label: "加急快递", desc: "1-2天送达", price: 300 },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex flex-col p-3 border-2 rounded-xl cursor-pointer transition-all ${
                              form.shipping === opt.value
                                ? "border-primary bg-primary-light/10"
                                : "border-gray-200 hover:border-primary/30"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <input
                                type="radio"
                                name="shipping"
                                value={opt.value}
                                checked={form.shipping === opt.value}
                                onChange={(e) => updateField("shipping", e.target.value)}
                                className="text-primary"
                              />
                              <span className="text-xs text-gray-500">
                                {opt.price > 0 ? `+¥${opt.price}` : "免运费"}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900 mt-1">{opt.label}</span>
                            <span className="text-xs text-gray-400">{opt.desc}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-gray-900">订单信息确认</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-gray-500">文件类型</div>
                    <div className="font-medium text-gray-900">
                      {selectedDoc?.name}
                    </div>
                    <div className="text-gray-500">申请人</div>
                    <div className="font-medium text-gray-900">{form.name}</div>
                    <div className="text-gray-500">手机号</div>
                    <div className="font-medium text-gray-900">{form.phone}</div>
                    <div className="text-gray-500">邮箱</div>
                    <div className="font-medium text-gray-900">{form.email}</div>
                    <div className="text-gray-500">收件地址</div>
                    <div className="font-medium text-gray-900">{form.address}</div>
                    <div className="text-gray-500">上传文件</div>
                    <div className="font-medium text-gray-900">
                      {form.files.length} 个文件
                    </div>
                    <div className="text-gray-500">备注</div>
                    <div className="font-medium text-gray-900">
                      {form.note || "无"}
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">认证费用</span>
                    <span className="text-2xl font-bold text-primary">
                      ¥{selectedDoc?.estimatedFee.toLocaleString() ?? 0}
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">支付方式</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <label
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === "wechat"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "wechat"}
                        onChange={() => setPaymentMethod("wechat")}
                        className="text-primary"
                      />
                      <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <span className="text-lg">💚</span> 微信支付
                      </span>
                    </label>
                    <label
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === "alipay"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "alipay"}
                        onChange={() => setPaymentMethod("alipay")}
                        className="text-primary"
                      />
                      <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <span className="text-lg">💙</span> 支付宝
                      </span>
                    </label>
                  </div>

                  {/* QR Code Display */}
                  <div className="text-center bg-white border border-gray-200 rounded-2xl p-6">
                    <p className="text-sm text-gray-500 mb-4">
                      请使用{paymentMethod === "wechat" ? "微信" : "支付宝"}扫描下方二维码支付
                    </p>
                    <div className="inline-block border-4 border-gray-100 rounded-2xl p-2 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={paymentMethod === "wechat" ? "/payment/wechat-qr.jpg" : "/payment/alipay-qr.jpg"}
                        alt={paymentMethod === "wechat" ? "微信收款码" : "支付宝收款码"}
                        className="w-52 h-52 object-contain mx-auto"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                      支付金额：<span className="text-lg font-bold text-primary">¥{selectedDoc?.estimatedFee.toLocaleString() ?? 0}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      支付完成后请点击下方"确认支付"按钮提交订单
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs">
                      <span>⚠️</span> 请确认付款完成后再提交
                    </div>
                  </div>
                </div>

                {errors.submit && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                    {errors.submit}
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 3 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    step === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  上一步
                </button>
                <button
                  onClick={handleNext}
                  className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  {step === 2 ? "确认并支付" : "下一步"}
                </button>
              </div>
            )}

            {/* Step 3: Submit */}
            {step === 3 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={handleBack}
                  disabled={submitting}
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
                >
                  上一步
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="rounded-xl bg-green-600 px-8 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? "提交中..." : `确认支付 ¥${selectedDoc?.estimatedFee.toLocaleString() ?? 0}`}
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
