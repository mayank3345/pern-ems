import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Users, Building2, CalendarCheck, Clock, 
  LayoutDashboard, Sparkles, Search, LogOut, Menu 
} from 'lucide-react';

export default function AppShell({ userRole = 'ADMIN', setUserRole }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['ADMIN', 'EMPLOYEE'] },
    { name: 'Employee Directory', path: '/employees', icon: Users, roles: ['ADMIN'] },
    { name: 'Departments', path: '/departments', icon: Building2, roles: ['ADMIN'] },
    { name: 'Attendance', path: '/attendance', icon: Clock, roles: ['ADMIN', 'EMPLOYEE'] },
    { name: 'Leave Management', path: '/leaves', icon: CalendarCheck, roles: ['ADMIN', 'EMPLOYEE'] },
  ];

  const filteredNav = navItems.filter((item) => item.roles.includes(userRole));

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-200 flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          {sidebarOpen && (
            <span className="font-bold text-lg tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              PulseEMS <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">AI</span>
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-slate-800">
            <Menu className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {filteredNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Quick Role Switcher for Day 1 Testing */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <p className="text-xs font-semibold text-slate-400">Preview Role</p>
              <button 
                onClick={() => setUserRole(userRole === 'ADMIN' ? 'EMPLOYEE' : 'ADMIN')}
                className="text-xs text-emerald-400 font-mono underline mt-0.5 cursor-pointer"
              >
                {userRole} (Switch)
              </button>
            </div>
          )}
          <LogOut className="w-4 h-4 text-slate-400 cursor-pointer hover:text-rose-400" />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Ask AI or filter employees... (Cmd + K)"
              className="w-full pl-9 pr-12 py-1.5 bg-slate-100 border border-transparent focus:bg-white focus:border-emerald-500 rounded-lg text-sm outline-none transition"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500">
              ⌘K
            </kbd>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Neon DB Connected
            </span>
          </div>
        </header>

        {/* Child Routes Render Here */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}