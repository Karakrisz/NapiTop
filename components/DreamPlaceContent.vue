<script setup>
import { ref, onMounted } from 'vue'

// Események adatai
const events = [
  {
    title: 'Esküvő / lagzi',
    icon: '/img/icons/wedding.svg',
  },
  {
    title: 'Családi esemény',
    icon: '/img/icons/family.svg',
  },
  {
    title: 'Céges buli',
    icon: '/img/icons/corporate.svg',
  },
  {
    title: 'Baráti összejövetel',
    icon: '/img/icons/friends.svg',
  },
]

// Kliens oldali renderelés ellenőrzése
const isClient = ref(false)
const inView = ref(false)

// Komponens betöltése után
onMounted(() => {
  // Beállítjuk, hogy kliens oldalon vagyunk
  isClient.value = true
  
  // IntersectionObserver használata a szekcióhoz
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      inView.value = true
      observer.disconnect()
    }
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  })
  
  // A teljes szekció megfigyelése
  const section = document.getElementById('dream-place')
  if (section) {
    observer.observe(section)
  }
})
</script>

<template>
  <section class="dream" id="dream-place">
    <div class="dream__container">
      <h2
        class="dream__title"
        :class="{ 'is-animated': isClient, 'in-view': isClient && inView }"
      >
        EGY HELY, AHOL AZ ÁLOM VALÓRA VÁLIK
      </h2>

      <div
        class="dream__description"
        :class="{ 'is-animated': isClient, 'in-view': isClient && inView }"
      >
        <p class="dream__text">
          A Parti-birtok tökéletes helyszín esküvők, családi események, céges
          bulik vagy baráti összejövetelek lebonyolítására. Segítünk minden
          lépésnél – legyen szó dekorációról, cateringről vagy a zenéről.
        </p>
        <p class="dream__text">
          Akár hagyományos, akár formabontó eseményt tervezel, nálunk megtalálod
          a hozzá illő környezetet.
        </p>
      </div>

      <div class="dream__events">
        <div
          v-for="(event, index) in events"
          :key="event.title"
          class="dream__event-item"
          :class="{ 'is-animated': isClient, 'in-view': isClient && inView }"
          :style="isClient && inView ? { transitionDelay: `${index * 100 + 300}ms` } : {}"
        >
          <div class="dream__event-icon-wrapper">
            <img
              :src="event.icon"
              :alt="`${event.title} ikon`"
              class="dream__event-icon"
            />
          </div>
          <h3 class="dream__event-title">{{ event.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.dream {
  /* Alapállapot minden elemhez */
  &__title,
  &__description,
  &__event-item {
    opacity: 1; /* Alapértelmezetten látható a keresőmotorok számára */
    transform: translateY(0);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  /* Címsor animáció kliens oldalon */
  &__title.is-animated {
    &:not(.in-view) {
      opacity: 0;
      transform: translateY(30px);
    }
    
    &.in-view {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 100ms;
    }
  }
  
  /* Leírás animáció kliens oldalon */
  &__description.is-animated {
    &:not(.in-view) {
      opacity: 0;
      transform: translateY(30px);
    }
    
    &.in-view {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 300ms;
    }
  }
  
  /* Esemény elemek animáció kliens oldalon */
  &__event-item.is-animated {
    &:not(.in-view) {
      opacity: 0;
      transform: translateY(30px);
    }
    
    &.in-view {
      opacity: 1;
      transform: translateY(0);
      /* Az egyedi késleltetést a v-for ciklusban állítjuk be inline style-lal */
    }
  }
}
</style>