import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import ConnectTopBar from './components/ConnectTopBar'

const PINATA_SECRET_API_KEY = "bd8d80dfbb732b3d4c5a3a59943184a01496c2dfd97042305fa1ab3f9a335fb3";
const NEXT_APP_PINATA_API_KEY = "7e33b2215414060f54f1";

const getSigner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  try {
    await switchNetwork();
    await provider.send("eth_requestAccounts", []);
  } catch(e) {
      if (e.code === -32002) {
        window.alert('Please open your metamask and approve any pending transactions from us.')
      }
  }
  const signer = provider.getSigner();
  try {
    const address = signer ? await signer.getAddress() : null;
  } catch(e) {
    //TODO
  }
  return signer;
}

export default function ViewMessages(props) {
  const [messageItems, setMessageItems] = useState([])
  const [signer, setSigner] = useState()
  const [address, setAddress] = useState()
  const [metadatas, setMetadatas] = useState([])

  useEffect(() => {
    
    const getMessages = async () => {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");


      const bouquetContractAddr = '0xA87fd3Ba4a16C3F93f04645dB079b93703eF580d';
      const bouquetContractABI = require('./AppreciationBouquet.json')
      const bouquetContractWithProvider = new ethers.Contract(bouquetContractAddr, bouquetContractABI, provider)


      const currentTokenId = await bouquetContractWithProvider._currentTokenId


      if (signer) {
        signer.getAddress()
          .then(_address => setAddress(_address))
      } else {
        getSigner().then(_signer => setSigner(_signer));
      }
     
      const allBouquetAddresses = bouquetContractWithProvider.getAllMinters();

      const getAllBouquetMinters = async() => bouquetContractWithProvider.getAllMinters();
      const allBouquetMinters = await getAllBouquetMinters();

      const bouquetIndex = address ? allBouquetMinters.indexOf(address) : null;
      const bouquetTokenId = bouquetIndex === 0 ? 0 : (bouquetIndex || null);

      const getTulipURIs = async (tokId) => bouquetContractWithProvider.tulipURIs(tokId);
      const tulipURIs = bouquetTokenId === null ? null : await getTulipURIs(bouquetTokenId + 1);
      
      console.log('tulips', tulipURIs);
      let metadataList = [];


      const getMetadata = async(url) =>
            fetch(url, {
              method: 'GET'
            })


      console.log('metadata', metadatas);
      if (tulipURIs && metadatas?.length === 0) {
        const promises = 
        Promise.all(
              tulipURIs.map((uri) => getMetadata(uri))   
          ).then(datas => {
              console.log('datas', datas);
              return Promise.all(datas.map(data => data.json()))
            }).then(res => {
              console.log(res);
              setMetadatas(res)
            })
          
         console.log('promises', promises);
      }

          //setMetadatas(metadataList);

      console.log(metadatas);

      //const url = ['https://gateway.pinata.cloud/ipfs/', bouquetTokenURI.slice(7)].join('');

      // const getMetadata = async() =>
      //   fetch(url, {
      //     method: 'GET',
      //   })
      // if (url) {
      //   getMetadata()
      //     .then(data => data.json())
      //     .then(metadata => setMetadata(metadata));
      // }
    }
    getMessages().then(() => console.log('got messages'))
    console.log('address at the end', address);
  }, [signer, address])


  return (
    <div>
      <div className="absolute inset-0 sm:px-6 bg-[url('../public/message-background.jpg')] bg-fixed">
          <ConnectTopBar
            address={address}
            onClickConnect={() => {
              getSigner().then(_signer => setSigner(_signer));
            }}
            onClickFaucet={() => {
            }}
            showInstructions={false}
          />
        <div
          className="h-4/5 p-4 my-24 mx-6 bg-white overflow-y-scroll"
          aria-hidden="true"
        > {metadatas?.map((metadata) =>
          <div className="flex flex-col w-full">
            <div className="bg-yellow-200 w-full flex justify-center p-2">
            {metadata?.attributes[0].value} from {metadata?.attributes[1].value}
            </div>
            <div className="flex w-full">
              <div className="w-36 min-w-36 basis-1/4 max-w-md p-8">
                <img src={['https://gateway.pinata.cloud/ipfs/', metadata?.image?.slice(7)].join('')}/>
              </div>
              <div className="basis-3/4 p-8 text-md whitespace-pre-line leading-7">
                {metadata?.attributes[2].value}
              </div>
            </div>
          </div>
          )}

        </div>
      </div>
    </div>
  )
}
