<template>
  <div class="header-block">
    <img
      class="header-block__logo-img"
      src="~/assets/images/logo_150.png"
      height="35"
      width="35"
    />

    <div class="header-block__action">
      <button class="btn-text">PROJECTS</button>
      <button class="btn-text" @click="doLogout()">LOGOUT</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppHeader',

  methods: {
    ...mapActions({
      logout: 'authentication/logout',
    }),

    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.header-block {
  display: flex;
  position: fixed;
  top: 0;
  flex-direction: row;
  height: 50px;
  background-color: $theme-background;
  border-bottom: 1px solid $theme-background;
  box-shadow: 1px 1px 10px $font-color-default;
  width: 100vw;
  align-items: center;
  justify-content: space-between;

  &__logo-img {
    margin: $spacing-s;
  }
}
</style>
