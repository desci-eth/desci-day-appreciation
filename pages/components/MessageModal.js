import classNames from 'classnames';
import { useState } from 'react';

const MessageModal = ({ show, onClose, name, location, message }) => {
	console.log('name', name)
	return (
		<div
			className={classNames("absolute flex top-2 left-8 w-full h-screen", {
				'invisible': !show
			})}
		>
			<div
				className="z-10 relative bg-white m-auto content-center w-10/12 p-10 px-28 border-solid border-2 border-gray-300 rounded-3xl overflow-y-scroll max-h-[70%]"
			>
				<button
					className="absolute right-4 top-4 text-sm text-blue-500"
					onClick={() => onClose()}
				>Close
				</button>
				<p> <font size="6.25"> ✨ {name} from {location} </font></p>
					<div className="basis-3/4 p-8 text-md whitespace-pre-line leading-7">
	                {message}
	              </div>
				<font size="30">💐</font> {name}
			</div>
		</div>
	)
}

export default MessageModal;