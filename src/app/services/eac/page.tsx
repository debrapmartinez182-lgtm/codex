import Link from "next/link";

export default function EACPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">✅</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">EAC 认证</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            产品出口俄罗斯及欧亚经济联盟（EAEU）的强制性合格认证服务
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">什么是 EAC 认证</h2>
          <p className="text-gray-600 leading-relaxed">
            EAC（Eurasian Conformity）认证是产品进入俄罗斯、白俄罗斯、哈萨克斯坦、
            亚美尼亚、吉尔吉斯斯坦等欧亚经济联盟国家的强制性认证。类似于欧盟的 CE 认证，
            未获得 EAC 认证的产品无法在上述国家合法销售和使用。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            { title: "EAC 合格认证", desc: "适用于大部分工业产品和消费品，是进入EAEU市场的基本要求" },
            { title: "EAC 符合性声明", desc: "适用于风险较低的特定产品类别，流程相对简化" },
            { title: "EAC 国家注册证", desc: "适用于食品、化妆品、医疗器械等特殊监管产品" },
            { title: "EAC 消防安全认证", desc: "适用于建材、消防设备等涉及消防安全的产品" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/order" className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            咨询 EAC 认证
          </Link>
        </div>
      </section>
    </div>
  );
}
