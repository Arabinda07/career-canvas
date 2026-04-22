import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  CaretRight,
  Pulse,
  Warning
} from "@phosphor-icons/react";
import { motion } from "motion/react";

interface Question {
  id: number;
  text: string;
  category: string;
  subTopic: string;
  type: 'MCQ' | 'LIKERT';
  options?: string[];
}

const APTITUDE_QUESTIONS: Question[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  text: [
    "Select the most logical sequence for the following pattern...",
    "What comes next in this numerical series: 2, 4, 8, 16...",
    "Identify the synonym for 'Celerity' in the context of professional efficiency.",
    "If all A are B, and some B are C, which statement must be true?",
    "Calculate the percentage increase from 450 to 585."
  ][i % 5],
  category: "Aptitude",
  subTopic: ["Logical", "Numerical", "Verbal"][i % 3],
  type: "MCQ",
  options: ["Option A", "Option B", "Option C", "Option D"]
}));

const PSYCHOMETRIC_QUESTIONS: Question[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 21,
  text: [
    "I enjoy building things with precision tools.",
    "I like to investigate why systems fail.",
    "I love creating conceptual art.",
    "I find joy in teaching complex topics to others.",
    "I am often the one taking charge in a crisis.",
    "I prefer clear instructions over creative freedom.",
    "I am always prepared for the worst-case scenario.",
    "I easily sympathize with those in distress.",
    "I am methodical in my approach to work.",
    "I get overwhelmed by large social gatherings."
  ][i % 10],
  category: i % 2 === 0 ? "RIASEC" : "BigFive",
  subTopic: ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional", "Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"][i % 11],
  type: "LIKERT"
}));

const ALL_QUESTIONS: Question[] = [...APTITUDE_QUESTIONS, ...PSYCHOMETRIC_QUESTIONS];

const LIKERT_OPTIONS = [
  { value: 1, label: "strongly disagree" },
  { value: 2, label: "disagree" },
  { value: 3, label: "neutral" },
  { value: 4, label: "agree" },
  { value: 5, label: "strongly agree" },
];

export default function Exam() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
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

  const handleSelect = (val: any) => {
    setAnswers({ ...answers, [ALL_QUESTIONS[currentIdx].id]: val });
    if (currentIdx < ALL_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIdx((curr) => curr + 1), 200);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/student/report");
    }, 2500);
  };

  const q = ALL_QUESTIONS[currentIdx];
  const progress = ((currentIdx + 1) / ALL_QUESTIONS.length) * 100;

  if (isSubmitting) {
    return (
      <div className="fixed inset-0 bg-canvas-white z-[100] flex flex-col items-center justify-center p-8">
        <div className="w-24 h-24 border-8 border-charcoal-ink/5 border-t-electric-blue rounded-full animate-spin mb-12" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl font-display font-black tracking-tighter mb-6 uppercase italic leading-none">Processing Your Future.</h2>
          <div className="flex flex-col gap-2">
            <p className="text-[9px] font-display font-black text-muted-slate uppercase tracking-[4px] animate-pulse">Running Correlation Matrix v3.0...</p>
            <p className="text-[9px] font-display font-black text-charcoal-ink uppercase tracking-[3px]">Calibrating {ALL_QUESTIONS.length} unique data points</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-10">
      {/* HUD Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sticky top-24 z-40">
        <div className="md:col-span-3 taste-card !p-6 !rounded-[1.5rem] flex items-center justify-between !border-charcoal-ink/10 shadow-2xl backdrop-blur-3xl bg-white/80">
           <div className="flex flex-col">
              <span className="text-[9px] font-display font-black uppercase text-muted-slate tracking-[3px]">Session Progress</span>
              <span className="text-xl font-display font-black italic italic">0{currentIdx + 1} / {ALL_QUESTIONS.length}</span>
           </div>
           <div className="flex-1 max-w-sm mx-8 h-1.5 bg-canvas-white border border-charcoal-ink/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-electric-blue"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
           </div>
        </div>
        <div className="bg-charcoal-ink text-pure-surface p-6 rounded-[1.5rem] flex items-center justify-center gap-3 border border-charcoal-ink">
           <Clock weight="bold" size={20} className="text-electric-blue" />
           <span className="font-display text-2xl font-black italic">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Card */}
      <motion.div 
        key={currentIdx}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="taste-card !p-12 min-h-[500px] flex flex-col items-center justify-center text-center gap-12 border-charcoal-ink/5 shadow-none"
      >
        <div className="space-y-4">
          <span className="px-5 py-1.5 bg-electric-blue/5 border border-electric-blue/10 rounded-full text-[9px] font-display font-black text-electric-blue uppercase tracking-[4px]">
            {q.category} : {q.subTopic}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter leading-[1.1] max-w-4xl lowercase italic">
            "{q.text}"
          </h2>
        </div>

        {q.type === "MCQ" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
            {q.options?.map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className={`taste-card !border-charcoal-ink/10 !text-left !py-6 !px-8 hover:!border-electric-blue group transition-all !rounded-2xl ${answers[q.id] === opt ? '!bg-charcoal-ink !text-white' : '!bg-pure-surface !text-charcoal-ink'}`}
              >
                <span className={`text-[9px] font-display font-black uppercase tracking-widest mr-4 transition-opacity ${answers[q.id] === opt ? 'opacity-50' : 'opacity-20 group-hover:opacity-100'}`}>0{i+1}</span> {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 w-full max-w-5xl">
            {LIKERT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`taste-card !border-charcoal-ink/5 !flex-col !gap-4 !py-10 !px-4 group transition-all !rounded-2xl ${answers[q.id] === opt.value ? '!bg-charcoal-ink !text-white' : '!bg-pure-surface !text-charcoal-ink hover:border-electric-blue/20'}`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${answers[q.id] === opt.value ? 'bg-electric-blue border-electric-blue' : 'bg-transparent border-charcoal-ink/10 group-hover:border-electric-blue/30'}`}>
                  {answers[q.id] === opt.value && <ShieldCheck weight="bold" size={16} className="text-white" />}
                </div>
                <span className="text-[9px] font-display font-black uppercase tracking-[3px] leading-tight">{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center gap-8">
        <button
          onClick={() => setCurrentIdx(prev => prev - 1)}
          disabled={currentIdx === 0}
          className="taste-button-secondary !py-4 !px-8 !text-sm !border-charcoal-ink/10 disabled:opacity-20"
        >
          <ArrowLeft weight="bold" className="mr-2" /> Previous
        </button>

        <div className="flex-1 flex justify-center">
           <span className="text-[9px] font-display font-black text-muted-slate uppercase tracking-[4px] opacity-30">shard_0x{currentIdx.toString(16).toUpperCase()}</span>
        </div>

        {currentIdx === ALL_QUESTIONS.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < ALL_QUESTIONS.length}
            className="taste-button-primary !bg-amber-warmth !border-amber-warmth !text-charcoal-ink !py-4 !px-8 !text-sm disabled:opacity-30"
          >
            Finalize Profile <Pulse weight="bold" size={16} className="ml-2 animate-pulse" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentIdx(prev => prev + 1)}
            disabled={!answers[q.id]}
            className="taste-button-primary !py-4 !px-10 !text-sm disabled:opacity-30"
          >
            Next <ArrowRight weight="bold" className="ml-2" />
          </button>
        )}
      </div>
    </main>
  );
}
