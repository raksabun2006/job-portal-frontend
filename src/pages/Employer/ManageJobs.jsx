import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteJob, getMyJobs } from "../../api/jobs";
import { useAuth } from "../../hooks/useAuth";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";

export default function ManageJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!user?.company?.id) {
      console.log("No company found for user:", user);
      setJobs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await getMyJobs();
      console.log("Jobs response:", res);

      // Handle paginated response structure from Laravel
      const jobsData = res.data || res || [];
      const jobsList = Array.isArray(jobsData) ? jobsData : [];

      console.log("Extracted jobs:", jobsList);
      setJobs(jobsList);
    } catch (error) {
      console.error("Error loading jobs:", error);
      console.error("Error details:", error.response?.data || error.message);
      setError(error.message || "Failed to load jobs");
      toast.error("Failed to load jobs. Please try again.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [user?.company?.id]);

  useEffect(() => {
    if (user) {
      load();
    } else {
      setLoading(false);
    }
  }, [user, load]);

  const handleDelete = async (id) => {
    if (!confirm("លុបការងារនេះមែនទេ?")) return;
    try {
      await deleteJob(id);
      toast.success("ការងារត្រូវបានលុប");
      load();
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job. Please try again.");
    }
  };

  if (loading) return <Loader />;

  if (error && jobs.length === 0) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-red-700">{error}</p>
        <button
          onClick={load}
          className="mt-2 text-sm font-medium text-red-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!user?.company?.id) {
    return (
      <EmptyState
        title="គ្រប់គ្រងការងារ · Manage Jobs"
        description="Please create a company profile first."
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink-950">
          គ្រប់គ្រងការងារ · Manage Jobs
        </h1>
        <Link to="/employer/jobs/new" className="btn-accent">
          + ដាក់ការងារថ្មី
        </Link>
      </div>

      {!jobs || jobs.length === 0 ? (
        <EmptyState
          title="មិនទាន់មានការងារនៅឡើយទេ"
          description="ដាក់ការងារដំបូងរបស់អ្នក។"
        />
      ) : (
        <div className="card mt-6 divide-y divide-ink-900/8">
          {jobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-ink-950">{job.title}</p>
                <p className="text-sm text-ink-800/60">
                  {job.applications_count ?? 0} ពាក្យសុំ
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={job.status} />
                <Link
                  to={`/employer/jobs/${job.id}/applicants`}
                  className="text-sm font-medium text-teal-600 hover:underline"
                >
                  អ្នកដាក់ពាក្យ
                </Link>
                <Link
                  to={`/employer/jobs/${job.id}/edit`}
                  className="text-sm font-medium text-ink-800 hover:underline"
                >
                  កែសម្រួល
                </Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-sm font-medium text-red-500 hover:underline"
                >
                  លុប
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
