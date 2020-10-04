<template>
<v-form>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
      <div class="text-center">
        <h1>Reset password</h1>
      </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
            v-model="username"
            label="New password"
            hint=""
            persistent-hint
            outlined
          ></v-text-field>
      </v-col>
    </v-row>
    
    <v-row>
        <v-col cols="33" sm="4">
          <div class="text-center">
            <v-btn @click="handleLoginClicked" block color="primary" dark>Reset Password</v-btn>
          </div>
        </v-col>
      </v-row>
  </v-container>
</v-form>
</template>

<script>
</script>

<style>
</style>