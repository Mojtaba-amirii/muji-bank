import { Link2 } from "lucide-react";
import Link from "next/link";

import { contactInfo, quickLinks } from "@/utils/constants";

export default function Footer() {
  return (
    <footer className="border-t text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About Muji Bank</h3>
            <p className="text-sm">
              Muji Bank is your trusted financial partner, providing innovative
              banking solutions for a secure future.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm hover:text-gray-300 flex items-center"
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <address className="text-sm not-italic space-y-2">
              {contactInfo.map(({ icon: Icon, text }, index) => (
                <p key={index} className="flex items-start">
                  <Icon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{text}</span>
                </p>
              ))}
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-800 text-center text-sm">
          © {new Date().getFullYear()} Muji Bank. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
