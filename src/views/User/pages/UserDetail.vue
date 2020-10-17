<template>
  <v-container>
    <v-row>
      <v-col>
        <table>
          <tr>
            <td class="pa-2"> ID : </td> <td> {{ user.id }} </td>
          </tr>
          <tr>
            <td class="pa-2"> Name : </td> <td> {{ `${user.title} ${user.firstName} ${user.lastName}` }} </td>
          </tr>
          <tr>
            <td class="pa-2"> Username : </td> <td> {{ user.username }} </td>
          </tr>
          <tr>
            <td class="pa-2"> Email : </td> <td> {{ user.email }} </td>
          </tr>
          <tr>
            <td class="pa-2"> Phone Number : </td> <td> {{ user.phoneNumber }} </td>
          </tr>
          <tr>
            <td class="pa-2"> Department : </td> <td> {{ user.department.name }} </td>
          </tr>
          <tr>
            <td class="pa-2"> CreateTime : </td> <td> {{ user.createdAt | localDate() }} </td>
          </tr>
        </table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-btn block color="warning" :loading="loading" @click="$router.push({ name: 'UpdateUser', params: { id: user.id }})">Update</v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn block color="pink" :loading="loading" @click="confirmRemove">Delete</v-btn>
      </v-col>
    </v-row>
    <modal-confirm
      :active="modalConfirm"
      :confirm-text="`Confirm`"
      :title="'Confirm delete'"
      :message="`Confirm delete user ${user.username}.`"
      :show-cancel="true"
      @onCancel="() => { modalConfirm = false }"
      @onConfirm="removeUser" />
  </v-container>
</template>

<script>
import UserProvider from '@/resources/UserProvider'
import ModalConfirm from '@/components/ModalConfirm'
import { mapActions } from 'vuex'
const userService = new UserProvider()
export default {
  components: { ModalConfirm },
  data: () => ({
    loading: false,
    user: {},
    modalConfirm: false
  }),
  computed: {
    isUpdating () {
      return this.$route.params.id ? true : false
    },
    userId () {
      return this.$route.params.id ? this.$route.params.id : 0
    }
  },
  async mounted () {
    this.loading = true
    await this.getUser()
    this.loading = false
  },
  methods: {
    ...mapActions({
      setSnackbar: 'Style/setSnackbar'
    }),
    confirmRemove () {
      this.modalConfirm = true
    },
    async getUser () {
      try {
        const { data } = await userService.getUserById(this.userId)
        this.user = data
      } catch (err) {
        this.setSnackbar({
          message: err.message,
          type: 'pink',
          active: true
        })
      }
    },
    async removeUser () {
      try {
        this.loading = true
        const { data } = await userService.deleteUser(this.userId)
        if (data) {
          this.setSnackbar({
            message: 'Remove user success.',
            type: 'success',
            active: true
          })
          this.$router.push({ name: 'UserList'})
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
  }
}
</script>