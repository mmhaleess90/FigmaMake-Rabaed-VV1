import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CreateDailySiteReportPanel } from '../components/CreateDailySiteReportPanel';

export default function CreateDailySiteReportPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleSave = (report: any) => {
    // Save report logic here
    console.log('Saving report:', report);
    // Navigate back to reports list
    navigate(`/projects/${projectId}?tab=daily-report`);
  };

  const handleClose = () => {
    navigate(`/projects/${projectId}?tab=daily-report`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <CreateDailySiteReportPanel
        isOpen={true}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
}