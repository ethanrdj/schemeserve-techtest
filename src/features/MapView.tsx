import { FC, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetCrimeData } from "../shared/hooks/useGetCrimeData"
import { Crime } from "../shared/types/crime"
import { useEffectOnce } from "react-use"
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api"
import { MainLayout } from "../shared/components/MainLayout"
import { GOOGLE_KEY } from "../contants"
import { LoadingState } from "../shared/components/LoadingState"
import { useSelector } from "react-redux"
import { selectLoadingState } from "../shared/services/slices/postcodesSlice"

const containerStyle = {
  width: "100%",
  height: "100%",
}

export const MapView: FC = () => {
  const { id: postcode = "" } = useParams()
  const { getDetailedData } = useGetCrimeData()
  const loading = useSelector(selectLoadingState)
  const [crimeData, setCrimeData] = useState<Crime[]>([])
  const [coords, setCoords] = useState<{ lat: number; lng: number }>()
  const [selectedCrime, setSelectedCrime] = useState<Crime | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_KEY,
  })

  useEffectOnce(() => {
    const fetchData = async () => {
      try {
        const response = await getDetailedData(postcode)

        setCrimeData(response?.data ?? [])
        setCoords({
          lat: parseFloat(response?.postcode.data.latitude ?? ""),
          lng: parseFloat(response?.postcode.data.longitude ?? ""),
        })
      } catch (error) {
        console.error("Error fetching crime data:", error)
      }
    }

    if (postcode) {
      fetchData()
    }
  })

  return (
    <MainLayout>
      <div className="w-screen h-screen">
        <h1 className="text-blue-200 text-2xl px-32 pb-4">{`${crimeData.length} counts in ${postcode}`}</h1>

        {loading ? (
          <LoadingState label="Loading map data..." />
        ) : (
          isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={coords}
              zoom={13}
            >
              {crimeData.map((crime) => (
                <div key={crime.id}>
                  <MarkerF
                    position={{
                      lat: parseFloat(crime.location.latitude),
                      lng: parseFloat(crime.location.longitude),
                    }}
                    onMouseOver={() => setSelectedCrime(crime)}
                    onMouseOut={() => setSelectedCrime(null)}
                  />
                  {selectedCrime?.id === crime.id && (
                    <InfoWindowF
                      position={{
                        lat: parseFloat(crime.location.latitude),
                        lng: parseFloat(crime.location.longitude),
                      }}
                      zIndex={1}
                      options={{
                        pixelOffset: {
                          width: 0,
                          height: -40,
                          equals: 0 as any,
                        },
                      }}
                      onCloseClick={() => setSelectedCrime(null)}
                    >
                      <div>
                        <h3 className="uppercase font-bold">
                          {selectedCrime.category}
                        </h3>
                        <p>{selectedCrime.month}</p>
                        <p>{postcode}</p>
                        <p>
                          {crime.outcome_status
                            ? crime.outcome_status.category
                            : "On Going"}
                        </p>
                      </div>
                    </InfoWindowF>
                  )}
                </div>
              ))}
            </GoogleMap>
          )
        )}
      </div>
    </MainLayout>
  )
}
