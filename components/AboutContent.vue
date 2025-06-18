<script setup>
import { ref, onMounted } from 'vue'

// A kép importálása a public mappából
const aboutImage = ref('/img/about.webp')

// Kliens oldali renderelés ellenőrzése
const isClient = ref(false)
const inView = ref(false)
const isDesktop = ref(false)

// Képernyőszélesség ellenőrzése
const checkScreenWidth = () => {
  isDesktop.value = window.innerWidth >= 1200
}

// Komponens betöltése után
onMounted(() => {
  // Beállítjuk, hogy kliens oldalon vagyunk
  isClient.value = true
  
  // Kezdeti képernyőméret ellenőrzés
  checkScreenWidth()
  
  // Ablakméret változás követése
  window.addEventListener('resize', checkScreenWidth)
  
  // IntersectionObserver használata a szekcióhoz
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      inView.value = true
      observer.disconnect()
    }
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  })
  
  // A teljes szekció megfigyelése
  const section = document.getElementById('about')
  if (section) {
    observer.observe(section)
  }
  
  return () => {
    if (observer) {
      observer.disconnect()
    }
    window.removeEventListener('resize', checkScreenWidth)
  }
})
</script>

<template>
  <section class="about about--paddingFormat" id="about">
    <div class="about__container">
      <h2 class="about__title">Rólunk</h2>

      <div class="about__content">
        <!-- Kép konténer - SEO-barát megoldás, az animáció csak kliens oldalon jelenik meg -->
        <div
          class="about__image-wrapper"
          :class="{ 'is-animated': isClient && isDesktop, 'in-view': isClient && isDesktop && inView }"
        >
          <img
            :src="aboutImage"
            alt="Parti Birtok Rendezvényház tulajdonos"
            class="about__image"
          />
        </div>

        <!-- Szöveg konténer - SEO-barát megoldás, az animáció csak kliens oldalon jelenik meg -->
        <div
          class="about__text"
          :class="{ 'is-animated': isClient && isDesktop, 'in-view': isClient && isDesktop && inView }"
        >
          <p class="about__intro">
            A Parti Birtok Rendezvényház
            <span class="about__highlight"
              >2024 júniusában nyitotta meg kapuit</span
            >
            Makó és Rákos között, csendes, mégis könnyen megközelíthető
            helyszínen. Saját parkolóval, zárt udvarral, folyamatosan fejlődő
            infrastruktúrával és vendégszerető személettel várjuk azokat, akik
            valami igazán különlegesre vágynak.
          </p>

          <p class="about__paragraph">
            Legyen szó esküvőről, születésnapról, céges rendezvényről vagy egy
            baráti összejövetelről, nálunk a hangulat, a tér és a szolgáltatások
            is azt szolgálják, hogy minden résztvevő
            <span class="about__highlight">felejthetetlen élmények</span>kel
            gazdagodjon. Az épületet és a tágas udvart úgy alakítottuk ki, hogy
            rugalmasan alkalmazkodjon az esemény típusához és stílusához.
          </p>

          <p class="about__paragraph">
            Célunk, hogy ne csak egy helyszínt kínáljunk, hanem egy olyan
            élményteret, ahol a részletek is számítanak.
            <span class="about__highlight"
              >Saját parkoló, zárt udvar, modern felszereltség</span
            >
            – nálunk minden adott, hogy az eseményed emlékezetes és különleges
            legyen.
          </p>

          <p class="about__paragraph">
            Rendezvényházunk
            <span class="about__highlight">70 fő (+30 fő terasz) befogadására alkalmas</span>,
            és ideális választás esküvőkre, születésnapokra, céges
            rendezvényekre, csapatépítőkre, vagy akár egy jó hangulatú
            házibulira.
          </p>

          <p class="about__cta-text">
            Ne maradjon le, kérjen árajánlatot még ma!
          </p>

          <div class="about__cta">
            <a href="#contact" class="about__button">Árajánlatkérés</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about {
  &__image-wrapper,
  &__text {
    /* Alapértelmezett állapot (keresőmotorok számára) */
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  /* Kliens oldali animációk */
  &__image-wrapper.is-animated {
    &:not(.in-view) {
      opacity: 0;
      transform: translateX(-50px);
    }
    
    &.in-view {
      opacity: 1;
      transform: translateX(0);
      transition-delay: 0.2s;
    }
  }
  
  &__text.is-animated {
    &:not(.in-view) {
      opacity: 0;
      transform: translateX(50px);
    }
    
    &.in-view {
      opacity: 1;
      transform: translateX(0);
      transition-delay: 0.5s;
    }
  }
}

/* Media query, hogy kisebb képernyőkön ne legyen animáció */
@media (max-width: 1199px) {
  .about {
    &__image-wrapper,
    &__text {
      opacity: 1 !important;
      transform: translateX(0) !important;
      transition: none !important;
    }
  }
}
</style>