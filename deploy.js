const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
//updated web3 and hdwallet-provider imports added for convenience

// deploy code will go here
const { abi, evm } = require("./compile");
const provider = new HDWalletProvider(
  "rigid prize seed wall solid cloth clog online senior unlock annual vague",
  "https://sepolia.infura.io/v3/a59de92a70514396acb384bcd79aa5ff"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object  })
    .send({ gas: "1000000", from: accounts[0] });
  console.log(JSON.stringify(abi));
  console.log(evm.bytecode.object);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
