import { useState } from "react";
import { BookingData, Psychologist } from "../types";
import { PSYCHOLOGISTS, DEFAULT_SERVICE } from "../constants";
import { Button } from "./UI";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ShieldCheck, 
  Calendar, 
  User, 
  MapPin, 
  ReceiptText, 
  QrCode, 
  Wallet, 
  Banknote,
  Upload,
  Info
} from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

interface Step3Props {
  data: BookingData;
  updateData: (newData: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS (Gopay, OVO, Dana)', icon: QrCode },
  { id: 'va', name: 'Virtual Account', icon: Wallet },
  { id: 'manual', name: 'Transfer Manual', icon: Banknote },
];

export function Step3Payment({ data, updateData, onNext, onBack }: Step3Props) {
  const [selectedMethod, setSelectedMethod] = useState<string>('qris');
  const [showManualProof, setShowManualProof] = useState(false);

  const selectedPsychologist = PSYCHOLOGISTS.find(p => p.id === data.psychologistId);
  const formattedDate = data.selectedDate 
    ? format(new Date(data.selectedDate), 'EEEE, d MMMM yyyy', { locale: localeId })
    : "";

  const totalPrice = DEFAULT_SERVICE.defaultPrice;
  const dpPrice = totalPrice * 0.5;
  const currentPrice = data.paymentMethod === 'full' ? totalPrice : dpPrice;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-5 md:p-10"
    >
      <div className="mb-6 md:mb-8 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-brand-cream rounded-full transition-colors">
          <ChevronLeft className="text-brand-brown" size={20} />
        </button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-brand-brown tracking-tight">Pembayaran</h2>
          <p className="text-brand-gray text-xs md:text-sm">Tinjau pesanan Anda dan selesaikan transaksi.</p>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-5 gap-6 md:gap-8">
        <div className="md:col-span-3 space-y-6">
          {/* Summary Card */}
          <div className="bg-brand-cream/30 border border-brand-border/40 rounded-2xl p-6 space-y-4">
             <h3 className="font-bold text-brand-brown flex items-center gap-2 border-b pb-4 border-brand-border/20">
               <ReceiptText size={18} className="text-brand-orange" />
               Ringkasan Booking
             </h3>
             
             <div className="space-y-4">
               <div className="flex items-start gap-3">
                 <div className="mt-1 p-2 bg-white rounded-lg border border-brand-border/30">
                   <User size={16} className="text-brand-orange" />
                 </div>
                 <div>
                   <p className="text-[10px] text-brand-gray tracking-widest font-bold">Psikolog</p>
                   <p className="text-sm font-bold text-brand-brown">{selectedPsychologist?.displayName}</p>
                 </div>
               </div>

               <div className="flex items-start gap-3">
                 <div className="mt-1 p-2 bg-white rounded-lg border border-brand-border/30">
                   <Calendar size={16} className="text-brand-orange" />
                 </div>
                 <div>
                   <p className="text-[10px] text-brand-gray tracking-widest font-bold">Waktu</p>
                   <p className="text-sm font-bold text-brand-brown">{formattedDate}</p>
                   <p className="text-xs text-brand-orange font-medium">{data.selectedTime} WIB</p>
                 </div>
               </div>

               <div className="flex items-start gap-3">
                 <div className="mt-1 p-2 bg-white rounded-lg border border-brand-border/30">
                   <MapPin size={16} className="text-brand-orange" />
                 </div>
                 <div>
                   <p className="text-[10px] text-brand-gray tracking-widest font-bold">Layanan</p>
                   <p className="text-sm font-bold text-brand-brown">{DEFAULT_SERVICE.name}</p>
                 </div>
               </div>
             </div>
          </div>

          {/* Payment Type */}
          <div className="space-y-3">
            <h4 className="font-bold text-brand-brown text-sm">Pilih Tipe Pembayaran</h4>
             <div className="grid grid-cols-2 gap-3">
               <button
                 onClick={() => updateData({ paymentMethod: "full" })}
                 className={`p-4 rounded-xl border-2 text-left transition-all ${
                   data.paymentMethod === "full"
                     ? "border-brand-orange bg-brand-orange/5"
                     : "border-brand-border hover:border-brand-orange/30 bg-white"
                 }`}
               >
                 <p className="text-[10px] font-bold text-brand-gray tracking-wider mb-1">Bayar Penuh</p>
                 <p className="font-black text-brand-brown">Rp {totalPrice.toLocaleString('id-ID')}</p>
               </button>

               <button
                 onClick={() => updateData({ paymentMethod: "dp" })}
                 className={`p-4 rounded-xl border-2 text-left transition-all ${
                   data.paymentMethod === "dp"
                     ? "border-brand-orange bg-brand-orange/5"
                     : "border-brand-border hover:border-brand-orange/30 bg-white"
                 }`}
               >
                 <p className="text-[10px] font-bold text-brand-gray tracking-wider mb-1">DP 50%</p>
                 <p className="font-black text-brand-brown">Rp {dpPrice.toLocaleString('id-ID')}</p>
               </button>
             </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-brand-border/50 rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold text-brand-brown mb-4">Metode Pembayaran</h3>
             
             <div className="space-y-2">
               {PAYMENT_METHODS.map((method) => {
                 const Icon = method.icon;
                 return (
                   <button
                     key={method.id}
                     onClick={() => {
                        setSelectedMethod(method.id);
                        if (method.id === 'manual') setShowManualProof(true);
                        else setShowManualProof(false);
                     }}
                     className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${
                       selectedMethod === method.id
                         ? "border-brand-orange bg-brand-orange/[0.03] ring-1 ring-brand-orange"
                         : "border-brand-border hover:border-brand-orange/30"
                     }`}
                   >
                     <div className={`p-2 rounded-lg ${selectedMethod === method.id ? 'bg-brand-orange text-white' : 'bg-brand-cream text-brand-orange'}`}>
                        <Icon size={16} />
                     </div>
                     <span className="text-sm font-bold text-brand-brown">{method.name}</span>
                   </button>
                 );
               })}
             </div>

             <AnimatePresence>
               {showManualProof && (
                 <motion.div
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   className="mt-4 pt-4 border-t border-brand-border/30 overflow-hidden"
                 >
                   <div className="bg-blue-50 p-3 rounded-xl mb-4">
                     <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
                       BCA 123-456-7890 a/n FlourishCare Indonesia
                     </p>
                   </div>
                   <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-brand-border rounded-xl cursor-pointer hover:bg-brand-cream/20 transition-all">
                      <Upload size={20} className="text-brand-gray mb-1" />
                      <span className="text-[11px] font-bold text-brand-gray uppercase">Upload Bukti</span>
                      <input type="file" className="hidden" accept="image/*" />
                   </label>
                 </motion.div>
               )}
             </AnimatePresence>

             <div className="mt-8 border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-brand-gray font-medium">Total Tagihan</span>
                  <span className="text-xl font-black text-brand-brown">Rp {currentPrice.toLocaleString('id-ID')}</span>
                </div>
                <Button onClick={onNext} className="w-full">
                  Konfirmasi Pembayaran
                </Button>
                <div className="mt-4 flex items-center justify-center gap-2 text-brand-gray">
                  <ShieldCheck size={14} className="text-brand-success" />
                  <span className="text-[10px] font-bold tracking-wider">Keamanan Data Terjamin</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
