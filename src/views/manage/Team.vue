<template>
  <app-page :loading="loading" :title="'Team Management'">
    <template v-slot:header>
      <v-dialog
          v-model="addTeam"
          max-width="600"
          transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" outlined v-bind="attrs" v-on="on"
          >Add New
          </v-btn
          >
        </template>
        <template v-slot:default>
          <v-card class="xs:hidden sm:hidden">
            <v-toolbar class="primary title" dark>Add User</v-toolbar>
            <v-card-text>
              <v-text-field
                  v-model="item.firstName"
                  class="mt-4"
                  label="First Name"
                  outlined
              ></v-text-field>
              <v-text-field
                  v-model="item.lastName"
                  class="mt-4"
                  label="Last Name"
                  outlined
              ></v-text-field>
              <v-text-field
                  v-model="item.phoneNumber"
                  class="mt-4"
                  label="Phone Number"
                  outlined
              ></v-text-field>
              <v-text-field
                  v-model="item.email"
                  class="mt-4"
                  label="Email"
                  outlined
                  type="email"
              ></v-text-field>
              <v-text-field
                  v-model="item.userPassword"
                  class="mt-4"
                  label="Password"
                  outlined
                  type="password"
              ></v-text-field>
              <v-text-field
                  v-model="item.userAddress"
                  class="mt-4"
                  label="Address"
                  outlined
              ></v-text-field>
              <v-select
                  v-model="item.role"
                  :items="roles"
                  label="Select Role"
              ></v-select>
              <v-select
                  v-model="item.gender"
                  :items="['Male','Female','Prefer not to say']"
                  label="Gender"
              ></v-select>
            </v-card-text>
            <v-card-actions class="justify-space-between">
              <v-btn color="primary" dark outlined @click="addTeam = false">Close</v-btn>
              <v-btn class="white--text primary" @click="saveTeam">Save</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </template>
    <template>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>
              <v-dialog max-width="600" transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">
                    mdi-plus-circle-outline
                  </v-icon>
                  Role
                </template>
                <template v-slot:default="dialog">
                  <v-card class="xs:hidden sm:hidden">
                    <v-toolbar class="primary" dark>Add roles</v-toolbar>
                    <v-form ref="form">
                      <v-container grid-list-md>
                        <v-layout row wrap>
                          <v-flex sm6>
                            <v-text-field
                                ref="autofocus"
                                v-model="model.externalKey"
                                :label="'Role Key'"
                            ></v-text-field>
                          </v-flex>
                          <v-flex sm6>
                            <v-text-field
                                v-model="model.title"
                                :label="'Title'"
                                name="title"
                                validate-on-blur
                            ></v-text-field>
                          </v-flex>
                          <v-flex sm6>
                            <v-text-field
                                v-model="model.roleCode"
                                :label="'Role Code'"
                                name="RoleCode"
                                validate-on-blur
                            ></v-text-field>
                          </v-flex>
                          <v-flex sm6>
                            <v-select
                                v-model="permissionId"
                                :items="permissions"
                                :label="'Permissions'"
                                :multiple="true"
                                chips
                                name="Permissions"
                                validate-on-blur
                            ></v-select>
                          </v-flex>
                          <v-flex sm6>
                            <v-text-field
                                v-model="model.description"
                                :label="'Description'"
                                name="description"
                                validate-on-blur
                            ></v-text-field>
                          </v-flex>
                          <v-flex sm6>
                            <v-text-field
                                v-model="model.use"
                                :label="'Use'"
                                name="use"
                                placeholder="STAFF|CUSTOMER"
                                validate-on-blur
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                    <v-card-actions class="justify-space-between">
                      <v-btn color="primary" dark outlined @click="dialog.value = false">Close</v-btn>
                      <v-btn class="primary white--text" @click="addRole">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items" :key="item.webId">
            <td>{{ item.firstName + " " + item.lastName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.role }}</td>
            <td></td>
            <td>
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="primary" v-bind="attrs" v-on="on">
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
              <v-dialog
                  v-model="editDialog"
                  max-width="600"
                  transition="dialog-bottom-transition"
              >
                <template v-slot:default>
                  <v-card class="xs:hidden sm:hidden">
                    <v-card-title class="title primary" dark
                    >Edit
                    </v-card-title
                    >
                    <v-card-text>
                      <v-row class="my-auto">
                        <v-col cols="6">
                          <v-text-field
                              v-model="data.firstName"
                              label="First Name"
                          ></v-text-field>
                          <v-text-field
                              v-model="data.email"
                              label="Email"
                          ></v-text-field>
                          <v-select
                              v-model="data.role"
                              :items="roles"
                              label="Select Role"
                          ></v-select>
                          <v-text-field
                              v-model="data.userPassword"
                              label="Old Password"
                              type="password"
                          ></v-text-field>
                          <v-text-field
                              v-model="data.newPassword"
                              label="New Password"
                              type="password"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                              v-model="data.lastName"
                              label="Last Name"
                          ></v-text-field>
                          <v-text-field
                              v-model="data.hours"
                              label="Daily work time complexity"
                          >
                          </v-text-field>
                          <v-text-field
                              v-model="data.phoneNumber"
                              label="Phone Number"
                          ></v-text-field>
                          <v-select
                              v-model="data.gender"
                              :items="['Male','Female','Prefer not to say']"
                              label="Gender"
                          ></v-select>
                          <v-text-field
                              v-model="data.newPassword"
                              label="Confirm Password"
                              type="password"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <v-btn
                          color="primary"
                          dark
                          outlined
                          @click="editDialog = false"
                      >Close
                      </v-btn
                      >
                      <v-btn
                          class="white--text primary"
                          @click="updateTeam(data)"
                      >Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <v-dialog
                  v-model="deleteDialog"
                  max-width="600"
                  transition="dialog-bottom-transition"
              >
                <template v-slot:default>
                  <v-card class="xs:hidden sm:hidden">
                    <v-toolbar class="primary" dark>Delete</v-toolbar>
                    <v-card-text>
                      <div class="justify-center">
                        <h2 class="mt-8 mb-4">
                          Are you Sure you want to delete
                          <span class="font-bold red--text">
                              {{ data.firstName + data.lastName }}</span
                          >
                          ?
                        </h2>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <v-btn
                          color="primary"
                          dark
                          outlined
                          @click="deleteDialog = false"
                      >Close
                      </v-btn
                      >
                      <v-btn
                          class="primary white--text"
                          @click="deleteTeam(data)"
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
    </template>
  </app-page>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TeamAPI from '@/services/api/team.service';
