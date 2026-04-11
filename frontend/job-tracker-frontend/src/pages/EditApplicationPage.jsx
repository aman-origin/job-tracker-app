import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import applicationService from '../services/applicationService';
import ApplicationForm from '../components/ApplicationForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function EditApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await applicationService.getById(id);
        setApplication(data);
      } catch (err) {
        setError('Failed to load application.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplication();
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsSaving(true);
    setError('');
    try {
      await applicationService.update(id, formData);
      navigate(`/applications/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update application.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error && !application) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Back link */}
      <Link
        to={`/applications/${id}`}
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        ← Back to Application
      </Link>

      {/* Header */}
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
        <p className="text-gray-500 text-sm mt-1">
          Update the details for this application.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <ApplicationForm
          initialData={application}
          onSubmit={handleSubmit}
          isLoading={isSaving}
        />
      </div>
    </div>
  );
}

export default EditApplicationPage;