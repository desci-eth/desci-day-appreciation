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
  return (
    <div className="absolute flex justify-end m-4 w-11/12">
      <ConnectButton onClick={onClickConnect}/>
      <FaucetButton onClick={onClickFaucet}/>
    </div>
   )
}

export default ConnectTopBar;