import RoleAPI from '@/services/api/role.service';
import {TeamMember} from '@/interfaces/User';
import {IPermission} from '@/interfaces/roles';
import PermissionsAPI from '@/services/api/permissions.service';

@Component({})
export default class Team extends Vue {
  public roles = [];
  private loading = false;
  private items: any = [];
  private model: any = {
    active: false,
    branch: 0,
    description: '',
    editable: false,
    externalKey: '',
    permissions: [],
    role: false,
    roleCode: '',
    roleId: 0,
    title: '',
    use: undefined,
    webId: 0
  };
  private editDialog = false;
  private addTeam = false;
  private deleteDialog = false;
  private data: any = null;
  private item: TeamMember = {
    active: false,
    email: '',
    hours: '',
    name: '',
    newPassword: '',
    phoneNumber: '',
    password: '',
    role: '',
  };
  private permissions: any[] = [];
  private permissionId: any[] = [];

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

  private async created() {
    await this.getAllUsers();
    await this.getAllRoles();
  }

  private editModal(item: any) {
    this.editDialog = true;
    this.data = item;
  }

  private deleteModal(item: any) {
    this.deleteDialog = true;
    this.data = item;
  }

  private saveTeam() {
    this.addTeam = false;
    this.item.active = true;
    TeamAPI.save(this.item)
        .then((res) => {
          if (res) {
            this.getAllUsers();
            this.clear();
          }
        })
        .catch((err) => {
          throw err;
        });
  }

  private updateTeam(data: any) {
    this.editDialog = false;
    TeamAPI.update(data.webId, data)
        .then((res) => {
          if (res) {
            this.getAllUsers();
          }
        })
        .catch((err) => {
          throw err;
        });
  }

  private deleteTeam(data: any) {
    this.deleteDialog = false;
    TeamAPI.delete(data.webId)
        .then((res) => {
          if (res) {
            this.getAllUsers();
          }
        })
        .catch((err) => {
          throw err;
        });
  }

  private clear() {
    this.item = {
      active: false,
      email: '',
      hours: '',
      name: '',
      newPassword: '',
      phoneNumber: '',
      password: '',
      role: '',
    };
    this.data = {
      active: false,
      email: '',
      hours: '',
      name: '',
      newPassword: '',
      phoneNumber: '',
      password: '',
      role: '',
    };
    this.model = {
      active: false,
      branch: 0,
      description: '',
      editable: false,
      externalKey: '',
      permissions: [],
      role: false,
      roleCode: '',
      roleId: 0,
      title: '',
      use: undefined,
      webId: 0
    };
  }

  private async getAllUsers() {
    this.loading = true;
    const res = await TeamAPI.usersList();
    this.items = res.data.content;
    this.loading = false;
  }

  private async getPermissions() {
    const res = await PermissionsAPI.list({active: true});
    this.permissions = res.data.content.map((permission: IPermission) => {
      return {
        text: permission.title,
        value: permission.webId
      };
    });
  }

  private async getAllRoles() {
    this.loading = true;
    const params = {
      active: true
    };
    await this.getPermissions();
    const res = await RoleAPI.roleList(params);
    this.roles = res.data.content.map((role: any) => {
      this.loading = false;
      return {
        text: role.description,
        value: role.description
      };
    });
  }

  private async addRole() {
    const result = (this.$refs.form as Vue & { validate: () => boolean }).validate();
    if (result) {
      this.model.permissions = this.permissionId.map((object: any) => ({webId: object}));
      RoleAPI.save(this.model).then((res) => {
        if (res) {
          this.clear();
          this.getAllRoles();
        }
      }).catch((err) => {
        throw err;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
