<template>
  <div class="container mt-5">
    <div class="row">
      <!------------- - card backlog -------------->
      <div class="col-md-3">
        <v-card>
          <v-card-title>Backlog</v-card-title>
          <v-card-text class="text--primary">
            <draggable class="v-list-group" :list="arrBacklog" group="tasks">
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
            <draggable class="v-list-group" :list="arrInProgress" group="tasks">
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
                          @click="$emit('start')"
                        >
                          <v-icon>mdi-motion-play</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col>
                        <v-btn
                          color="error"
                          fab
                          small
                          dark
                          @click="$emit('stop')"
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
            <draggable class="v-list-group" :list="arrDone" group="tasks">
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
                        @click.stop="dialog = true , updateReqDone()"
                      >
                        Ready to UAT
                      </v-btn>
                      <v-dialog v-model="dialog" max-width="290">
                        <v-card>
                          <v-card-title class="headline">
                            Your task will be test
                          </v-card-title>
                          <v-card-text
                          >
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
              class="v-list-group"
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
    await this.getData();
  },
  methods: {
    async showRequirement() {
      const { data } = await requirementService.getRequirementByUserId(1); //ส่งค่าของ user_ID
      data.map((n) => {
        // console.log(n.id);
        if (n.task == null) {
          this.arrBacklog.push({ name: n.detail });
        }
      });
    },

    async showInPro() {
      const { data } = await requirementService.getReqInprogress(1); //ส่งค่าของ user_ID
      data.map((I) => {
        this.arrInProgress.push({ name: I.detail });
      });
    },

    async showDone() {
      const { data } = await requirementService.getReqDone(1); //ส่งค่าของ user_ID
      data.map((D) => {
        this.arrDone.push({ name: D.detail });
      });
    },

    async showResultTest() {
      const { data } = await requirementService.getRepair(1); //ส่งค่าของ user_ID
      data.map((R) => {
        this.arrUnitAutomationTest.push({ name: R.detail });
      });
    },
    async updateReqDone() {
      await requirementService.updateRequirement(
        8, //ส่งRequirement id นั้นๆไป
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
