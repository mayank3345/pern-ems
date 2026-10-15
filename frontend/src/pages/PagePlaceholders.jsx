import { Link } from 'react-router-dom';

const PageCard = ({ title, day, description }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
      {day} Deliverable
    </span>
    <h1 className="text-2xl font-bold text-slate-900 mt-3">{title}</h1>
    <p className="text-slate-600 mt-1 text-sm">{description}</p>
  </div>
);

export const DashboardPage = () => (
  <PageCard title="Executive Dashboard" day="Day 7" description="Headcount KPIs, payroll analytics, and AI Burnout Radar." />
);

export const EmployeesPage = () => (
  <PageCard title="Employee Directory" day="Day 4 & 5" description="Paginated table, Cmd+K AI search, and AI Resume Parser drawer." />
);

export const DepartmentsPage = () => (
  <PageCard title="Departments & Org Matrix" day="Day 3" description="Department cards with live SQL headcount aggregation." />
);

export const AttendancePage = () => (
  <PageCard title="Attendance Tracker" day="Day 6" description="Daily clock-in/clock-out widget and attendance logs." />
);

export const LeavesPage = () => (
  <PageCard title="Leave Management" day="Day 6" description="Leave requests and AI Conflict Summarizer for managers." />
);

export const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md">
      <h1 className="text-xl font-bold">PulseEMS Login (Day 2)</h1>
      <p className="text-slate-400 text-sm mt-1">JWT & HTTP-Only Cookie Auth screen.</p>
      <Link to="/" className="mt-4 inline-block text-emerald-400 text-sm underline">← Back to Dashboard</Link>
    </div>
  </div>
);

export const UnauthorizedPage = () => (
  <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-rose-900">
    <h2 className="text-lg font-bold">403 — Access Denied</h2>
    <p className="text-sm mt-1">Your current role does not have permission to view this page.</p>
    <Link to="/" className="mt-3 inline-block text-xs font-semibold bg-rose-600 text-white px-3 py-1.5 rounded-lg">
      Return to Dashboard
    </Link>
  </div>
);