<template>
  <transition name="toast">
    <div v-if="getNotification" class="toast-message">
      <p
        class="toast-message__content"
        role="alert"
        aria-live="assertive"
        @click="$emit('removeToastMessage')"
      >
        <span>{{ getNotification.message }}</span>
      </p>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'QuwiToaster',

  data() {
    return {
      activeTimeout: null,
    }
  },

  computed: {
    ...mapGetters({
      getNotification: 'toaster/getNotification',
    }),
  },

  watch: {
    getNotification() {
      clearTimeout(this.activeTimeout)

      if (this.getNotification && this.getNotification.message) {
        this.activeTimeout = setTimeout(() => {
          this.resetNotification()
        }, 3000)
      }
    },
  },

  methods: {
    ...mapActions({
      resetNotification: 'toaster/resetNotification',
    }),
  },
}
</script>

<style lang="scss" scoped>
$full-width-toast-breakpoint: 500px;

.toast-message {
  position: fixed;
  width: 100%;
  z-index: 30;
  bottom: 0;
  text-align: center;

  .button {
    margin-left: $spacing-xs;
  }

  @media screen and (min-width: $full-width-toast-breakpoint) {
    bottom: 1rem;
    width: auto;
    left: 50%;
    transform: translateX(-50%);
  }

  @media print {
    display: none;
  }
}

.toast-message__content {
  background: $gray;
  color: $white;
  font-weight: $font-weight-bold;
  padding: 1rem;

  @media screen and (min-width: $full-width-toast-breakpoint) {
    display: inline-block;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}

.toast-enter-active {
  transition: all 0.25s ease-in;
}

.toast-leave-active {
  transition: all 0.25s ease-out;
}

.toast-enter,
.toast-leave-to {
  transform: translateY(100%);
  opacity: 0;

  @media screen and (min-width: $full-width-toast-breakpoint) {
    transform: translate(-50%, 100%);
  }
}
</style>
