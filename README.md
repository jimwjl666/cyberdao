# cyberx

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
## 下载ganache 配置metamask
1. 网址：https://www.trufflesuite.com/ganache
2. 安装：双击安装即可
3. 参考文档：https://blog.csdn.net/wumingzhifu/article/details/106329147
## 部署、测试合约
1. 网址：https://remix.ethereum.org/
## 调用合约
``` javascript
      const contract = new this.web3Instance.eth.Contract(Abi, contractAddress)
      const from = this.web3.account
      const contractRes = await contract.methods.store(10).send({ from })    
```
## UI框架
1. 网址：https://vuetifyjs.com/zh-Hans/
2. 竞品网站：https://www.bakeryswap.org/
3. 技术方案：https://sme1gyzv67.feishu.cn/docs/doccnCNYq1ZyCu551UtftylwG4d
4. iconfont: https://icomoon.io/

## nuxt.js框架地址
https://www.nuxtjs.cn/

## 使用插件地址
1. https://axios.nuxtjs.org/
2. https://github.com/se-panfilov/vue-notifications [参考地址：https://madewith.cn/605]


