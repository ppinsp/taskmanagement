<template>
  <div class="container mt-5">
    <v-container class="grey lighten-5">
      <v-row class="mb-1" no-gutters v-if="arrReport">
        <div
          class="list-group-item"
          v-for="element in arrReport"
          :key="element.index"
        >
          <v-card
            class="ma-8"
            width="250"
            min-width="200"
            hover
            @click="showReportById(element.projectId)"
          >
            <!----------------------- cade of Project name ------------------------->
            <v-card-title
              class="pb-0 mb-3 justify-center "
              style="font-family:'Google Sans',Roboto,sans-serif; line-height:1.1; "
            >
              {{ element.projectName }}
            </v-card-title>
            <v-card-text class="text--secondary rtl">
              TimeAll : {{sumTime(element.requirements)}}
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn color="error" :disabled="element.status === 'incident'" @click.stop="setIncident(element.projectId)">incident</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <!----------------------- end ------------------------->
      </v-row>
    </v-container>
    <!-- dialog  -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            <div justify-center>
              Detail of {{ arrReqT.projectName }}
            </div>
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn dark text @click="closeDialog()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
          <v-data-table
            hide-default-footer
            dense
            :headers="headers"
            :items="arrReqT"
            item-key="id"
            class="elevation-1 ma-6"
          />
        <v-divider />
      </v-card>
    </v-dialog>
    <modal-confirm
    :active="confirm"
    :confirm-text="`Login`"
    :title="'Reset Password'"
    :message="`Please open your email for reset password`"
    :show-cancel="false"
    @onConfirm="() => { $router.push({ name: 'Login' })}" />
  </div>
</template>

<script>
import ReportProvider from "../../../resources/ReportProvider";
import ProjectProvider from "../../../resources/ProjectProvider"
import ModalConfirm from '@/components/ModalConfirm'
import { mapActions } from 'vuex'

const ReportService = new ReportProvider();
const ProjectService = new ProjectProvider();
export default {
  components: {
    ModalConfirm
  },
  data: () => ({
    confirm : false,
    arrReport: [],
    dialog: false,
    arrReqT: [],
    headers: [
      {
        text: "Requirement",
        align: "start",
        sortable: false,
        value: "reqName",
      },
      { text: "Time", align: "start" ,value: "getTime" },
    ],   
    Time: [],
  }),
  created() {
    this.showReport();
  },
  methods: {
    async showReport() {
      this.arrReport = []
      const { data } = await ReportService.getReport();
      data.map((project) => {
        this.arrReport.push({
          projectName: project.name,
          projectId: project.id,
          arrData: project,
          requirements: project.requirements,
          status: project.status
        });
      });
    },
    ...mapActions({
      setSnackbar: 'Style/setSnackbar'
    }),
    sumTime(required) {
    let hour = 0
    let minute = 0
    let second = 0
      required.map((req) => {
        const timeRp = req.report.map((reqReport) => {
          return {
            time: reqReport.time
          }
        })
        timeRp.forEach(element => {
          const timeSplit =  element.time.split(':')
          hour = hour + parseInt(timeSplit[0])
          minute = minute + parseInt(timeSplit[1])
          second = second+ parseInt(timeSplit[2])
        });
        hour = parseInt( hour + minute/60);
        minute =parseInt( minute%60);
        minute =parseInt( minute + second/60);
        second = parseInt(second%60);
      })
      return +hour+':'+minute+':'+second
    },
    async showReportById(ProjectId) {
      this.dialog = true
      const { data } = await ReportService.getReportReq(ProjectId);
      this.arrReqT = data.map((req) => {
        return {
          reqName: req.detail,
          getTime: this.timeReqT(req.report)
        }
      })
    },
    async setIncident (projectId) {
      this.modalConfirm =true
      const payload = {
        status: 'incident'
      }
      const { data } = await ProjectService.updateProjectStatus(projectId, payload);
      if (data) {
        this.showReport()
        this.setSnackbar({
          message: 'Update Status Project Success',
          type: 'success',
          active: true
        })
      }
    },
    timeReqT(reports) {
      const reportsTime = reports.map((report) => {
        return {
          time: report.time
        }
      })
      let hour = 0
      let minute = 0
      let second = 0
      reportsTime.forEach(time => {
        const timeSplit =  time.time.split(':')
        hour = hour + parseInt(timeSplit[0])
        minute = minute + parseInt(timeSplit[1])
        second = second+ parseInt(timeSplit[2])
      });
      hour = parseInt( hour + minute/60);
      minute =parseInt( minute%60);
      minute =parseInt( minute + second/60);
      second = parseInt(second%60);
      return +hour+':'+minute+':'+second
    },
    closeDialog() {
      this.dialog = false
    }, 
  },
};
</script>
<style>
  .ma-8 {
    min-width: 250px;
  }
</style>
