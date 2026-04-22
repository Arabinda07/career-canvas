import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  CaretRight,
  Sparkle
} from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { 
    title: "RIASEC Method.", 
    desc: "mapping genuine interests to the environments where strength is built.", 
    span: "md:col-span-2"
  },
  { 
    title: "Big Five.", 
    desc: "the core architecture of personality. measured with surgical precision.", 
    span: "md:col-span-1"
  },
  { 
    title: "Aptitude V-N-L.", 
    desc: "logical, numerical, and verbal capacity benchmarks.", 
    span: "md:col-span-1"
  },
  { 
    title: "Institutional Scale.", 
    desc: "deployed across india's most prestigious pm shri schools.", 
    span: "md:col-span-2"
  }
];

export default function Landing() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Entrance
    const tl = gsap.timeline();
    tl.from(".hero-line", {
      y: 120,
      rotate: 2,
      opacity: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "expo.out"
    })
    .from(".hero-img-box", {
      scale: 1.1,
      opacity: 0,
      duration: 2,
      ease: "power2.out"
    }, "-=1");

    // Scrubbing Text Reveal
    gsap.to('.scrub-word', {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".scrub-container",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    });

    // Bento Entrance
    gsap.from(".bento-card", {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: container });

  return (
    <main ref={container} className="overflow-x-hidden w-full max-w-full bg-canvas-white">
      {/* Attention: Artistic Asymmetry Hero */}
      <section className="min-h-screen flex items-center pt-20 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center w-full">
          <div className="lg:col-span-8 relative z-10">
            <h1 className="hero-h1 mb-10">
              <span className="hero-line block overflow-hidden">
                most students choose 
              </span>
              <span className="hero-line block overflow-hidden text-electric-blue">
                their future. you can know yours.
              </span>
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl text-steel-secondary mb-12 leading-relaxed">
              a 60-minute psychometric assessment — grounded in three internationally validated frameworks — that maps your genuine strengths and interests to where you'll actually thrive.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <Link to="/start-assessment" className="taste-button-primary !px-10 !py-5 !text-lg group">
                start assessment <CaretRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block hero-img-box">
             <div className="relative aspect-[3/4] rounded-[5rem] overflow-hidden border border-charcoal-ink/5 bg-pure-surface flex items-center justify-center -rotate-2">
                <Sparkle weight="thin" size={200} className="text-charcoal-ink/5" />
             </div>
          </div>
        </div>
      </section>

      {/* Interest: Distilled Bento Grid */}
      <section id="features" className="section-padding px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.85] mb-6">
              the science of <br /> <span className="text-electric-blue">self-discovery.</span>
            </h2>
            <p className="text-muted-slate text-lg lowercase leading-relaxed">
              our framework doesn't just ask questions; it measures cognitive architecture across three scientific pillars.
            </p>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-widest text-charcoal-ink items-center">
            <span className="flex items-center gap-2">RIASEC</span>
            <span className="flex items-center gap-2">BIG FIVE</span>
            <span className="flex items-center gap-2">APTITUDE</span>
          </div>
        </div>

        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 grid-flow-dense gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`bento-card relative group overflow-hidden ${f.span} taste-card p-16 flex flex-col justify-end min-h-[400px]`}
            >
              <div className="absolute top-10 right-10">
                <CaretRight weight="bold" size={32} className="text-charcoal-ink/10" />
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 text-charcoal-ink italic">{f.title}</h3>
              <p className="text-steel-secondary text-lg lowercase max-w-[280px] font-medium leading-tight">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Desire: GSAP Text Scroll */}
      <section className="section-padding bg-charcoal-ink text-pure-surface relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10 scrub-container">
          <div className="text-[clamp(1.2rem,3vw,2.5rem)] font-display font-medium leading-[1.2] tracking-tight uppercase italic font-black">
            {`future canvas was built to solve a single catastrophic failure in the indian education system: stream selection based on peer pressure. by deploying at scale in pm shri kendriya vidyalayas, we provide every student with a validated cognitive mirror, ensuring their potential isn't just guessed at, but perfectly mapped according to international psychometric benchmarks.`.split(' ').map((word, i) => (
              <span key={i} className="scrub-word inline-block mr-[0.3em] opacity-10">
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Action: Massive CTA */}
      <section className="section-padding px-6 max-w-7xl mx-auto">
        <div className="bg-electric-blue text-white p-16 md:p-24 rounded-[3rem] text-left relative overflow-hidden group">
          <div className="relative z-10 w-full max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.85] mb-10">
              future-proof <br /> your path.
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-8">
               <Link to="/start-assessment" className="taste-button-primary !bg-white !text-charcoal-ink !px-12 !py-6 !text-xl hover:!scale-105 border-none shadow-none no-underline">
                  start assessment
               </Link>
               <Link to="/science" className="text-lg font-display font-black uppercase italic tracking-tighter border-b-2 border-white/30 hover:border-white transition-all pb-1">
                  the science
               </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
