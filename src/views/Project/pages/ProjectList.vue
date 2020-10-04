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
      disable-sort
      hide-default-footer
      class="elevation-1">
  </v-data-table>
  </base-layout>
</template>

<script>
  export default {
    data: () => ({
      searchText: '',
      perPage: 15,
      total: 15,
      page: 1,
      data: [
        {
          id: 1,
          projectName: 'KitKat',
          projectDetail: 518,
          teamName: 26.0,
          deadlineDate: 65,
          requirements: 7,
          file: '6%',
          image: '6%',
          Options: '6%',
        },
        {
          id: 1,
          projectName: 'KitKat',
          projectDetail: 518,
          teamName: 26.0,
          deadlineDate: 65,
          requirements: 7,
          file: '6%',
          image: '6%',
          Options: '6%',
        },
        {
          id: 1,
          projectName: 'KitKat',
          projectDetail: 518,
          teamName: 26.0,
          deadlineDate: 65,
          requirements: 7,
          file: '6%',
          image: '6%',
          Options: '6%',
        },
        {
          id: 1,
          projectName: 'KitKat',
          projectDetail: 518,
          teamName: 26.0,
          deadlineDate: 65,
          requirements: 7,
          file: '6%',
          image: '6%',
          Options: '6%',
        },
        {
          id: 1,
          projectName: 'KitKat',
          projectDetail: 518,
          teamName: 26.0,
          deadlineDate: 65,
          requirements: 7,
          file: '6%',
          image: '6%',
          Options: '6%',
        },
        {
          id: 1,
          projectName: 'KitKat',
          projectDetail: 518,
          teamName: 26.0,
          deadlineDate: 65,
          requirements: 7,
          file: '6%',
          image: '6%',
          Options: '6%',
        },
        {
          id: 1,
          projectName: 'KitKat',
          projectDetail: 518,
          teamName: 26.0,
          deadlineDate: 65,
          requirements: 7,
          file: '6%',
          image: '6%',
          Options: '6%',
        },
        {
          id: 1,
          projectName: 'KitKat',
          projectDetail: 518,
          teamName: 26.0,
          deadlineDate: 65,
          requirements: 7,
          file: '6%',
          image: '6%',
          Options: '6%',
        },
        {
          id: 1,
          projectName: 'KitKat',
          projectDetail: 518,
          teamName: 26.0,
          deadlineDate: 65,
          requirements: 7,
          file: '6%',
          image: '6%',
          Options: '6%',
        },
        {
          id: 1,
          projectName: 'KitKat',
          projectDetail: 518,
          teamName: 26.0,
          deadlineDate: 65,
          requirements: 7,
          file: '6%',
          image: '6%',
          Options: '6%',
        },
      ],
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Project name', value: 'projectName' },
        { text: 'Project detail', value: 'projectDetail' },
        { text: 'Team name', value: 'teamName' },
        { text: 'Deadline Date', value: 'deadlineDate' },
        { text: 'Options', value: 'image' },
      ]
    })
  }
</script>
