<template>
  <v-layout row wrap class="mx-auto my-auto">
    <v-flex sm12 class="align-content-lg-space-around">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
        <v-flex v-if="!savedImage" sm12>
          <v-file-input v-model="image" accept="image/*" dense @change="onFileChange"/>
        </v-flex>
        <v-flex v-else sm12>
          <v-avatar size="62">
            <img
                :src="imageUrl"
                alt="John"
            >
          </v-avatar>
          <v-btn rounded small text @click="savedImage=!savedImage">
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </v-flex>
        <v-flex sm12>
          <v-text-field
              ref="firstName"
              v-model="user.firstName"
              label="First Name"
              :rules="firstnameRules"
              append-icon="mdi-account"
              autocapitalize="none"
              required
              validate-on-blur
          />
        </v-flex>
        <v-flex sm12>
          <v-text-field
              v-model="user.lastName"
              :label="'Last Name'"
              append-icon="mdi-account"
              autocapitalize="none"
              :rules="lastNameRules"
              required
              validate-on-blur
          />
        </v-flex>
        <v-flex sm12>
          <v-text-field
              v-model="user.email"
              :label="'Email'"
              append-icon="mdi-email"
              :rules="emailRules"
              autocapitalize="none"
              type="email"
          />
        </v-flex>
        <v-flex sm12>
          <v-text-field
              v-model="user.phoneNumber"
              :label="'Phone Number'"
              append-icon="mdi-cellphone"
              name="phone"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
              v-model="user.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show ? 'text' : 'password'"
              label="Password"
              @click:append="show = !show"
          ></v-text-field>
          <v-text-field
              v-model="confirmPassword"
              :rules="confirmRules"
              :type="show ? 'text' : 'password'"
              label="Confirm Password"
              @click:append="show = !show"
          ></v-text-field>
        </v-flex>
        <v-flex sm12>
          <v-checkbox
              id="acceptance"
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              :color="!checkbox ? 'red' : 'primary'"
              :label="'Agreed with Terms and user policies'"
              required
          ></v-checkbox>
        </v-flex>
        <span class="subtitle-2">
        <router-link :to="{ name: 'auth.login' }" tabindex="-1">{{
            'Login'
          }}
        </router-link>
        </span>
        <v-btn
            :disabled="processing || !valid && !checkbox"
            :loading="processing"
            class="primary float-right"
            type="submit"
        >{{ 'Register' }}
        </v-btn>
        <v-snackbar
            v-model="snackBar"
            :color="snackClass"
            @click="snackBar=!snackBar"
        >
          {{ successMsg }}
          <template v-slot:action="{ attrs }">
            <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackBar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import AuthAPI from "@/services/api/auth.service";

@Component({})
export default class SignupView extends Vue {
  private valid = false;
  private checkbox = false;
  private show = false;
  private user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  };
  private passwordRules: Array<(v: string) => string | boolean> = [];
  private firstnameRules: Array<(v: string) => string | boolean> = [];
  private lastNameRules: Array<(v: string) => string | boolean> = [];
  private savedImage = false;
  private snackClass = '';
  private confirmPassword = '';
  private successMsg = '';
  private emailRules: Array<(v: string) => string | boolean> = [];
  private confirmRules: Array<(v: string) => string | boolean> = [];
  private processing = false;
  private snackBar = false;
  private image = [];
  private imageUrl: any = '';

  private created() {
    this.emailRules = [
      (v: string) => !!v || 'Email is required',
      (v: string) => /.+@.+/.test(v) || 'Email must be valid',
    ];
    this.passwordRules = [
      (v: string) => !!v || 'Password is required',
    ];
    this.confirmRules = [
      (v: string) => !!v || 'Confirm Password is required',
      (v: string) => v === this.user.password || 'Password are not same'
    ];
    this.firstnameRules = [
      (v: string) => !!v || 'First Name is required',
    ];
    this.lastNameRules = [
      (v: string) => !!v || 'Last Name is required',
    ];
  }

  private createImage(file: Blob) {
    const reader = new FileReader();

    reader.onload = e => {
      this.imageUrl = e.target!.result;
    };
    reader.readAsDataURL(file);
    this.savedImage = !!reader;
  }

  private onFileChange(file: any) {
    if (!file) {
      return;
    }
    this.createImage(file);
  }

  private submit() {
    const result = (this.$refs.form as Vue & { validate: () => boolean }).validate();
    if (result) {
      AuthAPI.signup(this.user)
          .then((response) => {
            if (response.data) {
              //  TODO Login and Remove Finally
            }
          })
          .catch((error) => {
            this.handleError(error.message);
          }).finally(() => {
        this.$store
            .dispatch('auth/login', {
              // username: this.user.email,
              username: 'admin@admin.com',
              password: process.env.VUE_APP_CLIENT_SECRET,
            })
            .then((res) => {
              if (res.error) {
                return this.handleError(res.message);
              }
              this.processing = false;
              this.openSnack('Succeed', 'primary')
              return this.handleSuccess();
            })
            .catch((error) => {
              this.handleError(error);
            });
      });
    }
  }

  private handleError(error: string) {
    this.openSnack(error, 'error')
    this.processing = false;
  }

  private async handleSuccess() {
    // On Success, route back to the previous page, else home
    const originalPage = this.$route.query.next;
    const redirectTo = originalPage
        ? {path: originalPage as string}
        : {name: 'time.tracker'};
    await this.$router.push(redirectTo);
  }

  private openSnack(msg: string, clas: string) {
    this.snackBar = true;
    this.successMsg = msg;
    this.snackClass = clas;
  }
}
</script>

<style scoped>

</style>
