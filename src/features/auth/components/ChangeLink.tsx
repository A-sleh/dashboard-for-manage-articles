import Link from "next/link";

export default function ChangeLink({
  link,
  btn,
  desctiption,
}: {
  link: string;
  btn: string;
  desctiption: string;
}) {
  return (
    <div className="flex gap-1 items-center text-center justify-center">
      <p>{desctiption}</p>
      <Link href={link} className="text-primary dark:text-secondary-dark">{btn}</Link>
    </div>
  );
}
