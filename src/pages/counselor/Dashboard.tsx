import { useState } from "react";
import { Copy, Plus, Users, LayoutDashboard, Share2 } from "lucide-react";

export default function CounselorDashboard() {
  const [classes, setClasses] = useState([
    { id: 1, name: "Section A - Grade 12", code: "SEC-A-12-2026", studentsCount: 45, examsCompleted: 32 },
    { id: 2, name: "Section B - Grade 12", code: "SEC-B-12-2026", studentsCount: 42, examsCompleted: 15 },
  ]);

  const [showNewClass, setShowNewClass] = useState(false);
  const [newClassName, setNewClassName] = useState("");

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName) return;

    const newCode = newClassName.substring(0,3).toUpperCase() + "-" + Math.floor(Math.random()*10000);
    setClasses([...classes, {
      id: classes.length + 1,
      name: newClassName,
      code: newCode,
      studentsCount: 0,
      examsCompleted: 0
    }]);
    setNewClassName("");
    setShowNewClass(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Code Transferred to Clipboard");
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-900 pb-8 gap-8">
        <div>
          <div className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em] mb-2">Management Node Access</div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">Control Center</h1>
        </div>
        <button 
          onClick={() => setShowNewClass(true)}
          className="geo-button-primary flex items-center md:mb-1"
        >
          <Plus className="w-4 h-4 mr-2" />
          Generate Access Code
        </button>
      </div>

      {showNewClass && (
        <div className="bg-slate-100 p-8 border-2 border-slate-900 shadow-[8px_8px_0_0_rgba(15,23,42,1)] flex flex-col md:flex-row items-end gap-6">
          <div className="flex-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Entity Designation (Class Name)</label>
            <input 
              type="text" 
              placeholder="e.g. GRADE-12-BIO"
              className="geo-input"
              value={newClassName}
              onChange={e => setNewClassName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={handleCreateClass}
              className="geo-button whitespace-nowrap flex-1 md:flex-none"
            >
              Verify & Create
            </button>
            <button 
              onClick={() => setShowNewClass(false)}
              className="geo-button !bg-white !text-slate-500 !border-slate-300 flex-1 md:flex-none"
            >
              Abort
            </button>
          </div>
        </div>
      )}

      {/* Analytics Matrix */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)]">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Nodes Active</span>
            <LayoutDashboard className="w-4 h-4 text-slate-200" />
          </div>
          <div className="text-6xl font-black italic tracking-tighter">{classes.length}</div>
        </div>
        
        <div className="bg-white p-8 border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)]">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Subjects</span>
            <Users className="w-4 h-4 text-slate-200" />
          </div>
          <div className="text-6xl font-black italic tracking-tighter">
            {classes.reduce((acc, curr) => acc + curr.studentsCount, 0)}
          </div>
        </div>

        <div className="bg-blue-600 p-8 border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] text-white">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Flow Completion</span>
            <Share2 className="w-4 h-4 opacity-40" />
          </div>
          <div className="text-6xl font-black italic tracking-tighter">
            {classes.reduce((acc, curr) => acc + curr.examsCompleted, 0)}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 italic">Management Grid</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {classes.map(c => (
            <div key={c.id} className="geo-card-heavy hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="flex justify-between items-start mb-8">
                <div>
                   <div className="text-[8px] font-bold text-blue-600 uppercase tracking-widest mb-1">Entity-ID: {c.id}</div>
                   <h3 className="font-black text-2xl uppercase tracking-tighter">{c.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                   <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Broadcasting</span>
                </div>
              </div>
              
              <div className="bg-slate-100 p-6 border-2 border-slate-900 flex items-center mb-8">
                <code className="text-slate-900 font-mono text-2xl flex-1 text-center font-black tracking-widest">{c.code}</code>
                <button 
                  onClick={(e) => { e.stopPropagation(); copyToClipboard(c.code); }}
                  className="p-3 bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all ml-4"
                  title="Copy Identifier"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                 <div className="bg-slate-50 p-4 border border-slate-200">
                    <div className="text-xl font-black italic">{c.studentsCount}</div>
                    <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Registered</div>
                 </div>
                 <div className="bg-slate-50 p-4 border border-slate-200">
                    <div className="text-xl font-black italic">{c.examsCompleted}</div>
                    <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Completed</div>
                 </div>
              </div>

              <button className="w-full mt-6 py-4 border-2 border-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                Export Metric Cluster &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}