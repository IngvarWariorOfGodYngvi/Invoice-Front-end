<template>
  <q-page>
    <div class="row">
      <main-list>
      </main-list>
    <div class="col flex flex-center full-width q-pa-xl">
    <img draggable="false" class="fun" alt="logo" src="~assets/logo.jpg">
    </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import MainList from 'src/components/MainList.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    MainList
  },
})
</script>
