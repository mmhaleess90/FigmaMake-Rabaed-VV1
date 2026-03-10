import { useState } from "react";
import { Layers, Eye, AlertCircle, CheckCircle, Clock, Ruler } from "lucide-react";

interface VisualSection {
  chainage: string;
  length: number;
  status: "complete" | "in-progress" | "issue" | "pending" | "testing";
  workPackage: string;
  activities: string[];
}

interface RoadVisualViewProps {
  projectType: "highway" | "flyover" | "interchange";
  projectName: string;
}

export function RoadVisualView({ projectType, projectName }: RoadVisualViewProps) {
  const [viewMode, setViewMode] = useState<"plan" | "elevation" | "cross-section">("plan");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Highway data - 10km total
  const highwaySections: VisualSection[] = [
    { chainage: "0+000 - 1+000", length: 1000, status: "complete", workPackage: "Earthworks", activities: ["Site Clearance", "Excavation", "Compaction"] },
    { chainage: "1+000 - 2+000", length: 1000, status: "complete", workPackage: "Earthworks", activities: ["Embankment Fill", "Compaction"] },
    { chainage: "2+000 - 3+000", length: 1000, status: "in-progress", workPackage: "Earthworks", activities: ["Cut & Fill ongoing"] },
    { chainage: "3+000 - 4+000", length: 1000, status: "complete", workPackage: "Pavement", activities: ["Subbase Complete", "Base Course Complete"] },
    { chainage: "4+000 - 5+000", length: 1000, status: "in-progress", workPackage: "Pavement", activities: ["Base Course 70%"] },
    { chainage: "5+000 - 6+000", length: 1000, status: "pending", workPackage: "Pavement", activities: ["Not Started"] },
    { chainage: "6+000 - 7+000", length: 1000, status: "pending", workPackage: "Earthworks", activities: ["Land Acquisition Pending"] },
    { chainage: "7+000 - 8+000", length: 1000, status: "pending", workPackage: "Not Started", activities: [] },
    { chainage: "8+000 - 9+000", length: 1000, status: "pending", workPackage: "Not Started", activities: [] },
    { chainage: "9+000 - 10+000", length: 1000, status: "pending", workPackage: "Not Started", activities: [] },
  ];

  // Flyover data - piers and spans
  const flyoverPiers = [
    { id: "P1", position: 0, chainage: "0+000", status: "complete", activities: ["Foundation", "Pier", "Pier Head"] },
    { id: "P2", position: 50, chainage: "0+050", status: "in-progress", activities: ["Foundation Complete", "Pier 60%"] },
    { id: "P3", position: 100, chainage: "0+100", status: "in-progress", activities: ["Foundation ongoing"] },
    { id: "P4", position: 150, chainage: "0+150", status: "pending", activities: ["Not Started"] },
    { id: "P5", position: 200, chainage: "0+200", status: "pending", activities: ["Not Started"] },
    { id: "P6", position: 250, chainage: "0+250", status: "pending", activities: ["Not Started"] },
  ];

  const flyoverSpans = [
    { id: "S1", from: 0, to: 50, status: "complete", activities: ["Girders Installed", "Deck Complete", "Waterproofing"] },
    { id: "S2", from: 50, to: 100, status: "in-progress", activities: ["Girders 60%"] },
    { id: "S3", from: 100, to: 150, status: "pending", activities: ["Not Started"] },
    { id: "S4", from: 150, to: 200, status: "pending", activities: ["Not Started"] },
    { id: "S5", from: 200, to: 250, status: "pending", activities: ["Not Started"] },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "#34d399";
      case "in-progress": return "#60a5fa";
      case "issue": return "#f87171";
      case "testing": return "#fbbf24";
      case "pending": return "#cbd5e1";
      default: return "#e2e8f0";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "complete": return "Complete";
      case "in-progress": return "In Progress";
      case "issue": return "Issue";
      case "testing": return "Testing";
      case "pending": return "Pending";
      default: return "Unknown";
    }
  };

  // Highway Plan View
  const renderHighwayPlan = () => {
    return (
      <div className="relative">
        {/* Title and Scale */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-[#0f172a]">Plan View - Highway Alignment</h3>
            <p className="text-[11px] text-[#64748b] mt-1">Total Length: 10.0 km | Scale: 1:10000</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
            <Ruler className="w-4 h-4" />
            <span>100m per division</span>
          </div>
        </div>

        {/* Road visualization */}
        <div className="bg-white rounded-lg border-2 border-[#e2e8f0] p-8 overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Chainage markers - top */}
            <div className="flex mb-2">
              {highwaySections.map((section, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="text-[9px] text-[#64748b] font-mono">{section.chainage.split(" - ")[0]}</div>
                </div>
              ))}
              <div className="w-[100px] text-center">
                <div className="text-[9px] text-[#64748b] font-mono">10+000</div>
              </div>
            </div>

            {/* Road lanes */}
            <div className="relative">
              {/* Left shoulder */}
              <div className="flex mb-1">
                {highwaySections.map((section, index) => (
                  <div
                    key={`shoulder-l-${index}`}
                    className="flex-1 h-[20px] border-r border-white"
                    style={{ backgroundColor: "#94a3b8" }}
                  />
                ))}
              </div>

              {/* Lane 1 */}
              <div className="flex mb-[2px]">
                {highwaySections.map((section, index) => (
                  <div
                    key={`lane1-${index}`}
                    className="flex-1 h-[40px] border-r border-white cursor-pointer transition-all relative group"
                    style={{ backgroundColor: getStatusColor(section.status) }}
                    onClick={() => setSelectedSection(section.chainage)}
                    onMouseEnter={() => setHoveredSection(section.chainage)}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    {/* Tooltip */}
                    {hoveredSection === section.chainage && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap z-10 shadow-lg">
                        <div className="font-semibold mb-1">{section.chainage}</div>
                        <div className="text-gray-300">Status: {getStatusLabel(section.status)}</div>
                        <div className="text-gray-300">Package: {section.workPackage}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Center marking - dashed line */}
              <div className="flex mb-[2px]">
                {highwaySections.map((section, index) => (
                  <div
                    key={`center-${index}`}
                    className="flex-1 h-[3px] border-r-4 border-white"
                    style={{ backgroundColor: "#fbbf24", backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 10px, white 10px, white 20px)" }}
                  />
                ))}
              </div>

              {/* Lane 2 */}
              <div className="flex mb-[2px]">
                {highwaySections.map((section, index) => (
                  <div
                    key={`lane2-${index}`}
                    className="flex-1 h-[40px] border-r border-white cursor-pointer transition-all"
                    style={{ backgroundColor: getStatusColor(section.status) }}
                    onClick={() => setSelectedSection(section.chainage)}
                    onMouseEnter={() => setHoveredSection(section.chainage)}
                    onMouseLeave={() => setHoveredSection(null)}
                  />
                ))}
              </div>

              {/* Lane 3 */}
              <div className="flex mb-1">
                {highwaySections.map((section, index) => (
                  <div
                    key={`lane3-${index}`}
                    className="flex-1 h-[40px] border-r border-white cursor-pointer transition-all"
                    style={{ backgroundColor: getStatusColor(section.status) }}
                    onClick={() => setSelectedSection(section.chainage)}
                    onMouseEnter={() => setHoveredSection(section.chainage)}
                    onMouseLeave={() => setHoveredSection(null)}
                  />
                ))}
              </div>

              {/* Right shoulder */}
              <div className="flex">
                {highwaySections.map((section, index) => (
                  <div
                    key={`shoulder-r-${index}`}
                    className="flex-1 h-[20px] border-r border-white"
                    style={{ backgroundColor: "#94a3b8" }}
                  />
                ))}
              </div>

              {/* Issue markers */}
              {highwaySections.map((section, index) => {
                if (section.status === "issue") {
                  return (
                    <div
                      key={`marker-${index}`}
                      className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse"
                      style={{ left: `${(index * 100) / highwaySections.length}%` }}
                    >
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Chainage markers - bottom with work package labels */}
            <div className="flex mt-3">
              {highwaySections.map((section, index) => (
                <div key={index} className="flex-1 text-center border-r border-[#e2e8f0] px-1">
                  <div className="text-[10px] font-semibold text-[#0f172a]">{section.workPackage}</div>
                  <div className="text-[9px] text-[#64748b] mt-0.5">{getStatusLabel(section.status)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-[11px]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor("complete") }}></div>
            <span className="text-[#64748b]">Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor("in-progress") }}></div>
            <span className="text-[#64748b]">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor("issue") }}></div>
            <span className="text-[#64748b]">Issue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor("testing") }}></div>
            <span className="text-[#64748b]">Testing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor("pending") }}></div>
            <span className="text-[#64748b]">Pending</span>
          </div>
        </div>
      </div>
    );
  };

  // Highway Cross-Section View
  const renderHighwayCrossSection = () => {
    const selectedData = selectedSection 
      ? highwaySections.find(s => s.chainage === selectedSection) 
      : highwaySections[0];

    return (
      <div className="relative">
        <div className="mb-6">
          <h3 className="text-[16px] font-bold text-[#0f172a]">Cross-Section View</h3>
          <p className="text-[11px] text-[#64748b] mt-1">
            {selectedData ? `Chainage: ${selectedData.chainage}` : "Select a section from plan view"}
          </p>
        </div>

        <div className="bg-white rounded-lg border-2 border-[#e2e8f0] p-8">
          <div className="max-w-[800px] mx-auto">
            {/* Cross section drawing */}
            <div className="relative">
              {/* Natural ground line */}
              <svg viewBox="0 0 800 500" className="w-full h-[400px]">
                {/* Ground */}
                <path d="M 0 250 Q 200 240 400 250 T 800 250 L 800 500 L 0 500 Z" fill="#8B7355" opacity="0.3" />
                <text x="50" y="270" fontSize="10" fill="#64748b">Natural Ground</text>

                {/* Subgrade */}
                <rect x="150" y="250" width="500" height="20" fill="#D2691E" />
                <text x="680" y="265" fontSize="10" fill="#0f172a" fontWeight="600">Subgrade</text>

                {/* Subbase (GSB) - 250mm */}
                <rect x="150" y="230" width="500" height="20" fill="#A0522D" />
                <text x="680" y="245" fontSize="10" fill="#0f172a" fontWeight="600">Subbase - 250mm GSB</text>
                <line x1="655" y1="240" x2="675" y2="240" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />

                {/* Base Course (DBM) - 150mm */}
                <rect x="150" y="215" width="500" height="15" fill="#696969" />
                <text x="680" y="225" fontSize="10" fill="#0f172a" fontWeight="600">Base Course - 150mm DBM</text>
                <line x1="655" y1="222" x2="675" y2="222" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />

                {/* Binder Course - 75mm */}
                <rect x="150" y="207" width="500" height="8" fill="#2F4F4F" />
                <text x="680" y="213" fontSize="10" fill="#0f172a" fontWeight="600">Binder Course - 75mm</text>
                <line x1="655" y1="211" x2="675" y2="211" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />

                {/* Wearing Course - 50mm (asphalt) */}
                <rect x="150" y="202" width="500" height="5" fill="#1a1a1a" />
                <text x="680" y="206" fontSize="10" fill="#0f172a" fontWeight="600">Wearing Course - 50mm</text>
                <line x1="655" y1="204" x2="675" y2="204" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />

                {/* Road surface markings */}
                <line x1="250" y1="202" x2="270" y2="202" stroke="#fbbf24" strokeWidth="2" />
                <line x1="290" y1="202" x2="310" y2="202" stroke="#fbbf24" strokeWidth="2" />
                <line x1="330" y1="202" x2="350" y2="202" stroke="#fbbf24" strokeWidth="2" />
                <line x1="370" y1="202" x2="390" y2="202" stroke="#fbbf24" strokeWidth="2" />
                <line x1="410" y1="202" x2="430" y2="202" stroke="#fbbf24" strokeWidth="2" />
                <line x1="450" y1="202" x2="470" y2="202" stroke="#fbbf24" strokeWidth="2" />
                <line x1="490" y1="202" x2="510" y2="202" stroke="#fbbf24" strokeWidth="2" />
                <line x1="530" y1="202" x2="550" y2="202" stroke="#fbbf24" strokeWidth="2" />

                {/* Side drains */}
                <polygon points="120,270 150,250 150,270" fill="#4169E1" opacity="0.5" />
                <polygon points="650,250 680,270 650,270" fill="#4169E1" opacity="0.5" />
                <text x="100" y="285" fontSize="9" fill="#2196F3">Drain</text>
                <text x="660" y="285" fontSize="9" fill="#2196F3">Drain</text>

                {/* Dimension lines */}
                <line x1="150" y1="290" x2="650" y2="290" stroke="#ff5e3a" strokeWidth="1" />
                <line x1="150" y1="285" x2="150" y2="295" stroke="#ff5e3a" strokeWidth="1" />
                <line x1="650" y1="285" x2="650" y2="295" stroke="#ff5e3a" strokeWidth="1" />
                <text x="380" y="305" fontSize="11" fill="#ff5e3a" fontWeight="600" textAnchor="middle">
                  Carriageway Width: 12.0m (3 lanes × 4.0m)
                </text>

                {/* Total pavement thickness */}
                <line x1="140" y1="270" x2="140" y2="202" stroke="#10b981" strokeWidth="2" />
                <line x1="135" y1="270" x2="145" y2="270" stroke="#10b981" strokeWidth="2" />
                <line x1="135" y1="202" x2="145" y2="202" stroke="#10b981" strokeWidth="2" />
                <text x="100" y="235" fontSize="10" fill="#10b981" fontWeight="600" transform="rotate(-90 100 235)">
                  Total: 500mm
                </text>

                {/* Status indicator */}
                {selectedData && (
                  <g>
                    <rect x="20" y="20" width="150" height="60" fill="white" stroke="#e2e8f0" strokeWidth="2" rx="4" />
                    <text x="30" y="40" fontSize="11" fill="#64748b">Section Status:</text>
                    <circle cx="40" cy="60" r="8" fill={getStatusColor(selectedData.status)} />
                    <text x="55" y="65" fontSize="12" fill="#0f172a" fontWeight="600">
                      {getStatusLabel(selectedData.status)}
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Layer specifications */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-[11px]">
              <div className="bg-[#f8fafc] rounded p-3 border border-[#e2e8f0]">
                <div className="font-semibold text-[#0f172a] mb-2">Pavement Layers</div>
                <div className="space-y-1 text-[#64748b]">
                  <div>• Wearing Course: 50mm AC</div>
                  <div>• Binder Course: 75mm AC</div>
                  <div>• Base Course: 150mm DBM</div>
                  <div>• Sub-base: 250mm GSB</div>
                  <div className="font-semibold text-[#0f172a] mt-2">Total: 500mm</div>
                </div>
              </div>
              <div className="bg-[#f8fafc] rounded p-3 border border-[#e2e8f0]">
                <div className="font-semibold text-[#0f172a] mb-2">Design Standards</div>
                <div className="space-y-1 text-[#64748b]">
                  <div>• AASHTO Pavement Design</div>
                  <div>• RTA UAE Specifications</div>
                  <div>• Subgrade CBR: ≥ 5%</div>
                  <div>• Compaction: 95% minimum</div>
                  <div>• Design Life: 20 years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Flyover Elevation View
  const renderFlyoverElevation = () => {
    return (
      <div className="relative">
        <div className="mb-6">
          <h3 className="text-[16px] font-bold text-[#0f172a]">Elevation View - Flyover Structure</h3>
          <p className="text-[11px] text-[#64748b] mt-1">Total Length: 2.5 km | Typical Span: 50m</p>
        </div>

        <div className="bg-white rounded-lg border-2 border-[#e2e8f0] p-8 overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Elevation drawing */}
            <svg viewBox="0 0 1200 600" className="w-full h-[500px]">
              {/* Ground line */}
              <path d="M 0 500 Q 200 490 400 500 T 800 500 T 1200 500" stroke="#8B7355" strokeWidth="2" fill="none" />
              <rect x="0" y="500" width="1200" height="100" fill="#8B7355" opacity="0.2" />

              {/* Piers */}
              {flyoverPiers.map((pier, index) => {
                const x = 100 + index * 200;
                const pierHeight = 300;
                const pierColor = getStatusColor(pier.status);

                return (
                  <g key={pier.id}>
                    {/* Pile foundation (underground) */}
                    <rect
                      x={x - 15}
                      y={500}
                      width="30"
                      height="60"
                      fill={pierColor}
                      opacity="0.5"
                      stroke="#64748b"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    />

                    {/* Pile cap */}
                    <rect x={x - 30} y={485} width="60" height="15" fill={pierColor} stroke="#334155" strokeWidth="2" />

                    {/* Pier column */}
                    <rect x={x - 20} y={200} width="40" height={285} fill={pierColor} stroke="#334155" strokeWidth="2" />

                    {/* Pier head (hammerhead) */}
                    <polygon
                      points={`${x - 50},200 ${x + 50},200 ${x + 40},180 ${x - 40},180`}
                      fill={pierColor}
                      stroke="#334155"
                      strokeWidth="2"
                    />

                    {/* Pier label */}
                    <text x={x} y={530} fontSize="12" fill="#0f172a" fontWeight="600" textAnchor="middle">
                      {pier.id}
                    </text>
                    <text x={x} y="545" fontSize="9" fill="#64748b" textAnchor="middle">
                      {pier.chainage}
                    </text>

                    {/* Status indicator */}
                    <circle cx={x} cy={350} r="8" fill={pierColor} stroke="white" strokeWidth="2" />

                    {/* Hover tooltip area */}
                    <rect
                      x={x - 50}
                      y={180}
                      width="100"
                      height={320}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={(e) => {
                        const tooltip = document.getElementById(`tooltip-${pier.id}`);
                        if (tooltip) tooltip.style.display = "block";
                      }}
                      onMouseLeave={(e) => {
                        const tooltip = document.getElementById(`tooltip-${pier.id}`);
                        if (tooltip) tooltip.style.display = "none";
                      }}
                    />

                    {/* Tooltip */}
                    <g id={`tooltip-${pier.id}`} style={{ display: "none" }}>
                      <rect x={x + 60} y={250} width="150" height="80" fill="#1f2937" rx="4" opacity="0.95" />
                      <text x={x + 70} y={270} fontSize="11" fill="white" fontWeight="600">
                        Pier {pier.id}
                      </text>
                      <text x={x + 70} y={285} fontSize="9" fill="#d1d5db">
                        Status: {getStatusLabel(pier.status)}
                      </text>
                      {pier.activities.map((activity, i) => (
                        <text key={i} x={x + 70} y={300 + i * 12} fontSize="8" fill="#d1d5db">
                          • {activity}
                        </text>
                      ))}
                    </g>
                  </g>
                );
              })}

              {/* Deck spans */}
              {flyoverSpans.map((span, index) => {
                const x1 = 100 + span.from * 2;
                const x2 = 100 + span.to * 2;
                const spanColor = getStatusColor(span.status);

                return (
                  <g key={span.id}>
                    {/* Girders (5 girders per span) */}
                    {[0, 1, 2, 3, 4].map((girderIndex) => (
                      <line
                        key={girderIndex}
                        x1={x1}
                        y1={175 + girderIndex * 2}
                        x2={x2}
                        y2={175 + girderIndex * 2}
                        stroke={spanColor}
                        strokeWidth="3"
                      />
                    ))}

                    {/* Deck slab */}
                    <rect x={x1} y={165} width={x2 - x1} height="10" fill={spanColor} opacity="0.8" />

                    {/* Parapet/barrier */}
                    <rect x={x1} y={155} width={x2 - x1} height="4" fill="#64748b" />
                    <rect x={x1} y={185} width={x2 - x1} height="4" fill="#64748b" />

                    {/* Road surface */}
                    <rect x={x1} y={165} width={x2 - x1} height="2" fill="#1a1a1a" />

                    {/* Span label */}
                    <text x={(x1 + x2) / 2} y="150" fontSize="10" fill="#0f172a" fontWeight="600" textAnchor="middle">
                      {span.id}
                    </text>
                    <text x={(x1 + x2) / 2} y="140" fontSize="8" fill="#64748b" textAnchor="middle">
                      {getStatusLabel(span.status)}
                    </text>
                  </g>
                );
              })}

              {/* Dimension lines */}
              <line x1="100" y1="570" x2="300" y2="570" stroke="#ff5e3a" strokeWidth="1" />
              <line x1="100" y1="565" x2="100" y2="575" stroke="#ff5e3a" strokeWidth="1" />
              <line x1="300" y1="565" x2="300" y2="575" stroke="#ff5e3a" strokeWidth="1" />
              <text x="200" y="590" fontSize="11" fill="#ff5e3a" fontWeight="600" textAnchor="middle">
                Typical Span: 50m
              </text>

              {/* Height dimension */}
              <line x1="50" y1="500" x2="50" y2="200" stroke="#10b981" strokeWidth="2" />
              <line x1="45" y1="500" x2="55" y2="500" stroke="#10b981" strokeWidth="2" />
              <line x1="45" y1="200" x2="55" y2="200" stroke="#10b981" strokeWidth="2" />
              <text x="30" y="350" fontSize="11" fill="#10b981" fontWeight="600" transform="rotate(-90 30 350)">
                Pier Height: 12m
              </text>
            </svg>

            {/* Legend and info */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-[11px]">
              <div className="bg-[#f8fafc] rounded p-3 border border-[#e2e8f0]">
                <div className="font-semibold text-[#0f172a] mb-2">Foundation</div>
                <div className="space-y-1 text-[#64748b]">
                  <div>• Type: Bored Piles</div>
                  <div>• Diameter: 1200mm</div>
                  <div>• Quantity: 8 per pier</div>
                  <div>• Depth: 25m below GL</div>
                  <div>• Pile Cap: 5m × 5m × 2m</div>
                </div>
              </div>
              <div className="bg-[#f8fafc] rounded p-3 border border-[#e2e8f0]">
                <div className="font-semibold text-[#0f172a] mb-2">Pier Structure</div>
                <div className="space-y-1 text-[#64748b]">
                  <div>• Type: Hammerhead</div>
                  <div>• Height: 12m above GL</div>
                  <div>• Column: 2m × 3m RCC</div>
                  <div>• Concrete: M45 Grade</div>
                  <div>• Steel: Fe500 TMT</div>
                </div>
              </div>
              <div className="bg-[#f8fafc] rounded p-3 border border-[#e2e8f0]">
                <div className="font-semibold text-[#0f172a] mb-2">Superstructure</div>
                <div className="space-y-1 text-[#64748b]">
                  <div>• Girders: Precast PSC</div>
                  <div>• Span: 50m typical</div>
                  <div>• Deck: 250mm RCC slab</div>
                  <div>• Width: 12m + 2×1m parapets</div>
                  <div>• Wearing: 75mm asphalt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Flyover Cross-Section (through deck)
  const renderFlyoverCrossSection = () => {
    return (
      <div className="relative">
        <div className="mb-6">
          <h3 className="text-[16px] font-bold text-[#0f172a]">Cross-Section - Deck Structure</h3>
          <p className="text-[11px] text-[#64748b] mt-1">Typical section through flyover deck</p>
        </div>

        <div className="bg-white rounded-lg border-2 border-[#e2e8f0] p-8">
          <div className="max-w-[900px] mx-auto">
            <svg viewBox="0 0 900 500" className="w-full h-[400px]">
              {/* Left parapet */}
              <rect x="100" y="200" width="60" height="100" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
              <text x="130" y="185" fontSize="10" fill="#0f172a" fontWeight="600" textAnchor="middle">
                Parapet
              </text>

              {/* Deck slab */}
              <rect x="160" y="280" width="580" height="20" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
              <text x="780" y="295" fontSize="10" fill="#0f172a" fontWeight="600">Deck Slab - 250mm</text>
              <line x1="745" y1="290" x2="775" y2="290" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />

              {/* Waterproofing layer */}
              <rect x="160" y="277" width="580" height="3" fill="#3b82f6" />
              <text x="780" y="280" fontSize="9" fill="#2196F3">Waterproofing</text>
              <line x1="745" y1="278" x2="775" y2="278" stroke="#2196F3" strokeWidth="1" strokeDasharray="2,2" />

              {/* Asphalt wearing course */}
              <rect x="160" y="270" width="580" height="7" fill="#1a1a1a" />
              <text x="780" y="275" fontSize="10" fill="#0f172a" fontWeight="600">Asphalt - 75mm</text>
              <line x1="745" y1="273" x2="775" y2="273" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />

              {/* Road markings */}
              <line x1="300" y1="270" x2="320" y2="270" stroke="#fbbf24" strokeWidth="2" />
              <line x1="340" y1="270" x2="360" y2="270" stroke="#fbbf24" strokeWidth="2" />
              <line x1="380" y1="270" x2="400" y2="270" stroke="#fbbf24" strokeWidth="2" />
              <line x1="420" y1="270" x2="440" y2="270" stroke="#fbbf24" strokeWidth="2" />
              <line x1="460" y1="270" x2="480" y2="270" stroke="#fbbf24" strokeWidth="2" />
              <line x1="500" y1="270" x2="520" y2="270" stroke="#fbbf24" strokeWidth="2" />
              <line x1="540" y1="270" x2="560" y2="270" stroke="#fbbf24" strokeWidth="2" />
              <line x1="580" y1="270" x2="600" y2="270" stroke="#fbbf24" strokeWidth="2" />
              <line x1="620" y1="270" x2="640" y2="270" stroke="#fbbf24" strokeWidth="2" />

              {/* Right parapet */}
              <rect x="740" y="200" width="60" height="100" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
              <text x="770" y="185" fontSize="10" fill="#0f172a" fontWeight="600" textAnchor="middle">
                Parapet
              </text>

              {/* Precast girders below deck */}
              <rect x="180" y="300" width="100" height="50" fill="#78716c" stroke="#44403c" strokeWidth="2" />
              <rect x="300" y="300" width="100" height="50" fill="#78716c" stroke="#44403c" strokeWidth="2" />
              <rect x="420" y="300" width="100" height="50" fill="#78716c" stroke="#44403c" strokeWidth="2" />
              <rect x="540" y="300" width="100" height="50" fill="#78716c" stroke="#44403c" strokeWidth="2" />
              <rect x="660" y="300" width="100" height="50" fill="#78716c" stroke="#44403c" strokeWidth="2" />

              <text x="450" y="330" fontSize="11" fill="white" fontWeight="600" textAnchor="middle">
                Precast PSC Girders (5 No.)
              </text>

              {/* Bearing pads on pier head */}
              <rect x="200" y="350" width="60" height="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
              <rect x="320" y="350" width="60" height="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
              <rect x="440" y="350" width="60" height="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
              <rect x="560" y="350" width="60" height="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
              <rect x="680" y="350" width="60" height="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />

              {/* Pier head (hammerhead top) */}
              <rect x="150" y="360" width="600" height="30" fill="#a8a29e" stroke="#475569" strokeWidth="2" />
              <text x="450" y="380" fontSize="11" fill="#0f172a" fontWeight="600" textAnchor="middle">
                Pier Head (Hammerhead Design)
              </text>

              {/* Width dimension */}
              <line x1="100" y1="320" x2="800" y2="320" stroke="#ff5e3a" strokeWidth="1" />
              <line x1="100" y1="315" x2="100" y2="325" stroke="#ff5e3a" strokeWidth="1" />
              <line x1="800" y1="315" x2="800" y2="325" stroke="#ff5e3a" strokeWidth="1" />
              <text x="450" y="340" fontSize="12" fill="#ff5e3a" fontWeight="600" textAnchor="middle">
                Total Width: 14.0m
              </text>

              {/* Drainage pipes */}
              <circle cx="200" cy="275" r="5" fill="#64748b" stroke="#334155" strokeWidth="1" />
              <circle cx="400" cy="275" r="5" fill="#64748b" stroke="#334155" strokeWidth="1" />
              <circle cx="600" cy="275" r="5" fill="#64748b" stroke="#334155" strokeWidth="1" />
              <text x="200" y="260" fontSize="8" fill="#64748b" textAnchor="middle">Drainage</text>
            </svg>

            <div className="mt-6 grid grid-cols-2 gap-4 text-[11px]">
              <div className="bg-[#f8fafc] rounded p-3 border border-[#e2e8f0]">
                <div className="font-semibold text-[#0f172a] mb-2">Deck Components</div>
                <div className="space-y-1 text-[#64748b]">
                  <div>• Wearing Course: 75mm asphalt</div>
                  <div>• Waterproofing: Membrane</div>
                  <div>• Deck Slab: 250mm RCC M40</div>
                  <div>• Girders: 5 Precast PSC</div>
                  <div>• Girder Depth: 1.8m</div>
                  <div>• Bearing: Elastomeric pads</div>
                </div>
              </div>
              <div className="bg-[#f8fafc] rounded p-3 border border-[#e2e8f0]">
                <div className="font-semibold text-[#0f172a] mb-2">Safety Features</div>
                <div className="space-y-1 text-[#64748b]">
                  <div>• Concrete Parapets: 1m height</div>
                  <div>• Drainage: Every 15m spacing</div>
                  <div>• Expansion Joints: Every 50m</div>
                  <div>• Lighting: LED fixtures</div>
                  <div>• Crash Barriers: New Jersey type</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* View mode selector */}
      <div className="flex items-center gap-3 bg-white rounded-lg border border-[#e2e8f0] p-2">
        {projectType === "highway" && (
          <>
            <button
              onClick={() => setViewMode("plan")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-[12px] font-medium transition-colors ${
                viewMode === "plan" ? "bg-[#ff5e3a] text-white" : "bg-[#f8fafc] text-[#64748b] hover:bg-[#e8ebef]"
              }`}
            >
              <Eye className="w-4 h-4" />
              Plan View
            </button>
            <button
              onClick={() => setViewMode("cross-section")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-[12px] font-medium transition-colors ${
                viewMode === "cross-section" ? "bg-[#ff5e3a] text-white" : "bg-[#f8fafc] text-[#64748b] hover:bg-[#e8ebef]"
              }`}
            >
              <Layers className="w-4 h-4" />
              Cross-Section
            </button>
          </>
        )}
        {projectType === "flyover" && (
          <>
            <button
              onClick={() => setViewMode("elevation")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-[12px] font-medium transition-colors ${
                viewMode === "elevation" ? "bg-[#ff5e3a] text-white" : "bg-[#f8fafc] text-[#64748b] hover:bg-[#e8ebef]"
              }`}
            >
              <Eye className="w-4 h-4" />
              Elevation View
            </button>
            <button
              onClick={() => setViewMode("cross-section")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-[12px] font-medium transition-colors ${
                viewMode === "cross-section" ? "bg-[#ff5e3a] text-white" : "bg-[#f8fafc] text-[#64748b] hover:bg-[#e8ebef]"
              }`}
            >
              <Layers className="w-4 h-4" />
              Cross-Section
            </button>
          </>
        )}
      </div>

      {/* Render appropriate view */}
      {projectType === "highway" && viewMode === "plan" && renderHighwayPlan()}
      {projectType === "highway" && viewMode === "cross-section" && renderHighwayCrossSection()}
      {projectType === "flyover" && viewMode === "elevation" && renderFlyoverElevation()}
      {projectType === "flyover" && viewMode === "cross-section" && renderFlyoverCrossSection()}

      {/* Selected section details */}
      {selectedSection && projectType === "highway" && (
        <div className="bg-white rounded-lg border-2 border-[#ff5e3a] p-6">
          <h3 className="text-[15px] font-bold text-[#0f172a] mb-3">Selected Section: {selectedSection}</h3>
          {highwaySections
            .filter((s) => s.chainage === selectedSection)
            .map((section) => (
              <div key={section.chainage} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: getStatusColor(section.status) }}
                  ></div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#0f172a]">
                      Status: {getStatusLabel(section.status)}
                    </div>
                    <div className="text-[11px] text-[#64748b]">Work Package: {section.workPackage}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-[12px] font-semibold text-[#0f172a] mb-1">Activities:</div>
                  <ul className="text-[11px] text-[#64748b] space-y-1 ml-4">
                    {section.activities.map((activity, index) => (
                      <li key={index}>• {activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
