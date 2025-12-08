/**
 * public/images/gallery 폴더의 이미지를 자동으로 로드합니다.
 * 썸네일: /images/gallery/thumb/1.jpg (작은 크기)
 * 원본: /images/gallery/1.jpg (큰 크기)
 */
export interface GalleryImage {
  thumbnail: string; // 썸네일 경로
  original: string;  // 원본 경로
  index: number;     // 이미지 번호
}

export const loadGalleryImages = async (maxCount: number = 100): Promise<GalleryImage[]> => {
  // 이미지 로드 성공 여부를 확인하는 함수
  const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      // 타임아웃 설정 (3초)
      setTimeout(() => resolve(false), 3000);
      img.src = url;
    });
  };

  // 1부터 maxCount까지 병렬로 확인
  const checkPromises = Array.from({ length: maxCount }, (_, i) => {
    const num = i + 1;
    const thumbnailPath = `/images/gallery/thumb/${num}.jpg`;
    const originalPath = `/images/gallery/${num}.jpg`;
    
    // 썸네일과 원본 모두 존재하는지 확인
    return Promise.all([
      checkImageExists(thumbnailPath),
      checkImageExists(originalPath)
    ]).then(([thumbExists, originalExists]) => ({
      num,
      thumbExists,
      originalExists,
      thumbnailPath,
      originalPath
    }));
  });

  const results = await Promise.all(checkPromises);
  
  // 썸네일과 원본이 모두 존재하는 이미지만 필터링하고 숫자 순서로 정렬
  const images = results
    .filter(result => result.thumbExists && result.originalExists)
    .sort((a, b) => a.num - b.num)
    .map(result => ({
      thumbnail: result.thumbnailPath,
      original: result.originalPath,
      index: result.num
    }));

  return images;
};

