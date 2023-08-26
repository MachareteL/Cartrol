export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`relative rounded-xl bg-white p-4 before:absolute before:-top-1 before:left-0 before:-z-10 before:h-6 before:w-full before:rounded-t-xl before:bg-bermuda`}
    >
      {children}
    </div>
  );
}
