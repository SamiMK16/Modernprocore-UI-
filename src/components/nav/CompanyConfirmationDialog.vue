<template>
  <div class="text-xs-center">
    <app-modal
      v-model="syncedValue"
      :title="$t('default.change-company')"
      :close-on-confirm="false"
      @close="hide"
      @confirm="confirm"
      @reject="reject"
      :max-width="$attrs.maxWidth || '480px'"
      confirm-label="Proceed"
    >
      <v-card>
        <v-card-text class="body-2 py-0">
          <div class="body-2 py-2">{{ $t('default.change-company-confirmation') }}</div>
          <v-checkbox
            color="primary"
            v-model="hideWarning"
            :label="$t('default.never-display-this-warning')"
          ></v-checkbox>
        </v-card-text>
      </v-card>
    </app-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CompanyConfirmationDialog extends Vue {
  @Prop({ type: Boolean, default: false })
  private readonly value: boolean;

  private hideWarning = false;

  private get syncedValue(): boolean {
    return this.value;
  }

  private set syncedValue(val: boolean) {
    this.$emit('input', val);
  }

  private reject() {
    this.syncedValue = false;
    this.$emit('reject', this.hideWarning);
  }

  private confirm() {
    this.syncedValue = false;
    this.$emit('confirm', this.hideWarning);
  }

  private hide() {
    this.hideWarning = false;
  }
}
</script>

<style></style>
