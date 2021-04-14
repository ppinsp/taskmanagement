<template>
  <v-card class="pb-0 mb-0" max-width="100%" height="100%">
    <v-card-title class="title font-weight-regular justify-center">
      <span>
        <!-- Table Shere Thing -->
        <div class="mt-6">
          <v-btn
            color="primary"
            dark
            icon
            justify="center"
            @click.stop="dialogThink = true"
          >
            <v-icon size="80" class="mt-6">
              mdi-thought-bubble
            </v-icon>
          </v-btn>

          <v-dialog v-model="dialogThink" width="450">
            <v-card>
              <v-card-text>
                <v-icon> </v-icon>
              </v-card-text>
              <v-card-text>
                <v-icon justify-center>
                  mdi-head-dots-horizontal
                </v-icon>
              </v-card-text>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="messages"
                  item-key="name"
                  class="elevation-1 justify-center"
									
                >
                </v-data-table>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <div justify-center mr-5>
                  <v-text-field
                    class="mr-6"
                    v-model="message"
                    filled
                    clear-icon="mdi-send"
                    clearable
                    label="Sent message"
                    type="text"
                    @click:clear="sendMessage"
                    solo-inverted
                  ></v-text-field>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <!-- {{ currentTitle }} -->
      </span>
      <!-- <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar> -->
    </v-card-title>

    <v-window v-model="step">
      <!-- All Task  Page -->
      <v-window-item :value="1">
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col class="ml-6">
              <v-simple-table class="ml-6">
                <thead>
                  <tr>
                    <th class="text-left">All Project</th>
                  </tr>
                </thead>

                <tbody>
                  <td>
                    <template>
                      <v-expansion-panels focusable>
                        <v-expansion-panel v-for="(item, i) in data" :key="i">
                          <v-expansion-panel-header>
                            {{ item.name }}
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-card-text>
                              <v-layout row>
                                <v-flex>
                                  <v-card max-width="50%">
                                    <v-container fluid grid-list-lg>
                                      <v-layout row wrap>
                                        <v-flex xs12>
                                          <!-- create panel  -->
                                          <!-- Master card of Requirement -->
                                          <v-card
                                            v-for="(requirement,
                                            index) in item.requirements"
                                            :key="index"
                                            color="grey lighten-5"
                                            class="black--text mt-5"
                                          >
                                            <v-layout row>
                                              <v-flex xs6>
                                                <v-card-text primary-title>
                                                  <div>
                                                    <p style="color: black">
                                                      {{ requirement.detail }}
                                                    </p>
                                                  </div>
                                                </v-card-text>
                                              </v-flex>
                                              <v-flex xs5>
                                                <span v-if="requirement.user"
                                                  >By:
                                                  {{
                                                    requirement.user.firstName
                                                  }}
                                                  {{
                                                    requirement.user.lastName
                                                  }}</span
                                                >
                                                <div v-else>Empty</div>
                                                <br />
                                                <div>
                                                  <!-- <v-chip :color="pink"> -->
                                                  <v-chip>
                                                    <span
                                                      v-if="requirement.task"
                                                      >{{
                                                        requirement.task.name
                                                      }}</span
                                                    >
                                                    <span v-else>Empty</span>
                                                  </v-chip>
                                                </div>
                                                <br />
                                                <!------------------- icon  show Image --------------------->
                                                <v-icon @click="dialogImg = true">
                                                  mdi-folder-multiple-image
                                                </v-icon>
                                                <v-dialog
                                                  v-model="dialogImg"
                                                  max-width="290"
                                                >
                                                  <v-card>
                                                    <v-card-title
                                                      class="headline"
                                                    >
                                                      imageUpload
                                                    </v-card-title>

                                                    <v-card>
                                                      <v-avatar
                                                        class="ma-3"
                                                        size="125"
                                                        tile
                                                      >
                                                        <img
                                                          :src="
                                                            requirement.imageUpload
                                                          "
                                                          width="300"
                                                          alt=""
                                                        />
                                                      </v-avatar>
                                                    </v-card>
                                                  </v-card>
                                                </v-dialog>
                                                <!------------------- end --------------------->
                                                <!------------------- icon  show file --------------------->
                                                <v-icon
                                                  class="ml-4"
                                                  @click="dialogFile = true"
                                                >
                                                  mdi-folder-edit
                                                </v-icon>
                                                <v-dialog
                                                  v-model="dialogFile"
                                                  max-width="290"
                                                >
                                                  <v-card>
                                                    <v-card-title
                                                      class="headline"
                                                    >
                                                      fileUpload
                                                    </v-card-title>
                                                    <v-card-text>
                                                      <a
                                                        :href="
                                                          requirement.fileUpload
                                                        "
                                                        target="_blank"
                                                        >{{
                                                          requirement.fileUpload
                                                        }}
                                                      </a>
                                                    </v-card-text>
                                                  </v-card>
                                                </v-dialog>
                                                <!------------------- end --------------------->
                                              </v-flex>
                                            </v-layout>
                                            <v-divider light></v-divider>
                                            <!-- Select user and Date -->
                                            <v-card-actions>
                                              <!-- test<v-icon
                medium
                color=" grey darken-1"
                @click="addrequirementuser(item.team.id, requirement.id, requirement.user_id)"
                >mdi-account-multiple-plus</v-icon
              > -->
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
                                                v-model="
                                                  requirement.selectedUser
                                                "
                                                :items="userlist"
                                                item-value="id"
                                                label="Choose Your Users"
                                                dense
                                                solo
                                              >
                                                <template
                                                  slot="selection"
                                                  slot-scope="{ item }"
                                                >
                                                  {{ item.firstName }} -
                                                  {{ item.lastName }}
                                                </template>
                                                <template
                                                  slot="item"
                                                  slot-scope="{ item }"
                                                >
                                                  {{ item.firstName }} -
                                                  {{ item.lastName }}
                                                </template>
                                              </v-select>
                                              <v-btn
                                                style="margin:0px 0px 0px 25px"
                                                rounded
                                                color="success"
                                                dark
                                                @click="
                                                  addUserToRequirement(
                                                    requirement.id,
                                                    requirement.selectedUser
                                                  )
                                                "
                                              >
                                                save
                                              </v-btn>
                                              <!-- End Select user -->

                                              <v-spacer> </v-spacer>

                                              <!-- comment -->
                                              <v-btn
                                                icon
                                                @click="
                                                  getComment(
                                                    requirement.id,
                                                    item.id
                                                  )
                                                "
                                              >
                                                <v-icon>
                                                  mdi-comment-text
                                                </v-icon>
                                              </v-btn>
                                            </v-card-actions>
                                            <v-slide-y-transition>
                                              <v-card-text v-show="show">
                                                <!-- show Comment -->
                                                <v-data-table
                                                  :headers="headerComment"
                                                  :items="requirement.comments"
                                                  item-key="name"
                                                  hide-default-footer
                                                  class="elevation-1"
                                                  color="primary"
                                                >
                                                  <!-- <v-chip :color='orange'>
                                            {{ comment }}
                                          </v-chip> -->
                                                </v-data-table>
                                                <!-- Sent Comment -->
                                                <v-text-field
                                                  v-model="
                                                    requirement.newComment
                                                  "
                                                  filled
                                                  clearable
                                                  label="Sent comment"
                                                  type="text"
                                                  @keydown.enter="
                                                    addComment(
                                                      requirement.id,
                                                      requirement.newComment,
                                                      item.id
                                                    )
                                                  "
                                                ></v-text-field>
                                              </v-card-text>
                                            </v-slide-y-transition>
                                            <!-- End comment -->

                                            <!-- End select user and Date -->
                                          </v-card>
                                        </v-flex>
                                      </v-layout>
                                    </v-container>
                                  </v-card>
                                </v-flex>
                              </v-layout>
                            </v-card-text>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </template>
                  </td>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
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
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :disabled="step === 1" text @click="step--"> Back </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="step === 3" color="primary" depressed @click="step++">
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProjectProvider from "@/resources/ProjectProvider";
import RequirementProvider from "@/resources/RequirementProvider";
import UserProvider from "@/resources/UserProvider";
import StatusProvider from "@/resources/StatusProvider";
import { getUser } from "@/utils/js/Auth";
import Dnd from "../../../components/dnd/dnd.vue";
import CommentProvider from "@/resources/CommentProvider";
import ChatProvider from "@/resources/ChatProvider";

