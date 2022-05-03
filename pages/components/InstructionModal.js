import classNames from 'classnames';
import { useState } from 'react';

const InstructionModal = ({ show }) => {
	const [showInstruction, setShowInstruction] = useState(show);
	return (
		<div
			className={classNames("absolute flex top-0 left-0 w-full h-full", {
				'invisible': !showInstruction
			})}
		>
			<div
				className="z-10 relative bg-white m-auto content-center w-6/12 p-10 px-28 border-solid border-2 border-gray-300 rounded-3xl"
			>
				<button
					className="absolute right-4 top-4 text-sm text-blue-500"
					onClick={() => setShowInstruction(false)}
				>Close
				</button>
				<p> <font size="6.25"> ✨ Instructions </font></p>
				<p> <em>browser only, mobile not supported</em> </p>
				<p className="my-4 text-lg">1. Connect Wallet + Set Network to Gnosis (xDAI)</p>
				<p className="my-4 text-lg">2. If you need xDAI, click on &ldquo;Get xDAI&ldquo; and get some from a faucet (Gnosis chain)</p>
				<p className="my-4 text-lg">3. Fill out the form with your name, location and message</p>
				<p className="my-4 text-lg">4. Click &ldquo;Send message and receive NFT&ldquo; to mint your appreciation NFT!</p>
				<p className="my-4 text-lg">5. We will later assemble the messages into a non-fungible bouquet for Eugene and Erik </p>
				<font size="30">💐</font> Thanks, DeSci Stewards
			</div>
		</div>
	)
}

export default InstructionModal;