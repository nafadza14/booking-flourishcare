import { Psychologist, Service } from "./types";

export const PSYCHOLOGISTS: Psychologist[] = [
  {
    id: "achla",
    displayName: "Achla Himmah M.Psi., Psikolog",
    role: "Psychologist",
    shortBio: "Psikolog FlourishCare yang dapat membantu orang tua memahami kebutuhan emosi, perilaku, tumbuh kembang, dan dinamika anak.",
    photo: "https://i.imgur.com/NJYoO9f.jpeg",
    whatsappContact: "+628175028099",
    availability: [
      {
        day: "Sunday",
        dayLabelId: "Minggu",
        startTime: "09:00",
        endTime: "16:00",
      },
      {
        day: "Monday",
        dayLabelId: "Senin",
        startTime: "14:00",
        endTime: "16:00",
      },
    ],
  },
  {
    id: "azna",
    displayName: "Rofanny Haznatu P K M.Psi., Psikolog",
    role: "Psychologist",
    shortBio: "Psikolog FlourishCare untuk sesi konsultasi anak dan keluarga.",
    photo: "https://i.imgur.com/2BwVOxV.jpeg",
    whatsappContact: "",
    availability: [
      {
        day: "Friday",
        dayLabelId: "Jumat",
        startTime: "14:00",
        endTime: "17:00",
      },
      {
        day: "Saturday",
        dayLabelId: "Sabtu",
        startTime: "10:00",
        endTime: "15:00",
      },
    ],
  },
  {
    id: "nindi",
    displayName: "Ukhtina D Anindita M.Psi., Psikolog",
    role: "Psychologist",
    shortBio: "Psikolog FlourishCare untuk konsultasi kebutuhan anak, parenting, dan perkembangan.",
    photo: "https://i.imgur.com/qsTUKqw.jpeg",
    whatsappContact: "",
    availability: [
      {
        day: "Wednesday",
        dayLabelId: "Rabu",
        startTime: "13:00",
        endTime: "16:00",
      },
      {
        day: "Thursday",
        dayLabelId: "Kamis",
        startTime: "14:00",
        endTime: "16:00",
      },
    ],
  },
];

export const DEFAULT_SERVICE: Service = {
  serviceId: "psychologist_consultation",
  name: "Konsultasi Psikolog",
  description: "Sesi konsultasi bersama psikolog FlourishCare untuk memahami kebutuhan anak, emosi, perilaku, tumbuh kembang, kesiapan sekolah, atau kebutuhan parenting.",
  durationMinutes: 60,
  sessionStructure: "50 menit konsultasi + 10 menit rangkuman dan arahan awal.",
  defaultPrice: 250000,
  currency: "IDR",
};
