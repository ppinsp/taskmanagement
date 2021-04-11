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
              <v-card v-bind="attrs" v-on="on" class="ma-6">
                <v-card-actions> </v-card-actions>
                <!----------------------- cade of Project name ------------------------->
                <v-card-title
                  class="pb-0 mb-3 justify-center "
                  style="font-family:'Google Sans',Roboto,sans-serif; line-height:1.1;"
                >
                  {{ element.name }}
                </v-card-title>
                <!-- <v-divider></v-divider> -->
                <v-card-text class="text--secondary rtl">
                  <!-- <v-icon>mdi-clock-start</v-icon> -->
                  timeAll
                </v-card-text>

                <!----------------------- end ------------------------->
              </v-card>
            </template>

            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>
                  <div justify-center>
                    Detail of { Project Name }
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
      { text: "Time", value: "report" },
    ],
  }),
  mounted() {
    this.showReport();
    this.showReportReq();
  },
  methods: {
    async showReport() {
      const { data } = await ReportService.getReport();
      //   data.forEach((p) => {
      //     const project = p.project.map((project) => project.name);
      //     this.arrReport.push({ project });
      //   });
      this.arrReport = data;
    },

    async showReportReq() {
      const { data }  = await ReportService.getReportReq(1); /// ส่ง project Id ที่คลิก 
      //console.log('data', data)
      this.arrReqT = data.map((r) => {
        const report = r.report.length > 0 ? r.report.reduce((total, acc) => total + this.timeCompute(acc.time), 0) : 0
        const reqName = r.detail
        //console.log('req',reqName)
        return { ...r, report, reqName}
      });
      //console.log('arrReq', this.arrReqT)
    },
    timeCompute(times) {
      const mapped = times.split(':')
      return (+mapped[0] * 360) + (+mapped[1] * 60) + (+mapped[2])
    }
  },
};
</script>
