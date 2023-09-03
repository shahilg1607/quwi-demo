<template>
  <div>
    <AppHeader />
    <div class="container">
      <nuxt />
    </div>
    <QuwiToaster />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AppHeader from '../components/Header/header.vue'
import QuwiToaster from '../components/QuwiToaster/QuwiToaster.vue'

export default {
  name: 'DefaultLayout',

  components: {
    AppHeader,
    QuwiToaster,
  },

  computed: {
    ...mapGetters({
      loadToaster: 'toaster/loadToaster',
    }),
  },
}
</script>
