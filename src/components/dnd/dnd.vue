<template>
  <div class="container mt-5">
    <div class="row">
      <!------------- - card backlog -------------->
      <div class="col-md-3">
        <v-card color="#E0F7FA">
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
        <v-card>
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
        <v-card>
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
        <v-card>
          <v-card-title>Result Test</v-card-title>
          <v-card-text class="text--primary">
            <draggable
              class="v-list-group fig-height"
              :list="arrUnitAutomationTest"
              group="tasks"
            >
              <div
                class="list-group-item"
                v-for="element in arrUnitAutomationTest"
                :key="element.id"
              >
                <v-card>
                  <v-card-text class="mt-1">
                    {{ element.detail }}
                  </v-card-text>
                  <v-card-actions>
                    <div
                      v-for="(review, index) in element.review"
                      :key="`review-index-${index}`"
                    >
                      <v-card-text>
                        <v-icon class="mr-2">mdi-account-star</v-icon>
                        {{ review }}
                      </v-card-text>
                    </div>
                  </v-card-actions>
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
import StatusProvider from "@/resources/StatusProvider";
import RequirementProvider from "../../resources/RequirementProvider";
import { getUser } from "../../utils/js/Auth";

const StatusService = new StatusProvider();
const requirementService = new RequirementProvider();

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
      const userId = getUser().sub
      const { data } = await requirementService.getRequirementByUserId(userId); //ส่งค่าของ user_ID
      this.arrBacklog = data
      // data.map((n) => {
      //   if (n.task == null) {
      //     this.arrBacklog.push({ name: n.detail, id: n.id });
      //   }
      // //   else if (n.task == 1) // InProgress
      // //   {
      // //     this.arrInProgress.push({ name: n.detail, id: n.id });
      // //   } else if (n.task == 2) //Done
      // //   {
      // //     this.arrDone.push({ name: n.detail, id: n.id});
      // //   }else if (n.task == 5) // review
      // //   {
      // //     const review = n.review.map((review) => review.opinion);
      // //   this.arrUnitAutomationTest.push({ name: n.detail, review });
      // //   }
      // });
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
    },
    async updateReqDone(req_id) {
      await requirementService.updateRequirement(
        req_id,
        {
          task: 2,
        }
      );
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
<style>
.fig-height{
  min-height: 360px;
}
</style>
