<template>
  <div class="cyberx-container">
    <!-- <CyberxBack / -->
    <h1 class="cyberx-title">Mint New Artwork</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row class="artwork-image-wrap">
        <v-col cols="12">
          <v-row>
            <v-col cols="12"
              ><div>
                We recommend an image of at least 400*400. Gifs work too
              </div>
              <div>Max size:10MB</div>
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-progress-circular
                v-show="imgLoading"
                indeterminate
                class="p-absolute"
              ></v-progress-circular>
              <img :src="imgUrl" alt="" class="collection-img-preview" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <input
            ref="file"
            type="file"
            style="display: none"
            accept="image/png, image/gif"
            @change="verificationPicFile(this)"
          />
          <v-btn
            color="rgb(117, 77, 56)"
            :disabled="imgLoading"
            @click="chooseFile"
            >Choose File
          </v-btn>
        </v-col>
      </v-row>
      <v-alert v-show="isShowAlert" type="warning" dismissible>
        Please upload the picture
      </v-alert>
      <v-text-field
        v-model="artWorkName"
        :counter="50"
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
        :counter="50"
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
        :loading="submitLoading"
        @click="submit"
      >
        submit
      </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </v-form>
    <v-dialog v-model="dialog" persistent max-width="540px">
      <v-card class="pa-12 bg-dark">
        <i
          class="cbd-close p-absolute c-pointer font-20"
          style="top: 24px; right: 24px"
          @click="initData"
        ></i>
        <div class="font-18 mb-5">
          <i class="cbd-success mr-2"></i><span>铸造成功</span>
        </div>
        <div class="mint-dialog mb-5">
          <div>
            <span class="mint-dialog-item text-gray">NFT Name</span
            >{{ artWorkName }}
          </div>
          <div>
            <span class="mint-dialog-item text-gray">Created by</span>
            <Links :address="web3.account" />
          </div>
          <div>
            <span class="mint-dialog-item text-gray">Blockchain</span>Ethereum
          </div>
          <div>
            <span class="mint-dialog-item text-gray">Contract Address</span>
            <Links :address="contractAddress" />
          </div>
          <div>
            <span class="mint-dialog-item text-gray">NFT ID</span>{{ tokenId }}
          </div>
          <div>
            <span class="mint-dialog-item text-gray">IPFS Hash</span
            >{{ IpfsHash | formatAddress }}
          </div>
          <div>
            <span class="mint-dialog-item text-gray">Author Name</span
            >{{ artistName }}
          </div>
          <div>
            <span class="mint-dialog-item text-gray">External Link</span
            >{{ link }}
          </div>
          <div>
            <span class="mint-dialog-item text-gray">Description</span
            >{{ introduction }}
          </div>
        </div>
        <div class="text-center">
          <v-btn class="mb-3" color="primary" to="/space" large>OK</v-btn>
          <div class="font-12">快去个人中心上架作品吧！</div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { nftContractAbi, nftContractAddress } from '~/contracts/nftToken'
const reUrl = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
const uploadUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS'

