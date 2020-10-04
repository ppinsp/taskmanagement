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
          id: 'KitKat',
          departmentName: 518,
          desccription: 26.0,
          options: 65,
        },
        {
          id: 'KitKat',
          departmentName: 518,
          desccription: 26.0,
          options: 65,
        },
        {
          id: 'KitKat',
          departmentName: 518,
          desccription: 26.0,
          options: 65,
        },
        {
          id: 'KitKat',
          departmentName: 518,
          desccription: 26.0,
          options: 65,
        },
        {
          id: 'KitKat',
          departmentName: 518,
          desccription: 26.0,
          options: 65,
        },
        {
          id: 'KitKat',
          departmentName: 518,
          desccription: 26.0,
          options: 65,
        },
        {
          id: 'KitKat',
          departmentName: 518,
          desccription: 26.0,
          options: 65,
        },
        {
          id: 'KitKat',
          departmentName: 518,
          desccription: 26.0,
          options: 65,
        },
        {
          id: 'KitKat',
          departmentName: 518,
          desccription: 26.0,
          options: 65,
        },
        {
          id: 'KitKat',
          departmentName: 518,
          desccription: 26.0,
          options: 65,
        },
      ],
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Department name', value: 'departmentName' },
        { text: 'Desccription', value: 'desccription' },
        { text: 'Options', value: 'options' },
      ]
    })
  }
</script>
