"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { about } from "@/data/about";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

// ── Static graph-network decoration ───────────────────────────────────────────
type ClusterVariant = "a" | "b" | "c" | "d";

interface NodeDef { x: number; y: number; r: number; c: string }
interface ClusterDef { w: number; h: number; nodes: NodeDef[]; edges: [number, number][] }

const CLUSTERS: Record<ClusterVariant, ClusterDef> = {
  // Cluster A — start of the network (top of left column, larger)
  a: {
    w: 360, h: 260,
    nodes: [
      { x: 160, y: 90,  r: 14, c: "#003c73" },
      { x: 240, y: 55,  r: 9,  c: "#006971" },
      { x: 300, y: 130, r: 10, c: "#6f2100" },
      { x: 75,  y: 75,  r: 8,  c: "#7cd4de" },
      { x: 55,  y: 160, r: 7,  c: "#006f78" },
      { x: 200, y: 175, r: 11, c: "#003c73" },
      { x: 330, y: 195, r: 7,  c: "#006971" },
      { x: 130, y: 260, r: 8,  c: "#6f2100" },
      { x: 295, y: 230, r: 9,  c: "#7cd4de" },
      { x: 35,  y: 220, r: 7,  c: "#003c73" },
      { x: 360, y: 75,  r: 8,  c: "#006f78" },
      { x: 245, y: 245, r: 7,  c: "#6f2100" },
      { x: 95,  y: 140, r: 9,  c: "#006971" },
      { x: 395, y: 155, r: 7,  c: "#7cd4de" },
    ],
    edges: [
      [0,1],[0,2],[0,5],[0,12],[0,3],
      [1,2],[1,10],[1,3],
      [2,6],[2,13],
      [3,4],[3,12],
      [4,9],[4,7],
      [5,7],[5,8],[5,12],
      [6,8],[6,13],
      [7,11],[7,9],
      [8,11],
      [10,13],
    ],
  },
  // Cluster B — between Education and Experience (medium)
  b: {
    w: 280, h: 200,
    nodes: [
      { x: 50,  y: 0,  r: 12, c: "#006971" },
      { x: 165, y: 20,  r: 8,  c: "#003c73" },
      { x: 305, y: 55, r: 9,  c: "#6f2100" },
      { x: 130, y: 115, r: 7,  c: "#7cd4de" },
      { x: 50,  y: 125, r: 8,  c: "#006f78" },
      { x: 310, y: 95, r: 7,  c: "#003c73" },
      { x: 255, y: 30,  r: 7,  c: "#006971" },
      { x: 65,  y: 100, r: 9,  c: "#6f2100" },
      { x: 225, y: 120, r: 7,  c: "#7cd4de" },
      { x: 140, y: 65,  r: 8,  c: "#006f78" },
    ],
    edges: [
      [0,1],[0,4],[0,9],[0,3],
      [1,2],[1,6],[1,9],
      [2,5],[2,3],[2,6],
      [3,4],[3,5],[3,9],
      [4,7],
      [5,8],
      [7,8],
    ],
  },
  // Cluster D — between About and Education (linear chain, like a path)
  d: {
    w: 460, h: 100,
    nodes: [
      { x: 20,  y: 0, r: 9,  c: "#003c73" },
      { x: 95,  y: 38, r: 7,  c: "#006971" },
      { x: 170, y: 62, r: 10, c: "#6f2100" },
      { x: 200, y: 90, r: 7,  c: "#7cd4de" },
      { x: 260, y: 96, r: 8,  c: "#006f78" },
      { x: 320, y: 42, r: 9,  c: "#003c73" },
      { x: 535, y: 40, r: 7,  c: "#7cd4de" },
      { x: 635, y: 88, r: 10,  c: "#006971" },
    ],
    edges: [
      [0,1],[1,2],[2,3],[4,5],[5,6],[6,7],
      [0,2],[2,4],[4,6],
    ],
  },
  // Cluster C — between Experience and Projects (smaller, sparser)
  c: {
    w: 260, h: 185,
    nodes: [
      { x: 400, y: 50,  r: 11, c: "#7cd4de" },
      { x: 785, y: 48,  r: 7,  c: "#006971" },
      { x: 625, y: 120, r: 9,  c: "#003c73" },
      { x: 60,  y: 130, r: 8,  c: "#6f2100" },
      { x: 555, y: 150, r: 7,  c: "#006f78" },
      { x: 480, y: 102, r: 8,  c: "#7cd4de" },
      { x: 52,  y: 12,  r: 7,  c: "#003c73" },
      { x: 685, y: 170, r: 9,  c: "#6f2100" },
      { x: 510, y: 165, r: 7,  c: "#006971" },
    ],
    edges: [
      [0,1],[0,3],[0,4],[0,6],
      [1,2],
      [2,4],[2,5],
      [3,6],
      [4,7],[4,8],
      [5,7],
    ],
  },
};

