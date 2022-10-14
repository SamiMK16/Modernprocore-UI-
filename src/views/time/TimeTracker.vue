<template>
  <app-page :loading="loading" :title="'Time Tracker'">
    <template>
      <div class="set justify-center justify-space-around">
        <v-select v-model="item.title" :items="projects" class="size" label="Projects"></v-select>
        <v-select v-model="item.user" :items="users" class="size ml-2" label="Select User"></v-select>
        <v-btn fab plain>
          <v-icon :color="dollarAble?'primary':''" @click="getAmount">
            mdi-currency-usd
          </v-icon>
        </v-btn>
        <v-dialog v-model="addAmount" max-width="600" transition="dialog-bottom-transition">
          <template v-slot:default>
            <v-card class="xs:hidden sm:hidden">
              <v-toolbar class="title primary" dark>Add User Amount</v-toolbar>
              <v-card-text>
                <div class="mt-4 mb-2">
                  <v-text-field v-model="item.amount" :rules="amountRules" label="Add Amount" outlined
                                validate-on-blur></v-text-field>
                </div>
              </v-card-text>
              <v-card-actions class="justify-space-between">
                <v-btn class="outline" @click="nonAmount()">Cancel</v-btn>
                <v-btn
                    class="white--text primary"
                    @click="getAmount"
                >
                  Save
                </v-btn
                >
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <v-dialog v-model="editDialog" max-width="600" transition="dialog-bottom-transition">
          <template v-slot:default>
            <v-card class="xs:hidden sm:hidden">
              <v-card-title class="title primary" dark>Edit</v-card-title>
              <v-card-text>
                <div class="mt-4 mb-2">
                  <v-text-field v-model="data.title" label="Name"></v-text-field>
                  <v-text-field v-model="data.user" label="Users"></v-text-field>
                  <v-text-field v-model="data.amount" label="Amount"></v-text-field>
                  <v-dialog ref="dialog" v-model="modal1" :return-value.sync="data.startTime" persistent
                            width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="data.startTime" label="Start Time" readonly v-bind="attrs"
                                    v-on="on"></v-text-field>
                    </template>
                    <v-time-picker v-if="modal1" v-model="startTime" full-width>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="modal1 = false">
                        Cancel
                      </v-btn>
                      <v-btn color="primary" text @click="changeTime('modal1')">
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                  <v-dialog ref="dialog" v-model="modal2" :return-value.sync="data.endTime" persistent
                            width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="data.endTime" label="End Time" v-bind="attrs" v-on="on">
                      </v-text-field>
                    </template>
                    <v-time-picker v-if="modal2" v-model="endTime" :min="data.startTime" full-width>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="modal2 = false">
                        Cancel
                      </v-btn>
                      <v-btn color="primary" text @click="changeTime('modal2')">
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                </div>
              </v-card-text>
              <v-card-actions class="justify-space-between">
                <v-btn color="primary" dark outlined @click="editDialog= false">Close</v-btn>
                <v-btn class="white--text primary" @click="updateTrack(data)">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <v-dialog ref="dialog" v-model="modal1" color="primary" persistent
                  width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="item.startTime" label="Start Time" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-time-picker v-if="modal1" v-model="item.startTime" full-width>
            <v-spacer></v-spacer>
            <v-btn class="outline" text @click="modal1 = false">
              Cancel
            </v-btn>
            <v-btn color="primary" text @click="$refs.dialog.save(item.startTime)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
        <v-dialog ref="dialog2" v-model="modal2" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="item.endTime" class="mx-1" label="End Time" v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-time-picker v-if="modal2" v-model="item.endTime" :min="item.startTime" full-width>
            <v-spacer></v-spacer>
            <v-btn color="outline" text @click="modal2 = false">
              Cancel
            </v-btn>
            <v-btn color="primary" text @click="$refs.dialog2.save(item.endTime)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
        <v-btn class="white--text mt-3" color="primary" medium plain rounded @click="saveTrack">
          <v-icon>
            mdi-clock-check-outline
          </v-icon>
          <span>save</span>
        </v-btn>
      </div>
      <div class="mt-5">
        <div class="table">
          <span class="text-h5 font-weight-medium">Today</span>
          <v-spacer></v-spacer>
          <span>Total Time Spent<span class="text-h5 font-weight-medium mt-1">{{ times }}</span> </span>
        </div>
      </div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th>Project Name</th>
            <th>User</th>
            <th>Amount</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items" :key="item.name">
            <td><span> {{ item.title }}</span></td>
            <td><span> {{ item.user }}</span></td>
            <td><span> {{ item.amount }}</span></td>
            <td><span> {{ item.startTime }}</span></td>
            <td><span> {{ item.endTime }}</span></td>
            <td>
            </td>
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
                    <v-card-title class="title primary" dark>Edit</v-card-title>
                    <v-card-text>
                      <div class="mt-4 mb-2">
                        <v-text-field v-model="data.title" label="Name"></v-text-field>
                        <v-text-field v-model="data.user" label="Users"></v-text-field>
                        <v-text-field v-model="data.amount" label="Amount"></v-text-field>
                        <v-dialog ref="dialog" v-model="modal1" :return-value.sync="data.startTime" persistent
                                  width="290px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="data.startTime" label="Start Time" readonly v-bind="attrs"
                                          v-on="on"></v-text-field>
                          </template>
                          <v-time-picker v-if="modal1" v-model="startTime" full-width>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="modal1 = false">
                              Cancel
                            </v-btn>
                            <v-btn color="primary" text @click="changeTime('modal1')">
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                        <v-dialog ref="dialog" v-model="modal2" :return-value.sync="data.endTime" persistent
                                  width="290px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="data.endTime" label="End Time" v-bind="attrs" v-on="on">
                            </v-text-field>
                          </template>
                          <v-time-picker v-if="modal2" v-model="endTime" full-width>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="modal2 = false">
                              Cancel
                            </v-btn>
                            <v-btn color="primary" text @click="changeTime('modal2')">
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <v-btn color="primary" dark outlined @click="editDialog= false">Close</v-btn>
                      <v-btn class="white--text primary" @click="updateTrack(data)">
                        Save
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
                          Are you Sure you want to delete <span class="font-bold red--text"> {{ data.title }}</span> ?
                        </h2>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <v-btn color="primary" dark outlined @click="deleteDialog= false">Close</v-btn>
                      <v-btn class="primary white--text" @click="deleteTrack(data)">
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
    </template>
  </app-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TimeTrackingAPI from '@/services/api/timetracking.service';
