import { useState, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Briefcase, AlertCircle } from 'lucide-react';
import { useGetAllJobs } from '../hooks/useQueries';
import JobCard from '../components/JobCard';
import JobFilters, { FilterState } from '../components/JobFilters';
import { Position } from '../backend';

const positionLabels: Record<string, string> = {
  [Position.assistantProfessor]: 'Assistant Professor',
  [Position.associateProfessor]: 'Associate Professor',
  [Position.professor]: 'Professor',
};

export default function Jobs() {
  const { data: jobs, isLoading, isError } = useGetAllJobs();

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    institute: '',
    department: '',
    location: '',
    position: '',
  });

  // Derive unique filter options
  const institutes = useMemo(() => [...new Set((jobs ?? []).map((j) => j.institute))].sort(), [jobs]);
  const departments = useMemo(() => [...new Set((jobs ?? []).map((j) => j.department))].sort(), [jobs]);
  const locations = useMemo(() => [...new Set((jobs ?? []).map((j) => j.location))].sort(), [jobs]);

  // Apply filters
  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    const searchLower = filters.search.toLowerCase();

    return jobs.filter((job) => {
      if (
        searchLower &&
        !job.institute.toLowerCase().includes(searchLower) &&
        !job.department.toLowerCase().includes(searchLower) &&
        !positionLabels[job.position]?.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
      if (filters.institute && job.institute !== filters.institute) return false;
      if (filters.department && job.department !== filters.department) return false;
      if (filters.location && job.location !== filters.location) return false;
      if (filters.position && job.position !== filters.position) return false;
      return true;
    });
  }, [jobs, filters]);

  return (
    <div className="min-h-screen bg-section-alt">
      {/* Page Header */}
      <div className="bg-brand py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={28} className="text-white/80" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Faculty Job Listings</h1>
          </div>
          <p className="text-white/75 text-lg mt-1">
            Discover faculty positions at India's premier engineering and science institutions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <JobFilters
            filters={filters}
            onChange={setFilters}
            institutes={institutes}
            departments={departments}
            locations={locations}
          />
        </div>

        {/* Results count */}
        {!isLoading && !isError && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> of{' '}
              <span className="font-semibold text-foreground">{jobs?.length ?? 0}</span> positions
            </p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card border border-card-border rounded-xl p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-9 w-full mt-2" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <Alert variant="destructive" className="max-w-lg mx-auto">
            <AlertCircle size={16} />
            <AlertDescription>
              Failed to load job listings. Please refresh the page and try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Jobs Grid */}
        {!isLoading && !isError && filteredJobs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase size={28} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No positions found</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Try adjusting your search terms or filters to find more faculty positions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
