async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert('Connected: ' + accounts[0]);
    } catch (err) {
      console.error('User denied access');
    }
  } else {
    alert('MetaMask not detected');
  }
}