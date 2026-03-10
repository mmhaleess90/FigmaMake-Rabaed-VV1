import { useState } from "react";
import { X, Plus, MapPin, Clock, FileText, AlertTriangle, CheckCircle, Calendar, DollarSign, Users, TrendingUp } from "lucide-react";

interface Task {
  id: string;
  name: string;
  progress: number;
  daysToCompletion: number;
  lienWaiverStatus: "ready" | "pending" | "submitted";
  status: "completed" | "in-progress" | "at-risk" | "delayed" | "not-started";
  contractor: string;
  cost: number;
  startDate: string;
  priority: "high" | "medium" | "low";
}

interface Segment {
  id: string;
  name: string;
  station: string;
  stationFrom: number;
  stationTo: number;
  status: "completed" | "in-progress" | "at-risk" | "delayed" | "not-started";
  overallProgress: number;
  tasks: Task[];
  length: number; // in meters
  location: { lat: number; lng: number };
}

const mockSegments: Segment[] = [
  {
    id: "seg-1",
    name: "Segment A",
    station: "Sta 0+000 to 0+500",
    stationFrom: 0,
    stationTo: 500,
    status: "completed",
    overallProgress: 100,
    length: 500,
    location: { lat: 25.2048, lng: 55.2708 },
    tasks: [
      { id: "t1", name: "Clearing & Grubbing", progress: 100, daysToCompletion: 0, lienWaiverStatus: "submitted", status: "completed", contractor: "Al Futtaim Construction", cost: 125000, startDate: "2024-01-05", priority: "high" },
      { id: "t2", name: "Earthworks - Cut to Grade", progress: 100, daysToCompletion: 0, lienWaiverStatus: "submitted", status: "completed", contractor: "Al Futtaim Construction", cost: 450000, startDate: "2024-01-12", priority: "high" },
      { id: "t3", name: "Subgrade Preparation", progress: 100, daysToCompletion: 0, lienWaiverStatus: "ready", status: "completed", contractor: "Ground Engineering", cost: 180000, startDate: "2024-01-20", priority: "medium" },
      { id: "t4", name: "Granular Subbase (GSB) - 250mm", progress: 100, daysToCompletion: 0, lienWaiverStatus: "ready", status: "completed", contractor: "Dutco Construction", cost: 320000, startDate: "2024-02-01", priority: "high" },
      { id: "t5", name: "Dense Bituminous Macadam - 150mm", progress: 100, daysToCompletion: 0, lienWaiverStatus: "submitted", status: "completed", contractor: "Dutco Construction", cost: 285000, startDate: "2024-02-10", priority: "high" },
    ],
  },
  {
    id: "seg-2",
    name: "Segment B",
    station: "Sta 0+500 to 1+000",
    stationFrom: 500,
    stationTo: 1000,
    status: "completed",
    overallProgress: 100,
    length: 500,
    location: { lat: 25.2058, lng: 55.2718 },
    tasks: [
      { id: "t6", name: "Clearing & Grubbing", progress: 100, daysToCompletion: 0, lienWaiverStatus: "submitted", status: "completed", contractor: "Al Futtaim Construction", cost: 125000, startDate: "2024-01-08", priority: "high" },
      { id: "t7", name: "Earthworks - Embankment", progress: 100, daysToCompletion: 0, lienWaiverStatus: "submitted", status: "completed", contractor: "Al Futtaim Construction", cost: 520000, startDate: "2024-01-15", priority: "high" },
      { id: "t8", name: "Compaction Testing", progress: 100, daysToCompletion: 0, lienWaiverStatus: "ready", status: "completed", contractor: "Testing Lab", cost: 45000, startDate: "2024-01-25", priority: "medium" },
      { id: "t9", name: "Granular Subbase (GSB) - 250mm", progress: 100, daysToCompletion: 0, lienWaiverStatus: "submitted", status: "completed", contractor: "Dutco Construction", cost: 320000, startDate: "2024-02-05", priority: "high" },
      { id: "t10", name: "Dense Bituminous Macadam - 150mm", progress: 100, daysToCompletion: 0, lienWaiverStatus: "ready", status: "completed", contractor: "Dutco Construction", cost: 285000, startDate: "2024-02-14", priority: "high" },
    ],
  },
  {
    id: "seg-3",
    name: "Segment C",
    station: "Sta 1+000 to 1+500",
    stationFrom: 1000,
    stationTo: 1500,
    status: "in-progress",
    overallProgress: 75,
    length: 500,
    location: { lat: 25.2068, lng: 55.2728 },
    tasks: [
      { id: "t11", name: "Clearing & Grubbing", progress: 100, daysToCompletion: 0, lienWaiverStatus: "submitted", status: "completed", contractor: "Al Futtaim Construction", cost: 125000, startDate: "2024-01-10", priority: "high" },
      { id: "t12", name: "Earthworks - Cut & Fill", progress: 100, daysToCompletion: 0, lienWaiverStatus: "submitted", status: "completed", contractor: "Al Futtaim Construction", cost: 480000, startDate: "2024-01-18", priority: "high" },
      { id: "t13", name: "Granular Subbase (GSB) - 250mm", progress: 100, daysToCompletion: 0, lienWaiverStatus: "ready", status: "completed", contractor: "Dutco Construction", cost: 320000, startDate: "2024-02-08", priority: "high" },
      { id: "t14", name: "Dense Bituminous Macadam - 150mm", progress: 85, daysToCompletion: 3, lienWaiverStatus: "pending", status: "in-progress", contractor: "Dutco Construction", cost: 285000, startDate: "2024-02-18", priority: "high" },
      { id: "t15", name: "Asphalt Binder Course - 75mm", progress: 40, daysToCompletion: 8, lienWaiverStatus: "pending", status: "in-progress", contractor: "Dutco Construction", cost: 195000, startDate: "2024-02-24", priority: "medium" },
    ],
  },
  {
    id: "seg-4",
    name: "Segment D",
    station: "Sta 1+500 to 2+000",
    stationFrom: 1500,
    stationTo: 2000,
    status: "at-risk",
    overallProgress: 45,
    length: 500,
    location: { lat: 25.2078, lng: 55.2738 },
    tasks: [
      { id: "t16", name: "Clearing & Grubbing", progress: 100, daysToCompletion: 0, lienWaiverStatus: "submitted", status: "completed", contractor: "Al Futtaim Construction", cost: 125000, startDate: "2024-01-12", priority: "high" },
      { id: "t17", name: "Earthworks - Cut to Grade", progress: 100, daysToCompletion: 0, lienWaiverStatus: "ready", status: "completed", contractor: "Al Futtaim Construction", cost: 450000, startDate: "2024-01-22", priority: "high" },
      { id: "t18", name: "Subgrade Stabilization", progress: 80, daysToCompletion: 5, lienWaiverStatus: "pending", status: "at-risk", contractor: "Ground Engineering", cost: 220000, startDate: "2024-02-05", priority: "high" },
      { id: "t19", name: "Granular Subbase (GSB) - 250mm", progress: 25, daysToCompletion: 12, lienWaiverStatus: "pending", status: "at-risk", contractor: "Dutco Construction", cost: 320000, startDate: "2024-02-15", priority: "high" },
      { id: "t20", name: "Storm Water Culvert Installation", progress: 10, daysToCompletion: 18, lienWaiverStatus: "pending", status: "delayed", contractor: "Khansaheb Civil", cost: 385000, startDate: "2024-02-20", priority: "high" },
    ],
  },
  {
    id: "seg-5",
    name: "Segment E",
    station: "Sta 2+000 to 2+500",
    stationFrom: 2000,
    stationTo: 2500,
    status: "delayed",
    overallProgress: 15,
    length: 500,
    location: { lat: 25.2088, lng: 55.2748 },
    tasks: [
      { id: "t21", name: "Clearing & Grubbing", progress: 100, daysToCompletion: 0, lienWaiverStatus: "submitted", status: "completed", contractor: "Al Futtaim Construction", cost: 125000, startDate: "2024-01-15", priority: "high" },
      { id: "t22", name: "Unsuitable Material Removal", progress: 60, daysToCompletion: 8, lienWaiverStatus: "pending", status: "delayed", contractor: "Al Futtaim Construction", cost: 280000, startDate: "2024-01-28", priority: "high" },
      { id: "t23", name: "Ground Improvement Works", progress: 20, daysToCompletion: 15, lienWaiverStatus: "pending", status: "delayed", contractor: "Ground Engineering", cost: 420000, startDate: "2024-02-10", priority: "high" },
      { id: "t24", name: "Compaction Testing", progress: 0, daysToCompletion: 22, lienWaiverStatus: "pending", status: "not-started", contractor: "Testing Lab", cost: 45000, startDate: "2024-02-25", priority: "medium" },
      { id: "t25", name: "Granular Subbase (GSB) - 250mm", progress: 0, daysToCompletion: 30, lienWaiverStatus: "pending", status: "not-started", contractor: "Dutco Construction", cost: 320000, startDate: "2024-03-05", priority: "high" },
    ],
  },
  {
    id: "seg-6",
    name: "Segment F",
    station: "Sta 2+500 to 3+000",
    stationFrom: 2500,
    stationTo: 3000,
    status: "not-started",
    overallProgress: 0,
    length: 500,
    location: { lat: 25.2098, lng: 55.2758 },
    tasks: [
      { id: "t26", name: "Land Acquisition Pending", progress: 0, daysToCompletion: 45, lienWaiverStatus: "pending", status: "not-started", contractor: "RTA", cost: 0, startDate: "2024-03-01", priority: "high" },
      { id: "t27", name: "Survey & Staking", progress: 0, daysToCompletion: 50, lienWaiverStatus: "pending", status: "not-started", contractor: "Survey Team", cost: 35000, startDate: "2024-03-10", priority: "medium" },
      { id: "t28", name: "Clearing & Grubbing", progress: 0, daysToCompletion: 55, lienWaiverStatus: "pending", status: "not-started", contractor: "Al Futtaim Construction", cost: 125000, startDate: "2024-03-15", priority: "medium" },
    ],
  },
];

