<template>
  <div>
    <v-snackbar
      v-model="snackbar.active"
      :color="snackbar.type"
      multi-line="multi-line"
      :timeout="500"
      top
    />
    <header-bar
      v-model="drawer"
      :window-width="windowWidth"
      :breadcrumbs="breadcrumbs"
      :mini.sync="mini"
    />

    <sidebar-menu
      v-if="user && user.role !== 'dev'"
      v-model="drawer"
      :is-mobile="isMobile"
      :items="menus"
      :mini="mini"
    />

    <div v-else>
      <devbar />
    </div>
    <div class="top" v-if="user && user.role == 'dev'">
      <!-- <v-card class="mx-auto" max-width="344" v-for="(item, index) in status" :key="index" width="80%"> -->
      <v-container>
        <v-row dense>
          <v-col cols="3" v-for="(item, index) in status" :key="index">
            <v-btn color="cyan">
              <span v-if="item.isEdit === false" style="color: white">
                {{ item.name }}
              </span>
              <v-text-field v-else v-model="status[index].name"></v-text-field>

              <v-icon
                v-if="item.isEdit === false"
                medium
                color="white"
                @click="status[index].isEdit = true"
                >mdi-border-color</v-icon
              >
              <v-icon
                v-if="item.isEdit === false"
                medium
                color="white"
                @click="deleteStatus(item.id, index)"
                >mdi-bitbucket</v-icon
              >
              <v-icon
                v-if="item.isEdit === true"
                medium
                color="white"
                @click="updateStatus(index)"
              >
                mdi-check</v-icon
              >
            </v-btn>
          </v-col>
          <v-col cols="3" v-if="isNew">
            <v-text-field v-model="newStatus"></v-text-field>
          </v-col>
          <v-col cols="3" v-else-if="!isNew">
            <v-btn
              @click="isNew = true"
              :loading="loading"
              color="grey darken-1"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3" v-if="isNew">
            <v-btn
              @click="createStatusTask()"
              :loading="loading"
              color="grey darken-1"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <!-- <v-icon large color=" grey darken-1" size="1" @click="isNew = true" v-if="!isNew" >mdi-plus</v-icon>
            <v-btn @click="createStatusTask()" v-else :loading="loading" icon >
              <v-icon color=" grey darken-1" >mdi-plus</v-icon>
            </v-btn> -->
          <!-- <v-card-text> -->
          <!-- <span v-if="item.isEdit === false">{{item.name}}</span>
              <v-text-field v-else v-model="status[index].name"></v-text-field>
              <v-icon v-if="item.isEdit === false"  medium  color=" grey darken-1" @click="status[index].isEdit = true">mdi-border-color</v-icon>
              <v-icon v-if="item.isEdit === false"  medium  color=" grey darken-1" @click="deleteStatus(item.id, index)">mdi-bitbucket</v-icon>
              <v-icon v-if="item.isEdit === true"  medium  color=" grey darken-1" @click="updateStatus(index)"> mdi-check</v-icon> -->
          <!-- </v-card-text> -->
        </v-row>
      </v-container>
      <!-- </v-card> -->
    </div>
    <v-card class="mx-auto my-10" max-width="270" v-for="(item, index) in requirement" :key="index">
      
      <v-card-title>{{item.detail}}</v-card-title>
      <v-icon medium color=" grey darken-1" @click="removeRequirement(item.id, index)">mdi-bitbucket</v-icon>
     
    </v-card>

    <v-main>
      <router-view />
    </v-main>
    <snackbar
      :value="snackbar.active"
      :type="snackbar.type"
      :message="snackbar.message"
      @close="setSnackbarData"
    />
  </div>
</template>

<script>
import sidebarMenu from "@/components/SidebarMenu";
import headerBar from "@/components/HeaderBar";
import Snackbar from "@/components/Snackbar";
import { mapGetters, mapActions } from "vuex";
import { getUser } from "@/utils/js/Auth";
import Devbar from "../components/Devbar.vue";
import StatusProvider from "@/resources/StatusProvider";
import RequirementProvider from "@/resources/RequirementProvider";
const StatusService = new StatusProvider();
const RequirementService = new RequirementProvider();

