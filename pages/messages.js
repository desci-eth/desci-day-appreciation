import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


export default function ViewMessages(props) {
  const [messageItems, setMessageItems] = useState([])

  useEffect(() => {
    const getMessages = async () => {
      const provider = new ethers.providers.JsonRpcProvider("https://xdai-rpc.gateway.pokt.network")
      const contractAddr = '0x901280B591cAEe7DB1c923E5Ae6f4021805fC53e'
      // const contractABI = require('../../data/abi/AppreciationToken.json')
      const contractABI = require('./api/AppreciationToken.json')
      const contractWithProvider = new ethers.Contract(contractAddr, contractABI, provider)
      const allAddrs = await contractWithProvider.getAllMinters()
    
      let messageItemsTemp = messageItems.slice()
      for (const address of allAddrs) {
        const name = await contractWithProvider.getNameFromAddress(address)
        const location = await contractWithProvider.getLocationFromAddress(address)
        const message = await contractWithProvider.getMessageFromAddress(address)
        messageItemsTemp.push({name: name, location: location, message: message})
        setMessageItems(messageItemsTemp)
      }
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
