import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { motion } from "motion/react";
import { Sparkle, ShieldCheck, Fingerprint, LockOpen, IdentificationCard } from "@phosphor-icons/react";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "student";
  const redirect = searchParams.get("redirect") || "";
  
  const navigate = useNavigate();
  const [role, setRole] = useState(defaultRole);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Client-side quick check
      if (password.length < 8) {
        throw new Error("Access code must be at least 8 characters");
      }

      // 2. Server-side validation for email and password
      const valRes = await Promise.all([
        fetch('/api/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'email', value: email })
        }),
        fetch('/api/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'password', value: password })
        })
      ]);

      const [emailVal, pwdVal] = await Promise.all(valRes.map(r => r.json()));

      if (!emailVal.isValid) throw new Error("Please provide a valid institutional email");
      if (!pwdVal.isValid) throw new Error("Access code must contain uppercase, lowercase and numbers");

      // Synthetic Auth for Preview
      if (!supabase || !import.meta.env.VITE_SUPABASE_URL) {
        setTimeout(() => {
          if (redirect === "exam") navigate("/student/exam");
          else if (role === "student") navigate("/student");
          else navigate("/counselor");
        }, 1000);
        return;
      }

      const { error } = isSignUp 
        ? await supabase.auth.signUp({ email, password, options: { data: { full_name: name, role } } })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      
      if (redirect === "exam") navigate("/student/exam");
      else if (role === "student") navigate("/student");
      else navigate("/counselor");
      
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-canvas-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="taste-card w-full max-w-xl bg-pure-surface !p-20 shadow-none border-charcoal-ink/10"
      >
        <div className="flex justify-between items-start mb-16">
           <div className="w-16 h-16 bg-charcoal-ink text-white rounded-3xl flex items-center justify-center">
              <Fingerprint weight="bold" size={32} />
           </div>
           <div className="text-right">
              <span className="text-[10px] font-display font-black text-muted-slate uppercase tracking-widest block">Authorization</span>
              <span className="text-[10px] font-display font-black text-electric-blue uppercase tracking-widest">Protocol v3.0</span>
           </div>
        </div>

        <h2 className="text-3xl font-display font-black tracking-tighter mb-4 italic uppercase">
          {isSignUp ? "Identity Registration" : "Identity Access"}
        </h2>
        <p className="text-muted-slate mb-10 lowercase text-base">
          Please verify your institutional node identifiers to continue to the assessment portal.
        </p>

        {error && (
          <div className="mb-8 p-6 bg-deep-rose/5 border border-deep-rose/20 text-deep-rose text-xs font-bold uppercase tracking-widest rounded-2xl flex items-center gap-3">
            <Sparkle weight="fill" /> {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-10">
          {isSignUp && (
            <div className="space-y-3">
              <label className="text-[10px] font-display font-black uppercase tracking-[3px] text-muted-slate flex items-center gap-3">
                 Subject Name
              </label>
              <input
                type="text"
                required
                placeholder="Full Legal Name"
                className="taste-input !rounded-2xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          
          <div className="space-y-3">
            <label className="text-[10px] font-display font-black uppercase tracking-[3px] text-muted-slate flex items-center gap-3">
               Email Identifier
            </label>
            <input
              type="email"
              required
              placeholder="name@domain.com"
              className="taste-input !rounded-2xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-display font-black uppercase tracking-[3px] text-muted-slate flex items-center gap-3">
               Access Code
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="taste-input !rounded-2xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full taste-button-primary !py-7 mt-6 disabled:opacity-50"
          >
            {loading ? "Verifying..." : (isSignUp ? "Register" : "Access Portal")}
          </button>
        </form>

        <div className="mt-20 pt-12 border-t border-charcoal-ink/5 flex flex-col items-center gap-10">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[10px] font-display font-black uppercase tracking-[3px] text-electric-blue hover:text-charcoal-ink transition-colors"
          >
            {isSignUp ? "Already Registered? Sign In" : "New Potential? Create Account"}
          </button>

          <div className="flex bg-canvas-white p-2 rounded-[2rem] border border-charcoal-ink/5 w-full">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-5 text-[10px] font-display font-black uppercase tracking-[3px] rounded-2xl transition-all ${role === "student" ? "bg-pure-surface text-charcoal-ink shadow-2xl" : "text-muted-slate"}`}
            >
              Student
            </button>
            <button
              onClick={() => setRole("counselor")}
              className={`flex-1 py-5 text-[10px] font-display font-black uppercase tracking-[3px] rounded-2xl transition-all ${role === "counselor" ? "bg-pure-surface text-charcoal-ink shadow-2xl" : "text-muted-slate"}`}
            >
              Counselor
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
