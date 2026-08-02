import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../../api/applications";
import { getMyResume } from "../../api/resumes";
import { API_ORIGIN } from "../../api/axios";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import AvatarUpload from "../../components/AvatarUpload";
import { useAuth } from "../../hooks/useAuth";

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.allSettled([getMyApplications(), getMyResume()]).then(
      ([appRes, resumeRes]) => {
        if (!isMounted) return;

        if (appRes.status === "fulfilled") {
          setApplications(appRes.data?.data || appRes.data || []);
        } else {
          setApplications([]);
        }

        if (resumeRes.status === "fulfilled") {
          setResume(resumeRes.data?.data || resumeRes.data || null);
        } else {
          setResume(null);
        }
      },
    );

    return () => {
      isMounted = false;
    };
  }, []);

  if (applications === null) return <Loader />;

  const hasResume = Boolean(resume?.file_url);
  const interviewCount = applications.filter(
    (a) => a.status === "interview",
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-3 py-3 sm:space-y-6 sm:px-6 sm:py-6">
      {/* 1. Profile Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="shrink-0">
            <AvatarUpload fallback="C" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-bold text-ink-900 sm:text-2xl">
                សួស្តី, {user?.name || "បេក្ខជន"}
              </h1>
              <span className="inline-flex shrink-0 items-center rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700 capitalize">
                បេក្ខជន · Candidate
              </span>
            </div>
            <p className="mt-0.5 truncate text-xs text-ink-800/70">
              {user?.email}
            </p>
            <p className="hidden text-xs text-ink-800/60 sm:block">
              គ្រប់គ្រងពាក្យសុំ និងប្រវត្តិរូបសង្ខេបរបស់អ្នក
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to="/candidate/resume"
          className="flex h-10 w-full items-center justify-center rounded-xl border border-ink-900/15 text-xs font-semibold text-ink-800 transition-colors hover:bg-ink-900/5 active:bg-ink-900/10 sm:h-9 sm:w-auto sm:px-4"
        >
          {hasResume ? "កែប្រែ CV · Edit Resume" : "បញ្ចូល CV · Upload Resume"}
        </Link>
      </div>

      {/* 2. Stats Summary Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {/* Card 1: Total Applications */}
        <div className="relative overflow-hidden rounded-xl border border-ink-900/10 bg-white p-4 shadow-xs sm:rounded-2xl sm:p-5">
          <div className="absolute top-0 left-0 h-1 w-full bg-teal-600" />
          <div className="flex items-baseline justify-between sm:block">
            <p className="text-xs font-medium text-ink-800/70">
              ពាក្យសុំសរុប · Applications
            </p>
            <p className="text-xl font-bold tracking-tight text-ink-900 sm:mt-2 sm:text-3xl">
              {applications.length}
            </p>
          </div>
          <p className="mt-1 text-[11px] text-ink-800/60">
            ការងារដែលបានដាក់ពាក្យរួចរាល់
          </p>
        </div>

        {/* Card 2: CV Status */}
        <div className="relative overflow-hidden rounded-xl border border-ink-900/10 bg-white p-4 shadow-xs sm:rounded-2xl sm:p-5">
          <div
            className={`absolute top-0 left-0 h-1 w-full ${hasResume ? "bg-emerald-500" : "bg-amber-500"}`}
          />
          <div className="flex items-baseline justify-between sm:block">
            <p className="text-xs font-medium text-ink-800/70">
              ស្ថានភាព CV · Resume Status
            </p>
            <p
              className={`text-base font-bold tracking-tight sm:mt-2 sm:text-2xl ${hasResume ? "text-emerald-700" : "text-amber-600"}`}
            >
              {hasResume ? "បានបញ្ចប់" : "មិនទាន់មាន"}
            </p>
          </div>
          <p className="mt-1 text-[11px] text-ink-800/60">
            {hasResume
              ? "CV រួចរាល់សម្រាប់ដាក់ពាក្យ"
              : "សូមបញ្ចូល CV ដើម្បីងាយស្រួលដាក់ពាក្យ"}
          </p>
        </div>

        {/* Card 3: Interviews */}
        <div className="relative overflow-hidden rounded-xl border border-ink-900/10 bg-white p-4 shadow-xs sm:rounded-2xl sm:p-5">
          <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500" />
          <div className="flex items-baseline justify-between sm:block">
            <p className="text-xs font-medium text-ink-800/70">
              ត្រូវសម្ភាសន៍ · Interviews
            </p>
            <p className="text-xl font-bold tracking-tight text-indigo-700 sm:mt-2 sm:text-3xl">
              {interviewCount}
            </p>
          </div>
          <p className="mt-1 text-[11px] text-ink-800/60">
            ក្រុមហ៊ុនបានអញ្ជើញសម្ភាសន៍
          </p>
        </div>
      </div>

      {/* 3. Missing Resume Alert */}
      {!hasResume && (
        <div className="flex flex-col gap-3 rounded-xl border border-amber-500/30 bg-amber-50/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl">
          <div className="flex items-start gap-3 sm:items-center">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-[11px] font-bold text-amber-900">
              i
            </span>
            <p className="text-xs font-medium leading-relaxed text-amber-900">
              អ្នកមិនទាន់បានបញ្ចូល CV ទេ —
              បញ្ចប់ព័ត៌មានរបស់អ្នកដើម្បីបង្កើនឱកាសទទួលបានការងារ!
            </p>
          </div>
          <Link
            to="/candidate/resume"
            className="flex h-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 px-4 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-700 active:bg-teal-800 sm:h-9"
          >
            បញ្ចូល CV ឥឡូវនេះ
          </Link>
        </div>
      )}

      {/* 4. Recent Applications Section */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-bold text-ink-900">
            ពាក្យសុំចុងក្រោយ · Recent Applications
          </h2>
          <p className="text-xs text-ink-800/60">
            ប្រវត្តិការងារដែលអ្នកបានដាក់ពាក្យថ្មីៗនេះ
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-xl border border-ink-900/10 bg-white p-8 text-center text-xs text-ink-800/60 shadow-xs sm:rounded-2xl">
            អ្នកមិនទាន់បានដាក់ពាក្យសុំណាមួយទេ។
          </div>
        ) : (
          <div className="divide-y divide-ink-900/10 overflow-hidden rounded-xl border border-ink-900/10 bg-white shadow-xs sm:rounded-2xl">
            {applications.slice(0, 5).map((a) => {
              const logoSrc = a.job?.company?.logo
                ? a.job.company.logo.startsWith("http")
                  ? a.job.company.logo
                  : `${API_ORIGIN}/storage/${a.job.company.logo.replace(/^\//, "")}`
                : null;

              return (
                <div
                  key={a.id}
                  className="p-3.5 transition-colors hover:bg-black/[0.015] sm:p-4"
                >
                  {/* Top row: Logo + Job details + Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {logoSrc ? (
                        <img
                          src={logoSrc}
                          alt={a.job?.company?.name || "Company Logo"}
                          className="h-10 w-10 shrink-0 rounded-lg border border-ink-900/10 object-contain p-1"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-700">
                          {a.job?.title?.charAt(0)?.toUpperCase() || "J"}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-ink-900 text-sm">
                          {a.job?.title || "N/A"}
                        </p>
                        <p className="truncate text-xs text-ink-800/70">
                          {a.job?.company?.name || "Unknown Company"}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <StatusBadge status={a.status} />
                    </div>
                  </div>

                  {/* Bottom row: Applied date */}
                  {a.created_at && (
                    <div className="mt-2 text-[11px] text-ink-800/50 pl-[52px]">
                      កាលបរិច្ឆេទ៖ {new Date(a.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
