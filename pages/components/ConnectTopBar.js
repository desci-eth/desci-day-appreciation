import InstructionModal from './InstructionModal'
import { useState, useCallback } from 'react';

const ViewInstructionButton = ({ onClick }) => {
  return (
    <div className="relative flex mx-2">
      <button
        className="p-3 bg-purple-900 text-white hover:bg-pink-800 border-gray-700 rounded-lg"
        onClick={onClick}
      >View Instructions</button>
    </div>
   )
}

const ConnectButton = ({ address, onClick }) => {
  return (
    <div className="relative flex justify-end mx-2">
    {!address
      ? (<button
        className="p-3 bg-purple-900 text-white hover:bg-pink-800 border-gray-700 rounded-lg"
        onClick={onClick}
      >Connect Wallet</button>)
      : (<button
        className="p-3 bg-gray-500 text-white border-gray-700 rounded-lg"
        onClick={onClick}
        disabled={true}
      >{address.slice(0, 7)}...</button>)
    }
    </div>
   )
}

const FaucetButton = ({ onClick }) => {
  return (
    <div className="relative flex justify-end mx-2">
      <button
        className="p-3 bg-purple-900 text-white hover:bg-pink-800 border-gray-700 rounded-lg"
        onClick={onClick}
      >Get xDAI</button>
    </div>
   )
}

const ConnectTopBar = ({ address, onClickConnect, onClickFaucet, showInstructions }) => {
  return (
    <div>
    <InstructionModal show={showInstructions}/>
    <div className="absolute flex flex-row justify-end m-4 w-11/12">
      <div className="flex"
      >
        <ConnectButton address={address} onClick={onClickConnect}/>
        <FaucetButton onClick={onClickFaucet}/>
      </div>
    </div>
    </div>
   )
}

export default ConnectTopBar;