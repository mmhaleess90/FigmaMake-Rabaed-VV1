import { useState } from 'react';
import { X, ChevronDown, ChevronUp, Upload, Plus, Search, Paperclip } from 'lucide-react';

interface CreateSubmittalPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSubmittalPanel({ isOpen, onClose }: CreateSubmittalPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    subject: true,
    scope: false,
    supplier: false,
    attachments: false,
    connection: false,
    related: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[800px] bg-white shadow-2xl z-50 flex flex-col animate-slideIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-[18px] font-bold text-white">Create New Submittal</h2>
            <p className="text-[12px] text-slate-300 mt-0.5">Fill in the details below to create a submittal</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-6 space-y-4">
            {/* SUBJECT Section */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('subject')}
                className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${
                  expandedSections.subject
                    ? 'bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="text-[14px] font-bold uppercase tracking-wide">SUBJECT</span>
                {expandedSections.subject ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {expandedSections.subject && (
                <div className="p-5 space-y-4">
                  {/* Subject */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter submittal subject"
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter detailed description..."
                      rows={4}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Alternative REF No. */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                      Alternative REF No.
                    </label>
                    <input
                      type="text"
                      placeholder="Enter reference number"
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* SCOPE Section */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('scope')}
                className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${
                  expandedSections.scope
                    ? 'bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="text-[14px] font-bold uppercase tracking-wide">SCOPE</span>
                {expandedSections.scope ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {expandedSections.scope && (
                <div className="p-5 space-y-4">
                  {/* Trade */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                      Trade <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent">
                      <option value="">Select trade...</option>
                      <option>Electrical Works (EL)</option>
                      <option>Mechanical Works (ME)</option>
                      <option>Civil Works (CV)</option>
                      <option>Architectural Works (AR)</option>
                      <option>Plumbing Works (PL)</option>
                      <option>HVAC Works (HVAC)</option>
                    </select>
                  </div>

                  {/* Scope Search */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                      Scope <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search or select scope..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Sub Scope Search */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                      Sub Scope
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search or select sub scope..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Add New Scope Button */}
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[12px] font-semibold transition-colors">
                    <Plus className="w-4 h-4" />
                    Add New Scope
                  </button>
                </div>
              )}
            </div>

            {/* SUPPLIER INFORMATION Section */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('supplier')}
                className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${
                  expandedSections.supplier
                    ? 'bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="text-[14px] font-bold uppercase tracking-wide">SUPPLIER INFORMATION</span>
                {expandedSections.supplier ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {expandedSections.supplier && (
                <div className="p-5 space-y-4">
                  {/* Supplier Type */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                      Supplier Type
                    </label>
                    <select className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent">
                      <option value="">Select supplier type...</option>
                      <option>Manufacturer</option>
                      <option>Distributor</option>
                      <option>Contractor</option>
                      <option>Consultant</option>
                    </select>
                  </div>

                  {/* Supplier Name */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                      Supplier Name
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search or enter supplier name..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Representative */}
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                        Representative
                      </label>
                      <input
                        type="text"
                        placeholder="Representative name"
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+971 XX XXX XXXX"
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        placeholder="www.example.com"
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-2">
                      Address
                    </label>
                    <textarea
                      placeholder="Enter full address..."
                      rows={3}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ATTACHMENTS Section */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('attachments')}
                className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${
                  expandedSections.attachments
                    ? 'bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="text-[14px] font-bold uppercase tracking-wide">ATTACHMENTS</span>
                {expandedSections.attachments ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {expandedSections.attachments && (
                <div className="p-5 space-y-4">
                  {/* Drag and Drop Zone */}
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-[#ff5e3a] hover:bg-orange-50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-[13px] font-semibold text-slate-700 mb-1">
                      Drag & drop files here, or click to browse
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)
                    </p>
                  </div>

                  {/* Add New File Button */}
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[12px] font-semibold transition-colors w-full justify-center">
                    <Paperclip className="w-4 h-4" />
                    Add New File
                  </button>

                  {/* File List (example) */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-900 truncate">sample-document.pdf</p>
                        <p className="text-[10px] text-slate-500">2.4 MB</p>
                      </div>
                      <button className="p-1.5 hover:bg-red-50 rounded transition-colors">
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* BUILD A CONNECTION Section */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('connection')}
                className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${
                  expandedSections.connection
                    ? 'bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="text-[14px] font-bold uppercase tracking-wide">BUILD A CONNECTION</span>
                {expandedSections.connection ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {expandedSections.connection && (
                <div className="p-5">
                  <p className="text-[12px] text-slate-600 mb-4">
                    Link this submittal to related packages, tasks, or other project items
                  </p>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[12px] font-semibold transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Connection
                  </button>
                </div>
              )}
            </div>

            {/* RELATED SUBMITTALS Section */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('related')}
                className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${
                  expandedSections.related
                    ? 'bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="text-[14px] font-bold uppercase tracking-wide">RELATED SUBMITTALS (Optional)</span>
                {expandedSections.related ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {expandedSections.related && (
                <div className="p-5">
                  <p className="text-[12px] text-slate-600 mb-4">
                    Link this submittal to other existing submittals in the project
                  </p>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search for related submittals..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[13px] font-semibold transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[13px] font-semibold transition-colors">
              Save as Draft
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-[#ff5e3a] to-[#e54d2a] hover:from-[#e54d2a] hover:to-[#d43c1a] text-white rounded-lg text-[13px] font-semibold transition-all shadow-sm">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
