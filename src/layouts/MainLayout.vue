<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          class="q-pa-none text-h6"
          dense
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          label="FAKTURY"
        />

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
    <div class="full-height bg-secondary text-white">
      <q-list>
          <q-item class="flex flex-center q-pa-md bg-primary text-white xyz1" clickable tag="a" target="_self" :href="hrefTarget" width="max">
            <div class="text-h6 text-bold text-center"><div>FAKTURY</div> STRONA GŁÓWNA</div>
          </q-item>
          <div>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          class="bg-secondary text-white xyz"
        />
        </div>
      </q-list>
</div>
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
    icon: 'person',
    link: 'http://' + App.prod + 'sellers'
  },
  {
    title: 'Faktury',
    icon: 'receipt',
    link: 'http://' + App.prod + 'invoices'
  },
  {
    title: 'Raporty Dzienne',
    icon: 'summarize',
    link: 'http://' + App.prod + 'dailyreports'
  },
  {
    title: 'Zestawienia',
    icon: 'summarize',
    link: 'http://' + App.prod + 'reports'
  },

  {
    title: 'Program STRONA GŁÓWNA',
    icon: 'code',
    link: 'http://' + App.friend
  }
]

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      hrefTarget: 'http://' + App.prod,
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
