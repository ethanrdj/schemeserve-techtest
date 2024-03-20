import { FC } from "react"
import { useNavigate } from "react-router-dom"

export const NoCrimesState: FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4 items-center text-white mt-4">
      <h2 className="text-xl font-semibold">
        No crimes were found in this area
      </h2>
      <button
        onClick={() => navigate("/")}
        className="h-14 p-3 w-36 bg-transparent border-2 border-white rounded-xl text-white text-lg font-semibold hover:bg-white hover:text-indigo-950"
        data-testid="retry-button"
      >
        Retry
      </button>
    </div>
  )
}
