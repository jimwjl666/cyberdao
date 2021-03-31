<template>
  <div class="cyberx-container">
    <CyberxBack />
    <h1 class="cyberx-title">创建单个收藏品</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-file-input accept="image/*" label="Upload file"></v-file-input>
      <v-switch v-model="isBids" label="Bids"></v-switch>
      <div class="select-favorites">
        <div class="form-label-name">选择收藏夹</div>
        <div class="erc721-list">
          <div class="create-erc721" @click="createErc721">
            <v-btn fab small class="create-btn"
              ><v-icon> mdi-plus </v-icon></v-btn
            >
            <div class="create-erc721-description">创建</div>
            <div class="create-erc721-name">ERC-721</div>
          </div>

          <div class="create-erc721 create-erc721--exists">
            <v-btn fab small class="create-btn">
              <img src="~/assets/rarible.png" alt=""
            /></v-btn>
            <div class="create-erc721-description">Rarible</div>
            <div class="create-erc721-name">RARI</div>
          </div>
        </div>
      </div>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        hint="e.g. Redeemable T-Shirt with logo"
        required
      ></v-text-field>
      <v-text-field
        v-model="optional"
        :counter="10"
        :rules="optionalRules"
        label="Optional"
        hint="e.g. After purchasing you'll be able to get the real T-shirt"
        required
      ></v-text-field>
      <v-text-field
        v-model="royalty"
        type="number"
        label="版税"
        hint="Recommend 10%,20%,30%"
        required
      >
        <template #append>
          <div>%</div>
        </template>
      </v-text-field>
      <v-btn class="mr-4" type="submit" color="primary"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </v-form>
    <v-dialog v-model="dialog" persistent max-width="380px">
      <v-card>
        <v-card-title>
          <span class="headline">Collection</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
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
                  <v-col cols="12"
                    ><!-- <v-file-input
                      ref="file"
                      style="display: none"
                      hide-input
                      accept="image/*"
                      label="Choose File"
                      prepend-icon="mdi-camera"
                    ></v-file-input> -->
                    <input
                      ref="file"
                      type="file"
                      style="display: none"
                      accept="image/png, image/jpeg"
                      @change="verificationPicFile(this)"
                    />
                    <v-btn color="primary" @click="chooseFile"
                      >Choose File
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12">
                <v-text-field
                  label="Display name"
                  required
                  hint="Token name cannnot be changed in future"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Symbol"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="description"
                  hint="Spread some words about your token collection"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Short url"
                  required
                  hint="Will be used as public URL"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" @click="dialog = false"> Cancel </v-btn>
          <v-btn color="blue darken-1"> Create favorites </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CyberxBack from '~/components/CyberxBack'
export default {
  components: {
    CyberxBack,
  },
  data() {
    return {
      valid: true,
      isBids: true,
      name: '',
      nameRules: [],
      optional: '',
      optionalRules: [],
      royalty: 10,
      dialog: false,
      imgUrl: '',
    }
  },
  methods: {
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
  background: red;
}
</style>
