export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-primary dark:bg-primary-dark">
      <div className="w-[90%] md:w-[40%]">{children}</div>
    </div>
  );
}
