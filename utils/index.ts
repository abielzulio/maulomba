export const getDeadlineTime = (date: Date): string => {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const getFullDeadlineDateTime = (date: string, time: string): string => {
  const today: Date = new Date()

  const isDeadlineToday: boolean =
    new Date(date).getDate() === today.getDate() ? true : false

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
  const inTheSameMonth: boolean = new Date(date).getMonth() === today.getMonth()
  const isInUpcomingDays: boolean =
    new Date(date).getDate() - today.getDate() < nDays
  const isTodayDeadline: boolean = new Date(date).getDate() === today.getDate()

  const deadlineCountdown: string | null =
    inTheSameMonth && isInUpcomingDays
      ? isTodayDeadline
        ? "Hari ini"
        : `H-${new Date(date).getDate() - today.getDate()}`
      : null

  return [deadlineCountdown, isTodayDeadline]
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

export const URLify = (oldUrl: string): string => {
  const addReferral = (url: string): string => {
    const ref: string = "ref=maulomba"
    return url + (url.slice(-1) === "/" ? ref : `/${ref}`)
  }
  if (/^https?:\/\//i.test(oldUrl)) {
    return addReferral(oldUrl)
  } else {
    return `https://${addReferral(oldUrl)}`
  }
}
