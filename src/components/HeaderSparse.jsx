'use client';

import React, {useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/react';
import {navItems} from '@/components/Header';
import {Logotype} from '@/components/Logotype';

const contactOptions = [
  {name: 'Email', detail: 'contact@meldrumlabs.com', href: 'mailto:contact@meldrumlabs.com'},
  {name: 'X', detail: '@meldruum', href: 'https://x.com/meldruum'},
  {name: 'LinkedIn', detail: 'Meldrum Labs', href: 'https://www.linkedin.com/company/meldrum-labs'},
];

function ContactPopover() {
  return (
    <Popover className="relative">
      <PopoverButton className="group flex items-center text-meldrum-green-400 px-3 py-2 rounded-md text-sm font-medium leading-6 transition-colors hover:text-meldrum-green-100 outline-none">
        <span className="flex items-center gap-1">
          Contact
          <svg
            className="w-3.5 h-3.5 text-iroh-gray-500 transition-transform duration-200 group-data-[open]:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        transition
        className="mt-2 w-72 rounded-lg border border-iroh-gray-800/50 bg-iroh-gray-900 shadow-xl transition duration-200 ease-out data-[closed]:opacity-0 data-[closed]:translate-y-1"
      >
        <div className="p-2">
          {contactOptions.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-6 rounded-md px-4 py-3 transition-colors hover:bg-iroh-gray-800"
            >
              <span className="text-sm font-medium text-iroh-gray-200">{item.name}</span>
              <span className="text-xs text-iroh-gray-500 whitespace-nowrap">{item.detail}</span>
            </a>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
}

function TopLevelNavItem({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center text-meldrum-green-400 px-3 py-2 rounded-md text-sm font-medium leading-6 transition-colors hover:text-meldrum-green-100"
      >
        {children}
      </Link>
    </li>
  );
}

export function HeaderSparse() {
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let [scrolled, setScrolled] = useState(false);

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-iroh-gray-900/80 backdrop-blur-md border-b border-iroh-gray-800/50"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative flex items-center justify-between h-20">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-iroh-gray-400 hover:text-white hover:bg-iroh-gray-800 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex sm:items-stretch sm:justify-start">
            <Link href="/" className="block shrink-0 flex items-center mr-auto">
              <Logotype className="h-6" />
            </Link>

            <div className="hidden inset-y-0 sm:flex sm:items-center sm:pr-0 sm:inset-auto">
              <ul className="flex items-center space-x-5">
                {navItems.map((item, i ) => (
                  <TopLevelNavItem key={i} href={item.href}>{item.content}</TopLevelNavItem>
                ))}
                <li>
                  <ContactPopover />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={clsx(
          "sm:hidden transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-iroh-gray-900/95 backdrop-blur-md border-b border-iroh-gray-800/50">
          {navItems.map((item, i ) => (
            <Link
              key={i}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-meldrum-green-400 hover:text-meldrum-green-100 hover:bg-iroh-gray-800 transition-colors"
            >
              {item.content}
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-iroh-gray-800/50">
            <p className="px-3 pb-1 text-xs uppercase tracking-wider text-iroh-gray-500">
              Contact
            </p>
            {contactOptions.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-6 px-3 py-2 rounded-md text-base font-medium text-meldrum-green-400 hover:text-meldrum-green-100 hover:bg-iroh-gray-800 transition-colors"
              >
                <span>{item.name}</span>
                <span className="text-xs text-iroh-gray-500 whitespace-nowrap">{item.detail}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
