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


const initApp = () => {
  
   web3.eth.net.getNetworkType()
.then(result => {
  if(result == 'rinkeby'){}
    else{
      alert('please use rinkeby')
    };
});
const students = document.getElementById('students');
const stuResult = document.getElementById('stu-result');
const donateEth = document.getElementById('donateEth');
const donResult = document.getElementById('don-result');
const getAssignmentInfo = document.getElementById('getAssignmentInfo');
const getAssignmentResult = document.getElementById('get-assignment-result');
const changeStudentName = document.getElementById('changeStudentName');
const studentNameResult = document.getElementById('student-name-result');
const hideAdmin = document.getElementById('hideAdmin');

let accounts = [];
  let accountInterval = setInterval(function() {
  web3.eth.getAccounts().then(_accounts => {
  accounts = _accounts;
  });
   }, 100);

  changeStudentName.addEventListener('click', (e) => {
    e.preventDefault();
    const fName =  document.getElementById('fName1').value;
    const lName =  document.getElementById('lName1').value;
    const email =  document.getElementById('email8').value;
//    const fName = e.target.elements[0].value;
   // const lName = e.target.elements[1].value;
   // const email = e.target.elements[2].value;
    cert.methods.changeStudentName(email, fName, lName).send({from: accounts[0]})
    .then(result => {
      studentNameResult.innerHTML = `Student name changed`;
    })
    .catch(_e => {
      studentNameResult.innerHTML = `error....only accessible by Admin, email doesn't exist`;
    });
  });

getAssignmentInfo.addEventListener('click', (e) => {
    e.preventDefault();
    const email =  document.getElementById('email9').value;
    const assId =  document.getElementById('number2').value;
    //const email = e.target.elements[0].value;
    //const assId = e.target.elements[1].value;
        cert.methods.getAssignmentInfo(email, assId).call()
    .then(result => {
      getAssignmentResult.innerHTML = `link: ${result[0]} <br> status:
       ${result[1]}`;
    })
    .catch(_e => {
      stuResult.innerHTML = `error.....email doesn't exist, assignmentIndex not correct`;
    });
  });

 students.addEventListener('click', (e) => {
    e.preventDefault();
    const email =  document.getElementById('email7').value;
    
    //const id = e.target.elements[0].value;
  cert.methods.searchStudent(email).call()
    .then(result => {
      stuResult.innerHTML = `student First Name: ${result[0]} <br>  student Last Name:
       ${result[1]} <br> student Commendation: ${result[2]} <br> student grade: ${result[3]} <br> student assignmentIndex:${result[4]}
      <br> student active: ${result[5]}`;
    })
    .catch(_e => {
      stuResult.innerHTML = `there was an error while trying to read user`;
    });
  });

donateEth.addEventListener('click', (e) => {
    e.preventDefault();
    const deploymentKey = Object.keys(Cert.networks)[0];
    const amount =  document.getElementById('number3').value;
    
    //const amount = e.target.elements[0].value;
    web3.eth.sendTransaction({from: accounts[0], to: Cert.networks[deploymentKey].address, value: web3.utils.toWei(amount, 'ether')})
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      cert = initContract();
      initApp();
    })
    .catch(e => console.log(e.message));
});
