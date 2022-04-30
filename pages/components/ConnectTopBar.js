import InstructionModal from './InstructionModal'
import { useState } from 'react';

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

const ConnectButton = ({ onClick }) => {
  return (
    <div className="relative flex justify-end mx-2">
      <button
        className="p-3 bg-purple-900 text-white hover:bg-pink-800 border-gray-700 rounded-lg"
        onClick={onClick}
      >Connect Wallet</button>
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

const ConnectTopBar = ({ onClickConnect, onClickFaucet }) => {
  const [showInstruction, setShowInstruction] = useState(true);
  return (
    <div>
    <InstructionModal show={showInstruction}/>
    <div className="absolute flex flex-row justify-between m-4 w-11/12">
      <ViewInstructionButton onClick={() => setShowInstruction(!showInstruction)}/>
      <div className="flex"
      >
        <ConnectButton onClick={onClickConnect}/>
        <FaucetButton onClick={onClickFaucet}/>
      </div>
    </div>
    </div>
   )
}

export default ConnectTopBar;