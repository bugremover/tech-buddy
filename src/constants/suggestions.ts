export const CAREER_SUGGESTIONS = [
  'Backend Developer',
  'Data Scientist',
  'DevOps Engineer',
  'AI Engineer',
  'Frontend Developer',
  'Cloud Architect',
] as const;

export type CareerSuggestion = typeof CAREER_SUGGESTIONS[number];