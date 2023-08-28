import { quicksand } from "~/pages/_app";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl bg-white p-4 before:absolute before:-top-1 before:left-0 before:-z-10 before:h-6 before:w-full before:rounded-t-xl before:bg-bermuda ${quicksand.className} ${className}`}
    >
      {children}
    </div>
  );
}
