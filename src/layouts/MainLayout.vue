<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Faktury
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.platform }}</div> -->
        <!-- <div>Quasar v{{ $q.screen }}</div> -->
        <!-- <div>Quasar v{{ $q.dark }}</div> -->
        <!-- <div>Quasar v{{ $q.lang }}</div> -->
        <!-- <div>Quasar v{{ $q.lang }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import App from 'src/App.vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Sprzedawcy',
    icon: 'school',
    link: 'http://' + App.prod + 'seller'
  },
  {
    title: 'Faktury',
    icon: 'code',
    link: 'http://' + App.prod + 'invoices'
  },
  {
    title: 'Raporty',
    icon: 'code',
    link: 'http://' + App.prod + 'reports'
  },
  {
    title: 'Raporty Dzienne',
    icon: 'code',
    link: 'http://' + App.prod + 'dailyreports'
  }
]

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      local: App.host
    }
  },
  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
