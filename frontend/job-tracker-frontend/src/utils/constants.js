// Application status options for dropdowns
export const STATUS_OPTIONS = [
  { value: 'APPLIED', label: 'Applied', color: 'bg-blue-100 text-blue-800' },
  { value: 'SHORTLISTED', label: 'Shortlisted', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'INTERVIEW', label: 'Interview', color: 'bg-purple-100 text-purple-800' },
  { value: 'OFFER', label: 'Offer', color: 'bg-green-100 text-green-800' },
  { value: 'REJECTED', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];

// Get status display info
export const getStatusInfo = (status) => {
  return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
};

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};