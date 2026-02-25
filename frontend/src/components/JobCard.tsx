import { JobListing, Position } from '../backend';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, BookOpen, Calendar, ExternalLink } from 'lucide-react';

interface JobCardProps {
  job: JobListing;
}

const positionLabels: Record<Position, string> = {
  [Position.assistantProfessor]: 'Assistant Professor',
  [Position.associateProfessor]: 'Associate Professor',
  [Position.professor]: 'Professor',
};

const positionColors: Record<Position, string> = {
  [Position.assistantProfessor]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  [Position.associateProfessor]: 'bg-blue-50 text-blue-700 border-blue-200',
  [Position.professor]: 'bg-purple-50 text-purple-700 border-purple-200',
};

function formatDeadline(deadline: string): string {
  try {
    const date = new Date(deadline);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return deadline;
  }
}

function isDeadlineSoon(deadline: string): boolean {
  try {
    const date = new Date(deadline);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return diff > 0 && diff < 14 * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export default function JobCard({ job }: JobCardProps) {
  const positionLabel = positionLabels[job.position] ?? String(job.position);
  const positionColor = positionColors[job.position] ?? 'bg-gray-50 text-gray-700 border-gray-200';
  const soon = isDeadlineSoon(job.deadline);

  return (
    <div className="bg-card border border-card-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-base leading-snug truncate">{job.institute}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{job.department}</p>
        </div>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${positionColor}`}>
          {positionLabel}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={14} className="text-brand shrink-0" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen size={14} className="text-brand shrink-0" />
          <span>{job.department}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar size={14} className={`shrink-0 ${soon ? 'text-amber-500' : 'text-brand'}`} />
          <span className={soon ? 'text-amber-600 font-medium' : 'text-muted-foreground'}>
            Deadline: {formatDeadline(job.deadline)}
            {soon && ' · Closing soon'}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="pt-1 mt-auto">
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full bg-brand hover:bg-brand-dark text-white font-semibold gap-2 shadow-sm">
            Apply Now
            <ExternalLink size={14} />
          </Button>
        </a>
      </div>
    </div>
  );
}
