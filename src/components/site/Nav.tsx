import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, CreditCard, Menu, X } from "lucide-react";
import { SERVICES } from "@/data/services";
import { LINKS } from "@/data/site";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/worthprime-logo.webp";
import { heroOverlay } from "./heroOverlay";

// One width on every page so the logo and buttons never shift when navigating; matches the home hero edges.
const NAV_WIDTH = "max-w-[1492px]";

// Active page gets a thin underline in the link colour (TanStack Link sets data-status="active").
const navLink =
  "relative px-3 py-2 text-sm font-bold transition-colors after:pointer-events-none after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-current after:opacity-0 after:transition-opacity data-[status=active]:after:opacity-100";

const NAV_ITEMS = [
  { label: "About", to: "/about" as const },
  { label: "Services", to: "/services" as const },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Transparent only while at the top of a dark-hero page with the mobile menu closed.
  const tone = scrolled || open ? null : heroOverlay(pathname);
  const transparent = tone !== null;
  // White text and logo only over a navy hero.
  const overlay = tone === "dark";
  const linkColor = overlay
    ? "text-hero-foreground/90 hover:text-hero-foreground"
    : "text-nav-link hover:text-nav-link-hover";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 border-b px-3 transition-[background-color,border-color,box-shadow] duration-300 sm:px-6",
          transparent
            ? "border-transparent bg-transparent"
            : scrolled
              ? "border-nav-border/60 bg-nav/65 shadow-[0_8px_30px_-20px] shadow-primary/40 backdrop-blur-xl"
              : "border-nav-border bg-nav/95 backdrop-blur-xl",
        )}
      >
        <nav
          className={cn(
            "pointer-events-auto mx-auto flex w-full items-center gap-2 px-1 transition-[min-height] duration-300 sm:px-2",
            NAV_WIDTH,
            "sm:pr-4",
            scrolled ? "min-h-14" : "min-h-16",
          )}
        >
          <Link to="/" className="flex shrink-0 items-center pr-3" aria-label="WorthPrime Tax home">
            <span
              className={cn(
                "flex w-28 items-center overflow-hidden px-2 transition-[height] duration-300",
                scrolled ? "h-10" : "h-12",
              )}
            >
              <img
                src={logoImage}
                alt="WorthPrime Tax"
                width={1438}
                height={1094}
                className={cn(
                  "h-full w-full object-contain object-left transition-[filter] duration-300",
                  // White logo over the navy hero.
                  overlay && "brightness-0 invert",
                )}
              />
            </span>
          </Link>

          <div className="hidden flex-1 items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.label === "Services" ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link to={item.to} className={cn(navLink, linkColor, "flex items-center gap-1")}>
                    Services
                    <ChevronDown className="size-3.5" />
                  </Link>
                  <div
                    className={cn(
                      "absolute left-0 top-full w-[420px] pt-3 transition-all",
                      servicesOpen ? "visible opacity-100" : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <div className="grid grid-cols-2 gap-1 rounded-lg border border-nav-border bg-nav-menu p-2 shadow-xl">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className="rounded-md px-3 py-2 text-xs leading-snug text-foreground/75 transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <span className="mr-1.5 text-primary">{s.number}</span>
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.label} to={item.to} className={cn(navLink, linkColor)}>
                  {item.label}
                </Link>
              ),
            )}
            <Link to="/pricing" className={cn(navLink, linkColor)}>
              Pricing
            </Link>
            <Link to="/insights" className={cn(navLink, linkColor)}>
              Insights
            </Link>
            <Link to="/contact" className={cn(navLink, linkColor)}>
              Contact
            </Link>
            <a
              href={LINKS.irs}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "px-3 py-2 text-xs font-bold transition-colors",
                overlay
                  ? "text-hero-foreground/80 hover:text-hero-foreground"
                  : "text-muted-foreground hover:text-nav-link-hover",
              )}
            >
              IRS Refund Status
            </a>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Icon-only below sm so both buttons, the logo and the menu fit on a phone. */}
            <Link
              to="/payment-methods"
              aria-label="Pay here"
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full border px-2 text-[0.8125rem] font-medium whitespace-nowrap transition-transform hover:scale-[1.03] sm:px-3",
                overlay
                  ? "border-hero-foreground/60 text-hero-foreground"
                  : "border-primary bg-background text-primary",
              )}
            >
              <CreditCard className="size-3.5" strokeWidth={1.75} aria-hidden />
              <span className="hidden sm:inline">Pay Here</span>
            </Link>
            <a
              href={LINKS.login}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Login or register"
              className={cn(
                "inline-flex h-8 items-center rounded-lg bg-button px-2.5 text-[0.6875rem] font-medium tracking-wide whitespace-nowrap text-button-foreground uppercase transition-transform hover:scale-[1.03] sm:px-3 sm:text-xs",
                overlay && "ring-1 ring-hero-foreground/25",
              )}
            >
              Login<span className="hidden sm:inline">/Register</span>
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "grid size-9 place-items-center rounded-full border transition-colors lg:hidden",
                overlay ? "border-hero-foreground/40 text-hero-foreground" : "border-nav-border",
              )}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Side drawer that slides in from the right over a dimmed page. It sits outside the header
          because the header's backdrop-blur would otherwise become the containing block for
          `fixed`. `inert` keeps the closed drawer out of the tab order. */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[60] bg-foreground/40 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-[70] flex w-[85%] max-w-sm flex-col overflow-y-auto bg-nav-menu shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex min-h-16 items-center justify-between border-b border-nav-border pr-4 pl-4">
          <Link to="/" onClick={() => setOpen(false)} aria-label="WorthPrime Tax home">
            <img
              src={logoImage}
              alt="WorthPrime Tax"
              width={1438}
              height={1094}
              className="h-11 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid size-9 place-items-center rounded-full border border-nav-border"
          >
            <X className="size-4" />
          </button>
        </div>
        <ul className="flex flex-col">
          <MobileNavRow to="/" onNavigate={() => setOpen(false)}>
            Home
          </MobileNavRow>
          <MobileNavRow to="/about" onNavigate={() => setOpen(false)}>
            About
          </MobileNavRow>
          <li className="border-b border-nav-border">
            <div className="flex items-stretch">
              <Link to="/services" onClick={() => setOpen(false)} className={mobileRow}>
                Services
              </Link>
              <button
                type="button"
                aria-label={mobileServicesOpen ? "Hide services" : "Show services"}
                aria-expanded={mobileServicesOpen}
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="grid w-14 shrink-0 place-items-center border-l border-nav-border text-nav-link"
              >
                <ChevronDown
                  className={cn("size-5 transition-transform", mobileServicesOpen && "rotate-180")}
                />
              </button>
            </div>
            {mobileServicesOpen && (
              <ul className="bg-tint/60 py-1">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      onClick={() => setOpen(false)}
                      className="flex px-6 py-2.5 text-sm text-foreground/80 data-[status=active]:font-semibold data-[status=active]:text-primary"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <MobileNavRow to="/pricing" onNavigate={() => setOpen(false)}>
            Pricing
          </MobileNavRow>
          <MobileNavRow to="/insights" onNavigate={() => setOpen(false)}>
            Insights
          </MobileNavRow>
          <MobileNavRow to="/contact" onNavigate={() => setOpen(false)}>
            Contact
          </MobileNavRow>
          <li className="border-b border-nav-border">
            <a href={LINKS.irs} target="_blank" rel="noreferrer noopener" className={mobileRow}>
              IRS Refund Status
              <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
            </a>
          </li>
        </ul>

        <div className="mt-auto grid gap-3 p-6">
          <a
            href={LINKS.login}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-xl bg-button px-4 py-3 text-center text-sm font-medium tracking-wide text-button-foreground uppercase"
          >
            Login/Register
          </a>
          <Link
            to="/payment-methods"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-4 py-3 text-sm font-medium text-primary"
          >
            <CreditCard className="size-4" strokeWidth={1.75} aria-hidden />
            Pay Here
          </Link>
        </div>
      </div>
    </>
  );
}

// Full-width menu row; the active page is shown in the brand colour.
const mobileRow =
  "flex flex-1 items-center justify-between px-6 py-4 text-base font-bold text-nav-link data-[status=active]:text-primary";

function MobileNavRow({
  to,
  onNavigate,
  children,
}: {
  to: "/" | "/about" | "/pricing" | "/insights" | "/contact";
  onNavigate: () => void;
  children: ReactNode;
}) {
  return (
    <li className="border-b border-nav-border">
      <Link
        to={to}
        onClick={onNavigate}
        activeOptions={{ exact: to === "/" }}
        className={mobileRow}
      >
        {children}
        <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
      </Link>
    </li>
  );
}
