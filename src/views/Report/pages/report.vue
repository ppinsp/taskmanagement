<template>
  <div class="container mt-5">
    <v-container class="grey lighten-5">
      <v-row class="mb-1" no-gutters v-if="arrReport">
        <div
          class="list-group-item"
          v-for="element in arrReport"
          :key="element.projectId"
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
              class="pb-0 mb-3 "
              style="font-family:'Google Sans',Roboto,sans-serif; line-height:1.1; "
            >
              {{ element.projectName }}
            </v-card-title>
            <v-card-text class="text--secondary rtl">
              TimeAll : {{sumTime(element.requirements)}}<br>
              TimeLeft : {{alertDate(element)}}
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-chip color="success" v-if="element.status === 'finished'">Finished</v-chip>
              <v-btn color="success"  v-if="element.status !== 'finished'"  @click.stop="setFinished(element)">Success</v-btn>
              <v-spacer />
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
            :headers="headers"
            :items="arrReqT"
            item-key="id"
            class="elevation-1 ma-6"
          >
            <template v-slot:item.actions="{ item }">
              <div v-if="item.reqArr.status === 'incedent'">
                <v-btn size="small" color="primary" @click="setReqStatusActive(item)">Inincedent</v-btn>
              </div>
              <div v-else>
                <v-btn size="small" color="warning" @click="setReqStatus(item)">Incedent</v-btn>
              </div>
            </template>
          </v-data-table>
        <v-divider />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ReportProvider from "../../../resources/ReportProvider";
import ProjectProvider from "../../../resources/ProjectProvider";
import RequirementProvider from "@/resources/RequirementProvider";
import { mapActions } from 'vuex';
import moment from 'moment'

const ReportService = new ReportProvider();
const ProjectService = new ProjectProvider();
const RequirementService = new RequirementProvider();

export default {
  data: () => ({
    confirm : false,
    arrReport: [],
    dialog: false,
    arrReqT: [],
    datab: [],
    headers: [
      {
        text: "Requirement",
        align: "start",
        sortable: false,
        value: "reqName",
      },
      { text: "Time", align: "start" ,value: "getTime" },
      {
        text: "actions", value: "actions" ,sortable: false
      }
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
      const setReport = data.map((project) => {
        return {
          projectName: project.name,
          projectId: project.id,
          arrData: project,
          deadlinedate: project.deadlineDate,
          requirements: project.requirements,
          status: project.status,
        }
      })
      this.arrReport = setReport
      this.datab = data
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
          projectId: ProjectId,
          reqArr: req,
          reqName: req.detail,
          getTime: this.timeReqT(req.report)
        }
      })
    },
    async setFinished (project) {
      const projectId = project.projectId
      const payload = {
        status: 'finished'
      }
      const { data } = await ProjectService.updateProjectStatus(projectId, payload);
      if (data) {
        this.showReport()
      }
    },
    async setReqStatus(reqId) {
      const projectId = reqId.projectId     
      console.log(reqId);
      const requirementId = reqId.reqArr.id
      const payload = {
        status: 'incedent'
      }
      await RequirementService.updateRequirement(requirementId,payload)
      this.showReportById(projectId)
    },
    async setReqStatusActive(reqId) {
      const projectId = reqId.projectId     
      console.log(reqId);
      const requirementId = reqId.reqArr.id
      const payload = {
        status: 'active'
      }
      await RequirementService.updateRequirement(requirementId,payload)
      this.showReportById(projectId)
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
    alertDate(project){
      const now = moment(new Date());
      const deadline = moment(project.deadlinedate).utc();
      const duration = deadline.diff(now, 'hours')
      // เหลือเวลาไม่ถึง 24 ชั่วโมง
      if (duration > 0 && duration < 25 ) {
        return `${duration} hours`
      }
      //มีเวลาเหลือมากกว่า 24 ชั่วโมง
      else if (duration > 24) {
        return  `${deadline.locale('th').fromNow()}`
      }
      //เลยวัน เดดไลน์
      else {
        return  `${deadline.locale('th').fromNow()} `
      }
      // console.log("check deadline ",this.datab[data]?.status);
      //var diff = Math.abs(date.getTime());
    

      // diff = diff.toString();
      // diff = diff.substring(0,diff.length-3);
      // diff = Number(diff);
      // console.log(diff);
      //var years = Math.floor(diff / (365*60*60*24));
      //var months = Math.floor((diff - years * 365*60*60*24) / (30*60*60*24));
      //var days = Math.floor((diff - years * 365*60*60*24 - months*30*60*60*24)/ (60*60*24));
    },
    currentDate() {
      const current = new Date();
      //const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      //const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      //const dateTime = date;
      
      return current.getTime();
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