const picMap = { png: 1, gif: 2 }
export default {
  asyncData({ store, redirect }) {
    if (!store.state.web3.isConnected) {
      redirect('/')
    }
  },
  data() {
    return {
      dialog: false,
      valid: true,
      isShowAlert: false,
      imgUrl: '',
      IpfsHash: '',
      artWorkName: '',
      artWorkNameRules: [
        (v) => !!v || 'artWorkName is required',
        (v) =>
          (v && v.length >= 5 && v.length <= 50) ||
          'artWorkName must be less than 20 characters',
      ],
      artistName: '',
      artistNameRules: [
        (v) => !!v || 'artistName is required',
        (v) =>
          (v && v.length >= 5 && v.length <= 50) ||
          'artistName must be less than 20 characters',
      ],
      link: '',
      linkRules: [
        (v) =>
          (v && reUrl.test(v) && v.length >= 5 && v.length <= 500) ||
          'link must be the URL of the rule',
      ],
      introduction: '',
      introductionRules: [
        (v) => (v && v.length >= 5 && v.length <= 500) || 'Max 500 characters',
      ],
      submitLoading: false,
      imgLoading: false,
      fileType: 1,
      tokenId: '',
      contractAddress: nftContractAddress,
    }
  },
  computed: {
    ...mapState(['web3Instance', 'web3']),
  },
  notifications: {
    showUploadError: {
      message: 'Failed to authenticate',
      type: 'error', // You also can use 'VueNotifications.types.error' instead of 'error'
    },
    showCreateSuccess: {
      message: 'created success',
      type: 'success',
    },
  },
  methods: {
    initData() {
      this.imgUrl = ''
      this.$refs.form.reset()
    },
    async submit() {
      this.$refs.form.validate()
      if (!this.imgUrl) {
        this.isShowAlert = true
        return
      }
      // upload files
      this.$loading.open()
      this.submitLoading = true
      const tokenID = await this.mint()
      console.log(tokenID)
      this.tokenId = tokenID
      await this.artworks(tokenID)
      this.showCreateSuccess()
      this.submitLoading = false
      this.$loading.close()
      this.dialog = true

      // picUrl https://gateway.pinata.cloud/ipfs/QmRP5uqzptHXbdv9U6A7K1j87ErxqaYf94g1ynPZWBUzKS
      // call contract
    },
    clear() {
      this.artWorkName = ''
      this.artistName = ''
      this.link = ''
      this.introduction = ''
      this.imgUrl = ''
      this.$refs.observer.reset()
    },
    async mint() {
      console.log('this.IpfsHash', this.IpfsHash)
      // this.IpfsHash = 'QmRP5uqzptHXbdv9U6A7K1j87ErxqaYf94g1ynPZWBUzKS'
      const contract = new this.web3Instance.eth.Contract(
        nftContractAbi,
        nftContractAddress
      )
      const account = this.web3.account

      const contractRes = await contract.methods
        .mint(account, this.IpfsHash)
        .send({ from: account, value: 10 ** 16 })
      console.log(contractRes)
      return this.getTopics(contractRes)
    },
    getTopics(transction) {
      const topics =
        transction?.events[0]?.raw?.topics ||
        transction?.events?.Transfer?.raw?.topics
      /* eslint-disable no-eval */
      return eval(topics[3]).toString(10)
    },
    artworks(TokenID) {
      console.log(this.IpfsHash)
      const baseUrl = 'https://gateway.pinata.cloud/ipfs/'
      const params = {
        token_id: TokenID,
        name: this.artWorkName,
        token_type: 1,
        address: this.web3.account,
        author_name: this.artistName,
        description: this.introduction,
        file_type: this.fileType,
        file_url: baseUrl + this.IpfsHash,
      }
      if (this.link) {
        params.public_profile_link = this.link
      }
      return this.$api.artworks(params)
    },
    uploadToIPFS(file) {
      const axios = this.$axios
      const data = new FormData()
      data.append('file', file)
      const options = {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data;boundary=${data._boundary}`,
          pinata_api_key: 'c85590da62d9ebc8b93f',
          pinata_secret_api_key:
            '30a5ed29f8b97e8e17f73a332bd67b8ce74ec4ce6f1a2ea82899acb7d6e63789',
        },
      }
      return axios.post(uploadUrl, data, options)
    },
    createErc721() {
      this.dialog = true
    },
    chooseFile() {
      this.$refs.file.click()
    },
    verificationPicFile() {
      const file = this.$refs.file
      const filePath = file.value
      const ctx = this
      if (filePath) {
        const filePic = file.files[0]
        const hasSuffix = Object.keys(picMap).some((suffix) => {
          return filePic.name.toLowerCase().endsWith(`.${suffix}`)
        })
        if (!hasSuffix) {
          this.showUploadError({ message: '文件类型不支持' })
          return false
        }
        const arr = filePic.name.split('.')
        this.fileType = picMap[arr[arr.length - 1]]
        const maxFileSize = 10 * 1024
        if (filePic.size / 1024 > maxFileSize) {
          file.value = ''
          this.showUploadError({ message: '文件大小不能超过10M' })
          return false
        }
        const reader = new FileReader()
        reader.onload = async (e) => {
          const data = e.target.result
          const image = new Image()
          image.onload = function () {
            const width = image.width
            const height = image.height
            if (width < 100 || height < 100) {
              file.value = ''
              ctx.showUploadError({ message: '图片尺寸不符' })
              return false
            }
          }
          image.src = data
          ctx.imgUrl = data

          this.imgLoading = true
          const { IpfsHash } = await this.uploadToIPFS(file.files[0])
          this.IpfsHash = IpfsHash
          this.imgLoading = false
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
.mint-dialog-item {
  display: inline-block;
  height: 34px;
  line-height: 34px;
  width: 142px;
}
</style>
