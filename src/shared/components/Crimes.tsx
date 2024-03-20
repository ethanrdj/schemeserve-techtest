import { FC } from "react"
import { Crime } from "../types/crime"
import { TableHeader } from "./TableHeader"
import { TableItem } from "./TableItem"

type CrimesProps = {
  allCrimes: { [key: string]: Crime[] }
}

export const Crimes: FC<CrimesProps> = ({ allCrimes }) => {
  return (
    <div className="flex flex-col gap-9 p-3">
      {Object.entries(allCrimes).map(([category, crimes]) => (
        <div key={category}>
          <h2 className="text-white items-start uppercase text-xl font-bold mb-3">
            {`${category} - ${crimes.length} counts`}
          </h2>

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <TableHeader label="Date" />
                <TableHeader label="Street" />
                <TableHeader label="Outcome Status" />
              </tr>
            </thead>
            <tbody>
              {crimes.map((crime) => (
                <tr
                  key={crime.id}
                  className="border-b border-blue-300 text-white"
                >
                  <TableItem label={crime.month} />
                  <TableItem label={crime.location.street.name} />
                  <TableItem
                    label={
                      crime.outcome_status
                        ? crime.outcome_status.category
                        : "On Going"
                    }
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