export function SegmentMapView() {
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [mapView, setMapView] = useState<"plan" | "profile">("plan");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "#10b981"; // Green
      case "in-progress": return "#3b82f6"; // Blue
      case "at-risk": return "#f59e0b"; // Amber
      case "delayed": return "#ef4444"; // Red
      case "not-started": return "#64748b"; // Slate
      default: return "#94a3b8";
    }
  };

  const getLienWaiverColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "submitted": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const handleSegmentClick = (segment: Segment) => {
    setSelectedSegment(segment);
  };

  const totalCost = selectedSegment?.tasks.reduce((sum, task) => sum + task.cost, 0) || 0;
  const completedTasks = selectedSegment?.tasks.filter(t => t.status === "completed").length || 0;
  const totalTasks = selectedSegment?.tasks.length || 0;

  return (
    <div className="h-full flex flex-col bg-[#0f172a]">
      {/* Top Controls Bar */}
      <div className="bg-[#1e293b] border-b border-[#334155] px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-[18px] font-bold text-white">Sheikh Mohammed Bin Zayed Highway - Phase 3</h1>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <MapPin className="w-3 h-3" />
            <span>Dubai, UAE</span>
            <span className="mx-2">•</span>
            <span>Total Length: 3.0 km</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-[#0f172a] rounded-md p-1">
            <button
              onClick={() => setMapView("plan")}
              className={`px-3 py-1.5 text-[11px] font-medium rounded transition-colors ${
                mapView === "plan" ? "bg-[#F2994A] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Plan View
            </button>
            <button
              onClick={() => setMapView("profile")}
              className={`px-3 py-1.5 text-[11px] font-medium rounded transition-colors ${
                mapView === "profile" ? "bg-[#F2994A] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Profile View
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#F2994A] text-white rounded-md text-[12px] font-medium hover:bg-[#e08a3a] transition-colors">
            <Plus className="w-4 h-4" />
            Add Field Report
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Map Canvas */}
        <div className="flex-1 bg-[#0f172a] p-6 overflow-auto">
          <div className="bg-[#1e293b] rounded-lg border border-[#334155] p-6 min-h-full">
            {/* Map Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[16px] font-bold text-white mb-1">Highway Alignment - Segment Map</h2>
                <p className="text-[11px] text-slate-400">Click on any segment to view detailed tasks</p>
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-4 text-[10px]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: "#10b981" }}></div>
                  <span className="text-slate-400">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: "#3b82f6" }}></div>
                  <span className="text-slate-400">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: "#f59e0b" }}></div>
                  <span className="text-slate-400">At Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: "#ef4444" }}></div>
                  <span className="text-slate-400">Delayed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: "#64748b" }}></div>
                  <span className="text-slate-400">Not Started</span>
                </div>
              </div>
            </div>

            {/* SVG Map */}
            <div className="relative bg-[#0f172a] rounded-lg p-8 border border-[#334155]">
              <svg viewBox="0 0 1200 600" className="w-full h-[600px]">
                {/* Grid Background */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="1200" height="600" fill="url(#grid)" />

                {/* Station Markers - Top */}
                {mockSegments.map((segment, index) => (
                  <g key={`marker-top-${segment.id}`}>
                    <line
                      x1={150 + index * 175}
                      y1={80}
                      x2={150 + index * 175}
                      y2={100}
                      stroke="#475569"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <text
                      x={150 + index * 175}
                      y={70}
                      fill="#94a3b8"
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {segment.stationFrom / 100}+{String(segment.stationFrom % 100).padStart(3, '0')}
                    </text>
                  </g>
                ))}
                {/* Last station marker */}
                <line x1={150 + mockSegments.length * 175} y1={80} x2={150 + mockSegments.length * 175} y2={100} stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />
                <text x={150 + mockSegments.length * 175} y={70} fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  3+000
                </text>

                {/* Highway Segments */}
                {mockSegments.map((segment, index) => {
                  const x = 150 + index * 175;
                  const width = 170;
                  const isHovered = hoveredSegment === segment.id;
                  const isSelected = selectedSegment?.id === segment.id;
                  
                  return (
                    <g key={segment.id}>
                      {/* Left Shoulder */}
                      <rect
                        x={x}
                        y={100}
                        width={width}
                        height={20}
                        fill="#475569"
                        opacity={0.6}
                      />

                      {/* Lane 1 */}
                      <rect
                        x={x}
                        y={122}
                        width={width}
                        height={50}
                        fill={getStatusColor(segment.status)}
                        opacity={isHovered || isSelected ? 1 : 0.9}
                        stroke={isSelected ? "#F2994A" : isHovered ? "#ffffff" : "transparent"}
                        strokeWidth={isSelected ? "3" : isHovered ? "2" : "0"}
                        className="cursor-pointer transition-all"
                        onClick={() => handleSegmentClick(segment)}
                        onMouseEnter={() => setHoveredSegment(segment.id)}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />

                      {/* Center Line */}
                      <rect
                        x={x}
                        y={174}
                        width={width}
                        height={4}
                        fill="#fbbf24"
                      />
                      <pattern id={`dashes-${index}`} patternUnits="userSpaceOnUse" width="20" height="4">
                        <rect width="10" height="4" fill="#fbbf24"/>
                        <rect x="10" width="10" height="4" fill="transparent"/>
                      </pattern>
                      <rect
                        x={x}
                        y={174}
                        width={width}
                        height={4}
                        fill={`url(#dashes-${index})`}
                      />

                      {/* Lane 2 */}
                      <rect
                        x={x}
                        y={178}
                        width={width}
                        height={50}
                        fill={getStatusColor(segment.status)}
                        opacity={isHovered || isSelected ? 1 : 0.9}
                        stroke={isSelected ? "#F2994A" : isHovered ? "#ffffff" : "transparent"}
                        strokeWidth={isSelected ? "3" : isHovered ? "2" : "0"}
                        className="cursor-pointer transition-all"
                        onClick={() => handleSegmentClick(segment)}
                        onMouseEnter={() => setHoveredSegment(segment.id)}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />

                      {/* Lane 3 */}
                      <rect
                        x={x}
                        y={230}
                        width={width}
                        height={50}
                        fill={getStatusColor(segment.status)}
                        opacity={isHovered || isSelected ? 1 : 0.9}
                        stroke={isSelected ? "#F2994A" : isHovered ? "#ffffff" : "transparent"}
                        strokeWidth={isSelected ? "3" : isHovered ? "2" : "0"}
                        className="cursor-pointer transition-all"
                        onClick={() => handleSegmentClick(segment)}
                        onMouseEnter={() => setHoveredSegment(segment.id)}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />

                      {/* Right Shoulder */}
                      <rect
                        x={x}
                        y={282}
                        width={width}
                        height={20}
                        fill="#475569"
                        opacity={0.6}
                      />

                      {/* Segment Label & Progress */}
                      <rect
                        x={x + 10}
                        y={315}
                        width={width - 20}
                        height={55}
                        fill="#1e293b"
                        stroke="#334155"
                        strokeWidth="1"
                        rx="4"
                      />
                      <text
                        x={x + width / 2}
                        y={332}
                        fill="white"
                        fontSize="12"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {segment.name}
                      </text>
                      <text
                        x={x + width / 2}
                        y={347}
                        fill="#94a3b8"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {segment.station}
                      </text>
                      
                      {/* Progress Bar */}
                      <rect
                        x={x + 20}
                        y={355}
                        width={width - 40}
                        height={8}
                        fill="#0f172a"
                        rx="4"
                      />
                      <rect
                        x={x + 20}
                        y={355}
                        width={(width - 40) * (segment.overallProgress / 100)}
                        height={8}
                        fill="#F2994A"
                        rx="4"
                      />
                      <text
                        x={x + width / 2}
                        y={369}
                        fill="#94a3b8"
                        fontSize="8"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        {segment.overallProgress}%
                      </text>

                      {/* Hover Tooltip */}
                      {isHovered && !isSelected && (
                        <g>
                          <rect
                            x={x + width / 2 - 70}
                            y={40}
                            width="140"
                            height="50"
                            fill="#1e293b"
                            stroke="#F2994A"
                            strokeWidth="2"
                            rx="6"
                            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                          />
                          <text x={x + width / 2} y={57} fill="white" fontSize="11" fontWeight="600" textAnchor="middle">
                            {segment.name}
                          </text>
                          <text x={x + width / 2} y={70} fill="#94a3b8" fontSize="9" textAnchor="middle">
                            Progress: {segment.overallProgress}%
                          </text>
                          <text x={x + width / 2} y={82} fill="#94a3b8" fontSize="9" textAnchor="middle">
                            Tasks: {segment.tasks.length}
                          </text>
                        </g>
                      )}

                      {/* Selected Indicator */}
                      {isSelected && (
                        <g>
                          <circle
                            cx={x + width / 2}
                            cy={200}
                            r="20"
                            fill="#F2994A"
                            opacity="0.2"
                          >
                            <animate attributeName="r" from="15" to="25" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                          </circle>
                          <circle
                            cx={x + width / 2}
                            cy={200}
                            r="12"
                            fill="#F2994A"
                            stroke="white"
                            strokeWidth="2"
                          />
                          <text
                            x={x + width / 2}
                            y={205}
                            fill="white"
                            fontSize="10"
                            fontWeight="700"
                            textAnchor="middle"
                          >
                            ✓
                          </text>
                        </g>
                      )}

                      {/* Vertical separator */}
                      {index < mockSegments.length - 1 && (
                        <line
                          x1={x + width + 2.5}
                          y1={100}
                          x2={x + width + 2.5}
                          y2={302}
                          stroke="#334155"
                          strokeWidth="1"
                          strokeDasharray="4,4"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Station Markers - Bottom */}
                {mockSegments.map((segment, index) => (
                  <g key={`marker-bottom-${segment.id}`}>
                    <line
                      x1={150 + index * 175}
                      y1={302}
                      x2={150 + index * 175}
                      y2={320}
                      stroke="#475569"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  </g>
                ))}
                <line x1={150 + mockSegments.length * 175} y1={302} x2={150 + mockSegments.length * 175} y2={320} stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />

                {/* Scale Bar */}
                <g>
                  <line x1="60" y1="530" x2="160" y2="530" stroke="#F2994A" strokeWidth="2"/>
                  <line x1="60" y1="525" x2="60" y2="535" stroke="#F2994A" strokeWidth="2"/>
                  <line x1="160" y1="525" x2="160" y2="535" stroke="#F2994A" strokeWidth="2"/>
                  <text x="110" y="550" fill="#94a3b8" fontSize="10" textAnchor="middle">100m</text>
                </g>

                {/* North Arrow */}
                <g>
                  <polygon points="1150,80 1160,100 1150,95 1140,100" fill="#F2994A"/>
                  <text x="1150" y="120" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="600">N</text>
                </g>
              </svg>
            </div>

            {/* Summary Stats Below Map */}
            <div className="mt-6 grid grid-cols-5 gap-4">
              {mockSegments.map((segment) => (
                <div
                  key={segment.id}
                  className={`bg-[#0f172a] rounded-lg border p-3 cursor-pointer transition-all ${
                    selectedSegment?.id === segment.id 
                      ? "border-[#F2994A] shadow-lg shadow-[#F2994A]/20" 
                      : "border-[#334155] hover:border-[#475569]"
                  }`}
                  onClick={() => handleSegmentClick(segment)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-white">{segment.name}</span>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getStatusColor(segment.status) }}></div>
                  </div>
                  <div className="text-[9px] text-slate-400 mb-1">{segment.station}</div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Tasks:</span>
                    <span className="text-white font-semibold">{segment.tasks.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Segment Detail Panel */}
        {selectedSegment && (
          <div className="w-[480px] bg-[#1e293b] border-l border-[#334155] flex flex-col overflow-hidden animate-slide-in-right">
            {/* Sidebar Header */}
            <div className="bg-[#0f172a] px-6 py-4 border-b border-[#334155] flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-[16px] font-bold text-white">{selectedSegment.name}</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">{selectedSegment.station}</p>
              </div>
              <button
                onClick={() => setSelectedSegment(null)}
                className="p-2 hover:bg-[#1e293b] rounded transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Summary Cards */}
            <div className="px-6 py-4 border-b border-[#334155] bg-[#0f172a] flex-shrink-0">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#1e293b] rounded-lg border border-[#334155] p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#F2994A]" />
                    <span className="text-[9px] text-slate-400 uppercase tracking-wide">Progress</span>
                  </div>
                  <div className="text-[20px] font-bold text-white">{selectedSegment.overallProgress}%</div>
                </div>
                <div className="bg-[#1e293b] rounded-lg border border-[#334155] p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[9px] text-slate-400 uppercase tracking-wide">Tasks</span>
                  </div>
                  <div className="text-[20px] font-bold text-white">{completedTasks}/{totalTasks}</div>
                </div>
                <div className="bg-[#1e293b] rounded-lg border border-[#334155] p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[9px] text-slate-400 uppercase tracking-wide">Value</span>
                  </div>
                  <div className="text-[16px] font-bold text-white">${(totalCost / 1000).toFixed(0)}k</div>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[13px] font-semibold text-white">Segment Tasks</h3>
                <span className="text-[10px] text-slate-400">{selectedSegment.tasks.length} tasks total</span>
              </div>

              <div className="space-y-3">
                {selectedSegment.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#0f172a] rounded-lg border border-[#334155] p-4 hover:border-[#475569] transition-all"
                  >
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-[12px] font-semibold text-white mb-1">{task.name}</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Users className="w-3 h-3" />
                            {task.contractor}
                          </div>
                          <div className={`px-2 py-0.5 rounded text-[9px] font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] text-slate-400 uppercase tracking-wide">Progress</span>
                        <span className="text-[11px] font-semibold text-white">{task.progress}%</span>
                      </div>
                      <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${task.progress}%`,
                            backgroundColor: task.progress === 100 ? "#10b981" : task.progress >= 75 ? "#3b82f6" : task.progress >= 50 ? "#f59e0b" : "#ef4444"
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Task Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-[#1e293b] rounded p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-[8px] text-slate-400 uppercase">Days Left</span>
                        </div>
                        <div className={`text-[13px] font-bold ${
                          task.daysToCompletion === 0 ? "text-emerald-500" :
                          task.daysToCompletion <= 5 ? "text-amber-500" :
                          task.daysToCompletion <= 10 ? "text-blue-500" :
                          "text-slate-400"
                        }`}>
                          {task.daysToCompletion}
                        </div>
                      </div>
                      <div className="bg-[#1e293b] rounded p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <DollarSign className="w-3 h-3 text-slate-400" />
                          <span className="text-[8px] text-slate-400 uppercase">Cost</span>
                        </div>
                        <div className="text-[13px] font-bold text-white">
                          ${(task.cost / 1000).toFixed(0)}k
                        </div>
                      </div>
                      <div className="bg-[#1e293b] rounded p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span className="text-[8px] text-slate-400 uppercase">Start</span>
                        </div>
                        <div className="text-[10px] font-semibold text-white">
                          {new Date(task.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    {/* Lien Waiver Status Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-400 uppercase tracking-wide">Lien Waiver</span>
                      <div className={`px-2.5 py-1 rounded border text-[10px] font-semibold ${getLienWaiverColor(task.lienWaiverStatus)}`}>
                        {task.lienWaiverStatus === "ready" && "✓ Ready"}
                        {task.lienWaiverStatus === "pending" && "⏳ Pending"}
                        {task.lienWaiverStatus === "submitted" && "✓ Submitted"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Footer Actions */}
            <div className="px-6 py-4 border-t border-[#334155] bg-[#0f172a] flex-shrink-0">
              <div className="flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F2994A] text-white rounded-md text-[12px] font-semibold hover:bg-[#e08a3a] transition-colors">
                  <FileText className="w-4 h-4" />
                  Generate Report
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1e293b] text-white border border-[#334155] rounded-md text-[12px] font-semibold hover:bg-[#334155] transition-colors">
                  <AlertTriangle className="w-4 h-4" />
                  Log Issue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
