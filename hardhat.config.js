// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };



require("@nomicfoundation/hardhat-toolbox");

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
// const ALCHEMY_API_KEY = HLK9a0W1YEvliQPDl4H77hA822LpoFuh;

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "7de1f763173c5ced5cc25f42d0479c74ce4027d8c5ea9e814a706f969dafbbc8";

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/IE8HLK6B6bremTcJ_YFPBQJhV2L2aIsP`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};