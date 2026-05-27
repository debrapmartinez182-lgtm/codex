import Link from "next/link";
import { serviceCategories } from "@/data/services";
import CaseImageCard from "@/components/CaseImageCard";

const steps = [
  {
    number: "01",
    title: "上传PDF扫描件",
    description: "选择文件类型，上传清晰扫描件，无需邮寄原件",
  },
  {
    number: "02",
    title: "选择办理时效",
    description: "根据需求选择认证办理时效和快递时效",
  },
  {
    number: "03",
    title: "在线支付",
    description: "确认订单信息，通过微信或支付宝完成支付",
  },
  {
    number: "04",
    title: "快递送达",
    description: "认证完成后，根据您所留地址快递寄送到手",
  },
];

const stats = [
  { value: "1,000+", label: "累计服务客户" },
  { value: "100%", label: "认证通过率" },
  { value: "1周", label: "办理周期" },
  { value: "0原件", label: "无需邮寄原件" },
];

const cases = [
  {
    document: "护照认证",
    image: "/cases/passport-real.jpg",
    user: "留学生 · 李同学",
    scenario: "赴俄留学签证需要护照翻译及官方认证",
    result: "上传护照扫描件，1周完成认证，顺利递交签证材料",
    days: "7",
  },
  {
    document: "成绩单认证",
    image: "/cases/degree-real.jpg",
    user: "硕士申请 · 李同学",
    scenario: "申请莫斯科大学研究生，需要本科成绩单俄语认证",
    result: "学校教务系统导出的PDF直接上传，1周拿到认证件",
    days: "7",
  },
  {
    document: "高中毕业证认证",
    image: "/cases/diploma.jpg",
    user: "本科留学 · 陈同学",
    scenario: "申请圣彼得堡国立大学本科，需要高中毕业证认证",
    result: "拍照上传毕业证，无需原件寄送，1周完成全部流程",
    days: "7",
  },
  {
    document: "驾驶证认证",
    image: "/cases/license-real.jpg",
    user: "驻俄工作人员 · 程先生",
    scenario: "外派俄罗斯工作，需要中国驾驶证认证后在当地换领驾照",
    result: "驾驶证正副页扫描件上传，1周拿到认证翻译件",
    days: "7",
  },
  {
    document: "结婚证认证",
    image: "/cases/marriage.jpg",
    user: "跨国婚姻 · 李女士",
    scenario: "与俄罗斯籍丈夫在中国领证后，需将结婚证认证在俄使用",
    result: "结婚证扫描件上传，1周完成，一次性通过认证",
    days: "7",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-red-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              PDF扫描件即可办理，无需邮寄原件
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              中俄文件认证
              <br />
              <span className="text-primary">足不出户，线上搞定</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl">
              文件扫描或拍照上传即可办理，<strong className="text-gray-900">无需邮寄原件</strong>，全程线上操作。
              我们完成俄语翻译后提交俄罗斯官方认证机构认证，具有完整法律效力。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/order"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                立即办理认证
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 px-8 py-4 text-base font-semibold text-gray-700 hover:border-primary hover:text-primary transition-all"
              >
                了解服务详情
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary" />
          <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-accent" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Advantage Banner */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            PDF扫描件即可认证，无需原件
          </h2>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            文件拍照或扫描上传，全程线上办理，原件不离开您手中。安全、省心、高效。
          </p>
        </div>
      </section>

      {/* Service Categories */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">服务分类</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              无论您是需要留学认证、婚姻登记材料，还是法律文件认证，我们都能为您提供专业服务
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/documents?category=${cat.id}`}
                className="group block bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-gray-500 mb-4">{cat.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  查看详情
                  <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value-Added Services */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">增值服务</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              除了文件认证，我们还提供更多中俄商务生活配套服务
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 换汇 - Highlighted */}
            <Link
              href="/services/exchange"
              className="lg:col-span-2 group relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">热门</span>
              </div>
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <span className="text-5xl">💱</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      换汇服务
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      人民币⇄卢布安全快速兑换，汇率优惠、到账迅速。支持大额换汇，合规渠道，资金安全保障。
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["最优汇率", "当日到账", "合规安全", "大额支持"].map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center text-amber-600 text-sm font-semibold">
                      了解详情
                      <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 工程文件翻译 */}
            <Link
              href="/services/translation"
              className="group bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <span className="text-4xl mb-4 block">📐</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">工程文件翻译</h3>
              <p className="text-sm text-gray-500 mb-4">
                施工图纸、技术规范、合同协议等工程文件的中俄专业翻译
              </p>
              <span className="inline-flex items-center text-primary text-sm font-medium">
                了解更多
                <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* EAC 认证 */}
            <Link
              href="/services/eac"
              className="group bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <span className="text-4xl mb-4 block">✅</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">EAC 认证</h3>
              <p className="text-sm text-gray-500 mb-4">
                产品出口俄罗斯/欧亚经济联盟的EAC合格评定与认证服务
              </p>
              <span className="inline-flex items-center text-primary text-sm font-medium">
                了解更多
                <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* 俄语人才猎头 */}
            <Link
              href="/services/talent"
              className="group bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <span className="text-4xl mb-4 block">🎯</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">俄语人才猎头</h3>
              <p className="text-sm text-gray-500 mb-4">
                为企业精准匹配俄语翻译、驻外代表、商务拓展等中俄双语人才。
              </p>
              <span className="inline-flex items-center text-primary text-sm font-medium">
                了解更多
                <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* 喀山大学留学咨询 - Highlighted */}
            <Link
              href="/services/kazan"
              className="lg:col-span-2 group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-bold">留学</span>
              </div>
              <div className="p-6">
                <span className="text-4xl mb-4 block">🏛️</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">喀山大学留学咨询</h3>
                <p className="text-sm text-gray-500 mb-4">
                  喀山联邦大学申请全流程指导，专业选择、材料准备、签证办理一站式服务。
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["专业规划", "材料指导", "签证协助"].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">{tag}</span>
                  ))}
                </div>
                <span className="inline-flex items-center text-primary text-sm font-medium">
                  了解更多
                  <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* 留学生学费缴纳 */}
            <Link
              href="/services/tuition"
              className="lg:col-span-2 group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="p-6">
                <span className="text-4xl mb-4 block">🎓</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">留学生学费缴纳</h3>
                <p className="text-sm text-gray-500 mb-4">
                  代缴俄罗斯高校学费、住宿费等，汇率优惠、到账快，可出具缴费凭证。
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["实时汇率", "凭证开具", "1-3天到账"].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">{tag}</span>
                  ))}
                </div>
                <span className="inline-flex items-center text-purple-600 text-sm font-medium">
                  了解更多
                  <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">办理流程</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              简单四步，PDF扫描件上传即可。全流程线上操作，无需到场
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={step.number} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-light text-primary text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 -right-3">
                    <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Cases */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">真实案例</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              上千用户已通过我们完成中俄文件认证，以下是部分典型案例
            </p>
          </div>

          {/* Horizontal scroll */}
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {cases.map((c, idx) => (
              <div key={idx} className="snap-start">
                <CaseImageCard c={c} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/cases"
              className="inline-flex items-center text-primary text-sm font-semibold hover:underline"
            >
              查看更多案例
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">为什么选择我们</h2>
            <p className="mt-3 text-blue-200">
              不止专业，更是省心 — 您的文件认证专家
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "无需原件", desc: "PDF扫描件即可办理，原件安全留在您手中" },
              { title: "专业翻译", desc: "资深俄语翻译团队，确保翻译准确合规" },
              { title: "官方认证", desc: "俄罗斯官方认证机构认证，具有完整法律效力" },
              { title: "全国覆盖", desc: "服务遍及全国，认证件快递上门" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-blue-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">准备好开始了吗？</h2>
          <p className="mt-4 text-lg text-gray-500">
            只需上传PDF扫描件，剩下的交给我们。如有疑问，客服团队随时为您服务。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-all"
            >
              开始办理
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 px-8 py-4 text-base font-semibold text-gray-700 hover:border-primary hover:text-primary transition-all"
            >
              查看常见问题
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
