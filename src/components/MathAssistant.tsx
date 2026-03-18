import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, X, MessageSquare, Sparkles, BrainCircuit } from 'lucide-react';

import { Grade } from '../types';

interface MathAssistantProps {
  grade: Grade;
}

export const MathAssistant: React.FC<MathAssistantProps> = ({ grade }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: `Salut ! Je suis ton Assistant MathOS. Je suis là pour t'aider avec le programme de ${grade === '6eme' ? '6ème' : grade === '5eme' ? '5ème' : '4ème'}. Pose-moi ta question ! 🤓` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChat([
      { role: 'bot', text: `Salut ! Je suis ton Assistant MathOS. Je suis là pour t'aider avec le programme de ${grade === '6eme' ? '6ème' : grade === '5eme' ? '5ème' : '4ème'}. Pose-moi ta question ! 🤓` }
    ]);
  }, [grade]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const getResponse = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes('fraction')) return "Les fractions représentent un partage. Par exemple, 1/2 c'est la moitié. Pour additionner des fractions, il faut le même dénominateur !";
    if (lower.includes('pythagore')) return "Le théorème de Pythagore dit que dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés : a² + b² = c².";
    if (lower.includes('équation') || lower.includes('equation')) return "Une équation est une égalité avec une inconnue (souvent x). Le but est d'isoler x pour trouver sa valeur.";
    if (lower.includes('proportionnalité') || lower.includes('proportionalite')) return "La proportionnalité, c'est quand deux quantités varient de la même manière. Si tu doubles l'une, l'autre double aussi ! On utilise souvent le produit en croix.";
    if (lower.includes('thales') || lower.includes('thalès')) return "Le théorème de Thalès permet de calculer des longueurs dans des triangles emboîtés ou en configuration 'papillon' avec des droites parallèles.";
    if (lower.includes('aide') || lower.includes('bonjour') || lower.includes('salut')) return "Je peux t'expliquer les fractions, Pythagore, les équations ou Thalès. Pose-moi une question précise !";
    return "Je ne suis pas sûr de comprendre. Essaie de me poser une question sur les fractions, Pythagore ou les équations !";
  };

  const handleSend = () => {
    if (!message.trim() || isLoading) return;

    const userMsg = message.trim();
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const response = getResponse(userMsg);
      setChat(prev => [...prev, { role: 'bot', text: response }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[380px] max-w-[90vw] glass-card rounded-[2.5rem] shadow-2xl border-white/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/20">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl leading-none tracking-tight">Math Assistant</h3>
                  <p className="text-[10px] text-white/60 mt-1 uppercase font-bold tracking-widest">Base de connaissances active</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors relative z-10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="h-[450px] overflow-y-auto p-6 space-y-6 bg-slate-950/50"
            >
              {chat.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[85%] p-5 rounded-[1.5rem] text-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                      : 'glass-card text-slate-300 border-white/5 rounded-tl-none'}
                  `}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass-card p-4 rounded-2xl border-white/5 rounded-tl-none flex gap-1.5">
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-primary rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-5 bg-slate-900/50 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Pose ta question à l'assistant..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={!message.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-white rounded-xl disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center transition-all border border-white/10
          ${isOpen ? 'bg-slate-800 text-white' : 'bg-primary text-white shadow-[0_0_30px_rgba(99,102,241,0.4)]'}
        `}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-lg border-2 border-slate-900 flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};