export default {
  components: {
    sidebarMenu,
    headerBar,
    Snackbar,
    Devbar,
  },
  data() {
    return {
      searchText: "",
      menus: [],
      brandName: "",
      drawer: false,
      isUpToDate: true,
      mini: false,
      ready: false,
      user: "",
      status: [],
      perPage: 15,
      page: 1,
      valid: false,
      loading: false,
      newStatus: "",
      isNew: false,
      requirement: [],
    };
  },
  mounted() {
    this.user = getUser();
    console.log(this.user.role);
    this.getStatus();
    this.getRequiredmentByUser();
  },
  methods: {
    ...mapActions({
      setSnackbar: "Style/setSnackbar",
    }),
    setSnackbarData(val) {
      this.setSnackbar({
        message: "",
        type: "",
        active: val,
      });
    },
    getBreadcrumbs(data, value) {
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].to === value) {
          newData = [{ ...data[i] }];
          break;
        } else if (data[i].children) {
          const sub = this.getBreadcrumbs(data[i].children, value);
          if (sub[0] && sub[0].to) {
            newData.push({ ...data[i] });
            newData.push({ ...sub[0] });
            break;
          }
        }
      }
      return newData;
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
          type: "pink",
          active: true,
        });
      }
    },
    async updateStatus(index) {
      try {
        const result = await StatusService.updateStatusTaskBar(
          this.status[index].id,
          {
            name: this.status[index].name,
          }
        );
        if (!result) {
          throw { message: "อัพเดตข้อมูลผิดพลาด" };
        }
        this.status[index].isEdit = false;
        this.setSnackbar({
          message: "อัพเดตสำเร็จ",
          type: "green",
          active: true,
        });
      } catch (error) {
        this.setSnackbar({
          message: error.message,
          type: "pink",
          active: true,
        });
      }
    },
    async deleteStatus(id, index) {
      try {
        const result = await StatusService.deleteStatusTaskBar(id);
        if (!result) {
          throw { message: "อัพเดตข้อมูลผิดพลาด" };
        }
        this.status.splice(index, 1);
        console.log("index", index);
        this.setSnackbar({
          message: "ลบข้อมูลสำเร็จ",
          type: "green",
          active: true,
        });
      } catch (error) {
        this.setSnackbar({
          message: error.message,
          type: "pink",
          active: true,
        });
      }
    },
    async createStatusTask() {
      try {
        this.loading = true;
        if (!this.newStatus) {
          throw { message: "กรุณาใส่ข้อมูล" };
        }
        const { data } = await StatusService.createStatusTaskBar({
          name: this.newStatus,
        });
        if (!data) {
          throw { message: "พบข้อผิดพลาด" };
        }
        this.status.push({ isEdit: false, ...data });
        this.setSnackbar({
          message: "Create Status success.",
          type: "success",
          active: true,
        });
      } catch (err) {
        this.setSnackbar({
          message: err.message,
          type: "pink",
          active: true,
        });
      } finally {
        this.loading = false;
        this.newStatus = "";
        this.isNew = false;
      }
    },
    async getRequiredmentByUser() {
      const { data } = await RequirementService.getRequirementByUserId(
        this.user.sub
      );
      this.requirement = data;
    },
    async removeRequirement(id, index) {
      const { data } = await RequirementService.updateRequirement(id, { user_id: null })
      if (data) {
        this.requirement.splice(index, 1)
      }
    }
  },

  computed: {
    ...mapGetters({
      snackbar: "Style/snackbar",
    }),
    windowWidth() {
      return this.$vuetify.breakpoint.width;
    },
    windowHeight() {
      return this.$vuetify.breakpoint.height;
    },
    isMobile() {
      return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm;
    },
    breadcrumbs() {
      const breadcrumbs = [
        {
          disabled: false,
          link: true,
          text: this.$route.name,
          href: this.$router.resolve({ name: "Main" }).href,
        },
      ];
      if (this.$route.name !== "Main") {
        const newMenus = this.getBreadcrumbs(this.menus, this.$route.name);
        const mapMenus = newMenus.map((r) => ({
          disabled: false,
          link: true,
          text: r.title,
          href: this.$router.resolve({ name: r.to }).href,
        }));
        breadcrumbs.push(...mapMenus);
      }
      breadcrumbs[breadcrumbs.length - 1].disabled = true;
      return breadcrumbs;
    },
  },
};

//combobox
</script>
<style scoped>
div.box {
  padding: 5px 5px 5px 5px;
  margin: 20px 20px 20px 20px;
  height: 30px;
  width: 200px;
}
.left {
  margin-left: 50px;
}

.top {
  padding-top: 100px;
  padding-left: 25%;
}
.v-btn {
  width: 250px;
  max-block-size: 270px;
}
/* .text-right {
    float: left;
  } */
</style>