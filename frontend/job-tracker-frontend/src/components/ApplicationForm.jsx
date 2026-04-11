import { useState, useEffect } from 'react';
import { STATUS_OPTIONS } from '../utils/constants';

function ApplicationForm({ initialData, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    companyName: '',
    jobRole: '',
    status: 'APPLIED',
    appliedDate: '',
    jobLink: '',
    location: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        companyName: initialData.companyName || '',
        jobRole: initialData.jobRole || '',
        status: initialData.status || 'APPLIED',
        appliedDate: initialData.appliedDate || '',
        jobLink: initialData.jobLink || '',
        location: initialData.location || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.jobRole.trim()) {
      newErrors.jobRole = 'Job role is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputClass =
    'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="e.g. Infosys, Wipro, Google"
          className={`${inputClass} ${errors.companyName ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        {errors.companyName && (
          <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
        )}
      </div>

      {/* Job Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Role <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="jobRole"
          value={formData.jobRole}
          onChange={handleChange}
          placeholder="e.g. Java Developer, Frontend Intern"
          className={`${inputClass} ${errors.jobRole ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        {errors.jobRole && (
          <p className="text-red-500 text-xs mt-1">{errors.jobRole}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={inputClass}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Applied Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Applied Date
        </label>
        <input
          type="date"
          name="appliedDate"
          value={formData.appliedDate}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Bangalore, Remote, Hyderabad"
          className={inputClass}
        />
      </div>

      {/* Job Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Posting URL
        </label>
        <input
          type="url"
          name="jobLink"
          value={formData.jobLink}
          onChange={handleChange}
          placeholder="https://linkedin.com/jobs/..."
          className={inputClass}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg text-sm transition-colors duration-200 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Saving...' : 'Save Application'}
      </button>
    </form>
  );
}

export default ApplicationForm;