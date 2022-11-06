import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

const Filestorage = require('@skalenetwork/filestorage.js');


const web3Provider = new Web3.providers.HttpProvider('https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos');
let filestorage = new Filestorage(web3Provider);

// Directly with http(s)/ws(s) endpoints
// let filestorage = new Filestorage('----HTTP(s)/WS(s) SKALE ENDPOINT----');

async function upload(event, specificDirectory=''){
  event.preventDefault();
  //create web3 connection
  const web3Provider = new Web3.providers.HttpProvider(
    "https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos"
  );
  let web3 = new Web3(web3Provider);
  console.log("hi")
  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your account & private key
  //note this must include the 0x prefix
  let privateKey = '0x' + '';
  let account = "";

  //get file data from file upload input field
  let file = document.getElementById('files').files[0];
  let reader = new FileReader();

  //file path in account tree (dirA/file.name)
  let filePath;
  if (specificDirectory === '') {
    filePath = file.name;
  } else {
    filePath = specificDirectory + '/' + file.name;
  }

  //file storage method to upload file
  reader.onload = async function(e) {
    const arrayBuffer = reader.result
    const bytes = new Uint8Array(arrayBuffer);
    let link = filestorage.uploadFile(
      account,
      filePath,
      bytes,
      privateKey
    );
  };
  reader.readAsArrayBuffer(file);
}

async function getFiles(storagePath){
  //create web3 connection
  const web3Provider = new Web3.providers.HttpProvider(
    "https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos"
  );
  let web3 = new Web3(web3Provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your account & private key
  let account = "";

  let files = await filestorage.listDirectory(storagePath);

  console.log(files)
}

async function downloadFileToDesktop(storagePath) {
  //create web3 connection
  const web3Provider = new Web3.providers.HttpProvider(
    "https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos"
  );
  let web3 = new Web3(web3Provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  await filestorage.downloadToFile(storagePath);
}

const MystoragePath = ""
function App() {
  return (
    <div className="App">
      <input onChange={(e) => upload(e)} type="file" id="files" />
      <button type="button" onClick={() => getFiles(MystoragePath)}>View file</button>
      <button type="button" onClick={() => downloadFileToDesktop(MystoragePath + "/favicon.ico")}>Download file</button>
    </div>
  );
}

export default App;