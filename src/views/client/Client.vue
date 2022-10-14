<template>
  <app-page :title="'Client'">
    <v-container>
      <v-dialog v-model="addClient" max-width="600" transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" outlined v-bind="attrs" v-on="on">Add New</v-btn>
        </template>
        <template v-slot:default>
          <v-card class="xs:hidden sm:hidden">
            <v-toolbar class="primary title" dark>Add Client</v-toolbar>
            <v-card-text>
              <v-text-field v-model="item.clientName" class="mt-4" label="name" outlined></v-text-field>
              <v-text-field v-model="item.email" class="mt-4" label="Email" outlined type="email"></v-text-field>
              <v-textarea v-model="item.address" auto-grow label="Address" outlined></v-textarea>
            </v-card-text>
            <v-card-actions class="justify-space-between">
              <v-btn color="primary" dark outlined @click="addClient= false">Close</v-btn>
              <v-btn class="primary white--text" @click="saveClient">Save</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items" :key="item.name">
            <td>{{ item.clientName }}</td>
            <td>{{ item.address }}</td>
            <td></td>
            <td></td>
            <td>
              <v-menu
                  bottom
                  left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                  >
                    mdi-dots-vertical
                  </v-icon>
                </template>

                <v-list>
                  <v-list-item
                      v-for="(menuItem, i) in contextMenuItems"
                      :key="i"
                  >
                    <v-list-item-title @click="menuItem.onClick(item)">
                      <v-icon>{{ menuItem.icon }}</v-icon>
                      <span>{{ menuItem.text }}</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-dialog v-model="editDialog" max-width="600" transition="dialog-bottom-transition">
                <template v-slot:default>
                  <v-card class="xs:hidden sm:hidden">
                    <v-toolbar class="primary title" dark>Edit Client</v-toolbar>
                    <v-card-text>
                      <div class="mt-4 mb-2">
                        <v-text-field v-model="data.clientName" label="Name" outlined></v-text-field>
                        <v-text-field v-model="data.email" label="email" outlined type="email"></v-text-field>
                        <v-textarea v-model="data.address" label="Address" outlined></v-textarea>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <v-btn color="primary" dark outlined @click="editDialog= false">Close</v-btn>
                      <v-btn class="primary white--text" @click="updateClient(data)">Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <v-dialog v-model="deleteDialog" max-width="600" transition="dialog-bottom-transition">
                <template v-slot:default>
                  <v-card class="xs:hidden sm:hidden">
                    <v-toolbar class="primary title" dark>Delete Client</v-toolbar>
                    <v-card-text>
                      <div class="justify-center">
                        <h2 class="mt-8 mb-4 ">
                          Are you Sure you want to delete <span class="font-bold red--text"> {{
                            data.clientName
                          }}</span> ?
                        </h2>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <v-btn color="primary" dark outlined @click="deleteDialog= false">Close</v-btn>
                      <v-btn class="primary white--text" @click="deleteClient(data)">
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
    </v-container>
  </app-page>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ClientAPI from '@/services/api/client.service';
import {Client} from '@/interfaces/Client';

@Component({})
export default class Team extends Vue {
  private editDialog = false;
  private addClient = false;
  private deleteDialog = false;
  private data: any = null;
  private item: Client = {
    address: '', email: '', clientName: '', clientId: 0
  };
  private roles = [
    'Admin',
    'User',
    'Technician'
  ];
  private items: Client[] = [];

  private get contextMenuItems() {
    return [
      {
        icon: 'mdi-pencil-circle-outline',
        text: 'Edit',
        onClick: async (item: any) => {
          this.editModal(item);
        },
      },
      {
        icon: 'mdi-delete-circle-outline',
        text: 'Delete',
        onClick: async (item: any) => {
          this.deleteModal(item);
        },
      },
    ];
  }

  getAllClients() {
    ClientAPI.clientList().then(res => {
      this.items = res.data.content;
    }).catch((err) => {
      throw err;
    });
  }

  private mounted() {
    this.getAllClients();
  }

  private editModal(item: any) {
    this.editDialog = true;
    this.data = item;
  }

  private deleteModal(item: any) {
    this.deleteDialog = true;
    this.data = item;
  }

  private saveClient() {

    ClientAPI.save(this.item).then((res) => {
      if (res) {
        this.addClient = false;
        this.getAllClients();
      }
    }).catch((err) => {
      throw err;
    });
  }

  private updateClient(data: any) {
    ClientAPI.update(data.webId, data).then((res) => {
      if (res) {
        this.getAllClients();
        this.editDialog = false;
      }
    }).catch((err) => {
      throw err;
    });
  }

  private deleteClient(data: any) {
    this.deleteDialog = false;
    ClientAPI.delete(data.webId).then((res) => {
      this.getAllClients();
    }).catch((err) => {
      throw err;
    });
  }

  private clear() {
    this.item = {
      address: '', email: '', clientName: '', clientId: 0
    };
  }
}
</script>
<style lang="scss" scoped>
.title {
  background-color: #027f84;
}
</style>
