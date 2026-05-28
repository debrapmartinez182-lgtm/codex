"use client";

import { useState } from "react";
import MosaicImage from "@/components/MosaicImage";

interface CaseItem {
  id: number;
  document: string;
  image: string;
  user: string;
  category: string;
  scenario: string;
  result: string;
  days: string;
}

const allCases: CaseItem[] = [
  // 护照
  { id: 1, document: "护照认证", image: "/cases/passport-real.jpg", user: "留学生 · 李同学", category: "留学", scenario: "赴俄留学签证需要护照翻译及官方认证", result: "上传护照扫描件，12个工作日完成认证，顺利递交签证材料", days: "7" },
  { id: 2, document: "护照认证", image: "/cases/passport-2.jpg", user: "交换生 · 赵同学", category: "留学", scenario: "参加中俄交换生项目，需要护照认证办理长期签证", result: "手机拍照上传，10个工作日完成，顺利出境", days: "7" },
  // 成绩单
  { id: 3, document: "成绩单认证", image: "/cases/degree-real.jpg", user: "硕士申请 · 李同学", category: "留学", scenario: "申请莫斯科大学研究生，需要本科成绩单俄语认证", result: "学校教务系统导出PDF直接上传，15个工作日拿到认证件", days: "7" },
  { id: 4, document: "成绩单认证", image: "/cases/transcript-2.jpg", user: "博士申请 · 黄同学", category: "留学", scenario: "申请圣彼得堡大学博士，需硕士成绩单认证", result: "成绩单扫描件上传，12个工作日通过认证", days: "7" },
  // 高中毕业证
  { id: 5, document: "高中毕业证认证", image: "/cases/diploma.jpg", user: "本科留学 · 陈同学", category: "留学", scenario: "申请圣彼得堡国立大学本科，需高中毕业证双认证", result: "拍照上传毕业证，无需原件寄送，14天完成全部流程", days: "7" },
  { id: 6, document: "高中毕业证认证", image: "/cases/diploma-2.jpg", user: "预科申请 · 吴同学", category: "留学", scenario: "申请俄罗斯大学预科班，需高中毕业证认证", result: "扫描件上传后12个工作日拿到认证件", days: "7" },
  // 学历证书
  { id: 7, document: "学历证书认证", image: "/cases/degree-real.jpg", user: "工作签证 · 李同学", category: "工作", scenario: "赴俄工作需要学历证书认证用于办理工作许可", result: "大学毕业证扫描件上传，14个工作日完成", days: "7" },
  { id: 8, document: "学历证书认证", image: "/cases/degree-2.jpg", user: "职称评审 · 周女士", category: "工作", scenario: "在俄高校评职称需要中国学历认证", result: "学位证扫描件上传，15个工作日通过使馆审核", days: "7" },
  // 驾驶证
  { id: 9, document: "驾驶证认证", image: "/cases/license-real.jpg", user: "驻俄工作人员 · 程先生", category: "工作", scenario: "外派俄罗斯工作，需驾驶证认证后换领当地驾照", result: "驾驶证正副页扫描件上传，1周拿到认证翻译件", days: "7" },
  { id: 10, document: "驾驶证认证", image: "/cases/license-2.jpg", user: "自驾旅行 · 何先生", category: "生活", scenario: "计划自驾穿越俄罗斯，需驾驶证俄语认证", result: "驾驶证扫描件上传，1周完成加急认证", days: "7" },
  // 结婚证
  { id: 11, document: "结婚证认证", image: "/cases/marriage.jpg", user: "跨国婚姻 · 李女士", category: "法律及其他", scenario: "与俄罗斯籍丈夫在中国领证，需结婚证双认证在俄使用", result: "结婚证扫描件上传，15个工作日完成，一次性通过", days: "7" },
  { id: 12, document: "结婚证认证", image: "/cases/marriage-2.jpg", user: "家庭团聚 · 孙女士", category: "法律及其他", scenario: "办理家庭团聚签证需要结婚证认证", result: "上传结婚证扫描件，13个工作日拿到双认证件", days: "7" },
  // 出生证明
  { id: 13, document: "出生证明认证", image: "/cases/birth.jpg", user: "新生儿随迁 · 杨先生", category: "法律及其他", scenario: "孩子随母亲入俄籍需要出生证明双认证", result: "出生证明扫描件上传，12个工作日完成认证", days: "7" },
  { id: 14, document: "出生证明认证", image: "/cases/birth-2.jpg", user: "留学签证 · 郑同学", category: "留学", scenario: "未成年人留学需要出生证明认证作为监护人材料", result: "拍照上传，10个工作日拿到认证件", days: "7" },
  // 无犯罪记录
  { id: 15, document: "无犯罪记录认证", image: "/cases/no-crime.jpg", user: "工作签证 · 马先生", category: "工作", scenario: "申请俄罗斯工作签证需要无犯罪记录证明双认证", result: "在线开具的电子证明直接上传，12个工作日完成", days: "7" },
  { id: 16, document: "无犯罪记录认证", image: "/cases/no-crime-2.jpg", user: "长期居留 · 胡女士", category: "生活", scenario: "申请俄罗斯长期居留许可需要无犯罪证明认证", result: "派出所证明扫描件上传，14个工作日通过双认证", days: "7" },
];

const categories = ["全部", "留学", "工作", "法律及其他", "生活"];

export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filtered = activeCategory === "全部"
    ? allCases
    : allCases.filter((c) => c.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">真实案例</h1>
          <p className="mt-2 text-gray-500">
            上千用户的认证经历，用真实结果说话
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all group"
            >
              <div className="relative overflow-hidden">
                <MosaicImage
                  src={c.image}
                  alt={c.document}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  blockSize={14}
                  style={{ minHeight: "180px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-white font-medium">
                    {c.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{c.document}</h3>
                <p className="text-xs text-gray-500 mb-2">{c.user}</p>
                <div className="text-xs text-gray-600 space-y-1 mb-3">
                  <p><span className="text-gray-400">场景：</span>{c.scenario}</p>
                  <p><span className="text-gray-400">结果：</span>{c.result}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">办理周期</span>
                  <span className="text-sm font-semibold text-green-600">{c.days === "7" ? "1周" : `${c.days}个工作日`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">准备好成为下一个案例了吗？</h2>
          <p className="text-gray-500 mb-6">PDF扫描件即可办理，上传文件开始您的认证之旅</p>
          <a
            href="/order"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            立即办理
          </a>
        </div>
      </section>
    </div>
  );
}
