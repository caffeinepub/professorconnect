import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-nav border-b border-nav-border shadow-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center shadow-sm">
              <img
                src="/assets/generated/professor-connect-logo.dim_128x128.png"
                alt="ProfessorConnect Logo"
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>';
                }}
              />
            </div>
            <span className="text-xl font-bold text-nav-brand tracking-tight">
              Professor<span className="text-brand-accent">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-brand text-white'
                      : 'text-nav-link hover:bg-nav-hover hover:text-nav-brand'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link to="/jobs">
              <Button size="sm" className="ml-3 bg-brand hover:bg-brand-dark text-white font-semibold shadow-sm">
                Browse Jobs
              </Button>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-nav-link hover:bg-nav-hover transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-nav border-t border-nav-border px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-nav-link hover:bg-nav-hover hover:text-nav-brand'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link to="/jobs" onClick={() => setMobileOpen(false)}>
            <Button size="sm" className="w-full mt-2 bg-brand hover:bg-brand-dark text-white font-semibold">
              Browse Jobs
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
