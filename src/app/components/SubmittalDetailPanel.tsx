import { X, Calendar, User, FileText, Paperclip, Tag, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface SubmittalDetail {
  id: string;
  name: string;
  trade: string;
  type: string;
  status: string;
  assignedTo: string;
  submissionDate: string;
  revision?: number;
  createdBy: string;
  createdDate: string;
}

interface AuditEntry {
  id: string;
  user: string;
  userAvatar: string;
  userRole: string;
  action: string;
  category: 'comment' | 'history' | 'worklog' | 'approval';
  details: string;
  timestamp: string;
  badge?: string;
  badgeColor?: string;
  fromStatus?: string;
  toStatus?: string;
}

interface SubmittalDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  submittal: SubmittalDetail | null;
  mode?: 'overlay' | 'push'; // Add mode prop
}

export function SubmittalDetailPanel({ isOpen, onClose, submittal, mode = 'overlay' }: SubmittalDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'chat' | 'communication'>('details');
  const [auditCategory, setAuditCategory] = useState<'all' | 'comments' | 'history' | 'worklog' | 'approvals'>('all');

  if (!isOpen || !submittal) return null;

  // Mock audit trail data
  const auditEntries: AuditEntry[] = [
    {
      id: '1',
      user: 'Hafiz Hamdan',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      userRole: 'Contractor ENG',
      action: 'Save as draft',
      category: 'history',
      details: 'changed status to Save as draft',
      timestamp: 'Sep 28, 2024 6:11 pm',
      badge: 'Save as draft',
      badgeColor: 'bg-amber-100 text-amber-700',
      fromStatus: 'Created',
      toStatus: 'Save as draft'
    },
    {
      id: '2',
      user: 'Hafiz Hamdan',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      userRole: 'Contractor ENG',
      action: 'Created',
      category: 'history',
      details: 'changed status from Save as draft to Internal Review',
      timestamp: 'Sep 28, 2024 6:15 pm',
      badge: 'Created',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      fromStatus: 'Save as draft',
      toStatus: 'Internal Review'
    },
    {
      id: '3',
      user: 'Ali Sonour',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      userRole: 'Contractor PM',
      action: 'Received',
      category: 'history',
      details: 'Assign to Ali',
      timestamp: 'Sep 28, 2024 6:15 pm',
      badge: 'Received',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: '4',
      user: 'Ali Sonour',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      userRole: 'Contractor PM',
      action: 'Submit',
      category: 'approval',
      details: 'changed status to Pending Approve',
      timestamp: 'Sep 28, 2024 6:15 pm',
      badge: 'Submit',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      fromStatus: 'Internal Review',
      toStatus: 'Pending Approve'
    },
    {
      id: '5',
      user: 'Ahmed bin Said',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      userRole: 'Consultant Engineer',
      action: 'Commented',
      category: 'comment',
      details: 'Please review the updated specifications for compliance',
      timestamp: 'Sep 28, 2024 6:20 pm'
    },
    {
      id: '6',
      user: 'Mohamed Al Shamsi',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      userRole: 'Client Representative',
      action: 'Work logged',
      category: 'worklog',
      details: 'Reviewed technical drawings - 2 hours',
      timestamp: 'Sep 28, 2024 7:30 pm'
    },
  ];

  const filteredAuditEntries = auditCategory === 'all' 
    ? auditEntries 
    : auditEntries.filter(entry => entry.category === auditCategory || 
        (auditCategory === 'approvals' && entry.category === 'approval'));

  const getTradeColor = (trade: string) => {
    if (trade.includes('Electrical')) return { bg: 'bg-blue-100', text: 'text-blue-700' };
    if (trade.includes('Mechanical')) return { bg: 'bg-emerald-100', text: 'text-emerald-700' };
    if (trade.includes('Civil')) return { bg: 'bg-amber-100', text: 'text-amber-700' };
    if (trade.includes('Architectural')) return { bg: 'bg-purple-100', text: 'text-purple-700' };
    return { bg: 'bg-slate-100', text: 'text-slate-700' };
  };

  const tradeColors = getTradeColor(submittal.trade);

  const auditCategories = [
    { id: 'all', label: 'All', count: auditEntries.length },
    { id: 'comments', label: 'Comments', count: auditEntries.filter(e => e.category === 'comment').length },
    { id: 'history', label: 'History', count: auditEntries.filter(e => e.category === 'history').length },
    { id: 'worklog', label: 'Work log', count: auditEntries.filter(e => e.category === 'worklog').length },
    { id: 'approvals', label: 'Approvals', count: auditEntries.filter(e => e.category === 'approval').length },
  ];

  return (
    <>
      {/* Backdrop - only show in overlay mode */}
      {mode === 'overlay' && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-out Panel */}
      <div className={`bg-white shadow-2xl flex flex-col ${
        mode === 'overlay' 
          ? 'fixed right-0 top-0 bottom-0 w-full max-w-[900px] z-50' 
          : 'w-full max-w-[55%] border-l-2 border-slate-300 h-full'
      }`}>
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-[18px] font-bold text-slate-900">{submittal.name}</h2>
                {submittal.revision && (
                  <span className="px-2 py-1 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded text-[10px] font-bold">
                    R{submittal.revision}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[12px] font-mono text-slate-500">{submittal.id}</span>
                <span className="text-[11px] text-slate-400">•</span>
                <span className="text-[11px] text-slate-500">Created by {submittal.createdBy} on {submittal.createdDate}</span>
              </div>
            </div>
          </div>

          <div className="px-3 py-1.5 bg-[#ff5e3a] text-white rounded-md text-[11px] font-semibold">
            Contractor Engineer
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-slate-200 px-6 flex gap-6 flex-shrink-0">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-1 py-3 text-[13px] font-semibold border-b-2 transition-colors relative ${
              activeTab === 'details'
                ? 'text-[#ff5e3a] border-[#ff5e3a]'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Submittal Details
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-1 py-3 text-[13px] font-semibold border-b-2 transition-colors relative ${
              activeTab === 'chat'
                ? 'text-[#ff5e3a] border-[#ff5e3a]'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Submittal Chat
            <span className="absolute -top-1 -right-3 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`px-1 py-3 text-[13px] font-semibold border-b-2 transition-colors relative ${
              activeTab === 'communication'
                ? 'text-[#ff5e3a] border-[#ff5e3a]'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Internal communication
            <span className="absolute -top-1 -right-3 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              1
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#f8fafc]">
          {activeTab === 'details' && (
            <div className="p-6 space-y-6">
              {/* Company Headers Row */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: 'Client', description: 'HVAC System Design', icon: '🏢', color: 'blue' },
                  { name: 'Contractor', description: 'HVAC System Design', icon: '🏗️', color: 'emerald' },
                  { name: 'Consultant', description: 'HVAC System Design', icon: '📋', color: 'purple' },
                  { name: 'Project', description: 'HVAC System Design', icon: '📁', color: 'slate' }
                ].map((company, idx) => (
                  <div key={idx} className="bg-white rounded-lg border border-slate-200 p-4 flex items-start gap-3">
                    <div className={`w-12 h-12 bg-${company.color}-100 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl`}>
                      {company.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-slate-900 mb-0.5">{company.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{company.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Submittal Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Submittal Information */}
                  <div className="bg-white rounded-lg border border-slate-200 p-5">
                    <h3 className="text-[14px] font-bold text-slate-900 mb-4">Submittal Info</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-[11px] text-slate-500 font-semibold mb-1.5 block">
                          Submittal Name
                        </label>
                        <div className="text-[13px] text-slate-900 font-semibold">{submittal.name}</div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-500 font-semibold mb-1.5 block">
                          Description
                        </label>
                        <div className="text-[13px] text-slate-700">
                          Cumque voluptas voluptatem et nobis.
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-500 font-semibold mb-2 block">
                          Scope 1
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-[10px] text-slate-500 mb-1">Trade</div>
                            <span className={`inline-block px-2.5 py-1 ${tradeColors.bg} ${tradeColors.text} rounded-md text-[11px] font-semibold`}>
                              EL. Electrical Works
                            </span>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-500 mb-1">Scope Name</div>
                            <div className="text-[12px] text-slate-900">AASS</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-500 mb-1">Sub scope</div>
                            <div className="text-[12px] text-slate-900">Test 1</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attachments */}
                  <div className="bg-white rounded-lg border border-slate-200 p-5">
                    <h3 className="text-[14px] font-bold text-slate-900 mb-3">Attachment</h3>
                    <div className="space-y-2">
                      {['Technical_Specs_v2.pdf', 'Installation_Drawings.dwg', 'Product_Catalog.pdf'].map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                              <Paperclip className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                              <div className="text-[12px] font-semibold text-slate-900">{file}</div>
                              <div className="text-[10px] text-slate-500">2.4 MB</div>
                            </div>
                          </div>
                          <button className="px-3 py-1.5 bg-[#ff5e3a] hover:bg-[#e54d2a] text-white rounded text-[11px] font-semibold transition-colors">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Linked Submittals */}
                  <div className="bg-white rounded-lg border border-slate-200 p-5">
                    <h3 className="text-[14px] font-bold text-slate-900 mb-3">Linked Submittals</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center">
                          <FileText className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[12px] font-semibold text-slate-900">Fire Suppression System</div>
                          <div className="text-[10px] text-slate-500 font-mono">12789328</div>
                        </div>
                        <div className="text-[10px] text-slate-500">Created on: 6/24/2025</div>
                      </div>
                    </div>
                  </div>

                  {/* Linked Tags */}
                  <div className="bg-white rounded-lg border border-slate-200 p-5">
                    <h3 className="text-[14px] font-bold text-slate-900 mb-3">Linked Tags</h3>
                    <div>
                      <div className="text-[11px] text-slate-500 font-semibold mb-2">Floor</div>
                      <div className="inline-flex items-center px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-[11px] font-semibold">
                        Floor 1
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Status & Approvals */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Status Card */}
                  <div className="bg-white rounded-lg border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[13px] font-bold text-slate-900">Status</h3>
                      {submittal.revision && (
                        <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]">
                          <option>Revision {submittal.revision}</option>
                          <option>Revision 0 (Original)</option>
                        </select>
                      )}
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 mb-4">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-[12px] font-semibold text-blue-900">Pending Approval</span>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 mb-2">Assign To:</h4>
                      <div>
                        <div className="text-[12px] font-semibold text-slate-900">Consultant</div>
                        <div className="text-[10px] text-slate-500">Company - Dabaed Company</div>
                      </div>
                    </div>
                  </div>

                  {/* Approvals Log - THE MOST IMPORTANT SECTION */}
                  <div className="bg-white rounded-lg border border-slate-200 p-5">
                    <h3 className="text-[13px] font-bold text-slate-900 mb-4">Approvals Log</h3>
                    
                    <div className="space-y-4">
                      {/* Approval Entry 1 */}
                      <div className="pb-4 border-b border-slate-100">
                        <div className="flex items-start gap-3 mb-2">
                          <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                            alt="Abdullah Al Saadi"
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-bold text-slate-900">Abdullah Al Saadi</div>
                            <div className="text-[10px] text-slate-500 mb-1">
                              Role: Contractor PM<br />
                              Company: TMC Constructions
                            </div>
                            <div className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">
                              Submitted
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 ml-13">
                          <Clock className="w-3 h-3" />
                          Act On: 19/06/2025 16:19
                        </div>
                      </div>

                      {/* Approval Entry 2 */}
                      <div className="pb-4 border-b border-slate-100">
                        <div className="flex items-start gap-3 mb-2">
                          <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
                            alt="Ali Sonour"
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-bold text-slate-900">Ali Sonour</div>
                            <div className="text-[10px] text-slate-500 mb-1">
                              Role: Contractor en<br />
                              Company: TMC Constructions
                            </div>
                            <div className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">
                              Created
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 ml-13">
                          <Clock className="w-3 h-3" />
                          Act On: 19/06/2025 16:19
                        </div>
                      </div>

                      {/* Approval Entry 3 */}
                      <div className="pb-4 border-b border-slate-100">
                        <div className="flex items-start gap-3 mb-2">
                          <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                            alt="Mohammed Al Shamsi"
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-bold text-slate-900">Mohammed Al Shamsi</div>
                            <div className="text-[10px] text-slate-500 mb-1">
                              Role: Consultant Engineer<br />
                              Company: Design Consultants LLC
                            </div>
                            <div className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">
                              Pending Approval
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 ml-13">
                          <Clock className="w-3 h-3" />
                          Waiting for action...
                        </div>
                      </div>

                      {/* Approval Entry 4 */}
                      <div>
                        <div className="flex items-start gap-3 mb-2">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                            alt="Sarah Al Mansoori"
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-bold text-slate-900">Sarah Al Mansoori</div>
                            <div className="text-[10px] text-slate-500 mb-1">
                              Role: Client Representative<br />
                              Company: Al Futtaim Group
                            </div>
                            <div className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">
                              Not Started
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 ml-13">
                          <Clock className="w-3 h-3" />
                          Waiting for previous approval...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="p-6">
              <div className="bg-white rounded-lg border border-slate-200 p-5 text-center">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-[14px] text-slate-500">Chat functionality coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="p-6">
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-slate-900">Internal Communication</h3>
                  {submittal.revision && (
                    <span className="text-[12px] text-slate-500">Revision {submittal.revision}</span>
                  )}
                </div>

                {/* Category Tabs */}
                <div className="px-5 py-2 border-b border-slate-200 flex gap-1">
                  {auditCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setAuditCategory(cat.id as any)}
                      className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors ${
                        auditCategory === cat.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cat.label}
                      {cat.count > 0 && (
                        <span className={`ml-1.5 ${auditCategory === cat.id ? 'text-blue-600' : 'text-slate-400'}`}>
                          ({cat.count})
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Audit Trail */}
                <div className="p-5 space-y-4 max-h-[600px] overflow-y-auto">
                  {/* Ticket Created */}
                  <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-slate-900 mb-1">Ticket Created</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {submittal.createdDate}
                      </div>
                    </div>
                  </div>

                  {/* Audit Entries */}
                  {filteredAuditEntries.map((entry, idx) => (
                    <div key={entry.id} className="flex items-start gap-3">
                      <img
                        src={entry.userAvatar}
                        alt={entry.user}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <div className="text-[13px] font-semibold text-slate-900">{entry.user}</div>
                            <div className="text-[11px] text-slate-500">{entry.userRole}</div>
                          </div>
                          {entry.badge && (
                            <span className={`px-2 py-0.5 ${entry.badgeColor} rounded text-[10px] font-semibold whitespace-nowrap`}>
                              {entry.badge}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-start gap-2 mb-1">
                          <div className="w-4 h-4 text-[#ff5e3a] flex-shrink-0 mt-0.5">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-[12px] text-slate-700">
                              <span className="font-semibold">Status Updated:</span>{' '}
                              {entry.fromStatus && entry.toStatus ? (
                                <>
                                  changed status from <span className="font-semibold">{entry.fromStatus}</span> to{' '}
                                  <span className="font-semibold">{entry.toStatus}</span>
                                </>
                              ) : (
                                entry.details
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {entry.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* End of Logs */}
                  <div className="flex items-start gap-3 pt-4">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-slate-900 mb-1">End of Logs</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Last Updated: {filteredAuditEntries[filteredAuditEntries.length - 1]?.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <button className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg text-[13px] font-semibold transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2 bg-[#ff5e3a] hover:bg-[#e54d2a] text-white rounded-lg text-[13px] font-semibold transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Choose Action
          </button>
        </div>
      </div>
    </>
  );
}