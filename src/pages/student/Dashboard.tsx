import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Play, Ticket, FileSpreadsheet, Lock, Activity } from "lucide-react";

export default function StudentDashboard() {
  const [classCode, setClassCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const completedTests = [
    { id: 1, title: "Standard Psychometric Evaluation", date: "Oct 12, 2026", status: "Analyzed" }
  ];

  const handleStartExamWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/student/exam?code=" + classCode);
    }, 1000);
  };

  const handlePurchaseExam = async () => {
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 500, receipt: 'rcp_1' })
      });
      const order = await response.json();
      alert(`Razorpay Gateway Initialized\nOrder: ${order.id}`);
      navigate("/student/exam?paid=true");
    } catch (e) {
      console.error(e);
      alert("Billing connection failed");
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-900 pb-8">
        <div>
          <div className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em] mb-2">Subject Node Access</div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">Dashboard</h1>
        </div>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div className="bg-slate-100 p-4 border-2 border-slate-900 flex flex-col items-center min-w-[120px]">
             <div className="text-2xl font-black italic">01</div>
             <div className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Active Exams</div>
          </div>
          <div className="bg-slate-100 p-4 border-2 border-slate-900 flex flex-col items-center min-w-[120px]">
             <div className="text-2xl font-black italic">100%</div>
             <div className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Credibility</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Entrance Card: Code */}
        <div className="lg:col-span-7 geo-card-heavy">
          <div className="flex justify-between items-start mb-8">
            <div className="bg-slate-900 text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">Protocol 01</div>
            <Ticket className="w-6 h-6 text-slate-300" />
          </div>
          <h2 className="text-3xl font-black uppercase mb-4 tracking-tighter">Institutional Entry</h2>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed max-w-md italic">
            "Authorization for free subject participation via assigned institutional cryptographic identifiers."
          </p>
          
          <form onSubmit={handleStartExamWithCode} className="flex gap-4">
            <input 
              type="text" 
              placeholder="ENTER CLASS CODE"
              className="geo-input flex-1"
              value={classCode}
              onChange={e => setClassCode(e.target.value.toUpperCase())}
              required
            />
            <button 
              type="submit"
              disabled={loading || !classCode}
              className="geo-button-primary"
            >
              Initialize flow
            </button>
          </form>
        </div>

        {/* Purchase Card */}
        <div className="lg:col-span-5 bg-blue-600 p-8 border-2 border-slate-900 border-r-8 border-b-8 text-white flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div className="bg-white text-blue-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0_0_rgba(15,23,42,1)]">Protocol 02</div>
            <Lock className="w-6 h-6 opacity-40" />
          </div>
          <h2 className="text-3xl font-black uppercase mb-4 tracking-tighter">Independent Node</h2>
          <p className="text-blue-100 mb-8 text-sm leading-relaxed italic">
            "Acquisition of individual participation rights via standard currency exchange gateway."
          </p>
          <div className="mb-10 flex items-baseline">
            <span className="text-10px font-bold uppercase tracking-widest mr-2 opacity-80">Unit Cost:</span>
            <span className="text-5xl font-black italic tracking-tighter">₹500</span>
          </div>
          
          <button 
            onClick={handlePurchaseExam}
            className="mt-auto w-full py-4 bg-white text-slate-900 border-2 border-slate-900 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0_0_rgba(15,23,42,1)]"
          >
            Authorize Payment
          </button>
        </div>

      </div>

      <div className="mt-16">
        <div className="flex items-center gap-4 mb-8">
          <Activity className="w-6 h-6 text-emerald-500" />
          <h2 className="text-2xl font-black uppercase tracking-tighter">Archived Assessments</h2>
        </div>
        
        <div className="bg-white border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 border-b-2 border-slate-900">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Evaluation Type</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Stamp</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Node</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {completedTests.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 font-bold text-sm uppercase">{t.title}</td>
                  <td className="px-8 py-5 text-xs font-mono text-slate-400">{t.date.toUpperCase()}</td>
                  <td className="px-8 py-5">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-3 py-1 uppercase tracking-widest border border-emerald-200">
                      {t.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link to="/student/report" className="text-blue-600 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest inline-flex items-center group decoration-2 underline-offset-4 hover:underline">
                      View Schema <FileSpreadsheet className="w-3 h-3 ml-2 group-hover:rotate-12 transition-transform" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}