import { format, parseISO } from "date-fns";

type Props = {
  dateString: string;
};

export default function DateFormatter({ dateString }: Props) {
  try {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
  } catch (e) {
    return <time dateTime={dateString}>{dateString}</time>;
  }
}
