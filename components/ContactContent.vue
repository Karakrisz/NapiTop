<script setup>
import { ref, reactive } from 'vue'

// Űrlap adatok
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

// Űrlap állapot
const isSubmitting = ref(false)
const submitStatus = ref(false)
const submitMessage = ref('')

// Űrlap beküldés kezelése
const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    // Itt lesz majd az API hívás a form adatok küldéséhez
    // Példa: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

    // Sikeres küldés szimulálása
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Sikeres válasz kezelése
    submitStatus.value = true
    submitMessage.value =
      'Köszönjük az üzenetet! Hamarosan felvesszük Önnel a kapcsolatot.'

    // Űrlap visszaállítása
    Object.keys(formData).forEach((key) => {
      formData[key] = ''
    })
  } catch (error) {
    // Hiba kezelése
    submitStatus.value = false
    submitMessage.value =
      'Hiba történt az üzenet küldése közben. Kérjük próbálja újra később!'
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="contact" id="contact">
    <div class="contact__container">
      <h2 class="contact__title">Kapcsolat</h2>
      <p class="contact__subtitle">Vedd fel velünk a kapcsolatot!</p>

      <div class="contact__text">
        <p>
          Szeretnél ajánlatot kérni, időpontot egyeztetni vagy megnéznéd a
          helyszínt?
        </p>
        <p>Keress minket bizalommal – szívesen segítünk minden kérdésben!</p>
      </div>

      <form class="contact__form" @submit.prevent="handleSubmit">
        <div class="contact__form-row">
          <div class="contact__form-group">
            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="contact__input"
              placeholder="Név*"
              required
            />
          </div>
          <div class="contact__form-group">
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="contact__input"
              placeholder="E-mail cím*"
              required
            />
          </div>
        </div>

        <div class="contact__form-row">
          <div class="contact__form-group">
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              class="contact__input"
              placeholder="Telefonszám"
            />
          </div>
          <div class="contact__form-group">
            <input
              type="text"
              id="subject"
              v-model="formData.subject"
              class="contact__input"
              placeholder="Tárgy"
            />
          </div>
        </div>

        <div class="contact__form-group">
          <textarea
            id="message"
            v-model="formData.message"
            class="contact__textarea"
            placeholder="Üzenet"
            rows="6"
          ></textarea>
        </div>

        <div class="contact__form-footer">
          <div class="contact__privacy">
            <span>A küldés gombra kattintva elfogadja az </span>
            <a href="#privacy" class="contact__privacy-link"
              >Adatvédelmi Nyilatkozatot</a
            >
          </div>
          <button
            type="submit"
            class="contact__submit-btn"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">Küldés</span>
            <span v-else>Küldés...</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="contact__submit-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div
          v-if="submitMessage"
          :class="[
            'contact__message',
            submitStatus
              ? 'contact__message--success'
              : 'contact__message--error',
          ]"
        >
          {{ submitMessage }}
        </div>
      </form>
    </div>
  </section>
</template>
