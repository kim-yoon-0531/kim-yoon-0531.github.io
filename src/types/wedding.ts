export interface CoupleInfo {
  groom: {
    name: string;
    nameEn?: string;
    parents?: string;
    phone?: string;
  };
  bride: {
    name: string;
    nameEn?: string;
    parents?: string;
    phone?: string;
  };
}

export interface WeddingDate {
  date: string; // YYYY.MM.DD
  time: string; // HH:MM
  dayOfWeek: string; // 요일
}

export interface Venue {
  name: string;
  address: string;
  detailAddress?: string;
  mapUrl?: string;
  latitude?: number;
  longitude?: number;
}

export interface WeddingData {
  couple: CoupleInfo;
  date: WeddingDate;
  venue: Venue;
  gallery?: string[];
  message?: string;
}


