
export default function ViewMessageButton(props) {

  return (
    <div className="font-sans cursor-pointer p-2" >
      <button className="sm:p-0 pt-2 float-right text-sm sm:text-base bg-gray-50 font-fancy border-opacity-50 border-dashed border-b-2 border-gray-900">
        {/* <button
          className="text-sm sm:text-base bg-gray-50 font-fancy border-opacity-50 border-dashed border-b-2 border-gray-900"
        >
          View Messages
        </button> */}
        View Messages
      </button>
    </div>
  )
}
