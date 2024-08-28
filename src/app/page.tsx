import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register";

export default function Home() {
  return (
    <main className=" flex flex-col bg-slate-400 w-full min-h-screen">
      <Header />
      <Register />
      <Login />
      <Footer />
    </main>
  );
}
