import { useState } from 'react';
import { Calendar, FileText, Users, Clock, Download, Eye, Edit, Filter, Search } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';

interface DailySiteReportListViewProps {
  onViewReport: (reportId: string) => void;
  onCreateReport: () => void;
}

export function DailySiteReportListView({ onViewReport, onCreateReport }: DailySiteReportListViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week' | 'month'>('week');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - would come from API
  const reports = [
    {
      id: 'DSR-2025-001',
      date: '2025-02-17',
      dayOfWeek: 'Monday',
      weather: { condition: 'Sunny', temp: '28°C', icon: '☀️' },
      reportedBy: 'Mohamed Al Shamsi',
      status: 'published',
      workProgress: 85,
      manpower: { total: 45, present: 42, absent: 3 },
      equipment: { total: 12, operational: 11, breakdown: 1 },
      safetyIncidents: 0,
      issuesReported: 2,
      photos: 15,
    },
    {
      id: 'DSR-2025-002',
      date: '2025-02-16',
      dayOfWeek: 'Sunday',
      weather: { condition: 'Partly Cloudy', temp: '26°C', icon: '⛅' },
      reportedBy: 'Ahmed Al Kaabi',
      status: 'published',
      workProgress: 78,
      manpower: { total: 45, present: 40, absent: 5 },
      equipment: { total: 12, operational: 12, breakdown: 0 },
      safetyIncidents: 0,
      issuesReported: 1,
      photos: 12,
    },
    {
      id: 'DSR-2025-003',
      date: '2025-02-15',
      dayOfWeek: 'Saturday',
      weather: { condition: 'Clear', temp: '30°C', icon: '☀️' },
      reportedBy: 'Khalid Al Mansoori',
      status: 'draft',
      workProgress: 92,
      manpower: { total: 45, present: 45, absent: 0 },
      equipment: { total: 12, operational: 11, breakdown: 1 },
      safetyIncidents: 1,
      issuesReported: 3,
      photos: 18,
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[11px] font-semibold">Published</span>;
    }
    return <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-md text-[11px] font-semibold">Draft</span>;
  };

  return (
    <div className="h-full flex flex-col bg-[#f8fafc]">
      {/* Stats Overview Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-[11px] text-blue-600 font-medium">Total Reports</div>
              <div className="text-[20px] font-bold text-blue-900">127</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
            <div className="w-10 h-10 bg-emerald-200 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-[11px] text-emerald-600 font-medium">Avg. Manpower</div>
              <div className="text-[20px] font-bold text-emerald-900">43</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-[11px] text-purple-600 font-medium">Avg. Progress</div>
              <div className="text-[20px] font-bold text-purple-900">85%</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
            <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <div className="text-[11px] text-red-600 font-medium">Safety Incidents</div>
              <div className="text-[20px] font-bold text-red-900">3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3 flex-wrap">
        <button 
          onClick={onCreateReport}
          className="flex items-center gap-2 px-4 py-2 bg-[#ff5e3a] hover:bg-[#e54d2a] text-white rounded-lg text-[13px] font-semibold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Report
        </button>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors ${
              selectedFilter === 'all' ? 'bg-[#ff5e3a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setSelectedFilter('today')}
            className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors ${
              selectedFilter === 'today' ? 'bg-[#ff5e3a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setSelectedFilter('week')}
            className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors ${
              selectedFilter === 'week' ? 'bg-[#ff5e3a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setSelectedFilter('month')}
            className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors ${
              selectedFilter === 'month' ? 'bg-[#ff5e3a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            This Month
          </button>
        </div>

        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] w-[250px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
          />
        </div>

        <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-[12px] font-semibold hover:bg-slate-200 transition-colors">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Reports List */}
      <div className="flex-1 overflow-y-auto p-6 flex gap-6">
        {/* Left Sidebar - Report Templates */}
        <div className="w-[280px] flex-shrink-0 space-y-3">
          <h3 className="text-[13px] font-bold text-slate-900 mb-4 px-2">Report Templates</h3>
          
          {/* Daily Site Report - Active */}
          <button className="w-full text-left px-4 py-4 bg-gradient-to-br from-[#ff5e3a] to-[#e54d2a] text-white rounded-xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold">Daily Site Report</div>
              </div>
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Track daily activities, manpower, equipment, and site progress
            </p>
          </button>

          {/* Compliance Report */}
          <button className="w-full text-left px-4 py-4 bg-white border-2 border-slate-200 rounded-xl hover:border-[#ff5e3a] hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg flex items-center justify-center border border-emerald-200">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#ff5e3a] transition-colors">Compliance Report</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Document regulatory compliance, inspections, and certifications
            </p>
          </button>

          {/* Insurance Report */}
          <button className="w-full text-left px-4 py-4 bg-white border-2 border-slate-200 rounded-xl hover:border-[#ff5e3a] hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#ff5e3a] transition-colors">Insurance Report</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Record incidents, claims, and insurance documentation
            </p>
          </button>

          {/* Safety Inspection Report */}
          <button className="w-full text-left px-4 py-4 bg-white border-2 border-slate-200 rounded-xl hover:border-[#ff5e3a] hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg flex items-center justify-center border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#ff5e3a] transition-colors">Safety Inspection</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Log safety inspections, hazards, and corrective actions
            </p>
          </button>

          {/* Quality Control Report */}
          <button className="w-full text-left px-4 py-4 bg-white border-2 border-slate-200 rounded-xl hover:border-[#ff5e3a] hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center border border-purple-200">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#ff5e3a] transition-colors">Quality Control</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Monitor quality checks, testing results, and non-conformances
            </p>
          </button>

          {/* Environmental Report */}
          <button className="w-full text-left px-4 py-4 bg-white border-2 border-slate-200 rounded-xl hover:border-[#ff5e3a] hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center border border-green-200">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#ff5e3a] transition-colors">Environmental</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Track environmental impact, waste management, and sustainability
            </p>
          </button>
        </div>

        {/* Right Content - Report Cards List */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Report Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-[15px] font-bold text-slate-900">{report.id}</h3>
                        {getStatusBadge(report.status)}
                      </div>
                      <div className="flex items-center gap-4 text-[12px] text-slate-600">
                        <span className="font-semibold">{report.dayOfWeek}, {new Date(report.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span className="text-[16px]">{report.weather.icon}</span>
                          {report.weather.condition} {report.weather.temp}
                        </span>
                        <span>•</span>
                        <span>Reported by <strong>{report.reportedBy}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {report.status === 'published' && (
                      <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-[12px] font-semibold hover:bg-slate-200 transition-colors">
                        <Download className="w-4 h-4" />
                        Export PDF
                      </button>
                    )}
                    <button
                      onClick={() => onViewReport(report.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-[#ff5e3a] text-white rounded-lg text-[12px] font-semibold hover:bg-[#e54d2a] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      {report.status === 'draft' ? 'Continue Editing' : 'View Report'}
                    </button>
                  </div>
                </div>

                {/* Report Summary Cards */}
                <div className="px-6 py-4">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {/* Work Progress */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                      <div className="text-[10px] text-purple-600 font-medium mb-1">Work Progress</div>
                      <div className="text-[20px] font-bold text-purple-900">{report.workProgress}%</div>
                    </div>

                    {/* Manpower */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                      <div className="text-[10px] text-blue-600 font-medium mb-1">Manpower</div>
                      <div className="text-[20px] font-bold text-blue-900">{report.manpower.present}/{report.manpower.total}</div>
                      <div className="text-[9px] text-blue-600">Present/Total</div>
                    </div>

                    {/* Equipment */}
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-3 border border-emerald-200">
                      <div className="text-[10px] text-emerald-600 font-medium mb-1">Equipment</div>
                      <div className="text-[20px] font-bold text-emerald-900">{report.equipment.operational}/{report.equipment.total}</div>
                      <div className="text-[9px] text-emerald-600">Operational</div>
                    </div>

                    {/* Safety */}
                    <div className={`bg-gradient-to-br rounded-lg p-3 border ${
                      report.safetyIncidents === 0 
                        ? 'from-green-50 to-green-100 border-green-200' 
                        : 'from-red-50 to-red-100 border-red-200'
                    }`}>
                      <div className={`text-[10px] font-medium mb-1 ${report.safetyIncidents === 0 ? 'text-green-600' : 'text-red-600'}`}>
                        Safety Incidents
                      </div>
                      <div className={`text-[20px] font-bold ${report.safetyIncidents === 0 ? 'text-green-900' : 'text-red-900'}`}>
                        {report.safetyIncidents}
                      </div>
                    </div>

                    {/* Issues */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 border border-amber-200">
                      <div className="text-[10px] text-amber-600 font-medium mb-1">Issues Reported</div>
                      <div className="text-[20px] font-bold text-amber-900">{report.issuesReported}</div>
                    </div>

                    {/* Photos */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200">
                      <div className="text-[10px] text-slate-600 font-medium mb-1">Photos Attached</div>
                      <div className="text-[20px] font-bold text-slate-900">{report.photos}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}