import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, X, Divide, Brain, Sparkles, Star, Gamepad2, Calculator, Zap, Grid3X3, Loader2, Hash, Percent, Binary, Sigma, GraduationCap, ArrowRight, Play, BookOpen, Trophy as TrophyIcon, BrainCircuit, Shield } from 'lucide-react';
import { MathGame } from './components/MathGame';
import { SpeedGame } from './components/SpeedGame';
import { GridGame } from './components/GridGame';
import { MemoryGame } from './components/MemoryGame';
import { PatternGame } from './components/PatternGame';
import { AdminPanel } from './components/AdminPanel';
import { MathAssistant } from './components/MathAssistant';
import { Difficulty, Operation, Grade } from './types';

type GameMode = 'classic' | 'speed' | 'grid' | 'memory' | 'pattern';

const FloatingShape = ({ delay, color, size, top, left }: { delay: number, color: string, size: string, top: string, left: string }) => (
  <motion.div
    animate={{
      y: [0, -40, 0],
      x: [0, 20, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
    className={`absolute ${color} ${size} rounded-full blur-[80px] opacity-30 -z-10`}
    style={{ top, left }}
  />
);

export default function App() {
  const [gameState, setGameState] = useState<'home' | 'playing'>('home');
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [grade, setGrade] = useState<Grade>('6eme');
  const [operation, setOperation] = useState<Operation>('addition');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [mathTip, setMathTip] = useState<string>('Les maths sont partout, même dans la musique ! 🎵');

  useEffect(() => {
    const tips = [
      "Le chiffre 0 n'existait pas dans l'Antiquité romaine.",
      "Un cercle a une infinité d'axes de symétrie.",
      "Le mot 'Algèbre' vient de l'arabe 'al-jabr'.",
      "La somme des angles d'un triangle est toujours 180°.",
      "Le nombre Pi est infini et ne se répète jamais."
    ];
    setMathTip(tips[Math.floor(Math.random() * tips.length)]);
  }, [gameState, grade]);

  const startGame = (op: Operation) => {
    setOperation(op);
    setGameState('playing');
  };

  const handleExternalRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.location.href = "https://www.tablesdemultiplication.fr/canard-de-multiplication.html";
    }, 5000);
  };

  const [showProgram, setShowProgram] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCreatorBanner, setShowCreatorBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    const bannerTimer = setTimeout(() => setShowCreatorBanner(true), 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(bannerTimer);
    };
  }, []);

  const handleAdminAuth = () => {
    if (adminCode === 'CIES-BROCARD') {
      setShowAdminAuth(false);
      setShowAdmin(true);
      setAdminCode('');
    } else {
      alert("Code incorrect.");
    }
  };

  const allModes = [
    { id: 'addition', name: 'Addition', icon: Plus, color: 'bg-blue-500', shadow: 'shadow-blue-500/50', grades: ['6eme', '5eme', '4eme'] },
    { id: 'subtraction', name: 'Soustraction', icon: Minus, color: 'bg-rose-500', shadow: 'shadow-rose-500/50', grades: ['6eme', '5eme', '4eme'] },
    { id: 'multiplication', name: 'Multiplication', icon: X, color: 'bg-amber-500', shadow: 'shadow-amber-500/50', grades: ['6eme', '5eme', '4eme'] },
    { id: 'division', name: 'Division', icon: Divide, color: 'bg-emerald-500', shadow: 'shadow-emerald-500/50', grades: ['6eme', '5eme', '4eme'] },
    { id: 'decimals', name: 'Décimaux', icon: Hash, color: 'bg-cyan-500', shadow: 'shadow-cyan-500/50', grades: ['6eme', '5eme', '4eme'] },
    { id: 'fractions', name: 'Fractions', icon: Binary, color: 'bg-orange-500', shadow: 'shadow-orange-500/50', grades: ['6eme', '5eme', '4eme'] },
    { id: 'relatives', name: 'Relatifs', icon: Sigma, color: 'bg-purple-500', shadow: 'shadow-purple-500/50', grades: ['5eme', '4eme'] },
    { id: 'powers', name: 'Puissances', icon: Zap, color: 'bg-yellow-600', shadow: 'shadow-yellow-500/50', grades: ['4eme'] },
    { id: 'equations', name: 'Équations', icon: Calculator, color: 'bg-slate-700', shadow: 'shadow-slate-500/50', grades: ['4eme'] },
    { id: 'percentages', name: 'Pourcentages', icon: Percent, color: 'bg-pink-500', shadow: 'shadow-pink-500/50', grades: ['6eme', '5eme', '4eme'] },
    { id: 'proportionality', name: 'Proportionnalité', icon: Grid3X3, color: 'bg-lime-500', shadow: 'shadow-lime-500/50', grades: ['6eme', '5eme', '4eme'] },
    { id: 'mixed', name: 'Mélange', icon: Brain, color: 'bg-indigo-500', shadow: 'shadow-indigo-500/50', grades: ['6eme', '5eme', '4eme'] },
  ];

  const modes = allModes.filter(m => m.grades.includes(grade));

  const gameStyles = [
    { id: 'classic', name: 'Classique', icon: <Calculator className="w-6 h-6" />, desc: 'Quiz traditionnel' },
    { id: 'speed', name: 'Vitesse', icon: <Zap className="w-6 h-6" />, desc: 'Vrai ou Faux rapide' },
    { id: 'grid', name: 'Grille', icon: <Grid3X3 className="w-6 h-6" />, desc: 'Trouve les résultats' },
    { id: 'memory', name: 'Mémoire', icon: <Brain className="w-6 h-6" />, desc: 'Paires de calculs' },
    { id: 'pattern', name: 'Suites', icon: <Sigma className="w-6 h-6" />, desc: 'Complète la suite' },
  ];

  const gradesList = [
    { id: '6eme', name: '6ème', desc: 'Bases, Décimaux, Fractions' },
    { id: '5eme', name: '5ème', desc: 'Relatifs, Priorités, Fractions' },
    { id: '4eme', name: '4ème', desc: 'Puissances, Équations, Relatifs' },
  ];

  const programDetails = {
    '6eme': [
      "Nombres entiers et décimaux : lecture, écriture, comparaison.",
      "Opérations de base : addition, soustraction, multiplication.",
      "Fractions : partage, égalité de fractions simples.",
      "Proportionnalité et pourcentages simples.",
      "Géométrie de base : droites, cercles, angles."
    ],
    '5eme': [
      "Nombres relatifs : addition et soustraction.",
      "Calcul littéral : initiation aux expressions.",
      "Priorités opératoires et distributivité.",
      "Fractions : addition et soustraction (même dénominateur).",
      "Statistiques et probabilités simples."
    ],
    '4eme': [
      "Puissances de 10 et notation scientifique.",
      "Nombres relatifs : multiplication et division.",
      "Équations du premier degré : résolution simple.",
      "Théorème de Pythagore et trigonométrie.",
      "Fractions : multiplication et division."
    ]
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/30">
      {/* Background Elements */}
      <FloatingShape delay={0} color="bg-primary" size="w-[500px] h-[500px]" top="-10%" left="-10%" />
      <FloatingShape delay={2} color="bg-secondary" size="w-[400px] h-[400px]" top="60%" left="70%" />
      <FloatingShape delay={4} color="bg-accent" size="w-[300px] h-[300px]" top="20%" left="80%" />
      <FloatingShape delay={6} color="bg-indigo-500" size="w-[400px] h-[400px]" top="80%" left="10%" />
      <FloatingShape delay={1} color="bg-purple-500" size="w-[200px] h-[200px]" top="40%" left="30%" />
      <FloatingShape delay={3} color="bg-emerald-500" size="w-[250px] h-[250px]" top="10%" left="50%" />

      {/* Neural Network Background Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-secondary/10 blur-[120px] rounded-full" 
        />
      </div>

      <MathAssistant grade={grade} />

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-slate-950 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-center"
            >
              <div className="bg-primary/20 p-6 rounded-[3rem] mb-8 inline-block animate-pulse">
                <BrainCircuit className="w-24 h-24 text-primary" />
              </div>
              <h1 className="text-7xl font-display text-white mb-4 tracking-tighter">Bienvenue!</h1>
              <p className="text-slate-500 uppercase tracking-[1em] text-xs">Initialisation du système neural</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
                boxShadow: ["0 0 20px rgba(99,102,241,0.3)", "0 0 40px rgba(99,102,241,0.6)", "0 0 20px rgba(99,102,241,0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-8 p-4 rounded-full bg-primary/20 border border-primary/50"
            >
              <BrainCircuit className="w-20 h-20 text-primary" />
            </motion.div>
            <h2 className="text-4xl font-display mb-4 neon-text">Initialisation du bassin...</h2>
            <p className="text-xl text-slate-400 font-bold uppercase tracking-widest animate-pulse">Synchronisation en cours (5s)</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {gameState === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <section className="relative pt-12 pb-20 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border-primary/30"
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Système d'Apprentissage Avancé</span>
                  </motion.div>
                  <h1 className="text-6xl md:text-9xl font-display mb-8 tracking-tighter leading-[0.85] text-white">
                    Maths <br />
                    <span className="neon-text italic">Augmentées</span> <br />
                    par MathOS.
                  </h1>
                  <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                    Maîtrise les concepts complexes avec une assistance cognitive en temps réel et des défis personnalisés.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <button 
                      onClick={() => startGame('mixed')}
                      className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-105 transition-all flex items-center gap-3 group"
                    >
                      <Zap className="w-5 h-5 fill-current group-hover:animate-pulse" /> Lancer l'Analyse
                    </button>
                    <button 
                      onClick={() => setShowProgram(true)}
                      className="glass text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                    >
                      <BookOpen className="w-5 h-5" /> Programme
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, type: "spring" }}
                  className="relative hidden lg:block"
                >
                  <div className="relative z-10 glass p-4 rounded-[4rem] animate-scan">
                    <div className="bg-slate-900/80 rounded-[3.5rem] p-12 aspect-square flex items-center justify-center overflow-hidden border border-white/5">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                          filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="text-[14rem] drop-shadow-[0_0_50px_rgba(99,102,241,0.5)]"
                      >
                        🧠
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Math Insight Card */}
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-10 -right-10 glass-card p-6 rounded-3xl max-w-xs z-20"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/20 p-2 rounded-xl"><BrainCircuit className="text-primary w-5 h-5" /></div>
                      <p className="text-xs text-primary font-bold uppercase tracking-widest">Math Insight</p>
                    </div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="text-sm text-slate-300 italic leading-relaxed"
                    >
                      "{mathTip}"
                    </motion.p>
                  </motion.div>
                </motion.div>
              </section>

              {/* Program Modal */}
              <AnimatePresence>
                {showProgram && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-background/80 backdrop-blur-xl z-[110] flex items-center justify-center p-4"
                    onClick={() => setShowProgram(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="glass-card rounded-[3rem] p-10 max-w-2xl w-full max-h-[90vh] relative overflow-hidden flex flex-col"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent z-20" />
                      <button 
                        onClick={() => setShowProgram(false)}
                        className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors z-20"
                      >
                        <X className="w-6 h-6 text-slate-500" />
                      </button>

                      <div className="flex items-center gap-6 mb-10 shrink-0">
                        <div className="bg-primary/20 p-4 rounded-2xl">
                          <BookOpen className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-4xl font-display text-white">Programme</h2>
                          <p className="text-slate-400">Structure des données par niveau</p>
                        </div>
                      </div>

                      <div className="space-y-10 overflow-y-auto pr-4 custom-scrollbar">
                        {Object.entries(programDetails).map(([key, items]) => (
                          <div key={key} className={grade === key ? 'opacity-100' : 'opacity-30'}>
                            <h4 className="font-display text-2xl mb-4 flex items-center gap-3 text-white">
                              {key === '6eme' ? '6ème' : key === '5eme' ? '5ème' : '4ème'}
                              {grade === key && <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full uppercase tracking-widest font-bold">Niveau Actif</span>}
                            </h4>
                            <ul className="grid gap-3">
                              {items.map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-400">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0 shadow-[0_0_10px_rgba(99,102,241,1)]" />
                                  <span className="text-sm leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Configuration Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 1. Style Selection */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-7 glass-card p-10 rounded-[3.5rem]"
                >
                  <h3 className="text-2xl font-display mb-10 flex items-center gap-4 text-white">
                    <div className="bg-primary/20 p-3 rounded-2xl"><Gamepad2 className="w-7 h-7 text-primary" /></div>
                    Interface de Simulation
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {gameStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setGameMode(style.id as GameMode)}
                        className={`
                          p-6 rounded-[2.5rem] border transition-all flex flex-col items-center gap-5 text-center group relative overflow-hidden
                          ${gameMode === style.id 
                            ? 'border-primary bg-primary/10 text-primary shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
                            : 'border-white/5 hover:border-white/20 text-slate-500'}
                        `}
                      >
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${gameMode === style.id ? 'bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}>
                          {style.icon}
                        </div>
                        <div>
                          <p className="font-bold text-sm tracking-tight">{style.name}</p>
                          <p className="text-[10px] opacity-40 mt-1 uppercase tracking-widest">{style.desc}</p>
                        </div>
                        {gameMode === style.id && (
                          <motion.div layoutId="active-glow" className="absolute inset-0 bg-primary/5 -z-10" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* 2. Grade & Difficulty */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-5 glass-card p-10 rounded-[3.5rem] space-y-10"
                >
                  <div>
                    <h3 className="text-xl font-display mb-8 flex items-center gap-4 text-white">
                      <div className="bg-secondary/20 p-3 rounded-2xl"><GraduationCap className="w-6 h-6 text-secondary" /></div>
                      Classement Neural
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {gradesList.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setGrade(g.id as Grade)}
                          className={`
                            py-4 rounded-2xl border transition-all text-sm font-bold
                            ${grade === g.id 
                              ? 'border-secondary bg-secondary/20 text-secondary shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                              : 'border-white/5 hover:border-white/20 text-slate-500'}
                          `}
                        >
                          {g.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-display mb-8 flex items-center gap-4 text-white">
                      <div className="bg-accent/20 p-3 rounded-2xl"><Zap className="w-6 h-6 text-accent" /></div>
                      Intensité du Calcul
                    </h3>
                    <div className="flex gap-4">
                      {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                        <button
                          key={d}
                          onClick={() => setDifficulty(d)}
                          className={`
                            flex-1 py-4 rounded-2xl border transition-all text-sm font-bold
                            ${difficulty === d 
                              ? 'border-accent bg-accent/20 text-accent shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                              : 'border-white/5 hover:border-white/20 text-slate-500'}
                          `}
                        >
                          {d === 'easy' ? 'Bas' : d === 'medium' ? 'Moyen' : 'Max'}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Operations Grid */}
              <section>
                <div className="flex items-center justify-between mb-12 px-6">
                  <h3 className="text-3xl font-display flex items-center gap-4 text-white">
                    <div className="bg-primary/20 p-3 rounded-2xl"><Plus className="w-7 h-7 text-primary" /></div>
                    Protocoles d'Entraînement
                  </h3>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Sélectionne un module</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* External Game Button */}
                  <motion.button
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExternalRedirect}
                    className="group relative bg-indigo-600 p-10 rounded-[3.5rem] shadow-2xl shadow-indigo-500/20 border-none text-left overflow-hidden text-white"
                  >
                    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md group-hover:scale-110 transition-transform border border-white/20">
                      <span className="text-4xl">🦆</span>
                    </div>
                    <h3 className="text-2xl font-display mb-3">Duck Protocol</h3>
                    <p className="text-indigo-100/60 text-sm mb-8 leading-relaxed">
                      Accède à la simulation externe pour un entraînement intensif aux tables.
                    </p>
                    <div className="flex items-center gap-3 font-bold text-xs uppercase tracking-widest">
                      Lancer la liaison <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                      <BrainCircuit className="w-40 h-40" />
                    </div>
                  </motion.button>

                  {modes.map((mode, i) => (
                    <motion.button
                      key={mode.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => startGame(mode.id as Operation)}
                      className="group relative glass-card p-10 rounded-[3.5rem] text-left overflow-hidden"
                    >
                      <div className={`w-16 h-16 ${mode.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg ${mode.shadow} group-hover:scale-110 transition-transform`}>
                        <mode.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-display mb-3 text-white">{mode.name}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed uppercase tracking-wider">
                        {mode.id === 'mixed' ? 'Analyse globale du programme.' : `Optimisation des ${mode.name.toLowerCase()}.`}
                      </p>
                      <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-white">
                        <mode.icon className="w-32 h-32" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </section>

              <footer className="mt-32 text-center border-t border-white/5 pt-16 pb-16">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg"><BrainCircuit className="w-6 h-6 text-primary" /></div>
                    <span className="font-display text-2xl text-white tracking-tight">Math<span className="text-primary">OS</span></span>
                  </div>
                  <div className="h-px w-12 bg-white/10 hidden md:block" />
                  <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-bold">Droits d'auteurs : Diego HAMON BAYARD</p>
                </div>
                <p className="text-slate-500 text-xs uppercase tracking-[0.4em] mb-8">© 2026 Neural Learning Systems</p>
                
                <button 
                  onClick={() => setShowAdminAuth(true)}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-all hover:scale-110 text-[10px] font-bold uppercase tracking-[0.3em] group"
                >
                  <Shield className="w-3 h-3 group-hover:rotate-12 transition-transform" /> Accès Administrateur
                </button>
              </footer>
            </motion.div>
          ) : (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {gameMode === 'classic' && (
                <MathGame difficulty={difficulty} grade={grade} operation={operation} onBack={() => setGameState('home')} />
              )}
              {gameMode === 'speed' && (
                <SpeedGame difficulty={difficulty} grade={grade} operation={operation} onBack={() => setGameState('home')} />
              )}
              {gameMode === 'grid' && (
                <GridGame difficulty={difficulty} grade={grade} operation={operation} onBack={() => setGameState('home')} />
              )}
              {gameMode === 'memory' && (
                <MemoryGame difficulty={difficulty} grade={grade} operation={operation} onBack={() => setGameState('home')} />
              )}
              {gameMode === 'pattern' && (
                <PatternGame difficulty={difficulty} grade={grade} onBack={() => setGameState('home')} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {showAdminAuth && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card p-10 rounded-[3rem] max-w-md w-full text-center"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display text-white mb-2">Accès Restreint</h3>
                <p className="text-slate-400 text-sm mb-8 uppercase tracking-widest">Entrez le code d'autorisation</p>
                
                <input 
                  type="password"
                  value={adminCode}
                  onChange={e => setAdminCode(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAdminAuth()}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-center text-xl mb-6 focus:border-primary/50 outline-none transition-all"
                  placeholder="••••••••"
                />

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowAdminAuth(false)}
                    className="flex-1 py-4 glass rounded-2xl text-white font-bold hover:bg-white/5 transition-all"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={handleAdminAuth}
                    className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20"
                  >
                    Valider
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCreatorBanner && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[400] w-full max-w-md px-4"
            >
              <div className="glass-card p-6 rounded-[2rem] border-primary/30 flex items-center justify-between shadow-2xl shadow-primary/20">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-xl">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-white font-medium">Site créé par <span className="text-primary font-bold">Diego HAMON BAYARD</span></p>
                </div>
                <button 
                  onClick={() => setShowCreatorBanner(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

