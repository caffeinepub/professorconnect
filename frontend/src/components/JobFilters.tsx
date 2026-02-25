import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Position } from '../backend';

export interface FilterState {
  search: string;
  institute: string;
  department: string;
  location: string;
  position: string;
}

interface JobFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  institutes: string[];
  departments: string[];
  locations: string[];
}

const ALL_VALUE = '__all__';

export default function JobFilters({ filters, onChange, institutes, departments, locations }: JobFiltersProps) {
  const hasActiveFilters =
    filters.search || filters.institute || filters.department || filters.location || filters.position;

  const handleReset = () => {
    onChange({ search: '', institute: '', department: '', location: '', position: '' });
  };

  return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-card space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by institute, department, or position..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="pl-9 bg-background border-input focus:border-brand"
        />
        {filters.search && (
          <button
            onClick={() => onChange({ ...filters, search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Institute */}
        <Select
          value={filters.institute || ALL_VALUE}
          onValueChange={(v) => onChange({ ...filters, institute: v === ALL_VALUE ? '' : v })}
        >
          <SelectTrigger className="bg-background border-input">
            <SelectValue placeholder="All Institutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All Institutes</SelectItem>
            {institutes.map((inst) => (
              <SelectItem key={inst} value={inst}>{inst}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Department */}
        <Select
          value={filters.department || ALL_VALUE}
          onValueChange={(v) => onChange({ ...filters, department: v === ALL_VALUE ? '' : v })}
        >
          <SelectTrigger className="bg-background border-input">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location */}
        <Select
          value={filters.location || ALL_VALUE}
          onValueChange={(v) => onChange({ ...filters, location: v === ALL_VALUE ? '' : v })}
        >
          <SelectTrigger className="bg-background border-input">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Position */}
        <Select
          value={filters.position || ALL_VALUE}
          onValueChange={(v) => onChange({ ...filters, position: v === ALL_VALUE ? '' : v })}
        >
          <SelectTrigger className="bg-background border-input">
            <SelectValue placeholder="All Positions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All Positions</SelectItem>
            <SelectItem value={Position.assistantProfessor}>Assistant Professor</SelectItem>
            <SelectItem value={Position.associateProfessor}>Associate Professor</SelectItem>
            <SelectItem value={Position.professor}>Professor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-foreground gap-1.5">
            <X size={13} />
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
