<template>
  <div class="card login-block no-border">
    <div class="card__content">
      <div class="login-block__logo">
        <img src="~/assets/images/login_logo.svg" />
      </div>
      <div class="login-block__form">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form autocomplete="off" @submit.prevent="handleSubmit(onLogin)">
            <div class="row">
              <ValidationProvider
                v-slot="{ errors }"
                name="E-mail"
                rules="required|email"
                class="column"
              >
                <input
                  v-model="loginForm.email"
                  type="email"
                  :class="{
                    'input--danger': errors[0],
                    'input--secondary': !errors[0],
                  }"
                  placeholder="Email"
                  autocomplete="off"
                />
                <div class="input__error-message">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <div class="row">
              <ValidationProvider
                v-slot="{ errors }"
                class="column"
                name="Password"
                rules="required"
              >
                <input
                  v-model="loginForm.password"
                  type="password"
                  :class="{
                    'input--danger': errors[0],
                    'input--secondary': !errors[0],
                  }"
                  placeholder="Password"
                  autocomplete="off"
                />
                <div class="input__error-message">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <div class="row">
              <div class="column">
                <button class="btn btn--primary" type="submit">Login</button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',

  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    ...mapActions({
      login: 'authentication/login',
    }),

    async onLogin() {
      await this.login(this.loginForm)
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.login-block {
  width: 400px;

  &__logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: $spacing-l 0 $spacing-double;
  }

  &__form {
    margin-top: $spacing-default;
  }
}
</style>
