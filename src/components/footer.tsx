import Link from "next/link";

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
              <li>
                <Link href="#" className="text-sm  hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm  hover:text-gray-900">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <address className="text-sm not-italic">
              123 Banking Street
              <br />
              Financial District
              <br />
              City, State 12345
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@mujibank.com
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm">
          © {new Date().getFullYear()} Muji Bank. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
