<template>
  <v-card class="pb-0 mb-0" max-width="100%" height="100%">
    <v-card-title class="justify-center">
        <!-- Table Shere Thing -->
      <v-btn
        color="primary"
        dark
        fab
        x-large
        class="mt-6"
        @click.stop="openDialogShare()">
        <v-icon >
          mdi-thought-bubble
        </v-icon>
      </v-btn>
      <TableShare v-model="dialogThink" />
    </v-card-title>
    <v-window v-model="step" class="px-5">
      <!-- All Task  Page -->
      <v-window-item :value="1"> 
        <h2 class="text-left">All Project</h2>
        <v-expansion-panels focusable>
          <v-expansion-panel v-for="(item, i) in projects" :key="i" :disabled="item.status === 'incident'">
            <v-expansion-panel-header>
              {{ item.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card
                v-for="requirement in item.requirements"
                :key="requirement.id"
                color="grey lighten-5"
                class="black--text mt-5">
                  <v-card-title primary-title>
                    <v-row>
                      <v-col cols="6">
                        <p style="color: black">
                          {{ requirement.detail }}
                        </p>
                      </v-col>
                      <v-col cols="6">
                        {{requirement.user? requirement.user.firstName + requirement.user.lastName: 'Empty' }}
                        <v-chip>
                          {{requirement.task?requirement.task.name: 'Empty'}}
                        </v-chip>
                        <br />
                        <v-icon @click="openDialogImg(requirement)">
                          mdi-folder-multiple-image
                        </v-icon>
                        <v-icon
                          class="ml-4"
                          @click="openDialogFile(requirement)">
                          mdi-folder-edit
                        </v-icon>
                      </v-col>
                    </v-row>
                  </v-card-title>
                    <Dialog v-model="dialogFileImg"  :dialogMode="dialogMode"/>
                    <!------------------- end --------------------->
                <!-- Select user and Date -->
                <v-card-actions>
                  <!-- Select user -->
                  <v-select
                    style="margin-top: 23px"
                    @click="
                      addrequirementuser(
                        item.team.id,
                        requirement.id,
                        requirement.user_id
                      )
                    "
                    v-model="requirement.selectedUser"
                    :items="userlist"
                    item-value="id"
                    label="Choose Your Users"
                    dense
                    solo
                  >
                    <template
                      slot="selection"
                      slot-scope="{ item }">
                      {{ item.firstName }} -
                      {{ item.lastName }}
                    </template>
                    <template
                      slot="item"
                      slot-scope="{ item }">
                      {{ item.firstName }} -
                      {{ item.lastName }}
                    </template>
                  </v-select>
                  <v-btn
                    style="margin:0px 0px 0px 25px"
                    rounded
                    color="success"
                    dark
                    @click="addUserToRequirement(requirement.id,requirement.selectedUser)" >
                    save
                  </v-btn>
                  <!-- End Select user -->
                  <v-spacer />
                  <!-- comment -->
                </v-card-actions>
                <!-- End comment -->

                <!-- End select user and Date -->
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-window-item>
      <!------------------------------------------------ Working area ------------------------------------------------------------->
      <v-window-item :value="2">
        <dnd
          :timer="formattedTime"
          :state="timerState"
          @start="start"
          @stop="stop"
        />
      </v-window-item>
    </v-window>
    <!-- Customer Page -->
    <v-divider />
    <v-card-actions>
      <v-btn :disabled="step === 1" text @click="step--"> Back </v-btn>
      <v-spacer />
      <v-btn :disabled="step === 2" color="primary" depressed @click="step++">
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProjectProvider from "@/resources/ProjectProvider";
import RequirementProvider from "@/resources/RequirementProvider";
import UserProvider from "@/resources/UserProvider";
import { getUser } from "@/utils/js/Auth";

import Dnd from "../../../components/dnd/dnd.vue";
import TableShare from '../components/Table-share.vue';
import Dialog from '../components/Dialog'

const projectService = new ProjectProvider();
const requirementService = new RequirementProvider();
const usersService = new UserProvider();


export default {
  components: {
    Dnd, TableShare,Dialog
  },

  data: () => ({
    step: 1,
    projects: [],
    user: "",
    postList: [],
    dataId: "",
    dialog: false,
		dialogFileImg: false,
    dialogMode: {
      imgMode: false,
      data: {}
    },
    dialogThink:false,
    userlist: [],
    loading: false,
    newStatus: "",
    requirement: [],
    selectedUser: "",
    selectedRequirement: "",
    marker: true,
    // DnD
    timerState: "stopped",
    currentTimer: 0,
    formattedTime: "00:00:00",
    ticker: undefined,
  }),
  mounted() {
    this.user = getUser();
    this.getAllProjects();
  },
  methods: {
    async getAllProjects() {
      try {
        const { data } = await projectService.getProjectUserFind(this.user.sub);
        this.projects = data;
      } catch (err) {
        console.log(err);
      }
    },
    async addrequirementuser(teamId, requirement_id, user_id) {
      const { data } = await usersService.getuserrequriement(teamId);
      try {
        this.selectedRequirement = requirement_id;
        if (user_id) {
          this.selectedUser = user_id;
        }
        this.userlist = data;
      } catch (error) {
        console.error("error");
      }
    },
    async updateRequirement() {
      let isSelected = this.confirmUser();
      if (!isSelected) {
        return;
      }
      const payload = {
        user: this.selectedUser,
      };
      await requirementService.updateRequirement(
        this.selectedRequirement,
        payload
      );
      this.dialog = false;
      this.$emit("update-requirement");
      this.selectedUser = "";
    },
    openDialogShare() {
      this.dialogThink = true
    },
    openDialogImg(img) {
      this.dialogFileImg = true
      this.dialogMode = {
        imgMode: true,
        data: img
      }
    },
    openDialogFile(file) {
      this.dialogFileImg = true
      this.dialogMode = {
        imgMode: false,
        data: file
      }
    },
    start(req_Id) {
      requirementService.updateRequirement(req_Id, {task: 1,})
      if (this.timerState !== "running") {
        this.tick();
        this.timerState = "running";
      }
    },
    stop(timer, reqId) {
      window.clearInterval(this.ticker);
      this.currentTimer = 0;
      this.formattedTime = "00:00:00";
      this.timerState = "stopped";
      console.log('time',timer,'id',reqId);    
      // ส่ง requirement_id และเวลาลงที่ createReport ใน ReportPovider
    },
    tick: function() {
      this.ticker = setInterval(() => {
        this.currentTimer++;
        this.formattedTime = this.formatTime(this.currentTimer);
      }, 1000);
    },
    formatTime(times) {
      let hours = "00";
      let minutes = "00";
      let seconds = "00";
      hours += Math.floor(times / 3600).toString();
      hours = hours.slice(-2);
      times = times - Number(hours * 3600);
      minutes += Math.floor(times / 60).toString();
      minutes = minutes.slice(-2);
      times = times - Number(minutes * 60);
      seconds += times;
      seconds = seconds.slice(-2);
      return `${hours}:${minutes}:${seconds}`;
    },
    async addUserToRequirement(requirement_id, user_id) {
      const payload = {user: user_id}
      await requirementService.updateRequirement(requirement_id, payload);
    },
  },
};
</script>
