"use client";

import Link from "next/link";
import { toast } from "react-toastify";

export default function Footer() {
  const footerLinks = {
    Product: [
      { label: "Vision", action: () => toast.info("Vision page coming soon!") },
      { label: "Features", action: () => toast.info("Features page coming soon!") },
      { label: "Pricing", action: () => toast.info("Pricing page coming soon!") },
    ],
    Impact: [
      { label: "Language Support", action: () => toast.info("Language Support coming soon!") },
      { label: "Global Education", action: () => toast.info("Global Education coming soon!") },
      { label: "Impact Stories", action: () => toast.info("Impact Stories coming soon!") },
    ],
    Company: [
      { label: "Privacy Policy", action: () => toast.info("Privacy Policy coming soon!") },
      { label: "Terms of Service", action: () => toast.info("Terms of Service coming soon!") },
      { label: "Contact Support", action: () => toast.info("Support portal coming soon!") },
    ],
  };

  return (
    <footer className="bg-[#090A0F] border-t border-white/10 py-16 px-6 relative z-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg gradient-button flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[#090A0F] text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-on-surface">EduAgent</span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6 pr-4">
            Empowering the next generation of educators with delightfully smart AI.
          </p>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4 className="text-on-surface font-bold mb-6 text-sm">{section}</h4>
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="text-on-surface-variant hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={link.action}
                      className="text-on-surface-variant hover:text-white transition-colors text-sm text-left"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4">
        <span className="text-xs text-on-surface-variant opacity-80">
          © 2026 EduAgent AI. Empowering the next generation of educators. Developed by team <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#4ADE80]">Code Thrifters</span>
        </span>
      </div>
    </footer>
  );
}
