<template>
  <div class="cyberx-container">
    <!-- <CyberxBack / -->

    <h1 class="cyberx-title">Create</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row class="artwork-image-wrap">
        <v-col cols="12" md="4" sm="4">
          <img :src="imgUrl" alt="" class="collection-img-preview" />
        </v-col>
        <v-col cols="12" md="8" sm="8">
          <v-row>
            <v-col cols="12"
              ><div>
                We recommend an image of at least 400*400. Gifs work too
              </div></v-col
            >
            <v-col cols="12">
              <input
                ref="file"
                type="file"
                style="display: none"
                accept="image/png, image/jpeg"
                @change="verificationPicFile(this)"
              />
              <v-btn color="rgb(117, 77, 56)" @click="chooseFile"
                >Choose File
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-alert v-show="isShowAlert" type="warning" dismissible>
        Please upload the picture
      </v-alert>
      <v-text-field
        v-model="artWorkName"
        :counter="20"
        :rules="artWorkNameRules"
        label="Artwork Name"
        placeholder="Enter the artwork name"
        required
        outlined
        shaped
      ></v-text-field>
      <v-text-field
        v-model="artistName"
        :rules="artistNameRules"
        :counter="20"
        label="Artist Name"
        placeholder="Enter the artist name"
        required
        outlined
        shaped
      ></v-text-field>
      <v-text-field
        v-model="link"
        type="text"
        :rules="linkRules"
        label="Public profile Link(optional)"
        placeholder="Enter your public profile link"
        hint="E.g Twitter,personal website"
        required
        outlined
        shaped
      >
      </v-text-field>
      <v-textarea
        v-model="introduction"
        counter
        label="Brief Introduction"
        placeholder="Enter the brief inntroduction"
        :rules="introductionRules"
        required
        outlined
        shaped
      ></v-textarea>
      <v-btn
        class="mr-4"
        color="rgb(117, 77, 56)"
        :disabled="!valid"
        @click="submit"
      >
        submit
      </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </v-form>
  </div>
</template>
<script>
const reUrl = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
export default {
  data() {
    return {
      valid: true,
      isShowAlert: false,
      imgUrl: '',
      artWorkName: '',
      artWorkNameRules: [
        (v) => !!v || 'artWorkName is required',
        (v) =>
          (v && v.length <= 20) ||
          'artWorkName must be less than 20 characters',
      ],
      artistName: '',
      artistNameRules: [
        (v) => !!v || 'artistName is required',
        (v) =>
          (v && v.length <= 20) || 'artistName must be less than 20 characters',
      ],
      link: '',
      linkRules: [
        (v) => !!v || 'link is required',
        (v) => (v && reUrl.test(v)) || 'link must be the URL of the rule',
      ],
      introduction: '',
      introductionRules: [(v) => v.length <= 500 || 'Max 500 characters'],
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate()
      if (!this.imgUrl) {
        this.isShowAlert = true
      }
    },
    clear() {},
    createErc721() {
      this.dialog = true
    },
    chooseFile() {
      this.$refs.file.click()
    },
    verificationPicFile() {
      const file = this.$refs.file
      const filePath = file.value
      console.log(filePath)
      const ctx = this
      if (filePath) {
        const filePic = file.files[0]
        console.log(filePic)
        const maxFileSize = 500
        if (filePic.size / 1024 > maxFileSize) {
          file.value = ''
          console.log('文件大小不能超过500kb')
          return false
        }
        const reader = new FileReader()
        reader.onload = function (e) {
          console.log(e)
          const data = e.target.result
          console.log(data)
          const image = new Image()
          image.onload = function () {
            const width = image.width
            const height = image.height
            if (width < 400 || height < 400) {
              file.value = ''
              console.log('图片尺寸不符')
              return false
            }
          }
          image.src = data
          ctx.imgUrl = data
        }
        reader.readAsDataURL(filePic)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.artwork-image-wrap {
  padding-bottom: 20px;
}
.create-erc721 {
  width: 124px;
  height: 136px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 20px;
  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }
}
.create-erc721--exists {
  border-color: rgb(45, 129, 255);
}
.erc721-list {
  display: flex;
}
.create-erc721-description {
  padding-top: 10px;
}
.create-erc721-name {
  font-size: 12px;
  opacity: 0.6;
}
.create-btn {
  height: 40px !important;
  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
}
.collection-img-preview {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
.alert {
  position: fixed;
  width: 100%;
}
</style>
