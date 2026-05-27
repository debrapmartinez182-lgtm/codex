import Link from "next/link";

export default function TalentPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🎯</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">俄语人才猎头</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            为企业精准匹配俄语翻译、驻外代表、商务人才等中俄双语专业人才
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "俄语翻译", desc: "口译、笔译、同声传译等各类翻译人才", icon: "🗣️" },
            { title: "驻外代表", desc: "驻俄商务代表、项目经理、市场拓展", icon: "🏢" },
            { title: "技术人才", desc: "工程、IT、能源等领域中俄双语技术人才", icon: "⚙️" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
              <span className="text-4xl block mb-3">{item.icon}</span>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">服务流程</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "需求沟通", desc: "了解企业的人才需求，包括岗位要求、语言水平、行业背景等" },
              { step: "2", title: "人才筛选", desc: "从俄语人才库中筛选匹配候选人，进行初步评估" },
              { step: "3", title: "面试安排", desc: "推荐合格候选人，安排企业面试" },
              { step: "4", title: "入职跟进", desc: "协助办理入职手续，提供后续跟踪服务" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">{item.step}</span>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/order" className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
              发布人才需求
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
