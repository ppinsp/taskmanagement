<template>
  <div class="container mt-5">
    <div class="row">
      <!------------- - card waiting for test -------------->
      <div class="col-md-3">
        <v-card>
          <v-card-title>Waiting for Test</v-card-title>
          <v-card-text class="text--primary">
            <draggable
              class="v-list-group fig-height"
              :list="arrWaiting"
              group="tasks">
              <div
                class="list-group-item"
                v-for="element in arrWaiting"
                :key="element.id">
                <v-card color="#E0F7FA" class="mt-3">
                  <v-card-subtitle>
                    <v-icon class="mr-2">mdi-account-star</v-icon>
                    {{ element.user }}
                  </v-card-subtitle>
                  <v-divider />
                  <v-card-text class="mt-1">
                    {{ element.name }}
                  </v-card-text>
                </v-card>
              </div>
            </draggable>
          </v-card-text>
        </v-card>
      </div>

      <!------------- - card UAT -------------->
      <div class="col-md-6">
        <v-card width="100%">
          <v-card-title>Testing</v-card-title>
          <v-card-text class="text--primary">
            <draggable
              class="v-list-group fig-height"
              :list="arrUAT"
              group="tasks">
              <div
                class="list-group-item"
                v-for="element in arrUAT"
                :key="element.index" >
                <v-card color="#E0F7FA">
                  <v-card-text class="mt-1">
                    {{ element.id }}
                    {{ element.name }}
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-row>
                      <v-col>
                        <v-dialog v-model="dialog" width="500">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              text
                              icon
                              color="blue lighten-2"
                              class="ml-6"
                              depressed
                              v-bind="attrs"
                              v-on="on">
                              <v-icon>mdi-thumb-up</v-icon>
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title class="headline grey lighten-2">
                              Ready to Pre Production
                            </v-card-title>
                            <v-card-text>
                              <div class="mt-5 ml-5">
                                <v-row>
                                  Has this task been tested very well ?
                                </v-row>
                                <v-row class="mt-3">
                                  <v-icon color="#FF80AB">
                                    mdi-rocket-launch
                                  </v-icon>
                                  <v-icon color="#880E4F" class="ml-4">
                                    mdi-emoticon-kiss-outline
                                  </v-icon>
                                </v-row>
                              </div>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer />
                              <v-btn
                                color="primary"
                                text
                                @click="updatePrepoduction(element.id), dialog = false">
                                Yes, task ready
                              </v-btn>
                              <v-btn
                                color="error"
                                text
                                @click="updateTesting(element.id)">
                                No
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-col>
                      <!-------------------------------------------- ปุมไม่ผ่าน -------------------------------------------->
                      <v-col class="ml-5">
                        <v-dialog v-model="dialogErr" width="500">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              text
                              icon
                              color="red lighten-2"
                              class="ml-6"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon>mdi-thumb-down</v-icon>
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title class="headline grey lighten-2">
                              Send back to fix the error
                            </v-card-title>
                            <v-card-text>
                              <div class="mt-5 ml-5">
                                <v-row>
                                  Does this task have an error that you want
                                  to fix?
                                </v-row>
                                <v-row class="mt-3">
                                  <v-icon color="#FF80AB">
                                    mdi-emoticon-dead
                                  </v-icon>
                                  <v-icon color="#880E4F" class="ml-4">
                                    mdi-window-close</v-icon>
                                </v-row>
                              </div>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer />
                              <v-btn
                                color="primary"
                                text
                                @click="updateRepair(element.id)">
                                Yes, Send back
                              </v-btn>

                              <v-btn
                                color="error"
                                text
                                @click="updateTesting(element.id)">
                                No
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-col>
                      <v-col class="ml-6">
                        <v-btn icon @click="seeComent(element.id),(show =! show)" right class="ml-6">
                          <v-icon>
                            mdi-comment-text
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider />
                      <v-card-text>
                        <div class="comment-wrapper">
                            <div v-for="comment in comments" :key="comment.id">
                              <div class="message-blue">
                                <v-row>
                                  <v-col cols="12">
                                      <span >{{yourComment(comment.username)? 'You': comment.username.firstName}}</span>
                                      : <p class="message-content">{{comment.comment}}</p>
                                  </v-col>
                                </v-row>
                                <div class="message-timestamp-left">{{comment.createdAt}}</div>
                              </div>
                            </div>
                          </div>
                          <v-row class="mt-5">
                            <v-text-field
                              v-model="message"
                              label="Sent Comment"
                              solo
                              class="ml-3"
                            />
                            <v-btn icon @click="sendComment(element.id)">
                              <v-icon class="mt-2" color="#1A237E">
                                mdi-send
                              </v-icon>
                            </v-btn>
                        </v-row>
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </div>
            </draggable>
          </v-card-text>
        </v-card>
      </div>
      <!------------- - card UAT -------------->
      <div class="col-md-3">
        <v-card>
          <v-card-title>Production</v-card-title>
          <v-card-text class="text--primary">
            <draggable
              class="v-list-group fig-height"
              :list="arrpreProduction"
              group="tasks"
            >
              <div
                class="list-group-item"
                v-for="element in arrpreProduction"
                :key="element.name"
              >
                <v-card color="#E0F2F1">
                  <v-card-text class="mt-1">
                    {{ element.name }}
                  </v-card-text>
                </v-card>
              </div>
            </draggable>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import RequirementProvider from "../../../resources/RequirementProvider";
