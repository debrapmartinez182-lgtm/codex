"use client";

const WECHAT_KF_URL = "https://work.weixin.qq.com/kfid/kfc02ec32730e8650a9";

export default function ChatWidget() {
  const handleClick = () => {
    window.open(WECHAT_KF_URL, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      title="微信客服"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z"/>
      </svg>
    </button>
  );
}
