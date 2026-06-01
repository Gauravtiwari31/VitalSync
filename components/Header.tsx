"use client";
import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Menu, X } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import GoogleTranslate from "./GoogleTranslate";
import SearchResults from "./SearchResults";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SymptomSearchBar from "./SymptomsSearchBar";

type Props = {
  onSearchStateChange?: (isSearching: boolean) => void;
  input?: string | "";
  lat?: number | 23.0225;
  long?: number | 78.4888;
};

const NAV_LINKS = [
  { href: "/.", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about-us", label: "About" },
  { href: "/discuss", label: "Discuss" },
  { href: "/contact-us", label: "Contact" },
];

const Header = ({ onSearchStateChange, input, lat, long }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [showLogo, setShowLogo] = useState(true);
  const [searchQuery, setSearchQuery] = useState(input);
  const [showResults, setShowResults] = useState(false);
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(long);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) {
      const timer = setTimeout(() => setShowLogo(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowLogo(false);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth < 768;
      setIsSmallScreen(smallScreen);
      if (!smallScreen && isMenuOpen) setIsMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        event.target instanceof Node &&
        !searchRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
      if (isLoginDropdownOpen && event.target instanceof Element) {
        if (!event.target.closest(".login-dropdown")) {
          setIsLoginDropdownOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLoginDropdownOpen]);

  useEffect(() => {
    if (onSearchStateChange) {
      onSearchStateChange(showResults && !!searchQuery);
    }
  }, [showResults, searchQuery, onSearchStateChange]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/search?searchQuery=${encodeURIComponent(searchQuery!!)}&latitude=${latitude}&longitude=${longitude}`
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) setShowResults(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 dark:bg-[#080e1a]/95 backdrop-blur-md shadow-[0_1px_0_0_hsl(220,14%,91%)] dark:shadow-[0_1px_0_0_hsl(217,28%,18%)]"
            : "bg-white dark:bg-[#080e1a]"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Mobile: hamburger */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden focus:outline-none" aria-label="Open menu">
                  <IoMenu className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-white dark:bg-slate-900 p-0 flex flex-col">
                <SheetHeader className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Logo />
                </SheetHeader>
                <div className="flex-grow overflow-y-auto px-4 py-4">
                  <ul className="flex flex-col gap-1 text-sm font-medium">
                    {NAV_LINKS.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                    <Accordion type="single" collapsible className="w-full border-none">
                      <AccordionItem value="login" className="border-none">
                        <AccordionTrigger className="px-3 py-2.5 text-slate-700 dark:text-slate-300 text-sm font-medium no-underline hover:no-underline rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                          Sign In
                        </AccordionTrigger>
                        <AccordionContent className="pb-0 pl-4">
                          {[
                            { href: "/patient-auth", label: "Patient" },
                            { href: "/doctor-auth", label: "Doctor" },
                            { href: "/hospital-auth", label: "Hospital" },
                          ].map((item) => (
                            <SheetClose asChild key={item.href}>
                              <Link
                                href={item.href}
                                className="block px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-md"
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </ul>
                </div>
                <SheetFooter className="px-5 py-4 border-t border-slate-100 dark:border-slate-800">
                  <DarkModeToggle />
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {(!isSearchOpen || !isSmallScreen) && showLogo && <Logo />}
          </div>

          {/* Center: nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile search toggle */}
            <div ref={searchRef} className="md:hidden">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {isSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <CiSearch className="h-5 w-5" />
                )}
              </button>
              {isSearchOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white dark:bg-[#080e1a] border-b border-slate-200 dark:border-slate-800 px-4 py-3 z-40">
                  <SymptomSearchBar
                    variant="header"
                    isSearchOpen={isSearchOpen}
                    onSearchSubmit={handleSearchSubmit}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    containerWidth="w-full"
                    inputClassName="bg-slate-50 dark:bg-slate-800 w-full"
                  />
                </div>
              )}
            </div>

            {/* Desktop: Sign In dropdown */}
            <div
              className="relative login-dropdown hidden md:block"
              onMouseEnter={() => setIsLoginDropdownOpen(true)}
              onMouseLeave={() => setIsLoginDropdownOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                Sign In
                <IoIosArrowDown
                  className={`transition-transform duration-200 ${isLoginDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isLoginDropdownOpen && (
                <div className="absolute right-0 top-9 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                  {[
                    { href: "/patient-auth", label: "Patient" },
                    { href: "/doctor-auth", label: "Doctor" },
                    { href: "/hospital-auth", label: "Hospital" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400"
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      {item.label} Portal
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Get Started CTA */}
            <Link href="/patient-auth" className="hidden md:inline-flex">
              <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
                Get started
              </button>
            </Link>

            <div className="hidden md:block">
              <DarkModeToggle />
            </div>
          </div>
        </nav>

        {/* Search results dropdown */}
        {showResults && searchQuery && (
          <div className="absolute w-full bg-white dark:bg-slate-900 shadow-lg z-20 border-t border-slate-100 dark:border-slate-800">
            <SearchResults
              searchQuery={searchQuery}
              latitude={latitude!!}
              longitude={longitude!!}
            />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
