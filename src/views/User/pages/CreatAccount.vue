<template>
  <v-container>
    <v-form class="px-16">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="my-5"> 
          <div>
            <h1>Creat New Employee Account</h1>
          </div>
        </v-col>
        </v-row>
      <v-row class="px-16">
        <v-col cols="12" sm="3" >
          <v-text-field
            label="Frist name"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            label="Last name"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="px-16">
        <v-col cols="12" sm="6" class="my-n8">
          <v-text-field
            label="E-mail"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="px-16">
        <v-col cols="12" sm="6">
          <v-text-field
            label="Phon number"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="px-16">
        <v-col cols="12" sm="6" class="my-n8">
          <v-text-field
            label="User name"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="px-16">
        <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="items"
          label="Department"
          dense
          outlined
        ></v-select>
      </v-col>
      </v-row>
      <v-row class="px-16">
        <v-col cols="9" sm="6">
          <div class="text-center">
            <v-btn rounded color="primary" dark>Save</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </v-container>
</template>