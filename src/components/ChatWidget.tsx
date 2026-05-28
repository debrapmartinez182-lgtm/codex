"use client";

import { useState, useEffect } from "react";

// 微信客服链接 —— 在企业微信后台「应用管理 → 微信客服」获取后替换这里
const WECHAT_KF_URL = process.env.NEXT_PUBLIC_WECHAT_KF_URL || "";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const handleOpenWechat = () => {
    if (WECHAT_KF_URL) {
      window.open(WECHAT_KF_URL, "_blank");
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">1</span>
          </span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[320px] rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-green-500 to-green-600">
            <div className="flex items-center gap-2.5">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z"/>
              </svg>
              <span className="font-semibold text-white text-base">微信客服</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 text-center">
            {WECHAT_KF_URL ? (
              /* 已配置微信客服链接 */
              <>
                <p className="text-sm text-gray-600 mb-4">
                  {isMobile
                    ? "点击下方按钮，直接跳转微信与我对话"
                    : "扫码或点击按钮，立即与我对话"}
                </p>

                {!isMobile && (
                  <div className="mx-auto w-44 h-44 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/wechat-qr.jpg"
                      alt="微信二维码"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="text-gray-400 text-sm text-center px-4 z-0">
                      <svg className="w-10 h-10 mx-auto mb-1 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2.48a2.5 2.5 0 00-4.9 0H4m16 0a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 012-2h16z" />
                      </svg>
                      <span className="text-xs">二维码</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleOpenWechat}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z"/>
                  </svg>
                  {isMobile ? "打开微信联系客服" : "联系微信客服"}
                </button>
              </>
            ) : (
              /* 未配置，显示个人微信二维码模式 */
              <>
                <p className="text-sm text-gray-600 mb-4">
                  扫码添加微信，随时随地为您解答
                </p>

                <div className="mx-auto w-48 h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/wechat-qr.jpg"
                    alt="微信二维码"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="text-gray-400 text-sm text-center px-4 z-0">
                    <svg className="w-10 h-10 mx-auto mb-1 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2.48a2.5 2.5 0 00-4.9 0H4m16 0a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 012-2h16z" />
                    </svg>
                    <span className="text-xs">请放入微信二维码</span>
                  </div>
                </div>
              </>
            )}

            <p className="text-xs text-gray-400 mt-4">
              服务时间：工作日 9:00 - 18:00
            </p>
          </div>
        </div>
      )}
    </>
  );
}
