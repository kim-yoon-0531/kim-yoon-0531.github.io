export interface AccountInfo {
  name: string;
  relation: string;
  bank: string;
  account: string;
}

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
  date: string;
  time: string;
  dayOfWeek: string;
}

export interface Venue {
  name: string;
  address: string;
  detailAddress?: string;
  mapUrl?: string;
  latitude?: number;
  longitude?: number;
}

export interface MapInfo {
  link: string;
  icon: string;
  name: string;
}

export interface WeddingData {
  couple: CoupleInfo;
  date: WeddingDate;
  venue: Venue;
  gallery?: string[];
  message?: string;
  accounts?: {
    groom: AccountInfo[];
    bride: AccountInfo[];
  };
  maps?: {
    tmap: MapInfo;
    kakao: MapInfo;
    naver: MapInfo;
  };
}
