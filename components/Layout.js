import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl py-24 px-4">{children}</main>;
    </>
  );
}
