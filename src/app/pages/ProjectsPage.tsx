import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Grid3x3, List, Plus, Calendar, Building2, FileText, TrendingUp, MapPin, Users, DollarSign, Clock, MoreVertical } from 'lucide-react';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [showAddProject, setShowAddProject] = useState(false);

  // Mock project data
  const projects = [
    {
      id: 'PRJ-2024-001',
      name: 'Dubai Marina Tower - Phase 2',
      company: 'Al Futtaim Construction Co.',
      startDate: '2024-01-15',
      endDate: '2024-12-20',
      status: 'In Progress',
      progress: 68,
      location: 'Dubai Marina, UAE',
      budget: 45000000,
      submitted: 142,
      team: 8,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      category: 'High-Rise',
    },
    {
      id: 'PRJ-2024-002',
      name: 'Sheikh Mohammed Highway Extension',
      company: 'Dutco Construction LLC',
      startDate: '2024-02-10',
      endDate: '2025-06-30',
      status: 'In Progress',
      progress: 42,
      location: 'Dubai, UAE',
      budget: 128000000,
      submitted: 89,
      team: 15,
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400',
      category: 'Infrastructure',
    },
    {
      id: 'PRJ-2023-048',
      name: 'Jumeirah Beach Resort Complex',
      company: 'Emaar Properties',
      startDate: '2023-08-20',
      endDate: '2024-08-15',
      status: 'Near Completion',
      progress: 94,
      location: 'Jumeirah, Dubai',
      budget: 82000000,
      submitted: 324,
      team: 12,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      category: 'Hospitality',
    },
    {
      id: 'PRJ-2024-003',
      name: 'Business Bay Office Tower',
      company: 'Belhasa Engineering',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      status: 'Planning',
      progress: 18,
      location: 'Business Bay, Dubai',
      budget: 67000000,
      submitted: 23,
      team: 5,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      category: 'Commercial',
    },
    {
      id: 'PRJ-2023-042',
      name: 'Sustainable Housing Community',
      company: 'Nakheel Development',
      startDate: '2023-11-10',
      endDate: '2024-11-30',
      status: 'In Progress',
      progress: 55,
      location: 'Dubai South',
      budget: 95000000,
      submitted: 178,
      team: 10,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
      category: 'Residential',
    },
    {
      id: 'PRJ-2024-004',
      name: 'Industrial Warehouse Complex',
      company: 'Khansaheb Civil Engineering',
      startDate: '2024-01-20',
      endDate: '2024-09-15',
      status: 'On Hold',
      progress: 32,
      location: 'Jebel Ali, Dubai',
      budget: 34000000,
      submitted: 67,
      team: 6,
      image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400',
      category: 'Industrial',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Near Completion': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Planning': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'On Hold': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Completed': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-emerald-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-full flex flex-col bg-[#f8fafc]">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-3 sm:gap-0">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-2">
              <span>Home</span>
              <span>/</span>
              <span className="text-slate-900 font-medium">Projects List</span>
            </div>
            
            <h1 className="text-[24px] sm:text-[28px] font-bold text-slate-900">
              Projects
            </h1>
            <p className="text-[13px] sm:text-[14px] text-slate-500 mt-1">
              {projects.length} active projects • Track progress, budgets, and timelines
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'card'
                    ? 'bg-white text-[#ff5e3a] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Card View"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#ff5e3a] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Add Project Button */}
            <button
              onClick={() => setShowAddProject(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#ff5e3a] hover:bg-[#e54d2a] text-white rounded-lg text-[13px] font-semibold transition-colors shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Project</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* CARD VIEW */}
          {viewMode === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="bg-white rounded-xl border border-slate-200 hover:border-[#ff5e3a] hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative h-[160px] sm:h-[180px] overflow-hidden bg-slate-100">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-md text-[10px] font-semibold text-slate-700">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-5">
                    {/* Project ID */}
                    <div className="text-[11px] font-mono text-slate-500 mb-2">
                      {project.id}
                    </div>

                    {/* Project Name */}
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-slate-900 mb-1 group-hover:text-[#ff5e3a] transition-colors line-clamp-2">
                      {project.name}
                    </h3>

                    {/* Company */}
                    <div className="flex items-center gap-1.5 text-[12px] text-slate-600 mb-4">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{project.company}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="text-slate-500 font-medium">Progress</span>
                        <span className="font-semibold text-slate-900">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getProgressColor(project.progress)} transition-all duration-300`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Project Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1">
                          <Calendar className="w-3 h-3" />
                          <span>Start Date</span>
                        </div>
                        <div className="text-[12px] font-semibold text-slate-900">
                          {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1">
                          <FileText className="w-3 h-3" />
                          <span>Submitted</span>
                        </div>
                        <div className="text-[12px] font-semibold text-slate-900">
                          {project.submitted}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row - Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium">{project.team}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium">${(project.budget / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>
                      <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {viewMode === 'list' && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {/* Table Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 grid grid-cols-12 gap-4 text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                <div className="col-span-3">Project</div>
                <div className="col-span-2">Company</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-1">Progress</div>
                <div className="col-span-1">Team</div>
                <div className="col-span-2">Budget</div>
                <div className="col-span-1">Status</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    {/* Project */}
                    <div className="col-span-3 flex items-center gap-3">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                      />
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-slate-900 truncate group-hover:text-[#ff5e3a] transition-colors">
                          {project.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">
                          {project.id}
                        </div>
                      </div>
                    </div>

                    {/* Company */}
                    <div className="col-span-2">
                      <div className="text-[12px] text-slate-700 truncate">
                        {project.company}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-1.5 text-[12px] text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-900 w-8 text-right">
                          {project.progress}%
                        </span>
                      </div>
                    </div>

                    {/* Team */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-1 text-[12px] text-slate-700">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium">{project.team}</span>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="col-span-2">
                      <div className="text-[13px] font-semibold text-slate-900">
                        ${(project.budget / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {project.submitted} submitted
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <span className={`inline-flex px-2.5 py-1 rounded-full border text-[10px] font-semibold whitespace-nowrap ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Project Modal - Simple placeholder */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddProject(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[20px] font-bold text-slate-900 mb-4">Add New Project</h2>
            <p className="text-[14px] text-slate-600 mb-6">Project creation form coming soon...</p>
            <button
              onClick={() => setShowAddProject(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[13px] font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}