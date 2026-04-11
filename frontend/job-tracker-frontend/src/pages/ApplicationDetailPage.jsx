import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import applicationService from '../services/applicationService';
import noteService from '../services/noteService';
import StatusBadge from '../components/StatusBadge';
import NotesList from '../components/NotesList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { formatDate } from '../utils/constants';

function ApplicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appData, notesData] = await Promise.all([
          applicationService.getById(id),
          noteService.getAll(id),
        ]);
        setApplication(appData);
        setNotes(notesData);
      } catch (err) {
        setError('Failed to load application details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddNote = async (content) => {
    try {
      const newNote = await noteService.create(id, content);
      setNotes((prev) => [newNote, ...prev]);
    } catch (err) {
      alert('Failed to add note.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this application?'))
      return;
    try {
      await applicationService.delete(id);
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to delete application.');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* Back link */}
      <Link
        to="/dashboard"
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        ← Back to Dashboard
      </Link>

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {application.companyName}
            </h1>
            <p className="text-gray-500 mt-0.5">{application.jobRole}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 border-t border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-800">
              {application.location || '—'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Applied Date</p>
            <p className="text-sm font-medium text-gray-800">
              {formatDate(application.appliedDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Job Link</p>
            {application.jobLink ? (
              <a
                href={application.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-green-600 hover:underline"
              >
                View Posting ↗
              </a>
            ) : (
              <p className="text-sm font-medium text-gray-800">—</p>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Last Updated</p>
            <p className="text-sm font-medium text-gray-800">
              {formatDate(application.updatedAt)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-5">
          <Link
            to={`/applications/${id}/edit`}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-lg border border-red-200 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Notes Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Notes{' '}
          <span className="text-gray-400 font-normal text-sm">
            ({notes.length})
          </span>
        </h2>
        <NotesList
          notes={notes}
          onAddNote={handleAddNote}
          isLoading={false}
        />
      </div>
    </div>
  );
}

export default ApplicationDetailPage;