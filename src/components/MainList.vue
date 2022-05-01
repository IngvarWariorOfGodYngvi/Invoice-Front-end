<template>
    <div class="q-pa-md col-6">
      <div @click="showloading()" class="q-pa-xs">
        <q-item class="q-pa-none xyz2" clickable tag="a" target="_self" :href="app + 'sellers'" width="max">
            <div class="row text-grey-7 text-left">
              <q-icon class="q-pa-md text-h5" name="person" />
            <div class="self-center text-black" tabindex="1">Sprzedawcy</div>
            </div>
        </q-item>
      </div>
      <div @click="showloading()" class="q-pa-xs">
        <q-item class="q-pa-none xyz2" clickable tag="a" target="_self" :href="app + 'invoices'" width="max">
            <div class="row text-grey-7 text-left">
              <q-icon class="q-pa-md text-h5" name="receipt" />
            <div class="self-center text-black" tabindex="1">Faktury</div>
            </div>
        </q-item>
      </div>
      <div @click="showloading()" class="q-pa-xs">
        <q-item class="q-pa-none xyz2" clickable tag="a" target="_self" :href="app + 'dailyreports'" width="max">
            <div class="row text-grey-7 text-left">
              <q-icon class="q-pa-md text-h5" name="summarize" />
            <div class="self-center text-black" tabindex="1">Raporty Dzienne</div>
            </div>
        </q-item>
      </div>
      <div @click="showloading()" class="q-pa-xs">
        <q-item class="q-pa-none xyz2" clickable tag="a" target="_self" :href="app + 'reports'" width="max">
            <div class="row text-grey-7 text-left">
              <q-icon class="q-pa-md text-h5" name="summarize" />
            <div class="self-center text-black" tabindex="1">Raporty</div>
            </div>
        </q-item>
      </div>
      <div @click="showloading()" class="q-pa-xs">
        <q-item class="q-pa-none xyz2" clickable tag="a" target="_self" :href="app + 'dailyreports'" width="max">
            <div class="row text-grey-7 text-left">
              <q-icon class="q-pa-md text-h5" name="code" />
            <div class="self-center text-black" tabindex="1">Program STRONA GŁÓWNA</div>
            </div>
        </q-item>
      </div>
    </div>
</template>
<style src="../style/style.scss" lang="scss">

</style>

<script >
import App from 'src/App.vue'
export default {
  name: 'mainistL',
  data () {
    return {
      app: 'http://' + App.prod,
      color: 'primary',
      local: App.host
    }
  },
  created () {
  },
  methods: {
    showloading () {
      this.$q.loading.show({ message: 'Dzieje się coś ważnego... Poczekaj' })
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = 0
      }, 500)
    }
  }
}

</script>
