const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "retire debris evil chase muscle tribe acoustic august tail balcony certain blush"


module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/c5787339db824d0c8383ce97bff4dbb1")
      },
      network_id:"3", 
    }
  }
};
