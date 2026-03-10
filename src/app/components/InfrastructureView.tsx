import { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, Clock, ChevronRight, ArrowLeft, MapPin, Construction, Route, Eye, Map } from "lucide-react";
import { RoadVisualView } from "./RoadVisualView";
import { SegmentMapView } from "./SegmentMapView";

interface Activity {
  id: string;
  status: "complete" | "in-progress" | "issue" | "pending" | "testing";
  name: string;
  description: string;
  contractor?: string;
  testResult?: string;
}

interface Chainage {
  id: string;
  from: string;
  to: string;
  length: number; // in meters
  activities: Activity[];
}

interface WorkPackage {
  id: string;
  name: string;
  type: "earthworks" | "pavement" | "drainage" | "structures" | "utilities" | "finishing";
  chainages: Chainage[];
}

interface Section {
  id: string;
  name: string;
  description: string;
  totalLength: number; // in km
  workPackages: WorkPackage[];
}

interface Project {
  id: string;
  name: string;
  type: "highway" | "flyover" | "interchange";
  sections: Section[];
}

const mockInfrastructureData: Project[] = [
  {
    id: "proj-highway-1",
    name: "Sheikh Mohammed Bin Zayed Highway Extension",
    type: "highway",
    sections: [
      {
        id: "section-a",
        name: "Section A",
        description: "Chainage 0+000 to 5+000",
        totalLength: 5.0,
        workPackages: [
          {
            id: "wp-earthworks-a",
            name: "Earthworks",
            type: "earthworks",
            chainages: [
              {
                id: "ch-0-1",
                from: "0+000",
                to: "1+000",
                length: 1000,
                activities: [
                  { id: "act-1", status: "complete", name: "Site Clearance", description: "Vegetation removal and site preparation", contractor: "Al Futtaim Construction" },
                  { id: "act-2", status: "complete", name: "Topsoil Stripping", description: "150mm topsoil removed", contractor: "Al Futtaim Construction", testResult: "Passed" },
                  { id: "act-3", status: "complete", name: "Cut to Formation", description: "Excavation to design level", contractor: "Al Futtaim Construction", testResult: "Passed" },
                  { id: "act-4", status: "complete", name: "Compaction Test", description: "95% compaction achieved", contractor: "Testing Lab", testResult: "Passed - 96%" },
                ],
              },
              {
                id: "ch-1-2",
                from: "1+000",
                to: "2+000",
                length: 1000,
                activities: [
                  { id: "act-5", status: "complete", name: "Site Clearance", description: "Complete", contractor: "Al Futtaim Construction" },
                  { id: "act-6", status: "complete", name: "Embankment Fill", description: "Layer 1-3 complete", contractor: "Al Futtaim Construction", testResult: "Passed" },
                  { id: "act-7", status: "in-progress", name: "Compaction", description: "Layer 4 in progress", contractor: "Al Futtaim Construction" },
                ],
              },
              {
                id: "ch-2-3",
                from: "2+000",
                to: "3+000",
                length: 1000,
                activities: [
                  { id: "act-8", status: "in-progress", name: "Earthworks", description: "Cut and fill ongoing", contractor: "Al Futtaim Construction" },
                  { id: "act-9", status: "pending", name: "Compaction Test", description: "Awaiting completion", contractor: "Testing Lab" },
                ],
              },
            ],
          },
          {
            id: "wp-pavement-a",
            name: "Pavement Works",
            type: "pavement",
            chainages: [
              {
                id: "ch-pav-0-1",
                from: "0+000",
                to: "1+000",
                length: 1000,
                activities: [
                  { id: "pav-1", status: "complete", name: "Subbase (GSB) - 250mm", description: "Granular sub-base layer", contractor: "Dutco Construction", testResult: "CBR: 35%" },
                  { id: "pav-2", status: "complete", name: "Base Course (DBM) - 150mm", description: "Dense bituminous macadam", contractor: "Dutco Construction", testResult: "Density: 98%" },
                  { id: "pav-3", status: "complete", name: "Binder Course - 75mm", description: "Bituminous binder", contractor: "Dutco Construction", testResult: "Passed" },
                  { id: "pav-4", status: "testing", name: "Wearing Course - 50mm", description: "Final asphalt layer", contractor: "Dutco Construction", testResult: "Testing in progress" },
                ],
              },
              {
                id: "ch-pav-1-2",
                from: "1+000",
                to: "2+000",
                length: 1000,
                activities: [
                  { id: "pav-5", status: "complete", name: "Subbase (GSB) - 250mm", description: "Complete", contractor: "Dutco Construction", testResult: "Passed" },
                  { id: "pav-6", status: "in-progress", name: "Base Course (DBM) - 150mm", description: "70% complete", contractor: "Dutco Construction" },
                  { id: "pav-7", status: "pending", name: "Binder Course", description: "Not started", contractor: "Dutco Construction" },
                ],
              },
            ],
          },
          {
            id: "wp-drainage-a",
            name: "Drainage Systems",
            type: "drainage",
            chainages: [
              {
                id: "ch-drain-0-1",
                from: "0+000",
                to: "1+000",
                length: 1000,
                activities: [
                  { id: "drain-1", status: "complete", name: "Storm Water Culvert - 1200mm", description: "RCC box culvert at 0+450", contractor: "Khansaheb Civil" },
                  { id: "drain-2", status: "complete", name: "Roadside Drain - LHS", description: "V-drain with grating", contractor: "Khansaheb Civil" },
                  { id: "drain-3", status: "complete", name: "Roadside Drain - RHS", description: "V-drain with grating", contractor: "Khansaheb Civil" },
                ],
              },
              {
                id: "ch-drain-1-2",
                from: "1+000",
                to: "2+000",
                length: 1000,
                activities: [
                  { id: "drain-4", status: "in-progress", name: "Catch Basin Installation", description: "Every 50m spacing", contractor: "Khansaheb Civil" },
                  { id: "drain-5", status: "issue", name: "Pipe Bedding", description: "Incorrect aggregate size used", contractor: "Khansaheb Civil", testResult: "Failed" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "section-b",
        name: "Section B",
        description: "Chainage 5+000 to 10+000",
        totalLength: 5.0,
        workPackages: [
          {
            id: "wp-earthworks-b",
            name: "Earthworks",
            type: "earthworks",
            chainages: [
              {
                id: "ch-5-6",
                from: "5+000",
                to: "6+000",
                length: 1000,
                activities: [
                  { id: "act-b1", status: "in-progress", name: "Site Clearance", description: "60% complete", contractor: "Al Futtaim Construction" },
                  { id: "act-b2", status: "pending", name: "Excavation", description: "Awaiting clearance", contractor: "Al Futtaim Construction" },
                ],
              },
              {
                id: "ch-6-7",
                from: "6+000",
                to: "7+000",
                length: 1000,
                activities: [
                  { id: "act-b3", status: "pending", name: "Land Acquisition", description: "Pending clearance", contractor: "RTA" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "proj-flyover-1",
    name: "Al Khail Road Flyover",
    type: "flyover",
    sections: [
      {
        id: "flyover-main",
        name: "Main Structure",
        description: "Elevated flyover - 2.5 km",
        totalLength: 2.5,
        workPackages: [
          {
            id: "wp-foundations",
            name: "Foundations & Piers",
            type: "structures",
            chainages: [
              {
                id: "pier-1",
                from: "0+000",
                to: "0+050",
                length: 50,
                activities: [
                  { id: "found-1", status: "complete", name: "Pier P1 - Pile Foundation", description: "8 x 1200mm diameter piles", contractor: "Belhasa Engineering", testResult: "Load test passed" },
                  { id: "found-2", status: "complete", name: "Pier P1 - Pile Cap", description: "5m x 5m x 2m RCC", contractor: "Belhasa Engineering" },
                  { id: "found-3", status: "complete", name: "Pier P1 - Column", description: "Height: 12m", contractor: "Belhasa Engineering" },
                  { id: "found-4", status: "complete", name: "Pier P1 - Pier Head", description: "Hammerhead design", contractor: "Belhasa Engineering" },
                ],
              },
              {
                id: "pier-2",
                from: "0+050",
                to: "0+100",
                length: 50,
                activities: [
                  { id: "found-5", status: "complete", name: "Pier P2 - Pile Foundation", description: "8 x 1200mm diameter piles", contractor: "Belhasa Engineering", testResult: "Passed" },
                  { id: "found-6", status: "complete", name: "Pier P2 - Pile Cap", description: "Complete", contractor: "Belhasa Engineering" },
                  { id: "found-7", status: "in-progress", name: "Pier P2 - Column", description: "Concreting in progress", contractor: "Belhasa Engineering" },
                ],
              },
              {
                id: "pier-3",
                from: "0+100",
                to: "0+150",
                length: 50,
                activities: [
                  { id: "found-8", status: "in-progress", name: "Pier P3 - Pile Foundation", description: "Piling ongoing", contractor: "Belhasa Engineering" },
                  { id: "found-9", status: "pending", name: "Pier P3 - Pile Cap", description: "Not started", contractor: "Belhasa Engineering" },
                ],
              },
            ],
          },
          {
            id: "wp-superstructure",
            name: "Deck & Superstructure",
            type: "structures",
            chainages: [
              {
                id: "span-1",
                from: "0+000",
                to: "0+050",
                length: 50,
                activities: [
                  { id: "deck-1", status: "complete", name: "Span 1 - Girder Erection", description: "5 precast girders installed", contractor: "Belhasa Engineering" },
                  { id: "deck-2", status: "complete", name: "Span 1 - Deck Slab", description: "250mm thick RCC deck", contractor: "Belhasa Engineering", testResult: "Cube test passed" },
                  { id: "deck-3", status: "complete", name: "Span 1 - Waterproofing", description: "Membrane applied", contractor: "Belhasa Engineering" },
                ],
              },
              {
                id: "span-2",
                from: "0+050",
                to: "0+100",
                length: 50,
                activities: [
                  { id: "deck-4", status: "in-progress", name: "Span 2 - Girder Erection", description: "3 of 5 girders placed", contractor: "Belhasa Engineering" },
                  { id: "deck-5", status: "pending", name: "Span 2 - Deck Slab", description: "Awaiting girder completion", contractor: "Belhasa Engineering" },
                ],
              },
            ],
          },
          {
            id: "wp-finishing-flyover",
            name: "Road Finishing",
            type: "finishing",
            chainages: [
              {
                id: "finish-1",
                from: "0+000",
                to: "0+050",
                length: 50,
                activities: [
                  { id: "fin-1", status: "complete", name: "Pavement - Asphalt", description: "75mm thick", contractor: "Dutco Construction" },
                  { id: "fin-2", status: "complete", name: "Safety Barriers", description: "Concrete parapets", contractor: "Safety First LLC" },
                  { id: "fin-3", status: "in-progress", name: "Road Markings", description: "Thermoplastic markings", contractor: "Traffic Systems" },
                  { id: "fin-4", status: "pending", name: "Lighting", description: "LED street lights", contractor: "Siemens" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "proj-interchange",
    name: "Sheikh Zayed Road Interchange",
    type: "interchange",
    sections: [
      {
        id: "ramp-a",
        name: "Ramp A - Northbound Exit",
        description: "Exit ramp to E11",
        totalLength: 0.8,
        workPackages: [
          {
            id: "wp-ramp-earthworks",
            name: "Earthworks",
            type: "earthworks",
            chainages: [
              {
                id: "ramp-ch-1",
                from: "0+000",
                to: "0+400",
                length: 400,
                activities: [
                  { id: "ramp-1", status: "complete", name: "Cut to Grade", description: "Complete", contractor: "Al Futtaim Construction" },
                  { id: "ramp-2", status: "complete", name: "Subgrade Preparation", description: "Complete", contractor: "Al Futtaim Construction", testResult: "Passed" },
                ],
              },
            ],
          },
          {
            id: "wp-ramp-pavement",
            name: "Pavement Works",
            type: "pavement",
            chainages: [
              {
                id: "ramp-pav-1",
                from: "0+000",
                to: "0+400",
                length: 400,
                activities: [
                  { id: "ramp-p1", status: "in-progress", name: "Base Course", description: "50% complete", contractor: "Dutco Construction" },
                  { id: "ramp-p2", status: "pending", name: "Surfacing", description: "Not started", contractor: "Dutco Construction" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ramp-b",
        name: "Ramp B - Southbound Entry",
        description: "Entry ramp from E11",
        totalLength: 0.6,
        workPackages: [
          {
            id: "wp-ramp-b-earthworks",
            name: "Earthworks",
            type: "earthworks",
            chainages: [
              {
                id: "ramp-b-ch-1",
                from: "0+000",
                to: "0+300",
                length: 300,
                activities: [
                  { id: "ramp-b-1", status: "issue", name: "Unsuitable Material Found", description: "Soft clay layer at formation", contractor: "Al Futtaim Construction", testResult: "Failed - CBR < 2%" },
                  { id: "ramp-b-2", status: "pending", name: "Ground Improvement", description: "Lime stabilization required", contractor: "Ground Engineering" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const StatusBadge = ({ status }: { status: "complete" | "in-progress" | "issue" | "pending" | "testing" }) => {
  const config = {
    complete: { bg: "#34d399", icon: CheckCircle, label: "Complete" },
    "in-progress": { bg: "#60a5fa", icon: Clock, label: "In Progress" },
    issue: { bg: "#f87171", icon: AlertCircle, label: "Issue" },
    pending: { bg: "#94a3b8", icon: Clock, label: "Pending" },
    testing: { bg: "#fbbf24", icon: AlertCircle, label: "Testing" },
  };

  const { bg, icon: Icon } = config[status];

  return (
    <div
      className="w-[32px] h-[32px] rounded flex items-center justify-center text-white relative group cursor-pointer flex-shrink-0"
      style={{ backgroundColor: bg }}
    >
      <Icon className="w-4 h-4" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {config[status].label}
      </div>
    </div>
  );
};

type ViewLevel = "projects" | "sections" | "workpackages" | "chainages";

export function InfrastructureView() {
  const [viewLevel, setViewLevel] = useState<ViewLevel>("projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedWorkPackage, setSelectedWorkPackage] = useState<WorkPackage | null>(null);
  const [expandedChainage, setExpandedChainage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "open" | "resolved">("all");
  const [showVisualView, setShowVisualView] = useState(false);
  const [viewMode, setViewMode] = useState<"hierarchy" | "segmentmap">("hierarchy");

  const getStatusCounts = (activities: Activity[]) => {
    return {
      complete: activities.filter((t) => t.status === "complete").length,
      inProgress: activities.filter((t) => t.status === "in-progress").length,
      issue: activities.filter((t) => t.status === "issue").length,
      pending: activities.filter((t) => t.status === "pending").length,
      testing: activities.filter((t) => t.status === "testing").length,
      total: activities.length,
    };
  };

  const getWorkPackageCounts = (workPackage: WorkPackage) => {
    const allActivities = workPackage.chainages.flatMap((c) => c.activities);
    return getStatusCounts(allActivities);
  };

  const getSectionCounts = (section: Section) => {
    const allActivities = section.workPackages.flatMap((wp) => wp.chainages.flatMap((c) => c.activities));
    return getStatusCounts(allActivities);
  };

  const getProjectCounts = (project: Project) => {
    const allActivities = project.sections.flatMap((s) => s.workPackages.flatMap((wp) => wp.chainages.flatMap((c) => c.activities)));
    return getStatusCounts(allActivities);
  };

  const getOpenCount = () => {
    return mockInfrastructureData.reduce((acc, project) => {
      return acc + project.sections.reduce((sAcc, section) => {
        return sAcc + section.workPackages.reduce((wpAcc, wp) => {
          return wpAcc + wp.chainages.reduce((cAcc, chainage) => {
            return cAcc + chainage.activities.filter((a) => a.status === "issue").length;
          }, 0);
        }, 0);
      }, 0);
    }, 0);
  };

  const getResolvedCount = () => {
    return mockInfrastructureData.reduce((acc, project) => {
      return acc + project.sections.reduce((sAcc, section) => {
        return sAcc + section.workPackages.reduce((wpAcc, wp) => {
          return wpAcc + wp.chainages.reduce((cAcc, chainage) => {
            return cAcc + chainage.activities.filter((a) => a.status === "complete").length;
          }, 0);
        }, 0);
      }, 0);
    }, 0);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setViewLevel("sections");
  };

  const handleSectionClick = (section: Section) => {
    setSelectedSection(section);
    setViewLevel("workpackages");
  };

  const handleWorkPackageClick = (workPackage: WorkPackage) => {
    setSelectedWorkPackage(workPackage);
    setViewLevel("chainages");
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setSelectedSection(null);
    setSelectedWorkPackage(null);
    setViewLevel("projects");
  };

  const handleBackToSections = () => {
    setSelectedSection(null);
    setSelectedWorkPackage(null);
    setViewLevel("sections");
  };

  const handleBackToWorkPackages = () => {
    setSelectedWorkPackage(null);
    setViewLevel("workpackages");
  };

  const getWorkPackageIcon = (type: string) => {
    switch (type) {
      case "earthworks": return "🏗️";
      case "pavement": return "🛣️";
      case "drainage": return "💧";
      case "structures": return "🌉";
      case "utilities": return "⚡";
      case "finishing": return "✨";
      default: return "📋";
    }
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case "highway": return "🛣️";
      case "flyover": return "🌉";
      case "interchange": return "🔀";
      default: return "🚧";
    }
  };

  const renderBreadcrumb = () => {
    return (
      <div className="bg-white border-b border-[#e2e8f0] px-4 py-2 flex items-center gap-2 text-[12px] text-[#64748b] flex-shrink-0 overflow-x-auto">
        <span>Infrastructure Projects</span>
        {viewLevel === "projects" && (
          <>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">All Projects</span>
          </>
        )}
        {viewLevel === "sections" && selectedProject && (
          <>
            <span>/</span>
            <button onClick={handleBackToProjects} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedProject.name}
            </button>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">All Sections</span>
          </>
        )}
        {viewLevel === "workpackages" && selectedProject && selectedSection && (
          <>
            <span>/</span>
            <button onClick={handleBackToProjects} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedProject.name}
            </button>
            <span>/</span>
            <button onClick={handleBackToSections} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedSection.name}
            </button>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">Work Packages</span>
          </>
        )}
        {viewLevel === "chainages" && selectedProject && selectedSection && selectedWorkPackage && (
          <>
            <span>/</span>
            <button onClick={handleBackToProjects} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedProject.name}
            </button>
            <span>/</span>
            <button onClick={handleBackToSections} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedSection.name}
            </button>
            <span>/</span>
            <button onClick={handleBackToWorkPackages} className="text-[#2196F3] hover:underline whitespace-nowrap">
              {selectedWorkPackage.name}
            </button>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">Chainages</span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex bg-[#e8ebef] relative">
      {/* Floating Visual View Button - shows when project is selected */}
      {selectedProject && (selectedProject.type === "highway" || selectedProject.type === "flyover") && (
        <button
          onClick={() => setShowVisualView(!showVisualView)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff5e3a] to-[#ff8566] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-semibold text-[13px]"
        >
          <Eye className="w-5 h-5" />
          {showVisualView ? "Hide" : "Show"} Visual View
        </button>
      )}

      {/* Visual View Modal */}
      {showVisualView && selectedProject && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowVisualView(false)}>
          <div className="bg-white rounded-lg w-full max-w-[1400px] max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
              <h2 className="text-[18px] font-bold text-[#0f172a]">Visual View - {selectedProject.name}</h2>
              <button
                onClick={() => setShowVisualView(false)}
                className="p-2 hover:bg-[#f8fafc] rounded transition-colors"
              >
                <svg className="w-5 h-5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <RoadVisualView projectType={selectedProject.type} projectName={selectedProject.name} />
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar - Filters */}
      <div className="w-[240px] bg-white border-r border-[#e2e8f0] flex-shrink-0 overflow-y-auto hidden md:block">
        <div className="p-4">
          {/* Filter Contractor */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Filter Contractor</h3>
            <select className="w-full h-[36px] border border-[#e2e8f0] rounded px-3 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]">
              <option>All contractors</option>
              <option>Al Futtaim Construction</option>
              <option>Dutco Construction</option>
              <option>Belhasa Engineering</option>
              <option>Khansaheb Civil</option>
              <option>Ground Engineering</option>
            </select>
          </div>

          {/* Work Package Filter */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Work Package Type</h3>
            <div className="space-y-2">
              {["earthworks", "pavement", "drainage", "structures", "utilities", "finishing"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-[12px] text-[#475569] capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Current View Info */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Current View</h3>
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded px-3 py-2">
              <div className="flex items-center gap-2">
                {viewLevel === "projects" && (
                  <>
                    <Route className="w-4 h-4 text-[#ff5e3a]" />
                    <span className="text-[12px] text-[#334155] font-medium">All Projects</span>
                  </>
                )}
                {viewLevel === "sections" && (
                  <>
                    <MapPin className="w-4 h-4 text-[#ff5e3a]" />
                    <span className="text-[12px] text-[#334155] font-medium">Viewing Sections</span>
                  </>
                )}
                {viewLevel === "workpackages" && (
                  <>
                    <Construction className="w-4 h-4 text-[#ff5e3a]" />
                    <span className="text-[12px] text-[#334155] font-medium">Work Packages</span>
                  </>
                )}
                {viewLevel === "chainages" && (
                  <>
                    <MapPin className="w-4 h-4 text-[#ff5e3a]" />
                    <span className="text-[12px] text-[#334155] font-medium">Chainages</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Status Legend</h3>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#34d399]"></span>
                <span className="text-[#64748b]">Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#60a5fa]"></span>
                <span className="text-[#64748b]">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#fbbf24]"></span>
                <span className="text-[#64748b]">Testing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#f87171]"></span>
                <span className="text-[#64748b]">Issue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#94a3b8]"></span>
                <span className="text-[#64748b]">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Breadcrumb */}
        {renderBreadcrumb()}

        {/* Content with smooth transitions */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="transition-all duration-300 ease-in-out">
            {/* Back Button */}
            {viewLevel !== "projects" && (
              <button
                onClick={
                  viewLevel === "sections" ? handleBackToProjects :
                  viewLevel === "workpackages" ? handleBackToSections :
                  handleBackToWorkPackages
                }
                className="flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] transition-colors text-[13px] font-medium text-[#334155]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {viewLevel === "sections" ? "Projects" : viewLevel === "workpackages" ? "Sections" : "Work Packages"}
              </button>
            )}

            {/* PROJECTS VIEW */}
            {viewLevel === "projects" && (
              <div className="space-y-4">
                <h2 className="text-[20px] font-bold text-[#0f172a] mb-4">Select an Infrastructure Project</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockInfrastructureData.map((project) => {
                    const counts = getProjectCounts(project);
                    return (
                      <div
                        key={project.id}
                        onClick={() => handleProjectClick(project)}
                        className="bg-white rounded-lg border-2 border-[#e2e8f0] hover:border-[#ff5e3a] hover:shadow-lg transition-all cursor-pointer p-6 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="text-4xl">{getProjectTypeIcon(project.type)}</div>
                            <div>
                              <h3 className="text-[15px] font-bold text-[#0f172a] group-hover:text-[#ff5e3a] transition-colors">
                                {project.name}
                              </h3>
                              <p className="text-[11px] text-[#64748b] mt-1 capitalize">{project.type} Project</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#ff5e3a] transition-colors flex-shrink-0" />
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
                          <div className="flex items-center justify-between text-[11px] mb-2">
                            <span className="text-[#64748b]">Sections:</span>
                            <span className="font-semibold text-[#0f172a]">{project.sections.length}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#34d399]"></span>
                              <span className="text-[#64748b]">Done: {counts.complete}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#60a5fa]"></span>
                              <span className="text-[#64748b]">Active: {counts.inProgress}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#f87171]"></span>
                              <span className="text-[#64748b]">Issues: {counts.issue}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
                              <span className="text-[#64748b]">Testing: {counts.testing}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTIONS VIEW */}
            {viewLevel === "sections" && selectedProject && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-[20px] font-bold text-[#0f172a]">{selectedProject.name}</h2>
                  <p className="text-[13px] text-[#64748b] mt-1 capitalize">{selectedProject.type} Project</p>
                </div>
                <h3 className="text-[16px] font-semibold text-[#0f172a] mb-3">Select a Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.sections.map((section) => {
                    const counts = getSectionCounts(section);
                    return (
                      <div
                        key={section.id}
                        onClick={() => handleSectionClick(section)}
                        className="bg-white rounded-lg border-2 border-[#e2e8f0] hover:border-[#2196F3] hover:shadow-lg transition-all cursor-pointer p-6 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-[16px] font-bold text-[#0f172a] group-hover:text-[#2196F3] transition-colors">
                              {section.name}
                            </h3>
                            <p className="text-[12px] text-[#64748b] mt-1">{section.description}</p>
                            <p className="text-[11px] text-[#94a3b8] mt-1">Length: {section.totalLength} km</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#2196F3] transition-colors flex-shrink-0" />
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
                          <div className="flex items-center justify-between text-[11px] mb-3">
                            <span className="text-[#64748b]">Work Packages:</span>
                            <span className="font-semibold text-[#0f172a]">{section.workPackages.length}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#34d399]"></span>
                              <span className="text-[#64748b]">Complete: {counts.complete}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#60a5fa]"></span>
                              <span className="text-[#64748b]">Progress: {counts.inProgress}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#f87171]"></span>
                              <span className="text-[#64748b]">Issues: {counts.issue}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
                              <span className="text-[#64748b]">Testing: {counts.testing}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* WORK PACKAGES VIEW */}
            {viewLevel === "workpackages" && selectedSection && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-[20px] font-bold text-[#0f172a]">{selectedSection.name}</h2>
                  <p className="text-[13px] text-[#64748b] mt-1">{selectedSection.description}</p>
                </div>
                <h3 className="text-[16px] font-semibold text-[#0f172a] mb-3">Select a Work Package</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedSection.workPackages.map((workPackage) => {
                    const counts = getWorkPackageCounts(workPackage);
                    return (
                      <div
                        key={workPackage.id}
                        onClick={() => handleWorkPackageClick(workPackage)}
                        className="bg-white rounded-lg border-2 border-[#e2e8f0] hover:border-[#10b981] hover:shadow-lg transition-all cursor-pointer p-6 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{getWorkPackageIcon(workPackage.type)}</div>
                            <div>
                              <h3 className="text-[14px] font-bold text-[#0f172a] group-hover:text-[#10b981] transition-colors">
                                {workPackage.name}
                              </h3>
                              <p className="text-[10px] text-[#64748b] mt-1 capitalize">{workPackage.type}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#10b981] transition-colors flex-shrink-0" />
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
                          <div className="flex items-center justify-between text-[11px] mb-2">
                            <span className="text-[#64748b]">Chainages:</span>
                            <span className="font-semibold text-[#0f172a]">{workPackage.chainages.length}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#34d399]"></span>
                              <span className="text-[#64748b]">{counts.complete}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#60a5fa]"></span>
                              <span className="text-[#64748b]">{counts.inProgress}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#f87171]"></span>
                              <span className="text-[#64748b]">{counts.issue}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
                              <span className="text-[#64748b]">{counts.testing}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CHAINAGES VIEW */}
            {viewLevel === "chainages" && selectedWorkPackage && (
              <div className="space-y-3">
                <div className="mb-4">
                  <h2 className="text-[20px] font-bold text-[#0f172a]">{selectedWorkPackage.name}</h2>
                  <p className="text-[13px] text-[#64748b] mt-1 capitalize">{selectedWorkPackage.type} Work</p>
                </div>
                {selectedWorkPackage.chainages.map((chainage) => {
                  const counts = getStatusCounts(chainage.activities);
                  return (
                    <div
                      key={chainage.id}
                      className="bg-white rounded-lg border border-[#e2e8f0] hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 p-4">
                        {/* Chainage Info */}
                        <div className="w-[180px] flex-shrink-0">
                          <div className="text-[13px] font-bold text-[#0f172a]">
                            {chainage.from} - {chainage.to}
                          </div>
                          <div className="text-[11px] text-[#64748b]">{chainage.length}m</div>
                        </div>

                        {/* Status Badges */}
                        <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                          {chainage.activities.map((activity) => (
                            <StatusBadge key={activity.id} status={activity.status} />
                          ))}
                        </div>

                        {/* Arrow Button */}
                        <button
                          onClick={() => setExpandedChainage(expandedChainage === chainage.id ? null : chainage.id)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                        >
                          <svg
                            className={`w-4 h-4 text-[#64748b] transition-transform ${
                              expandedChainage === chainage.id ? "rotate-90" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Chainage Stats Summary */}
                      <div className="px-4 pb-3 flex items-center gap-4 text-[11px] text-[#64748b] flex-wrap">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#34d399]"></span>
                          Complete: {counts.complete}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#60a5fa]"></span>
                          In Progress: {counts.inProgress}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#f87171]"></span>
                          Issues: {counts.issue}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
                          Testing: {counts.testing}
                        </span>
                      </div>

                      {/* Expanded Details */}
                      {expandedChainage === chainage.id && (
                        <div className="border-t border-[#e2e8f0] p-4 bg-[#f8fafc]">
                          <div className="space-y-2">
                            {chainage.activities.map((activity) => (
                              <div
                                key={activity.id}
                                className="bg-white rounded p-3 border border-[#e2e8f0] hover:border-[#ff5e3a] transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <StatusBadge status={activity.status} />
                                  <div className="flex-1">
                                    <div className="text-[12px] font-semibold text-[#0f172a] mb-1">{activity.name}</div>
                                    <div className="text-[11px] text-[#64748b] mb-2">{activity.description}</div>
                                    <div className="flex items-center gap-3 text-[10px] text-[#64748b] flex-wrap">
                                      {activity.contractor && (
                                        <span className="flex items-center gap-1">
                                          <span className="text-gray-400">👷</span>
                                          {activity.contractor}
                                        </span>
                                      )}
                                      {activity.testResult && (
                                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded ${
                                          activity.testResult.includes("Pass") || activity.testResult.includes("pass")
                                            ? "bg-green-100 text-green-700"
                                            : activity.testResult.includes("Failed") || activity.testResult.includes("fail")
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                          <span className="text-gray-400">🔬</span>
                                          {activity.testResult}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Issues & Quality Control */}
      <div className="w-[320px] bg-white border-l border-[#e2e8f0] flex-shrink-0 overflow-y-auto hidden lg:block">
        <div className="p-4">
          <h2 className="text-[16px] font-bold text-[#0f172a] mb-4">Quality Control & Issues</h2>

          {/* Filters Tabs */}
          <div className="flex items-center gap-1 mb-4 border-b border-[#e2e8f0]">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-2 text-[12px] font-medium ${
                selectedFilter === "all" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter("open")}
              className={`px-3 py-2 text-[12px] font-medium ${
                selectedFilter === "open" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b]"
              }`}
            >
              Issues ({getOpenCount()})
            </button>
            <button
              onClick={() => setSelectedFilter("resolved")}
              className={`px-3 py-2 text-[12px] font-medium ${
                selectedFilter === "resolved" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b]"
              }`}
            >
              Resolved ({getResolvedCount()})
            </button>
          </div>

          {/* Open Issues List */}
          <div className="space-y-3">
            <div>
              <button className="flex items-center gap-2 text-[12px] font-semibold text-[#0f172a] mb-2 w-full">
                <ChevronUp className="w-4 h-4" />
                <span>Open Issues ({getOpenCount()})</span>
              </button>
              <div className="space-y-2 ml-2 max-h-[500px] overflow-y-auto">
                {mockInfrastructureData.flatMap((project) =>
                  project.sections.flatMap((section) =>
                    section.workPackages.flatMap((wp) =>
                      wp.chainages.flatMap((chainage) =>
                        chainage.activities
                          .filter((activity) => activity.status === "issue")
                          .map((activity) => (
                            <div key={activity.id} className="border-l-2 border-red-500 pl-3 py-2">
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <div className="text-[12px] font-semibold text-[#0f172a]">{activity.name}</div>
                                  <div className="text-[10px] text-[#64748b] mt-1">{activity.description}</div>
                                  <div className="mt-2 text-[9px] text-[#64748b] space-y-1">
                                    <div>🛣️ {project.name}</div>
                                    <div>📍 {section.name} - {chainage.from} to {chainage.to}</div>
                                    <div>🏗️ {wp.name}</div>
                                    {activity.contractor && <div>👷 {activity.contractor}</div>}
                                    {activity.testResult && (
                                      <div className="text-red-600 font-medium">🔬 {activity.testResult}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                      )
                    )
                  )
                )}
              </div>
            </div>

            {/* Testing in Progress */}
            <div className="mt-4">
              <button className="flex items-center gap-2 text-[12px] font-semibold text-[#0f172a] mb-2 w-full">
                <ChevronDown className="w-4 h-4" />
                <span>Testing in Progress</span>
              </button>
            </div>

            {/* Resolved Section */}
            <div>
              <button className="flex items-center gap-2 text-[12px] font-semibold text-[#0f172a] mb-2 w-full">
                <ChevronDown className="w-4 h-4" />
                <span>Resolved ({getResolvedCount()})</span>
              </button>
            </div>
          </div>

          {/* Export Actions */}
          <div className="mt-6 pt-4 border-t border-[#e2e8f0]">
            <div className="text-[11px] text-[#64748b] mb-2">Export Reports</div>
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 text-[11px] text-[#ff5e3a] hover:text-[#e04628] font-medium">
                <span>📊</span>
                Progress Report (PDF)
              </button>
              <button className="flex items-center gap-2 text-[11px] text-[#ff5e3a] hover:text-[#e04628] font-medium">
                <span>🔬</span>
                Quality Test Results
              </button>
              <button className="flex items-center gap-2 text-[11px] text-[#ff5e3a] hover:text-[#e04628] font-medium">
                <span>📧</span>
                Email Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}