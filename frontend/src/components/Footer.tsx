import { Link } from '@tanstack/react-router';
import { GraduationCap, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'professorconnect');

  return (
    <footer className="bg-footer text-footer-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                <GraduationCap size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Professor<span className="text-brand-accent">Connect</span>
              </span>
            </div>
            <p className="text-sm text-footer-muted leading-relaxed">
              India's dedicated academic job portal for faculty positions in Engineering, Science, and Technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Browse Jobs', path: '/jobs' },
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-footer-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <div className="flex items-center gap-2 text-sm text-footer-muted">
              <Mail size={14} />
              <a href="mailto:contact@professorconnect.in" className="hover:text-white transition-colors">
                contact@professorconnect.in
              </a>
            </div>
            <p className="mt-3 text-xs text-footer-muted leading-relaxed">
              For job listing inquiries, partnerships, or general questions.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-footer-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-footer-muted">
            © {new Date().getFullYear()} ProfessorConnect. All rights reserved.
          </p>
          <p className="text-xs text-footer-muted flex items-center gap-1">
            Built with <Heart size={12} className="text-brand-accent fill-brand-accent" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
