import { jsPDF } from "jspdf";
import { Download, Award, ChevronRight, BarChart3, Database } from "lucide-react";

export default function Report() {
  const reportData = {
    studentName: "Subject_42_Alex",
    date: new Date().toLocaleDateString().toUpperCase(),
    riasecTopMacthes: [
      { code: "Investigative", score: 85, summary: "Subject indicates exceptional capacity for high-density analytical parsing and systematic problem resolution." },
      { code: "Realistic", score: 72, summary: "Strong affinity for concrete tactical execution and physical-geometric hardware manipulation." },
      { code: "Conventional", score: 65, summary: "Prefers structured organizational matrices and linear operational guidelines." }
    ],
    bigFiveMatches: [
      { trait: "Openness", level: "HIGH", summary: "Imaginative cognitive expansion." },
      { trait: "Conscientiousness", level: "MAX", summary: "Surgical level procedural discipline." },
      { trait: "Extraversion", level: "MID", summary: "Balanced social-individual resonance." },
      { trait: "Agreeableness", level: "HIGH", summary: "High cooperative empathy calibration." },
      { trait: "Neuroticism", level: "MIN", summary: "Stable emotional core architecture." }
    ],
    careerPaths: ["Data Architect", "Systems Engineer", "Security Analyst"]
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("PSYCHMETRIC EXPANSE REPORT", 20, 30);
    doc.save("PsychMetric_Metric_Cluster.pdf");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Report Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-b-2 border-slate-900 pb-12">
        <div className="md:col-span-8">
          <div className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em] mb-4">Metric Cluster: V2.4_FINAL</div>
          <h1 className="text-7xl font-black italic uppercase tracking-tighter leading-none mb-2">Subject Analysis</h1>
          <p className="text-xl text-slate-400 font-mono font-medium">TIMESTAMP: {reportData.date} // SUBJECT_ID: 184-AQ-92</p>
        </div>
        <div className="md:col-span-4 flex flex-col gap-4">
          <button onClick={handleDownloadPDF} className="w-full geo-button flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Export Metric Cluster (.PDF)
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* RIASEC Analysis */}
        <div className="lg:col-span-7 space-y-12">
          <div className="bg-white border-2 border-slate-900 shadow-[8px_8px_0_0_rgba(15,23,42,1)] p-10">
            <div className="flex items-center gap-4 mb-10 border-b-2 border-slate-100 pb-6">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Interest Profiling</h2>
            </div>
            
            <div className="grid gap-10">
              {reportData.riasecTopMacthes.map((r, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="text-5xl font-black italic text-slate-100 group-hover:text-blue-600 transition-colors duration-500">
                    0{i+1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="text-2xl font-black uppercase tracking-tighter">{r.code}</h3>
                      <div className="text-xl font-mono font-black italic text-blue-600">{r.score}%</div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 border border-slate-200 mb-4 overflow-hidden">
                       <div className="h-full bg-slate-900 group-hover:bg-blue-600 transition-all duration-700" style={{ width: `${r.score}%` }}></div>
                    </div>
                    <p className="text-sm text-slate-500 italic leading-relaxed">"{r.summary}"</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-slate-50 p-8 border-2 border-slate-200 border-dashed">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Optimized Career Trajectories</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reportData.careerPaths.map((c, i) => (
                  <div key={i} className="bg-white border-2 border-slate-900 p-4 font-black uppercase text-xs tracking-widest flex items-center gap-3">
                    <ChevronRight className="w-4 h-4 text-blue-600" /> {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Data */}
        <div className="lg:col-span-5 space-y-12">
          {/* Big Five Data */}
          <div className="bg-slate-900 text-white border-2 border-slate-900 shadow-[8px_8px_0_0_rgba(37,99,235,1)] p-10">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10 text-blue-400">Identity Matrix</h2>
            <div className="space-y-8">
              {reportData.bigFiveMatches.map((t, i) => (
                <div key={i} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-black uppercase tracking-widest">{t.trait}</span>
                    <span className="text-[8px] font-mono font-bold bg-blue-600 px-2 py-1 italic tracking-widest">{t.level}</span>
                  </div>
                  <div className="bg-white/5 h-[1px] w-full mb-3"></div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">"{t.summary}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="geo-card-extra bg-amber-400 p-8 border-2 border-slate-900 shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
            <Award className="w-12 h-12 text-slate-900 mb-6" />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic leading-none">Counselor Protocol Active</h3>
            <p className="text-xs font-bold uppercase leading-relaxed text-slate-900/60 mb-8 tracking-widest">
              Subject results have been transmitted to the Management Node for clinical review and session calibration.
            </p>
            <button className="w-full py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all border border-slate-900">
               Initiate Session
            </button>
          </div>

          <div className="bg-white p-8 border-2 border-gray-200 border-dashed">
            <div className="flex items-center gap-3 mb-4 opacity-40">
              <Database className="w-4 h-4" />
              <span className="text-[8px] font-black uppercase tracking-widest">System_Log: 1842-AX</span>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed italic">
              "Text schema generated via automated correlation matrix parsing specific sub-topic coefficients. Internal integrity verified."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}