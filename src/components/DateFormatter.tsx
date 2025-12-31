import { format, parseISO } from "date-fns";

type Props = {
  dateString: string;
};

export default function DateFormatter({ dateString }: Props) {
  let content;
  try {
    const date = parseISO(dateString);
    content = format(date, "LLLL d, yyyy");
  } catch {
    content = dateString;
  }
  return <time dateTime={dateString}>{content}</time>;
}
