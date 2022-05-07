import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import classNames from 'classnames';

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


      console.log(metadatas);

    }
    getMessages().then(() => console.log('got messages'))
    console.log('address at the end', address);
  }, [signer, address])


  return (
    <div>
      <div className="absolute inset-0 sm:px-6">
        <div className="absolute inset-0 sm:px-6 bg-[url('../public/message-background.jpg')] bg-fixed opacity-20 z-0 overflow-x-hidden">
        </div>
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
            className="fixed h-4/5 w-11/12 p-4 my-24 mx-6 z-30 flex flex-row items-end overflow-x-auto overflow-y-hidden"
          >
          {metadatas?.map((metadata, index) =>
          <div>

            <div className={classNames("relative p-8 my-24 w-64 h-28 min-w-[20%]",
            {
              'my-48': index % 2,
            }
            )} key={index}>
            <div className="w-fit relative animate-bounce hover:animate-none hover:cursor-pointer">
              <img className="w-fit relative animate-bounce hover:animate-ping hover:cursor-pointer z-30" src={['https://gateway.pinata.cloud/ipfs/', metadata?.image?.slice(7)].join('')}/>
              <div className="flex absolute p-4 top-1/2 mx-auto z-20 w-full h-full animate-bounce hover:animate-none">{metadata?.attributes[0].value} from {metadata?.attributes[1].value}</div>
            </div>
            </div>
          </div>
          )}

          </div>

      </div>
    </div>
  )
}
