import Head from 'next/head'
import Link from 'next/link'
import ConnectTopBar from './components/ConnectTopBar'
import MintingModal from './components/MintingModal'
import styles from '../styles/Home.module.css'
// import styles from '../styles/tailwind.css'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers';

import Container from './components/Container'
import Header from './components/Header'


const nftDescription = "ETHAmsterdam 2022 DeSci Day NFT"
const nftName = "ETHAmsterdam 2022 DeSci Day NFT"
const nftExternalUrl = "https://gratitude.desci.community"

const PINATA_SECRET_API_KEY = "bd8d80dfbb732b3d4c5a3a59943184a01496c2dfd97042305fa1ab3f9a335fb3";
const NEXT_APP_PINATA_API_KEY = "7e33b2215414060f54f1";

const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{
          chainId: "0x64",
      }]
    });
  } catch(e) {
    if (e.code === 4001) {
      window.alert('Please switch to the GNOSIS chain.')
    }
  }
};

const getSigner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  console.log('in signer');
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
    console.log("Account:", address);
  } catch(e) {
    //TODO
  }
  return signer;
}

export default function PageWithJSbasedForm() {
  const [signer, setSigner] = useState()
  const [address, setAddress] = useState()
  const [userInput, setUserInput] = useState("")
  const [showMintingModal, setShowMintingModal] = useState(false)

  useEffect(() => {
    if (signer) {
      signer.getAddress().then(_address => setAddress(_address))
    } else {
      getSigner().then(_signer => setSigner(_signer));
    }
  }, [signer])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const name = event.target.name.value

    if (!signer) {
      getSigner().then(_signer => setSigner(_signer));
    }

    console.log('after signer', signer);

    const address = signer ? await signer.getAddress() : null;

    
    const contractAddr = '0xA87fd3Ba4a16C3F93f04645dB079b93703eF580d'
    // const contractABI = require('../../data/abi/AppreciationToken.json')
    const contractABI = require('./AppreciationBouquet.json')
    const contractWithSigner = new ethers.Contract(contractAddr, contractABI, signer)
    
    let pinCidsBefore;
    console.log('GET https://api.pinata.cloud/data/pinList')
    fetch('https://api.pinata.cloud/data/pinList', {
      method: 'GET',
      headers: {
        pinata_api_key: NEXT_APP_PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    })
      .then(resp => resp.json())
      .then(pinList => {
        console.log('Successful request: GET https://api.pinata.cloud/data/pinList')
        pinCidsBefore = pinList['rows'].map(item => item.ipfs_pin_hash)
      })
      .catch(err => console.log('Failed request: GET https://api.pinata.cloud/data/pinList'))

    console.log('contract', contractWithSigner);

    console.log('name', name);
    const data = {
      description: nftDescription,
      name: nftName,
      external_url: nftExternalUrl,
      image: 'https://gateway.pinata.cloud/ipfs/QmYJUxY1sqrZgo1CNfxRFGc2CGiq3JApjthBGuDoQ9fWXQ',
      attributes: [
        { "trait_type": "name",  "value": name },
      ]
    }
    const jsondata = JSON.stringify(data);
    const blob = new Blob([jsondata], { type: 'application/json' });
    const file = new File([ blob ], 'file.json');

    console.log('metadata as object...')
    console.log(data)
    const formData  = new FormData();
    formData.append("file", file);
    console.log('POST https://api.pinata.cloud/pinning/pinFileToIPFS')
    setShowMintingModal(true);
    fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: "POST",
      headers: {
        pinata_api_key: NEXT_APP_PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
      body: formData
    })
    .then(() => {
      let pinCidsAfter;
      fetch('https://api.pinata.cloud/data/pinList', {
        method: 'GET',
        headers: {
          pinata_api_key: NEXT_APP_PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      })
        .then(data => data.json())
        .then(async(pinList) => {
          console.log('Successful request: GET https://api.pinata.cloud/data/pinList')
          pinCidsAfter = pinList['rows'].map(item => item.ipfs_pin_hash);
          let metadataURI = `ipfs://${pinCidsAfter.filter(x => !pinCidsBefore.includes(x))[0]}`;
          console.log('metadataURI', metadataURI);
          const tulipURIs = [
            'https://gateway.pinata.cloud/ipfs/QmWwPrGT858GcHDQc3EEgREvEk4RmNHSnCLsS8aN9QST8j',
            'https://gateway.pinata.cloud/ipfs/QmYXDq1fDFGYAi75rTeqTrATXGQu3kYfcyF6P16qhgUdvW',
            'https://gateway.pinata.cloud/ipfs/QmRKUHdJU8jcTnc7MvJ9UDzaxCvZdLtrK4WF7oCF6cRUx5',
            'https://gateway.pinata.cloud/ipfs/Qme17goezKdXaYHs7jDRB8iaYjRxU5kjZZM2dMqj7gRUt2',
            'https://gateway.pinata.cloud/ipfs/Qmewm9BG3sWTj6UHQdTtb3dFjoYtDgwLMpVpdG34K3TKuj',
            'https://gateway.pinata.cloud/ipfs/Qmf5HY9froLG8NqiitKySCmAmWWxUThmogmEe7cAXBdgZA'
          ]
          const tx = await contractWithSigner.mintTo(address, metadataURI, tulipURIs);
          setShowMintingModal(false);
          alert(`You successfully claimed your NFT! Transaction hash: ${tx.hash}`)


        })
        .catch(err => console.log('Failed request: GET https://api.pinata.cloud/data/pinList'))
    })
    .catch(err => {
      console.log(err)
      console.log('Failed request: POST https://api.pinata.cloud/pinning/pinFileToIPFS')
    })

    
  }

  return (
    <div>
    <ConnectTopBar
      address={address || null}
      onClickConnect={() => {
        getSigner().then(_signer => setSigner(_signer));
      }}
      onClickFaucet={() => {
        window.open('https://www.gimlu.com/faucet')
      }}
      showInstructions={false}
    />
    <Container>
      <div
        className="relative px-1 py-10 bg-gray-50 shadow-lg sm:rounded-3xl sm:p-20"
      >
        <h1 className="text-3xl">What might this mystery token be...?</h1>
        <div>
          <main>
            <div
              v-if="!loading && !fielding.msg.txHash && !fielding.msg.alert"
              className="sm:m-5 mx-5 grid justify-items-center"
            >
              <form onSubmit={handleSubmit}>
                <p> 👤 Name</p>
                <div>
                  <textarea
                    className="border-2"
                    name="message"
                    value={userInput}
                    onChange={() => setUserInput(event.target.value)}
                    cols="40" rows="5"
                    required
                  ></textarea>
                </div>
                <div
                  className="animate-pulse text-sm bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 py-5 px-5 shadow-md rounded-xl m-5 ring-4 ring-blue-100 font-lato font-light"
                >
                  <button  className="font-sans text-lg" type="submit"><font size="4.5">Mint mystery token</font></button>
                </div>
              </form>
            </div>
          </main>
        </div>
      
      </div>
    </Container>
    <MintingModal show={showMintingModal}/>
    </div>
  )
}
