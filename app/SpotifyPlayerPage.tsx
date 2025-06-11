// pages/index.tsx ou app/page.tsx (dependendo da versão do Next.js)
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Tipos TypeScript
interface TimeElapsed {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeCounterProps {
  startDate: string;
  className?: string;
}

// Componente da chuva de corações
const HeartRain: React.FC = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; animationDuration: number; delay: number }>>([]);

  useEffect(() => {
    const createHeart = () => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: 4 + Math.random() * 3,
        delay: Math.random() * 1,
      };
      
      setHearts(prev => [...prev, newHeart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, (newHeart.animationDuration + newHeart.delay) * 1000);
    };

    const interval = setInterval(createHeart, 600);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute text-2xl"
            style={{
              left: `${heart.left}%`,
              top: '-50px',
              animationDuration: `${heart.animationDuration}s`,
              animationDelay: `${heart.delay}s`,
              animationName: 'heartFall',
              animationTimingFunction: 'linear',
            }}
          >
            💜
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes heartFall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 50px)) rotate(360deg);
            opacity: 0.7;
          }
        }
      `}</style>
    </>
  );
};

// Componente do contador de tempo
const TimeCounter: React.FC<TimeCounterProps> = ({ startDate, className = '' }) => {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDateTime = new Date(startDate);
    
    const calculateTimeElapsed = (): TimeElapsed => {
      const now = new Date();
      const diffInMilliseconds = now.getTime() - startDateTime.getTime();
      
      const totalSeconds = Math.floor(diffInMilliseconds / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      
      const totalMonths = Math.floor(totalDays / 30.44);
      
      return {
        months: totalMonths,
        days: totalDays - Math.floor(totalMonths * 30.44),
        hours: totalHours % 24,
        minutes: totalMinutes % 60,
        seconds: totalSeconds % 60
      };
    };

    setTimeElapsed(calculateTimeElapsed());

    const interval = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className={`text-center ${className}`}>
      <div className="relative inline-block">
        <div className="absolute inset-0 -m-2">
          <div className="w-full h-full rounded-full border-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-spin">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          </div>
        </div>
        
        <div className="absolute inset-0 -m-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full blur-sm opacity-60 animate-pulse"></div>
        
        <div className="relative bg-gray-900 rounded-full px-6 py-4 border border-purple-500/30">
          <p className="text-sm font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 font-semibold leading-relaxed">
            {timeElapsed.months} {timeElapsed.months === 1 ? 'mês' : 'meses'}<br/>
            {timeElapsed.days} {timeElapsed.days === 1 ? 'dia' : 'dias'}<br/>
            {timeElapsed.hours} {timeElapsed.hours === 1 ? 'hora' : 'horas'}<br/>
            {timeElapsed.minutes} {timeElapsed.minutes === 1 ? 'minuto' : 'minutos'}<br/>
            {timeElapsed.seconds} {timeElapsed.seconds === 1 ? 'segundo' : 'segundos'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente principal da página
const SpotifyPlayerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative">
      <HeartRain />
      
      <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden relative z-20">
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 p-1">
          <div className="bg-gray-900 rounded-t-3xl px-6 py-4">
            <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 text-center">
              Nosso primeiro dia dos namorados
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="w-full">
            <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-xl p-3 backdrop-blur-sm border border-purple-500/30">
              <iframe
                src="https://open.spotify.com/embed/track/3g5FrnRdbmDQyWNiDIprts?utm_source=generator&theme=0"
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl blur-md opacity-30"></div>
              <Image
                src="/quanto-teste.jpeg"
                alt="Quanto teste"
                width={400}
                height={300}
                className="relative w-full h-auto rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl border border-purple-500/30"
                priority
              />
            </div>
          </div>

          <div className="flex justify-center">
            <TimeCounter startDate="2024-09-07T00:00:00" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayerPage;