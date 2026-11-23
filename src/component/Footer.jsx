
import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    {
      name: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      name: "Terms of Service",
      href: "/terms",
    },
    {
      name: "Contact Support",
      href: "/contact",
    },
  ];

  return (
    <footer className="w-full border-t border-slate-200 bg-white">

      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row md:gap-4 lg:px-12">

        {/* Left Side - Logo & Copyright */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">

          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight text-blue-600 transition-colors duration-300 hover:text-blue-700"
          >
            Mentora
          </Link>

          <p className="mt-3 text-base text-slate-500 sm:text-lg">
            © 2026 Mentora Inc. All rights reserved.
          </p>

        </div>

        {/* Right Side - Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 lg:gap-x-12">

          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-slate-700 transition-colors duration-300 hover:text-blue-600 sm:text-base"
            >
              {link.name}
            </Link>
          ))}

        </div>

      </div>

    </footer>
  );
}
