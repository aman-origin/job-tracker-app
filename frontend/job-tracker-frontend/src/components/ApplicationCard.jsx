import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/constants';

function ApplicationCard({ application, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this application?')) {
      onDelete(application.id);
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {application.companyName}
          </h3>
          <p className="text-gray-600">{application.jobRole}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="text-sm text-gray-500 space-y-1 mb-4">
        {application.location && (
          <p>📍 {application.location}</p>
        )}
        <p>📅 Applied: {formatDate(application.appliedDate)}</p>
        {application.notesCount > 0 && (
          <p>📝 {application.notesCount} note(s)</p>
        )}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="space-x-2">
          <Link
            to={`/applications/${application.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details
          </Link>
          <Link
            to={`/applications/${application.id}/edit`}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            Edit
          </Link>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;