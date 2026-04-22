import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  QrCode, 
  CreditCard, 
  CaretRight, 
  ShieldCheck, 
  Lightning,
  ArrowRight,
  ShieldChevron
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export default function StartExam() {
  const [method, setMethod] = useState<'code' | 'buy'>('code');
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = async () => {
    setIsValidating(true);
    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'classCode', value: code })
      });
      const data = await res.json();
      
      if (data.isValid) {
        navigate('/auth?role=student&redirect=exam');
      } else {
        alert("Invalid Access Code. Please use format: FC-XXX-2026-X");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsValidating(false);
    }
  };

  const handlePurchase = async () => {
    setPurchaseLoading(true);
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 99,
          receipt: `receipt_${Date.now()}`
        })
      });
      const order = await response.json();

      const options = {
        key: 'dummy_key_id', // This should be your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Future Canvas",
        description: "Individual Evaluation License",
        order_id: order.id,
        handler: function (response: any) {
          console.log("Payment Success:", response);
          navigate("/auth?role=student&redirect=exam");
        },
        prefill: {
          name: "Student",
          email: "student@example.com",
        },
        theme: {
          color: "#2563eb",
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert("Payment Failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error("Order creation failed:", error);
    } finally {
      setPurchaseLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center space-y-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl space-y-6"
      >
        <span className="text-[9px] font-display font-black tracking-[4px] uppercase text-electric-blue mb-4 block">Authorization Gateway</span>
        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-8 leading-[0.85] italic uppercase italic">
          Enter Your <br /> <span className="text-charcoal-ink/10 group-hover:text-charcoal-ink transition-colors">Future.</span>
        </h1>
        <p className="text-xl text-steel-secondary leading-relaxed max-w-xl mx-auto lowercase">
          access the future canvas assessment portal. please provide your institutional access code or acquire an individual evaluation license to begin.
        </p>
      </motion.div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-stretch">
        {/* Access Code Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setMethod('code')}
          className={`taste-card !p-12 flex flex-col gap-10 cursor-pointer transition-all duration-700 ${method === 'code' ? '!border-electric-blue shadow-2xl bg-white' : '!border-charcoal-ink/5 bg-canvas-white opacity-40 hover:opacity-100'}`}
        >
          <div className="flex justify-between items-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${method === 'code' ? 'bg-electric-blue text-white shadow-xl shadow-electric-blue/20' : 'bg-charcoal-ink/5 text-charcoal-ink/40'}`}>
              <QrCode weight="bold" size={28} />
            </div>
            <span className="text-[9px] font-display font-black text-muted-slate uppercase tracking-[4px]">Source 0x01</span>
          </div>

          <div className="space-y-3">
             <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter leading-none">Institutional Code.</h3>
             <p className="text-base text-steel-secondary leading-tight lowercase">
               for students at pm shri, kendriya vidyalayas, or authorized institutions.
             </p>
          </div>

          <div className="space-y-5 mt-2">
             <input 
               type="text" 
               placeholder="ACCESS_CODE_0x..." 
               className="taste-input !py-6 !text-xl text-center placeholder:text-center font-display font-black tracking-[4px] uppercase italic border-charcoal-ink/10 focus:border-electric-blue"
               value={code}
               onChange={(e) => setCode(e.target.value.toUpperCase())}
             />
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={handleStart}
               className={`w-full py-5 rounded-full font-display font-black text-[9px] uppercase tracking-[4px] flex items-center justify-center gap-3 transition-all duration-500 ${code.length > 5 ? 'bg-electric-blue text-white shadow-2xl shadow-electric-blue/20' : 'bg-charcoal-ink/5 text-charcoal-ink/20 grayscale cursor-not-allowed border border-charcoal-ink/5'}`}
               disabled={code.length <= 5}
             >
               Initialize Stream <CaretRight weight="bold" size={14} />
             </motion.button>
          </div>
          
          <div className="flex items-center gap-3 text-[9px] font-display font-black text-muted-slate uppercase tracking-[3px] mt-auto">
             <ShieldCheck weight="bold" size={18} className="text-emerald-signal" />
             Encrypted Protocol Protocol
          </div>
        </motion.div>

        {/* Purchase Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setMethod('buy')}
          className={`taste-card !p-12 flex flex-col gap-10 cursor-pointer transition-all duration-700 ${method === 'buy' ? '!border-amber-warmth shadow-2xl bg-white' : '!border-charcoal-ink/5 bg-canvas-white opacity-40 hover:opacity-100'}`}
        >
          <div className="flex justify-between items-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${method === 'buy' ? 'bg-amber-warmth text-white shadow-xl shadow-amber-warmth/20' : 'bg-charcoal-ink/5 text-charcoal-ink/40'}`}>
              <Lightning weight="bold" size={28} />
            </div>
            <span className="text-[9px] font-display font-black text-muted-slate uppercase tracking-[4px]">Source 0x02</span>
          </div>

          <div className="space-y-3">
             <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter leading-none">Individual License.</h3>
             <p className="text-base text-steel-secondary leading-tight lowercase">
               direct evaluation for independent nodes. includes persistent report archives.
             </p>
          </div>

          <div className="flex flex-col gap-5 mt-2">
             <div className="bg-canvas-white p-8 rounded-[2rem] border border-charcoal-ink/5 flex items-center justify-between group-hover:border-amber-warmth/20 transition-all">
                <div>
                  <span className="text-[10px] font-display font-black uppercase tracking-[3px] text-muted-slate block mb-2 underline underline-offset-4 decoration-charcoal-ink/10">Standard Pack</span>
                  <span className="text-4xl font-display font-black text-charcoal-ink italic">₹99</span>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-[9px] font-display font-black text-emerald-signal uppercase tracking-widest block">Instant Access</span>
                  <span className="text-[9px] font-display font-black text-muted-slate italic uppercase tracking-widest leading-none">Inc. Taxes</span>
                </div>
             </div>
             
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={handlePurchase}
               disabled={purchaseLoading}
               className="w-full py-5 rounded-full bg-charcoal-ink text-white font-display font-black text-[9px] uppercase tracking-[4px] flex items-center justify-center gap-3 shadow-xl hover:bg-amber-warmth hover:text-charcoal-ink transition-colors"
             >
               {purchaseLoading ? "Negotiating..." : "Acquire License"} <ArrowRight weight="bold" size={14} />
             </motion.button>
          </div>

          <div className="mt-auto space-y-3">
             <div className="flex items-center gap-3 text-[9px] font-display font-black text-muted-slate uppercase tracking-[3px]">
               <CreditCard weight="bold" size={18} /> Verified by Institutional Governance
             </div>
             <p className="text-[9px] font-display font-black uppercase tracking-[2px] text-muted-slate/30 leading-tight italic">
               *secure integration via razorpay. node license remains active for 24h post-initialization. persistent cloud storage enabled.
             </p>
          </div>
        </motion.div>
      </div>

      <div className="w-full border-t border-charcoal-ink/5 pt-16 flex flex-col md:flex-row items-center justify-between gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
         <span className="text-[10px] font-display font-black text-muted-slate tracking-[5px] uppercase">Institutional Partners</span>
         <div className="flex flex-wrap justify-center gap-16 text-3xl font-display font-black text-charcoal-ink italic uppercase tracking-tight">
            <span className="hover:text-electric-blue transition-colors cursor-default">PM SHRI</span>
            <span className="hover:text-electric-blue transition-colors cursor-default">K. Vidyalaya</span>
            <span className="hover:text-electric-blue transition-colors cursor-default">NEP COMPLIANT</span>
         </div>
      </div>
    </main>
  );
}
