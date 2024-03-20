import { Route, Routes } from "react-router-dom"
import { MainView } from "../../features/MainView"
import { DetailsView } from "../../features/DetailsView"
import { MapView } from "../../features/MapView"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainView />} />
      <Route path="/:id" element={<DetailsView />} />
      <Route path="/:id/map" element={<MapView />} />
    </Routes>
  )
}
