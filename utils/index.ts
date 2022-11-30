const isInTheSameDayAndMonth = (date: string): [boolean, boolean] => {
  const today = new Date()
  const dateToCompare = new Date(date)
  const isInTheSameDay = today.getDate() === dateToCompare.getDate()
  const isInTheSameMonth = today.getMonth() === dateToCompare.getMonth()
  return [isInTheSameDay, isInTheSameMonth]
}

export const getDeadlineTime = (date: Date): string => {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const getFullDeadlineDateTime = (date: string, time: string): string => {
  const [isInTheSameDay, isInTheSameMonth] = isInTheSameDayAndMonth(date)

  const isDeadlineToday: boolean =
    isInTheSameDay && isInTheSameMonth ? true : false

  const deadlineDateWithTime: string =
    (isDeadlineToday
      ? `Hari ini`
      : `${new Date(date).getDate()} ${new Date(date).toLocaleDateString(
          "in-ID",
          {
            year: "numeric",
            month: "long",
          }
        )}`) + `, ${time}`

  return deadlineDateWithTime
}

export const getDeadlineCountdown = (
  date: string
): [string | null, boolean] => {
  const today: Date = new Date()
  const nDays: number = 8
  const [isInTheSameDay, isInTheSameMonth] = isInTheSameDayAndMonth(date)
  const isInUpcomingDays: boolean =
    new Date(date).getDate() - today.getDate() < nDays

  const isDeadlineToday: boolean =
    isInTheSameDay && isInTheSameMonth ? true : false

  const deadlineCountdown: string | null =
    isInTheSameMonth && isInUpcomingDays
      ? isInTheSameDay
        ? "Hari ini"
        : `H-${new Date(date).getDate() - today.getDate()}`
      : null

  return [deadlineCountdown, isDeadlineToday]
}

export const getTotalMilisecond = (time: string): number => {
  const [hour, minute, second] = time.split(":")
  return (
    Number(hour) * 60 * 60 * 1000 +
    Number(minute) * 60 * 1000 +
    Number(second) * 1000
  )
}

export const toLocalGMTMilisecond = (ms: number): number => {
  return ms + 25_200_000
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export const URLify = (oldUrl: string): string => {
  if (/^https?:\/\//i.test(oldUrl)) {
    return oldUrl
  } else {
    return `https://${oldUrl}`
  }
}
