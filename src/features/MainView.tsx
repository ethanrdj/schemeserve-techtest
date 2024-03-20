import { useState } from "react"
import { useGetCrimeData } from "../shared/hooks/useGetCrimeData"
import { Divider } from "../shared/components/Divider"
import { SearchHistory } from "../shared/components/SearchHistory"
import { MainLayout } from "../shared/components/MainLayout"
import { SearchHeader } from "../shared/components/SearchHeader"
import { LoadingState } from "../shared/components/LoadingState"
import { PostcodeRow } from "../shared/components/PostcodeRow"
import { useSelector } from "react-redux"
import { selectLoadingState } from "../shared/services/slices/postcodesSlice"

export const MainView = () => {
  const [search, setSearch] = useState<string>("")
  const { getMultiplePostcodeData, foundPostcodes } = useGetCrimeData()
  const loading = useSelector(selectLoadingState)

  return (
    <MainLayout>
      <SearchHeader
        searchValue={search}
        onChange={setSearch}
        onSearch={getMultiplePostcodeData}
      />
      <div className="w-9/12">
        <Divider />
      </div>
      <SearchHistory onSearchPostcode={getMultiplePostcodeData} />

      {loading ? (
        <LoadingState label="Loading postcode data..." />
      ) : (
        foundPostcodes.length > 0 && (
          <div className="flex flex-col gap-6 mt-3 w-4/6">
            <h1 className="text-white text-2xl font-semibold">
              Found postcodes
            </h1>
            {foundPostcodes.map((postcode) => (
              <PostcodeRow key={postcode.input} postcode={postcode} />
            ))}
          </div>
        )
      )}
    </MainLayout>
  )
}
