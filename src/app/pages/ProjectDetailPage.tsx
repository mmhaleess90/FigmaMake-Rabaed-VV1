import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Search, Bell, Settings, ChevronDown, Calendar, Users, Building2, Clock, Plus, List } from 'lucide-react';
import { SubmittalsListView } from '../components/SubmittalsListView';
import { PackagesKanbanView } from '../components/PackagesKanbanView';
import { PackagesListView } from '../components/PackagesListView';
import { SubmittalDetailPanel } from '../components/SubmittalDetailPanel';
import { DailySiteReportListView } from '../components/DailySiteReportListView';
import { CreateDailySiteReportPanel } from '../components/CreateDailySiteReportPanel';
import { DailySiteReportDetail } from '../components/DailySiteReportDetail';
import { CreateSubmittalPanel } from '../components/CreateSubmittalPanel';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') as 'overview' | 'submittals' | 'packages' | 'daily-report' | 'snag-list' | 'suppliers' | 'files' | 'activity' | 'settings' | null;
  const [activeTab, setActiveTab] = useState<'overview' | 'submittals' | 'packages' | 'daily-report' | 'snag-list' | 'suppliers' | 'files' | 'activity' | 'settings'>(tabFromUrl || 'overview');
  
  // Update activeTab when URL changes
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [expandedStatusGroups, setExpandedStatusGroups] = useState<Record<string, boolean>>({
    'Drafts': true,
    'Internal Review': true,
    'Revised & Resubmitted': true,
    'Pending Approval': true,
    'Approved': true,
    'Rejected': true,
    'Cancelled': true,
  });
  const [expandedPackageGroups, setExpandedPackageGroups] = useState<Record<string, boolean>>({
    'BACKLOG': true,
    'PICKED UP': true,
    'NEED CLARIFICATION': true,
    'IN PROGRESS': true,
    'RE-OPEN': true,
    'PROJECT FLOW': true,
    'WAITING REQUESTER CONFIRMATION': true,
  });
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({});
  const [selectedSubmittal, setSelectedSubmittal] = useState<any>(null);
  const [isSubmittalPanelOpen, setIsSubmittalPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'overlay' | 'push'>('push'); // Default to push mode
  const [showCreateSubmittal, setShowCreateSubmittal] = useState(false);
  
  // Daily Site Report state
  const [isCreateReportPanelOpen, setIsCreateReportPanelOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isReportDetailOpen, setIsReportDetailOpen] = useState(false);

  // Toggle group expansion
  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  // Toggle status group expansion in list view
  const toggleStatusGroup = (status: string) => {
    setExpandedStatusGroups(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  // Toggle package group expansion in list view
  const togglePackageGroup = (status: string) => {
    setExpandedPackageGroups(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  // Toggle individual package expansion in kanban view
  const togglePackage = (packageKey: string) => {
    setExpandedPackages(prev => ({
      ...prev,
      [packageKey]: !prev[packageKey]
    }));
  };

  // Open submittal detail panel
  const openSubmittalDetail = (submittal: any) => {
    setSelectedSubmittal(submittal);
    setIsSubmittalPanelOpen(true);
  };

  // Close submittal detail panel
  const closeSubmittalDetail = () => {
    setIsSubmittalPanelOpen(false);
    setTimeout(() => setSelectedSubmittal(null), 300);
  };

  // Get trade color
  const getTradeColor = (trade: string) => {
    if (trade.includes('Electrical')) return { bg: 'bg-blue-100', text: 'text-blue-700' };
    if (trade.includes('Mechanical')) return { bg: 'bg-emerald-100', text: 'text-emerald-700' };
    if (trade.includes('Civil')) return { bg: 'bg-amber-100', text: 'text-amber-700' };
    if (trade.includes('Architectural')) return { bg: 'bg-purple-100', text: 'text-purple-700' };
    return { bg: 'bg-slate-100', text: 'text-slate-700' };
  };

  // Mock project data (would be fetched based on projectId)
  const project = {
    id: projectId || 'PRJ-2024-001',
    name: 'Dubai Marina Tower - Phase 2',
    company: 'Al Futtaim Construction Co.',
    startDate: '2024-01-15',
    endDate: '2024-12-20',
    location: 'Dubai Marina, UAE',
    status: 'In Progress',
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Calendar className="w-4 h-4" /> },
    { id: 'submittals', label: 'Submittals', icon: null },
    { id: 'packages', label: 'Packages', icon: null },
    { id: 'daily-report', label: 'Daily Site Report', icon: null },
    { id: 'snag-list', label: 'Snag List', icon: null },
    { id: 'suppliers', label: 'Approved Suppliers', icon: null },
    { id: 'files', label: 'Files', icon: null },
    { id: 'activity', label: 'Activity', icon: null },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="h-full flex flex-col bg-[#f8fafc]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <button
            onClick={() => navigate('/projects')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Back to Projects"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#ff5e3a] to-[#ff8566] rounded-lg flex items-center justify-center">
              <span className="text-white text-[16px] font-bold">N</span>
            </div>
            <div>
              <h1 className="text-[16px] font-bold text-slate-900">{project.name}</h1>
              <p className="text-[11px] text-slate-500">{project.company}</p>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] w-[250px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
            />
          </div>

          {/* Role Badge */}
          <div className="px-3 py-1.5 bg-[#ff5e3a] text-white rounded-md text-[11px] font-semibold hidden md:block">
            Contractor Engineer
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <button className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
              alt="User"
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-[13px] font-medium text-slate-900 hidden sm:inline">Mohamed</span>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center gap-1 overflow-x-auto flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-[13px] font-medium transition-all whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? 'text-[#ff5e3a] border-[#ff5e3a]'
                : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 overflow-hidden flex ${isSubmittalPanelOpen && panelMode === 'push' ? '' : ''}`}>
        {/* Content Wrapper */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${isSubmittalPanelOpen && panelMode === 'push' ? 'mr-0' : ''}`}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">
            {/* Date Range Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-[13px] text-slate-600">
                From 1 July to 31 July
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-[#ff5e3a] hover:bg-[#fff5f3] rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {/* Median Cycle Time */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-medium text-purple-700 uppercase tracking-wide">
                    Median Cycle Time
                  </div>
                  <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
                <div className="text-[28px] font-bold text-purple-900 mb-1">4.5 Days</div>
                <div className="text-[10px] text-purple-600">During this Month</div>
              </div>

              {/* Finished In Time */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-medium text-emerald-700 uppercase tracking-wide">
                    Finished In Time (5 days)
                  </div>
                  <div className="w-8 h-8 bg-emerald-200 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-[28px] font-bold text-emerald-900 mb-1">95%</div>
                <div className="text-[10px] text-emerald-600">During this Month</div>
              </div>

              {/* Closed NCR & SI */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-medium text-red-700 uppercase tracking-wide">
                    Closed NCR & SI
                  </div>
                  <div className="w-8 h-8 bg-red-200 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="text-[28px] font-bold text-red-900 mb-1">2</div>
                <div className="text-[10px] text-red-600">
                  Total Closed / Total NCR &amp; SI: <span className="font-semibold">5/10</span>
                </div>
              </div>

              {/* Closed Comments */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-medium text-amber-700 uppercase tracking-wide">
                    Closed Comments
                  </div>
                  <div className="w-8 h-8 bg-amber-200 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                </div>
                <div className="text-[28px] font-bold text-amber-900 mb-1">10</div>
                <div className="text-[10px] text-amber-600">
                  Total Closed / Total Comments: <span className="font-semibold">20/64</span>
                </div>
              </div>

              {/* Total Working Hours */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-medium text-blue-700 uppercase tracking-wide">
                    Total Working Hours
                  </div>
                  <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="text-[28px] font-bold text-blue-900 mb-1">10,920</div>
                <div className="text-[10px] text-blue-600">During This Month</div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Project Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Project Details Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-slate-900">Project Name</h3>
                      <p className="text-[12px] text-slate-500">{project.company}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <p className="text-[13px] text-slate-600 leading-relaxed">
                      <span className="font-semibold">Description:</span> Enim ut solutá incidunt voluptás neque. Quo quod officia qui laborum minima quasi rerum. Velit adipisci debitis horum. Eius qui et et dolore non qui sint.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>Project Contractual Start Date:</span>
                      </div>
                      <div className="text-[13px] font-semibold text-slate-900">
                        {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>Project Contractual Completion Date:</span>
                      </div>
                      <div className="text-[13px] font-semibold text-slate-900">
                        {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                      <Clock className="w-3 h-3" />
                      <span>Remaining Days:</span>
                    </div>
                    <div className="text-[13px] font-semibold text-slate-900">881 Days</div>
                  </div>
                </div>

                {/* Companies Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="text-[15px] font-bold text-slate-900 mb-4">Companies</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[12px] font-semibold text-slate-900">Client</div>
                        <div className="text-[11px] text-slate-500">HVAC System Design</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[12px] font-semibold text-slate-900">Contractor</div>
                        <div className="text-[11px] text-slate-500">HVAC System Design</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[12px] font-semibold text-slate-900">Consultant</div>
                        <div className="text-[11px] text-slate-500">HVAC System Design</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Team */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-bold text-slate-900">Project Team</h3>
                    <button className="px-3 py-1.5 bg-[#ff5e3a] text-white rounded-md text-[11px] font-semibold hover:bg-[#e54d2a] transition-colors">
                      Add Your Team Members
                    </button>
                  </div>

                  <div>
                    <div className="text-[12px] font-semibold text-slate-700 mb-3">Team</div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <img
                          key={i}
                          src={`https://images.unsplash.com/photo-${1535713875002 + i}-d1d0cf7d7401?w=100`}
                          alt={`Team member ${i}`}
                          className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                      <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[11px] font-semibold text-slate-600 hover:bg-slate-200 transition-colors">
                        +5
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Charts */}
              <div className="lg:col-span-2 space-y-6">
                {/* Accumulative Report */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-[16px] font-bold text-slate-900 mb-1">Accumulative Report</h3>
                      <p className="text-[12px] text-slate-500">since project start</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-[#ff5e3a] text-white rounded-md text-[11px] font-semibold">
                        Submittal
                      </button>
                      <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-semibold hover:bg-slate-200 transition-colors">
                        Inspection
                      </button>
                    </div>
                  </div>

                  <div className="text-center py-12 text-slate-400">
                    <div className="text-[14px] font-medium">Chart visualization coming soon</div>
                    <div className="text-[12px] mt-1">Total Submittals: 2,113 • -67%</div>
                  </div>
                </div>

                {/* Latest Submittals */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[16px] font-bold text-slate-900">latest Submittals</h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="needMyAction"
                        className="w-4 h-4 text-[#ff5e3a] border-slate-300 rounded focus:ring-[#ff5e3a]"
                      />
                      <label htmlFor="needMyAction" className="text-[12px] text-slate-600">
                        Need My Action
                      </label>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead className="bg-slate-50 border-y border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700">Submittal Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700">Types</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700">Submittal ID</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700">Submission Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900">Licensed Metal Table</td>
                          <td className="px-4 py-3 text-slate-600">SAR</td>
                          <td className="px-4 py-3 text-slate-600 font-mono">4543111223</td>
                          <td className="px-4 py-3 text-slate-600">Thu, Jun 12, 2025</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900">Practical Fresh Keyboard</td>
                          <td className="px-4 py-3 text-slate-600">MAR</td>
                          <td className="px-4 py-3 text-slate-600 font-mono">34134143131</td>
                          <td className="px-4 py-3 text-slate-600">Sun, Jun 15, 2025</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900">Small Fresh Gloves</td>
                          <td className="px-4 py-3 text-slate-600">DAR</td>
                          <td className="px-4 py-3 text-slate-600 font-mono">53243553333</td>
                          <td className="px-4 py-3 text-slate-600">Wed, Jun 11, 2025</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900">Incredible Concrete Bike</td>
                          <td className="px-4 py-3 text-slate-600">DAS</td>
                          <td className="px-4 py-3 text-slate-600 font-mono">32233323134</td>
                          <td className="px-4 py-3 text-slate-600">Fri, Jun 6, 2025</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab !== 'overview' && (
          <>
            {/* SUBMITTALS KANBAN VIEW */}
            {activeTab === 'submittals' ? (
              <div className="h-full flex flex-col bg-[#f8fafc]">
                {/* Filters & Actions Bar */}
                <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
                  <button 
                    onClick={() => setShowCreateSubmittal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#ff5e3a] hover:bg-[#e54d2a] text-white rounded-lg text-[13px] font-semibold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Submittal
                  </button>

                  <select className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-[12px] font-medium border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>MAR</option>
                    <option>SAR</option>
                    <option>DAR</option>
                    <option>All Types</option>
                  </select>

                  <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]">
                    <option>Choose Trade</option>
                    <option>Electrical Works (EL)</option>
                    <option>Mechanical Works (ME)</option>
                    <option>Civil Works (CV)</option>
                    <option>Architectural (AR)</option>
                  </select>

                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-slate-600 cursor-pointer hover:bg-slate-100">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Submitted Date</span>
                  </div>

                  <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors ml-auto">
                    <input type="checkbox" className="w-4 h-4 text-[#ff5e3a] border-slate-300 rounded focus:ring-[#ff5e3a]" />
                    <span className="font-medium">Need My Action</span>
                  </label>

                  <button 
                    onClick={() => setViewMode('kanban')}
                    className={`px-3 py-2 ${viewMode === 'kanban' ? 'bg-[#ff5e3a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} rounded-lg text-[12px] font-semibold flex items-center gap-2 transition-colors`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    Kanban
                  </button>

                  <button 
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-[#ff5e3a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} rounded-lg text-[12px] font-semibold flex items-center gap-2 transition-colors`}
                  >
                    <List className="w-4 h-4" />
                    List
                  </button>
                </div>

                {/* Kanban Board or List View - Scrollable */}
                {viewMode === 'kanban' ? (
                  <div className="flex-1 overflow-x-auto overflow-y-hidden p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100">
                    <div className="flex gap-4 h-full min-w-max pb-4">
                      {[
                        { name: 'Drafts', count: 6, color: 'slate', items: [
                          { role: 'Contractor Engineer', roleColor: 'blue', submittals: [
                            { name: 'Fire Suppression System', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Ahmed bin Said', date: 'Jun 15, 2025' },
                            { name: 'HVAC Ductwork Layout', id: '12789329', trade: 'Mechanical Works (ME)', type: 'MAR', user: 'Ahmed bin Said', date: 'Jun 15, 2025' },
                          ]},
                          { role: 'Contractor Project Manager', roleColor: 'purple', submittals: [
                            { name: 'Steel Structural Beams', id: '12789330', trade: 'Civil Works (CV)', type: 'SAR', user: 'Fatima Al Mazrouei', date: 'Jun 14, 2025' },
                          ]},
                        ]},
                        { name: 'Internal Review', count: 4, color: 'blue', items: [
                          { role: 'Contractor Engineer', roleColor: 'blue', submittals: [
                            { name: 'animi justo ullam', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Ahmed bin Said', date: 'Jun 15, 2025' },
                            { name: 'aut in parlatur', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Ahmed bin Said', date: 'Jun 15, 2025' },
                          ]},
                          { role: 'Contractor Project Manager', roleColor: 'purple', submittals: [
                            { name: 'Fire Suppression System', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Abdullah Al Saadi', date: 'Jun 15, 2025' },
                          ]},
                        ]},
                        { name: 'Revised & Resubmitted', count: 4, color: 'amber', items: [
                          { role: 'Contractor Engineer', roleColor: 'blue', submittals: [
                            { name: 'Fire Suppression System', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Nasser Al Kaabi', date: 'Jun 15, 2025', revision: 2 },
                            { name: 'Fire Suppression System', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Abdullah Al Saadi', date: 'Jun 15, 2025', revision: 1 },
                            { name: 'Fire Suppression System', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Abdullah Al Saadi', date: 'Jun 15, 2025', revision: 3 },
                          ]},
                        ]},
                        { name: 'Pending Approval', count: 3, color: 'emerald', items: [
                          { role: 'Contractor Engineer', roleColor: 'blue', submittals: [
                            { name: 'Fire Suppression System', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Nasser Al Kaabi', date: 'Jun 15, 2025' },
                            { name: 'Fire Suppression System', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Abdullah Al Saadi', date: 'Jun 15, 2025' },
                            { name: 'Fire Suppression System', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Abdullah Al Saadi', date: 'Jun 15, 2025' },
                          ]},
                        ]},
                        { name: 'Approved', count: 8, color: 'green', items: [
                          { role: 'Mixed', roleColor: 'slate', submittals: [
                            { name: 'Concrete Mix Design', id: '12789320', trade: 'Civil Works (CV)', type: 'SAR', user: 'Mohammed Al Shamsi', date: 'Jun 10, 2025' },
                            { name: 'Lighting Fixtures', id: '12789321', trade: 'Electrical Works (EL)', type: 'MAR', user: 'Sarah Al Mansoori', date: 'Jun 12, 2025' },
                          ]},
                        ]},
                        { name: 'Rejected', count: 5, color: 'red', items: [
                          { role: 'Contractor Engineer', roleColor: 'blue', submittals: [
                            { name: 'Non-Compliant Materials', id: '12789322', trade: 'Civil Works (CV)', type: 'MAR', user: 'Khalid Al Dhaheri', date: 'Jun 8, 2025', revision: 2 },
                            { name: 'Incorrect Specifications', id: '12789323', trade: 'Mechanical Works (ME)', type: 'SAR', user: 'Omar Al Blooshi', date: 'Jun 9, 2025' },
                          ]},
                          { role: 'Contractor Project Manager', roleColor: 'purple', submittals: [
                            { name: 'Budget Overrun Request', id: '12789324', trade: 'Electrical Works (EL)', type: 'DAR', user: 'Amira Al Hashimi', date: 'Jun 7, 2025', revision: 1 },
                          ]},
                        ]},
                        { name: 'Cancelled', count: 3, color: 'slate', items: [
                          { role: 'Contractor Engineer', roleColor: 'blue', submittals: [
                            { name: 'Outdated Design System', id: '12789325', trade: 'Architectural Works (AR)', type: 'MAR', user: 'Hassan Al Muhairi', date: 'Jun 5, 2025' },
                          ]},
                          { role: 'Contractor Project Manager', roleColor: 'purple', submittals: [
                            { name: 'Replaced Equipment', id: '12789326', trade: 'Mechanical Works (ME)', type: 'SAR', user: 'Layla Al Qasimi', date: 'Jun 3, 2025' },
                          ]},
                        ]},
                      ].map((column, colIdx) => (
                        <div key={colIdx} className="w-[320px] flex flex-col bg-white rounded-lg border border-slate-200 shadow-sm flex-shrink-0">
                          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 bg-${column.color}-500 rounded-full`}></div>
                              <h3 className="text-[14px] font-bold text-slate-900">{column.name}</h3>
                              <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full text-[11px] font-semibold">{column.count}</span>
                            </div>
                          </div>

                          <div className="flex-1 overflow-y-auto p-3 space-y-3">
                            {column.items.map((group, grpIdx) => {
                              const groupKey = `${column.name}-${group.role}-${colIdx}-${grpIdx}`;
                              const isExpanded = expandedGroups[groupKey] !== false; // Default to expanded
                              const isApprovedColumn = column.name === 'Approved';
                              
                              return (
                              <div key={grpIdx} className="space-y-2">
                                <button 
                                  onClick={() => toggleGroup(groupKey)}
                                  className="flex items-center gap-2 text-[12px] font-semibold text-slate-700 hover:text-slate-900 w-full px-1 py-1 rounded hover:bg-slate-50 transition-colors"
                                >
                                  <div className={`w-2 h-2 bg-${group.roleColor}-500 rounded-full`}></div>
                                  <span>{group.role}</span>
                                  <svg 
                                    className={`w-3 h-3 ml-auto transition-transform ${isExpanded ? '' : '-rotate-90'}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>

                                {isExpanded && group.submittals.map((submittal, subIdx) => {
                                  const tradeColors = getTradeColor(submittal.trade);
                                  const approvalCode = subIdx % 2 === 0 ? 'A' : 'B';
                                  return (
                                  <div 
                                    key={subIdx} 
                                    className={`bg-gradient-to-br ${isApprovedColumn ? 'from-emerald-50 to-green-50' : 'from-white to-slate-50/30'} border ${isApprovedColumn ? 'border-emerald-300 border-l-[3px] border-l-emerald-500 ring-2 ring-emerald-100' : `border-slate-200 border-l-[3px] border-l-${group.roleColor}-500`} rounded-lg p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer group ${column.color === 'green' ? 'opacity-90' : ''}`}
                                    onClick={() => openSubmittalDetail(submittal)}
                                  >
                                    <div className="flex items-start gap-3 mb-3">
                                      <div className={`w-9 h-9 bg-gradient-to-br ${isApprovedColumn ? 'from-emerald-100 to-emerald-200 ring-2 ring-emerald-300' : `from-${group.roleColor}-50 to-${group.roleColor}-100`} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <svg className={`w-4 h-4 ${isApprovedColumn ? 'text-emerald-700' : `text-${group.roleColor}-600`}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          {column.name === 'Revised & Resubmitted' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                          ) : column.name === 'Approved' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                          ) : column.name === 'Pending Approval' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          )}
                                        </svg>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <h4 className="text-[13px] font-bold text-slate-900 line-clamp-2 group-hover:text-[#ff5e3a] transition-colors">
                                            {submittal.name}
                                          </h4>
                                          {submittal.revision && (
                                            <span className="px-1.5 py-0.5 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded text-[9px] font-bold">R{submittal.revision}</span>
                                          )}
                                        </div>
                                        <div className="text-[10px] font-mono text-slate-500">{submittal.id}</div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-3">
                                      <span className={`px-2.5 py-1 ${tradeColors.bg} ${tradeColors.text} rounded-md text-[10px] font-semibold`}>
                                        {submittal.trade}
                                      </span>
                                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[10px] font-semibold">
                                        {submittal.type}
                                      </span>
                                      {isApprovedColumn && (
                                        <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-md text-[10px] font-bold shadow-sm flex items-center gap-1">
                                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                          </svg>
                                          Code {approvalCode}
                                        </span>
                                      )}
                                    </div>

                                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                                      <div className="flex items-center gap-2">
                                        <img
                                          src={`https://images.unsplash.com/photo-${1472099645785 + subIdx + grpIdx}-5658abf4ff4e?w=100`}
                                          alt={submittal.user}
                                          className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                                        />
                                        <span className="text-[11px] text-slate-600 font-medium">{submittal.user}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                        <Calendar className="w-3 h-3" />
                                        <span>{submittal.date}</span>
                                      </div>
                                    </div>
                                  </div>
                                )})}
                              </div>
                            )})}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <SubmittalsListView 
                    expandedGroups={expandedStatusGroups}
                    onToggleGroup={toggleStatusGroup}
                    getTradeColor={getTradeColor}
                  />
                )}
              </div>
            ) : activeTab === 'packages' ? (
              <div className="h-full flex flex-col bg-[#f8fafc]">
                {/* Filters & Actions Bar */}
                <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#ff5e3a] hover:bg-[#e54d2a] text-white rounded-lg text-[13px] font-semibold transition-colors">
                    <Plus className="w-4 h-4" />
                    Create Package
                  </button>

                  <select className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-[12px] font-medium border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Statuses</option>
                    <option>BACKLOG</option>
                    <option>PICKED UP</option>
                    <option>IN PROGRESS</option>
                    <option>PROJECT FLOW</option>
                  </select>

                  <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]">
                    <option>Choose Owner</option>
                    <option>Mohamed Mazen Alhafees</option>
                    <option>Abdelrhman Aboayel</option>
                    <option>All Owners</option>
                  </select>

                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-slate-600 cursor-pointer hover:bg-slate-100">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Date Range</span>
                  </div>

                  <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors ml-auto">
                    <input type="checkbox" className="w-4 h-4 text-[#ff5e3a] border-slate-300 rounded focus:ring-[#ff5e3a]" />
                    <span className="font-medium">Show My Packages Only</span>
                  </label>

                  <button 
                    onClick={() => setViewMode('kanban')}
                    className={`px-3 py-2 ${viewMode === 'kanban' ? 'bg-[#ff5e3a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} rounded-lg text-[12px] font-semibold flex items-center gap-2 transition-colors`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    Kanban
                  </button>

                  <button 
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-[#ff5e3a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} rounded-lg text-[12px] font-semibold flex items-center gap-2 transition-colors`}
                  >
                    <List className="w-4 h-4" />
                    List
                  </button>
                </div>

                {/* Kanban Board or List View - Scrollable */}
                {viewMode === 'kanban' ? (
                  <PackagesKanbanView 
                    expandedPackages={expandedPackages}
                    onTogglePackage={togglePackage}
                  />
                ) : (
                  <PackagesListView 
                    expandedGroups={expandedPackageGroups}
                    onToggleGroup={togglePackageGroup}
                  />
                )}
              </div>
            ) : activeTab === 'daily-report' ? (
              <DailySiteReportListView
                onViewReport={(reportId) => navigate(`/projects/${projectId}/reports/${reportId}`)}
                onCreateReport={() => navigate(`/projects/${projectId}/reports/create`)}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-[18px] font-bold text-slate-900 mb-2">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </div>
                  <p className="text-[14px] text-slate-500">Content coming soon...</p>
                </div>
              </div>
            )}
          </>
        )}
        </div>
        
        {/* Submittal Detail Panel - In Push Mode */}
        {isSubmittalPanelOpen && panelMode === 'push' && (
          <SubmittalDetailPanel 
            isOpen={isSubmittalPanelOpen}
            submittal={selectedSubmittal}
            onClose={closeSubmittalDetail}
            mode={panelMode}
          />
        )}
        
        {/* Daily Site Report Detail Panel - In Push Mode */}
        {isReportDetailOpen && panelMode === 'push' && (
          <DailySiteReportDetail 
            isOpen={isReportDetailOpen}
            reportId={selectedReportId}
            onClose={() => setIsReportDetailOpen(false)}
            mode={panelMode}
          />
        )}
        
        {/* Create Daily Site Report Panel - In Push Mode */}
        {isCreateReportPanelOpen && panelMode === 'push' && (
          <CreateDailySiteReportPanel 
            isOpen={isCreateReportPanelOpen}
            onClose={() => setIsCreateReportPanelOpen(false)}
            mode={panelMode}
          />
        )}
        
        {/* Create Submittal Panel - In Push Mode */}
        {showCreateSubmittal && panelMode === 'push' && (
          <CreateSubmittalPanel 
            isOpen={showCreateSubmittal}
            onClose={() => setShowCreateSubmittal(false)}
            mode={panelMode}
          />
        )}
      </div>

      {/* Submittal Detail Panel - In Overlay Mode */}
      {panelMode === 'overlay' && (
        <SubmittalDetailPanel 
          isOpen={isSubmittalPanelOpen}
          submittal={selectedSubmittal}
          onClose={closeSubmittalDetail}
          mode={panelMode}
        />
      )}
      
      {/* Daily Site Report Detail Panel - In Overlay Mode */}
      {panelMode === 'overlay' && (
        <DailySiteReportDetail 
          isOpen={isReportDetailOpen}
          reportId={selectedReportId}
          onClose={() => setIsReportDetailOpen(false)}
          mode={panelMode}
        />
      )}
      
      {/* Create Daily Site Report Panel - In Overlay Mode */}
      {panelMode === 'overlay' && (
        <CreateDailySiteReportPanel 
          isOpen={isCreateReportPanelOpen}
          onClose={() => setIsCreateReportPanelOpen(false)}
          mode={panelMode}
        />
      )}
      
      {/* Create Submittal Panel - In Overlay Mode */}
      {panelMode === 'overlay' && (
        <CreateSubmittalPanel 
          isOpen={showCreateSubmittal}
          onClose={() => setShowCreateSubmittal(false)}
          mode={panelMode}
        />
      )}
    </div>
  );
}