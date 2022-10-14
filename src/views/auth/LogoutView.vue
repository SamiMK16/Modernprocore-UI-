<template>
  <v-app></v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class LogoutView extends Vue {
  private delay = 1000;

  private mounted() {
    setTimeout(
        () => this.redirect(),
        this.delay,
    );
  }

  private redirect() {
    this.$store.dispatch(`auth/logout`).then(() => {
      this.$router.push({ path: '/auth/login', query: { signedOut: '1' } });
    });
  }
}
</script>
<style scoped>

</style>