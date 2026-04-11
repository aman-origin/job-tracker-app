import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import applicationService from '../services/applicationService';
import ApplicationForm from '../components/ApplicationForm';

function AddApplicationPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    try {
      await applicationService.create(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to create application.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Back link */}
      <Link
        to="/dashboard"
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        ← Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Add New Application
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details of the job you applied for.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <ApplicationForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default AddApplicationPage;