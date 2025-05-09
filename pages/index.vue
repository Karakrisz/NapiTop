<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const slides = ref([
  {
    title: 'PARTI BIRTOK RENDEZVÉNYHÁZ',
    subtitle: 'Egy hely, ahol bármikor és bárhmeddig bulizhatsz',
    description: 'Modern, klimatizált rendezvényházunk Makó és Rákos között, csendes környezetben várja vendégeit. 75 fős befogadóképesség, hangtechnika, catering, szállás és még sok más – minden adott egy emlékezetes eseményhez.',
    ctaText: 'Foglalj időpontot még ma!',
    ctaButtonText: 'Időpontfoglalás',
    ctaLink: '#booking',
    imageUrl: '/img/slide/slide.webp',
    imageAlt: 'Parti Birtok Rendezvényház - Elegáns rendezvényterem terített asztalokkal'
  },
  {
    title: 'ESKÜVŐK & CSALÁDI RENDEZVÉNYEK',
    subtitle: 'Tökéletes helyszín az élet fontos pillanataihoz',
    description: 'Különleges környezetben teremtünk feledhetetlen élményt a nagy napra. Egyedi dekorációs lehetőségek, professzionális hangosítás és letisztult elegancia várja az ifjú párt és a vendégeket a Parti Birtok Rendezvényházban.',
    ctaText: 'Lásd az esküvői csomagajánlatainkat!',
    ctaButtonText: 'Ajánlatkérés',
    ctaLink: '#wedding-packages',
    imageUrl: '/img/slide/slide.webp',
    imageAlt: 'Parti Birtok Rendezvényház - Esküvői helyszín'
  },
  {
    title: 'CÉGES ESEMÉNYEK & TRÉNINGEK',
    subtitle: 'Inspiráló környezet a sikeres üzleti találkozókhoz',
    description: 'Tárgyalók, nagy előadótér és nyugodt, zöld környezet segít a produktív munkában. A modern technikai felszereltség és rugalmas térrendezés minden üzleti igényt kielégít. Fedezze fel üzleti csomagjainkat!',
    ctaText: 'Tökéletes helyszín az üzleti sikereinek!',
    ctaButtonText: 'Céges ajánlatok',
    ctaLink: '#business-events',
    imageUrl: '/img/slide/slide.webp',
    imageAlt: 'Parti Birtok Rendezvényház - Céges esemény helyszín'
  },
  {
    title: 'GASZTRONÓMIAI ÉLMÉNYEK',
    subtitle: 'Ízek és kényeztetés minden alkalomra',
    description: 'Egyedi, minőségi alapanyagokból készült catering kínálatunk mindenki számára tartogat különlegességeket. A tradicionális magyar ízektől a nemzetközi fogásokig, minden igényt kielégítünk. Diétás és vegetáriánus opciók is elérhetőek.',
    ctaText: 'Kóstold meg különleges menüsorainkat!',
    ctaButtonText: 'Catering ajánlatok',
    ctaLink: '#catering',
    imageUrl: '/img/slide/slide.webp',
    imageAlt: 'Parti Birtok Rendezvényház - Gasztronómiai kínálat'
  },
  {
    title: 'SZÁLLÁS & PIHENÉS',
    subtitle: 'Kényelmes szálláslehetőségek a helyszínen',
    description: 'Rendezvénye után nem kell sietnie! Elegáns, légkondicionált szobáink tökéletes pihenést biztosítanak a helyszínen. A rendezvény résztvevői kedvezményes áron vehetik igénybe szálláskínálatunkat.',
    ctaText: 'Biztosítsa a tökéletes pihenést is!',
    ctaButtonText: 'Szállásajánlatok',
    ctaLink: '#accommodation',
    imageUrl: '/img/slide/slide.webp',
    imageAlt: 'Parti Birtok Rendezvényház - Szállás lehetőségek'
  }
]);

const currentSlide = ref(0);
const autoplayInterval = ref(null);
const autoplayDelay = 5000; 
const sliderTrack = ref(null);

// Az alap számított stílus csak inicializáláskor lesz használva,
// a mozgást a drag események közvetlenül kezelik
const sliderStyle = computed(() => {
  return {
    transform: `translateX(-${currentSlide.value * 20}%)`,
    cursor: 'grab'
  };
});

function goToSlide(index) {
  currentSlide.value = index;
  resetAutoplay();
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
}

function resetAutoplay() {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
  }
  
  autoplayInterval.value = setInterval(nextSlide, autoplayDelay);
}

// Touch és egér változók
let touchStartX = 0;
let touchEndX = 0;
let mouseStartX = 0;
let mouseEndX = 0;
let isDragging = false;
let dragThreshold = 50; // Minimum távolság a váltáshoz

// Touch eseménykezelők
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchMove(e) {
  if (touchStartX) {
    const currentX = e.changedTouches[0].screenX;
    const diff = touchStartX - currentX;
    
    // Csak ha nagyobb a különbség, mint a threshold egy része
    if (Math.abs(diff) > dragThreshold / 3) {
      // Átmenetileg mozgatjuk a slider-t érintésre
      const movePercent = (diff / window.innerWidth) * 100;
      const currentPosition = currentSlide.value * 20;
      const newPosition = Math.max(0, Math.min(80, currentPosition + movePercent));
      
      sliderTrack.value.style.transform = `translateX(-${newPosition}%)`;
      sliderTrack.value.style.transition = 'transform 0.1s ease-out';
    }
  }
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe('touch');
  
  // Visszaállítjuk a transition időt
  if (sliderTrack.value) {
    sliderTrack.value.style.transition = 'transform 0.4s ease-in-out';
  }
}

