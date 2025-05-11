<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

// Animáció állapotok
const titleVisible = ref(false)
const descriptionVisible = ref(false)
const eventItemsVisible = ref(false)

// Ref a szekcióhoz
const dreamSection = ref(null)

// IntersectionObserver
let observer = null

onMounted(() => {
  // Observer létrehozása
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]

      if (entry.isIntersecting) {
        // Animációk indítása sorban
        setTimeout(() => {
          titleVisible.value = true

          setTimeout(() => {
            descriptionVisible.value = true

            setTimeout(() => {
              eventItemsVisible.value = true
            }, 200)
          }, 200)
        }, 100)

        // Megfigyelés leállítása
        observer.unobserve(entry.target)
      }
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  // Kezdjük a megfigyelést
  if (dreamSection.value) {
    observer.observe(dreamSection.value)
  }
})

onUnmounted(() => {
  // Takarítás
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <section class="dream" id="dream-place" ref="dreamSection">
    <div class="dream__container">
      <h2
        class="dream__title"
        :class="{ 'dream__title--visible': titleVisible }"
      >
        EGY HELY, AHOL AZ ÁLOM VALÓRA VÁLIK
      </h2>

      <div
        class="dream__description"
        :class="{ 'dream__description--visible': descriptionVisible }"
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
          :class="{ 'dream__event-item--visible': eventItemsVisible }"
          :style="{ transitionDelay: `${index * 100 + 300}ms` }"
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
