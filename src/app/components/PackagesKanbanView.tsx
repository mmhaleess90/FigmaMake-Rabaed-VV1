import { Calendar, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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
}

interface StatusColumn {
  name: string;
  count: number;
  packages: Package[];
}

interface PackagesKanbanViewProps {
  expandedPackages: Record<string, boolean>;
  onTogglePackage: (packageKey: string) => void;
}

export function PackagesKanbanView({ expandedPackages, onTogglePackage }: PackagesKanbanViewProps) {
  const statusColumns: StatusColumn[] = [
    {
      name: 'BACKLOG',
      count: 2,
      packages: [
        {
          name: 'Fire Safety & Emergency Systems',
          owner: 'Ahmed bin Said',
          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          totalSubmittals: 12,
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
      packages: [
        {
          name: 'Electrical Distribution Systems',
          owner: 'Abdelrhman Aboayel',
          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          totalSubmittals: 15,
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
      packages: [
        {
          name: 'Structural Steel Works',
          owner: 'Khalid Al Dhaheri',
          ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          totalSubmittals: 6,
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
      packages: [
        {
          name: 'Façade & Cladding Systems',
          owner: 'Mohamed Mazen Alhafees',
          ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          totalSubmittals: 18,
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
      packages: [
        {
          name: 'Lighting & Controls Revision',
          owner: 'Sarah Al Mansoori',
          ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
          totalSubmittals: 5,
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
      packages: [
        {
          name: 'Elevators & Escalators',
          owner: 'Mohamed Mazen Alhafees',
          ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          totalSubmittals: 13,
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
      packages: []
    }
  ];

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex gap-4 h-full min-w-max pb-4">
        {statusColumns.map((column, colIdx) => (
          <div key={colIdx} className="w-[320px] flex flex-col bg-white rounded-lg border border-slate-200 shadow-sm flex-shrink-0">
            {/* Column Header */}
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{column.name}</h3>
                <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full text-[10px] font-semibold">{column.count}</span>
              </div>
            </div>

            {/* Column Content */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {column.packages.length === 0 ? (
                <div className="text-center py-8 text-[12px] text-slate-400">
                  No packages
                </div>
              ) : (
                column.packages.map((pkg, pkgIdx) => (
                  <div key={pkgIdx} className="bg-gradient-to-br from-white to-slate-50/30 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
                    {/* Package Content */}
                    <div className="p-3.5">
                      {/* Package Name */}
                      <div className="mb-3">
                        <h4 className="text-[13px] font-bold text-slate-900 leading-snug mb-1.5">{pkg.name}</h4>
                        <div className="text-[11px] text-slate-500">
                          {pkg.totalSubmittals} submittals total
                        </div>
                      </div>

                      {/* Submittal Counts by Type */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {pkg.submittalCounts.map((count, countIdx) => (
                          <div key={countIdx} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 border border-blue-200 rounded-md">
                            <span className="text-[10px] font-bold text-blue-700 uppercase">{count.type}</span>
                            <span className="text-[11px] font-semibold text-blue-900">{count.count}</span>
                          </div>
                        ))}
                      </div>

                      {/* Owner Info */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <img
                            src={pkg.ownerAvatar}
                            alt={pkg.owner}
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                          />
                          <span className="text-[11px] text-slate-600 font-medium truncate">{pkg.owner}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Add Create Button for BACKLOG column */}
              {column.name === 'BACKLOG' && (
                <button className="w-full px-3 py-2.5 border-2 border-dashed border-slate-300 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 transition-all flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}