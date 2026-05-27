import Link from "next/link";

export default function TuitionPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🎓</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">留学生学费缴纳</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            代缴俄罗斯高校学费、住宿费等，支持人民币支付，到账快、有凭证
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "学费代缴", desc: "代缴俄罗斯大学学费，支持人民币直接支付，省去换汇和国际电汇的麻烦", icon: "🏫" },
            { title: "住宿费", desc: "代缴学校宿舍费用，确保床位预留，避免因缴费延迟影响入住", icon: "🏠" },
            { title: "其他费用", desc: "保险费、签证续签费、语言班费用等各类校园相关费用均可代缴", icon: "📑" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
              <span className="text-4xl block mb-3">{item.icon}</span>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            { title: "汇率优惠", desc: "远优于银行国际汇款牌价，帮你节省汇率损失" },
            { title: "快速到账", desc: "确认后1-3个工作日内到达学校账户，不耽误注册" },
            { title: "缴费凭证", desc: "提供正规缴费凭证，可用于签证续签和居留登记" },
            { title: "操作简单", desc: "只需提供学校缴费通知单，其余由我们代办" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">如何缴费</h2>
          <div className="space-y-4 text-left max-w-md mx-auto">
            {[
              { step: "1", text: "提供学校的缴费通知单（PDF或截图）" },
              { step: "2", text: "确认金额和汇率，人民币支付" },
              { step: "3", text: "1-3个工作日到账，获取缴费凭证" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <span className="w-7 h-7 shrink-0 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">{item.step}</span>
                <span className="text-sm text-gray-700 pt-1">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/order" className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition-colors">
              立即缴费
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
