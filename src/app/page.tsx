import Link from "next/link";
import { ArrowRight, ShieldCheck, CreditCard, PiggyBank } from "lucide-react";

export default function Home() {
  return (
    <div className="">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Muji Bank
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your Trusted Financial Partner
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/create-account"
              className="bg-white text-purple-700 hover:bg-purple-100 transition-colors duration-300 font-semibold py-3 px-6 rounded-full inline-flex items-center"
            >
              Create Account <ArrowRight className="ml-2" />
            </Link>
            <Link
              href="/login"
              className="bg-purple-700 text-white hover:bg-purple-600 transition-colors duration-300 font-semibold py-3 px-6 rounded-full inline-flex items-center"
            >
              Login <ArrowRight className="ml-2" />
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <ShieldCheck className="w-12 h-12 mb-4 text-yellow-400" />
            <h2 className="text-2xl font-semibold mb-2">Secure Banking</h2>
            <p>
              Your security is our top priority. Bank with confidence using our
              state-of-the-art encryption and protection measures.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <CreditCard className="w-12 h-12 mb-4 text-green-400" />
            <h2 className="text-2xl font-semibold mb-2">Easy Transfers</h2>
            <p>
              Send money to friends and family with just a few clicks. Fast,
              secure, and hassle-free transfers anytime, anywhere.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <PiggyBank className="w-12 h-12 mb-4 text-pink-400" />
            <h2 className="text-2xl font-semibold mb-2">Smart Savings</h2>
            <p>
              Grow your wealth with our competitive interest rates and
              intelligent saving tools. Your future starts here.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers who trust Muji Bank with their
            finances.
          </p>
          <Link
            href="/create-account"
            className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 transition-colors duration-300 font-semibold py-3 px-8 rounded-full inline-flex items-center"
          >
            Open Your Account Today <ArrowRight className="ml-2" />
          </Link>
        </section>
      </main>
    </div>
  );
}
