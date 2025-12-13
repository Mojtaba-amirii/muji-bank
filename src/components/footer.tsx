import Link from "next/link";
import { Link2 } from "lucide-react";

import { contactInfo, quickLinks } from "@/utils/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-black/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-brand-900 font-black text-xs sm:text-sm">
                  MB
                </span>
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-white">
                Muji Bank
              </h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed w-auto mx-auto ">
              Your trusted financial partner, providing innovative banking
              solutions with security, transparency, and customer-first approach
              for a secure future.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span>Secure • Trusted • Available 24/7</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-base sm:text-lg text-white mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 text-sm group"
                  >
                    <Link2 className="w-3 h-3 sm:w-4 sm:h-4 text-accent-400 group-hover:text-accent-300 shrink-0" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-base sm:text-lg text-white mb-3 sm:mb-4">
              Contact Information
            </h3>
            <address className="not-italic space-y-2 sm:space-y-3">
              {contactInfo.map(({ icon: Icon, text }, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 text-sm text-white/80 group"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400 mt-0.5 shrink-0 group-hover:text-accent-300 transition-colors" />
                  <span className="leading-relaxed">{text}</span>
                </div>
              ))}
            </address>
          </div>
        </div>

        {/* Enhanced footer bottom */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-white/60 order-2 sm:order-1">
              © {new Date().getFullYear()} Muji Bank. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/50 order-1 sm:order-2">
              <Link
                href="/privacy"
                className="hover:text-white/70 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white/70 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/security"
                className="hover:text-white/70 transition-colors"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
