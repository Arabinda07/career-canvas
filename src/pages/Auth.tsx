import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "student";
  
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
      if (!supabase) {
        setTimeout(() => {
          if (role === "student") navigate("/student");
          else navigate("/counselor");
        }, 1000);
        return;
      }

      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              role: role
            }
          }
        });
        if (error) throw error;
        if (role === "student") navigate("/student");
        else navigate("/counselor");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        if (role === "student") navigate("/student");
        else navigate("/counselor");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 border-2 border-slate-900 border-r-8 border-b-8">
        <h2 className="text-4xl font-black italic uppercase italic tracking-tighter mb-2 text-slate-900">
          {isSignUp ? "Identity Registration" : "Identity Access"}
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 font-mono">
          Gateway: {role === "student" ? "Student" : "Counselor"} / Protocol: {isSignUp ? "Create" : "Verify"}
        </p>

        {!supabase && (
          <div className="mb-6 p-4 bg-amber-400 text-slate-900 text-[10px] font-black uppercase tracking-widest border-2 border-slate-900">
            Preview Mode: Synthetic Auth Active
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 text-[10px] font-bold uppercase tracking-widest border-2 border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          {isSignUp && (
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Subject Name</label>
              <input
                type="text"
                required
                className="geo-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Identifier (Email)</label>
            <input
              type="email"
              required
              className="geo-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Access Key (Password)</label>
            <input
              type="password"
              required
              className="geo-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full geo-button-primary mt-4 disabled:opacity-50"
          >
            {loading ? "Decrypting..." : (isSignUp ? "Submit Registration" : "Authorize Access")}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t-2 border-slate-900 flex flex-col items-center space-y-6">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-slate-900"
          >
            {isSignUp ? "Already Registered? Authorize" : "New Subject? Register"}
          </button>

          <div className="flex bg-slate-100 p-1 border-2 border-slate-900 w-full">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${role === "student" ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-900"}`}
            >
              Student Portal
            </button>
            <button
              onClick={() => setRole("counselor")}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${role === "counselor" ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-900"}`}
            >
              Counselor Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}