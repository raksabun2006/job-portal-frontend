import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import {
  createCompany,
  getCompany,
  updateCompany,
  uploadCompanyLogo,
} from "../../api/companies";
import { getMyJobs, deleteJob } from "../../api/jobs";
import Loader from "../../components/Loader";

export default function MyCompany() {
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    if (user?.company?.id) {
      getCompany(user.company.id)
        .then((res) => {
          setCompany(res.data);
          reset(res.data);
        })
        .finally(() => setLoading(false));
      fetchJobs();
    } else {
      setLoading(false);
    }
  }, [user, reset]);

  const fetchJobs = async () => {
    try {
      setJobsLoading(true);
      const res = await getMyJobs();
      setJobs(res.data || []);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setJobsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = company
        ? await updateCompany(company.id, data)
        : await createCompany(data);
      setCompany(res.data);
      setUser({ ...user, company: res.data });
      toast.success("ក្រុមហ៊ុនត្រូវបានរក្សាទុក · Company saved");
    } catch {
      toast.error("រក្សាទុកមិនបានជោគជ័យទេ");
    }
  };

  const handleLogo = async () => {
    if (!logoFile || !company) return;
    try {
      const res = await uploadCompanyLogo(company.id, logoFile);
      setCompany(res.data);
      toast.success("Logo ត្រូវបានផ្ទុកឡើង");
    } catch {
      toast.error("ការផ្ទុកឡើង Logo មិនជោគជ័យ");
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter((j) => j.id !== jobId));
      toast.success("Job deleted successfully");
    } catch {
      toast.error("Failed to delete job");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="mx-auto max-w-6xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          ក្រុមហ៊ុនរបស់ខ្ញុំ · My Company
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          គ្រប់គ្រងព័ត៌មានក្រុមហ៊ុន និងឡូហ្គោរបស់អ្នកសម្រាប់ឱកាសការងារ។
        </p>
      </div>

      {company && (
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt="Company Logo"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-slate-400">LOGO</span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {company.name || "ឈ្មោះក្រុមហ៊ុន"}
              </p>
              <p className="text-xs text-slate-500">
                អាប់ដេតឡូហ្គោក្រុមហ៊ុនរបស់អ្នក
              </p>
            </div>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files[0])}
              className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
            />
            <button
              onClick={handleLogo}
              disabled={!logoFile}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:opacity-50"
            >
              ផ្ទុកឡើង
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm mb-8"
      >
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
            ឈ្មោះក្រុមហ៊ុន · Company name
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
            {...register("name", { required: true })}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              វិស័យ · Industry
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
              {...register("industry")}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              ទីតាំង · Location
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
              {...register("location")}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
            គេហទំព័រ · Website
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
            {...register("website")}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
            ការពិពណ៌នា · Description
          </label>
          <textarea
            className="w-full min-h-32 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
            {...register("description")}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-teal-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 disabled:opacity-50"
        >
          {isSubmitting
            ? "កំពុងរក្សាទុក..."
            : company
              ? "ធ្វើបច្ចុប្បន្នភាព · Update"
              : "បង្កើត · Create"}
        </button>
      </form>

      {/* Job Posts Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            ការផ្ដល់ការងារ · My Job Posts
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            ការផ្ដល់ការងារដែលបានផ្សាយដោយក្រុមហ៊ុនរបស់អ្នក
          </p>
        </div>

        {jobsLoading ? (
          <Loader />
        ) : jobs.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-slate-500">
              មិនមានការផ្ដល់ការងារ · No job posts yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{job.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.type && (
                      <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-lg">
                        {job.type}
                      </span>
                    )}
                    {job.location && (
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-lg">
                        {job.location}
                      </span>
                    )}
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-lg">
                      {job.applications_count || 0} applicants
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="flex-1 sm:flex-none rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition-all hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
