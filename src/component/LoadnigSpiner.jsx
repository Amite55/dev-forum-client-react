
// import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = () => {
  return (
    <div
      className={`h-[250px]
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      {/* <ScaleLoader size={100} color='red' /> */}
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
}



export default LoadingSpinner