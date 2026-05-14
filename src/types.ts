export enum Gender {
  MALE = "Laki-laki",
  FEMALE = "Perempuan",
}

export enum Concern {
  SPEECH_DELAY = "Keterlambatan bicara",
  EMOTION = "Tantrum atau regulasi emosi",
  FOCUS = "Sulit fokus atau hiperaktif",
  SCHOOL = "Kesiapan sekolah",
  LEARNING = "Kesulitan belajar",
  ANXIETY = "Kecemasan atau ketakutan",
  SOCIAL = "Perilaku sosial",
  PARENTING = "Parenting dan pola asuh",
  INITIAL = "Belum yakin, ingin konsultasi awal",
  OTHER = "Lainnya",
}

export interface Availability {
  day: string;
  dayLabelId: string;
  startTime: string;
  endTime: string;
}

export interface Psychologist {
  id: string;
  displayName: string;
  role: string;
  shortBio: string;
  photo: string;
  whatsappContact: string;
  availability: Availability[];
}

export interface Service {
  serviceId: string;
  name: string;
  description: string;
  durationMinutes: number;
  sessionStructure: string;
  defaultPrice: number;
  currency: string;
}

export interface BookingData {
  parentName: string;
  parentWhatsapp: string;
  parentEmail: string;
  childName: string;
  childBirthdate: string;
  childGender: Gender | "";
  mainConcern: Concern | "";
  concernDescription: string;
  psychologistId: string;
  selectedDate: string;
  selectedTime: string;
  paymentMethod: "full" | "dp";
}
