import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineGlobeAlt, HiOutlineCodeBracket } from "react-icons/hi2";

export default function AboutUs() {
  const profile = {
    name: "Bun Raksa",
    role: "Backend Developer",
    bio: "I am a second-year Computer Science student at the Royal University of Phnom Penh (RUPP), specializing in backend architecture, API integration, and database management systems.",
    image: "/images/saa.jpg",
    linkedin: "https://linkedin.com",
    github: "https://github.com/raksasbun2006",
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              About The Developer
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Meet the Creator
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400">
              Welcome to our platform. Learn more about the developer driving
              the backend engine and technical infrastructure behind this
              project.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="group flex w-full max-w-xl flex-col items-center rounded-[24px] border border-slate-200/80 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30 sm:p-10">
              <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full ring-4 ring-blue-50 transition-transform duration-300 group-hover:scale-105 dark:ring-slate-800">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {profile.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                {profile.role}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {profile.bio}
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-blue-600 dark:hover:text-white"
                    aria-label={`${profile.name}'s LinkedIn`}
                  >
                    <HiOutlineGlobeAlt className="h-5 w-5" />
                  </a>
                )}
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-900 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-white dark:hover:text-slate-900"
                    aria-label={`${profile.name}'s GitHub`}
                  >
                    <HiOutlineCodeBracket className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
