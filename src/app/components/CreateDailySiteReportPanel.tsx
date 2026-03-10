import { useState } from 'react';
import { X, Calendar, Users, Wrench, AlertTriangle, FileText, Camera, CheckCircle, Clock } from 'lucide-react';

interface CreateDailySiteReportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (report: any) => void;
}

export function CreateDailySiteReportPanel({ isOpen, onClose, onSave }: CreateDailySiteReportPanelProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    date: new Date().toISOString().split('T')[0],
    reportedBy: 'Mohamed Al Shamsi',
    weather: 'sunny',
    temperature: '28',
    
    // Step 2: Manpower
    manpowerTotal: '45',
    manpowerPresent: '42',
    manpowerAbsent: '3',
    
    // Step 3: Equipment
    equipmentTotal: '12',
    equipmentOperational: '11',
    equipmentBreakdown: '1',
    
    // Step 4: Work Progress
    workProgress: '85',
    activitiesCompleted: '',
    activitiesInProgress: '',
    
    // Step 5: Safety & Issues
    safetyIncidents: '0',
    issuesReported: '',
    
    // Step 6: Notes & Photos
    additionalNotes: '',
    photos: [],
  });

  const steps = [
    { number: 1, title: 'Basic Info', icon: Calendar },
    { number: 2, title: 'Manpower', icon: Users },
    { number: 3, title: 'Equipment', icon: Wrench },
    { number: 4, title: 'Work Progress', icon: Clock },
    { number: 5, title: 'Safety & Issues', icon: AlertTriangle },
    { number: 6, title: 'Notes & Photos', icon: Camera },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (isDraft: boolean) => {
    onSave({ ...formData, status: isDraft ? 'draft' : 'published' });
  };

  const weatherOptions = [
    { value: 'sunny', label: 'Sunny', icon: '☀️' },
    { value: 'partly-cloudy', label: 'Partly Cloudy', icon: '⛅' },
    { value: 'cloudy', label: 'Cloudy', icon: '☁️' },
    { value: 'rainy', label: 'Rainy', icon: '🌧️' },
    { value: 'stormy', label: 'Stormy', icon: '⛈️' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[900px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-[18px] font-bold text-slate-900">Create Daily Site Report</h2>
            <p className="text-[12px] text-slate-500 mt-0.5">
              {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isActive
                          ? 'bg-[#ff5e3a] text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div className={`text-[11px] font-semibold mt-2 text-center ${
                      isActive ? 'text-[#ff5e3a]' : isCompleted ? 'text-emerald-600' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all ${
                      isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Report Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Reported By *
                </label>
                <input
                  type="text"
                  value={formData.reportedBy}
                  onChange={(e) => handleInputChange('reportedBy', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-3">
                  Weather Conditions *
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {weatherOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange('weather', option.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.weather === option.value
                          ? 'border-[#ff5e3a] bg-orange-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[32px] mb-2">{option.icon}</div>
                      <div className="text-[11px] font-semibold text-slate-700">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Temperature (°C) *
                </label>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 2: Manpower */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="text-[14px] font-bold text-blue-900">Manpower Summary</h3>
                </div>
                <p className="text-[12px] text-blue-700">
                  Track daily workforce attendance and allocation
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                    Total Manpower *
                  </label>
                  <input
                    type="number"
                    value={formData.manpowerTotal}
                    onChange={(e) => handleInputChange('manpowerTotal', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                    Present *
                  </label>
                  <input
                    type="number"
                    value={formData.manpowerPresent}
                    onChange={(e) => handleInputChange('manpowerPresent', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                    Absent *
                  </label>
                  <input
                    type="number"
                    value={formData.manpowerAbsent}
                    onChange={(e) => handleInputChange('manpowerAbsent', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Visual Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-semibold text-blue-700">Attendance Rate</span>
                  <span className="text-[16px] font-bold text-blue-900">
                    {formData.manpowerTotal && formData.manpowerPresent
                      ? Math.round((parseInt(formData.manpowerPresent) / parseInt(formData.manpowerTotal)) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        formData.manpowerTotal && formData.manpowerPresent
                          ? (parseInt(formData.manpowerPresent) / parseInt(formData.manpowerTotal)) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Equipment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-[14px] font-bold text-emerald-900">Equipment Status</h3>
                </div>
                <p className="text-[12px] text-emerald-700">
                  Monitor machinery and equipment operational status
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                    Total Equipment *
                  </label>
                  <input
                    type="number"
                    value={formData.equipmentTotal}
                    onChange={(e) => handleInputChange('equipmentTotal', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                    Operational *
                  </label>
                  <input
                    type="number"
                    value={formData.equipmentOperational}
                    onChange={(e) => handleInputChange('equipmentOperational', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                    Breakdown *
                  </label>
                  <input
                    type="number"
                    value={formData.equipmentBreakdown}
                    onChange={(e) => handleInputChange('equipmentBreakdown', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Visual Summary */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-semibold text-emerald-700">Operational Rate</span>
                  <span className="text-[16px] font-bold text-emerald-900">
                    {formData.equipmentTotal && formData.equipmentOperational
                      ? Math.round((parseInt(formData.equipmentOperational) / parseInt(formData.equipmentTotal)) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        formData.equipmentTotal && formData.equipmentOperational
                          ? (parseInt(formData.equipmentOperational) / parseInt(formData.equipmentTotal)) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Work Progress */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <h3 className="text-[14px] font-bold text-purple-900">Work Progress</h3>
                </div>
                <p className="text-[12px] text-purple-700">
                  Document daily work completion and activities
                </p>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Overall Progress (%) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.workProgress}
                  onChange={(e) => handleInputChange('workProgress', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                />
                <div className="mt-3 w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-[#ff5e3a] to-[#ff8566] h-3 rounded-full transition-all"
                    style={{ width: `${formData.workProgress}%` }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Activities Completed Today
                </label>
                <textarea
                  value={formData.activitiesCompleted}
                  onChange={(e) => handleInputChange('activitiesCompleted', e.target.value)}
                  rows={4}
                  placeholder="e.g., Concrete pouring for Floor 3, Steel beam installation..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Activities In Progress
                </label>
                <textarea
                  value={formData.activitiesInProgress}
                  onChange={(e) => handleInputChange('activitiesInProgress', e.target.value)}
                  rows={4}
                  placeholder="e.g., MEP installation, Facade works..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 5: Safety & Issues */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="text-[14px] font-bold text-red-900">Safety & Issues</h3>
                </div>
                <p className="text-[12px] text-red-700">
                  Report safety incidents and site issues
                </p>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Number of Safety Incidents *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.safetyIncidents}
                  onChange={(e) => handleInputChange('safetyIncidents', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                />
                {parseInt(formData.safetyIncidents) > 0 && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-[11px] text-red-700 font-medium">
                      ⚠️ Please provide detailed incident reports separately
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Issues & Concerns Reported
                </label>
                <textarea
                  value={formData.issuesReported}
                  onChange={(e) => handleInputChange('issuesReported', e.target.value)}
                  rows={6}
                  placeholder="Describe any issues, delays, or concerns encountered today..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 6: Notes & Photos */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="w-5 h-5 text-slate-600" />
                  <h3 className="text-[14px] font-bold text-slate-900">Additional Documentation</h3>
                </div>
                <p className="text-[12px] text-slate-700">
                  Add notes and photos to support your report
                </p>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={5}
                  placeholder="Any additional information, comments, or observations..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                  Site Photos
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-[#ff5e3a] transition-colors cursor-pointer">
                  <Camera className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-[13px] font-semibold text-slate-700 mb-1">
                    Click to upload photos
                  </p>
                  <p className="text-[11px] text-slate-500">
                    or drag and drop (PNG, JPG up to 10MB)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-[13px] font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="text-[12px] text-slate-500 font-medium">
            Step {currentStep} of {steps.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSubmit(true)}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-[13px] font-semibold hover:bg-slate-200 transition-colors"
            >
              Save as Draft
            </button>
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-[#ff5e3a] text-white rounded-lg text-[13px] font-semibold hover:bg-[#e54d2a] transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => handleSubmit(false)}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-[13px] font-semibold hover:bg-emerald-600 transition-colors"
              >
                Publish Report
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
