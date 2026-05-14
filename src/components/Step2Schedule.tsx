import { Psychologist, BookingData } from "../types";
import { PSYCHOLOGISTS } from "../constants";
import { Button } from "./UI";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState, useMemo } from "react";
import { 
  addDays, 
  format, 
  isSameDay, 
  startOfToday, 
  getDay, 
  eachDayOfInterval, 
  endOfMonth, 
  startOfMonth,
  addMonths,
  subMonths
} from "date-fns";
import { id as localeId } from "date-fns/locale";

interface Step2Props {
  data: BookingData;
  updateData: (newData: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DAYS_MAP: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

export function Step2Schedule({ data, updateData, onNext, onBack }: Step2Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const selectedPsychologist = useMemo(() => 
    PSYCHOLOGISTS.find(p => p.id === data.psychologistId),
    [data.psychologistId]
  );

  const availableSlots = useMemo(() => {
    if (!selectedPsychologist || !data.selectedDate) return [];
    
    const dayOfWeek = getDay(new Date(data.selectedDate));
    const dayName = DAYS_MAP[dayOfWeek];
    
    const availability = selectedPsychologist.availability.find(a => a.day === dayName);
    if (!availability) return [];

    const slots = [];
    let start = parseInt(availability.startTime.split(':')[0]);
    const end = parseInt(availability.endTime.split(':')[0]);

    while (start < end) {
      slots.push(`${String(start).padStart(2, '0')}:00`);
      start++;
    }
    return slots;
  }, [selectedPsychologist, data.selectedDate]);

  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const handleDateClick = (date: Date) => {
    const dayName = DAYS_MAP[getDay(date)];
    const isAvailable = selectedPsychologist?.availability.some(a => a.day === dayName);
    
    if (isAvailable) {
      updateData({ selectedDate: format(date, 'yyyy-MM-dd'), selectedTime: "" });
    }
  };

  const isComplete = data.psychologistId && data.selectedDate && data.selectedTime;

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
          <h2 className="text-xl md:text-2xl font-bold text-brand-brown">Pilih Jadwal</h2>
          <p className="text-brand-gray text-xs md:text-sm">Pilih psikolog dan waktu yang tersedia.</p>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        {/* Psychologist Selection */}
        <section>
          <h3 className="font-bold text-brand-brown/80 text-[10px] tracking-widest mb-3">Pilih Psikolog</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {PSYCHOLOGISTS.map((p) => (
              <div
                key={p.id}
                onClick={() => updateData({ psychologistId: p.id, selectedDate: "", selectedTime: "" })}
                className={`p-3 md:p-4 rounded-xl border transition-all cursor-pointer flex items-center md:flex-col gap-4 md:gap-0 text-left md:text-center ${
                  data.psychologistId === p.id
                    ? "bg-brand-orange/5 border-brand-orange ring-1 ring-brand-orange"
                    : "border-brand-border hover:border-brand-orange/40 bg-white"
                }`}
              >
                <img src={p.photo} alt={p.displayName} className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover md:mb-3" />
                <div className="flex-1 md:flex-none">
                  <h4 className="font-bold text-sm md:text-base text-brand-brown leading-tight">{p.displayName}</h4>
                  <p className="text-[10px] text-brand-orange tracking-widest mt-1 font-bold">Tersedia</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Date & Time Selection */}
        <AnimatePresence mode="wait">
          {data.psychologistId ? (
            <motion.div
              key="schedule-selection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-brand-border/40"
            >
              {/* Calendar */}
              <div className="bg-brand-cream/30 p-5 rounded-2xl border border-brand-border/30">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h4 className="font-bold text-brand-brown flex items-center gap-2">
                    <CalendarIcon size={18} className="text-brand-orange" />
                    {format(currentMonth, 'MMMM yyyy', { locale: localeId })}
                  </h4>
                  <div className="flex gap-2">
                    <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-white rounded-full">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-white rounded-full">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((d, i) => (
                    <div key={i} className="text-[10px] font-black text-brand-gray/50">{d}</div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date) => {
                    const dayName = DAYS_MAP[getDay(date)];
                    const isAvailable = selectedPsychologist?.availability.some(a => a.day === dayName);
                    const isSelected = data.selectedDate === format(date, 'yyyy-MM-dd');
                    const isPast = date < startOfToday();

                    return (
                      <button
                        key={date.toISOString()}
                        disabled={isPast}
                        onClick={() => handleDateClick(date)}
                        className={`aspect-square rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                          isSelected 
                            ? "bg-brand-orange text-white" 
                            : isAvailable && !isPast
                            ? "bg-white text-brand-brown hover:bg-brand-orange/10 border border-brand-border/50"
                            : "text-brand-gray/30 cursor-default"
                        }`}
                      >
                        {format(date, 'd')}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center gap-3 px-1">
                   <div className="w-2 h-2 rounded-full bg-brand-orange"></div>
                   <p className="text-[10px] text-brand-gray font-medium">Jadwal tersedia</p>
                </div>
              </div>

              {/* Time Slots */}
              <div className="flex flex-col">
                <h4 className="font-bold text-brand-brown flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-brand-orange" />
                  Waktu Sesi
                </h4>
                
                {data.selectedDate ? (
                  availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => updateData({ selectedTime: slot })}
                          className={`h-[52px] rounded-xl border flex items-center justify-center font-medium transition-all ${
                            data.selectedTime === slot
                              ? "bg-brand-orange/5 border-brand-orange text-brand-orange font-bold"
                              : "border-brand-border text-brand-gray hover:border-brand-orange/30 bg-white"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-brand-cream/20 rounded-2xl border border-dashed border-brand-border">
                      <p className="text-sm text-brand-gray leading-relaxed">
                        Maaf, tidak ada jadwal tersedia untuk hari ini. Silakan pilih hari lain.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-brand-cream/20 rounded-2xl border border-dashed border-brand-border">
                    <CalendarIcon size={32} className="text-brand-border mb-3" />
                    <p className="text-sm text-brand-gray leading-relaxed">
                      Pilih tanggal terlebih dahulu untuk melihat jam yang tersedia.
                    </p>
                  </div>
                )}

                <div className="mt-auto pt-6 flex justify-end">
                   <Button onClick={onNext} disabled={!isComplete}>
                     Lanjut ke Pembayaran
                   </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
               <User size={48} className="text-brand-border mb-4" />
               <p className="text-brand-gray font-medium">Silakan pilih psikolog terlebih dahulu.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
