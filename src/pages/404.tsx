import Link from "next/link";

export default function NotFounde() {
  return (
    <section className="h-screen flex items-center justify-center dark:bg-primary-dark dark:shadow-md dark:shadow-white">
      <div className="p-6 rounded-md text-center bg-primary dark:bg-secondary-dark w-fit font-bold shadow-2xs">
        <div className="text-white text-3xl mb-5">Route page note found</div>
        <Link
          href="/app/articles"
          className="px-2 py-1 bg-white text-primary hover:shadow-md transition-all rounded-md dark:text-primary-dark"
        >
          Refresh page
        </Link>
      </div>
    </section>
  );
}
