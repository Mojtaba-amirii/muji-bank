import Link from "next/link";
import { ArrowRight, ShieldCheck, CreditCard, PiggyBank } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full space-y-12 sm:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 sm:space-y-8 py-8 sm:py-12 px-4">
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
              Muji Bank
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 w-auto mx-auto leading-relaxed px-4">
            Your trusted financial partner for secure, modern banking solutions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-6 sm:pt-8 px-4">
          <Link
            href="/create-account"
            className="group bg-accent-500 hover:bg-accent-400 text-brand-900 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl inline-flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Create Account
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
          <Link
            href="/login"
            className="group glass-effect border border-white/20 text-white hover:bg-white/10 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl inline-flex items-center justify-center transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
            Sign In
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
        <div className="card-hover glass-effect border border-white/20 p-6 sm:p-8 rounded-3xl text-center group">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-accent-500/30 transition-colors">
            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-accent-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Bank-Level Security
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Your security is our priority. Advanced encryption, fraud detection,
            and secure authentication protect your financial data.
          </p>
        </div>

        <div className="card-hover glass-effect border border-white/20 p-6 sm:p-8 rounded-3xl text-center group sm:col-span-2 lg:col-span-1">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-success-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-success-500/30 transition-colors">
            <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-success-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Instant Transfers
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Send money instantly to friends and family. Real-time notifications
            and zero-fee transfers within our network.
          </p>
        </div>

        <div className="card-hover glass-effect border border-white/20 p-6 sm:p-8 rounded-3xl text-center group sm:col-span-2 lg:col-span-1">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-brand-400/30 transition-colors">
            <PiggyBank className="w-6 h-6 sm:w-8 sm:h-8 text-brand-300" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Smart Savings
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Grow your wealth with competitive rates, automatic savings goals,
            and intelligent financial insights tailored for you.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="glass-effect border border-white/20 rounded-3xl p-6 sm:p-8 mx-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div className="space-y-1 sm:space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent-400">
              50K+
            </div>
            <div className="text-white/80 text-xs sm:text-sm lg:text-base">
              Active Users
            </div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-success-400">
              $2.5B+
            </div>
            <div className="text-white/80 text-xs sm:text-sm lg:text-base">
              Transactions
            </div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-300">
              99.9%
            </div>
            <div className="text-white/80 text-xs sm:text-sm lg:text-base">
              Uptime
            </div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              24/7
            </div>
            <div className="text-white/80 text-xs sm:text-sm lg:text-base">
              Support
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 sm:space-y-8 py-12 sm:py-16 px-4">
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 w-auto mx-auto px-4 my-10">
            Join thousands of satisfied customers who trust Muji Bank with their
            finances. Experience modern banking today.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Link
            href="/create-account"
            className="group bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-400 hover:to-accent-300 text-brand-900 font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-2xl inline-flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-xl text-base sm:text-lg mt-10"
          >
            Open Your Account Today
            <ArrowRight className="ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/60">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-400 rounded-full"></div>
              FDIC Insured
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
              No Hidden Fees
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
              Free Account Setup
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
