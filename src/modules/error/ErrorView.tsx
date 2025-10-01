import { useNavigate } from "react-router-dom"


const ErrorView = () => {
    const navigate = useNavigate()
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
        <button className="px-6 py-3 max-w-[150px] rounded-sm bg-[rgba(58,163,159,1)] text-white font-semibold cursor-pointer"
    onClick={() => navigate("/")}>Go Home</button>
    </div>
  )
}

export default ErrorView
