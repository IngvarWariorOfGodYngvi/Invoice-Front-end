<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  friend: 'localhost:8080/strzelnica/#/',
  prod: 'localhost:8081/#/',
  // prod: 'localhost:8080/invoices/#/',
  // host: 'localhost:8080/invoices-1.0'
  host: 'localhost:8080/invoices'
})
</script>
