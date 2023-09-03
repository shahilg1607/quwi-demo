<template>
  <div class="container">
    <nuxt />
    <QuwiToaster />
  </div>
</template>

<script>
import QuwiToaster from '../components/QuwiToaster/QuwiToaster.vue'
export default {
  name: 'LoginLayout',

  components: {
    QuwiToaster,
  },
}
</script>
