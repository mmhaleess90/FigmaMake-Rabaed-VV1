import { ChevronRight } from 'lucide-react';

interface SubmittalCount {
  type: string;
  count: number;
}

interface Package {
  name: string;
  submittalCounts: SubmittalCount[];
  owner: string;
  ownerAvatar: string;
  totalSubmittals: number;
  status: string;
}

interface StatusGroup {
  name: string;
  count: number;
  bgColor: string;
  textColor: string;
  packages: Package[];
}

interface PackagesListViewProps {
  expandedGroups: Record<string, boolean>;
  onToggleGroup: (groupName: string) => void;
}

export function PackagesListView({ expandedGroups, onToggleGroup }: PackagesListViewProps) {
  const statusGroups: StatusGroup[] = [
    {
      name: 'BACKLOG',
      count: 2,
      bgColor: 'bg-slate-100',
      textColor: 'text-slate-700',
      packages: [
        {
          name: 'Fire Safety & Emergency Systems',
          owner: 'Ahmed bin Said',
          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          totalSubmittals: 12,
          status: 'BACKLOG',
          submittalCounts: [
            { type: 'MAR', count: 5 },
            { type: 'SAR', count: 4 },
            { type: 'WIR', count: 3 },
          ]
        },
        {
          name: 'HVAC Installation Package',
          owner: 'Fatima Al Mazrouei',
          ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
          totalSubmittals: 8,
          status: 'BACKLOG',
          submittalCounts: [
            { type: 'MAR', count: 3 },
            { type: 'DAR', count: 2 },
            { type: 'WIR', count: 3 },
          ]
        }
      ]
    },
    {
      name: 'PICKED UP',
      count: 2,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      packages: [
        {
          name: 'Electrical Distribution Systems',
          owner: 'Abdelrhman Aboayel',
          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          totalSubmittals: 15,
          status: 'PICKED UP',
          submittalCounts: [
            { type: 'MAR', count: 7 },
            { type: 'SAR', count: 5 },
            { type: 'DAR', count: 3 },
          ]
        },
        {
          name: 'Plumbing & Drainage Package',
          owner: 'Omar Abdullah',
          ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
          totalSubmittals: 10,
          status: 'PICKED UP',
          submittalCounts: [
            { type: 'WIR', count: 6 },
            { type: 'MAR', count: 4 },
          ]
        }
      ]
    },
    {
      name: 'NEED CLARIFICATION',
      count: 1,
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-700',
      packages: [
        {
          name: 'Structural Steel Works',
          owner: 'Khalid Al Dhaheri',
          ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          totalSubmittals: 6,
          status: 'NEED CLARIFICATION',
          submittalCounts: [
            { type: 'SAR', count: 4 },
            { type: 'DAR', count: 2 },
          ]
        }
      ]
    },
    {
      name: 'IN PROGRESS',
      count: 5,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700',
      packages: [
        {
          name: 'Façade & Cladding Systems',
          owner: 'Mohamed Mazen Alhafees',
          ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          totalSubmittals: 18,
          status: 'IN PROGRESS',
          submittalCounts: [
            { type: 'MAR', count: 8 },
            { type: 'SAR', count: 6 },
            { type: 'WIR', count: 4 },
          ]
        },
        {
          name: 'Interior Finishes Package',
          owner: 'Hassan Al Muhairi',
          ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
          totalSubmittals: 14,
          status: 'IN PROGRESS',
          submittalCounts: [
            { type: 'MAR', count: 9 },
            { type: 'DAR', count: 5 },
          ]
        },
        {
          name: 'MEP Coordination Package',
          owner: 'Abdelrhman Aboayel',
          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          totalSubmittals: 11,
          status: 'IN PROGRESS',
          submittalCounts: [
            { type: 'WIR', count: 5 },
            { type: 'MAR', count: 4 },
            { type: 'SAR', count: 2 },
          ]
        },
        {
          name: 'Waterproofing & Insulation',
          owner: 'Nasser Al Kaabi',
          ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          totalSubmittals: 7,
          status: 'IN PROGRESS',
          submittalCounts: [
            { type: 'SAR', count: 4 },
            { type: 'WIR', count: 3 },
          ]
        },
        {
          name: 'Foundation & Earthworks',
          owner: 'Abdullah Al Saadi',
          ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
          totalSubmittals: 9,
          status: 'IN PROGRESS',
          submittalCounts: [
            { type: 'MAR', count: 5 },
            { type: 'DAR', count: 4 },
          ]
        }
      ]
    },
    {
      name: 'RE-OPEN',
      count: 1,
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      packages: [
        {
          name: 'Lighting & Controls Revision',
          owner: 'Sarah Al Mansoori',
          ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
          totalSubmittals: 5,
          status: 'RE-OPEN',
          submittalCounts: [
            { type: 'MAR', count: 3 },
            { type: 'WIR', count: 2 },
          ]
        }
      ]
    },
    {
      name: 'PROJECT FLOW',
      count: 3,
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-700',
      packages: [
        {
          name: 'Elevators & Escalators',
          owner: 'Mohamed Mazen Alhafees',
          ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          totalSubmittals: 13,
          status: 'PROJECT FLOW',
          submittalCounts: [
            { type: 'MAR', count: 6 },
            { type: 'SAR', count: 4 },
            { type: 'WIR', count: 3 },
          ]
        },
        {
          name: 'BMS & Security Systems',
          owner: 'Omar Al Blooshi',
          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          totalSubmittals: 10,
          status: 'PROJECT FLOW',
          submittalCounts: [
            { type: 'MAR', count: 5 },
            { type: 'DAR', count: 3 },
            { type: 'SAR', count: 2 },
          ]
        },
        {
          name: 'Landscaping & External Works',
          owner: 'Layla Al Qasimi',
          ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
          totalSubmittals: 8,
          status: 'PROJECT FLOW',
          submittalCounts: [
            { type: 'WIR', count: 5 },
            { type: 'MAR', count: 3 },
          ]
        }
      ]
    },
    {
      name: 'WAITING REQUESTER CONFIRMATION',
      count: 0,
      bgColor: 'bg-slate-200',
      textColor: 'text-slate-700',
      packages: []
    }
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc]">
      <div className="min-w-[1400px]">
        {statusGroups.map((statusGroup, statusIdx) => {
          const isExpanded = expandedGroups[statusGroup.name] !== false;
          
          return (
            <div key={statusIdx} className="mb-1">
              {/* Status Group Header - Collapsible */}
              <button
                onClick={() => onToggleGroup(statusGroup.name)}
                className="w-full flex items-center gap-3 px-4 sm:px-6 py-2.5 bg-white border-b border-[#e2e8f0] hover:bg-slate-50 transition-colors"
              >
                <ChevronRight 
                  className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
                />
                
                <div className={`px-2.5 py-1 ${statusGroup.bgColor} ${statusGroup.textColor} rounded text-[11px] font-bold uppercase tracking-wide`}>
                  {statusGroup.name}
                </div>
                
                <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full text-[11px] font-semibold">
                  {statusGroup.count}
                </span>
              </button>

              {/* Table - Shows when expanded */}
              {isExpanded && statusGroup.packages.length > 0 && (
                <div className="bg-white">
                  {/* Table Header */}
                  <div className="sticky top-0 bg-[#f8fafc] border-b border-[#e2e8f0] flex text-[12px] font-semibold text-[#64748b] z-10">
                    <div className="w-[300px] px-4 py-3 border-r border-[#e2e8f0]">Package Name</div>
                    <div className="w-[200px] px-4 py-3 border-r border-[#e2e8f0]">Owner</div>
                    <div className="w-[120px] px-4 py-3 border-r border-[#e2e8f0]">Total</div>
                    <div className="w-[400px] px-4 py-3 border-r border-[#e2e8f0]">Submittal Counts by Type</div>
                    <div className="w-[180px] px-4 py-3 border-r border-[#e2e8f0]">Status</div>
                    <div className="w-[150px] px-4 py-3">Actions</div>
                  </div>

                  {/* Table Rows */}
                  {statusGroup.packages.map((pkg, pkgIdx) => {
                    return (
                      <div
                        key={pkgIdx}
                        className="flex text-[12px] border-b border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group"
                      >
                        <div className="w-[300px] px-4 py-3 font-bold text-[#334155]">
                          {pkg.name}
                        </div>
                        <div className="w-[200px] px-4 py-3 text-[#475569] flex items-center gap-2">
                          <img
                            src={pkg.ownerAvatar}
                            alt={pkg.owner}
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                          />
                          <span className="truncate">{pkg.owner}</span>
                        </div>
                        <div className="w-[120px] px-4 py-3 text-[#475569]">
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-[11px] font-semibold">
                            {pkg.totalSubmittals} items
                          </span>
                        </div>
                        <div className="w-[400px] px-4 py-3 text-[#475569]">
                          <div className="flex flex-wrap gap-2">
                            {pkg.submittalCounts.map((count, countIdx) => (
                              <div key={countIdx} className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-md">
                                <span className="text-[10px] font-bold text-blue-700 uppercase">{count.type}</span>
                                <span className="text-[11px] font-semibold text-blue-900">{count.count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="w-[180px] px-4 py-2.5">
                          <span className={`${statusGroup.bgColor} ${statusGroup.textColor} px-2 py-1 rounded text-[10px] font-bold uppercase tracking-[0.5px] inline-block`}>
                            {pkg.status}
                          </span>
                        </div>
                        <div className="w-[150px] px-4 py-3">
                          <button className="px-3 py-1.5 bg-[#ff5e3a] hover:bg-[#e54d2a] text-white rounded text-[11px] font-semibold transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Empty State */}
              {isExpanded && statusGroup.packages.length === 0 && (
                <div className="bg-white py-8 text-center border-b border-[#e2e8f0]">
                  <p className="text-[13px] text-slate-400">No packages in this status</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}