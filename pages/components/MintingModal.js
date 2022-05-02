import classNames from 'classnames';
import { useState } from 'react';

const MintingModal = ({ show }) => {
	return (
		<div
			className={classNames("absolute flex top-0 left-0 w-full h-full", {
				'invisible': !show
			})}
		>
			<div
				className="z-10 relative bg-white m-auto content-center w-6/12 p-10 px-28 border-solid border-2 border-gray-300 rounded-3xl"
			>
				Minting, please wait...
			</div>
		</div>
	)
}

export default MintingModal;