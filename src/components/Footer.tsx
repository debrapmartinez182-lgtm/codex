import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🇨🇳</span>
              <span className="text-lg font-bold text-white">
                中俄文件认证
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              专业提供中俄两国文件公证、认证一站式服务。覆盖留学、婚姻、法律等各类文件需求，
              服务范围遍及全国，让您足不出户完成文件认证。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-sm hover:text-white transition-colors"
                >
                  服务介绍
                </Link>
              </li>
              <li>
                <Link
                  href="/documents"
                  className="text-sm hover:text-white transition-colors"
                >
                  文件类型
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-white transition-colors"
                >
                  常见问题
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="text-sm hover:text-white transition-colors"
                >
                  在线办理
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">联系我们</h4>
            <ul className="space-y-2 text-sm">
              <li>📧 service@cnru-auth.com</li>
              <li>📱 400-888-9999</li>
              <li>🕐 工作日 9:00-18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800">
          <p className="text-xs text-center">
            &copy; {new Date().getFullYear()} 中俄文件认证服务平台. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
