import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import AvatarUpload from "../../components/AvatarUpload";
import { useAuth } from "../../hooks/useAuth";
import { getCompany } from "../../api/companies";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [company, setCompany] = useState(undefined);

  useEffect(() => {
    let isMounted = true;

    if (user?.company?.id) {
      getCompany(user.company.id)
        .then((res) => {
          if (!isMounted) return;
          setCompany(res.data?.data || res.data || res);
        })
        .catch(() => {
          if (!isMounted) return;
          setCompany(null);
        });
    } else {
      setCompany(null);
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (company === undefined) return <Loader />;

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-3 py-3 sm:space-y-6 sm:px-6 sm:py-6">
      {/* 1. Employer Profile Header Card */}
      <div className="flex items-center gap-3 rounded-xl border border-ink-900/10 bg-white p-3.5 shadow-xs sm:rounded-2xl sm:p-6">
        <div className="shrink-0">
          <AvatarUpload fallback="E" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-base font-bold tracking-tight text-ink-900 sm:text-2xl">
              ផ្ទាំងគ្រប់គ្រងនិយោជក
            </h1>
            <span className="inline-flex shrink-0 items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 capitalize">
              និយោជក · Employer
            </span>
          </div>
          <p className="mt-0.5 truncate text-xs text-ink-800/70">
            {user?.name ? `${user.name} · ` : ""}
            {user?.email}
          </p>
        </div>
      </div>

      {/* 2. Company Status & Actions */}
      {!company ? (
        /* Empty State: Prompt to Create Company */
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-900/15 bg-white p-5 text-center shadow-xs sm:rounded-2xl sm:p-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xs font-bold text-amber-700 sm:h-12 sm:w-12 sm:rounded-2xl sm:text-sm">
            C
          </div>
          <h2 className="mt-3 text-sm font-bold text-ink-900 sm:text-base">
            មិនទាន់មានក្រុមហ៊ុន · No Company Profile
          </h2>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-ink-800/70">
            អ្នកមិនទាន់មានក្រុមហ៊ុនទេ — បង្កើតឥឡូវនេះដើម្បីចាប់ផ្តើមដាក់ការងារ
            និងគ្រប់គ្រងពាក្យសុំ។
          </p>
          <Link
            to="/employer/company"
            className="mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-teal-600 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-700 active:bg-teal-800 sm:h-9 sm:w-auto sm:px-5"
          >
            បង្កើតក្រុមហ៊ុន · Create Company
          </Link>
        </div>
      ) : (
        /* Active State: Display Company Overview Card */
        <div className="flex flex-col gap-3.5 rounded-xl border border-ink-900/10 bg-white p-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:p-6">
          <div className="flex items-center gap-3 min-w-0">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-10 w-10 shrink-0 rounded-lg border border-ink-900/10 object-contain p-1 sm:h-12 sm:w-12 sm:rounded-xl"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-700 sm:h-12 sm:w-12 sm:rounded-xl sm:text-base">
                {company.name?.charAt(0)?.toUpperCase() || "C"}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h2 className="truncate font-bold text-ink-900 text-sm sm:text-lg">
                {company.name}
              </h2>
              <p className="truncate text-[11px] text-ink-800/60 mt-0.5 sm:text-xs">
                {company.jobs_count ?? 0} ការងារកំពុងផុសផ្សាយ · Active Jobs
                Posted
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-ink-900/5 sm:border-t-0 sm:pt-0 shrink-0">
            <Link
              to="/employer/jobs"
              className="flex h-10 w-full items-center justify-center rounded-xl bg-teal-600 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-700 active:bg-teal-800 sm:h-9 sm:w-auto sm:px-4"
            >
              គ្រប់គ្រងការងារ · Manage Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
