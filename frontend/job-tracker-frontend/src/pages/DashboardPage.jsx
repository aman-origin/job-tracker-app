import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import applicationService from '../services/applicationService';
import ApplicationCard from '../components/ApplicationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { auth } from '../utils/auth';

function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const user = auth.getUser();

  const fetchApplications = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await applicationService.getAll();
      setApplications(data);
    } catch (err) {
      setError('Failed to load applications. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await applicationService.delete(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      setError('Failed to delete application.');
    }
  };

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const filteredApplications = applications
    .filter((app) => {
      const matchesStatus =
        statusFilter === 'ALL' || app.status === statusFilter;
      const matchesSearch =
        app.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest')
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      if (sortBy === 'oldest')
        return new Date(a.appliedDate) - new Date(b.appliedDate);
      if (sortBy === 'company')
        return a.companyName?.localeCompare(b.companyName);
      return 0;
    });

  const stats = [
    { label: 'Applied', count: statusCounts.APPLIED || 0, color: 'text-blue-600', status: 'APPLIED' },
    { label: 'Shortlisted', count: statusCounts.SHORTLISTED || 0, color: 'text-yellow-600', status: 'SHORTLISTED' },
    { label: 'Interview', count: statusCounts.INTERVIEW || 0, color: 'text-purple-600', status: 'INTERVIEW' },
    { label: 'Offers', count: statusCounts.OFFER || 0, color: 'text-green-600', status: 'OFFER' },
    { label: 'Rejected', count: statusCounts.REJECTED || 0, color: 'text-red-600', status: 'REJECTED' },
  ];

  const filterTabs = [
    { label: 'All', value: 'ALL' },
    { label: 'Applied', value: 'APPLIED' },
    { label: 'Shortlisted', value: 'SHORTLISTED' },
    { label: 'Interview', value: 'INTERVIEW' },
    { label: 'Offers', value: 'OFFER' },
    { label: 'Rejected', value: 'REJECTED' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back, {user?.name}!
          </p>
        </div>
        <Link
          to="/applications/new"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
        >
          + Add Application
        </Link>
      </div>

      {/* ─── Stat Cards ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <button
            key={stat.status}
            onClick={() =>
              setStatusFilter(
                statusFilter === stat.status ? 'ALL' : stat.status
              )
            }
            className={`bg-white border rounded-xl p-4 text-left transition-colors duration-200 hover:border-gray-300 ${
              statusFilter === stat.status
                ? 'border-green-500 ring-1 ring-green-500'
                : 'border-gray-200'
            }`}
          >
            <p className={`text-2xl font-bold ${stat.color}`}>
              {stat.count}
            </p>
            <p className="text-gray-500 text-sm mt-0.5">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* ─── Search, Filter & Sort ─── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by company or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="company">Company A–Z</option>
          </select>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                statusFilter === tab.value
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
              {tab.value !== 'ALL' && statusCounts[tab.value] > 0 && (
                <span className="ml-1 text-xs opacity-75">
                  ({statusCounts[tab.value]})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Applications List ─── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">
            Your Applications{' '}
            <span className="text-gray-400 font-normal">
              ({filteredApplications.length})
            </span>
          </h2>
          {(searchQuery || statusFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
              }}
              className="text-sm text-green-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchApplications} />
        ) : applications.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl text-center py-14 px-4">
            <p className="text-gray-400 text-4xl mb-3">📋</p>
            <p className="text-gray-600 font-medium mb-1">No applications yet</p>
            <p className="text-gray-400 text-sm mb-4">
              Start by adding your first job application.
            </p>
            <Link
              to="/applications/new"
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
            >
              + Add Application
            </Link>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl text-center py-14 px-4">
            <p className="text-gray-400 text-4xl mb-3">🔍</p>
            <p className="text-gray-600 font-medium mb-1">No results found</p>
            <p className="text-gray-400 text-sm mb-4">
              Try adjusting your search or filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
              }}
              className="text-sm text-green-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;