import {TimeTracking} from '@/interfaces/TimeTracking';
import ProjectAPI from '@/services/api/project.service';
import TeamAPI from '@/services/api/team.service';

@Component({})
export default class Home extends Vue {
  private loading = false;
  private dollarAble = false;
  //  private time= null
  private modal1 = false;
  private modal2 = false;
  private times = '12:06:06';
  private projects = [];
  private startTime = null;
  private amountRules: Array<(v: number) => string | boolean> = [];
  private endTime = null;
  private addAmount = false;
  private editDialog = false;
  private deleteDialog = false;
  private data: any = [];
  private users: any = [];
  private roles = [
    'Admin',
    'User',
    'Technician'
  ];
  private item: TimeTracking = {
    name: '',
    amount: 0,
    user: '',
    startTime: '',
    endTime: '',
    trackerId: 0
  };
  private items: TimeTracking[] = [];

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

  private get calculatedTime() {
    this.items.map(time => {
      console.log(time.startTime, time.endTime);
    });
    return null;
  }

  getTimeTracks() {
    TimeTrackingAPI.getList().then((res) => {
      if (res) {
        this.items = res.data;
        this.loading = false;
      }
    }).catch((err: any) => {
      throw err;
    });
  }

  nonAmount() {
    this.item.amount = 0;
    this.addAmount = false;
    this.dollarAble = false;
  }

  private mounted() {
    this.amountRules = [
      v => !!v || 'Amount is required',
      v => /\d/.test(v.toString()) || 'Amount must be in number',
      v => v > 0 || 'Amount must be in number',
    ];
    this.getTimeTracks();
    this.getAllProjects();
    this.getAllUsers();
    const time = this.calculatedTime;

  }

  private getAmount() {
    this.dollarAble = true;
    this.addAmount = !this.addAmount;
  }

  private async getAllUsers() {
    this.loading = true;
    const res = await TeamAPI.usersList();
    this.users = res.data.content.map(user => {
      return {
        text: user.firstName + ' ' + user.lastName,
        value: user.userId
      };
    });
  }

  private editModal(item: any) {
    this.editDialog = true;
    this.data = item;
  }

  private deleteModal(item: any) {
    this.deleteDialog = true;
    this.data = item;
  }

  private changeTime(modal: string) {
    if (modal === 'modal1') {
      this.modal1 = false;
      this.data.startTime = this.startTime;
    } else if (modal === 'modal2') {
      this.modal2 = false;
      this.data.endTime = this.endTime;
    }
  }

  private saveTrack() {
    for (let user of this.users) {
      if (user.value === this.item.user) {
        this.item.user = user.text;
        break;
      }
    }
    TimeTrackingAPI.save(this.item).then((res) => {
      if (res) {
        this.clear();
        this.getTimeTracks();
      }
    }).catch((err) => {
      this.clear();
      throw err;
    });
  }

  private updateTrack(data: any) {
    this.editDialog = false;
    TimeTrackingAPI.update(data.trackerId, data).then((res) => {
      if (res) {
        this.getTimeTracks();
      }
    }).catch((err) => {
      throw err;
    });
  }

  private deleteTrack(data: any) {
    this.deleteDialog = false;
    TimeTrackingAPI.delete(data.trackerId).then((res) => {
      this.getTimeTracks();
    }).catch((err) => {
      throw err;
    });
  }

  private async getAllProjects() {
    this.loading = true;
    await ProjectAPI.projectList()
        .then((res) => {
          this.projects = res.data.map((project: any) => {
            return {
              text: project.projectName,
              value: project.webId
            };
          });
        })
        .catch((err) => {
          throw err;
        });
  }

  private clear() {
    this.item = {
      name: '',
      trackerId: 0,
      amount: 0,
      user: '',
      startTime: '',
      endTime: '',
    };
  }
}
</script>

<style scoped>
.v-select {
  width: 80px;
}

.size {
  width: 400px;
}

.set {
  display: flex;
}

.table {
  display: flex;
}

.title {
  display: flex;
}

@media (max-width: 700px) {
  .title {
    margin-top: 10px;
  }

  .btn {
    text-align: right;
  }
}
</style>
