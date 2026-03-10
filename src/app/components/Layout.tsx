import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router";
import { Search, Bell, ChevronDown, ChevronRight, ChevronLeft, LogOut, Menu } from "lucide-react";
import { CustomSidebar } from "./CustomSidebar";
import svgPaths from "../../imports/svg-7ehcjavxpm";
import imgUser from "figma:asset/aac3686027523ee52ec210453f7ea0fa1a89f9c3.png";

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get page title based on route
  const getPageTitle = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname === "/projects") return "Projects";
    if (location.pathname === "/payment-requests") return "Payment Requests";
    return "Dashboard";
  };

  const getPageSubtitle = () => {
    if (location.pathname === "/") return "Welcome to your workspace";
    if (location.pathname === "/projects") return "Manage your construction projects";
    if (location.pathname === "/payment-requests") return "Review and approve payment requests";
    return "";
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? "w-[54px]" : "w-[240px] sm:w-[264px]"
        } flex-shrink-0 bg-white border-r border-[#e2e8f0] transition-all duration-300 relative z-50 
        ${mobileMenuOpen ? 'fixed inset-y-0 left-0 w-[280px]' : 'hidden'} lg:block`}
      >
        {sidebarCollapsed ? (
          // Collapsed sidebar - icon only view with dark theme
          <div className="flex flex-col h-full bg-gradient-to-b from-slate-800 to-slate-900">
            {/* Logo */}
            <div className="h-[70px] flex items-center justify-center px-2 py-5 border-b border-slate-700">
              <div className="size-[36px] bg-gradient-to-br from-[#ff5e3a] to-[#ff8566] rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g>
                    <path d={svgPaths.p39438170} fill="white" />
                    <path d={svgPaths.p2841300} fill="white" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col gap-2 px-2 py-4">
              <button 
                onClick={() => navigate("/")}
                className={`w-full p-2.5 rounded-lg transition-all group ${
                  location.pathname === "/" 
                    ? "bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] shadow-lg shadow-orange-500/20" 
                    : "hover:bg-slate-700"
                }`}
                title="Home"
              >
                <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={location.pathname === "/" ? "white" : "#94A3B8"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke={location.pathname === "/" ? "white" : "#94A3B8"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                onClick={() => navigate("/projects")}
                className={`w-full p-2.5 rounded-lg transition-all group ${
                  location.pathname === "/projects" 
                    ? "bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] shadow-lg shadow-orange-500/20" 
                    : "hover:bg-slate-700"
                }`}
                title="Projects"
              >
                <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24">
                  <g>
                    <path d="M3 3h8v8H3V3z" stroke={location.pathname === "/projects" ? "white" : "#94A3B8"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13h8v8H3v-8z" stroke={location.pathname === "/projects" ? "white" : "#94A3B8"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 3h8v8h-8V3z" stroke={location.pathname === "/projects" ? "white" : "#94A3B8"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 13h8v8h-8v-8z" stroke={location.pathname === "/projects" ? "white" : "#94A3B8"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </button>
              <button 
                onClick={() => navigate("/payment-requests")}
                className={`w-full p-2.5 rounded-lg transition-all group ${
                  location.pathname === "/payment-requests" 
                    ? "bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] shadow-lg shadow-orange-500/20" 
                    : "hover:bg-slate-700"
                }`}
                title="Payment Requests"
              >
                <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24">
                  <rect width="18" height="14" x="3" y="5" stroke={location.pathname === "/payment-requests" ? "white" : "#94A3B8"} strokeWidth="1.5" rx="2" fill="none" />
                  <path d="M3 10h18" stroke={location.pathname === "/payment-requests" ? "white" : "#94A3B8"} strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7 15h4" stroke={location.pathname === "/payment-requests" ? "white" : "#94A3B8"} strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7 17.5h2" stroke={location.pathname === "/payment-requests" ? "white" : "#94A3B8"} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-3 items-center pb-6 border-t border-slate-700 pt-4">
              {/* Toggle Sidebar Button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="size-[36px] bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] rounded-lg flex items-center justify-center hover:shadow-lg transition-all shadow-orange-500/30"
                title="Expand Sidebar"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              {/* User Avatar */}
              <button className="size-[36px] rounded-lg overflow-hidden border-2 border-slate-700 hover:border-[#ff5e3a] transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        ) : (
          // Expanded sidebar - New CustomSidebar
          <div className="flex flex-col h-full relative" onClick={() => setMobileMenuOpen(false)}>
            <CustomSidebar />
            {/* Toggle button positioned at bottom right */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute right-4 bottom-4 size-[36px] bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] rounded-lg flex items-center justify-center hover:shadow-lg transition-all shadow-orange-500/30 z-10"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - show for Home, Projects, and Payment Requests pages */}
        {(location.pathname === "/" || location.pathname === "/projects" || location.pathname === "/payment-requests") && (
          <header className="bg-white border-b border-[#e2e8f0] px-3 md:px-6 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5 text-[#64748b]" />
              </button>

              <div>
                <h1 className="font-['Inter'] font-semibold text-[14px] md:text-[16px] text-[#0f172a]">
                  {getPageTitle()}
                </h1>
                <p className="font-['Inter'] text-[10px] md:text-[11px] text-[#94A3B8] hidden md:block">
                  {getPageSubtitle()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Global Search"
                  className="w-[240px] h-[32px] bg-[#f8fafc] border border-[#e2e8f0] rounded pl-[33px] pr-3 py-2 text-[12px] text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              </div>

              <div className="flex items-center gap-2">
                <button className="relative p-1.5 rounded hover:bg-gray-100">
                  <Bell className="w-5 h-5 text-[#64748B]" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff5e3a] rounded-full" />
                </button>

                <div className="hidden md:flex items-center gap-2 pl-2 border-l border-[#e2e8f0]">
                  <img src={imgUser} alt="User" className="w-7 h-7 rounded-full" />
                  <span className="font-['Inter'] font-semibold text-[12px] text-[#0f172a]">Mohamed</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}