const StatusService = new StatusProvider();
const projectService = new ProjectProvider();
const requirementService = new RequirementProvider();
const usersService = new UserProvider();
const commentService = new CommentProvider();
const chatService = new ChatProvider();

export default {
  components: {
    Dnd,
  },

  data: () => ({
    step: 1,
    show: false,
    date: new Date().toISOString().substr(0, 10),
    menu2: false,
    search: "",
    ShereThing: "",
    searchText: "",
    data: "",
    projectuserfind: "",
    user: "",
    postList: [],
    dataId: "",
    dialog: false,
		dialogImg: false,
		dialogFile: false,
    dialogThink:false,
    userlist: [],
    team: 0,
    valid: false,
    loading: false,
    newStatus: "",
    isNew: false,
    requirement: [],
    selectedUser: "",
    selectedRequirement: "",
    messages: [],
    comments: [],
    password: "Password",
    message: " ",
    marker: true,
    iconIndex: 0,
    icons: [
      "mdi-emoticon",
      "mdi-emoticon-cool",
      "mdi-emoticon-dead",
      "mdi-emoticon-excited",
      "mdi-emoticon-happy",
      "mdi-emoticon-neutral",
      "mdi-emoticon-sad",
      "mdi-emoticon-tongue",
    ],
    // DnD
    timerState: "stopped",
    currentTimer: 0,
    formattedTime: "00:00:00",
    ticker: undefined,
    laps: [],
    latestLap: "",

    dialogMassage: false,
    notifications: false,
    sound: true,
    widgets: false,

    dialogImage: false,
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "  ";
        case 2:
          return " Task Satatus ";
        default:
          return "Review by Customer";
      }
    },
    headers() {
      return [
        {
          text: "Shere THING",
          align: "start",
          sortable: false,
          value: "massages",
        },
      ];
    },
    headerComment() {
      return [
        {
          text: "comments",
          align: "start",
          sortable: false,
          value: "comment",
        },
      ];
    },
    icon() {
      return this.icons[this.iconIndex];
    },
  },
  methods: {
    async getData() {
      // this.loading = true;
      try {
        //const query = `search=${this.searchText}`;
        // const { data } = await projectService.getAllProject(query);
        const { data } = await projectService.getProjectUserFind(this.user.sub);

        //console.log(this.user.sub)
        //console.log(data)
        this.data = data;
        //const { dataproject } = await projectService.getProjectById(12)
        console.log("show arr", this.data[1].team);
        //console.log(dataproject)
      } catch (err) {
        console.log(err);
      } finally {
        // this.loading = false;
      }
    },
    async getMessage() {
      const { data } = await chatService.getChat();
      data.map((m) => {
        this.messages.push({ massages: m.massages });
      });
    },
    async dialogControl() {
      await this.addrequirementuser();
    },
    async addrequirementuser(id, requirement_id, user_id) {
      this.dialog = true;
      try {
        this.selectedRequirement = requirement_id;
        console.log("user_idddd", user_id);
        if (user_id) {
          this.selectedUser = user_id;
        }
        const { data } = await usersService.getuserrequriement(id);
        this.userlist = data;
        console.log("team name", data);
      } catch (error) {
        console.error("error");
      } finally {
        // do nothing
      }
    },
    async getusersrequirement() {
      try {
        // const {data} = await usersService.getuserrequriement()
        //this.userlist = data;
        console.log("team id", this.team);
      } catch (error) {
        console.error("error");
      } finally {
        // do nothing
      }
    },
    addUser(id) {
      this.selectedUser = id;
    },
    async updateRequirement() {
      let isSelected = this.confirmUser();
      if (!isSelected) {
        return;
      }
      const payload = {
        user: this.selectedUser,
      };
      const result = await requirementService.updateRequirement(
        this.selectedRequirement,
        payload
      );
      this.dialog = false;
      this.$emit("update-requirement");
      console.log("result = ", result);
      this.selectedUser = "";
    },
    async getStatus() {
      try {
        const {
          data: { results },
        } = await StatusService.getStatusTasks();
        this.status = results.map((item) => {
          item.isEdit = false;
          return item;
        });
        console.log(this.status);
      } catch (err) {
        this.setSnackbar({
          message: err.message,
          // type: "pink",
          active: true,
        });
      }
    },
    async updateStatus(index) {
      try {
        const result = await StatusService.updateStatusTaskBar(
          this.status[index].id,
          {
            name: this.status[index].name,
          }
        );
        if (!result) {
          throw { message: "อัพเดตข้อมูลผิดพลาด" };
        }
        this.status[index].isEdit = false;
        this.setSnackbar({
          message: "อัพเดตสำเร็จ",
          type: "green",
          active: true,
        });
      } catch (error) {
        this.setSnackbar({
          message: error.message,
          // type: "pink",
          active: true,
        });
      }
    },
    async deleteStatus(id, index) {
      try {
        const result = await StatusService.deleteStatusTaskBar(id);
        if (!result) {
          throw { message: "อัพเดตข้อมูลผิดพลาด" };
        }
        this.status.splice(index, 1);
        console.log("index", index);
        this.setSnackbar({
          message: "ลบข้อมูลสำเร็จ",
          type: "green",
          active: true,
        });
      } catch (error) {
        this.setSnackbar({
          message: error.message,
          // type: "pink",
          active: true,
        });
      }
    },
    async createStatusTask() {
      try {
        this.loading = true;
        if (!this.newStatus) {
          throw { message: "กรุณาใส่ข้อมูล" };
        }
        const { data } = await StatusService.createStatusTaskBar({
          name: this.newStatus,
        });
        if (!data) {
          throw { message: "พบข้อผิดพลาด" };
        }
        this.status.push({ isEdit: false, ...data });
        this.setSnackbar({
          message: "Create Status success.",
          type: "success",
          active: true,
        });
      } catch (err) {
        this.setSnackbar({
          message: err.message,
          // type: "pink",
          active: true,
        });
      } finally {
        this.loading = false;
        this.newStatus = "";
        this.isNew = false;
      }
    },

    async sendMessage() {
      const result = await chatService.createChat({ massages: this.message });
      this.resetIcon();
      this.clearMessage();
      if (result) {
        this.$router.go();
      }
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },

    start: function(req_Id) {
      console.log('r',req_Id)
      requirementService.updateRequirement(
        req_Id, 
        {
          task: 1,
        }
      );

      if (this.timerState !== "running") {
        this.tick();
        this.timerState = "running";
      }
    },
    stop: function(timer, reqId) {
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
        // console.log('currentTimer', this.currentTimer)
        // console.log('formattedTime', this.formattedTime)
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
      await requirementService.updateRequirement(requirement_id, {
        user: user_id,
      });
    },
    async addComment(requirementId, comment, projectId) {
      const result = await commentService.createComment({
        requirementId,
        comment,
      });
      if (result.data) {
        const projectIndex = this.data.findIndex(
          (project) => project.id === projectId
        );
        const requirementIndex = this.data[projectIndex].requirements.findIndex(
          (requirement) => requirement.id === requirementId
        );
        this.data[projectIndex].requirements[requirementIndex].comments.push(
          result.data
        );
        this.data[projectIndex].requirements[requirementIndex].newComment = "";
      }
    },
    async getComment(requirement_id, project_id) {
      if (!this.show) {
        const { data } = await commentService.getComment(requirement_id);
        const projectIndex = this.data.findIndex(
          (project) => project.id === project_id
        );
        const requirementIndex = this.data[projectIndex].requirements.findIndex(
          (requirement) => requirement.id === requirement_id
        );
        this.data[projectIndex].requirements[requirementIndex].comments = data;
      }
      this.show = !this.show;
    },
  },
  async mounted() {
    // this.getProject();
    this.user = getUser();
    this.getStatus();
    this.getMessage();
    await this.getData();
    // console.log(this.user.sub)
  },
};
</script>
