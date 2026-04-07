import type { WeddingData } from '../types/wedding';

export const weddingData: WeddingData = {
  couple: {
    groom: {
      name: '김상선',
      nameEn: 'Sangseon Kim',
      parents: '김영배 · 양영심',
      phone: '010-0000-0000',
    },
    bride: {
      name: '윤슬기',
      nameEn: 'Seulgi Yoon',
      parents: '윤춘섭 · 고수희',
      phone: '010-0000-0000',
    },
  },
  date: {
    date: '2026.05.31',
    time: '12:20',
    dayOfWeek: '일요일',
  },
  venue: {
    name: '월드컵컨벤션 2F 임페리얼볼룸홀',
    address: '서울 마포구 월드컵로 240',
    detailAddress: '(성산동 서울월드컵경기장 서측)',
    mapUrl: 'https://naver.me/xLWAOSGG',
  },
  message: '소중한 분들을 초대합니다.\n저희 두 사람이 사랑으로 하나가 되어\n새로운 인생을 시작하려 합니다.\n귀한 걸음 하시어 축복해 주시면\n더없는 기쁨이겠습니다.',
  accounts: {
    groom: [
      { name: '김상선', relation: '신랑', bank: '신한은행', account: '110-327-208454' },
      { name: '김영배', relation: '신랑 아버지', bank: '신한은행', account: '110-310-165786' },
      { name: '양영심', relation: '신랑 어머니', bank: '하나은행', account: '411-092411-00107' },
    ],
    bride: [
      { name: '윤슬기', relation: '신부', bank: '국민은행', account: '204402-04-068330' },
      { name: '윤춘섭', relation: '신부 아버지', bank: '국민은행', account: '204402-04-006268' },
      { name: '고수희', relation: '신부 어머니', bank: '국민은행', account: '204401-04-028272' },
    ],
  },
  maps: {
    tmap:{link:'https://tmap.life/59880e3f',icon:'/images/location/icon_tmap.png' , name:'티맵'},
    kakao:{link:'https://place.map.kakao.com/17807520',icon:'/images/location/icon_kakao.png' , name:'카카오맵'},
    naver:{link:'https://naver.me/FdCXgk2F',icon:'/images/location/icon_naver.png', name:'네이버지도'}
  },
};
