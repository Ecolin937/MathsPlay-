import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Timer, Zap, Trophy, Target } from 'lucide-react';
import { Difficulty, Operation, Grade } from '../types';
import { generateQuestion } from '../utils';

interface GridGameProps {
  difficulty: Difficulty;
  grade: Grade;
  operation: Operation;
  onBack: () => void;
}

export const GridGame: React.FC<GridGameProps> = ({ difficulty, grade, operation, onBack }) => {
  const [target, setTarget] = useState<{ text: string, answer: string | number } | null>(null);
  const [grid, setGrid] = useState<(string | number)[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isGameOver, setIsGameOver] = useState(false);
  const [foundCount, setFoundCount] = useState(0);

  const generateLevel = () => {
    const q = generateQuestion(difficulty, operation, grade);
    setTarget({ text: q.text, answer: q.answer });
    
    const newGrid: (string | number)[] = [];
    const correctCount = 3;
    for (let i = 0; i < correctCount; i++) newGrid.push(q.answer);
    
    while (newGrid.length < 12) {
      let randomVal: string | number;
      if (typeof q.answer === 'number') {
        randomVal = Math.floor(Math.random() * (q.answer + 20)) + Math.max(0, q.answer - 10);
      } else {
        const parts = q.answer.split('/');
        randomVal = `${Math.floor(Math.random() * 10) + 1}/${parts[1]}`;
      }
      
      if (randomVal !== q.answer) newGrid.push(randomVal);
    }
    
    setGrid(newGrid.sort(() => Math.random() - 0.5));
    setFoundCount(0);
  };

  useEffect(() => {
    generateLevel();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePick = (val: string | number, idx: number) => {
    if (isGameOver || !target) return;

    if (val === target.answer) {
      setScore(s => s + 5);
      setFoundCount(f => f + 1);
      // Remove from grid visually
      const newGrid = [...grid];
      newGrid[idx] = '-1';
      setGrid(newGrid);

      if (foundCount + 1 === 3) {
        setTimeout(generateLevel, 300);
      }
    } else {
      setScore(s => Math.max(0, s - 2));
      setTimeLeft(t => Math.max(0, t - 2));
    }
  };

  if (isGameOver) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6"
      >
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)] border border-primary/50">
          <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-4xl font-display mb-2 text-white">Grille Terminée !</h2>
        <p className="text-slate-400 mb-8 text-lg">Matrice de données entièrement analysée.</p>
        
        <div className="glass-card border-primary/20 rounded-[2.5rem] p-10 mb-12 w-full max-w-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
          <p className="text-xs text-primary uppercase font-bold tracking-[0.3em] mb-4">Score Final</p>
          <p className="text-7xl font-display text-white">{score}</p>
        </div>

        <button 
          onClick={onBack} 
          className="group relative px-12 py-4 bg-primary text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          Retour au Menu
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="p-3 hover:bg-white/10 rounded-2xl transition-colors text-slate-400">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-4">
          <div className="glass-card px-6 py-2 rounded-full border-white/5 flex items-center gap-3">
            <Timer className="w-5 h-5 text-primary" />
            <span className="font-bold text-white text-lg">{timeLeft}s</span>
          </div>
          <div className="glass-card px-6 py-2 rounded-full border-white/5 flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-white text-lg">{score}</span>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] p-10 border-white/5 mb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50" />
        <div className="flex items-center justify-center gap-3 text-slate-500 mb-4">
          <Target size={18} className="text-primary" />
          <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Cible de la Matrice :</span>
        </div>
        <h3 className="text-5xl font-display text-white mb-6">{target?.text}</h3>
        <div className="flex justify-center gap-3">
          {[1, 2, 3].map(i => (
            <motion.div 
              key={i} 
              initial={false}
              animate={{ 
                scale: i <= foundCount ? [1, 1.2, 1] : 1,
                backgroundColor: i <= foundCount ? '#6366f1' : 'rgba(255,255,255,0.05)'
              }}
              className="w-4 h-4 rounded-full border border-white/10" 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {grid.map((val, idx) => (
          <motion.button
            key={`${idx}-${val}`}
            whileHover={val !== '-1' ? { scale: 1.05, y: -4 } : {}}
            whileTap={val !== '-1' ? { scale: 0.95 } : {}}
            onClick={() => val !== '-1' && handlePick(val, idx)}
            disabled={val === '-1'}
            className={`
              aspect-square rounded-3xl text-3xl font-display transition-all border
              ${val === '-1' 
                ? 'bg-white/5 border-transparent opacity-20' 
                : 'glass-card border-white/5 text-white hover:border-primary/50 hover:bg-white/5 shadow-lg'}
            `}
          >
            {val !== '-1' && val}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
