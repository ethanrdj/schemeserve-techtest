import { useMemo } from "react"

type DividerProps = {
  orientation?: "horizontal" | "vertical"
  color?: string
  thickness?: string
  width?: string
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  color = "white",
  thickness = "2",
  width = "full",
}) => {
  const classes = useMemo(() => {
    return `w-${width} border-${
      orientation === "horizontal" ? "t" : "l"
    }-${color} border-${thickness}`
  }, [orientation, color, thickness, width])

  return <div className={classes} />
}
