import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Home, Layers, CreditCard, Building2, Users, Shield, UserCheck, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import svgPaths from '../../imports/svg-7ehcjavxpm';

export function CustomSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCompanyExpanded, setIsCompanyExpanded] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-800 to-slate-900">
      {/* Logo Section */}
      <div className="px-6 py-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#ff5e3a] to-[#ff8566] rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g>
                <path d={svgPaths.p39438170} fill="white" />
                <path d={svgPaths.p2841300} fill="white" />
              </g>
            </svg>
          </div>
          <div>
            <h1 className="text-white text-[15px] font-bold leading-tight">Numurus</h1>
            <p className="text-slate-400 text-[10px] leading-tight">Construction SaaS</p>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {/* Home */}
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-medium transition-all group ${
              isActive('/')
                ? 'bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] text-white shadow-lg shadow-orange-500/20'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            <Home className={`w-5 h-5 ${isActive('/') ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
            <span>Home</span>
          </button>

          {/* Projects */}
          <button
            onClick={() => navigate('/projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-medium transition-all group ${
              isActive('/projects')
                ? 'bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] text-white shadow-lg shadow-orange-500/20'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            <Layers className={`w-5 h-5 ${isActive('/projects') ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
            <span>Projects</span>
          </button>

          {/* Payment Requests */}
          <button
            onClick={() => navigate('/payment-requests')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-medium transition-all group ${
              isActive('/payment-requests')
                ? 'bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] text-white shadow-lg shadow-orange-500/20'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            <CreditCard className={`w-5 h-5 ${isActive('/payment-requests') ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
            <span>Payment Requests</span>
          </button>

          {/* Divider */}
          <div className="my-4 border-t border-slate-700"></div>

          {/* My Company - Collapsible Section */}
          <div className="space-y-1">
            <button
              onClick={() => setIsCompanyExpanded(!isCompanyExpanded)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-medium transition-all text-slate-300 hover:bg-slate-700/50 hover:text-white group"
            >
              <Building2 className="w-5 h-5 text-slate-400 group-hover:text-white" />
              <span className="flex-1 text-left">My Company</span>
              {isCompanyExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Collapsible Items */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isCompanyExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-4 space-y-1 mt-1">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-all text-slate-400 hover:bg-slate-700/30 hover:text-slate-200">
                  <Building2 className="w-4 h-4" />
                  <span>Company Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-all text-slate-400 hover:bg-slate-700/30 hover:text-slate-200">
                  <Shield className="w-4 h-4" />
                  <span>Roles</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-all text-slate-400 hover:bg-slate-700/30 hover:text-slate-200 relative">
                  <UserCheck className="w-4 h-4" />
                  <span>Request To Join</span>
                  <span className="ml-auto px-2 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-[10px] font-bold shadow-sm">
                    5
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-all text-slate-400 hover:bg-slate-700/30 hover:text-slate-200">
                  <Users className="w-4 h-4" />
                  <span>Users</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-all text-slate-400 hover:bg-slate-700/30 hover:text-slate-200">
                  <Settings className="w-4 h-4" />
                  <span>Subscription Management</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* User Section - Bottom */}
      <div className="border-t border-slate-700 px-4 py-4">
        <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
            alt="User"
            className="w-9 h-9 rounded-full object-cover border-2 border-slate-600"
          />
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13px] font-semibold truncate">Mohamed</p>
            <p className="text-slate-400 text-[10px] truncate">Contractor Engineer</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
