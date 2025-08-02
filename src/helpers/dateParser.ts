// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dateParser = (date: any) => {
    const b = date.split(/\D+/);
    const formattedDate = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
    return formattedDate
}