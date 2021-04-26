<template>
  <v-container>
    <v-form ref="form" v-model="valid" :lazy-validation="false">
      <v-row>
        <v-col cols="12" md="6" offset-md="3">
          <h1 v-if="isUpdating">Update Company</h1>
          <h1 v-else>Create Company</h1>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <v-text-field 
            label="Company Name"
            v-model="formData.name"
            :rules="validation.name"
            persistent-hint
            outlined dense
            ></v-text-field>
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <v-textarea
            v-model="formData.address" 
            label="Address" 
            outlined dense />
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <v-text-field 
            v-model="formData.email" 
            label="E-mail" 
            outlined dense></v-text-field>
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <v-text-field  
            v-model="formData.phoneNumber" 
            label="Phone Number" 
            outlined dense></v-text-field>
          </v-col>
      </v-row>
      <v-row v-if="!isUpdating">
          <v-col cols="12" md="6" offset-md="3">
            <div class="text-center">
              <v-btn style="margin-right: 50px ;" 
              rounded color="success"  
              @click="createCompany" dark > SAVE </v-btn>
              <v-btn rounded color="error" dark> CANCEL </v-btn>
            </div>
          </v-col>
        </v-row>
         <v-row v-else>
        <v-col cols="6" md="3" offset-md="3">
          <v-btn block color="primary" :loading="loading" @click="updateCompany">Save</v-btn>
        </v-col>
        <v-col cols="6" md="3">
          <v-btn block color="pink" :loading="loading" @click="confirmRemove">Delete</v-btn>
        </v-col>
      </v-row>
      </v-form>
      <modal-confirm
      :active="modalConfirm"
      :confirm-text="`Confirm`"
      :title="'Confirm delete.'"
      :message="`Confirm delete company ${formData.CompanyName}.`"
      :show-cancel="true"
      @onCancel="() => { modalConfirm = false }"
       />
    </v-container>
</template>

<script>
import CompanyProvider from "@/resources/CompanyProvider";
import ModalConfirm from '@/components/ModalConfirm'
import { mapActions } from 'vuex'
const companyService = new CompanyProvider();
export default {
  components: {
    ModalConfirm
  },
  data:()  => ({
    valid: false,
    loading: false,
    modalConfirm: false,
    formData: {
      name:  '',
      address : '',
      email:'',
      project:'',
      phoneNumber:'',
    },
    validation: {
      name: [(v) => !!v || 'This feild is require.']
    }
  }),
  computed: {
    isUpdating () {
      return this.$route.params.id ? true : false
    },
    companyId () {
      return this.$route.params.id ? this.$route.params.id : 0
    }
  },
  async mounted () {
    this.loading = true
    if (this.isUpdating) {
      await this.getCompany()
    }
    this.loading = false
  },
  methods: {
    ...mapActions({
      setSnackbar: 'Style/setSnackbar'
    }),
    
    async getCompany () {
      try {
        const { data } = await companyService.getCompanyById(this.companyId)
        this.formData = {
          name: data.name,
          address: data.address,
          email: data.email,
          phoneNumber: data.phoneNumber
        }
      } catch (err) {
        this.setSnackbar({
          message: err.message,
          type: 'pink',
          active: true
        })
      }
    },
     confirmRemove () {
      this.modalConfirm = true
    },
    async createCompany () {
      this.$refs.form.validate()
      if (this.valid) {
        try {
          this.loading = true
          const { data } = await companyService.createCompany(this.formData)
          if (data) {
            this.setSnackbar({
              message: 'Create Company success.',
              type: 'success',
              active: true
            })
            this.$router.push({ name: 'Company List'})
          }
        } catch (err) {
          this.setSnackbar({
            message: err.message,
            type: 'pink',
            active: true
          })
        } finally {
          this.loading = false
        }
      }
      
    },
    async updateCompany () {
      this.$refs.form.validate()
      if (this.valid) {
        try {
          this.loading = true
          const { data } = await companyService.updateCompany(this.companyId, this.formData)
          if (data) {
            this.setSnackbar({
              message: 'Update company success.',
              type: 'success',
              active: true,
              timeOut: '6000'
            })
            this.$router.push({ name: 'Company List'})
          }
        } catch (err) {
          this.setSnackbar({
            message: err.message,
            type: 'danger',
            active: true,
            timeOut: '16000'
          })
        } finally {
          this.loading = false
        }
      }
    },
  }
}
</script>

<style >
.v-text-field{
    min-height: auto !important;
    display: flex !important;
  }
</style>

