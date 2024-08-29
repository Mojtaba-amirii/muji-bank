import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register";

export default function Home() {
  return (
    <main className=" flex flex-col bg-neutral-100 w-full min-h-screen">
      <Header />
      <section className="flex flex-col items-center p-8 flex-grow">
        <Register />
        <Login />
      </section>
      <Footer />
    </main>
  );
}
