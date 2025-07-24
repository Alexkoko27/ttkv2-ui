const CONTRACT_ADDRESS = "0x0E0721f0Fba751e6f7a7d2c612D860756AC54C21";
const ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address,uint256) returns (bool)",
  "function mint(address,uint256)",
  "function burn(uint256)",
  "function burnFrom(address,uint256)",
  "function multiSend(address[],uint256[])"
];

let provider, signer, contract;

async function init() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const account = await signer.getAddress();
  document.getElementById("account").textContent = account;
  const balance = await contract.balanceOf(account);
  document.getElementById("balance").textContent = ethers.utils.formatUnits(balance, 18);
}

async function transfer() {
  const to = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;
  await contract.transfer(to, ethers.utils.parseUnits(amount, 18));
}

async function mint() {
  const to = document.getElementById("mintTo").value;
  const amount = document.getElementById("mintAmount").value;
  await contract.mint(to, ethers.utils.parseUnits(amount, 18));
}

async function burn() {
  const amount = document.getElementById("burnAmount").value;
  await contract.burn(ethers.utils.parseUnits(amount, 18));
}

async function burnFrom() {
  const from = document.getElementById("burnFromAddress").value;
  const amount = document.getElementById("burnFromAmount").value;
  await contract.burnFrom(from, ethers.utils.parseUnits(amount, 18));
}

async function multiSend() {
  const lines = document.getElementById("multiSendData").value.trim().split("\n");
  const addresses = [];
  const amounts = [];
  for (const line of lines) {
    const [addr, amt] = line.split(",");
    addresses.push(addr.trim());
    amounts.push(ethers.utils.parseUnits(amt.trim(), 18));
  }
  await contract.multiSend(addresses, amounts);
}

init();