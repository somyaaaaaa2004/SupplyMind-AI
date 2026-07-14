'use client';

import { motion } from 'framer-motion';
import { Brain, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Real-time procurement intelligence driven by machine learning.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and role-based access control.',
  },
  {
    icon: TrendingUp,
    title: 'Cost Optimization',
    description: 'Reduce procurement costs by up to 30% with smart automation.',
  },
];

const floatingShapes = [
  { x: '10%', y: '15%', size: 120, delay: 0 },
  { x: '75%', y: '10%', size: 80, delay: 1 },
  { x: '85%', y: '60%', size: 160, delay: 0.5 },
  { x: '5%', y: '70%', size: 100, delay: 1.5 },
  { x: '50%', y: '80%', size: 60, delay: 0.8 },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#09090B' }}>
      {/* ── Left panel (60%) ── */}
      <div className="relative hidden lg:flex lg:w-[60%] flex-col justify-between overflow-hidden p-12">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0F172A 0%, #1E1B4B 40%, #172554 70%, #0F172A 100%)',
          }}
        />

        {/* Animated glow blobs */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: '-10%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            bottom: '-5%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Floating shapes */}
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              border: '1px solid rgba(59,130,246,0.1)',
              background: 'rgba(59,130,246,0.03)',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: '#3B82F6' }}
            >
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="max-w-[220px] text-sm font-bold leading-snug text-[#F9FAFB]">
              AUTONOMOUS PROCUREMENT AND{' '}
              <span style={{ color: '#3B82F6' }}>LOGISTICS BRAIN</span>
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <motion.h1
              className="text-4xl font-bold leading-tight text-[#F9FAFB]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AI-Powered Enterprise
              <br />
              <span style={{ color: '#3B82F6' }}>Procurement Intelligence</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-[#9CA3AF]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Streamline procurement, inventory, and logistics with the power of AI.
            </motion.p>
          </div>

          <div className="space-y-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex items-start gap-4 rounded-xl p-4"
                style={{
                  background: 'rgba(17,24,39,0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: 'rgba(59,130,246,0.15)' }}
                >
                  <feature.icon className="h-5 w-5" style={{ color: '#3B82F6' }} />
                </div>
                <div>
                  <p className="font-medium text-[#F9FAFB]">{feature.title}</p>
                  <p className="mt-0.5 text-sm text-[#9CA3AF]">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-sm text-[#6B7280]">
          © {new Date().getFullYear()} AUTONOMOUS PROCUREMENT AND LOGISTICS BRAIN. All rights reserved.
        </div>
      </div>

      {/* ── Right panel (40%) ── */}
      <div className="flex w-full lg:w-[40%] flex-col items-center justify-center p-6 lg:p-12">
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: '#3B82F6' }}
          >
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="max-w-[200px] text-center text-xs font-bold leading-snug text-[#F9FAFB]">
            AUTONOMOUS PROCUREMENT AND{' '}
            <span style={{ color: '#3B82F6' }}>LOGISTICS BRAIN</span>
          </span>
        </div>

        {/* Glass card */}
        <motion.div
          className="w-full max-w-md rounded-2xl p-8"
          style={{
            background: 'rgba(17,24,39,0.8)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
