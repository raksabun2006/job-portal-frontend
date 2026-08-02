import { useEffect, useState } from "react";
import { getAdminStats } from "../../api/admin";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import AvatarUpload from "../../components/AvatarUpload";
import { useAuth } from "../../hooks/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getAdminStats()
      .then((res) => {
        if (!isMounted) return;
        setStats(res.data || res || {});
      })
      .catch(() => {
        if (!isMounted) return;
        setStats({});
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (stats === null) return <Loader />;

  const cards = [
    {
      label: "អ្នកប្រើប្រាស់សរុប",
      en: "Total Users",
      value: stats.total_users,
      color: "bg-teal-500",
    },
    {
      label: "បេក្ខជន",
      en: "Candidates",
      value: stats.total_candidates,
      color: "bg-blue-500",
    },
    {
      label: "និយោជក",
      en: "Employers",
      value: stats.total_employers,
      color: "bg-indigo-500",
    },
    {
      label: "ក្រុមហ៊ុន",
      en: "Companies",
      value: stats.total_companies,
      color: "bg-emerald-500",
    },
    {
      label: "ការងារសរុប",
      en: "Total Jobs",
      value: stats.total_jobs,
      color: "bg-amber-500",
    },
    {
      label: "ការងារកំពុងផ្សាយ",
      en: "Published Jobs",
      value: stats.published_jobs,
      color: "bg-teal-600",
    },
    {
      label: "ពាក្យសុំសរុប",
      en: "Applications",
      value: stats.total_applications,
      color: "bg-purple-500",
    },
  ];

  const totalApps = stats.applications_by_status
    ? Object.values(stats.applications_by_status).reduce(
        (acc, curr) => acc + Number(curr),
        0,
      )
    : 0;

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-3 py-3 sm:space-y-6 sm:px-6 sm:py-6">
      {/* 1. Header Card */}
      <div className="flex items-center gap-3 rounded-xl border border-ink-900/10 bg-white p-3.5 shadow-xs sm:rounded-2xl sm:p-6">
        <div className="shrink-0">
          <AvatarUpload fallback="A" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold tracking-tight text-ink-900 sm:text-2xl">
            ផ្ទាំងគ្រប់គ្រងអ្នកគ្រប់គ្រង
          </h1>
          <p className="truncate text-xs font-medium text-teal-700 sm:hidden">
            Admin Dashboard
          </p>
          <p className="mt-0.5 truncate text-xs text-ink-800/70">
            {user?.name ? `${user.name} · ` : ""}ទិន្នន័យស្ថិតិសរុបរបស់ប្រព័ន្ធ
          </p>
        </div>
      </div>

      {/* 2. Overview Cards Grid */}
      {/* 2 columns on small screens to reduce extreme vertical scroll, scaling to 4 columns on desktop */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.en}
            className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-ink-900/10 bg-white p-3 shadow-xs transition-all active:bg-ink-900/[0.02] sm:rounded-2xl sm:p-5"
          >
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 h-1 w-full ${c.color}`} />

            <div className="flex items-center justify-between gap-1">
              <span className="truncate text-[11px] font-semibold text-ink-800/70 sm:text-xs">
                {c.en}
              </span>
              <span className={`h-2 w-2 shrink-0 rounded-full ${c.color}`} />
            </div>

            <div className="mt-2.5 sm:mt-3">
              <p className="text-xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                {c.value ?? 0}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-ink-800/70 sm:text-xs">
                {c.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Analytics Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        {/* Graph 1: Application Status Breakdown */}
        {stats.applications_by_status && (
          <div className="rounded-xl border border-ink-900/10 bg-white p-3.5 shadow-xs sm:rounded-2xl sm:p-6 lg:col-span-7">
            <div className="mb-4 flex items-center justify-between gap-2 sm:mb-6">
              <div>
                <h2 className="text-sm font-bold text-ink-900 sm:text-base">
                  ពាក្យសុំតាមស្ថានភាព
                </h2>
                <p className="text-[11px] text-ink-800/60 sm:text-xs">
                  Applications by Status
                </p>
              </div>
              <span className="shrink-0 rounded-lg bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-700 sm:text-xs">
                សរុប: {totalApps}
              </span>
            </div>

            {/* Progress Bar Items */}
            <div className="space-y-3.5 sm:space-y-4">
              {Object.entries(stats.applications_by_status).map(
                ([status, count]) => {
                  const percentage =
                    totalApps > 0
                      ? Math.round((Number(count) / totalApps) * 100)
                      : 0;
                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={status} />
                        </div>
                        <span className="font-semibold text-ink-900">
                          {count}{" "}
                          <span className="font-normal text-ink-800/50">
                            ({percentage}%)
                          </span>
                        </span>
                      </div>

                      {/* Bar Container */}
                      <div className="h-2 w-full overflow-hidden rounded-full bg-ink-900/5 sm:h-2.5">
                        <div
                          className="h-full bg-teal-600 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        )}

        {/* Graph 2: Platform Users Ratio */}
        <div className="rounded-xl border border-ink-900/10 bg-white p-3.5 shadow-xs sm:rounded-2xl sm:p-6 lg:col-span-5">
          <h2 className="text-sm font-bold text-ink-900 sm:text-base">
            សមាមាត្រអ្នកប្រើប្រាស់
          </h2>
          <p className="text-[11px] text-ink-800/60 sm:text-xs">
            User Ratio (Candidates vs. Employers)
          </p>

          <div className="mt-4 flex flex-col items-center justify-center sm:mt-8">
            {/* Donut Circle */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-8 border-teal-500/20 bg-teal-50 sm:h-36 sm:w-36">
              <div className="text-center">
                <span className="text-lg font-bold text-ink-900 sm:text-2xl">
                  {stats.total_users ?? 0}
                </span>
                <p className="text-[10px] font-medium text-ink-800/60">
                  អ្នកប្រើប្រាស់សរុប
                </p>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="mt-4 grid w-full grid-cols-2 gap-2.5 border-t border-ink-900/10 pt-3.5 sm:mt-6 sm:gap-3 sm:pt-4">
              <div className="rounded-lg bg-black/[0.02] p-2.5 text-center sm:rounded-xl sm:p-3">
                <p className="text-[11px] text-ink-800/60 sm:text-xs">
                  បេក្ខជន
                </p>
                <p className="mt-0.5 text-sm font-bold text-teal-700 sm:mt-1 sm:text-lg">
                  {stats.total_candidates ?? 0}
                </p>
              </div>

              <div className="rounded-lg bg-black/[0.02] p-2.5 text-center sm:rounded-xl sm:p-3">
                <p className="text-[11px] text-ink-800/60 sm:text-xs">និយោជក</p>
                <p className="mt-0.5 text-sm font-bold text-indigo-700 sm:mt-1 sm:text-lg">
                  {stats.total_employers ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
