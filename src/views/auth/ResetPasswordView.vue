<template>
  <v-layout>
    <v-flex sm12 class="align-content-lg-space-around">
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submit"
      >
        <v-text-field
            v-model="email"
            label="E-mail"
            append-icon="mdi-email"
            required
        ></v-text-field>
        <span class="subtitle-2">
        <router-link :to="{ name: 'auth.login' }" tabindex="-1">{{
            'Login'
          }}
        </router-link>
        </span>
        <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4 float-right"
            type="submit"
        >
          Send email
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
  </template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import AuthAPI from "@/services/api/auth.service";

@Component({})
export default class ResetPasswordView extends Vue {
  private valid = true;
  private email = '';
  private processing = false;
  private snackBar = false;
  private snackClass = '';
  private successMsg = '';

  private submit() {
    const result = (this.$refs.form as Vue & { validate: () => boolean }).validate();
    if (result) {
      AuthAPI.sendPasswordReset({username: this.email, type: 'STAFF'})
          .then((response) => {
            if (response) {
              this.openSnack('Please check email inbox or spam', 'primary');
              this.handleSuccess();
            }
          })
          .catch((error) => {
            this.openSnack(error.message, 'error');
            this.processing = false;
            throw error;
          })
    }
  }

  private async handleSuccess() {
    // On Success, route back to the previous page, else home
    this.processing = false;
    const originalPage = this.$route.query.next;
    const redirectTo = originalPage
        ? {path: originalPage as string}
        : {name: 'auth.login'};
    await this.$router.push(redirectTo);
  }

  openSnack(msg: string, clas: string) {
    this.snackBar = true;
    this.successMsg = msg;
    this.snackClass = clas;
  }
}
</script>

<style scoped>

</style>
