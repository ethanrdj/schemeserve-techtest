import { PropsWithChildren, forwardRef } from "react"
import { useNavigate } from "react-router-dom"

export const MainLayout = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    const navigate = useNavigate()
    return (
      <div
        {...props}
        ref={ref}
        className="flex flex-col gap-6  items-center  min-h-screen w-screen bg-blue-950"
      >
        <div className="w-full self-start px-24 pt-16">
          <button
            onClick={() => navigate("/")} // acts as a home button
            className="text-3xl text-white font-bold hover:text-blue-300"
            data-testid="home-button"
          >
            Crime data search
          </button>
        </div>
        {children}
      </div>
    )
  }
)
