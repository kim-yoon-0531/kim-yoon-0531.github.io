import { useState, useEffect } from 'react';
import { loadGalleryImages, type GalleryImage } from '../utils/galleryLoader';
import './Gallery.css';

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      const images = await loadGalleryImages(100);
      setGallery(images);
      setIsLoading(false);
    };
    loadImages();
  }, []);

  if (isLoading) {
    return (
      <section className="gallery">
        <div className="gallery-content">
          <h2 className="gallery-title">갤러리</h2>
          <div className="gallery-loading">이미지를 불러오는 중...</div>
        </div>
      </section>
    );
  }

  if (gallery.length === 0) return null;

  const openModal = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const goToPrevious = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length);
    }
  };

  const goToNext = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % gallery.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedIndex === null) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious(e);
    } else if (e.key === 'ArrowRight') {
      goToNext(e);
    }
  };

  return (
    <>
      <section className="gallery">
        <div className="gallery-content">
          <h2 className="gallery-title">갤러리</h2>
          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <div
                key={image.index}
                className="gallery-item"
                onClick={() => openModal(index)}
              >
                <img
                  src={image.thumbnail}
                  alt={`갤러리 ${image.index}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <div
          className="gallery-modal"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            className="gallery-modal-close"
            onClick={closeModal}
            aria-label="닫기"
          >
            ×
          </button>
          <button
            className="gallery-modal-nav gallery-modal-prev"
            onClick={goToPrevious}
            aria-label="이전 사진"
          >
            ‹
          </button>
          <button
            className="gallery-modal-nav gallery-modal-next"
            onClick={goToNext}
            aria-label="다음 사진"
          >
            ›
          </button>
          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[selectedIndex].original}
              alt={`갤러리 ${gallery[selectedIndex].index}`}
              className="gallery-modal-image"
            />
            <div className="gallery-modal-counter">
              {selectedIndex + 1} / {gallery.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;

