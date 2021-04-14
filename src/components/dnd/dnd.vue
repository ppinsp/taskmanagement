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
                :key="element.name"
              >
                <v-card>
                  <v-card-text class="mt-1">
                    {{ element.name }}
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
                :key="element.name"
              >
                <v-card>
                  <v-card-text class="mt-1">
                    {{ element.name }}
                  </v-card-text>
                  <v-divider></v-divider>

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
                      <v-col class="ml-3">
                        <v-btn
                          color="success"
                          fab
                          small
                          dark
                          @click="$emit('start', element.id)"
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
                          @click="$emit('stop', timer, element.id )"
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
                :key="element.name"
              >
                <v-card>
                  <v-card-text class="mt-1">
                    {{ element.name }}
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
                :key="element.name"
              >
                <v-card>
                  <v-card-text class="mt-1">
                    {{ element.name }}
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
    ////////////////
    dialog: false,
    user: '',
  }),
  computed: {
    userId() {
      return this.$route.params.id ? this.$route.params.id : 0;
    },
  },
  async mounted() {
    this.showInPro();
    this.showDone();
    this.showResultTest();
    this.showRequirement();
    this.user = getUser();
    // await this.getData();
  },
  methods: {
    async showRequirement(user) {
      console.log('user',user)
      const { data } = await requirementService.getRequirementByUserId(user); //ส่งค่าของ user_ID
      data.map((n) => {
        // console.log(n.id);
        if (n.task == null) {
          this.arrBacklog.push({ name: n.detail });
        }
      });
    },

    async showInPro() {
      const { data } = await requirementService.getReqInprogress(1); //ส่งค่าของ user_ID
      console.log('data',data)
      data.map((I) => {
        this.arrInProgress.push({ name: I.detail, id: I.id });
      });

    },

    async showDone() {
      const { data } = await requirementService.getReqDone(1); //ส่งค่าของ user_ID
      data.map((D) => {
        this.arrDone.push({ name: D.detail , id: D.id});
      });
    },

    async showResultTest() {
      const { data } = await requirementService.getRepair(1); //ส่งค่าของ user_ID
      data.forEach((R) => {
        const review = R.review.map((review) => review.opinion);
        this.arrUnitAutomationTest.push({ name: R.detail, review });
      });
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
      console.log(this.status);
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
