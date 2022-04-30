import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


export default function ViewMessages(props) {
  const [messageItems, setMessageItems] = useState([])

  useEffect(() => {
    const getMessages = async () => {
      const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
      const contractAddr = '0xD73b048697Cd68cb9c5b534f890F915452191D1A'
      // const contractABI = require('../../data/abi/AppreciationToken.json')
      const contractABI = require('./AppreciationToken.json')
      const contractWithProvider = new ethers.Contract(contractAddr, contractABI, provider)
      // const allAddrs = await contractWithProvider.getAllMinters()
      const currentTokenId = await contractWithProvider._currentTokenId()
    
      let messageItemsTemp = messageItems.slice()
      for (let tokenId = 0; tokenId < currentTokenId; tokenId++) {
        const metadataURI = 'https://ipfs.io/ipfs/' + (await contractWithProvider.tokenURI(tokenId)).replace('ipfs://', '')
        const resp = await fetch(metadataURI)
        const metadata = await resp.json()
        const name = metadata['attributes'][0]['value']
        const location = metadata['attributes'][1]['value']
        const message = metadata['attributes'][2]['value']
        messageItemsTemp.push({name: name, location: location, message: message})
        setMessageItems(messageItemsTemp)
      }
      // let messageItemsTemp = messageItems.slice()
      // for (const address of allAddrs) {
      //   const name = await contractWithProvider.getNameFromAddress(address)
      //   const location = await contractWithProvider.getLocationFromAddress(address)
      //   const message = await contractWithProvider.getMessageFromAddress(address)
      //   messageItemsTemp.push({name: name, location: location, message: message})
      //   setMessageItems(messageItemsTemp)
      // }
      console.log(messageItems)
    }
    getMessages().then(() => console.log('got messages'))
  }, [])

  return (
    <div>
      <div className="absolute inset-6 px-4 sm:px-6">
        <div
          className="h-full border-2 border-dashed border-gray-200 overscroll-auto block overflow-x-scroll p-4"
          aria-hidden="true"
        >
          {messageItems && messageItems.map((message, index) => (
            <div key={index} className="grid grid-cols-1 gap-4 mt-4 font-sans">
              { message.message } <br />
              <span className="font-kernel">{ `~ ${message.name}` }</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
