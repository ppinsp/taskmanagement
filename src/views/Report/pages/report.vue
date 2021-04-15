<template>
  <div class="container mt-5">
    <v-container class="grey lighten-5">
      <v-row class="mb-1" no-gutters>
        <div
          class="list-group-item"
          v-for="element in arrReport"
          :key="element.id"
        >
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-card
                v-bind="attrs"
                v-on="on"
                class="ma-8"
                max-width="200"
                min-width="200"
              >
                <v-card-actions> </v-card-actions>
                <!----------------------- cade of Project name ------------------------->
                <v-card-title
                  class="pb-0 mb-3 justify-center "
                  style="font-family:'Google Sans',Roboto,sans-serif; line-height:1.1; "
                  @click="showReportReq(element.ProjectId)"
                >
                  {{ element.projectName }}
                </v-card-title>
                <!-- <v-divider></v-divider> -->
                <v-card-text class="text--secondary rtl">
                  <!-- <v-icon>mdi-clock-start</v-icon> -->
                  TimeAll
                </v-card-text>

                <!----------------------- end ------------------------->
              </v-card>
            </template>

            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>
                  <div justify-center>
                    <!-- Detail of {{ nameProject }} -->
                  </div>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-list three-line subheader>
                <v-data-table
                  hide-default-footer
                  dense
                  :headers="headers"
                  :items="arrReqT"
                  item-key="name"
                  class="elevation-1 ma-6"
                ></v-data-table>
              </v-list>
              <v-divider></v-divider>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ReportProvider from "../../../resources/ReportProvider";

const ReportService = new ReportProvider();
export default {
  data: () => ({
    arrReport: [],
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    arrReqT: [],
    headers: [
      {
        text: "Requirement",
        align: "start",
        sortable: false,
        value: "reqName",
      },
      { text: "Time", value: "sum" },
    ],
    // nameProject: '',
    Time: [],
  }),
  mounted() {
    this.showReport();
    this.showReportReq();
    this.formatTime();
  },
  methods: {
    async showReport() {
      const { data } = await ReportService.getReport();
      //   data.forEach((p) => {
      //     const project = p.project.map((project) => project.name);
      //     this.arrReport.push({ project });
      //   });
      data.map((project) => {
        this.arrReport.push({
          projectName: project.name,
          ProjectId: project.id,
        });
      });

      //this.arrReport = data;
      //console.log('Project',data.id)
    },

    async showReportReq(ProjectId) {
      console.log("Project", ProjectId);
      const { data } = await ReportService.getReportReq(ProjectId);
      //console.log('data', data)
      this.arrReqT = data.map((r) => {
        const report =
          r.report.length > 0
            ? r.report.reduce(
                (total, acc) => total + this.timeCompute(acc.time),
                0
              )
            : 0;
        const reqName = r.detail;
        this.formatTime({ report });
        return { ...r, report, reqName };
      });
    },
    timeCompute(times) {
      const mapped = times.split(":");
      return +mapped[0] * 360 + +mapped[1] * 60 + +mapped[2];
    },

    //////////////////////////////////////////////
    formatTime(times) {
      //console.log('time',times['report'])
      let hours = "00";
      let minutes = "00";
      let seconds = "00";
      let sum;
      if (times) {
        hours = Math.floor(Number(times["report"]) / 3600);
        times["report"] = times["report"] - Number(hours * 3600);
        minutes = Math.floor(Number(times["report"]) / 60);
        times["report"] = times["report"] - Number(minutes * 60);
        seconds = times["report"];
        sum = `${hours} Hours ${minutes} minutes ${seconds} seconds`;
        
        //console.log("hffsfsdfsdf", sum);
      }
      return sum;
      
    },
  },
};
</script>
<style>
.ma-8 {
  min-width: 250px;
}
</style>
