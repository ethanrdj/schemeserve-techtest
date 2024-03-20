import { FC, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useGetCrimeData } from "../shared/hooks/useGetCrimeData"
import { NoCrimesState } from "../shared/components/NoCrimesState"
import { MainLayout } from "../shared/components/MainLayout"
import { Crimes } from "../shared/components/Crimes"
import { Crime } from "../shared/types/crime"
import { Divider } from "../shared/components/Divider"
import { useEffectOnce } from "react-use"
import { LoadingState } from "../shared/components/LoadingState"
import { useSelector } from "react-redux"
import { selectLoadingState } from "../shared/services/slices/postcodesSlice"

export const DetailsView: FC = () => {
  const { id: postcode = "" } = useParams()
  const { getDetailedData } = useGetCrimeData()
  const loading = useSelector(selectLoadingState)
  const [crimeData, setCrimeData] = useState<Crime[]>([])

  useEffectOnce(() => {
    const fetchData = async () => {
      try {
        const response = await getDetailedData(postcode)

        setCrimeData(response?.data ?? [])
      } catch (error) {
        console.error("Error fetching crime data:", error)
      }
    }

    if (postcode) {
      fetchData()
    }
  })

  const categorisedCrimes = useMemo(() => {
    return crimeData.reduce((categories, crime) => {
      categories[crime.category] = [
        ...(categories[crime.category] || []),
        crime,
      ]
      return categories
    }, {} as { [key: string]: Crime[] })
  }, [crimeData])

  const renderBody = useMemo(() => {
    if (loading) {
      return <LoadingState label="Loading crime data..." />
    } else if (crimeData.length > 0) {
      return <Crimes allCrimes={categorisedCrimes} />
    } else {
      return <NoCrimesState />
    }
  }, [loading, crimeData, categorisedCrimes])

  return (
    <MainLayout>
      <h1 className="text-white text-3xl">
        Crime data for <strong>{postcode}</strong>
      </h1>
      <h2 className="text-white text-2xl">
        <strong>{crimeData.length}</strong> total counts
      </h2>
      <Divider />
      <div className="flex flex-col">{renderBody}</div>
    </MainLayout>
  )
}
