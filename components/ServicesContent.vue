<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const services = [
  {
    title: 'Professzionális<br>Hang- és fénytechnika',
    description:
      'A buli korlátlan ideig tarthat, nem kell a hangerő miatt aggódnod!',
    iconUrl: '/img/icons/sound-light.svg',
  },
  {
    title: 'Sütés-főzés',
    description:
      'Szeretnétek közösen grillezni, bográcsozni főzni? Mi biztosítjuk a lehetőséget.',
    iconUrl: '/img/icons/grill.svg',
  },
  {
    title: 'Catering',
    description:
      'Teljes körű étel-ital kiszolgálás és helyszíndekoráció, ha nem szeretnél semmivel bajlódni.',
    iconUrl: '/img/icons/catering.svg',
  },
  {
    title: 'Kifogyhatatlan bárpult',
    description: 'A hangulat nálunk nem csak garantált, hanem felejthetetlen!',
    iconUrl: '/img/icons/bar.svg',
  },
  {
    title: 'Lazulós pillanatok',
    description: 'Vízipipa sarok a kikapcsolódáshoz.',
    iconUrl: '/img/icons/hookah.svg',
  },
  {
    title: 'Játszótér',
    description:
      'A kicsik sem fognak unatkozni - biztonságos, vidám játszótér várja őket.',
    iconUrl: '/img/icons/playground.svg',
  },
  {
    title: 'Szállás',
    description: 'Egyelőre 4 fő részére biztosítunk kényelmes pihenőhelyet.',
    iconUrl: '/img/icons/accommodation.svg',
  },
  {
    title: 'Személyszállítás',
    description:
      'Rugalmas transzfer szolgáltatás, hogy mindenki biztonságban hazaérjen.',
    iconUrl: '/img/icons/transfer.svg',
  },
  {
    title: 'Szervezési támogatás',
    description:
      'Igény esetén segítünk a rendezvény vizuális világának kialakításában. Fotó, videó, zene, dekoráció, bízd csak ránk!',
    iconUrl: '/img/icons/event-support.svg',
  },
]


const serviceCards = ref([])


const visibleItems = ref(Array(services.length).fill(false))


let observer = null


onMounted(() => {

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
  
          const index = serviceCards.value.findIndex(
            (card) => card === entry.target
          )
          if (index !== -1) {
   
            setTimeout(() => {
              visibleItems.value[index] = true
            }, 100)

          
            observer.unobserve(entry.target)
          }
        }
      })
    },
    {
      threshold: 0.1, 
      rootMargin: '0px 0px -50px 0px', 
    }
  )


  setTimeout(() => {
    if (serviceCards.value.length) {
      serviceCards.value.forEach((card) => {
        observer.observe(card)
      })
    }
  }, 100)
})


onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>
<template>
  <section class="services" id="services">
    <div class="services__container">
      <h2 class="services__title">Szolgáltatásaink</h2>
      <p class="services__subtitle">
        Mindent egy helyen – Nálunk tényleg minden adott egy tökéletes
        eseményhez:
      </p>

      <div class="services__grid">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="services__card"
          ref="serviceCards"
          :style="{
            animationDelay: `${index * 100}ms`,
            animationName: visibleItems[index] ? 'fadeInUp' : 'none',
            animationDuration: '0.6s',
            animationFillMode: 'both',
            opacity: visibleItems[index] ? 1 : 0,
          }"
        >
          <div class="services__icon-wrapper">
            <img
              :src="service.iconUrl"
              :alt="`${service.title} ikon`"
              class="services__icon"
            />
          </div>
          <div class="services__content">
            <h3 class="services__card-title" v-html="service.title"></h3>
            <p class="services__card-text">{{ service.description }}</p>
          </div>
        </div>
      </div>

      <div class="services__action">
        <a href="#all-services" class="services__button">Összes szolgáltatás</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss">

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
