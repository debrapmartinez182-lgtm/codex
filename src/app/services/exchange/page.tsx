export default function ExchangePage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-amber-50 to-yellow-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">💱</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">换汇服务</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            人民币 ⇄ 卢布安全快速兑换，合规渠道，最优汇率
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { title: "最优汇率", desc: "实时市场汇率，远优于银行牌价，大额更优惠" },
            { title: "合规安全", desc: "持牌金融机构合作，资金流向透明可追溯" },
            { title: "当日到账", desc: "确认后快速到账，最快1小时内完成" },
            { title: "大额支持", desc: "支持企业及个人大额换汇需求，专属客户经理对接" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">立即咨询换汇</h2>
          <p className="text-gray-600 mb-6">联系客服获取实时汇率报价，专业顾问一对一服务</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:400-888-9999" className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors">
              📞 400-888-9999
            </a>
            <a href="mailto:exchange@cnru-auth.com" className="inline-flex items-center justify-center rounded-xl border-2 border-amber-300 px-6 py-3 text-sm font-semibold text-amber-700 hover:bg-amber-100 transition-colors">
              ✉️ exchange@cnru-auth.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
