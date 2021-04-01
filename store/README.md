# 下载ganache 配置metamask
1. 网址：https://www.trufflesuite.com/ganache
2. 安装：双击安装即可
3. 参考文档：https://blog.csdn.net/wumingzhifu/article/details/106329147
# 部署、测试合约
1. 网址：https://remix.ethereum.org/
# 调用合约
``` javascript
      const contract = new this.web3Instance.eth.Contract(Abi, contractAddress)
      const from = this.web3.account
      console.log(from)
      const contractRes = await contract.methods.store(10).send({ from })
      console.log(contractRes)
```
# UI框架
1. 网址：https://vuetifyjs.com/zh-Hans/