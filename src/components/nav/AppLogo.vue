<template>
  <div
      :class="{
      ['dis-app-logo--vert']: vertical,
      ['dis-app-logo--horiz']: !vertical }"
      class="dis-app-logo"
  >
    <div class="dis-app-logo__mark">
      <svg
          v-if="appLogo.length === 0"
          :width="width"
          version="1.1"
          viewBox="0 0 203.47 91.58"
          x="0"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          y="0"
      >
        <path
            :fill="color || '#007dc4'"
            d="M174.97 54.9s5.04.36 5.04-3.33v-2.94c0-1.76-1.23-3.27-3.26-3.27h-32.27c-9.39 0-15.79-6.53-15.79-15.38 0-1.37.14-2.72.41-4.09 2.31-10.75 12.79-19.59 23.68-19.59h50.64c-2.04 9.25-11.03 16.73-20.28 16.73h-31.58c-2.31 0-4.49 1.77-5.04 4.09v.82c0 1.9 1.23 3.27 3.27 3.27h32.26c9.39 0 15.93 6.67 15.93 15.52 0 1.23-.28 2.58-.54 4.09-1.36 6.28-5.51 11.85-10.89 15.41-15.79-1.83-32.82-2.84-50.59-2.84-15.69 0-30.79.8-44.98 2.24a7.33 7.33 0 0 1-.42-2.43c0-.54.14-1.23.27-1.77l6.04-27.54c2.04-9.8 11.7-17.7 21.5-17.7l-9.69 44.36c0-.01 21.88-6.69 66.29-5.65z"
        />
        <path
            :fill="color || '#d11242'"
            d="M122.23.01c-21.66 0-22.85 21.01-22.85 21.01 6.08-10.6 17.68-10.62 20.43-10.62L122.23.01z"
        />
        <path
            :fill="color || '#a0a0a3'"
            d="M172.64 82.19l8.62-7.79c-16.88-2.14-35.29-3.31-54.55-3.31-50.35 0-95.37 8.08-122.2 20.34l.09.16c28.86-10.67 96.02-17.87 168.04-9.4z"
        />
        <path
            :fill="color || '#007dc4'"
            d="M74.69 6.3H-.07S.09 23.03 13.4 23.03h52.44c2.45 0 4.22 1.77 4.22 4.22 0 .41 0 .68-.13 1.09l-4.7 22.01c-.54 3-2.53 4.39-6.4 5.31 0 0-33.41 6.49-35.86 8.71l7.07-36.28s-17.04 0-19.99 13.18C7.1 54.45.76 83.76.76 83.76c16.27-6.99 40.17-12.61 68.64-16.07 7.86-1.05 11.84-9.24 13.18-15.11l5.99-28.46c.28-1.22.4-2.58.4-3.67.01-8.03-5.84-14.15-14.28-14.15z"
        />
      </svg>
      <img v-if="appLogo.length > 0" src="../../assets/logo.png" alt=""/>
    </div>
    <div
        :class="{
      'white--text': dark,
      'black--text': !dark,
      }"
        class="dis-app-logo__version caption"
    >{{ 'App version'+' '+ APP_VERSION }}
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {version} from '@/../package.json';

@Component
export default class AppLogo extends Vue {
  @Prop({
    default: null,
  })
  private color: string | null;

  @Prop({
    default: false,
  })
  private vertical: boolean;

  @Prop({
    default: 120,
  })
  private width: number;

  @Prop({
    default: false,
  })
  private dark: boolean;

  get appLogo() {
    return '../assets/logo.png';
  }

  private get APP_VERSION() {
    return version
        .split('.')
        .slice(0, 3)
        .join('.');
  }
}
</script>

<style lang="scss" scoped>
.dis-app-logo {
  display: inline-flex;

  svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  img {
    display: block;
    max-width: 100%;
  }
}

/*// Horiz variant*/
.dis-app-logo--horiz {
  .dis-app-logo__version {
    display: none;
  }

  img {
    max-height: 40px;
  }
}

// Vertical variant
.dis-app-logo--vert {
  flex-direction: column;
  text-align: center;

  svg {
    margin-left: auto;
    margin-right: auto;
  }

  img {
    margin-left: auto;
    margin-right: auto;
    max-height: 60px;
  }
}
</style>
