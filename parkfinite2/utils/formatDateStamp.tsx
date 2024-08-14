export default function formatDateStamp(timeStamp: string | null): string {
  if (!timeStamp) return "Date unavailable, sorry!";

  const event = new Date(timeStamp);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return event.toLocaleDateString("en-GB", options);
}