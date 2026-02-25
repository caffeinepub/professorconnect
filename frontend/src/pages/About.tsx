import { GraduationCap, Target, Users, Lightbulb, CheckCircle2, Cpu, FileText, Bell, Search } from 'lucide-react';

const targetUsers = [
  { label: 'PhD Scholars', desc: 'Doctoral candidates seeking their first faculty appointment.' },
  { label: 'Postdoctoral Researchers', desc: 'Postdocs transitioning from research to teaching faculty roles.' },
  { label: 'Academic Professionals', desc: 'Experienced faculty exploring new institutional opportunities.' },
  { label: 'Researchers & Scientists', desc: 'Research professionals seeking tenure-track faculty positions.' },
];

const futureFeatures = [
  { icon: Cpu, label: 'AI-Powered Job Matching', desc: 'Intelligent algorithms that match your research profile and expertise to the most relevant faculty openings.' },
  { icon: FileText, label: 'CV Upload & Profile', desc: 'Create a comprehensive academic profile with your CV, publications, and research interests.' },
  { icon: Search, label: 'Automated Job Scraping', desc: 'Real-time aggregation of faculty positions from institutional websites across India and internationally.' },
  { icon: Bell, label: 'Personalized Notifications', desc: 'Email and push alerts for new positions matching your preferences and academic background.' },
];

export default function About() {
  return (
    <div className="bg-background">
      {/* Page Header */}
      <div className="bg-brand py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <GraduationCap size={14} className="text-brand-accent" />
            <span className="text-sm text-white/90 font-medium">About ProfessorConnect</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Our Mission</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Empowering academic professionals to discover and pursue faculty opportunities at India's leading
            research and teaching institutions.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-section-alt">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center">
                  <Target size={20} className="text-brand" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">What We Do</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ProfessorConnect is a dedicated academic job portal designed exclusively to bridge the gap between
                qualified academic professionals and faculty positions at India's premier engineering and science
                institutions. We aggregate, curate, and present faculty openings from IITs, NITs, IISc, IISERs,
                and other leading universities in a single, accessible platform.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The academic job search process is often fragmented — positions are scattered across dozens of
                institutional websites, mailing lists, and informal networks. ProfessorConnect centralizes this
                information, enabling candidates to focus their energy on applications rather than discovery.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform is built on the principle that every qualified researcher deserves equal access to
                faculty opportunities, regardless of their institutional affiliation or professional network.
              </p>
            </div>
            <div className="space-y-4">
              {[
                'Curated listings from India\'s top institutions',
                'Comprehensive position details including deadlines',
                'Direct links to official application portals',
                'Real-time search and filtering capabilities',
                'Mobile-friendly, accessible interface',
                'Free for all academic job seekers',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center">
                <Users size={20} className="text-brand" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Who We Serve</h2>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">
              ProfessorConnect is designed for academic professionals at every stage of their career journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {targetUsers.map((user) => (
              <div
                key={user.label}
                className="bg-card border border-card-border rounded-xl p-6 shadow-card"
              >
                <h3 className="font-bold text-foreground mb-2">{user.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{user.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 bg-section-alt">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center">
                <Lightbulb size={20} className="text-brand" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Future Vision</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ProfessorConnect is evolving into a comprehensive AI-powered academic career platform. Our roadmap
              includes transformative features designed to revolutionize how academic professionals discover and
              pursue faculty opportunities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {futureFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className="bg-card border border-card-border rounded-xl p-6 shadow-card flex gap-4"
                >
                  <div className="w-11 h-11 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1.5">{feature.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 bg-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Commitment</h2>
          <p className="text-white/80 leading-relaxed text-lg">
            We are committed to building a transparent, inclusive, and accessible platform that serves the
            academic community with integrity. ProfessorConnect will always remain free for job seekers, and we
            will continue to expand our coverage to include international academic job markets.
          </p>
        </div>
      </section>
    </div>
  );
}