import ComentProvider from "../../../resources/CommentProvider";
import dayjs from "dayjs"
import { getUser } from "@/utils/js/Auth";

const requirementService = new RequirementProvider();
const comentService = new ComentProvider()

export default {
  components: {
    draggable,
  },

  data: () => ({
    arrWaiting: [],
    arrUAT: [],
    arrpreProduction: [],
    show: false,
    last: false,
    message: '',
    headers: [{ text: "comment", align: "center", value: "comment" }],
    comments: [],
    dialog: false,
    dialogErr: false,
    user: {},
  }),
  async mounted() {
    this.user = getUser();
    this.showDone();
    this.showPrepo();
    this.showTesting();
  },
  methods: {
    async showDone() {
      this.arrWaiting = []
      const { data } = await requirementService.getReqDone(this.user.sub); //ส่งค่าของ user_ID
      data.map((D) => {
        this.arrWaiting.push({
          arrD: D,
          name: D.detail,
          user: `${D.user.firstName} ${D.user.lastName}`,
          id: D.id
        });
      });
    },
    async seeComent(reqId) {
      const {data} = await comentService.getComment(reqId)
      const rawComment = data.map((comment) => {
        return {
          id: comment.id,
          username: comment.userId,
          createdAt: dayjs(comment.createdAt).format('MMM D, YYYY h:mm A'),
          comment: comment.comment
        }
      })
      this.comments = rawComment  
    },
    yourComment(user) {
      if (this.user.sub === user.id ) {
        return true
      }
      else {
        return false
      }
    },
    async sendComment(reqId) {
      const payload = {
        comment: this.message,
        requirementId: reqId,
        fileUpload: null,
        imageUpload: null
      }
      await comentService.createComment(payload)
      await this.seeComent(reqId)
    },
    async updatePrepoduction(reqment_Id) {
      await requirementService.updateRequirement(reqment_Id, {
        //ส่งRequirement id นั้นๆไป
        task: 4,
      });
      this.showDone();
      this.showPrepo();
      this.showTesting();
    },
    async updateTesting(reqment_Id) {
      this.dialog = false
      this.dialogErr = false
      await requirementService.updateRequirement(reqment_Id, {
        //ส่งRequirement id นั้นๆไป
        task: 3,
      });
      this.showDone();
      this.showPrepo();
      this.showTesting();
    },
    async updateRepair(reqment_Id) {
      this.dialogErr = false
      await requirementService.updateRequirement(reqment_Id, {
        //ส่งRequirement id นั้นๆไป
        task: 5,
      });
      this.showDone();
      this.showPrepo();
      this.showTesting();
    },
    async showPrepo() {
      this.arrpreProduction = []
      const { data } = await requirementService.getPrepo(this.user.sub); //user_id
      data.map((P) => {
        this.arrpreProduction.push({ name: P.detail, id: P.id });
      });
    },
    async showTesting() {
      this.arrUAT =[]
      const { data } = await requirementService.getTesting(this.user.sub); //user_id
      data.map((T) => {
        this.arrUAT.push({ name: T.detail, id: T.id });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.fig-height {
  min-height: 360px;
}
.comment-wrapper {
  width: 500px;
  height: 500px;
  max-height: 500px;
  overflow-y: scroll;
  padding: 10px;
  background: white;
  .message-blue {
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
    .message-content {
      padding: 0;
      margin: 5px 0;
    }
    .message-timestamp-left {
      position: absolute;
      font-size: .85em;
      font-weight: 300;
      bottom: 5px;
      left: 5px;
    }
  }
}

</style>
