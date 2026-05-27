"use client";

interface CaseData {
  document: string;
  image: string;
  user: string;
  scenario: string;
  result: string;
  days: string;
}

export default function CaseImageCard({ c }: { c: CaseData }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1 flex-shrink-0 w-[300px] sm:w-[340px]">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.image}
          alt={c.document}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const el = e.currentTarget;
            el.style.display = "none";
            if (el.nextElementSibling) {
              (el.nextElementSibling as HTMLElement).classList.remove("hidden");
            }
          }}
        />
        <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
          <span className="text-4xl opacity-60">📄</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4">
          <h3 className="text-white text-base font-bold drop-shadow-md">{c.document}</h3>
          <p className="text-white/70 text-xs">{c.user}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{c.scenario}</p>
        <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">{c.result}</p>
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">办理周期</span>
          <span className="text-sm font-semibold text-green-600">
            {c.days === "7" ? "1周" : `${c.days}个工作日`}
          </span>
        </div>
      </div>
    </div>
  );
}