function GraphCluster({ variant, className = "" }: { variant: ClusterVariant; className?: string }) {
  const { w, h, nodes, edges } = CLUSTERS[variant];
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${w} ${h}`}
      className={`pointer-events-none select-none ${className}`}
      style={{ overflow: "visible" }}
    >
      <g>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="#424751"
            strokeOpacity={0.13}
            strokeWidth={1}
          />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x} cy={n.y} r={n.r}
            fill={n.c}
            fillOpacity={0.13}
            stroke={n.c}
            strokeOpacity={0.28}
            strokeWidth={1.5}
          />
        ))}
      </g>
    </svg>
  );
}

function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-[#1f242c]">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
// ──────────────────────────────────────────────────────────────────────────────

export default function ScrollytellingLayout() {
  const chordMountRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    let isDisposed = false;
    const cleanupFns: Array<() => void> = [];
    const mountNode = chordMountRef.current;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("d3"),
    ]).then(([{ default: gsap }, { ScrollTrigger }, d3Module]) => {
      if (isDisposed) return;
      const d3 = d3Module;
      gsap.registerPlugin(ScrollTrigger);

      // ── Per-card chord highlight mapping ─────────────────────────
      // Indices: 0=Economics, 1=Statistics, 2=Engineering, 3=CS, 4=Communication, 5=Arts
      const cardChordMap: Record<string, number[]> = {
        "applied-research": [0, 1, 4],
        "duke-ms": [3, 2, 1, 5],
        "mit-data-analytics": [4, 2, 3],
        "uchile-undergrad": [0, 4, 5],
        "yodlee": [3, 2, 5],
        "central-bank": [4, 0, 1],
        "oecd-duke": [4, 0],
      };
      // Recency weight: last 5 yrs = 3, 5–10 yrs = 2, older = 1.
      const cardWeights: Record<string, number> = {
        "applied-research": 3,
        "duke-ms": 3,
        "mit-data-analytics": 2,
        "uchile-undergrad": 1,
        "yodlee": 3,
        "central-bank": 2,
        "oecd-duke": 3,
      };

      // ── D3 Chord Diagram ──────────────────────────────────────────
      if (chordMountRef.current) {
        const width = 500;
        const height = 500;
        const innerRadius = Math.min(width, height) * 0.5 - 70;
        const outerRadius = innerRadius + 12;

        const names = ["Economics", "Statistics", "Engineering", "CS", "Communication", "Arts"];
        const colors = ["#003c73", "#006971", "#6f2100", "#d5e3ff", "#006f78", "#7cd4de"];

        const matrix: number[][] = Array.from({ length: 6 }, () => Array(6).fill(0));
        Object.entries(cardChordMap).forEach(([id, disciplines]) => {
          const w = cardWeights[id] ?? 1;
          disciplines.forEach((i) => { matrix[i][i] += w; });
          for (let a = 0; a < disciplines.length; a++) {
            for (let b = a + 1; b < disciplines.length; b++) {
              matrix[disciplines[a]][disciplines[b]] += w;
              matrix[disciplines[b]][disciplines[a]] += w;
            }
          }
        });

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
          .attr("fill-opacity", 0.9)
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
          .attr("stroke", (d) => d3.rgb(colors[d.source.index]).darker().toString())
          .attr("stroke-opacity", 0.35);

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

      const activeCards = new Set<string>();
      const applyChordFocus = () => {
        const active = new Set<number>();
        activeCards.forEach((id) => cardChordMap[id]?.forEach((i) => active.add(i)));
        const hasFocus = active.size > 0;
        d3.selectAll<SVGPathElement, d3.Chord>(".chord-ribbon")
          .transition().duration(450)
          .style("opacity", (d) =>
            !hasFocus ? 1 : active.has(d.source.index) || active.has(d.target.index) ? 1 : 0.08
          );
        d3.selectAll<SVGGElement, d3.ChordGroup>(".chord-group")
          .transition().duration(450)
          .style("opacity", (d) => (!hasFocus ? 1 : active.has(d.index) ? 1 : 0.3));
      };
      document.querySelectorAll<HTMLElement>("[data-card-id]").forEach((el) => {
        const id = el.dataset.cardId;
        if (!id || !(id in cardChordMap)) return;
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => { activeCards.add(id); applyChordFocus(); },
          onEnterBack: () => { activeCards.add(id); applyChordFocus(); },
          onLeave: () => { activeCards.delete(id); applyChordFocus(); },
          onLeaveBack: () => { activeCards.delete(id); applyChordFocus(); },
        });
        cleanupFns.push(() => trigger.kill());
      });

      // ── GSAP Scroll Animations ────────────────────────────────────
      const container = document.getElementById("chord-container");
      const blocks = document.querySelectorAll<HTMLElement>(".discipline-block");
      const heroIntroCopy = document.getElementById("hero-intro-copy");

      if (container) gsap.set(container, { opacity: 0, scale: 0.5 });
      if (heroIntroCopy) gsap.set(heroIntroCopy, { autoAlpha: 0, y: 28 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#scrollytelling-section",
          start: "top 125%",
          end: "top 10%",
          scrub: 0.8,
        },
      });
      cleanupFns.push(() => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });

      if (heroIntroCopy) {
        const introReveal = gsap.to(heroIntroCopy, {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top-=250",
            end: "top top-=350",
            scrub: 0.6,
          },
        });
        cleanupFns.push(() => {
          introReveal.scrollTrigger?.kill();
          introReveal.kill();
        });
      }

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

      const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");
      const pinCleanupFns: Array<() => void> = [];
      const setupPinTrigger = () => {
        pinCleanupFns.splice(0, pinCleanupFns.length).forEach((cleanup) => cleanup());

        if (!desktopMediaQuery.matches) return;

        const pinTrigger = ScrollTrigger.create({
          trigger: "#chord-sticky-col",
          start: "top top+=80",
          endTrigger: "#projects-cards",
          end: "top top+=80",
          pin: true,
          pinSpacing: false,
        });
        pinCleanupFns.push(() => pinTrigger.kill());
      };

      setupPinTrigger();
      const handleViewportChange = () => setupPinTrigger();
      desktopMediaQuery.addEventListener("change", handleViewportChange);
      cleanupFns.push(() => {
        desktopMediaQuery.removeEventListener("change", handleViewportChange);
        pinCleanupFns.splice(0, pinCleanupFns.length).forEach((cleanup) => cleanup());
      });
    });

    return () => {
      isDisposed = true;
      initialized.current = false;
      cleanupFns.forEach((cleanup) => cleanup());
      mountNode?.replaceChildren();
    };
  }, []);

  return (
    <main className="max-w-[1920px] mx-auto px-12 pt-24 pb-8 relative z-10" id="scrollytelling-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 relative">

        {/* ── Left Column: Vertical Timeline ──────────────────────── */}
        <div className="lg:col-span-7 relative">
          <div className="timeline-connector" />

          {/* ── Cluster A: sits above the line, between hero and timeline start ── */}
          <div className="relative h-0" aria-hidden="true">
            <div className="absolute left-10 top-0 pointer-events-none -translate-x-[14%] -translate-y-[75%] z-0">
              <GraphCluster variant="a" className="w-[32rem] h-80" />
            </div>
          </div>

          {/* ── ABOUT ─────────────────────────────────────────────── */}
          <section className="relative mb-48" id="about-section">
            <div className="flex items-center gap-12 mb-16 relative z-10">
              <div className="w-20 h-20 rounded-[50%] bg-[#003c73] flex items-center justify-center text-white shadow-2xl ring-[12px] ring-[#faf8ff]">
                <span className="material-symbols-outlined text-4xl">person</span>
              </div>
              <h2 className="font-['Noto_Serif'] text-5xl font-bold tracking-tight">About</h2>
            </div>
            <div className="ml-20 space-y-12">
              {about.map((item) => (
                <div key={item.id} data-card-id={item.id} className="relative pl-16 group">
                  <div className="branch-line w-20 top-1/2 -left-10" style={{ height: "1px" }} />
                  <div className="bg-[#d5e3ff]/30 p-8 rounded-xl shadow-sm border border-[#003c73]/10 hover:shadow-md transition-shadow">
                    <span className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#003c73] font-bold block mb-2">
                      {item.label}
                    </span>
                    <h4 className="font-['Noto_Serif'] text-xl mb-3">{item.title}</h4>
                    <p className="font-['Inter'] text-sm text-[#424751] leading-relaxed">
                      {renderBold(item.body)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Cluster D: a line-with-nodes crossing into Education ─ */}
          <div className="relative h-0 my-20" aria-hidden="true">
            <div className="absolute left-10 top-0 pointer-events-none -translate-x-[10%] -translate-y-[180%] z-0">
              <GraphCluster variant="d" className="w-[32rem] h-24" />
            </div>
          </div>

          {/* ── EDUCATION ─────────────────────────────────────────── */}
          <section className="relative mb-0" id="education-section">
            <div className="flex items-center gap-12 mb-16 relative z-10">
              <div className="w-20 h-20 rounded-[50%] bg-[#006971] flex items-center justify-center text-white shadow-2xl ring-[12px] ring-[#faf8ff]">
                <span className="material-symbols-outlined text-4xl">school</span>
              </div>
              <h2 className="font-['Noto_Serif'] text-5xl font-bold tracking-tight">Education</h2>
            </div>
            <div className="ml-20 space-y-12">
              {education.map((item) => (
                <div key={item.id} data-card-id={item.id} className="relative pl-16 group">
                  <div className="branch-line w-20 top-1/2 -left-10" style={{ height: "1px" }} />
                  <div className="bg-[#98f1fa]/30 p-8 rounded-xl shadow-sm border border-[#006971]/10 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <span className="font-['Inter'] text-xs tracking-widest uppercase text-[#006971] font-bold">
                        {item.label}
                      </span>
                      <span className="text-[#424751]/70 text-sm font-medium text-right">
                        {item.institution}
                        {item.dates && (
                          <span className="block text-xs text-[#424751]/50 mt-0.5">{item.dates}</span>
                        )}
                      </span>
                    </div>
                    <h4 className="font-['Noto_Serif'] text-xl mb-3">{item.title}</h4>
                    {item.formation && (
                      <p className="font-['Inter'] text-sm text-[#424751]/85 leading-relaxed mb-4">
                        <span className="font-semibold text-[#006971]">Relevant Coursework: </span>
                        {item.formation}
                      </p>
                    )}
                    <ul className="space-y-2 font-['Inter'] text-sm text-[#424751] leading-relaxed">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#006971]">
                          {renderBold(b)}
                        </li>
                      ))}
                    </ul>
                    {item.imageUrl && (
                      <div className="w-full h-48 relative rounded-lg overflow-hidden mt-4">
                        <Image
                          src={item.imageUrl}
                          alt={item.institution ?? item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 560px, 800px"
                          quality={95}
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Cluster B: emerges from the timeline between Edu/Exp  */}
          <div className="relative h-0 my-24" aria-hidden="true">
            <div className="absolute left-10 top-0 pointer-events-none -translate-x-[20%] -translate-y-1/2 z-0">
              <GraphCluster variant="b" className="w-64 h-44" />
            </div>
          </div>

          {/* ── EXPERIENCE ────────────────────────────────────────── */}
          <section className="relative mb-0" id="experience-section">
            <div className="flex items-center gap-12 mb-16 relative z-10">
              <div className="w-20 h-20 rounded-[50%] bg-[#6f2100] flex items-center justify-center text-white shadow-2xl ring-[12px] ring-[#faf8ff]">
                <span className="material-symbols-outlined text-4xl">work</span>
              </div>
              <h2 className="font-['Noto_Serif'] text-5xl font-bold tracking-tight">Experience</h2>
            </div>
            <div className="ml-20 space-y-12">
              {experience.map((item) => (
                <div key={item.id} data-card-id={item.id} className="relative pl-16 group">
                  <div className="branch-line w-20 top-1/2 -left-10" style={{ height: "1px" }} />
                  <div className="bg-[#ffdbcf]/30 p-8 rounded-xl shadow-sm border border-[#6f2100]/10 hover:shadow-md transition-shadow">
                    <span className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#6f2100] font-bold block mb-2">
                      {item.org}
                    </span>
                    <h4 className="font-['Noto_Serif'] text-xl mb-1">{item.role}</h4>
                    {item.dates && (
                      <span className="block font-['Inter'] text-xs text-[#424751]/60 mb-4">{item.dates}</span>
                    )}
                    <ul className="space-y-2 font-['Inter'] text-sm text-[#424751] leading-relaxed">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#6f2100]">
                          {renderBold(b)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Cluster C: emerges from the timeline between Exp/Proj */}
          <div className="relative h-0 my-24" aria-hidden="true">
            <div className="absolute left-10 top-0 pointer-events-none -translate-x-[20%] -translate-y-1/2 z-0">
              <GraphCluster variant="c" className="w-56 h-40" />
            </div>
          </div>

          {/* ── PROJECTS ──────────────────────────────────────────── */}
          <section className="relative" id="projects-section">
            <div className="flex items-center gap-12 mb-16 relative z-10">
              <div className="w-20 h-20 rounded-[50%] bg-[#006f78] flex items-center justify-center text-white shadow-2xl ring-[12px] ring-[#faf8ff]">
                <span className="material-symbols-outlined text-4xl">grid_view</span>
              </div>
              <h2 className="font-['Noto_Serif'] text-5xl font-bold tracking-tight">Projects</h2>
            </div>
            <div className="ml-20" id="projects-cards">
              <div className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="min-w-[340px] md:min-w-[480px] snap-center bg-[#98f1fa]/20 p-8 rounded-xl border border-[#006f78]/10"
                  >
                    {project.imageUrl ? (
                      <div className="w-full h-48 relative rounded-lg overflow-hidden mb-6">
                        <Image src={project.imageUrl} alt={project.title} fill sizes="(max-width: 768px) 100vw, 450px" quality={95} className={`object-cover ${project.imageClassName ?? ""}`} />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-[#003c73]/10 rounded-lg mb-6 flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl text-[#003c73]">
                          {project.icon}
                        </span>
                      </div>
                    )}
                    <h3 className="font-['Noto_Serif'] text-2xl mb-3">{project.title}</h3>
                    <p className="font-['Inter'] text-sm text-[#424751]/85 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <ul className="space-y-2 font-['Inter'] text-sm text-[#424751] leading-relaxed mb-4">
                      {project.bullets.map((b, i) => (
                        <li key={i} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#006f78]">
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-xs font-bold text-[#006f78] tracking-widest uppercase">
                        {project.tag}
                      </span>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-[#006f78] tracking-widest uppercase underline"
                        >
                          {project.linkLabel ?? "Live Demo"}
                        </a>
                      )}
                    </div>
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
