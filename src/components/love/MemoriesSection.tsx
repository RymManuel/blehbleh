import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Camera, Grid3X3, Play, Pause, ChevronLeft, ChevronRight, X, Heart, ZoomIn, Maximize2, Filter } from 'lucide-react';
import { PHOTOS } from './data';

type ViewMode = 'grid' | 'slideshow' | 'albums';

interface PhotoAlbum {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
  coverPhoto: typeof PHOTOS[0];
}

const MemoriesSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('albums');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

  // Create albums from photos
  const albums = useMemo<PhotoAlbum[]>(() => {
    const albumGroups: { [key: string]: typeof PHOTOS } = {
      beginning: [],
      falling: [],
      holiday: [],
      renewal: [],
      summer: [],
      forever: [],
    };

    PHOTOS.forEach((photo, index) => {
      const ratio = index / PHOTOS.length;
      if (ratio < 0.18) albumGroups.beginning.push(photo);
      else if (ratio < 0.35) albumGroups.falling.push(photo);
      else if (ratio < 0.52) albumGroups.holiday.push(photo);
      else if (ratio < 0.69) albumGroups.renewal.push(photo);
      else if (ratio < 0.85) albumGroups.summer.push(photo);
      else albumGroups.forever.push(photo);
    });

    return [
      {
        id: 'beginning',
        name: 'Chapter One',
        description: 'Where our story began,',
        color: 'from-rose-400 to-pink-500',
        count: albumGroups.beginning.length,
        coverPhoto: albumGroups.beginning[0] || PHOTOS[0],
      },
      {
        id: 'falling',
        name: 'Chapter Two',
        description: 'love grew deeper,',
        color: 'from-orange-400 to-red-500',
        count: albumGroups.falling.length,
        coverPhoto: albumGroups.falling[0] || PHOTOS[Math.floor(PHOTOS.length * 0.25)],
      },
      {
        id: 'holiday',
        name: 'Chapter Three',
        description: 'we celebrated our love,',
        color: 'from-red-400 to-rose-500',
        count: albumGroups.holiday.length,
        coverPhoto: albumGroups.holiday[0] || PHOTOS[Math.floor(PHOTOS.length * 0.4)],
      },
      {
        id: 'renewal',
        name: 'Chapter Four',
        description: 'we grew stronger together,',
        color: 'from-green-400 to-emerald-500',
        count: albumGroups.renewal.length,
        coverPhoto: albumGroups.renewal[0] || PHOTOS[Math.floor(PHOTOS.length * 0.55)],
      },
      {
        id: 'summer',
        name: 'Chapter Five',
        description: 'creating beautiful moments,',
        color: 'from-yellow-400 to-orange-500',
        count: albumGroups.summer.length,
        coverPhoto: albumGroups.summer[0] || PHOTOS[Math.floor(PHOTOS.length * 0.7)],
      },
      {
        id: 'forever',
        name: 'Our Forever',
        description: 'and our love story continues forever.',
        color: 'from-purple-400 to-pink-500',
        count: albumGroups.forever.length,
        coverPhoto: albumGroups.forever[0] || PHOTOS[PHOTOS.length - 1],
      },
    ];
  }, []);

  const getAlbumPhotos = (albumId: string) => {
    const albumIndex = albums.findIndex((a) => a.id === albumId);
    if (albumIndex === -1) return [];

    const ratio = albumIndex / albums.length;
    const nextRatio = (albumIndex + 1) / albums.length;

    return PHOTOS.filter((_, index) => {
      const photoRatio = index / PHOTOS.length;
      if (albumIndex === 0) return photoRatio < 0.18;
      else if (albumIndex === 1) return photoRatio >= 0.18 && photoRatio < 0.35;
      else if (albumIndex === 2) return photoRatio >= 0.35 && photoRatio < 0.52;
      else if (albumIndex === 3) return photoRatio >= 0.52 && photoRatio < 0.69;
      else if (albumIndex === 4) return photoRatio >= 0.69 && photoRatio < 0.85;
      else return photoRatio >= 0.85;
    });
  };

  const displayPhotos = selectedAlbum ? getAlbumPhotos(selectedAlbum) : PHOTOS;

  // Slideshow auto-play
  useEffect(() => {
    if (!isPlaying || viewMode !== 'slideshow') return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % displayPhotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, viewMode, displayPhotos]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % displayPhotos.length);
  }, [displayPhotos]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + displayPhotos.length) % displayPhotos.length);
  }, [displayPhotos]);

  const openLightbox = (index: number) => {
    // Calculate the actual photo index in the full PHOTOS array
    let actualIndex = index;
    if (selectedAlbum) {
      const albumPhotos = getAlbumPhotos(selectedAlbum);
      if (index < albumPhotos.length) {
        actualIndex = PHOTOS.findIndex(p => p.id === albumPhotos[index].id);
      }
    }
    setLightboxIndex(actualIndex);
    setLightboxOpen(true);
  };

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Touch swipe for lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        if (lightboxOpen) setLightboxIndex(prev => (prev + 1) % displayPhotos.length);
        else nextSlide();
      } else {
        if (lightboxOpen) setLightboxIndex(prev => (prev - 1 + displayPhotos.length) % displayPhotos.length);
        else prevSlide();
      }
    }
    setTouchStart(null);
  };

  return (
    <section id="memories" className="py-16 md:py-24 bg-rose-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm mb-4">
            <Camera className="w-4 h-4" />
            <span>Our Memories</span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-rose-900 mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Our Memories
          </h2>
          <p className="text-rose-600/70 max-w-md mx-auto">
            Every moment captured is a memory we'll cherish forever. Browse through the beautiful memories we've shared.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          <button
            onClick={() => { setViewMode('albums'); setIsPlaying(false); setSelectedAlbum(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              viewMode === 'albums'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                : 'bg-white text-rose-500 hover:bg-rose-50 shadow-md'
            }`}
          >
            <Filter className="w-4 h-4" />
            Albums
          </button>
          <button
            onClick={() => { setViewMode('grid'); setIsPlaying(false); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                : 'bg-white text-rose-500 hover:bg-rose-50 shadow-md'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            Gallery
          </button>
          <button
            onClick={() => setViewMode('slideshow')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              viewMode === 'slideshow'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                : 'bg-white text-rose-500 hover:bg-rose-50 shadow-md'
            }`}
          >
            <Play className="w-4 h-4" />
            Slideshow
          </button>
        </div>

        {/* Albums View */}
        {viewMode === 'albums' && !selectedAlbum && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album, index) => (
              <div
                key={album.id}
                className="group cursor-pointer"
                onClick={() => setSelectedAlbum(album.id)}
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <img
                    src={album.coverPhoto.src}
                    alt={album.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 group-hover:from-black/20`} />
                  
                  {/* Album Info */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3" style={{ fontFamily: "'Great Vibes', cursive" }}>{album.description}</p>
                    <span className="inline-flex items-center gap-1 text-white/70 text-sm">
                      📷 {album.count} {album.count === 1 ? 'photo' : 'photos'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Album Grid View */}
        {viewMode === 'albums' && selectedAlbum && (
          <>
            <button
              onClick={() => setSelectedAlbum(null)}
              className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white text-rose-500 hover:bg-rose-50 shadow-md transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Albums
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {displayPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                  onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`,
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">{photo.caption}</p>
                  </div>

                  {/* Like button */}
                  <button
                    onClick={(e) => toggleLike(photo.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40"
                  >
                    <Heart
                      className={`w-4 h-4 transition-all ${
                        likedPhotos.has(photo.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-white'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {displayPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                onClick={() => openLightbox(index)}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`,
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{photo.caption}</p>
                </div>

                {/* Like button */}
                <button
                  onClick={(e) => toggleLike(photo.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40"
                >
                  <Heart
                    className={`w-4 h-4 transition-all ${
                      likedPhotos.has(photo.id)
                        ? 'text-rose-500 fill-rose-500 scale-110'
                        : 'text-white'
                    }`}
                  />
                </button>

                {/* Zoom icon */}
                <div className="absolute top-3 left-3 p-2 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Slideshow View */}
        {viewMode === 'slideshow' && (
          <div
            className="relative max-w-3xl mx-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              {displayPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentSlide
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              ))}

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                <p
                  className="text-white text-2xl md:text-3xl mb-2"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {displayPhotos[currentSlide].caption}
                </p>
                <p className="text-white/70 text-sm">{displayPhotos[currentSlide].date}</p>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-600 transition-all"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={() => openLightbox(currentSlide)}
                className="p-2.5 rounded-full bg-white text-rose-500 shadow-lg hover:bg-rose-50 transition-all"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
              {displayPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 h-2.5 bg-rose-500'
                      : 'w-2.5 h-2.5 bg-rose-300 hover:bg-rose-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Photo count */}
        <div className="text-center mt-8">
          <p className="text-rose-400 text-sm">
            {likedPhotos.size > 0 && (
              <span className="inline-flex items-center gap-1">
                <Heart className="w-3 h-3 fill-rose-400" /> {likedPhotos.size} favorited
              </span>
            )}
            {likedPhotos.size === 0 && 'Tap the heart to favorite your photos'}
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => (prev - 1 + displayPhotos.length) % displayPhotos.length); }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => (prev + 1) % displayPhotos.length); }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={displayPhotos[lightboxIndex].src}
              alt={displayPhotos[lightboxIndex].caption}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <p
                className="text-white text-xl md:text-2xl"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {displayPhotos[lightboxIndex].caption}
              </p>
              <p className="text-white/50 text-sm mt-1">
                {displayPhotos[lightboxIndex].date} &middot; {lightboxIndex + 1} of {displayPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default MemoriesSection;
