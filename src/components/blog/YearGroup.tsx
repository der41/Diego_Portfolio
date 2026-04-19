import type { ReactNode } from "react";

export default function YearGroup({
  year,
  children,
}: {
  year: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-12">
      <div className="font-['Noto_Serif'] text-sm font-bold text-[#424751]/35 tracking-[0.08em] mb-5 pb-2 border-b border-[#424751]/[0.08]">
        {year}
      </div>
      {children}
    </div>
  );
}
