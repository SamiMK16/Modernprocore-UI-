<template>
  <app-page :title="'Profile Settings'" class="white">
    <v-form v-if="user!==null" ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
      <v-row>
        <v-col cols="4">
          <v-text-field v-model="user.description" :rules="[(v)=>!!v||'Name is Required']" label="Name" required
                        validate-on-blur></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="user.phoneNumber" :rules="[(v)=>!!v||'Phone is Required']" label="Phone Number"
                        required
                        type="number" validate-on-blur></v-text-field>
        </v-col>
      </v-row>
      <v-checkbox v-if="!changePassword" v-model="changePassword"
                  label="Want to change password"></v-checkbox>
      <span v-if="changePassword" class="text--black text-lg-h6">
        Change Password
      </span>
      <v-row v-if="changePassword    ">
        <v-col cols="4">
          <v-text-field v-model="oldPwd" :rules="[(v)=>!!v||'Current is Required']" label="Current Password" required
                        type="password" validate-on-blur></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="password" :rules="[(v)=>!!v||'New Password is Required']" label="New Password" required
                        type="password"
                        validate-on-blur></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field :rules="[(v)=>!!v||'Confirm Password is Required',
                        (v)=>v===password||`Passwords didn't matched`]" label="Confirm Password" required
                        type="password"
                        validate-on-blur></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn color="primary" medium outlined @click="$router.back()">
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" medium type="submit">
          Save
        </v-btn>
      </v-row>
    </v-form>
  </app-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import AuthAPI from "@/services/api/auth.service";

@Component({})
export default class Settings extends Vue {
  private loading = false;
  private password = '';
  private oldPwd = '';
  private user: any = null;
  private valid = false;
  private changePassword = false;

  mounted() {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    AuthAPI.me().then(res => {
      console.log(res)
      this.user = res;
    }).catch(err => {
      throw err;
    })
  }

  private submit() {
    const result = (this.$refs.form as Vue & { validate: () => boolean }).validate();
    if (result) {
      this.user.password = this.oldPwd
      const payload = {
        ...this.user,
        changePassword: this.changePassword,
        newPassword: this.password
      }
      AuthAPI.update(payload).then(res => {
        if (res) {
          if (this.changePassword){
            this.$store.dispatch(`auth/logout`).then(() => {
              this.$router.push({ path: '/auth/login', query: { signedOut: '1' } });
            });
          }
          this.$router.push({name: 'time.tracker'});
        }
      }).catch(err => {
        throw err;
      })
    }
  }

}
</script>
