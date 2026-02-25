import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Building2, ArrowRight, GraduationCap, Users, Briefcase, Star } from 'lucide-react';
import { useGetAllJobs, useInitBackend } from '../hooks/useQueries';

const features = [
  {
    icon: BookOpen,
    title: 'Latest Faculty Job Listings',
    description:
      'Stay updated with the most recent faculty openings from IITs, NITs, IISc, IISERs, and other premier institutions across India.',
  },
  {
    icon: Search,
    title: 'Easy Job Search',
    description:
      'Powerful search and filter tools let you find positions by institute, department, location, and position type in seconds.',
  },
  {
    icon: Building2,
    title: 'Centralized Academic Portal',
    description:
      'One platform for all faculty positions in Engineering, Science, and Technology — no more scattered job boards.',
  },
];

const targetUsers = [
  { icon: GraduationCap, label: 'PhD Scholars' },
  { icon: Users, label: 'Postdoctoral Researchers' },
  { icon: Briefcase, label: 'Academic Professionals' },
  { icon: Star, label: 'Faculty Seeking Opportunities' },
];

export default function Home() {
  const { data: jobs } = useGetAllJobs();
  const initBackend = useInitBackend();

  useEffect(() => {
    initBackend.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalJobs = jobs?.length ?? 0;
  const institutes = jobs ? [...new Set(jobs.map((j) => j.institute))].length : 0;

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[560px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/generated/hero-background.dim_1440x600.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-hero-overlay" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <GraduationCap size={14} className="text-brand-accent" />
            <span className="text-sm text-white/90 font-medium">India's Premier Academic Job Portal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Professor<span className="text-brand-accent">Connect</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 font-medium mb-4 leading-snug">
            Find the Latest Assistant Professor Jobs in Engineering and Science
          </p>

          <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            ProfessorConnect is a dedicated academic job portal connecting PhD holders, researchers, and postdoctoral
            fellows with faculty positions at India's top institutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jobs">
              <Button
                size="lg"
                className="bg-brand-accent hover:bg-brand-accent-dark text-white font-bold px-8 py-3 text-base shadow-lg gap-2"
              >
                Browse Jobs
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-3 text-base backdrop-blur-sm"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-brand py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: totalJobs > 0 ? `${totalJobs}+` : '10+', label: 'Live Listings' },
              { value: institutes > 0 ? `${institutes}+` : '5+', label: 'Institutes' },
              { value: '3', label: 'Position Types' },
              { value: 'Free', label: 'Always Free' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-sm text-white/70 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-section-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose ProfessorConnect?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for academic professionals seeking faculty positions in India's top research and
              teaching institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card border border-card-border rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1 text-center"
                >
                  <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon size={26} className="text-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Who Is This For?</h2>
            <p className="text-muted-foreground">
              ProfessorConnect serves the academic community at every career stage.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {targetUsers.map((user) => {
              const Icon = user.icon;
              return (
                <div
                  key={user.label}
                  className="flex flex-col items-center gap-3 p-5 bg-card border border-card-border rounded-xl shadow-card text-center"
                >
                  <div className="w-11 h-11 bg-brand/10 rounded-xl flex items-center justify-center">
                    <Icon size={22} className="text-brand" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{user.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Next Faculty Position?</h2>
          <p className="text-white/80 text-lg mb-8">
            Browse hundreds of faculty openings at India's premier engineering and science institutions.
          </p>
          <Link to="/jobs">
            <Button
              size="lg"
              className="bg-white text-brand hover:bg-white/90 font-bold px-10 py-3 text-base shadow-lg gap-2"
            >
              View All Jobs
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
