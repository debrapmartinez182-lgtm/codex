import { serviceCategories } from "@/data/services";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">服务介绍</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            了解中俄文件认证的完整流程、所需材料和费用明细，选择最适合您的服务类型
          </p>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">认证流程详解</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "第一步",
                title: "上传文件",
                desc: "将您需要认证的文件扫描或拍照，上传PDF扫描件即可，无需原件。",
              },
              {
                step: "第二步",
                title: "选择时效",
                desc: "根据需求选择办理时效（标准/加急）和快递时效，灵活匹配您的截止日期。",
              },
              {
                step: "第三步",
                title: "在线支付",
                desc: "确认订单信息，通过微信或支付宝安全支付。",
              },
              {
                step: "第四步",
                title: "快递送达",
                desc: "认证完成后，具有法律效力的认证件按所留地址快递送达。",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="text-sm font-semibold text-primary mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories Detail */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">服务分类详情</h2>
          <div className="space-y-8">
            {serviceCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-gray-500">{cat.description}</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-gray-500 font-medium">文件类型</th>
                        <th className="text-left py-3 px-2 text-gray-500 font-medium">所需材料</th>
                        <th className="text-left py-3 px-2 text-gray-500 font-medium">参考费用</th>
                        <th className="text-left py-3 px-2 text-gray-500 font-medium">办理周期</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.documents.map((doc) => (
                        <tr key={doc.id} className="border-b border-gray-50">
                          <td className="py-3 px-2 font-medium text-gray-900">
                            {doc.name}
                          </td>
                          <td className="py-3 px-2 text-gray-500">
                            {doc.materials.join("、")}
                          </td>
                          <td className="py-3 px-2 text-primary font-medium">
                            ¥{doc.estimatedFee.toLocaleString()}
                          </td>
                          <td className="py-3 px-2 text-gray-500">
                            {doc.estimatedDays}个工作日
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/documents?category=${cat.id}`}
                    className="inline-flex items-center text-primary text-sm font-medium hover:underline"
                  >
                    立即办理 {cat.title}
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
