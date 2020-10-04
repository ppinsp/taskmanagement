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
          teamname: 'Frozen Yogurt',
          descreiption: 159,
          members: 6.0,
          options: 24,
        },
        {
          id: 2,
          teamname: 'Frozen Yogurt',
          descreiption: 159,
          members: 6.0,
          options: 24,
        },
        {
          id: 3,
          teamname: 'Frozen Yogurt',
          descreiption: 159,
          members: 6.0,
          options: 24,
        },
        {
          id: 4,
          teamname: 'Frozen Yogurt',
          descreiption: 159,
          members: 6.0,
          options: 24,
        },
        {
          id: 5,
          teamname: 'Frozen Yogurt',
          descreiption: 159,
          members: 6.0,
          options: 24,
        },
        {
          id: 6,
          teamname: 'Frozen Yogurt',
          descreiption: 159,
          members: 6.0,
          options: 24,
        },
        {
          id: 7,
          teamname: 'Frozen Yogurt',
          descreiption: 159,
          members: 6.0,
          options: 24,
        },
        {
          id: 8,
          teamname: 'Frozen Yogurt',
          descreiption: 159,
          members: 6.0,
          options: 24,
        },
        {
          id: 9,
          teamname: 'Frozen Yogurt',
          descreiption: 159,
          members: 6.0,
          options: 24,
        },
        {
          id: 10,
          teamname: 'Frozen Yogurt',
          descreiption: 159,
          members: 6.0,
          options: 24,
        },
      ],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Team name', value: 'teamname' },
        { text: 'Descreiption', value: 'descreiption' },
        { text: 'Members', value: 'members' },
        { text: 'Options', value: 'options' },
      ]
    })
  }
</script>
