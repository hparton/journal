import { isValid, format } from "date-fns"
import React, { FunctionComponent } from "react"

interface Props {
  value?: string | number | Date
  dateFormat?: string
}

const DateFormat: FunctionComponent<Props> = ({ value, dateFormat = "dd/MM/yyyy" }) => {
  if (!value) return <span>Invalid Date</span>

  const date = new Date(value)

  if (!isValid(date)) {
    return <span>Invalid Date</span>
  }

  return <span>{format(date, dateFormat)}</span>
}

export default DateFormat
