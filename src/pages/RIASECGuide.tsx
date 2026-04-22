import React from 'react';
import { motion } from 'motion/react';
import { 
  Hammer, 
  MagnifyingGlass, 
  Palette, 
  UsersThree, 
  TrendUp, 
  Notebook,
  CaretRight,
  Brain
} from '@phosphor-icons/react';

const traitData = [
  {
    id: 'R',
    title: 'realistic',
    label: 'the doers',
    icon: Hammer,
    color: 'bg-charcoal-ink',
    description: 'individuals who prefer physical activities that require skill, strength, and coordination. they like working with objects, machines, tools, plants, or animals.',
    traits: ['practical', 'hands-on', 'technical', 'rugged']
  },
  {
    id: 'I',
    title: 'investigative',
    label: 'the thinkers',
    icon: MagnifyingGlass,
    color: 'bg-electric-blue',
    description: 'people with a strong desire to understand why things happen. they enjoy observing, learning, investigating, and solving complex abstract problems.',
    traits: ['analytical', 'scientific', 'curious', 'intellectual']
  },
  {
    id: 'A',
    title: 'artistic',
    label: 'the creators',
    icon: Palette,
    color: 'bg-deep-rose',
    description: 'individuals who have high artistic interests and value self-expression. they avoid highly structured situations and enjoy using their imagination.',
    traits: ['creative', 'intuitive', 'expressive', 'original']
  },
  {
    id: 'S',
    title: 'social',
    label: 'the helpers',
    icon: UsersThree,
    color: 'bg-emerald-signal',
    description: 'people who like working with others to help, train, develop, or cure them. they are skilled with words and enjoy social interaction.',
    traits: ['empathetic', 'kind', 'patient', 'cooperative']
  },
  {
    id: 'E',
    title: 'enterprising',
    label: 'the persuaders',
    icon: TrendUp,
    color: 'bg-amber-warmth',
    description: 'individuals who enjoy influencing, leading, or managing others for organizational goals or economic gain. they are energetic and ambitious.',
    traits: ['leader', 'assertive', 'confident', 'energetic']
  },
  {
    id: 'C',
    title: 'conventional',
    label: 'the organizers',
    icon: Notebook,
    color: 'bg-muted-slate',
    description: 'people who like to work with data, have clerical or numerical ability, and carry out tasks in detail. they value order and efficiency.',
    traits: ['ordered', 'efficient', 'practical', 'systematic']
  }
];

export default function RIASECGuide() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <span className="text-[9px] font-display font-black tracking-[4px] uppercase text-electric-blue mb-4 block">The Science of Career Selection</span>
        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-8 leading-[0.85] italic uppercase italic">
          The RIASEC <br /> <span className="text-charcoal-ink/10 group-hover:text-charcoal-ink transition-colors">Hexagon.</span>
        </h1>
        <p className="text-xl text-steel-secondary leading-relaxed max-w-2xl lowercase">
          the holland theory of career choice (riasec) is a globally validated framework that classifies people into six distinct types. by understanding your dominant types, we can map your personality to environments where you are most likely to thrive.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {traitData.map((trait, index) => (
          <motion.div
            key={trait.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="taste-card !p-10 group hover:border-charcoal-ink/20 transition-all duration-700"
          >
            <div className="flex justify-between items-start mb-10">
              <div className={`${trait.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                <trait.icon weight="bold" size={28} />
              </div>
              <span className="text-4xl font-display font-black text-charcoal-ink/[0.03] group-hover:text-charcoal-ink/[0.08] transition-colors">{trait.id}</span>
            </div>
            
            <h3 className="text-2xl font-display font-black uppercase mb-2 italic tracking-tighter group-hover:text-electric-blue transition-colors leading-none">{trait.title}.</h3>
            <span className="text-[9px] font-display font-black text-electric-blue uppercase tracking-widest mb-5 block">{trait.label}</span>
            
            <p className="text-base text-steel-secondary leading-relaxed mb-8 lowercase">
              {trait.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {trait.traits.map(t => (
                <span key={t} className="px-3 py-1 bg-canvas-white border border-charcoal-ink/5 rounded-full text-[9px] font-display font-black text-muted-slate uppercase tracking-widest italic group-hover:border-charcoal-ink/10 transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-16 bg-charcoal-ink text-white rounded-[3rem] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-16 opacity-5 scale-125 group-hover:rotate-12 transition-transform duration-[3s]">
           <Brain weight="bold" size={300} />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
              <Brain weight="bold" size={28} className="text-electric-blue" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter italic leading-[0.85]">Beyond just <br /> <span className="text-electric-blue">RIASEC.</span></h2>
            <p className="text-lg text-muted-slate leading-relaxed lowercase max-w-xl">
              future canvas integrates the **big five personality traits** and **core aptitude metrics** to provide a 360-degree view of your professional identity. we don't just tell you what you're good at—we tell you where you'll be happy.
            </p>
            <div className="flex items-center gap-5">
               <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full">
                  <p className="text-[9px] font-display font-black text-muted-slate uppercase tracking-[3px] italic leading-none">Joined by 10,000+ students nationwide</p>
               </div>
            </div>
          </div>
          <div className="w-full lg:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="taste-button-primary !bg-white !text-charcoal-ink !px-12 !py-6 !text-xl border-none shadow-none no-underline"
            >
              Start Assessment <CaretRight weight="bold" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
