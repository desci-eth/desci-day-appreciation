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
				className="z-10 relative transition-all ease-in-out delay-150 duration-200 bg-white m-auto content-center max-w-lg p-10 border-solid border-2 border-gray-300 rounded-3xl"
			>
				<button
					className="absolute right-4 top-4 text-sm text-blue-500"
					onClick={() => setShowInstruction(false)}
				>Close
				</button>
				<p className="my-4 text-lg">1. Connect your wallet + confirm that yourm network is xDAI</p>
				<p className="my-4 text-lg">2. If you need xDAI, click on "Get xDAI" and get some from a faucet (choose GNOSIS chain)</p>
				<p className="my-4 text-lg">3. Fill out the form with your name, location and message</p>
				<p className="my-4 text-lg">4. Click "Send message and receive NFT" to mint your appreciation NFT!</p>
				<p className="my-4 text-lg">5. We will later assemble the messages into a bouquet NFT for Eugene and Erik</p>
			</div>
		</div>
	)
}

export default InstructionModal;