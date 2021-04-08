<template>
  <div>
    <v-container>
      <h1>Create Company</h1>
      <v-form ref="form" v-model="valid" :lazy-validation="false">
        <v-row class="mt-6 pt-6">
          <v-col cols="12" md="6" offset-md="3">
            <v-text-field v-model="CompanyName" label="Company Name" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" md="6" offset-md="3">
            <v-text-field height="150px" v-model="Address" label="Address" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" md="6" offset-md="3">
            <v-text-field v-model="Email" label="E-mail" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" md="6" offset-md="3">
            <v-text-field  v-model="Phonenumber" label="Phone Number" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" md="6" offset-md="3">
            <div class="text-center">
              <v-btn style="margin-right: 50px ;" rounded color="success"  @click="createCompany" dark > SAVE </v-btn>
              <v-btn rounded color="error" dark> CANCEL </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>
<script>
import CompanyProvider from "@/resources/CompanyProvider";

const companyService = new CompanyProvider();
export default {
  data() {
    return {
      CompanyName: "",
      Address:"",
      Email:"",
      Phonenumber:"",
      pid : 1

    };
  },
   async created() {
    //ปกป้องเสริมส่วนนี้มาให้
      const { data } = await companyService.getCompany(this.data);

        //console.log(this.user.sub)
        //console.log(data)
        this.data = data;
        //const { dataproject } = await projectService.getProjectById(12)
        console.log("show arr", this.data);
  },
   methods: {
    async createCompany() {
      console.log(this.CompanyName)
      console.log(this.Address)
      console.log(this.Email)
      console.log(this.Phonenumber)

      let res  = await companyService.createCompany(
        {
          name: this.CompanyName,
          address : this.Address,
          email : this.Email,
          project : this.pid,
          phoneNumber : this.Phonenumber
        });
         if (!res.data.message == "done") {
       console.log("No");
      } else {
       console.log("Done");
      }
      
      }
    }
   
 
};
</script>
<style >
 .v-text-field{
    min-height: auto !important;
    display: flex !important;
   

  }
</style>

