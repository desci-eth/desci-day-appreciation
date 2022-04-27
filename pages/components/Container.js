

export default function Container(props) {

  return (
    <div>
    <div
      className="bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen min-w-screen py-6 flex flex-col justify-center sm:py-12"
    >
      {/* {props.toggleSlideover && <Slideover open={props.toggleSlideover} messages={[{from: 'Jerry', msg: 'You are amazing!'}, {from: 'The gerbil', msg: 'Thank you!'}]} />} */}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="sm:absolute sm:inset-0 sm:bg-gradient-to-r sm:from-purple-500 sm:to-purple-900 sm:shadow-lg sm:transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
        ></div>
        {props.children}
        </div>
    </div>
  </div>
  )
}
