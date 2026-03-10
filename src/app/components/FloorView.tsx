import { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, Clock, ChevronRight, ArrowLeft, Building2, Layers } from "lucide-react";

interface Task {
  id: string;
  status: "complete" | "in-progress" | "issue" | "pending";
  name: string;
  description: string;
  subcontractor?: string;
  corridor?: string;
}

interface Floor {
  id: string;
  name: string;
  level: number;
  tasks: Task[];
}

interface Tower {
  id: string;
  name: string;
  floors: Floor[];
}

interface Zone {
  id: string;
  name: string;
  description: string;
  towers: Tower[];
}

const mockZoneData: Zone[] = [
  {
    id: "zone-a",
    name: "Zone A - North Wing",
    description: "Main residential and commercial development",
    towers: [
      {
        id: "tower-1",
        name: "Tower 1",
        floors: [
          {
            id: "roof",
            name: "ROOF",
            level: 9,
            tasks: [
              { id: "r1", status: "complete", name: "Ceiling Plasterboard", description: "Completed", corridor: "Corridor" },
              { id: "r2", status: "in-progress", name: "Roofing Installation", description: "In progress", corridor: "Main Area" },
            ],
          },
          {
            id: "floor-08",
            name: "FLOOR 08",
            level: 8,
            tasks: [
              { id: "f8-1", status: "complete", name: "MEP Installation", description: "All systems operational", subcontractor: "Dryliner" },
              { id: "f8-2", status: "complete", name: "Finishing Works", description: "Complete", subcontractor: "Dryliner" },
              { id: "f8-3", status: "in-progress", name: "Final Inspection", description: "In progress", subcontractor: "Dryliner" },
            ],
          },
          {
            id: "floor-07",
            name: "FLOOR 07",
            level: 7,
            tasks: [
              { id: "f7-1", status: "complete", name: "Ceiling Plasterboard", description: "Complete", corridor: "Corridor", subcontractor: "Dryliner" },
              { id: "f7-2", status: "issue", name: "Electrical Work", description: "Deficient and possibly inaccessible", corridor: "Riser 01", subcontractor: "Firestopping subcontractor" },
              { id: "f7-3", status: "in-progress", name: "HVAC Systems", description: "In progress", subcontractor: "Dryliner" },
            ],
          },
          {
            id: "floor-06",
            name: "FLOOR 06",
            level: 6,
            tasks: [
              { id: "f6-1", status: "complete", name: "Flooring Installation", description: "Complete", subcontractor: "Dryliner" },
              { id: "f6-2", status: "complete", name: "Wall Finishing", description: "Complete", subcontractor: "Dryliner" },
              { id: "f6-3", status: "in-progress", name: "Lighting Installation", description: "In progress", subcontractor: "Dryliner" },
              { id: "f6-4", status: "issue", name: "SVP Firestopping", description: "Deficient", corridor: "Riser 01", subcontractor: "Firestopping subcontractor" },
            ],
          },
          {
            id: "floor-05",
            name: "FLOOR 05",
            level: 5,
            tasks: [
              { id: "f5-1", status: "complete", name: "Structural Work", description: "Complete", subcontractor: "Dryliner" },
              { id: "f5-2", status: "in-progress", name: "HVAC Installation", description: "In progress", subcontractor: "Dryliner" },
              { id: "f5-3", status: "pending", name: "Inspection", description: "Pending", subcontractor: "Dryliner" },
            ],
          },
          {
            id: "ground-floor",
            name: "GROUND FLOOR",
            level: 0,
            tasks: [
              { id: "g1", status: "complete", name: "Site Preparation", description: "Complete", subcontractor: "Dryliner" },
              { id: "g2", status: "complete", name: "Underground Services", description: "Complete", subcontractor: "Dryliner" },
              { id: "g3", status: "in-progress", name: "Ground Works", description: "In progress", subcontractor: "Dryliner" },
            ],
          },
        ],
      },
      {
        id: "tower-2",
        name: "Tower 2",
        floors: [
          {
            id: "roof-t2",
            name: "ROOF",
            level: 9,
            tasks: [
              { id: "r1-t2", status: "in-progress", name: "Roofing Work", description: "In progress", corridor: "Main Area" },
              { id: "r2-t2", status: "pending", name: "Safety Rails", description: "Pending", corridor: "Perimeter" },
            ],
          },
          {
            id: "floor-08-t2",
            name: "FLOOR 08",
            level: 8,
            tasks: [
              { id: "f8-1-t2", status: "complete", name: "MEP Installation", description: "Complete", subcontractor: "Dryliner" },
              { id: "f8-2-t2", status: "in-progress", name: "Finishing Works", description: "In progress", subcontractor: "Dryliner" },
            ],
          },
          {
            id: "floor-07-t2",
            name: "FLOOR 07",
            level: 7,
            tasks: [
              { id: "f7-1-t2", status: "in-progress", name: "Ceiling Work", description: "In progress", corridor: "Corridor", subcontractor: "Dryliner" },
              { id: "f7-2-t2", status: "issue", name: "Plumbing Issues", description: "Leakage detected", corridor: "Riser 02", subcontractor: "Plumber" },
            ],
          },
          {
            id: "ground-floor-t2",
            name: "GROUND FLOOR",
            level: 0,
            tasks: [
              { id: "g1-t2", status: "complete", name: "Foundation", description: "Complete", subcontractor: "Dryliner" },
              { id: "g2-t2", status: "in-progress", name: "Ground Works", description: "In progress", subcontractor: "Dryliner" },
            ],
          },
        ],
      },
      {
        id: "tower-3",
        name: "Tower 3",
        floors: [
          {
            id: "floor-05-t3",
            name: "FLOOR 05",
            level: 5,
            tasks: [
              { id: "f5-1-t3", status: "in-progress", name: "Structural Work", description: "In progress", subcontractor: "Dryliner" },
              { id: "f5-2-t3", status: "pending", name: "MEP Rough-in", description: "Pending", subcontractor: "MEP Contractor" },
            ],
          },
          {
            id: "floor-04-t3",
            name: "FLOOR 04",
            level: 4,
            tasks: [
              { id: "f4-1-t3", status: "complete", name: "Concrete Pouring", description: "Complete", subcontractor: "Dryliner" },
              { id: "f4-2-t3", status: "in-progress", name: "Steel Framework", description: "In progress", subcontractor: "Dryliner" },
            ],
          },
          {
            id: "ground-floor-t3",
            name: "GROUND FLOOR",
            level: 0,
            tasks: [
              { id: "g1-t3", status: "complete", name: "Excavation", description: "Complete", subcontractor: "Dryliner" },
              { id: "g2-t3", status: "complete", name: "Foundation", description: "Complete", subcontractor: "Dryliner" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "zone-b",
    name: "Zone B - South Wing",
    description: "Luxury residential units with amenities",
    towers: [
      {
        id: "tower-4",
        name: "Tower 4",
        floors: [
          {
            id: "floor-10-t4",
            name: "FLOOR 10",
            level: 10,
            tasks: [
              { id: "f10-1-t4", status: "pending", name: "Structural Work", description: "Not started", subcontractor: "Dryliner" },
            ],
          },
          {
            id: "floor-09-t4",
            name: "FLOOR 09",
            level: 9,
            tasks: [
              { id: "f9-1-t4", status: "in-progress", name: "MEP Installation", description: "In progress", subcontractor: "MEP Contractor" },
              { id: "f9-2-t4", status: "issue", name: "Fire Safety", description: "Non-compliant", corridor: "Riser 01", subcontractor: "Firestopping subcontractor" },
            ],
          },
          {
            id: "ground-floor-t4",
            name: "GROUND FLOOR",
            level: 0,
            tasks: [
              { id: "g1-t4", status: "complete", name: "Foundation", description: "Complete", subcontractor: "Dryliner" },
              { id: "g2-t4", status: "complete", name: "Ground Slab", description: "Complete", subcontractor: "Dryliner" },
            ],
          },
        ],
      },
      {
        id: "tower-5",
        name: "Tower 5",
        floors: [
          {
            id: "floor-08-t5",
            name: "FLOOR 08",
            level: 8,
            tasks: [
              { id: "f8-1-t5", status: "in-progress", name: "Interior Walls", description: "In progress", subcontractor: "Dryliner" },
              { id: "f8-2-t5", status: "pending", name: "MEP Systems", description: "Pending", subcontractor: "MEP Contractor" },
            ],
          },
          {
            id: "ground-floor-t5",
            name: "GROUND FLOOR",
            level: 0,
            tasks: [
              { id: "g1-t5", status: "complete", name: "Site Work", description: "Complete", subcontractor: "Dryliner" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "zone-c",
    name: "Zone C - Amenities",
    description: "Recreation and commercial facilities",
    towers: [
      {
        id: "amenity-1",
        name: "Clubhouse",
        floors: [
          {
            id: "floor-02-am1",
            name: "FLOOR 02",
            level: 2,
            tasks: [
              { id: "f2-1-am1", status: "in-progress", name: "Gym Equipment", description: "Installation in progress", subcontractor: "Specialty Contractor" },
              { id: "f2-2-am1", status: "complete", name: "Flooring", description: "Complete", subcontractor: "Dryliner" },
            ],
          },
          {
            id: "floor-01-am1",
            name: "FLOOR 01",
            level: 1,
            tasks: [
              { id: "f1-1-am1", status: "complete", name: "Pool Installation", description: "Complete", subcontractor: "Pool Contractor" },
              { id: "f1-2-am1", status: "in-progress", name: "Spa Area", description: "In progress", subcontractor: "Specialty Contractor" },
            ],
          },
          {
            id: "ground-floor-am1",
            name: "GROUND FLOOR",
            level: 0,
            tasks: [
              { id: "g1-am1", status: "complete", name: "Lobby Finishing", description: "Complete", subcontractor: "Dryliner" },
              { id: "g2-am1", status: "complete", name: "Reception Area", description: "Complete", subcontractor: "Dryliner" },
            ],
          },
        ],
      },
    ],
  },
];

const StatusBadge = ({ status }: { status: "complete" | "in-progress" | "issue" | "pending" }) => {
  const config = {
    complete: { bg: "#34d399", icon: CheckCircle, label: "Complete" },
    "in-progress": { bg: "#60a5fa", icon: Clock, label: "In Progress" },
    issue: { bg: "#f87171", icon: AlertCircle, label: "Issue" },
    pending: { bg: "#94a3b8", icon: Clock, label: "Pending" },
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

type ViewLevel = "zones" | "towers" | "floors";

export function FloorView() {
  const [viewLevel, setViewLevel] = useState<ViewLevel>("zones");
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedTower, setSelectedTower] = useState<Tower | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "open" | "resolved" | "incorrect">("all");

  const getStatusCounts = (tasks: Task[]) => {
    return {
      complete: tasks.filter((t) => t.status === "complete").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      issue: tasks.filter((t) => t.status === "issue").length,
      pending: tasks.filter((t) => t.status === "pending").length,
      total: tasks.length,
    };
  };

  const getTowerCounts = (tower: Tower) => {
    const allTasks = tower.floors.flatMap((f) => f.tasks);
    return getStatusCounts(allTasks);
  };

  const getZoneCounts = (zone: Zone) => {
    const allTasks = zone.towers.flatMap((t) => t.floors.flatMap((f) => f.tasks));
    return getStatusCounts(allTasks);
  };

  const getOpenCount = () => {
    return mockZoneData.reduce((acc, zone) => {
      return acc + zone.towers.reduce((tAcc, tower) => {
        return tAcc + tower.floors.reduce((fAcc, floor) => {
          return fAcc + floor.tasks.filter((t) => t.status === "issue").length;
        }, 0);
      }, 0);
    }, 0);
  };

  const getResolvedCount = () => {
    return mockZoneData.reduce((acc, zone) => {
      return acc + zone.towers.reduce((tAcc, tower) => {
        return tAcc + tower.floors.reduce((fAcc, floor) => {
          return fAcc + floor.tasks.filter((t) => t.status === "complete").length;
        }, 0);
      }, 0);
    }, 0);
  };

  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(zone);
    setViewLevel("towers");
  };

  const handleTowerClick = (tower: Tower) => {
    setSelectedTower(tower);
    setViewLevel("floors");
  };

  const handleBackToZones = () => {
    setSelectedZone(null);
    setSelectedTower(null);
    setViewLevel("zones");
  };

  const handleBackToTowers = () => {
    setSelectedTower(null);
    setViewLevel("towers");
  };

  const renderBreadcrumb = () => {
    return (
      <div className="bg-white border-b border-[#e2e8f0] px-4 py-2 flex items-center gap-2 text-[12px] text-[#64748b] flex-shrink-0">
        <span>Demo - Residential Demo</span>
        <span>/</span>
        <span>Fit Out</span>
        {viewLevel === "zones" && (
          <>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">All Zones</span>
          </>
        )}
        {viewLevel === "towers" && selectedZone && (
          <>
            <span>/</span>
            <button onClick={handleBackToZones} className="text-[#2196F3] hover:underline">
              {selectedZone.name}
            </button>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">All Towers</span>
          </>
        )}
        {viewLevel === "floors" && selectedZone && selectedTower && (
          <>
            <span>/</span>
            <button onClick={handleBackToZones} className="text-[#2196F3] hover:underline">
              {selectedZone.name}
            </button>
            <span>/</span>
            <button onClick={handleBackToTowers} className="text-[#2196F3] hover:underline">
              {selectedTower.name}
            </button>
            <span>/</span>
            <span className="text-[#0f172a] font-medium">All Floors</span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex bg-[#e8ebef]">
      {/* Left Sidebar - Filters */}
      <div className="w-[240px] bg-white border-r border-[#e2e8f0] flex-shrink-0 overflow-y-auto hidden md:block">
        <div className="p-4">
          {/* Filter Subcontractor */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Filter subcontractor</h3>
            <div className="bg-[#e6f3ff] border border-[#2196F3] rounded px-3 py-2 mb-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#2196F3] mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-[#334155] leading-relaxed">
                  Try filtering for specific subcontractors, tasks, and components to see their data.
                </p>
              </div>
            </div>
            <select className="w-full h-[36px] border border-[#e2e8f0] rounded px-3 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]">
              <option>All subcontractors</option>
              <option>Dryliner</option>
              <option>Firestopping subcontractor</option>
              <option>MEP Contractor</option>
              <option>Plumber</option>
            </select>
          </div>

          {/* View Level Info */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Current View</h3>
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded px-3 py-2">
              <div className="flex items-center gap-2">
                {viewLevel === "zones" && (
                  <>
                    <Layers className="w-4 h-4 text-[#ff5e3a]" />
                    <span className="text-[12px] text-[#334155] font-medium">Viewing All Zones</span>
                  </>
                )}
                {viewLevel === "towers" && (
                  <>
                    <Building2 className="w-4 h-4 text-[#ff5e3a]" />
                    <span className="text-[12px] text-[#334155] font-medium">Viewing Towers</span>
                  </>
                )}
                {viewLevel === "floors" && (
                  <>
                    <Layers className="w-4 h-4 text-[#ff5e3a]" />
                    <span className="text-[12px] text-[#334155] font-medium">Viewing Floors</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* View Data */}
          <div className="mb-6">
            <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">View data</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="viewData"
                  value="progress"
                  defaultChecked
                  className="w-4 h-4"
                />
                <span className="text-[12px] text-[#475569]">Progress</span>
              </label>
              <p className="text-[10px] text-[#64748b] ml-6 leading-relaxed">
                How much have spaces progressed overall? Which spaces are completed?
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] text-[#64748b]">Show percentages</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2196F3]"></div>
                </label>
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
            {viewLevel !== "zones" && (
              <button
                onClick={viewLevel === "towers" ? handleBackToZones : handleBackToTowers}
                className="flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] transition-colors text-[13px] font-medium text-[#334155]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {viewLevel === "towers" ? "Zones" : "Towers"}
              </button>
            )}

            {/* ZONES VIEW */}
            {viewLevel === "zones" && (
              <div className="space-y-4">
                <h2 className="text-[20px] font-bold text-[#0f172a] mb-4">Select a Zone</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockZoneData.map((zone) => {
                    const counts = getZoneCounts(zone);
                    return (
                      <div
                        key={zone.id}
                        onClick={() => handleZoneClick(zone)}
                        className="bg-white rounded-lg border-2 border-[#e2e8f0] hover:border-[#ff5e3a] hover:shadow-lg transition-all cursor-pointer p-6 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff5e3a] to-[#ff8566] flex items-center justify-center">
                              <Layers className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-[15px] font-bold text-[#0f172a] group-hover:text-[#ff5e3a] transition-colors">
                                {zone.name}
                              </h3>
                              <p className="text-[11px] text-[#64748b] mt-1">{zone.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#ff5e3a] transition-colors" />
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
                          <div className="flex items-center justify-between text-[11px] mb-2">
                            <span className="text-[#64748b]">Towers:</span>
                            <span className="font-semibold text-[#0f172a]">{zone.towers.length}</span>
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
                              <span className="w-2 h-2 rounded-full bg-[#94a3b8]"></span>
                              <span className="text-[#64748b]">Pending: {counts.pending}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TOWERS VIEW */}
            {viewLevel === "towers" && selectedZone && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-[20px] font-bold text-[#0f172a]">{selectedZone.name}</h2>
                  <p className="text-[13px] text-[#64748b] mt-1">{selectedZone.description}</p>
                </div>
                <h3 className="text-[16px] font-semibold text-[#0f172a] mb-3">Select a Tower</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedZone.towers.map((tower) => {
                    const counts = getTowerCounts(tower);
                    return (
                      <div
                        key={tower.id}
                        onClick={() => handleTowerClick(tower)}
                        className="bg-white rounded-lg border-2 border-[#e2e8f0] hover:border-[#2196F3] hover:shadow-lg transition-all cursor-pointer p-6 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2196F3] to-[#42a5f5] flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-[15px] font-bold text-[#0f172a] group-hover:text-[#2196F3] transition-colors">
                                {tower.name}
                              </h3>
                              <p className="text-[11px] text-[#64748b] mt-1">{tower.floors.length} Floors</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#2196F3] transition-colors" />
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
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
                              <span className="w-2 h-2 rounded-full bg-[#94a3b8]"></span>
                              <span className="text-[#64748b]">Pending: {counts.pending}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FLOORS VIEW */}
            {viewLevel === "floors" && selectedTower && (
              <div className="space-y-3">
                <div className="mb-4">
                  <h2 className="text-[20px] font-bold text-[#0f172a]">{selectedTower.name}</h2>
                  <p className="text-[13px] text-[#64748b] mt-1">{selectedTower.floors.length} Floors</p>
                </div>
                {selectedTower.floors.map((floor) => {
                  const counts = getStatusCounts(floor.tasks);
                  return (
                    <div
                      key={floor.id}
                      className="bg-white rounded-lg border border-[#e2e8f0] hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 p-4">
                        {/* Floor Name */}
                        <div className="w-[140px] flex-shrink-0">
                          <div className="text-[13px] font-bold text-[#0f172a]">{floor.name}</div>
                        </div>

                        {/* Status Badges */}
                        <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                          {floor.tasks.map((task) => (
                            <StatusBadge key={task.id} status={task.status} />
                          ))}
                        </div>

                        {/* Arrow Button */}
                        <button
                          onClick={() => setSelectedFloor(selectedFloor === floor.id ? null : floor.id)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                        >
                          <svg
                            className={`w-4 h-4 text-[#64748b] transition-transform ${
                              selectedFloor === floor.id ? "rotate-90" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Floor Stats Summary */}
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
                          <span className="w-2 h-2 rounded-full bg-[#94a3b8]"></span>
                          Pending: {counts.pending}
                        </span>
                      </div>

                      {/* Expanded Details */}
                      {selectedFloor === floor.id && (
                        <div className="border-t border-[#e2e8f0] p-4 bg-[#f8fafc] animate-in slide-in-from-top duration-300">
                          <div className="space-y-2">
                            {floor.tasks.map((task) => (
                              <div
                                key={task.id}
                                className="bg-white rounded p-3 border border-[#e2e8f0] hover:border-[#ff5e3a] transition-colors cursor-pointer"
                              >
                                <div className="flex items-start gap-3">
                                  <StatusBadge status={task.status} />
                                  <div className="flex-1">
                                    <div className="text-[12px] font-semibold text-[#0f172a] mb-1">{task.name}</div>
                                    <div className="text-[11px] text-[#64748b] mb-2">{task.description}</div>
                                    {(task.corridor || task.subcontractor) && (
                                      <div className="flex items-center gap-3 text-[10px] text-[#64748b] flex-wrap">
                                        {task.corridor && (
                                          <span className="flex items-center gap-1">
                                            <span className="text-gray-400">📍</span>
                                            {task.corridor}
                                          </span>
                                        )}
                                        {task.subcontractor && (
                                          <span className="flex items-center gap-1">
                                            <span className="text-gray-400">👷</span>
                                            {task.subcontractor}
                                          </span>
                                        )}
                                      </div>
                                    )}
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

      {/* Right Sidebar - Spotlights */}
      <div className="w-[320px] bg-white border-l border-[#e2e8f0] flex-shrink-0 overflow-y-auto hidden lg:block">
        <div className="p-4">
          <h2 className="text-[16px] font-bold text-[#0f172a] mb-4">Spotlights</h2>

          {/* Filters Tabs */}
          <div className="flex items-center gap-1 mb-4 border-b border-[#e2e8f0]">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-2 text-[12px] font-medium ${
                selectedFilter === "all" ? "text-[#2196F3] border-b-2 border-[#2196F3]" : "text-[#64748b]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter("open")}
              className={`px-3 py-2 text-[12px] font-medium ${
                selectedFilter === "open" ? "text-[#2196F3] border-b-2 border-[#2196F3]" : "text-[#64748b]"
              }`}
            >
              Open ({getOpenCount()})
            </button>
            <button
              onClick={() => setSelectedFilter("resolved")}
              className={`px-3 py-2 text-[12px] font-medium ${
                selectedFilter === "resolved" ? "text-[#2196F3] border-b-2 border-[#2196F3]" : "text-[#64748b]"
              }`}
            >
              Resolved ({getResolvedCount()})
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
              <span>≡</span>
              <span>Filters</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
              <span>Sort: Priority</span>
              <AlertCircle className="w-3 h-3 text-red-500" />
            </div>
          </div>

          {/* Open Issues List */}
          <div className="space-y-3">
            <div>
              <button className="flex items-center gap-2 text-[12px] font-semibold text-[#0f172a] mb-2 w-full">
                <ChevronUp className="w-4 h-4" />
                <span>Open ({getOpenCount()})</span>
              </button>
              <div className="space-y-2 ml-2 max-h-[400px] overflow-y-auto">
                {mockZoneData.flatMap((zone) =>
                  zone.towers.flatMap((tower) =>
                    tower.floors.flatMap((floor) =>
                      floor.tasks
                        .filter((task) => task.status === "issue")
                        .map((task) => (
                          <div key={task.id} className="border-l-2 border-red-500 pl-3 py-2">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="text-[12px] font-semibold text-[#0f172a]">{task.name}</div>
                                <div className="text-[10px] text-[#64748b] mt-1">{task.description}</div>
                                <div className="flex items-center gap-2 mt-2 text-[9px] text-[#64748b]">
                                  <span>🏢 {zone.name.split(" - ")[0]}</span>
                                  <span>🏗️ {tower.name}</span>
                                  <span>📍 {floor.name}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    )
                  )
                )}
              </div>
            </div>

            {/* Resolved Section */}
            <div>
              <button className="flex items-center gap-2 text-[12px] font-semibold text-[#0f172a] mb-2 w-full">
                <ChevronDown className="w-4 h-4" />
                <span>Resolved ({getResolvedCount()})</span>
              </button>
            </div>

            {/* Incorrect Section */}
            <div>
              <button className="flex items-center gap-2 text-[12px] font-semibold text-[#0f172a] mb-2 w-full">
                <ChevronDown className="w-4 h-4" />
                <span>Incorrect (0)</span>
              </button>
            </div>
          </div>

          {/* Export Actions */}
          <div className="mt-6 pt-4 border-t border-[#e2e8f0]">
            <div className="text-[11px] text-[#64748b] mb-2">Export List</div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-[11px] text-[#2196F3] hover:text-[#1976d2] font-medium">
                <span>📧</span>
                Email
              </button>
              <button className="flex items-center gap-1 text-[11px] text-[#2196F3] hover:text-[#1976d2] font-medium">
                <span>📄</span>
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
