<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ContactContent from '~/components/ContactContent.vue'
import PartnersContent from '~/components/PartnersContent.vue'

const slides = ref([
  {
    title: 'PARTI BIRTOK RENDEZVÉNYHÁZ',
    subtitle: 'Egy hely, ahol bármikor és bárhmeddig bulizhatsz',
    description:
      'Modern, klimatizált rendezvényházunk Makó és Rákos között, csendes környezetben várja vendégeit. 75 fős +30 fő terasz befogadóképesség, hangtechnika, catering, szállás és még sok más – minden adott egy emlékezetes eseményhez.',
    ctaText: 'Foglalj időpontot még ma!',
    ctaButtonText: 'Időpontfoglalás',
    ctaLink: 'ajanlatkeres',
    imageUrl: '/img/slide/slide.webp',
    imageAlt:
      'Parti Birtok Rendezvényház - Elegáns rendezvényterem terített asztalokkal',
  },
  {
    title: 'ESKÜVŐK & CSALÁDI RENDEZVÉNYEK',
    subtitle: 'Tökéletes helyszín az élet fontos pillanataihoz',
    description:
      'Különleges környezetben teremtünk feledhetetlen élményt a nagy napra. Egyedi dekorációs lehetőségek, professzionális hangosítás és letisztult elegancia várja az ifjú párt és a vendégeket a Parti Birtok Rendezvényházban.',
    ctaText: 'Lásd az esküvői csomagajánlatainkat!',
    ctaButtonText: 'Ajánlatkérés',
    ctaLink: 'ajanlatkeres',
    imageUrl: '/img/slide/slide.webp',
    imageAlt: 'Parti Birtok Rendezvényház - Esküvői helyszín',
  },
  {
    title: 'CÉGES ESEMÉNYEK & TRÉNINGEK',
    subtitle: 'Inspiráló környezet a sikeres üzleti találkozókhoz',
    description:
      'Nagy előadótér és nyugodt, zöld környezet segít a produktív munkában. A modern technikai felszereltség és rugalmas térrendezés minden üzleti igényt kielégít. Fedezze fel üzleti csomagjainkat!',
    ctaText: 'Tökéletes helyszín az üzleti sikereinek!',
    ctaButtonText: 'Céges ajánlatok',
    ctaLink: 'ajanlatkeres',
    imageUrl: '/img/slide/slide.webp',
    imageAlt: 'Parti Birtok Rendezvényház - Céges esemény helyszín',
  },
  {
    title: 'GASZTRONÓMIAI ÉLMÉNYEK',
    subtitle: 'Ízek és kényeztetés minden alkalomra',
    description:
      'Egyedi, minőségi alapanyagokból készült catering kínálatunk mindenki számára tartogat különlegességeket. A tradicionális magyar ízektől a nemzetközi fogásokig, minden igényt kielégítünk.',
    ctaText: 'Kóstold meg különleges menüsorainkat!',
    ctaButtonText: 'Catering ajánlatok',
    ctaLink: 'ajanlatkeres',
    imageUrl: '/img/slide/slide.webp',
    imageAlt: 'Parti Birtok Rendezvényház - Gasztronómiai kínálat',
  },
  {
    title: 'SZÁLLÁS & PIHENÉS',
    subtitle: 'Kényelmes szálláslehetőségek a helyszínen',
    description:
      'Rendezvénye után nem kell sietnie! Elegáns, légkondicionált szobáink tökéletes pihenést biztosítanak a helyszínen. A rendezvény résztvevői kedvezményes áron vehetik igénybe szálláskínálatunkat.',
    ctaText: 'Biztosítsa a tökéletes pihenést is!',
    ctaButtonText: 'Szállásajánlatok',
    ctaLink: 'ajanlatkeres',
    imageUrl: '/img/slide/slide.webp',
    imageAlt: 'Parti Birtok Rendezvényház - Szállás lehetőségek',
  },
])

const currentSlide = ref(0)
const autoplayInterval = ref(null)
const autoplayDelay = 7000
const sliderTrack = ref(null)

const sliderStyle = computed(() => {
  return {
    transform: `translateX(-${currentSlide.value * 20}%)`,
    cursor: 'grab',
  }
})

function goToSlide(index) {
  currentSlide.value = index
  resetAutoplay()
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

function resetAutoplay() {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }

  autoplayInterval.value = setInterval(nextSlide, autoplayDelay)
}

let touchStartX = 0
let touchEndX = 0
let mouseStartX = 0
let mouseEndX = 0
let isDragging = false
let dragThreshold = 50

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX
}

function handleTouchMove(e) {
  if (touchStartX) {
    const currentX = e.changedTouches[0].screenX
    const diff = touchStartX - currentX

    if (Math.abs(diff) > dragThreshold / 3) {
      const movePercent = (diff / window.innerWidth) * 100
      const currentPosition = currentSlide.value * 20
      const newPosition = Math.max(
        0,
        Math.min(80, currentPosition + movePercent)
      )

      sliderTrack.value.style.transform = `translateX(-${newPosition}%)`
      sliderTrack.value.style.transition = 'transform 0.1s ease-out'
    }
  }
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe('touch')

  if (sliderTrack.value) {
    sliderTrack.value.style.transition = 'transform 0.4s ease-in-out'
  }
}

