"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SERVICES', href: '#services' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#262529] w-full fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {/* Logo image */}
            <img src="/logo.webp" alt="Barber Shop Logo" className="w-12 h-12 object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#e5e5e5] font-semibold hover:text-[#a89787] transition-colors px-2 text-sm"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#appointment"
              className="ml-6 px-6 py-3 bg-[#a89787] text-[#262529] font-bold rounded-none text-sm hover:bg-[#b8a898] transition-colors"
            >
              MAKE APPOINTMENT
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#e5e5e5] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#262529] px-4 pb-4">
          <div className="flex flex-col gap-4 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#e5e5e5] font-semibold hover:text-[#a89787] transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#appointment"
              className="mt-2 px-4 py-3 bg-[#a89787] text-[#262529] font-bold text-center"
              onClick={() => setMenuOpen(false)}
            >
              MAKE APPOINTMENT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 