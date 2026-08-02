import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlineBuildingOffice2, 
  HiOutlineBolt, 
  HiOutlineCursorArrowRays, 
  HiOutlineShieldCheck,
  HiOutlineViewfinderCircle,
  HiOutlineEye,
  HiOutlineHeart, 
  HiOutlineArrowRight,
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlineGlobeAlt,
  HiOutlineCodeBracket
} from 'react-icons/hi2';

// Reusable Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group relative rounded-[24px] border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30">
    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/60 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
    <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);

// Reusable Team Card Component
const TeamCard = ({ image, name, role, bio, linkedin, github }) => (
  <div className="group flex flex-col items-center rounded-[24px] border border-slate-200/80 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30">
    <div className="relative mb-5 h-28 w-28 overflow-hidden rounded-full ring-4 ring-blue-50 transition-transform duration-300 group-hover:scale-105 dark:ring-slate-800">
      <img src={image} alt={name} className="h-full w-full object-cover" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h3>
    <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">{role}</p>
    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{bio}</p>
    <div className="mt-6 flex items-center justify-center gap-3">
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-blue-600 dark:hover:text-white"
          aria-label={`${name}'s LinkedIn`}
        >
          <HiOutlineGlobeAlt className="h-4 w-4" />
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-900 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-white dark:hover:text-slate-900"
          aria-label={`${name}'s GitHub`}
        >
          <HiOutlineCodeBracket className="h-4 w-4" />
        </a>
      )}
    </div>
  </div>
);

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Bun Raksa",
      role: "Backend developer",
      bio: "I'm second year student at RUPP. ",
      image: "./images/saa.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com/raksasbun2006"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
   
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              The Leadership
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">Meet the Team</h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}