import { jsPDF } from "jspdf";
import { 
  DownloadSimple, 
  SealCheck, 
  CaretRight, 
  ChartPolar, 
  Database, 
  Sparkle, 
  User, 
  Calendar,
  Strategy,
  TrendUp
} from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function Report() {
  const reportData = {
    studentName: "Alex Newman",
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).toLowerCase(),
    riasecTopMacthes: [
      { code: "investigative", score: 85, summary: "subject indicates exceptional capacity for high-density analytical parsing and systematic problem resolution." },
      { code: "realistic", score: 72, summary: "strong affinity for concrete tactical execution and physical-geometric hardware manipulation." },
      { code: "conventional", score: 65, summary: "prefers structured organizational matrices and linear operational guidelines." }
    ],
    bigFiveMatches: [
      { trait: "openness", level: "HIGH", summary: "imaginative cognitive expansion." },
      { trait: "conscientiousness", level: "MAX", summary: "surgical level procedural discipline." },
      { trait: "extraversion", level: "MID", summary: "balanced social-individual resonance." },
      { trait: "agreeableness", level: "HIGH", summary: "high cooperative empathy calibration." },
      { trait: "neuroticism", level: "MIN", summary: "stable emotional core architecture." }
    ],
    careerPaths: ["data architect", "systems engineer", "security analyst"]
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("FUTURE CANVAS: ANALYTIC REPORT", 20, 30);
    doc.setFontSize(12);
    doc.text(`Subject: ${reportData.studentName}`, 20, 50);
    doc.text(`Date: ${reportData.date}`, 20, 60);
    doc.save("FutureCanvas_Report.pdf");
  };

  return (
    <main className="pt-24 pb-24 px-6 max-w-7xl mx-auto space-y-12">
      {/* Report Header */}
      <div className="bg-charcoal-ink text-pure-surface p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group">
        <div className="relative z-10 space-y-10">
          <div className="flex flex-wrap items-center gap-6">
            <span className="px-5 py-2 bg-electric-blue text-[10px] font-display font-black uppercase tracking-[3px] rounded-full shadow-2xl">Analysis V3.0 Final</span>
            <span className="text-[10px] font-display font-black text-muted-slate uppercase tracking-[3px] flex items-center gap-3">
              <Calendar weight="bold" size={14} /> {reportData.date}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-[0.75] italic uppercase">
            Personal <br /> <span className="text-electric-blue">Analysis.</span>
          </h1>
          <div className="flex items-center gap-6 text-muted-slate underline underline-offset-8 decoration-white/10">
             <User weight="bold" size={24} />
             <span className="font-display font-black text-xl uppercase italic">{reportData.studentName}</span>
             <div className="w-px h-6 bg-white/20" />
             <span className="text-xs font-display font-black tracking-widest text-emerald-signal uppercase italic">authenticated node</span>
          </div>
        </div>
        <button 
          onClick={handleDownloadPDF}
          className="taste-button-primary !bg-white !text-charcoal-ink !px-12 !py-6 !text-xl hover:!scale-105 transition-all relative z-10 shadow-none border-none"
        >
          <DownloadSimple weight="bold" className="mr-2" /> Export Protocol
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* RIASEC Analysis */}
        <div className="lg:col-span-8 space-y-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="taste-card !p-16 !border-charcoal-ink/5"
          >
            <div className="flex items-center gap-6 mb-16 underline underline-offset-8 decoration-charcoal-ink/10">
              <div className="w-16 h-16 bg-electric-blue/10 rounded-3xl flex items-center justify-center text-electric-blue">
                <Strategy weight="bold" size={32} />
              </div>
              <div>
                <h2 className="text-4xl font-display font-black uppercase tracking-tighter italic">Psychometric Framework</h2>
                <p className="text-[10px] font-display font-black text-muted-slate uppercase tracking-[3px]">RIASEC Standard Mapping</p>
              </div>
            </div>
            
            <div className="space-y-16">
              {reportData.riasecTopMacthes.map((r, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="text-[10px] font-display font-black text-electric-blue uppercase tracking-[3px] block mb-2">Priority Core 0{i+1}</span>
                      <h3 className="text-3xl font-display font-black uppercase tracking-tighter italic group-hover:text-electric-blue transition-colors leading-none">{r.code}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-display font-black text-charcoal-ink/5 group-hover:text-electric-blue/10 transition-colors italic">{r.score}% resonance</span>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-canvas-white border border-charcoal-ink/5 rounded-full overflow-hidden mb-8 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${r.score}%` }}
                      transition={{ duration: 1.5, delay: i * 0.3, ease: "expo.out" }}
                      className="h-full bg-charcoal-ink group-hover:bg-electric-blue transition-colors"
                    />
                  </div>
                  <p className="text-steel-secondary text-lg leading-relaxed max-w-3xl lowercase">
                    {r.summary}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-24 p-16 bg-canvas-white rounded-[3rem] border border-charcoal-ink/5 group hover:border-electric-blue/20 transition-all duration-700 shadow-2xl shadow-charcoal-ink/[0.02]">
              <h4 className="text-[10px] font-display font-black uppercase tracking-[4px] text-muted-slate mb-12 underline underline-offset-8 decoration-charcoal-ink/10">High Precision Career Trajectories</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportData.careerPaths.map((c, i) => (
                  <div key={i} className="bg-pure-surface border border-charcoal-ink/5 p-8 rounded-[1.5rem] font-display font-black uppercase text-xs tracking-[3px] flex items-center justify-between group-hover:border-electric-blue/10 transition-all hover:scale-[1.02] cursor-default italic">
                    {c} <CaretRight weight="bold" size={16} className="text-electric-blue" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Data */}
        <div className="lg:col-span-4 space-y-16">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-charcoal-ink text-pure-surface p-14 rounded-[3rem] shadow-none"
          >
            <h2 className="text-3xl font-display font-black uppercase tracking-tighter mb-12 text-electric-blue italic italic">Identity Matrix</h2>
            <div className="space-y-10">
              {reportData.bigFiveMatches.map((t, i) => (
                <div key={i} className="border-b border-white/5 pb-8 last:border-0 last:pb-0 group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-display font-black text-xl uppercase tracking-tighter group-hover:text-electric-blue transition-colors italic leading-none">{t.trait}</span>
                    <span className="text-[10px] font-display font-black text-electric-blue border-2 border-electric-blue/30 px-3 py-1 rounded-full uppercase tracking-widest">{t.level}</span>
                  </div>
                  <p className="text-[11px] font-display font-black uppercase tracking-widest text-muted-slate/60 leading-relaxed font-medium">
                    {t.summary}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="bg-amber-warmth p-14 rounded-[3rem] relative group border-none shadow-none">
            <SealCheck weight="bold" size={56} className="text-charcoal-ink mb-10 group-hover:rotate-12 transition-transform duration-700" />
            <h3 className="text-4xl font-display font-black uppercase tracking-tighter mb-6 leading-[0.8] italic underline underline-offset-4 decoration-charcoal-ink/20">Institutional <br /> Validation.</h3>
            <p className="text-sm font-display font-black uppercase leading-relaxed text-charcoal-ink/50 mb-12 tracking-widest italic">
              subject results have been securely encoded and transmitted to the institutional node for professional review.
            </p>
            <button className="w-full py-6 bg-charcoal-ink text-white font-display font-black text-[10px] uppercase tracking-[4px] rounded-full hover:bg-white hover:text-charcoal-ink transition-all">
               request session
            </button>
          </div>

          <div className="p-12 bg-canvas-white border border-charcoal-ink/5 rounded-[3rem] flex items-center gap-6 group hover:border-electric-blue/20 transition-all shadow-lg shadow-charcoal-ink/[0.01]">
            <Database weight="thin" size={32} className="text-muted-slate group-hover:text-electric-blue transition-colors" />
            <div className="flex-1">
              <span className="text-[10px] font-display font-black text-muted-slate tracking-[3px] block mb-2 uppercase">Integrity Shard: 1842-AX</span>
              <p className="text-[9px] font-display font-black uppercase tracking-widest text-muted-slate/40 leading-tight italic">
                correlation matrix parsing active. data integrity check 100%. encrypted storage node.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
