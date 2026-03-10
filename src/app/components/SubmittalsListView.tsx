import { Calendar } from 'lucide-react';

interface Submittal {
  name: string;
  id: string;
  trade: string;
  type: string;
  assignedTo: string;
  submissionDate: string;
  status: string;
  revision?: number;
}

interface StatusGroup {
  name: string;
  count: number;
  bgColor: string;
  textColor: string;
  submittals: Submittal[];
}

interface SubmittalsListViewProps {
  expandedGroups: Record<string, boolean>;
  onToggleGroup: (groupName: string) => void;
  getTradeColor: (trade: string) => { bg: string; text: string };
}

export function SubmittalsListView({ expandedGroups, onToggleGroup, getTradeColor }: SubmittalsListViewProps) {
  const statusGroups: StatusGroup[] = [
    { name: 'Drafts', count: 6, bgColor: 'bg-slate-100', textColor: 'text-slate-700', submittals: [
      { name: 'Fire Suppression System', id: '12789328', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Ahmed bin Said', submissionDate: 'Jun 15, 2025', status: 'Draft' },
      { name: 'HVAC Ductwork Layout', id: '12789329', trade: 'Mechanical Works (ME)', type: 'MAR', assignedTo: 'Ahmed bin Said', submissionDate: 'Jun 15, 2025', status: 'Draft' },
      { name: 'Steel Structural Beams', id: '12789330', trade: 'Civil Works (CV)', type: 'SAR', assignedTo: 'Fatima Al Mazrouei', submissionDate: 'Jun 14, 2025', status: 'Draft' },
      { name: 'Window Frame Specifications', id: '12789341', trade: 'Architectural Works (AR)', type: 'MAR', assignedTo: 'Hassan Al Muhairi', submissionDate: 'Jun 13, 2025', status: 'Draft' },
      { name: 'Plumbing Fixtures', id: '12789342', trade: 'Mechanical Works (ME)', type: 'SAR', assignedTo: 'Omar Abdullah', submissionDate: 'Jun 12, 2025', status: 'Draft' },
      { name: 'Foundation Reinforcement', id: '12789343', trade: 'Civil Works (CV)', type: 'MAR', assignedTo: 'Khalid Al Dhaheri', submissionDate: 'Jun 11, 2025', status: 'Draft' },
    ]},
    { name: 'Internal Review', count: 4, bgColor: 'bg-blue-100', textColor: 'text-blue-700', submittals: [
      { name: 'animi justo ullam', id: '12789331', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Ahmed bin Said', submissionDate: 'Jun 15, 2025', status: 'Internal Review' },
      { name: 'aut in parlatur', id: '12789332', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Ahmed bin Said', submissionDate: 'Jun 15, 2025', status: 'Internal Review' },
      { name: 'Fire Suppression System', id: '12789333', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Abdullah Al Saadi', submissionDate: 'Jun 15, 2025', status: 'Internal Review' },
      { name: 'Cable Tray System', id: '12789344', trade: 'Electrical Works (EL)', type: 'SAR', assignedTo: 'Mohammed Al Shamsi', submissionDate: 'Jun 14, 2025', status: 'Internal Review' },
    ]},
    { name: 'Revised & Resubmitted', count: 4, bgColor: 'bg-amber-100', textColor: 'text-amber-700', submittals: [
      { name: 'Fire Suppression System', id: '12789334', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Nasser Al Kaabi', submissionDate: 'Jun 15, 2025', status: 'Revised', revision: 2 },
      { name: 'Fire Suppression System', id: '12789335', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Abdullah Al Saadi', submissionDate: 'Jun 15, 2025', status: 'Revised', revision: 1 },
      { name: 'Fire Suppression System', id: '12789336', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Abdullah Al Saadi', submissionDate: 'Jun 15, 2025', status: 'Revised', revision: 3 },
      { name: 'Structural Drawing Updates', id: '12789345', trade: 'Civil Works (CV)', type: 'SAR', assignedTo: 'Fatima Al Mazrouei', submissionDate: 'Jun 13, 2025', status: 'Revised', revision: 1 },
    ]},
    { name: 'Pending Approval', count: 3, bgColor: 'bg-emerald-100', textColor: 'text-emerald-700', submittals: [
      { name: 'Fire Suppression System', id: '12789337', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Nasser Al Kaabi', submissionDate: 'Jun 15, 2025', status: 'Pending Approval' },
      { name: 'Fire Suppression System', id: '12789338', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Abdullah Al Saadi', submissionDate: 'Jun 15, 2025', status: 'Pending Approval' },
      { name: 'Fire Suppression System', id: '12789339', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Abdullah Al Saadi', submissionDate: 'Jun 15, 2025', status: 'Pending Approval' },
    ]},
    { name: 'Approved', count: 8, bgColor: 'bg-green-100', textColor: 'text-green-700', submittals: [
      { name: 'Concrete Mix Design', id: '12789320', trade: 'Civil Works (CV)', type: 'SAR', assignedTo: 'Mohammed Al Shamsi', submissionDate: 'Jun 10, 2025', status: 'Approved' },
      { name: 'Lighting Fixtures', id: '12789321', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Sarah Al Mansoori', submissionDate: 'Jun 12, 2025', status: 'Approved' },
      { name: 'Plumbing System Layout', id: '12789340', trade: 'Mechanical Works (ME)', type: 'MAR', assignedTo: 'Omar Abdullah', submissionDate: 'Jun 11, 2025', status: 'Approved' },
      { name: 'Elevator Specifications', id: '12789346', trade: 'Mechanical Works (ME)', type: 'SAR', assignedTo: 'Ahmed bin Said', submissionDate: 'Jun 9, 2025', status: 'Approved' },
      { name: 'Glass Curtain Wall', id: '12789347', trade: 'Architectural Works (AR)', type: 'MAR', assignedTo: 'Hassan Al Muhairi', submissionDate: 'Jun 8, 2025', status: 'Approved' },
      { name: 'Roofing Waterproofing', id: '12789348', trade: 'Civil Works (CV)', type: 'SAR', assignedTo: 'Khalid Al Dhaheri', submissionDate: 'Jun 7, 2025', status: 'Approved' },
      { name: 'Emergency Lighting', id: '12789349', trade: 'Electrical Works (EL)', type: 'MAR', assignedTo: 'Nasser Al Kaabi', submissionDate: 'Jun 6, 2025', status: 'Approved' },
      { name: 'HVAC Controls', id: '12789350', trade: 'Mechanical Works (ME)', type: 'SAR', assignedTo: 'Omar Al Blooshi', submissionDate: 'Jun 5, 2025', status: 'Approved' },
    ]},
    { name: 'Rejected', count: 5, bgColor: 'bg-red-100', textColor: 'text-red-700', submittals: [
      { name: 'Non-Compliant Materials', id: '12789322', trade: 'Civil Works (CV)', type: 'MAR', assignedTo: 'Khalid Al Dhaheri', submissionDate: 'Jun 8, 2025', status: 'Rejected', revision: 2 },
      { name: 'Incorrect Specifications', id: '12789323', trade: 'Mechanical Works (ME)', type: 'SAR', assignedTo: 'Omar Al Blooshi', submissionDate: 'Jun 9, 2025', status: 'Rejected' },
      { name: 'Budget Overrun Request', id: '12789324', trade: 'Electrical Works (EL)', type: 'DAR', assignedTo: 'Amira Al Hashimi', submissionDate: 'Jun 7, 2025', status: 'Rejected', revision: 1 },
      { name: 'Substandard Paint Finish', id: '12789351', trade: 'Architectural Works (AR)', type: 'MAR', assignedTo: 'Hassan Al Muhairi', submissionDate: 'Jun 6, 2025', status: 'Rejected' },
      { name: 'Incompatible Pipe Fittings', id: '12789352', trade: 'Mechanical Works (ME)', type: 'SAR', assignedTo: 'Omar Abdullah', submissionDate: 'Jun 4, 2025', status: 'Rejected', revision: 1 },
    ]},
    { name: 'Cancelled', count: 3, bgColor: 'bg-slate-200', textColor: 'text-slate-700', submittals: [
      { name: 'Outdated Design System', id: '12789325', trade: 'Architectural Works (AR)', type: 'MAR', assignedTo: 'Hassan Al Muhairi', submissionDate: 'Jun 5, 2025', status: 'Cancelled' },
      { name: 'Replaced Equipment', id: '12789326', trade: 'Mechanical Works (ME)', type: 'SAR', assignedTo: 'Layla Al Qasimi', submissionDate: 'Jun 3, 2025', status: 'Cancelled' },
      { name: 'Alternative Design Selected', id: '12789353', trade: 'Civil Works (CV)', type: 'MAR', assignedTo: 'Fatima Al Mazrouei', submissionDate: 'Jun 2, 2025', status: 'Cancelled' },
    ]},
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
                <svg 
                  className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                
                <div className={`px-2.5 py-1 ${statusGroup.bgColor} ${statusGroup.textColor} rounded text-[11px] font-bold uppercase tracking-wide`}>
                  {statusGroup.name}
                </div>
                
                <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full text-[11px] font-semibold">
                  {statusGroup.count}
                </span>
              </button>

              {/* Table - Shows when expanded */}
              {isExpanded && (
                <div className="bg-white">
                  {/* Table Header */}
                  <div className="sticky top-0 bg-[#f8fafc] border-b border-[#e2e8f0] flex text-[12px] font-semibold text-[#64748b] z-10">
                    <div className="w-[250px] px-4 py-3 border-r border-[#e2e8f0]">Submittal Name</div>
                    <div className="w-[200px] px-4 py-3 border-r border-[#e2e8f0]">Trade</div>
                    <div className="w-[100px] px-4 py-3 border-r border-[#e2e8f0]">Type</div>
                    <div className="w-[150px] px-4 py-3 border-r border-[#e2e8f0]">Submittal ID</div>
                    <div className="w-[200px] px-4 py-3 border-r border-[#e2e8f0]">Assigned To</div>
                    <div className="w-[150px] px-4 py-3 border-r border-[#e2e8f0]">Submission Date</div>
                    <div className="w-[150px] px-4 py-3">Status</div>
                  </div>

                  {/* Table Rows */}
                  {statusGroup.submittals.map((submittal, subIdx) => {
                    const tradeColors = getTradeColor(submittal.trade);
                    
                    return (
                      <div
                        key={subIdx}
                        className="flex text-[12px] border-b border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group"
                      >
                        <div className="w-[250px] px-4 py-3 font-medium text-[#334155] flex items-center gap-2">
                          {submittal.name}
                          {submittal.revision && (
                            <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[9px] font-bold">
                              R{submittal.revision}
                            </span>
                          )}
                        </div>
                        <div className="w-[200px] px-4 py-2.5">
                          <span className={`${tradeColors.bg} ${tradeColors.text} px-2 py-1 rounded text-[10px] font-semibold inline-block`}>
                            {submittal.trade}
                          </span>
                        </div>
                        <div className="w-[100px] px-4 py-2.5">
                          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-semibold inline-block">
                            {submittal.type}
                          </span>
                        </div>
                        <div className="w-[150px] px-4 py-3 font-mono text-[#64748b]">{submittal.id}</div>
                        <div className="w-[200px] px-4 py-3 text-[#475569] flex items-center gap-2">
                          <img
                            src={`https://images.unsplash.com/photo-${1472099645785 + subIdx}-5658abf4ff4e?w=100`}
                            alt={submittal.assignedTo}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span>{submittal.assignedTo}</span>
                        </div>
                        <div className="w-[150px] px-4 py-3 text-[#475569]">{submittal.submissionDate}</div>
                        <div className="w-[150px] px-4 py-2.5">
                          <span className={`${statusGroup.bgColor} ${statusGroup.textColor} px-2 py-1 rounded text-[10px] font-bold uppercase tracking-[0.5px] inline-block`}>
                            {submittal.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
