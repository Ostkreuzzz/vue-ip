<script setup lang="ts">
import Toast from 'primevue/toast'
import { GoogleMap, Marker } from 'vue3-google-map'

import { useToast } from 'primevue/usetoast'
import { reactive, ref } from 'vue'
import { validateIPAddress } from './utils/validateIPAddress'
import { getIPData } from './utils/axios'

const ip = ref('')
const ipInfo = reactive({
  ip: '192.212.174.101',
  location: 'Brooklyn, NY 10001',
  timezone: 'UTC -05:00',
  isp: 'SpaceX Starlink',
  lat: 37.40599,
  lng: -122.078514,
})

const toast = useToast()
const showError = (message: string) => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: message,
    life: 3000,
  })
}

async function handleSubmitSearch() {
  if (!ip.value.trim()) {
    return
  }

  if (!validateIPAddress(ip.value)) {
    showError('Your IP address is not valid!')
    return
  }

  try {
    const response = await getIPData(ip.value.trim())

    const { ip: ipAddress, location, isp } = response.data

    ipInfo.ip = ipAddress || 'No information'
    ipInfo.location = `${location.country}, ${location.region}, ${location.city}`
    ipInfo.timezone = location.timezone || 'No information'
    ipInfo.isp = isp || 'No information'

    ipInfo.lat = location.lat
    ipInfo.lng = location.lng
  } catch (e) {
    showError(`Failed to upload info: ${e}`)
  }
}
</script>

<template>
  <div
    class="desktop:bg-desktop desktop:bg-full-width-desktop mobile:bg-mobile bg-full-width-mobile flex flex-col items-center justify-center gap-32 bg-no-repeat px-24"
  >
    <Toast />
    <header
      class="mt-32 text-2xl font-bold uppercase tracking-wide text-white desktop:text-4xl"
    >
      IP Address Tracker
    </header>
    <form
      class="group relative z-10 w-full max-w-[560px]"
      @:submit.prevent="handleSubmitSearch"
    >
      <input
        v-model="ip"
        type="text"
        class="group relative h-56 w-full rounded-lg border-2 border-white bg-white px-24 py-18 transition-all duration-300 hover:translate-y-4 hover:scale-105 hover:border-blue hover:shadow-2xl focus:outline-none focus:ring-0"
        placeholder="Search for any IP address or domain"
        maxlength="15"
        oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
      />
    </form>

    <main>
      <section>
        <div class="desktop:mt-16">
          <ul
            class="flex flex-col items-center gap-16 rounded-xl bg-white py-24 shadow-2xl desktop:flex-row desktop:justify-between desktop:py-40"
          >
            <li
              class="flex flex-col items-center gap-4 px-32 first:border-none desktop:gap-12 desktop:border-l-2 desktop:border-light-gray"
            >
              <h4
                class="text-xs font-semibold uppercase tracking-widest text-light-gray"
              >
                IP Address
              </h4>
              <p class="text-2xl font-semibold">{{ ipInfo.ip }}</p>
            </li>
            <li
              class="flex flex-col items-center gap-4 px-32 desktop:gap-12 desktop:border-l-2 desktop:border-light-gray"
            >
              <h4
                class="text-xs font-semibold uppercase tracking-widest text-light-gray"
              >
                Location
              </h4>
              <p class="text-2xl font-semibold">{{ ipInfo.location }}</p>
            </li>
            <li
              class="flex flex-col items-center gap-4 px-32 desktop:gap-12 desktop:border-l-2 desktop:border-light-gray"
            >
              <h4
                class="text-xs font-semibold uppercase tracking-widest text-light-gray"
              >
                Timezone
              </h4>
              <p class="text-2xl font-semibold">{{ ipInfo.timezone }}</p>
            </li>
            <li
              class="flex flex-col items-center gap-4 px-32 desktop:gap-12 desktop:border-l-2 desktop:border-light-gray"
            >
              <h4
                class="text-light-grey text-xs font-semibold uppercase tracking-widest text-light-gray"
              >
                ISP
              </h4>
              <p class="text-2xl font-semibold">{{ ipInfo.isp }}</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
    <GoogleMap
      class="absolute top-1/3 -z-10 h-full w-full desktop:h-2/3"
      api-key="AIzaSyBP1Bi1NbGW5R7eg42Yp2rmRu8_ufypRGU"
      :center="{ lat: ipInfo.lat, lng: ipInfo.lng }"
      :zoom="10"
      :disable-default-ui="true"
    >
      <Marker :options="{ position: { lat: ipInfo.lat, lng: ipInfo.lng } }" />
    </GoogleMap>
  </div>
</template>

<style></style>
