const ConnectButton = ({ onClick }) => {
  return (
    <div className="absolute flex justify-end m-4 w-11/12">
      <button
        className="p-3 bg-purple-900 text-white hover:bg-pink-800 border-gray-700 rounded-lg"
        onClick={onClick}
      >Connect Wallet</button>
    </div>
   )
}

export default ConnectButton