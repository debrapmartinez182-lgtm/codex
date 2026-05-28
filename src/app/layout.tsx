import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  title: {
    default: "中俄文件认证_俄罗斯公证双认证_在线办理一站式服务",
    template: "%s | 中俄文件认证",
  },
  description:
    "专业提供中俄两国文件公证认证一站式服务。护照认证、学历认证、结婚证认证、无犯罪记录认证、驾驶证认证、出生证明认证等，PDF扫描件即可办理，俄罗斯官方认证机构认证，全国服务在线办理。",
  keywords:
    "中俄文件认证,俄罗斯公证认证,俄语翻译,护照认证,学历认证,结婚证认证,无犯罪记录认证,驾驶证认证,出生证明认证,俄罗斯签证文件,留学公证双认证,EAC认证,俄罗斯大学留学",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://eztd.cn",
    siteName: "中俄文件认证",
    title: "中俄文件认证 - 俄罗斯公证双认证一站式服务",
    description:
      "专业提供中俄两国文件公证认证一站式服务，PDF扫描件即可办理，俄罗斯官方认证机构认证，全国服务在线办理。",
    images: [{ url: "https://eztd.cn/logo.jpg", width: 512, height: 512 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
