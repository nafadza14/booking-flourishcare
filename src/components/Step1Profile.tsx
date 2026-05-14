import React from "react";
import { Gender, Concern, BookingData } from "../types";
import { Label, Input, Select, Textarea, Button } from "./UI";
import { motion } from "motion/react";

interface Step1Props {
  data: BookingData;
  updateData: (newData: Partial<BookingData>) => void;
  onNext: () => void;
}

export function Step1Profile({ data, updateData, onNext }: Step1Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid =
    data.parentName &&
    data.parentWhatsapp &&
    data.parentEmail &&
    data.childName &&
    data.childBirthdate &&
    data.childGender &&
    data.mainConcern;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-5 md:p-10"
    >
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-brand-brown mb-2">Lengkapi Profil</h2>
        <p className="text-brand-gray text-xs md:text-sm">Mohon isi data orang tua dan anak untuk memulai sesi konsultasi.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-brand-brown/80 text-xs tracking-widest">Informasi Orang Tua</h3>
            <div>
              <Label>Nama Lengkap Orang Tua/Wali</Label>
              <Input
                placeholder="Contoh: Astrid Nurul"
                required
                value={data.parentName}
                onChange={(e) => updateData({ parentName: e.target.value })}
              />
            </div>
            <div>
              <Label>Nomor WhatsApp Aktif</Label>
              <Input
                type="tel"
                placeholder="Contoh: 0812xxxxxxx"
                required
                value={data.parentWhatsapp}
                onChange={(e) => updateData({ parentWhatsapp: e.target.value })}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="nama@email.com"
                required
                value={data.parentEmail}
                onChange={(e) => updateData({ parentEmail: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-brand-brown/80 text-xs tracking-widest">Informasi Anak</h3>
            <div>
              <Label>Nama Anak</Label>
              <Input
                placeholder="Nama anak"
                required
                value={data.childName}
                onChange={(e) => updateData({ childName: e.target.value })}
              />
            </div>
            <div>
              <Label>Tanggal Lahir Anak</Label>
              <Input
                type="date"
                required
                value={data.childBirthdate}
                onChange={(e) => updateData({ childBirthdate: e.target.value })}
              />
            </div>
            <div>
              <Label>Jenis Kelamin Anak</Label>
              <div className="flex gap-4">
                {Object.values(Gender).map((g) => (
                  <label
                    key={g}
                    className={`flex-1 flex items-center justify-center h-[56px] rounded-input border transition-all cursor-pointer ${
                      data.childGender === g
                        ? "bg-brand-orange/5 border-brand-orange text-brand-orange font-bold"
                        : "border-brand-border text-brand-gray hover:border-brand-orange/30"
                    }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      name="gender"
                      value={g}
                      checked={data.childGender === g}
                      onChange={() => updateData({ childGender: g })}
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-brand-border/40 space-y-4">
          <div>
            <Label>Hal utama yang ingin dikonsultasikan</Label>
            <Select
              required
              value={data.mainConcern}
              onChange={(e) => updateData({ mainConcern: e.target.value as Concern })}
            >
              <option value="">Pilih kebutuhan</option>
              {Object.values(Concern).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Ceritakan singkat kondisi anak (Opsional)</Label>
            <Textarea
              placeholder="Contoh: Anak usia 4 tahun belum lancar bicara dan sering tantrum ketika rutinitas berubah."
              maxLength={800}
              value={data.concernDescription}
              onChange={(e) => updateData({ concernDescription: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Button type="submit" disabled={!isFormValid} className="w-full">
            Lanjut Pilih Jadwal
          </Button>
          <a
             href="https://wa.me/628175028099"
             target="_blank"
             rel="noreferrer"
             className="flex items-center justify-center gap-2 text-brand-brown/60 hover:text-brand-orange transition-colors font-medium text-sm"
          >
            <img 
              src="https://i.imgur.com/eLTwO8y.png" 
              alt="Chat Admin Icon" 
              className="w-5 h-5 object-contain"
              referrerPolicy="no-referrer"
            />
            Butuh bantuan? Chat Admin
          </a>
        </div>
      </form>
    </motion.div>
  );
}
