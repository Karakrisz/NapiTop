<script setup>
import { ref, onMounted } from 'vue'

// Szolgáltatások adatmodellje
const services = [
  {
    title: 'Professzionális<br>Hang- és fénytechnika',
    description:
      'A buli korlátlan ideig tarthat, nem kell a hangerő miatt aggódnod!',
    iconUrl: '/img/services/hang.svg',
  },
  {
    title: 'Sütés-főzés',
    description:
      'Szeretnétek közösen grillezni, bográcsozni főzni? Mi biztosítjuk a lehetőséget.',
    iconUrl: '/img/services/sutes.svg',
  },
  {
    title: 'Catering',
    description:
      'Teljes körű étel-ital kiszolgálás és helyszíndekoráció, ha nem szeretnél semmivel bajlódni.',
    iconUrl: '/img/services/kerting.svg',
  },
  {
    title: 'Kifogyhatatlan bárpult',
    description: 'A hangulat nálunk nem csak garantált, hanem felejthetetlen!',
    iconUrl: '/img/services/barpult.svg',
  },
  {
    title: 'Lazulós pillanatok',
    description: 'Vízipipa sarok a kikapcsolódáshoz.',
    iconUrl: '/img/services/lazul.svg',
  },
  {
    title: 'Játszótér',
    description:
      'A kicsik sem fognak unatkozni - biztonságos, vidám játszótér várja őket.',
    iconUrl: '/img/services/jatszoter.svg',
  },
  {
    title: 'Szállás',
    description: 'Egyelőre 4 fő részére biztosítunk kényelmes pihenőhelyet.',
    iconUrl: '/img/services/szallas.svg',
  },
  {
    title: 'Személyszállítás',
    description:
      'Rugalmas transzfer szolgáltatás, hogy mindenki biztonságban hazaérjen.',
    iconUrl: '/img/services/szemelyszallitas.svg',
  },
  {
    title: 'Szervezési támogatás',
    description:
      'Igény esetén segítünk a rendezvény vizuális világának kialakításában. Fotó, videó, zene, dekoráció, bízd csak ránk!',
    iconUrl: '/img/services/szervezes.svg',
  },
]

// Kliens oldali renderelés ellenőrzése
const isClient = ref(false)
const inView = ref(false)

// Komponens betöltése után
onMounted(() => {
  // Csak kliens oldalon futtatjuk
  isClient.value = true

  // IntersectionObserver használata a szekcióhoz
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        inView.value = true
        observer.disconnect()
      }
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  // A teljes szekció megfigyelése
  const section = document.getElementById('services')
  if (section) {
    observer.observe(section)
  }

  return () => {
    if (observer) {
      observer.disconnect()
    }
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
          :class="{ 'is-visible': isClient }"
          :style="
            isClient
              ? {
                  animationDelay: `${index * 100}ms`,
                  animationName: inView ? 'fadeInUp' : 'none',
                  animationDuration: '0.6s',
                  animationFillMode: 'both',
                }
              : {}
          "
        >
          <div class="services__icon-wrapper">
            <img
              :src="service.iconUrl"
              :alt="`${service.title.replace(/<br>/g, ' ')} ikon`"
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
// Animációk
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

.services {
  &__card {
    // Alapértelmezetten látható a keresőmotorok számára
    opacity: 1;

    // Kliens oldalon kezelve az animációt
    &.is-visible {
      opacity: 0;

      &.inView {
        opacity: 1;
      }
    }
  }
}
</style>
