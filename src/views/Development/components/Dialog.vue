<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        {{name}}
      </v-card-title>
      <v-card>
        <div v-if="dialogMode.imgMode">
          <div v-if="imageUpload">
            <img
            :src="dialogMode.data.imageUpload"
            width="300"
            alt=""
          />
          </div>
          <div v-else>
            <div class="imgEmpty">
              <h4>Image Empty</h4>
            </div>
          </div>
        </div>

        <div v-else>
          <div v-if="fileUpload" class="imgEmpty" >
            <v-btn color="success">Download File</v-btn>
            <a :href="dialogMode.data.fileUpload"/>
          </div>
          <div v-else class="imgEmpty">
            <h4>File Empty</h4>
          </div>
        </div>
        <!-- :src="dialogMode.data? dialogMode.data: 'https://uhas.com/wp-content/themes/wikiforex/images/thumbnail-default.jpg'" -->
          <!-- <img
            :src="
              requirement.imageUpload
            "
            width="300"
            alt=""
          /> -->
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      require: true
    },
    dialogMode: {
      type: Object,
      require: true
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    name() {
      if (this.dialogMode.imgMode) {
        return 'ImageUpload'
      }else {
        return 'FileUpload'
      }
    },
    imageUpload() {
      if (this.dialogMode.data.imageUpload) {
        return true
      }
      else {
        return false
      }
    },
    fileUpload() {
      if (this.dialogMode.data.fileUpload) {
        return true
      }
      else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .imgEmpty {
    margin: auto;
    text-align: center;
    padding-top: 50px;
    width: 50%;
    height: 150px;
  }
</style>