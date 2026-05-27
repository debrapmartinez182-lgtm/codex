import Link from "next/link";

export default function KazanPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🏛️</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">喀山大学留学咨询</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            喀山联邦大学申请全流程指导，专业规划 + 材料准备 + 签证协助
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">关于喀山联邦大学</h2>
          <p className="text-gray-600 leading-relaxed">
            喀山联邦大学（Kazan Federal University）是俄罗斯排名前列的综合性大学，
            位于鞑靼斯坦共和国首都喀山市，成立于1804年，是列宁和托尔斯泰的母校。
            学校在医学、物理学、语言学等学科享有国际声誉，每年吸引大量中国留学生。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            { title: "院校专业规划", desc: "根据学生背景和兴趣，推荐最适合的专业方向，分析录取要求和就业前景", icon: "📋" },
            { title: "材料准备指导", desc: "指导准备申请材料，包括学历文件认证翻译、个人陈述、推荐信等", icon: "📄" },
            { title: "签证申请协助", desc: "协助办理留学签证所需文件，提供签证面试指导和材料审核", icon: "✈️" },
            { title: "入学后续服务", desc: "协助办理宿舍申请、落地登记、银行开户等入学后事宜", icon: "🏠" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <span className="text-3xl block mb-3">{item.icon}</span>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/order" className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            开始留学咨询
          </Link>
        </div>
      </section>
    </div>
  );
}
