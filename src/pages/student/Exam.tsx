import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ArrowRight, ArrowLeft, Shield } from "lucide-react";

const QUESTIONS = [
  { id: 1, text: "I enjoy building or fixing things with my hands.", category: "RIASEC", subTopic: "Realistic" },
  { id: 2, text: "I like analyzing data and solving complex problems.", category: "RIASEC", subTopic: "Investigative" },
  { id: 3, text: "I love expressing myself through art, music, or writing.", category: "RIASEC", subTopic: "Artistic" },
  { id: 4, text: "I feel energized when helping or teaching others.", category: "RIASEC", subTopic: "Social" },
  { id: 5, text: "I enjoy taking leadership roles and persuading people.", category: "RIASEC", subTopic: "Enterprising" },
  { id: 6, text: "I prefer working with structured tasks and keeping things organized.", category: "RIASEC", subTopic: "Conventional" },
  { id: 7, text: "I am the life of the party.", category: "BigFive", subTopic: "Extraversion" },
  { id: 8, text: "I sympathize with others' feelings.", category: "BigFive", subTopic: "Agreeableness" },
  { id: 9, text: "I am always prepared and organized.", category: "BigFive", subTopic: "Conscientiousness" },
  { id: 10, text: "I get stressed out easily.", category: "BigFive", subTopic: "Neuroticism" },
  { id: 11, text: "I have a rich vocabulary and active imagination.", category: "BigFive", subTopic: "Openness" },
];

const OPTIONS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export default function Exam() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelect = (val: number) => {
    setAnswers({ ...answers, [QUESTIONS[currentIdx].id]: val });
    if (currentIdx < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIdx((curr) => curr + 1), 300);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/student/report");
    }, 1500);
  };

  const q = QUESTIONS[currentIdx];
  const progress = ((currentIdx) / QUESTIONS.length) * 100;

  if (isSubmitting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-none animate-spin mb-8"></div>
        <h2 className="text-4xl font-black italic uppercase italic tracking-tighter">Processing Core Metrics...</h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-4 font-mono animate-pulse">Running Correlation Matrix v2.4</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-6 border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)]">
        <div className="flex-1 w-full">
          <div className="flex justify-between items-baseline mb-4">
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Flow Progression 0{currentIdx + 1}/0{QUESTIONS.length}</div>
            <div className="text-[10px] font-mono font-bold text-blue-600">{Math.round(progress)}% Complete</div>
          </div>
          <div className="h-4 w-full bg-slate-100 border border-slate-200 overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 bg-slate-900 text-white px-8 py-4 border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(37,99,235,1)]">
          <Clock className="w-5 h-5 text-blue-400" />
          <span className="font-mono text-2xl font-black italic tracking-tighter">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Main Selection Area */}
      <div className="bg-white p-12 border-2 border-slate-900 shadow-[12px_12px_0_0_rgba(15,23,42,1)] min-h-[500px] flex flex-col items-center justify-center text-center">
        <div className="bg-slate-100 text-slate-400 px-3 py-1 text-[8px] font-black uppercase tracking-[0.3em] mb-12 border border-slate-200">
           CATEGORY: {q.category} // TOPIC: {q.subTopic}
        </div>
        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-16 leading-none max-w-2xl">
          "{q.text}"
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 w-full max-w-4xl">
          {OPTIONS.map((opt) => {
            const isSelected = answers[q.id] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`group flex flex-col items-center justify-center p-6 border-2 transition-all duration-200 relative ${
                  isSelected 
                    ? "border-blue-600 bg-blue-50 text-blue-900 -translate-y-1 shadow-[4px_4px_0_0_rgba(37,99,235,1)]" 
                    : "border-slate-100 bg-white hover:border-slate-300 text-slate-400 hover:text-slate-900"
                }`}
              >
                <div className={`w-8 h-8 flex items-center justify-center border-2 mb-4 transition-all ${
                  isSelected ? "bg-blue-600 border-slate-900 scale-110" : "bg-white border-slate-100 group-hover:border-slate-300"
                }`}>
                  {isSelected && <Shield className="w-4 h-4 text-white" />}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest leading-tight">
                  {opt.label}
                </div>
                <div className="text-[8px] font-mono mt-2 opacity-40">VAL_0{opt.value}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-between items-center bg-slate-900 p-6 border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(37,99,235,1)]">
        <button
          onClick={() => setCurrentIdx((curr) => curr - 1)}
          disabled={currentIdx === 0}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-blue-400 disabled:opacity-20 transition flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous Record
        </button>

        <div className="flex-1 flex justify-center">
           <div className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">Security Checkpoint 0{currentIdx + 1}_V2.4</div>
        </div>

        {currentIdx === QUESTIONS.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < QUESTIONS.length}
            className="bg-amber-400 text-slate-900 px-10 py-3 border-2 border-slate-900 text-[10px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:bg-white transition-all disabled:opacity-50"
          >
            Finalize Submission
          </button>
        ) : (
          <button
            onClick={() => setCurrentIdx((curr) => curr + 1)}
            disabled={!answers[q.id]}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-amber-400 disabled:opacity-20 transition flex items-center"
          >
            Next Record <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>

    </div>
  );
}