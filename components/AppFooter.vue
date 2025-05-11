<script setup>
import { computed } from 'vue'

// Aktuális év a copyright szöveghez
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__logo-section">
          <NuxtLink to="/" class="footer__logo-link">
            <img
              src="/img/logo.svg"
              alt="Parti Birtok Rendezvényház Logo"
              class="footer__logo"
            />
          </NuxtLink>
        </div>

        <div class="footer__nav-section">
          <nav class="footer__nav">
            <ul class="footer__nav-list">
              <li class="footer__nav-item">
                <NuxtLink to="/" class="footer__nav-link">Kezdőlap</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink to="/" class="footer__nav-link">Galéria</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink to="/" class="footer__nav-link">Rólunk</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink to="/" class="footer__nav-link"
                  >Szolgáltatások</NuxtLink
                >
              </li>
              <li class="footer__nav-item">
                <NuxtLink to="/" class="footer__nav-link">Kapcsolat</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink to="/" class="footer__nav-link">Referenciák</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink to="/" class="footer__nav-link">Partnerek</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink to="/" class="footer__nav-link"
                  >Ajánlatkérés</NuxtLink
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="footer__contact-section">
          <address class="footer__address">
            <div class="footer__contact-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="footer__contact-icon"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>6900 Makó, Rákosi út 123.</span>
            </div>
            <div class="footer__contact-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="footer__contact-icon"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                ></path>
              </svg>
              <a href="tel:+36301234567" class="footer__contact-link"
                >+36 30 123 4567</a
              >
            </div>
            <div class="footer__contact-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="footer__contact-icon"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:info@partibirtok.hu" class="footer__contact-link"
                >info@partibirtok.hu</a
              >
            </div>
          </address>
        </div>
      </div>
      <div class="map-box">
        <div class="footer__map-section">
          <div class="footer__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22019.964666946836!2d20.458383907654575!3d46.21442981772996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4744665088f7531f%3A0xf5a1e2d46fedcb58!2zTWFrw7M!5e0!3m2!1shu!2shu!4v1684424926254!5m2!1shu!2shu"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Parti Birtok Rendezvényház elhelyezkedése a térképen"
              class="footer__map-iframe"
            >
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