// Egér eseménykezelők
function handleMouseDown(e) {
  e.preventDefault();
  isDragging = true;
  mouseStartX = e.clientX;
  
  // Kurzor stílus módosítása húzásnál
  if (sliderTrack.value) {
    sliderTrack.value.style.cursor = 'grabbing';
  }
}

function handleMouseMove(e) {
  if (isDragging && mouseStartX) {
    const currentX = e.clientX;
    const diff = mouseStartX - currentX;
    
    // Csak akkor mozgatjuk, ha elég nagy a különbség
    if (Math.abs(diff) > dragThreshold / 3) {
      // Átmenetileg mozgatjuk a slider-t húzásra
      const movePercent = (diff / window.innerWidth) * 100;
      const currentPosition = currentSlide.value * 20;
      const newPosition = Math.max(0, Math.min(80, currentPosition + movePercent));
      
      sliderTrack.value.style.transform = `translateX(-${newPosition}%)`;
      sliderTrack.value.style.transition = 'transform 0.1s ease-out';
    }
  }
}

function handleMouseUp(e) {
  if (isDragging) {
    mouseEndX = e.clientX;
    handleSwipe('mouse');
    isDragging = false;
    
    // Visszaállítjuk a kurzor stílust és transition időt
    if (sliderTrack.value) {
      sliderTrack.value.style.cursor = 'grab';
      sliderTrack.value.style.transition = 'transform 0.4s ease-in-out';
    }
  }
}

function handleMouseLeave(e) {
  if (isDragging) {
    mouseEndX = e.clientX;
    handleSwipe('mouse');
    isDragging = false;
    
    // Visszaállítjuk a kurzor stílust és transition időt
    if (sliderTrack.value) {
      sliderTrack.value.style.cursor = 'grab';
      sliderTrack.value.style.transition = 'transform 0.4s ease-in-out';
    }
  }
}

function handleSwipe(type = 'touch') {
  const startX = type === 'touch' ? touchStartX : mouseStartX;
  const endX = type === 'touch' ? touchEndX : mouseEndX;
  const minSwipeDistance = dragThreshold;
  
  if (endX < startX - minSwipeDistance) {
    // Balra swipe = következő slide
    nextSlide();
    resetAutoplay();
  } else if (endX > startX + minSwipeDistance) {
    // Jobbra swipe = előző slide
    currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
    resetAutoplay();
  } else {
    // Ha nem volt elég a swipe, visszaugrunk az eredeti pozícióra
    if (sliderTrack.value) {
      sliderTrack.value.style.transform = `translateX(-${currentSlide.value * 20}%)`;
    }
  }
  
  // Reseteljük a kezdő/vég pozíciókat
  if (type === 'touch') {
    touchStartX = 0;
    touchEndX = 0;
  } else {
    mouseStartX = 0;
    mouseEndX = 0;
  }
}

onMounted(() => {
  autoplayInterval.value = setInterval(nextSlide, autoplayDelay);
  
  if (sliderTrack.value) {
    // Touch események
    sliderTrack.value.addEventListener('touchstart', handleTouchStart, { passive: true });
    sliderTrack.value.addEventListener('touchmove', handleTouchMove, { passive: true });
    sliderTrack.value.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Egér események
    sliderTrack.value.addEventListener('mousedown', handleMouseDown);
    sliderTrack.value.addEventListener('mousemove', handleMouseMove);
    sliderTrack.value.addEventListener('mouseup', handleMouseUp);
    sliderTrack.value.addEventListener('mouseleave', handleMouseLeave);
    
    // Alapértelmezett kurzor stílus
    sliderTrack.value.style.cursor = 'grab';
    // Transition kezdetben
    sliderTrack.value.style.transition = 'transform 0.4s ease-in-out';
  }
  
  // Preload a következő képekre
  for (let i = 1; i < slides.value.length; i++) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = slides.value[i].imageUrl;
    document.head.appendChild(link);
  }
  
  // Megakadályozzuk az alapértelmezett drag működést a képeken
  const images = document.querySelectorAll('.hero__image');
  images.forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });
});

onUnmounted(() => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
  }
  
  if (sliderTrack.value) {
    // Touch események eltávolítása
    sliderTrack.value.removeEventListener('touchstart', handleTouchStart);
    sliderTrack.value.removeEventListener('touchmove', handleTouchMove);
    sliderTrack.value.removeEventListener('touchend', handleTouchEnd);
    
    // Egér események eltávolítása
    sliderTrack.value.removeEventListener('mousedown', handleMouseDown);
    sliderTrack.value.removeEventListener('mousemove', handleMouseMove);
    sliderTrack.value.removeEventListener('mouseup', handleMouseUp);
    sliderTrack.value.removeEventListener('mouseleave', handleMouseLeave);
  }
});
</script>

<template>
  <section class="hero">
    <div class="hero__slider">
      <div class="hero__slider-track" ref="sliderTrack" :style="sliderStyle">
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="hero__slide"
        >
          <div class="hero__slide-content">
            <h1 class="hero__title">{{ slide.title }}</h1>
            <p class="hero__subtitle">{{ slide.subtitle }}</p>
            <div class="hero__description">
              <p>{{ slide.description }}</p>
            </div>
            <div class="hero__cta">
              <p class="hero__cta-text">{{ slide.ctaText }}</p>
              <a :href="slide.ctaLink" class="hero__button">{{ slide.ctaButtonText }}</a>
            </div>
          </div>
          <div class="hero__image-container">
            <img :src="slide.imageUrl" :alt="slide.imageAlt" class="hero__image">
          </div>
        </div>
      </div>
      
      <div class="hero__navigation">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          :aria-label="`Slide ${index + 1}`"
          class="hero__nav-dot" 
          :class="{ 'hero__nav-dot--active': currentSlide === index }"
          @click="goToSlide(index)"
        ></button>
      </div>
    </div>
  </section>
</template>