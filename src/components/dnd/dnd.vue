<template>
  <div class="container mt-5">
    <div class="row">
      <!------------- - card backlog -------------->
      <div class="col-md-3">
        <v-card color="#E0F7FA" class="inprogress-wrapper">
          <v-card-title>Backlog</v-card-title>
          <v-card-text class="text--primary">
            <draggable class="v-list-group fig-height" :list="arrBacklog" group="tasks">
              <div
                class="list-group-item"
                v-for="element in arrBacklog"
                :key="element.id">
                <v-card>
                  <v-card-text class="mt-1">
                    {{ element.detail }}
                  </v-card-text>
                </v-card>
              </div>
            </draggable>
          </v-card-text>
        </v-card>
      </div>
      <!-------------- card InProgress -------------->
      <div class="col-md-3">
        <v-card class="inprogress-wrapper">
          <v-card-title>InProgress</v-card-title>
          <v-card-text class="text--primary">
            <draggable class="v-list-group fig-height" :list="arrInProgress" group="tasks">
              <div
                class="list-group-item"
                v-for="element in arrInProgress"
                :key="element.id">
                <v-card>
                  <v-card-text class="mt-1">
                    {{ element.detail }}
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-row>
                      <v-col>
                        <!-- <v-chip :color="orange"> -->
                        <v-chip>
                          {{ timer }}
                        </v-chip>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn
                          color="success"
                          fab
                          small
                          dark
                          @click="$emit('start',(element.id))"
                        >
                          <v-icon>mdi-motion-play</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col>
                        <!-- ส่งrequirement id  -->
                        <v-btn
                          color="error"
                          fab
                          small
                          dark
                          @click="$emit('stop', timer, (element.id) )"
                        >
                          <v-icon>mdi-motion-pause</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </div>
            </draggable>
          </v-card-text>
        </v-card>
      </div>
      <!-------------- card Done -------------->
      <div class="col-md-3">
        <v-card class="inprogress-wrapper">
          <v-card-title>Done</v-card-title>
          <v-card-text class="text--primary">
            <draggable class="v-list-group fig-height" :list="arrDone" group="tasks">
              <div
                class="list-group-item"
                v-for="element in arrDone"
                :key="element.id"
              >
                <v-card>
                  <v-card-text class="mt-1">
                    {{ element.detail }}
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <div class="my-2">
                      <v-btn
                        small
                        color="primary"
                        dark
                        @click.stop="(dialog = true), updateReqDone(element.id)"
                      >
                        Ready to UAT
                      </v-btn>
                      <v-dialog v-model="dialog" max-width="290">
                        <v-card>
                          <v-card-title class="headline">
                            Your task will be test
                          </v-card-title>
                          <v-card-text>
                            Will notify you of the test results in Unit
                            Automation Test ( UAT )
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="green darken-1"
                              text
                              @click="dialog = false"
                            >
                              Good luck
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                  </v-card-actions>
                </v-card>
              </div>
            </draggable>
          </v-card-text>
        </v-card>
      </div>
      <!-- end card -->
      <!------------- - card UAT -------------->
      <div class="col-md-3">
        <v-card class="inprogress-wrapper">
          <v-card-title>Result Test</v-card-title>
          <v-card-text class="text--primary">
            <draggable
              class="v-list-group fig-height"
              :list="arrUnitAutomationTest"
              group="tasks"
            >
            <div  
                v-for="element in arrUnitAutomationTest"
                :key="element.id"
              >
                <v-expansion-panels class="message">
                  <v-expansion-panel > 
                      <v-expansion-panel-header>
                        {{ element.detail }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div
                          v-for="review in element.comment"
                          :key="review.id">
                            <div class="message-box">
                              <p> comment :{{review.comment}}</p>
                              <div class="message-timestamp-left">{{formatTime(review.createdAt)}}</div>
                            </div>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
              </div>
              <!-- <div
                class="list-group-item"
                v-for="element in arrUnitAutomationTest"
                :key="element.id"
              >
                <v-card>
                  <v-card-text class="mt-1">
                    {{ element.detail }}
                  </v-card-text>
                  <v-btn icon>
                    <v-icon>
                      mdi-comment-text
                    </v-icon>
                  </v-btn>
                  <v-card-actions>
                    <div
                      v-for="review in element.review"
                      :key="review.id">
                      <v-card-text>
                        <v-icon class="mr-2">mdi-account-star</v-icon>
                        {{ review }}
                      </v-card-text>
                    </div>
                  </v-card-actions>
                </v-card>
              </div> -->
            </draggable>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import StatusProvider from "@/resources/StatusProvider";
import ComentProvider from "@/resources/CommentProvider";
import RequirementProvider from "../../resources/RequirementProvider";
import dayjs from "dayjs"
import { getUser } from "../../utils/js/Auth";

const StatusService = new StatusProvider();
const requirementService = new RequirementProvider();
const comentService = new ComentProvider()

export default {
  props: ["timer", "state"],

  components: {
    draggable,
  },

  data: () => ({
    // DnD Data
    newTask: "",
    status: "",
    arrBacklog: [],
    arrInProgress: [],
    arrDone: [],
    arrUnitAutomationTest: [],
    dialog: false,
    user: {},
  }),
  computed: {
    userId() {
      return this.$route.params.id ? this.$route.params.id : 0;
    },
  },
  async mounted() {
    this.user = await getUser();
    this.showInPro();
    this.showDone();
    this.showResultTest();
    this.showRequirement();
  },
  methods: {
    async showRequirement() {
      const { data } = await requirementService.getRequirementByUserId(this.user.sub); //ส่งค่าของ user_ID
      const fillter = data.filter(req => req.status !== 'incedent')
      this.arrBacklog = await fillter.map((requirment) => {
        return {
          id: requirment.id,
          detail: requirment.detail,
          status: requirment.status,
        }
      })
    },
    async getCommentById(reqId) {
      const {data} = await comentService.getComment(reqId) 
      return data
    },
    formatTime(time) {
      return dayjs(time).format(`DD-MM-YYYY`)
    },
    async showInPro() {
      const { data } = await requirementService.getReqInprogress(this.user.sub); //ส่งค่าของ user_ID
      this.arrInProgress = data
    },

    async showDone() {
      const { data } = await requirementService.getReqDone(this.user.sub); //ส่งค่าของ user_ID
      this.arrDone = data
    },
    async showResultTest() {
      const { data } = await requirementService.getRepair(this.user.sub); //ส่งค่าของ user_ID
      this.arrUnitAutomationTest = data
      console.log(data);
    },
    async updateReqDone(req_id) {
      await requirementService.updateRequirement(req_id,{task: 2,});
      this.showInPro();
      this.showDone();
      this.showResultTest();
      this.showRequirement();
    },
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
    } catch (err) {
      this.setSnackbar({
        message: err.message,
        // type: "pink",
        active: true,
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.inprogress-wrapper{
  height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
}
.fig-height{
  min-height: 360px;
}
.message {
  border: 1px solid #E0E0E0  ;
}
.message-box {
  position: relative;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #A8DDFD;
  width: 80%;
  height: 80px;
  text-align: left;
  font: 400 .9em 'Open Sans', sans-serif;
  border: 1px solid #97C6E3;
  border-radius: 10px;
  .message-timestamp-left {
    position: absolute;
    font-size: .85em;
    font-weight: 300;
    bottom: 5px;
    left: 5px;
  }
}
</style>
