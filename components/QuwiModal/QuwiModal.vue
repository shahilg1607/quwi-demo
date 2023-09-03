<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        :class="{
          'modal--small': size === 'small',
          'modal--medium': size === 'medium',
          'modal--large': size === 'large',
        }"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header id="modalTitle" class="modal-header">
          <slot name="header"> {{ title }} </slot>
          <button
            type="button"
            class="btn-close"
            aria-label="Close modal"
            @click="close"
          >
            x
          </button>
        </header>

        <section id="modalDescription" class="modal-body">
          <slot name="body"> {{ content }}</slot>
        </section>

        <footer class="modal-footer">
          <button
            type="button"
            class="btn"
            aria-label="Close modal"
            @click="close"
          >
            {{ closeBtnText }}
          </button>
          <slot name="footer"> </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'QuwiModal',

  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    closeBtnText: {
      type: String,
      default: 'Cancel',
    },
    size: {
      type: String,
      default: 'small',
    },
  },

  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: $spacing-xxs;

  &--small {
    width: 300px;
  }

  &--medium {
    width: 600px;
  }

  &--large {
    width: 900px;
  }
}

.modal-header,
.modal-footer {
  padding: $spacing-default;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: $font-color-default;
  justify-content: space-between;
  font-weight: $font-weight-medium;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: row;
  justify-content: end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  color: $font-color-default;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: $font-size-default;
  padding: $spacing-s;
  cursor: pointer;
  font-weight: bold;
  color: $font-color-default;
  background: transparent;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
