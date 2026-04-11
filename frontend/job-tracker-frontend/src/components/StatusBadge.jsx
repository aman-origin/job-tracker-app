import { getStatusInfo } from '../utils/constants';

function StatusBadge({ status }) {
  const statusInfo = getStatusInfo(status);

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
      {statusInfo.label}
    </span>
  );
}

export default StatusBadge;