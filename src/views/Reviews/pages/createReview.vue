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
              group="tasks"
              @change="onMoveCallback"
            >
              <div
                class="list-group-item"
                v-for="element in arrWaiting"
                :key="element.name"
              >
                <v-card color="#E0F7FA">
                  <v-card-subtitle>
                    <div v-for="element in arrWaiting" :key="element.user">
                      <v-icon class="mr-2">mdi-account-star</v-icon>
                      {{ element.user }}
                    </div>
                  </v-card-subtitle>
                  <v-divider></v-divider>
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
            <draggable class="v-list-group fig-height" :list="arrUAT" group="tasks">
              <div
                class="list-group-item"
                v-for="element in arrUAT"
                :key="element.name"
              >
                <v-card color="#E0F7FA">
                  <v-card-text class="mt-1">
                    {{ element.name }}
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <!-- <v-btn color="primary" depressed>
                      <v-icon left>
                        {{ icons.mdiDelete }}
                      </v-icon>
                      Delete
                    </v-btn> -->
                    <div>
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
                                v-on="on"
                              >
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
                                      mdi-emoticon-kiss-outline</v-icon
                                    >
                                  </v-row>
                                </div>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="primary"
                                  text
                                  @click=" dialog = false ,updatePrepoduction()"
                                >
                                  Yes, task ready
                                </v-btn>

                                <v-btn
                                  color="error"
                                  text
                                  @click="dialog = false, updateTesting()"
                                >
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
                                      mdi-window-close</v-icon
                                    >
                                  </v-row>
                                </div>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="primary"
                                  text
                                  @click="dialogErr = false , updateRepair()"
                                >
                                  Yes, Send back
                                </v-btn>

                                <v-btn
                                  color="error"
                                  text
                                  @click="dialogErr = false, updateTesting()"
                                >
                                  No
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-col>

                        <v-col class="ml-6">
                          <v-btn icon @click="show = !show" right class="ml-6">
                            <v-icon>
                              mdi-comment-text
                            </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider></v-divider>

                      <v-card-text>
                        <v-row>
                          <v-data-table
                            :headers="headers"
                            :items="desserts"
                            class="elevation-1"
                          >
                            <template v-slot:item.comment="{ item }">
                              <v-chip :color="getColor(item.comment)" dark>
                                {{ item.comment }}
                              </v-chip>
                            </template>
                          </v-data-table>
                        </v-row>
                        <v-row class="mt-5">
                          <v-text-field
                            v-model="last"
                            label="Sent Comment"
                            solo-inverted
                            class="ml-3"
                          >
                          </v-text-field>
                          <v-btn icon>
                            <v-icon class="mt-2" color="#1A237E"
                              >mdi-send</v-icon
                            >
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
          <v-card-title>Pre Production</v-card-title>
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
const requirementService = new RequirementProvider();

export default {
  components: {
    draggable,
  },

  data: () => ({
    arrWaiting: [],
    arrUAT: [],
    arrpreProduction: [],
    show: false,
    headers: [{ text: "comment", align: "center", value: "comment" }],
    desserts: [
      {
        comment: " hi ",
      },
    ],
    dialog: false,
    dialogErr: false,
  }),
  computed: {},
  async mounted() {
    this.showDone();
    this.showPrepo();
    this.showTesting();
  },
  methods: {
    async showDone() {
      const { data } = await requirementService.getReqDone(1); //ส่งค่าของ user_ID
      data.map((D) => {
        this.arrWaiting.push({
          name: D.detail,
          user: `${D.user.firstName} ${D.user.lastName}`,
        });
      });
    },
    //if user_id == ${id}
    getColor(comment) {
      if (comment > 400) return "red";
      else if (comment > 200) return "orange";
      else return "green";
    },

    async updatePrepoduction() {
      await requirementService.updateRequirement(
        8,{//ส่งRequirement id นั้นๆไป
          task: 4
        }
      )
    },
    async updateTesting() {
      await requirementService.updateRequirement(
        8,{//ส่งRequirement id นั้นๆไป
          task: 3
        }
      )
    },
    async updateRepair() {
      await requirementService.updateRequirement(
        8,{//ส่งRequirement id นั้นๆไป
          task: 5
        }
      )
    },

    async showPrepo(){
      const { data } = await requirementService.getPrepo(1)
      data.map((P) => {
        this.arrpreProduction.push({name: P.detail});
      })
    },

    async showTesting(){
      const { data } = await requirementService.getTesting(1);
      data.map((T) => {
        this.arrUAT.push({name: T.detail})
      })
    }

  },
};
</script>
<style>
.fig-height{
  min-height: 360px;
}
</style>

