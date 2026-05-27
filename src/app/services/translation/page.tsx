import Link from "next/link";

export default function EngineeringTranslationPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">📐</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">工程文件翻译</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            施工图纸、技术规范、合同协议等工程文件的中俄专业翻译服务
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "施工图纸", items: ["建筑图纸", "结构图纸", "设备安装图", "工艺流程图"] },
            { title: "技术文档", items: ["技术规范", "操作规程", "产品说明书", "质检报告"] },
            { title: "商务文件", items: ["工程合同", "投标文件", "验收报告", "技术方案"] },
          ].map((cat) => (
            <div key={cat.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>✓ 资深工程俄语翻译，熟悉行业术语</div>
            <div>✓ 交稿前多轮校对，确保准确性</div>
            <div>✓ 支持 CAT 工具，保持术语一致</div>
            <div>✓ 签署保密协议，文件安全不外泄</div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/order" className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
              提交翻译需求
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
