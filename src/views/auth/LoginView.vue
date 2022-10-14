<template>
  <v-layout class="mx-auto my-auto" row wrap>
    <v-flex class="align-content-lg-space-around" sm12>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
        <v-text-field
            ref="email"
            v-model="email"
            :rules="emailRules"
            append-icon="mdi-account"
            autocapitalize="none"
            label="Email"
            required
            validate-on-blur
        />
        <v-text-field
            v-model="password"
            :rules="passwordRules"
            append-icon="mdi-lock"
            label="Password"
            required
            type="password"
            validate-on-blur
        />
        <v-layout class="">
          <v-flex class="">
            <p class="body-2">
              Forgot your password:
              <router-link :to="{ name: 'auth.forgot' }" tabindex="-1">{{
                  'click here!'
                }}
              </router-link>
            </p>
          </v-flex>
          <v-flex class="">
            <p class="body-2">
              Don’t have account:
              <router-link :to="{ name: 'auth.signup' }" tabindex="-1">{{
                  'Register here'
                }}
              </router-link>
            </p>
          </v-flex>
        </v-layout>
        <v-layout class="mt-4 align-center">
          <v-flex>
            <v-btn
                :disabled="processing"
                :loading="processing"
                class="primary float-right"
                type="submit"
            >
              {{ 'Login' }}
            </v-btn>
          </v-flex>
        </v-layout>
        <v-snackbar
            v-model="snackBar"
            :color="snackClass"
            shaped
            timeout="1000"
            transition="fade-transition"
            @click="snackBar=!snackBar"
        >{{ successMsg }}
          <template v-slot:action="{ attrs }">
            <v-btn
                class="primary"
                dark
                text
                v-bind="attrs"
                @click="snackBar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar
        >
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class LoginView extends Vue {
  valid = true;
  password = '';
  passwordRules: Array<(v: string) => string | boolean> = [];
  email = '';
  snackClass = '';
  successMsg = '';
  emailRules: Array<(v: string) => string | boolean> = [];
  processing = false;
  snackBar = false;

  created() {
    if (this.$route.query.signedOut === '1') {
      this.openSnack('Sign-out successfully!', 'primary')
    }
    this.emailRules = [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ];
  }

  submit() {
    const result = (this.$refs.form as Vue & { validate: () => boolean }).validate();
    if (result) {
      this.processing = true;
      this.$store
          .dispatch('auth/login', {
            username: this.email,
            password: this.password,
          })
          .then((response) => {
            if (!response.error) {
              this.openSnack('Success, Welcome ' + response.firstName, 'primary');
              this.handleSuccess();
            }
          })
          .catch((error) => {
            this.openSnack(error.message, 'error');
            this.processing = false;
            throw error;
          });
    }
  }

  openSnack(msg: string, clas: string) {
    this.snackBar = true;
    this.successMsg = msg;
    this.snackClass = clas;
  }

  private async handleSuccess() {
    // On Success, route back to the previous page, else home
    this.processing = false;
    const originalPage = this.$route.query.next;
    const redirectTo = originalPage
        ? {path: originalPage as string}
        : {name: 'time.tracker'};
    await this.$router.replace(redirectTo);
  }
}
</script>

<style scoped>

</style>
