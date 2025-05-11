<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// A kép importálása
// Nuxt-ban a következő módok valamelyikét használjuk
// 1. Az assets mappából (ha az assets mappában van a kép)
// const aboutImage = ref('/assets/img/about/about-us.jpg');

// 2. A public mappából (ha a public mappában van a kép)
const aboutImage = ref('/img/about-us.jpg')

// Ref a szekcióhoz
const aboutSection = ref(null)

// Animáció állapotok
const imageVisible = ref(false)
const textVisible = ref(false)

// Observer
let observer = null

onMounted(() => {
  // Létrehozzuk az IntersectionObserver-t
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]

      if (entry.isIntersecting) {
        // Animációk elindítása késleltetéssel
        setTimeout(() => {
          imageVisible.value = true

          // Szöveg megjelenítése kis késleltetéssel
          setTimeout(() => {
            textVisible.value = true
          }, 300)
        }, 100)

        // Leállítjuk a megfigyelést
        observer.unobserve(entry.target)
      }
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px',
    }
  )

  // Elkezdjük a szekció megfigyelését
  if (aboutSection.value) {
    observer.observe(aboutSection.value)
  }
})

onUnmounted(() => {
  // Megfigyelés leállítása
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <section class="about" id="about" ref="aboutSection">
    <div class="about__container">
      <h2 class="about__title">Rólunk</h2>

      <div class="about__content">
        <div
          class="about__image-wrapper"
          :style="
            imageVisible
              ? 'opacity: 1; transform: translateX(0)'
              : 'opacity: 0; transform: translateX(-50px)'
          "
          :class="{ 'about__image-wrapper--animated': imageVisible }"
        >
          <img
            :src="aboutImage"
            alt="Parti Birtok Rendezvényház tulajdonos"
            class="about__image"
          />
        </div>

        <div
          class="about__text"
          :style="
            textVisible
              ? 'opacity: 1; transform: translateX(0)'
              : 'opacity: 0; transform: translateX(50px)'
          "
          :class="{ 'about__text--animated': textVisible }"
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
            <span class="about__highlight">70 fő befogadására alkalmas</span>,
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
// Transitions
.about {
  &__image-wrapper,
  &__text {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  &__image-wrapper--animated,
  &__text--animated {
    transition-delay: 0.2s;
  }
}
</style>
