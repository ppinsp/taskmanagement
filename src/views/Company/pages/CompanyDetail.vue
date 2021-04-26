<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <table>
          <tr>
            <td class="pa-2"> code </td> <td class="pl-5"> {{ company.id }} </td>
          </tr>
          <tr>
            <td class="pa-2"> Company name  </td> <td class="pl-5"><div><h1>  {{ company.name }} </h1></div></td>
          </tr>
          <tr>
            <td class="pa-2"> Address  </td> <td class="pl-5">{{ company.address }} </td>
          </tr>
        </table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" md="2" >
        <v-btn block color="warning" :loading="loading" @click="$router.push({ name: 'UpdateCompany', params: { id: company.id }})">Update</v-btn>
      </v-col>
     <v-col cols="6" md="2">
        <v-btn block color="pink" :loading="loading" @click="confirmRemove(company.id)">Delete</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <paginate
          :page="parseInt(page)"
          :per-page="perPage"
          :total="total"
          @on-page-change="changePage" />
        <v-data-table
          :headers="headers"
          :items-per-page="15"
          :items="mapedData"
          :loading="tableLoading"
          disable-sort
          hide-default-footerx
          class="elevation-1" />
      </v-col>
    </v-row>
    <modal-confirm
      :active="modalConfirm"
      :confirm-text="`Confirm`"
      :title="'Confirm delete'"
      :message="`Confirm delete company ${company.name}.`"
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
 components: { ModalConfirm },
  data: () => ({
    loading: false,
    company: {},
    modalConfirm: false,
    tableLoading: false,
    perPage: 15,
    total: 15,
    page: 1,
    data: [],
    headers: [
      { text: 'Id', align: 'start', sortable: false, value: 'id' },
      { text: 'Company Name', value: 'name' },
      { text: 'Address', value: 'address' },
    ]
  }),
  computed: {
    isUpdating () {
      return this.$route.params.id ? true : false
    },
    companyId () {
      return this.$route.params.id ? this.$route.params.id : 0
    },
    mapedData () {
      return this.data.map(d => ({
        id: d.id,
        name: d.name,
       // name: `${d.firstName} ${d.lastName}`,
        address: d.address,
      }))
    }
  },
  async mounted () {
    this.loading = true
    await this.getCompany()
    this.loading = false
  },
  methods: {
    ...mapActions({
      setSnackbar: 'Style/setSnackbar'
    }),
    async getCompany () {
      try {
        const { data } = await companyService.getCompanyById(this.companyId)
        this.company = data
      } catch (err) {
        this.setSnackbar({
          message: err.message,
          type: 'pink',
          active: true
        })
      }
    },
    async confirmRemove (id) {
      this.loading = true
      // this.modalConfirm = true
      try {
        const result = await companyService.deleteCompanyById(id)
        if (!result) {
          throw { message: 'somthing\'s wrong please try again' }
        }
        this.setSnackbar({
          message: 'success',
          type: 'green',
          active: true
        })
        this.$router.go(-1)
      } catch (error) {
        this.setSnackbar({
          message: error.message,
          type: 'pink',
          active: true
        })
      }
    },
    changePage (page) {
      this.page = page
    },

    

  }
}
</script>