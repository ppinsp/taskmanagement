<template>
  <v-navigation-drawer app absolute dark width="22.5%" permanent>
    <v-expansion-panels inset>
      <v-dialog v-model="dialog" scrollable max-width="400px">
        <v-card>
          <v-card-title>List Users</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 320px">
            <v-col class="d-flex" cols="12">
              <p>: -</p>
            </v-col>
            <v-col class="d-flex" cols="12">
              <v-select
                v-model="selectedUser"
                :items="userlist"
                item-value="id"
                label="Choose Your Users"
                dense
                solo
              >
                <template slot="selection" slot-scope="{ item }">
                  {{ item.firstName }} - {{ item.lastName }}
                </template>
                <template slot="item" slot-scope="{ item }">
                  {{ item.firstName }} - {{ item.lastName }}
                </template>
              </v-select>
            </v-col>
            <!-- <v-list flat>
            <v-list-item
              v-for="(user, index) in userlist"
              :key="`user-index-${index}`"
              class="px-5">
              <v-list-item-content>
                <v-list-item-title>{{ `${user.firstName} ${user.lastName}` }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  icon
                  class="mx-8"
                  @click="addUser(user.id)">
                  <v-icon color="primary">
                    mdi-account-multiple-plus
                  </v-icon>
                   <v-btn
                   icon
                   class="mx-8">
                  <v-icon color="primary">
                    mdi-account-multiple-minus
                  </v-icon>
                </v-btn>
                
                 </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>  -->
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Cancle
            </v-btn>
            <v-btn color="blue darken-1" text @click="updateRequirement()">
              Confirm
            </v-btn>
            <v-spacer>
              <v-icon medium color=" grey darken-1">mdi-calendar-clock</v-icon>
            </v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <v-col class="row" md="12" cols="15">
        <v-col md="3" class="d-flex bd-highlight mb-3" cols="1">
          <div class="search-wrapper">
          <input type="text" v-model="search" placeholder="Search title.."/>
              <label>Search title:</label>
          </div>
          <div class="wrapper">
            <div class="card" v-for="(index,i) in projectlist" :key="i">
              <v-expansion-panel>
                <v-expansion-panel-header style="background: #bdbdbd; color: #424242">
                  {{index.name}}
                </v-expansion-panel-header>
           <v-expansion-panel-content v-for="(requirement, i) in index.requirements" :key="i" style="background: #bdbdbd; color: #424242">                      
          <v-card class="mx-auto" max-width="300" color=#FFFF outlined>
              <p style="color:black">
                {{ requirement.detail }}
              </p>             
            <v-card-actions >
              <v-icon large color=" grey darken-1" size="1" >mdi-account-multiple-plus</v-icon>
              <v-icon large color=" grey darken-1">mdi-calendar-clock</v-icon>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content> 
        </v-expansion-panel>
            </div>
          </div> -->

      <!-- <v-icon large color="blue darken-2">mdi-bell-ring-outline</v-icon> -->
      <!-- </v-col>
      </v-col> -->

      <!-- original************************************************************************************* -->
      <v-expansion-panel v-for="(item, i) in data" :key="i">
        <v-expansion-panel-header style="background: #bdbdbd; color: #424242">
          {{ item.name }}
        </v-expansion-panel-header>

        <v-expansion-panel-content
          v-for="(requirement, index) in item.requirements"
          :key="index"
          style="background: #bdbdbd; color: #424242"
        >
          <!-- {{ requirement.detail }} -->
          <!-- <v-icon large color="blue darken-2" @click="clickme()">mdi-bell-ring-outline</v-icon> -->

          <v-card class="mx-auto" max-width="300" color="#FFFF" outlined>
            <v-icon medium color=" grey darken-1">mdi-calendar-clock</v-icon>
            <p style="color: black">
              {{ requirement.detail }}
            </p>
            <!-- <v-list-item-avatartilesize="55"> </v-list-item-avatar> -->
            <v-card-actions>
              <v-icon
                medium
                color=" grey darken-1"
                @click="addrequirementuser(item.team.id, requirement.id, requirement.user_id)"
                >mdi-account-multiple-plus</v-icon
              >

              <v-icon medium color=" grey darken-1">mdi-calendar-clock</v-icon>
              <v-icon medium color=" grey darken-1">mdi-message-text</v-icon>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- ****************************************************************************** -->
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script>
import ProjectProvider from "@/resources/ProjectProvider";
import UserProvider from "@/resources/UserProvider";
import { getUser } from "@/utils/js/Auth";
import RequirementProvider from "@/resources/RequirementProvider";
const projectService = new ProjectProvider();
const usersService = new UserProvider();
const requirementService = new RequirementProvider();

export default {
  data: () => ({
    searchText: "",
    data: "",
    projectuserfind: "",
    user: "",
    search: "",
    postList: [],
    dataId: "",
    dialog: false,
    userlist: [],
    team: 0,
    selectedUser: "",
    selectedRequirement: "",

   
  }),
  computed: {
    projectlist() {
      return this.data.filter((post) => {
        return post.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    // userListFormat(){
    //   this.userlist.map(item => {

    //   })
    // }
  },

  methods: {
    async getData() {
      // this.loading = true;
      try {
        //const query = `search=${this.searchText}`;
        // const { data } = await projectService.getAllProject(query);
        const { data } = await projectService.getProjectUserFind(this.user.sub);

        //console.log(this.user.sub)
        //console.log(data)
        this.data = data;
        //const { dataproject } = await projectService.getProjectById(12)
        console.log("show arr", this.data[1].team);
        //console.log(dataproject)
      } catch (err) {
        console.log(err);
      } finally {
        // this.loading = false;
      }
    },
    async dialogControl() {
      await this.addrequirementuser();
    },
    async addrequirementuser(id, requirement_id, user_id) {
      this.dialog = true;
      try {
        this.selectedRequirement = requirement_id;
        console.log('user_id', user_id)
        if (user_id) {
          this.selectedUser = user_id
        }
        const { data } = await usersService.getuserrequriement(id);
        this.userlist = data;
        console.log("team name", data);
      } catch (error) {
        console.error("error");
      } finally {
        // do nothing
      }
    },
    async getusersrequirement() {
      try {
        // const {data} = await usersService.getuserrequriement()
        //this.userlist = data;
        console.log("team id", this.team);
      } catch (error) {
        console.error("error");
      } finally {
        // do nothing
      }
    },
    addUser(id) {
      this.selectedUser = id;
    },
    async updateRequirement() {
      let isSelected = this.confirmUser()
      if(!isSelected) {
        return
      }
      const payload = {
        user: this.selectedUser,
      };
      const result = await requirementService.updateRequirement(
        this.selectedRequirement,
        payload
      );
      this.dialog = false
      console.log("result = ",result);
      this.selectedUser = ''
    },
    confirmUser(){
      if(this.selectedUser == ""){
        alert("Please select user before confirm!!")
        return false
      }
      return true
    }
  },
  mounted() {
    // this.getProject();
    this.user = getUser();
    this.getData();

    // console.log(this.user.sub)
  },
};
</script>

<style>
.backrequire {
  background: wheat;
}
</style>