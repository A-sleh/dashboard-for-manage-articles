export default function Header({ title }: { title: string }) {
  return (
    <h1
      className="relative text-xl mb-2 font-medium uppercase dark:text-white before:content-[''] before:absolute
         before:h-3 before:w-[60%] before:-bottom-5 before:left-0"
    >
      {title}
    </h1>
  );
}
