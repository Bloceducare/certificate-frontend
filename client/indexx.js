import Cert from '../build/contracts/Cert.json';

let web3;
let cert;

const initWeb3 = () => {
return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3(alert(`You are currently not logged in! Please login to your metamask account and switch to infura testnet then try again. Don't have a metamask? Click here (https://metamask.io/download.html)`)));
  });

} 

const initContract = () => {
  const deploymentKey = Object.keys(Cert.networks)[0];
  return new web3.eth.Contract(
    Cert.abi,
    Cert
      .networks[deploymentKey]
      .address
  );
};

const switchHtmlPage = () => { 
 web3.eth.net.getNetworkType()
  .then(result => {
    if(result == 'rinkeby'){}
      else{
        alert('please use rinkeby')
      };
  });
  
  window.onclick = function(e) {
     let accountInterval = setInterval(function() {
      web3.eth.getAccounts().then(_accounts => {
      cert.methods.admins(_accounts[0]).call()
        .then(result => {
          if(result[0] == true) {
          document.getElementById("design-button").onclick = function() {
            this.href = "admin.html";
             };}
          else{
            document.getElementById("design-button").onclick = function() {
            this.href = "student.html";
             };
          }
          });
           }) 
    }, 100);
  }

  ();
};
  
document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      cert = initContract();
      switchHtmlPage();
    })
    .catch(e => console.log(e.message));
});
