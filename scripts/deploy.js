const hre = require("hardhat");

async function main(){
  const Donation = await hre.ethers.getContractFactory("Donation")
  const donation = await Donation.deploy();
  await donation.deployed();

  console.log("Donation deployed address:", donation.address);
}

main()
.then(()=>process.exit(0))
.catch((error)=>{
  console.log(error)
  process.exit(1)
})