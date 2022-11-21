export const getFullDeadlineDateTime = (
  date: string,
  time: string
): [string, boolean] => {
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

  return [deadlineDateWithTime, isDeadlineToday]
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
