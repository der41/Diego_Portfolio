"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { about } from "@/data/about";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

export default function ScrollytellingLayout() {
  const chordMountRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Dynamic imports to avoid SSR issues
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("d3"),
    ]).then(([{ default: gsap }, { ScrollTrigger }, d3Module]) => {
      const d3 = d3Module;
      gsap.registerPlugin(ScrollTrigger);

      // ── D3 Chord Diagram ──────────────────────────────────────────
      if (chordMountRef.current) {
        const width = 500;
        const height = 500;
        const innerRadius = Math.min(width, height) * 0.5 - 70;
        const outerRadius = innerRadius + 12;

        const names = ["Economics", "Statistics", "Engineering", "CS", "Communication", "Arts"];
        const colors = ["#003c73", "#006971", "#6f2100", "#d5e3ff", "#006f78", "#7cd4de"];

        const matrix = [
          [10, 20, 15,  5, 10,  5],
          [20, 10, 25, 20,  5,  5],
          [15, 25, 10, 30,  5, 10],
          [ 5, 20, 30, 10, 15, 15],
          [10,  5,  5, 15, 10, 25],
          [ 5,  5, 10, 15, 25, 10],
        ];

        const svg = d3.select(chordMountRef.current)
          .append("svg")
          .attr("viewBox", [-width / 2, -height / 2, width, height].join(" "))
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("style", "max-width: 100%; height: auto; font: 10px Inter;");

        const chord = d3.chord().padAngle(0.04).sortSubgroups(d3.descending);
        const arc = d3.arc<d3.ChordGroup>().innerRadius(innerRadius).outerRadius(outerRadius);
        const ribbon = d3.ribbon<d3.Chord, d3.ChordSubgroup>().radius(innerRadius);
        const chords = chord(matrix);

        const group = svg.append("g")
          .selectAll("g")
          .data(chords.groups)
          .join("g")
          .attr("class", "chord-group");

        group.append("path")
          .attr("fill", (d) => colors[d.index])
          .attr("d", arc as never);

        group.append("text")
          .each((d: d3.ChordGroup & { angle?: number }) => {
            d.angle = (d.startAngle + d.endAngle) / 2;
          })
          .attr("dy", ".35em")
          .attr("transform", (d: d3.ChordGroup & { angle?: number }) => {
            const angle = d.angle ?? 0;
            const angleDeg = angle * 180 / Math.PI;
            const x = Math.sin(angle) * (outerRadius + 24);
            const y = -Math.cos(angle) * (outerRadius + 24);
            const isBottom = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2;
            return `translate(${x},${y}) rotate(${angleDeg + (isBottom ? 180 : 0)})`;
          })
          .attr("text-anchor", "middle")
          .style("font-family", "Inter, sans-serif")
          .style("font-size", "11px")
          .style("font-weight", "700")
          .style("letter-spacing", "0.1em")
          .style("text-transform", "uppercase")
          .style("fill", "#424751cc")
          .text((d) => names[d.index]);

        const ribbons = svg.append("g")
          .attr("fill-opacity", 0.6)
          .selectAll("path")
          .data(chords)
          .join("path")
          .attr("class", "chord-ribbon")
          .attr("d", ribbon as never)
          .attr("fill", (d) => colors[d.source.index])
          .attr("stroke", (d) => d3.rgb(colors[d.source.index]).darker().toString());

        group
          .on("mouseover", (_: MouseEvent, d: d3.ChordGroup) => {
            ribbons.style("opacity", (r: d3.Chord) =>
              r.source.index === d.index || r.target.index === d.index ? 1 : 0.1
            );
          })
          .on("mouseout", () => {
            ribbons.style("opacity", 1);
          });
      }

      // ── GSAP Scroll Animations ────────────────────────────────────
      const container = document.getElementById("chord-container");
      const blocks = document.querySelectorAll<HTMLElement>(".discipline-block");

      if (container) gsap.set(container, { opacity: 0, scale: 0.5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#scrollytelling-section",
          start: "top 125%",
          end: "top 10%",
          scrub: 0.8,
        },
      });

      blocks.forEach((block, index) => {
        const blockRect = block.getBoundingClientRect();
        tl.to(block, {
          x: () => {
            if (!container) return 0;
            const rect = container.getBoundingClientRect();
            return rect.left + rect.width / 2 - (blockRect.left + blockRect.width / 2);
          },
          y: () => {
            if (!container) return 0;
            const rect = container.getBoundingClientRect();
            return rect.top + rect.height / 2 - (blockRect.top + blockRect.height / 2);
          },
          scale: 0.1,
          opacity: 0,
          rotate: 360,
          duration: 2,
          ease: "power2.inOut",
        }, index * 0.1);
      });

      tl.to(container, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=1");

      ScrollTrigger.create({
        trigger: "#chord-sticky-col",
        start: "top top+=160",
        endTrigger: "#scrollytelling-section",
        end: "bottom bottom-=400",
        onUpdate: (self) => {
          gsap.to("#d3-chord-mount svg", {
            rotate: self.getVelocity() / 600,
            duration: 0.5,
          });
        },
      });

      ScrollTrigger.create({
        trigger: "#chord-sticky-col",
        start: "top top+=80",
        endTrigger: "#projects-section",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    });
  }, []);

  return (
    <main className="max-w-[1920px] mx-auto px-12 py-24 relative z-10" id="scrollytelling-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 relative">

        {/* ── Left Column: Vertical Timeline ──────────────────────── */}
        <div className="lg:col-span-7 space-y-48 relative">
          <div className="timeline-connector" />

          {/* ── ABOUT ─────────────────────────────────────────────── */}
          <section className="relative" id="about-section">
            <div className="flex items-center gap-12 mb-16 relative z-10">
              <div className="w-20 h-20 rounded-[50%] bg-[#003c73] flex items-center justify-center text-white shadow-2xl ring-[12px] ring-[#faf8ff]">
                <span className="material-symbols-outlined text-4xl">person</span>
              </div>
              <h2 className="font-['Noto_Serif'] text-5xl font-bold tracking-tight">About</h2>
            </div>
            <div className="ml-20 space-y-12">
              {about.map((item) => (
                <div key={item.id} className="relative pl-16 group">
                  <div className="branch-line w-20 top-1/2 -left-10" style={{ height: '1px' }} />
                  <div className="bg-[#d5e3ff]/30 p-8 rounded-xl shadow-sm border border-[#003c73]/10 hover:shadow-md transition-shadow">
                    <span className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#003c73] font-bold block mb-2">
                      {item.label}
                    </span>
                    <h4 className="font-['Noto_Serif'] text-xl mb-3">{item.title}</h4>
                    <p className="text-[#424751] text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── EDUCATION ─────────────────────────────────────────── */}
          <section className="relative" id="education-section">
            <div className="flex items-center gap-12 mb-16 relative z-10">
              <div className="w-20 h-20 rounded-[50%] bg-[#006971] flex items-center justify-center text-white shadow-2xl ring-[12px] ring-[#faf8ff]">
                <span className="material-symbols-outlined text-4xl">school</span>
              </div>
              <h2 className="font-['Noto_Serif'] text-5xl font-bold tracking-tight">Education</h2>
            </div>
            <div className="ml-20 space-y-12">
              {education.map((item) => (
                <div key={item.id} className="relative pl-16 group">
                  <div className="branch-line w-20 top-1/2 -left-10" style={{ height: '1px' }} />
                  <div className="bg-[#98f1fa]/30 p-8 rounded-xl shadow-sm border border-[#006971]/10 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-['Inter'] text-xs tracking-widest uppercase text-[#006971] font-bold">
                        {item.label}
                      </span>
                      {item.institution && (
                        <span className="text-[#424751]/60 text-sm font-medium">{item.institution}</span>
                      )}
                    </div>
                    <h4 className="font-['Noto_Serif'] text-xl mb-3">{item.title}</h4>
                    <p className="text-[#424751] text-sm leading-relaxed mb-6">{item.body}</p>
                    {item.imageUrl && (
                      <div className="w-full h-48 relative rounded-lg overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.institution ?? item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── EXPERIENCE ────────────────────────────────────────── */}
          <section className="relative" id="experience-section">
            <div className="flex items-center gap-12 mb-16 relative z-10">
              <div className="w-20 h-20 rounded-[50%] bg-[#6f2100] flex items-center justify-center text-white shadow-2xl ring-[12px] ring-[#faf8ff]">
                <span className="material-symbols-outlined text-4xl">work</span>
              </div>
              <h2 className="font-['Noto_Serif'] text-5xl font-bold tracking-tight">Experience</h2>
            </div>
            <div className="ml-20 space-y-12">
              {experience.map((item) => (
                <div key={item.id} className="relative pl-16 group">
                  <div className="branch-line w-20 top-1/2 -left-10" style={{ height: '1px' }} />
                  <div className="bg-[#ffdbcf]/30 p-8 rounded-xl shadow-sm border border-[#6f2100]/10 hover:shadow-md transition-shadow">
                    <span className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#6f2100] font-bold block mb-2">
                      {item.org}
                    </span>
                    <h4 className="font-['Noto_Serif'] text-xl mb-3">{item.role}</h4>
                    <p className="text-[#424751] text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── PROJECTS ──────────────────────────────────────────── */}
          <section className="relative" id="projects-section">
            <div className="flex items-center gap-12 mb-16 relative z-10">
              <div className="w-20 h-20 rounded-[50%] bg-[#006f78] flex items-center justify-center text-white shadow-2xl ring-[12px] ring-[#faf8ff]">
                <span className="material-symbols-outlined text-4xl">grid_view</span>
              </div>
              <h2 className="font-['Noto_Serif'] text-5xl font-bold tracking-tight">Projects</h2>
            </div>
            <div className="ml-20">
              <div className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="min-w-[320px] md:min-w-[450px] snap-center bg-[#98f1fa]/20 p-8 rounded-xl border border-[#006f78]/10"
                  >
                    {project.imageUrl ? (
                      <div className="w-full h-48 relative rounded-lg overflow-hidden mb-6">
                        <Image src={project.imageUrl} alt={project.title} fill sizes="(max-width: 768px) 100vw, 450px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-[#003c73]/10 rounded-lg mb-6 flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl text-[#003c73]">
                          {project.icon}
                        </span>
                      </div>
                    )}
                    <h3 className="font-['Noto_Serif'] text-2xl mb-2">{project.title}</h3>
                    <p className="text-sm text-[#424751] mb-4">{project.description}</p>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#006f78] tracking-widest uppercase underline"
                      >
                        {project.tag}
                      </a>
                    ) : (
                      <span className="text-xs font-bold text-[#006f78] tracking-widest uppercase">
                        {project.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ── Right Column: Sticky Chord Diagram ──────────────────── */}
        <div className="lg:col-span-5 relative" id="chord-sticky-col">
          <div className="flex flex-col items-center">
            <div className="w-full">
              <div
                id="chord-container"
                className="w-full relative flex items-center justify-center min-h-[500px]"
              >
                <div ref={chordMountRef} id="d3-chord-mount" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
