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
