"use client";

import { useState } from "react";

const faqs = [
  {
    category: "关于认证",
    items: [
      {
        q: "什么是副本认证？",
        a: "副本认证是我们提供的核心服务：您将文件的PDF扫描件上传给我们，我们完成俄语翻译后，提交俄罗斯官方认证机构进行认证。认证后的文件在俄罗斯具有完整法律效力。与传统双认证不同，您无需经过中国公证处、外交部和俄罗斯使馆的繁琐流程。",
      },
      {
        q: "哪些文件需要做认证？",
        a: "需要在俄罗斯使用的中国官方文件通常都需要认证，包括但不限于：学历证书、成绩单、出生证明、结婚证、无犯罪记录证明、驾驶证、委托书、声明书等。只需提供清晰扫描件即可。",
      },
      {
        q: "认证具有法律效力吗？",
        a: "是的。认证由俄罗斯官方认证机构出具，在俄罗斯境内具有完整法律效力。可用于签证申请、入学注册、婚姻登记、工作许可等各类场景。",
      },
    ],
  },
  {
    category: "办理流程",
    items: [
      {
        q: "整个认证流程需要多长时间？",
        a: "一般情况下，从提交扫描件到完成认证需要10-15个工作日。具体包括：翻译2-3个工作日，官方机构认证5-7个工作日，快递寄送1-3天。如需加急服务可联系客服，最快可当日完成。",
      },
      {
        q: "和传统双认证有什么区别？",
        a: "传统双认证需要经过中国公证处→外交部→俄罗斯使馆三个环节，流程复杂且必须提供原件。我们的副本认证只需上传PDF扫描件，由我们完成翻译后直接提交俄罗斯官方认证机构认证，流程更简单、办理更快、无需原件。",
      },
      {
        q: "办理过程中我需要做什么？",
        a: "您只需要在线选择文件类型、上传PDF扫描件或清晰照片、填写基本信息并完成支付即可。后续翻译和认证全部由我们代办，您可在平台实时查看办理进度。",
      },
    ],
  },
  {
    category: "费用与支付",
    items: [
      {
        q: "费用包含哪些部分？",
        a: "费用包括：俄语专业翻译费、俄罗斯认证机构认证费以及代办服务费。所有费用在订单确认时明确列出，无隐藏收费。",
      },
      {
        q: "支持哪些支付方式？",
        a: "目前支持微信支付和支付宝两种在线支付方式。支付完成后即时生效，款项由第三方支付平台托管，保障您的资金安全。",
      },
      {
        q: "如果认证失败可以退款吗？",
        a: "如因我方原因导致认证失败，将全额退款。如因客户提供虚假或不清晰的材料导致失败，已产生的翻译和认证费用将无法退还。请务必提供真实、清晰的文件扫描件。",
      },
    ],
  },
  {
    category: "文件与材料",
    items: [
      {
        q: "需要提供文件原件吗？",
        a: "不需要！这是我们的核心优势。您只需提供文件的清晰扫描件（PDF格式）或照片即可办理认证。无需邮寄原件，您的文件始终安全地保存在您手中。认证完成后，认证文件通过快递寄送给您。",
      },
      {
        q: "文件需要翻译成俄语吗？",
        a: "需要。俄罗斯使馆认证要求文件附有俄语翻译。我们的服务包含了专业俄语翻译，翻译件由具有资质的翻译公司出具，确保符合使馆要求。",
      },
      {
        q: "PDF扫描件有什么要求？",
        a: "请确保文件扫描件清晰可读，四角完整，无遮挡反光。支持PDF、JPG、PNG格式，单文件不超过10MB。手机拍照也可以，只要内容清晰即可。我们会审核材料质量，如有问题会及时通知您补传。",
      },
    ],
  },
  {
    category: "其他问题",
    items: [
      {
        q: "服务覆盖哪些地区？",
        a: "我们的服务覆盖全国所有省市。无论您在哪个城市，都可以通过在线方式办理文件认证。认证完成后的文件通过快递寄送到您指定的地址。",
      },
      {
        q: "如何联系客服？",
        a: "您可以通过多种方式联系我们：1）点击页面右下角的在线客服按钮；2）拨打客服热线 400-888-9999（工作日9:00-18:00）；3）发送邮件至 service@cnru-auth.com。",
      },
      {
        q: "认证后的文件有效期是多久？",
        a: "认证本身是对文件签发时真实性的确认，一般没有固定有效期。但文件中涉及的内容可能有时效性（如无犯罪记录证明通常要求3-6个月内出具）。建议按使用方要求确认。",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            常见问题
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            关于中俄文件认证的常见问题和解答，找不到答案？联系在线客服获取帮助
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {faqs.map((group) => (
            <div key={group.category}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((item, idx) => {
                  const key = `${group.category}-${idx}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div
                      key={key}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 text-sm">
                          {item.q}
                        </span>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            还有其它问题？
          </h2>
          <p className="text-gray-500 mb-6">
            联系我们的在线客服或拨打服务热线，获得专业解答
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
              在线咨询
            </button>
            <div className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700">
              📞 400-888-9999
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
