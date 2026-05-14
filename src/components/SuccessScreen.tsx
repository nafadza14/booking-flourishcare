import { BookingData, Psychologist } from "../types";
import { PSYCHOLOGISTS } from "../constants";
import { Button } from "./UI";
import { motion } from "motion/react";
import { CheckCircle2, Share2, CalendarCheck, MessageSquare, Download } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

interface SuccessScreenProps {
  data: BookingData;
  onReset: () => void;
}

export function SuccessScreen({ data, onReset }: SuccessScreenProps) {
  const selectedPsychologist = PSYCHOLOGISTS.find(p => p.id === data.psychologistId);
  const formattedDate = data.selectedDate 
    ? format(new Date(data.selectedDate), 'EEEE, d MMMM yyyy', { locale: localeId })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 md:p-12 text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-brand-success rounded-full flex items-center justify-center text-white"
          >
            <CheckCircle2 size={36} className="md:size-[48px]" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -inset-2 bg-brand-success/20 rounded-full -z-10"
          ></motion.div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-black text-brand-brown mb-2">Booking Berhasil!</h2>
      <p className="text-brand-gray text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
        Terima kasih, pembayaran Anda telah dikonfirmasi. Sesi konsultasi telah dijadwalkan dan detailnya telah dikirim ke WhatsApp Anda.
      </p>

      <div className="bg-brand-cream/40 rounded-2xl p-5 md:p-6 text-left border border-brand-border/40 mb-8 max-w-lg mx-auto overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <CalendarCheck size={120} />
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="flex justify-between border-b border-brand-border/20 pb-3">
             <span className="text-xs text-brand-gray font-bold tracking-widest">ID Pesanan</span>
             <span className="text-sm font-black text-brand-brown">FLR-{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
               <span className="text-[10px] text-brand-gray tracking-widest font-bold">Psikolog</span>
               <p className="text-sm font-bold text-brand-brown">{selectedPsychologist?.displayName}</p>
             </div>
             <div>
               <span className="text-[10px] text-brand-gray tracking-widest font-bold">Waktu Sesi</span>
               <p className="text-sm font-bold text-brand-brown">{formattedDate}</p>
               <p className="text-xs text-brand-orange font-bold mt-0.5">{data.selectedTime} WIB</p>
             </div>
          </div>

          <div>
             <span className="text-[10px] text-brand-gray tracking-widest font-bold">Konsultasi Untuk</span>
             <p className="text-sm font-bold text-brand-brown">{data.childName}</p>
          </div>
          
          <div className="pt-4 border-t border-brand-border/20 flex items-center justify-between">
             <span className="text-xs font-bold text-brand-gray tracking-widest">Metode Pembayaran</span>
             <span className="text-sm font-black text-brand-success">{data.paymentMethod === 'full' ? 'LUNAS (Full Payment)' : 'DP 50% (Plafon)'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
         <Button 
            onClick={() => window.open('https://wa.me/628175028099', '_blank')} 
            className="flex-1 flex gap-3 items-center justify-center h-[56px]"
         >
            <img 
              src="https://i.imgur.com/eLTwO8y.png" 
              alt="WA" 
              className="w-5 h-5 object-contain"
              referrerPolicy="no-referrer"
            />
            Chat Admin (Konfirmasi)
         </Button>
         <Button variant="secondary" onClick={onReset} className="flex-1 h-[56px]">
           Booking Sesi Lain
         </Button>
      </div>

      <div className="mt-8 flex justify-center gap-6">
         <button className="flex items-center gap-2 text-brand-gray hover:text-brand-orange transition-colors text-xs font-bold tracking-widest">
            <Download size={14} />
            Download Bukti
         </button>
         <button className="flex items-center gap-2 text-brand-gray hover:text-brand-orange transition-colors text-xs font-bold tracking-widest">
            <Share2 size={14} />
            Bagikan
         </button>
      </div>
    </motion.div>
  );
}
