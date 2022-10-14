<template>
  <app-page :loading="loading" :title="'Projects'">
    <template v-slot:header>
      <v-dialog v-model="add" max-width="600" transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" outlined v-bind="attrs" v-on="on">
            Add New
          </v-btn>
        </template>
        <template v-slot:default>
          <v-card class="xs:hidden sm:hidden">
            <v-toolbar class="title primary" dark>
              Create New Project
            </v-toolbar>
            <v-card-text>
              <div class="mt-4 mb-2">
                <v-text-field v-model="newProject.projectName" label="Name" outlined></v-text-field>
                <v-text-field v-model="newProject.amount" label="Project Amount" outlined></v-text-field>
                <v-select
                    v-model="newProject.client"
                    :items="clients"
                    label="Select Client"
                    outlined
                ></v-select>
              </div>
            </v-card-text>
            <v-card-actions class="justify-space-between">
              <v-btn @click="add=false">Close</v-btn>
              <v-btn class="white--text primary" @click="addProject()">
                Save
              </v-btn>
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
            <th>Client</th>
            <th>Amount</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items" :key="item.name">
            <td>{{ item.projectName }}</td>
            <td>{{ item.client }}</td>
            <td>

              {{ item.amount }} USD
            </td>
            <td>
              <v-dialog v-model="deleteP" max-width="600" transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      class="mx-2"
                      color="primary"
                      dark
                      fab
                      outlined
                      primary
                      small
                      v-bind="attrs"
                      v-on="on"
                  >
                      <span class="material-symbols-outlined">
                        delete
                      </span>
                  </v-btn>
                </template>
                <template v-slot:default>
                  <v-card class="xs:hidden sm:hidden">
                    <v-toolbar class="title primary" dark>
                      Delete Project
                    </v-toolbar>
                    <v-card-text>
                      <div class="justify-center">
                        <h2 class="mt-8 mb-4 ">
                          Are you Sure you want to delete
                          <span class="font-bold red--text"> {{ item.projectName }}</span>
                          Project ?
                        </h2>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <v-btn @click="deleteP=false">Close</v-btn>
                      <v-btn class="white--text primary" @click="deleteProject(item)">
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
import ProjectAPI from '@/services/api/project.service';
@Component({})
export default class Projects extends Vue {
  private loading = false;
  private add = false;
  private deleteP = false;
  private newProject = {
    projectName: '',
    client: ' ',
    amount: 0,
    projectId: 10
  };
  private clients = [
    'TestClient',
    'Naeem',
    'TestClient2'
  ];
  private items = [];

  private async created() {
    await this.getAllProjects();
  }

  private async getAllProjects() {
    this.loading = true;
    await ProjectAPI.projectList()
        .then((res) => {
          this.items = res.data;
          this.loading = false;
        })
        .catch((err) => {
          throw err;
        });
  }

  private addProject() {
    ProjectAPI.save(this.newProject).then((res) => {
      if (res) {
        this.add = false;
        this.getAllProjects();
      }
    }).catch((err) => {
      throw err;
    });
  }
  private deleteProject(Data: any) {
    ProjectAPI.delete(Data.projectId).then((res) => {
      this.deleteP = false;
      this.getAllProjects();
    }).catch((err) => {
      throw err;
    });
  }

}
</script>
