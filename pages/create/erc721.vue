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
          <div class="create-erc721" v-bind="attrs" v-on="on">
            <v-btn fab small><v-icon> mdi-plus </v-icon></v-btn>
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
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
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
    }
  },
  methods: {
    clear() {},
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
  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
}
</style>
