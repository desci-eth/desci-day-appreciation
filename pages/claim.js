import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
// import styles from '../styles/tailwind.css'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers';

import Container from './components/Container'
import Header from './components/Header'


const switchNetwork = () => {
  window.ethereum.request({
    params: [{
        chainId: "0x64",
        rpcUrls: ["https://xdai-rpc.gateway.pokt.network"],
        chainName: "Gnosis Chain (formerly xDAI)",
        nativeCurrency: {
            name: "xDAI",
            symbol: "xDAI",
            decimals: 18
        },
        blockExplorerUrls: ["https://blockscout.com/xdai/mainnet/"]
    }]
});
}

const getSigner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());
  return signer;
}

export default function PageWithJSbasedForm() {
  const [signer, setSigner] = useState()
  const [userInput, setUserInput] = useState("")

  useEffect(() => {
    // switchNetwork() 
    getSigner().then(_signer => setSigner(_signer));
    console.log(signer)
  }, [signer])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const address = await signer.getAddress()
    const location = event.target.location.value
    const message = event.target.message.value

    if (!signer) {
      setSigner(await getSigner())
    }
    const contractAddr = '0x901280B591cAEe7DB1c923E5Ae6f4021805fC53e'
    // const contractABI = require('../../data/abi/AppreciationToken.json')
    const contractABI = require('/AppreciationToken.json')
    const contractWithSigner = new ethers.Contract(contractAddr, contractABI, signer)
    const tx = await contractWithSigner.mintTo(address, name, location, message)
    alert(`You successfully claimed your NFT! Transaction hash: ${tx.hash}`)
  }

  return (
    <Container>
      <div
        className="relative px-1 py-10 bg-gray-50 shadow-lg sm:rounded-3xl sm:p-20"
      >
        <Header />
        <div>
          <main>
            <div
              v-if="!loading && !fielding.msg.txHash && !fielding.msg.alert"
              className="sm:m-5 mx-5 grid justify-items-center"
            >
              <form onSubmit={handleSubmit}>
                <p>Your name (or pseudonym)</p>
                <input className="border-2" type="text" name="name" required />
                <p>Your location</p>
                <input className="border-2" type="text" name="location" required />
                <p>Message</p>
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
                  <button  type="submit">Send message and receive NFT</button>
                </div>
              </form>
            </div>
          </main>
        </div>
        <Link href="/messages" passHref>
          <a target="_blank">
            <div className="font-sans cursor-pointer p-2" >
              <button className="sm:p-0 pt-2 float-right text-sm sm:text-base bg-gray-50 font-fancy border-opacity-50 border-dashed border-b-2 border-gray-900">
                View Tokens of Appreciation
              </button>
            </div>
          </a>
        </Link>
        <div
          className="pt-5 card-footer bottom-0 sm:absolute sm:bottom-4 sm:pt-10 sm:mt-3"
        >
          <div className="font-sans text-gray-400 text-sm sm:text-center">
            <span>
              Design & code by
            </span>
            <a href="https://www.twitter.com/angelagilhotra/" target="_new">
              @angelagilhotra
            </a>
          </div>
        </div>
      </div>
    </Container>
  )
}
