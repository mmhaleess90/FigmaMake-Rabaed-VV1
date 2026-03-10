import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Download, Calendar, Users, Wrench, AlertTriangle, Camera, MapPin, Clock } from 'lucide-react';

export default function DailySiteReportDetailPage() {
  const navigate = useNavigate();
  const { projectId, reportId } = useParams();

  // Mock data - would be fetched based on reportId
  const report = {
    id: 'DSR-2025-001',
    date: '2025-02-17',
    dayOfWeek: 'Monday',
    reportedBy: 'Mohamed Al Shamsi',
    projectName: 'Dubai Marina Tower - Phase 2',
    location: 'Dubai Marina, UAE',
    contractor: 'Al Futtaim Construction Co.',
    weather: {
      condition: 'Sunny',
      temperature: '28°C',
      icon: '☀️',
    },
    manpower: {
      total: 45,
      present: 42,
      absent: 3,
      categories: [
        { name: 'Engineers', count: 8 },
        { name: 'Technicians', count: 15 },
        { name: 'Laborers', count: 19 },
      ],
    },
    equipment: {
      total: 12,
      operational: 11,
      breakdown: 1,
      items: [
        { name: 'Concrete Mixer', status: 'operational' },
        { name: 'Tower Crane', status: 'operational' },
        { name: 'Excavator', status: 'breakdown' },
      ],
    },
    workProgress: {
      overall: 85,
      completed: 'Concrete pouring for Floor 3 completed\nSteel beam installation for Floor 4 finished\nElectrical conduit installation in progress',
      inProgress: 'MEP rough-in works ongoing\nFacade installation continuing\nWaterproofing works in basement',
    },
    safety: {
      incidents: 0,
      inspections: 3,
      violations: 0,
    },
    issues: [
      { id: 1, description: 'Delay in material delivery for HVAC units', severity: 'medium' },
      { id: 2, description: 'Weather forecast shows rain expected tomorrow', severity: 'low' },
    ],
    notes: 'Overall good progress maintained. All safety protocols followed. Team morale is high.',
    photos: [
      { id: 1, caption: 'Floor 3 concrete work completed', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400' },
      { id: 2, caption: 'Steel beam installation progress', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400' },
      { id: 3, caption: 'MEP installation overview', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400' },
    ],
    createdAt: '2025-02-17T18:30:00',
    publishedAt: '2025-02-17T19:00:00',
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header - Professional Report Title */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6">
        {/* Back Button Row */}
        <div className="mb-4">
          <button
            onClick={() => navigate(`/projects/${projectId}?tab=daily-report`)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-[13px] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports
          </button>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#ff5e3a] rounded-lg flex items-center justify-center">
                <span className="text-white text-[18px] font-bold">N</span>
              </div>
              <div>
                <h1 className="text-[24px] font-bold text-white">Daily Site Report</h1>
                <p className="text-[13px] text-slate-300">{report.projectName}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-[12px] text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {report.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {report.dayOfWeek}, {new Date(report.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Report ID: {report.id}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-900 rounded-lg text-[13px] font-semibold hover:bg-slate-100 transition-colors shadow-lg">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Report Body */}
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Key Metrics Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-[10px] font-semibold text-blue-600 uppercase">Manpower</span>
            </div>
            <div className="text-[28px] font-bold text-blue-900 mb-1">
              {report.manpower.present}/{report.manpower.total}
            </div>
            <div className="text-[11px] text-blue-700">
              {Math.round((report.manpower.present / report.manpower.total) * 100)}% Attendance
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <Wrench className="w-8 h-8 text-emerald-600" />
              <span className="text-[10px] font-semibold text-emerald-600 uppercase">Equipment</span>
            </div>
            <div className="text-[28px] font-bold text-emerald-900 mb-1">
              {report.equipment.operational}/{report.equipment.total}
            </div>
            <div className="text-[11px] text-emerald-700">
              {Math.round((report.equipment.operational / report.equipment.total) * 100)}% Operational
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-600" />
              <span className="text-[10px] font-semibold text-purple-600 uppercase">Progress</span>
            </div>
            <div className="text-[28px] font-bold text-purple-900 mb-1">
              {report.workProgress.overall}%
            </div>
            <div className="text-[11px] text-purple-700">
              Overall Completion
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-green-600" />
              <span className="text-[10px] font-semibold text-green-600 uppercase">Safety</span>
            </div>
            <div className="text-[28px] font-bold text-green-900 mb-1">
              {report.safety.incidents}
            </div>
            <div className="text-[11px] text-green-700">
              Zero Incidents Today
            </div>
          </div>
        </div>

        {/* Report Information Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* General Information */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
              <h3 className="text-[14px] font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#ff5e3a] rounded"></div>
                General Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-600">Reported By:</span>
                  <span className="text-[12px] font-semibold text-slate-900">{report.reportedBy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-600">Contractor:</span>
                  <span className="text-[12px] font-semibold text-slate-900">{report.contractor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-600">Weather:</span>
                  <span className="text-[12px] font-semibold text-slate-900 flex items-center gap-1">
                    <span className="text-[16px]">{report.weather.icon}</span>
                    {report.weather.condition}, {report.weather.temperature}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-slate-600">Report Created:</span>
                  <span className="text-[12px] font-semibold text-slate-900">
                    {new Date(report.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Manpower Breakdown */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
              <h3 className="text-[14px] font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-blue-500 rounded"></div>
                Manpower Breakdown
              </h3>
              <div className="space-y-3">
                {report.manpower.categories.map((category, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-[12px] text-slate-700">{category.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(category.count / report.manpower.present) * 100}%` }}
                        />
                      </div>
                      <span className="text-[12px] font-semibold text-slate-900 w-8 text-right">{category.count}</span>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-slate-900">Total Present</span>
                  <span className="text-[14px] font-bold text-blue-600">{report.manpower.present}</span>
                </div>
              </div>
            </div>

            {/* Equipment Status */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
              <h3 className="text-[14px] font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-emerald-500 rounded"></div>
                Equipment Status
              </h3>
              <div className="space-y-2">
                {report.equipment.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-[12px] text-slate-700">{item.name}</span>
                    <span className={`px-2 py-1 rounded text-[10px] font-semibold ${
                      item.status === 'operational'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'operational' ? '✓ Operational' : '✗ Breakdown'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Work Progress */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
              <h3 className="text-[14px] font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-purple-500 rounded"></div>
                Work Progress Summary
              </h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-slate-600">Overall Progress</span>
                  <span className="text-[16px] font-bold text-purple-600">{report.workProgress.overall}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                    style={{ width: `${report.workProgress.overall}%` }}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] font-semibold text-slate-700 mb-2">✓ Completed Today:</div>
                  <div className="text-[12px] text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded border border-slate-200">
                    {report.workProgress.completed}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-700 mb-2">⟳ In Progress:</div>
                  <div className="text-[12px] text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded border border-slate-200">
                    {report.workProgress.inProgress}
                  </div>
                </div>
              </div>
            </div>

            {/* Safety & Issues */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
              <h3 className="text-[14px] font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-red-500 rounded"></div>
                Safety & Issues
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                  <span className="text-[12px] text-green-700 font-medium">Safety Incidents</span>
                  <span className="text-[16px] font-bold text-green-900">{report.safety.incidents}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                  <span className="text-[12px] text-blue-700 font-medium">Safety Inspections</span>
                  <span className="text-[16px] font-bold text-blue-900">{report.safety.inspections}</span>
                </div>
              </div>
              {report.issues.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-slate-700 mb-2">Issues Reported:</div>
                  <div className="space-y-2">
                    {report.issues.map((issue) => (
                      <div key={issue.id} className="p-3 bg-amber-50 rounded border border-amber-200">
                        <div className="flex items-start gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            issue.severity === 'high' ? 'bg-red-200 text-red-700' :
                            issue.severity === 'medium' ? 'bg-amber-200 text-amber-700' :
                            'bg-blue-200 text-blue-700'
                          }`}>
                            {issue.severity.toUpperCase()}
                          </span>
                          <p className="text-[12px] text-slate-700 flex-1">{issue.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
              <h3 className="text-[14px] font-bold text-slate-900 mb-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-slate-500 rounded"></div>
                Additional Notes
              </h3>
              <p className="text-[12px] text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                {report.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Site Photos */}
        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
          <h3 className="text-[14px] font-bold text-slate-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-[#ff5e3a] rounded"></div>
            <Camera className="w-5 h-5" />
            Site Photos ({report.photos.length})
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {report.photos.map((photo) => (
              <div key={photo.id} className="group relative">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-48 object-cover rounded-lg border border-slate-200"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-3">
                  <p className="text-[11px] text-white font-medium">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            This report was generated by the Numurus Construction Management Platform
          </div>
          <div className="text-[11px] text-slate-500">
            Published: {new Date(report.publishedAt).toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}