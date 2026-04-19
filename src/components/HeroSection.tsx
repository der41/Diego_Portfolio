import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      {/* Hero Profile Section */}
      <section
        id="me"
        className="pt-52 pb-32 px-4 sm:px-12 max-w-[1920px] mx-auto flex flex-col items-center text-center relative z-10"
      >
        {/* Profile image */}
        <div className="relative mb-10">
          <div className="w-40 h-40 rounded-[50%] overflow-hidden border-4 border-white shadow-2xl bg-[#ededf6]">
            <Image
              src="/images/Profile.jpg"
              alt="Diego Rodriguez"
              width={320}
              height={320}
              sizes="160px"
              quality={95}
              priority
              className="w-full h-full object-cover object-[50%_10%]"
            />
          </div>
        </div>

        <h1 className="font-['Noto_Serif'] text-5xl md:text-7xl font-bold text-[#191b21] mb-6 tracking-tight">
          Diego Rodriguez
        </h1>

        <p className="font-['Inter'] text-sm md:text-base tracking-[0.4em] uppercase text-[#424751]/80 mb-10">
          Data Science is Interdisciplinary
        </p>

        {/* Discipline color bar */}
        <div className="hidden sm:flex gap-2 h-2 w-full max-w-xl" id="discipline-blocks">
          <div className="discipline-block flex-1 bg-[#003c73] rounded-full" title="Economics" />
          <div className="discipline-block flex-1 bg-[#006971] rounded-full" title="Statistics" />
          <div className="discipline-block flex-1 bg-[#6f2100] rounded-full" title="Engineering" />
          <div className="discipline-block flex-1 bg-[#d5e3ff] rounded-full" title="Computer Science" />
          <div className="discipline-block flex-1 bg-[#006f78] rounded-full" title="Communication" />
          <div className="discipline-block flex-1 bg-[#7cd4de] rounded-full" title="Arts" />
        </div>
      </section>

      {/* Intro Narrative Header */}
      <header className="pb-20 px-4 sm:px-12 max-w-[1920px] mx-auto flex items-center border-b border-[#424751]/10 relative z-10">
        <div className="max-w-4xl" id="hero-intro-copy">
          <p className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#003c73] mb-6">
            
          </p>
          <h2 className="font-['Noto_Serif'] text-6xl md:text-8xl text-[#191b21] leading-[1.1] mb-8 font-bold tracking-tighter">
            This is my Journey in{" "}
            <span className="text-[#003c73] italic">Six Disciplines.</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#424751] max-w-2xl leading-relaxed font-light">
            An interdisciplinary journey weaving through Economics, Statistics, Engineering,
            Computer Science, Communication, and the Arts to build intellectual clarity in a
            digital age.
          </p>
        </div>
      </header>
    </>
  );
}
