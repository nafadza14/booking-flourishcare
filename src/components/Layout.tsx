import { ReactNode } from "react";
import { motion } from "motion/react";

interface LayoutProps {
  children: ReactNode;
  logoUrl?: string;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-brand-cream py-8 px-4 md:py-12 overflow-hidden">
      {/* Visual Decorations - Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-brand-orange-light/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-brand-cream-dark/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-[40%] left-[-10%] w-[300px] h-[300px] bg-brand-progress/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-[720px] mx-auto flex flex-col items-center relative z-10">
        {/* Logo Section */}
        <div className="mb-8 md:mb-12 flex flex-col items-center">
          <div className="w-[180px] md:w-[240px] transition-all">
             <img 
               src="https://i.imgur.com/ulnkI6c.png" 
               alt="FlourishCare Logo" 
               className="w-full h-auto"
               referrerPolicy="no-referrer"
             />
          </div>
          <p className="mt-4 text-brand-brown/70 font-medium text-sm md:text-base text-center italic">
            Menemani tumbuh kembang, menuju versi terbaik 🌱
          </p>
        </div>

        {/* Main Content Modal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white rounded-card shadow-warm overflow-hidden border border-brand-border/50"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