function handleMouseDown(e) {
  e.preventDefault()
  isDragging = true
  mouseStartX = e.clientX

  if (sliderTrack.value) {
    sliderTrack.value.style.cursor = 'grabbing'
  }
}

function handleMouseMove(e) {
  if (isDragging && mouseStartX) {
    const currentX = e.clientX
    const diff = mouseStartX - currentX

    if (Math.abs(diff) > dragThreshold / 3) {
      const movePercent = (diff / window.innerWidth) * 100
      const currentPosition = currentSlide.value * 20
      const newPosition = Math.max(
        0,
        Math.min(80, currentPosition + movePercent)
      )

      sliderTrack.value.style.transform = `translateX(-${newPosition}%)`
      sliderTrack.value.style.transition = 'transform 0.1s ease-out'
    }
  }
}

function handleMouseUp(e) {
  if (isDragging) {
    mouseEndX = e.clientX
    handleSwipe('mouse')
    isDragging = false

    if (sliderTrack.value) {
      sliderTrack.value.style.cursor = 'grab'
      sliderTrack.value.style.transition = 'transform 0.4s ease-in-out'
    }
  }
}

function handleMouseLeave(e) {
  if (isDragging) {
    mouseEndX = e.clientX
    handleSwipe('mouse')
    isDragging = false

    if (sliderTrack.value) {
      sliderTrack.value.style.cursor = 'grab'
      sliderTrack.value.style.transition = 'transform 0.4s ease-in-out'
    }
  }
}

function handleSwipe(type = 'touch') {
  const startX = type === 'touch' ? touchStartX : mouseStartX
  const endX = type === 'touch' ? touchEndX : mouseEndX
  const minSwipeDistance = dragThreshold

  if (endX < startX - minSwipeDistance) {
    nextSlide()
    resetAutoplay()
  } else if (endX > startX + minSwipeDistance) {
    currentSlide.value =
      (currentSlide.value - 1 + slides.value.length) % slides.value.length
    resetAutoplay()
  } else {
    if (sliderTrack.value) {
      sliderTrack.value.style.transform = `translateX(-${
        currentSlide.value * 20
      }%)`
    }
  }

  if (type === 'touch') {
    touchStartX = 0
    touchEndX = 0
  } else {
    mouseStartX = 0
    mouseEndX = 0
  }
}

onMounted(() => {
  autoplayInterval.value = setInterval(nextSlide, autoplayDelay)

  if (sliderTrack.value) {
    sliderTrack.value.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    })
    sliderTrack.value.addEventListener('touchmove', handleTouchMove, {
      passive: true,
    })
    sliderTrack.value.addEventListener('touchend', handleTouchEnd, {
      passive: true,
    })

    sliderTrack.value.addEventListener('mousedown', handleMouseDown)
    sliderTrack.value.addEventListener('mousemove', handleMouseMove)
    sliderTrack.value.addEventListener('mouseup', handleMouseUp)
    sliderTrack.value.addEventListener('mouseleave', handleMouseLeave)

    sliderTrack.value.style.cursor = 'grab'

    sliderTrack.value.style.transition = 'transform 0.4s ease-in-out'
  }

  for (let i = 1; i < slides.value.length; i++) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = slides.value[i].imageUrl
    document.head.appendChild(link)
  }

  const images = document.querySelectorAll('.hero__image')
  images.forEach((img) => {
    img.addEventListener('dragstart', (e) => e.preventDefault())
  })
})

onUnmounted(() => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }

  if (sliderTrack.value) {
    sliderTrack.value.removeEventListener('touchstart', handleTouchStart)
    sliderTrack.value.removeEventListener('touchmove', handleTouchMove)
    sliderTrack.value.removeEventListener('touchend', handleTouchEnd)

    sliderTrack.value.removeEventListener('mousedown', handleMouseDown)
    sliderTrack.value.removeEventListener('mousemove', handleMouseMove)
    sliderTrack.value.removeEventListener('mouseup', handleMouseUp)
    sliderTrack.value.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<template>
  <section class="hero">
    <div class="hero__slider">
      <div class="hero__slider-track" ref="sliderTrack" :style="sliderStyle">
        <div v-for="(slide, index) in slides" :key="index" class="hero__slide">
          <div class="hero__slide-content">
            <h1 class="hero__title">{{ slide.title }}</h1>
            <p class="hero__subtitle">{{ slide.subtitle }}</p>
            <div class="hero__description">
              <p>{{ slide.description }}</p>
            </div>
            <div class="hero__cta">
              <p class="hero__cta-text">{{ slide.ctaText }}</p>
              <a :href="slide.ctaLink" class="hero__button">{{
                slide.ctaButtonText
              }}</a>
            </div>
          </div>
          <div class="hero__image-container">
            <img
              :src="slide.imageUrl"
              :alt="slide.imageAlt"
              class="hero__image"
            />
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

  <ServicesContent />
  <GalleryContent />
  <AboutContent />
  <DreamPlaceContent />
  <ContactContent />
  <PartnersContent />
</template>
