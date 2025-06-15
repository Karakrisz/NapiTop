<script setup>
import { ref } from 'vue'

const images = [
  { src: '/img/gallery/slidedef.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide2.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide3.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide4.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide5.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide6.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide7.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide8.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide9.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide10.webp', alt: 'Napi Top Kft' },
  { src: '/img/gallery/slide11.webp', alt: 'Napi Top Kft' },
]

const selectedIndex = ref(0)
</script>

<template>
  <section class="venue-section" aria-labelledby="venue-section-title">
    <div class="venue-section__inner">
      <!-- TITLE + LEAD -->
      <header class="venue-section__header">
        <h2 id="venue-section-title" class="venue-section__title">Helyszín</h2>
        <p class="venue-section__lead">
          Mindent egy helyen – Nálunk tényleg minden adott egy tökéletes
          eseményhez:
        </p>
      </header>

      <!-- CONTENT: TEXT on top, then MEDIA -->
      <div class="venue-section__body">
        <!-- TEXT -->
        <div class="venue-section__text">
          <p>
            Tágas belső térrel és hangulatos udvarral várjuk vendégeinket.
            Nyáron lehetőség van a rendezvényeket a teraszon, a szabad ég alatt
            megtartani. Az épület teljesen klimatizált, így bármely évszakban
            kellemes környezetet biztosítunk.
          </p>
          <p>
            Folyamatosan bővítjük szolgáltatásainkat és figyelembe vesszük
            vendégeink igényeit, hogy a Parti‐birtok mindig egy lépéssel előrébb
            járjon.
          </p>
        </div>

        <!-- MEDIA -->
        <div class="venue-section__media">
          <!-- Hero kép -->
          <NuxtImg
            :src="images[selectedIndex].src"
            :alt="images[selectedIndex].alt"
            class="venue-section__image"
            loading="lazy"
          />

          <!-- Thumbnail gallery -->
          <ul class="venue-section__gallery">
            <li
              v-for="(img, idx) in images"
              :key="idx"
              class="venue-section__gallery-item"
              :class="{
                'venue-section__gallery-item--active': idx === selectedIndex,
              }"
            >
              <button
                type="button"
                class="venue-section__thumb-button"
                @click="selectedIndex = idx"
              >
                <NuxtImg
                  :src="img.src"
                  :alt="img.alt"
                  loading="lazy"
                  class="venue-section__thumb-image"
                />
              </button>
            </li>

            <!-- “Teljes galéria” link -->
            <!-- <li
              class="venue-section__gallery-item venue-section__gallery-item--full"
            >
              <NuxtLink href="/" class="venue-section__gallery-link">
                Teljes galéria
              </NuxtLink>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.venue-section {
  padding: 4rem 1rem;
  background: #181818;
  color: #fff;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__header {
    & .venue-section__title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5em;
    }
    & .venue-section__lead {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1em;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__text {
    font-size: 1rem;
    line-height: 1.6;

    p + p {
      margin-top: 1rem;
    }
  }

  &__media {
    display: flex;
    flex-direction: column;

    & .venue-section__image {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      border-radius: 15px;
      margin-bottom: 1rem;
    }

    & .venue-section__gallery {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      justify-content: center;
      padding: 0;

      &::-webkit-scrollbar {
        height: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }
    }

    & .venue-section__gallery-item {
      flex: 0 0 auto;
      width: 83px;
      height: 83px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;

      &--active {
        outline: 2px solid #cca132;
      }

      &--full {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;

        .venue-section__gallery-link {
          font-size: 0.875rem;
          text-decoration: none;
          color: #007acc;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .venue-section__thumb-button {
        width: 100%;
        height: 100%;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
      }

      .venue-section__thumb-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }
}
</style>
