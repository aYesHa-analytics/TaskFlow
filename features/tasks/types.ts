// Domain-specific types (extends base types)
export type TaskCategory = 'Work' | 'Personal' | 'Health' | 'Study' | 'Other';

export interface TaskFilters {
  status?: 'todo' | 'inprogress' | 'done' | 'all';
  category?: TaskCategory;
  searchTerm?: string;
}