<template>
  <base-layout>
    <v-row class="justify-end">
      <v-col md="4" sm="6" cols="6">
        <v-text-field v-model="searchText" dense label="Search" @keydown.enter="searchItem"/>
      </v-col>
      <v-col md="1" sm="2" cols="3" class="text-center">
        <v-btn outlined small color="primary" @click="searchItem()">
          Find
        </v-btn>
      </v-col>
    </v-row>
    <paginate
      :page="parseInt(page)"
      :per-page="perPage"
      :total="total"
      @on-page-change="changePage" />
    <v-data-table
      :headers="headers"
      :items-per-page="15"
      :items="data"
      :loading="loading"
      disable-sort
      hide-default-footer
      class="elevation-1">
  </v-data-table>
  </base-layout>
</template>

<script>
import UserProvider from '@/resources/UserProvider'

const userService = new UserProvider()
export default {
  data: () => ({
    searchText: '',
    loading: false,
    perPage: 15,
    total: 15,
    page: 1,
    data: [
      {
        username: 'KitKat',
        name: 'Pimpron',
        email: 'y.pimpron1204@gmail.com',
        department: 'DEV',
        phoneNumber: '0646194422',
        team: 'a',
        option: ':',
      },
      {
        username: 'KitKat',
        name: 'Pimpron',
        email: 'y.pimpron1204@gmail.com',
        department: 'DEV',
        phoneNumber: '0646194422',
        team: 'a',
        option: ':',
      },
      {
        username: 'KitKat',
        name: 'Pimpron',
        email: 'y.pimpron1204@gmail.com',
        department: 'DEV',
        phoneNumber: '0646194422',
        team: 'a',
        option: ':',
      },
      {
        username: 'KitKat',
        name: 'Pimpron',
        email: 'y.pimpron1204@gmail.com',
        department: 'DEV',
        phoneNumber: '0646194422',
        team: 'a',
        option: ':',
      },
      {
        username: 'KitKat',
        name: 'Pimpron',
        email: 'y.pimpron1204@gmail.com',
        department: 'DEV',
        phoneNumber: '0646194422',
        team: 'a',
        option: ':',
      },
      {
        username: 'KitKat',
        name: 'Pimpron',
        email: 'y.pimpron1204@gmail.com',
        department: 'DEV',
        phoneNumber: '0646194422',
        team: 'a',
        option: ':',
      },
    ],
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Username', value: 'username' },
      { text: 'Name', value: 'name' },
      { text: 'E-mail', value: 'email' },
      { text: 'Department', value: 'department' },
      { text: 'Phone number', value: 'phoneNumber' },
      { text: 'Team', value: 'team' },
      { text: 'Option', value: 'option' },
    ]
  }),
  methods: {
    changePage () {
      console.log('change page')
    },
    async getData () {
      this.loading = true
      try {
        const query = `page=${this.page}&limit=${this.perPage}&search=${this.searchText}`
        const { data } = await userService.getUser(query)
        this.total = data.count
        this.data = data.results
      } catch (err) {
        alert(err)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
