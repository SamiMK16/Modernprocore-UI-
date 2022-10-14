<template>
  <app-page :loading="loading" :title="'Invoice'" class="white">
    <v-container>
      <div>
          <span class="font-weight-medium text-h5"
          >Create and Manage Invoices.</span
          >
        <ul>
          <li v-for="data in items" :key="data.id">{{ data }}</li>
        </ul>
      </div>
      <div class="mt-4">
        <v-row>
          <span class="font-weight-bold text-h5 mb-4">Invoice Items</span>
          <v-spacer></v-spacer>
          <v-btn outlined large color="primary"> Download Pdf</v-btn>
        </v-row>
        <template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th></th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="item in invoices" :key="item.name">
                <td>
                  <v-text-field v-model="item.name"></v-text-field>
                </td>
                <td>
                  <v-text-field v-model="item.quantity"></v-text-field>
                </td>
                <td>
                  <v-text-field v-model="item.unitPrice"></v-text-field>
                </td>
                <td>
                  <v-text-field v-model="item.amount"></v-text-field>
                </td>
                <td>
                  <v-dialog
                      transition="dialog-bottom-transition"
                      max-width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" color="primary">mdi-delete-circle-outline</v-icon>
                    </template>
                    <template v-slot:default="dialog">
                      <v-card class="xs:hidden sm:hidden">
                        <v-toolbar
                            class="primary"
                            dark
                        >Remove Invoice
                        </v-toolbar
                        >
                        <v-card-text>
                          <div class="justify-center">
                            <h2 class="mt-8 mb-4 red--text">
                              Are you Sure you want to remove
                              <span class="font-bold"> {{ item.name }}</span>
                              Invoice ?
                            </h2>
                          </div>
                        </v-card-text>
                        <v-card-actions class="justify-space-between">
                          <v-btn @click="dialog.value = false">Close</v-btn>
                          <v-btn
                              class="white--text primary"
                              @click="dialog.value = false"
                          >
                            Delete
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-divider></v-divider>
          <v-form class="mx-6">
            <v-spacer>
            </v-spacer>
            <v-row>
              <v-col>
                Total Amount Due
              </v-col>
              <v-col>
                <span class="font-weight-medium">
                  900.00 USD
                </span>
              </v-col>
            </v-row>
          </v-form>
        </template>
      </div>
    </v-container>
  </app-page>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ClientAPI from "@/services/api/client.service";
import Invoice from "@/router/invoice";
import InvoicesAPI from "@/services/api/inovoice.service";

@Component({})
export default class Home extends Vue {
  private loading = false;
  private clients: any = null;
  private items = [
    "Create invoices from tracked time.",
    "Edit and customize invoices.",
    "Send invoices to clients and track their status.",
    "Keep track of what was invoiced.",
  ];
  private newProject = {
    projectName: "",
    client: " ",
    amount: 0,
  };
private async beforeMount() {
  // await this.getAllClients();
  await this.getAllInvoices();
}
  private async getAllClients() {
  //   await ClientAPI.clientList().then((res) => {
  //     this.clients = res.map(client => client.name);
  //   })
  }

  private invoices: any = null;

  private async getAllInvoices() {
    await InvoicesAPI.invoicesList().then(res => {
      this.invoices = res;
    }).catch(err => {
      throw err;
    })
  }
}
</script>

<style scoped>
</style>
