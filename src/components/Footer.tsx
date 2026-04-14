const disciplines = ["Economics", "Statistics", "Engineering", "CS", "Arts"];

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-[#faf8ff] border-t border-[#191b21]/10 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
          {disciplines.map((d) => (
            <a
              key={d}
              href="#"
              className="font-['Inter'] text-xs tracking-widest uppercase text-[#191b21]/40 hover:text-[#003c73] transition-all"
            >
              {d}
            </a>
          ))}
        </div>
        <div className="font-['Inter'] text-[10px] tracking-[0.2em] uppercase text-[#191b21]/40">
          © 2026 Diego Rodriguez | The Digital Curator. All Data Visualized.
        </div>
      </div>
    </footer>
  );
}
