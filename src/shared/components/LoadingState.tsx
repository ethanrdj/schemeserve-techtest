import { FC } from "react"
import { TailSpin } from "react-loader-spinner"

type LoadingStateProps = {
  label?: string
}

export const LoadingState: FC<LoadingStateProps> = ({ label }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <TailSpin height={24} color="white" aria-label="Loading crime data" />
      {label && <p className="text-white ml-2">{label}</p>}
    </div>
  )
}
