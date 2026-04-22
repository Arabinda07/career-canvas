import React, { useState } from "react";
import { 
  Plus, 
  Users, 
  ArrowUpRight, 
  GraduationCap, 
  Copy, 
  ShareNetwork, 
  MagnifyingGlass, 
  FadersHorizontal,
  PlusCircle,
  ChartLineUp
} from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function CounselorDashboard() {
  const [classes, setClasses] = useState([
    { id: 1, name: "section a - grade 12", code: "FC-KVS-2026-A", studentsCount: 45, examsCompleted: 32 },
    { id: 2, name: "section b - grade 12", code: "FC-KVS-2026-B", studentsCount: 42, examsCompleted: 15 },
  ]);

  const [showNewClass, setShowNewClass] = useState(false);
  const [newClassName, setNewClassName] = useState("");

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName) return;

    const newCode = "FC-" + newClassName.substring(0,3).toUpperCase() + "-" + Math.floor(Math.random()*10000);
    setClasses([...classes, {
      id: classes.length + 1,
      name: newClassName.toLowerCase(),
      code: newCode,
      studentsCount: 0,
      examsCompleted: 0
    }]);
    setNewClassName("");
    setShowNewClass(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  }

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-charcoal-ink/5 pb-10 gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-emerald-signal/10 text-emerald-signal rounded-2xl flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-emerald-signal animate-pulse" />
             </div>
             <div>
                <span className="text-[10px] font-display font-black uppercase text-muted-slate tracking-[3px] block">institutional node</span>
                <span className="text-xl font-display font-black uppercase italic">kendriya vidyalaya admin</span>
             </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase italic leading-[0.85]">
            control <span className="text-electric-blue">center.</span>
          </h1>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowNewClass(true)}
          className="taste-button-primary !py-5 !px-8 !text-base"
        >
          <PlusCircle weight="bold" size={18} className="mr-2" /> new cohort
        </motion.button>
      </div>

      {showNewClass && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="taste-card !p-12 border-electric-blue/20 bg-electric-blue/[0.02]"
        >
          <div className="max-w-xl">
            <h2 className="text-3xl font-display font-black uppercase mb-6 tracking-tighter italic italic">Initialize New Cohort</h2>
            <form onSubmit={handleCreateClass} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-display font-black uppercase tracking-[3px] text-muted-slate block">Cohort Designation (Class Name)</label>
                <input 
                  type="text" 
                  placeholder="E.G. GRADE-12-PCM-B"
                  className="taste-input !rounded-xl !py-5"
                  value={newClassName}
                  onChange={e => setNewClassName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex gap-4 pt-2">
                <button type="submit" className="taste-button-primary flex-1">Generate Protocol</button>
                <button 
                  type="button"
                  onClick={() => setShowNewClass(false)}
                  className="taste-button-secondary !border-charcoal-ink/10"
                >
                  Abort
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Analytics Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="taste-card !p-10 !border-charcoal-ink/5">
          <span className="text-[9px] font-display font-black uppercase tracking-[3px] text-muted-slate mb-4 block">Active Nodes</span>
          <div className="text-5xl font-display font-black tracking-tighter italic">{classes.length}</div>
          <div className="mt-4 flex items-center gap-2 text-emerald-signal text-[9px] font-black uppercase tracking-widest">
            <ArrowUpRight weight="bold" /> +12% drift
          </div>
        </div>
        
        <div className="taste-card !p-10 !border-charcoal-ink/5">
          <span className="text-[9px] font-display font-black uppercase tracking-[3px] text-muted-slate mb-4 block">Total Subjects</span>
          <div className="text-5xl font-display font-black tracking-tighter italic">
            {classes.reduce((acc, curr) => acc + curr.studentsCount, 0)}
          </div>
          <div className="mt-4 flex items-center gap-2 text-muted-slate text-[9px] font-black uppercase tracking-widest">
            <Users weight="bold" /> aggregated
          </div>
        </div>

        <div className="bg-charcoal-ink text-pure-surface p-12 rounded-[2rem] md:col-span-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <ChartLineUp weight="bold" size={140} />
          </div>
          <div className="relative z-10">
            <span className="text-[9px] font-display font-black uppercase tracking-[3px] opacity-60 mb-4 block">Completion Rate</span>
            <div className="text-6xl font-display font-black tracking-tighter italic text-electric-blue">
              {Math.round((classes.reduce((acc, curr) => acc + curr.examsCompleted, 0) / (classes.reduce((acc, curr) => acc + curr.studentsCount, 0) || 1)) * 100)}%
            </div>
            <button className="mt-8 text-[9px] font-display font-black uppercase tracking-[3px] flex items-center gap-3 hover:text-electric-blue transition-colors">
               Explore Matrix <ShareNetwork weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16 underline underline-offset-8 decoration-charcoal-ink/10">
          <h2 className="text-4xl font-display font-black uppercase tracking-tighter italic">Cohort Management.</h2>
          <div className="flex items-center gap-3 bg-canvas-white p-2 rounded-2xl border border-charcoal-ink/5">
             <div className="px-6 py-3 bg-pure-surface rounded-xl shadow-lg border border-charcoal-ink/5 flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                <FadersHorizontal weight="bold" /> All Branches
             </div>
             <button className="w-12 h-12 flex items-center justify-center text-muted-slate hover:text-charcoal-ink transition-colors">
                <MagnifyingGlass weight="bold" size={20} />
             </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {classes.map(c => (
            <motion.div 
              key={c.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="taste-card !p-12 !rounded-[2.5rem] group border-charcoal-ink/5 hover:border-electric-blue/20 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-canvas-white rounded-2xl flex items-center justify-center border border-charcoal-ink/5 group-hover:bg-charcoal-ink group-hover:text-white transition-all duration-500">
                     <GraduationCap weight="bold" size={32} />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-3xl uppercase tracking-tighter leading-none italic">{c.name}</h3>
                    <span className="text-[10px] font-display font-black text-muted-slate uppercase tracking-[3px] mt-2 block">Index: {c.id.toString().padStart(3, '0')}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-canvas-white p-8 rounded-[2rem] border border-charcoal-ink/5 flex items-center mb-10 group-hover:border-electric-blue/30 transition-all">
                <code className="text-charcoal-ink font-display text-2xl flex-1 text-center font-black tracking-widest">{c.code}</code>
                <button 
                  onClick={() => copyToClipboard(c.code)}
                  className="w-14 h-14 bg-pure-surface rounded-2xl flex items-center justify-center border border-charcoal-ink/10 hover:bg-electric-blue hover:text-white hover:border-electric-blue transition-all shadow-sm"
                >
                  <Copy weight="bold" size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-canvas-white p-6 rounded-[1.5rem] flex flex-col items-center border border-charcoal-ink/5">
                    <span className="text-3xl font-display font-black italic">{c.studentsCount}</span>
                    <span className="text-[10px] font-display font-black uppercase tracking-widest text-muted-slate">subjects</span>
                 </div>
                 <div className="bg-canvas-white p-6 rounded-[1.5rem] flex flex-col items-center border border-emerald-signal/10">
                    <span className="text-3xl font-display font-black italic text-emerald-signal">{c.examsCompleted}</span>
                    <span className="text-[10px] font-display font-black uppercase tracking-widest text-muted-slate">analyzed</span>
                 </div>
              </div>

              <button className="w-full mt-10 py-6 bg-charcoal-ink text-pure-surface font-display font-black text-[10px] uppercase tracking-[4px] rounded-2xl hover:bg-electric-blue transition-all flex items-center justify-center gap-3">
                 visualize metrics <ArrowUpRight weight="bold" size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
