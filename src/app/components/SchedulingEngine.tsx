import { useState } from "react";
import { Calendar, Clock, AlertTriangle, CheckCircle, Filter, Eye, GitBranch, Users, Package, Zap, TrendingUp, Menu, ChevronRight, GripVertical, Play, Pause, AlertCircle } from "lucide-react";

interface Task {
  id: string;
  wbs: string;
  name: string;
  start: string;
  finish: string;
  duration: number; // in days
  progress: number; // percentage
  totalFloat: number; // in days
  status: "todo" | "in-progress" | "blocked" | "completed";
  trade: string;
  critical: boolean;
  dependencies: string[]; // task IDs
  crew: number;
  materialReady: boolean;
  lateStartRisk: boolean;
  assignee?: string;
  cost?: number;
}

const mockTasks: Task[] = [
  { id: "t1", wbs: "1.1.1", name: "Site Mobilization", start: "2024-02-10", finish: "2024-02-15", duration: 5, progress: 100, totalFloat: 0, status: "completed", trade: "General", critical: true, dependencies: [], crew: 8, materialReady: true, lateStartRisk: false, assignee: "John Smith", cost: 45000 },
  { id: "t2", wbs: "1.1.2", name: "Site Fencing & Hoarding", start: "2024-02-16", finish: "2024-02-20", duration: 4, progress: 100, totalFloat: 0, status: "completed", trade: "General", critical: true, dependencies: ["t1"], crew: 6, materialReady: true, lateStartRisk: false, assignee: "Mike Johnson", cost: 28000 },
  { id: "t3", wbs: "1.2.1", name: "Excavation - Foundation", start: "2024-02-21", finish: "2024-02-28", duration: 7, progress: 100, totalFloat: 0, status: "completed", trade: "Excavation", critical: true, dependencies: ["t2"], crew: 12, materialReady: true, lateStartRisk: false, assignee: "Ahmed Ali", cost: 85000 },
  { id: "t4", wbs: "1.2.2", name: "Foundation Formwork", start: "2024-03-01", finish: "2024-03-06", duration: 5, progress: 100, totalFloat: 0, status: "completed", trade: "Carpentry", critical: true, dependencies: ["t3"], crew: 10, materialReady: true, lateStartRisk: false, assignee: "Carlos Rivera", cost: 52000 },
  { id: "t5", wbs: "1.2.3", name: "Foundation Rebar Installation", start: "2024-03-07", finish: "2024-03-11", duration: 4, progress: 90, totalFloat: 0, status: "in-progress", trade: "Rebar", critical: true, dependencies: ["t4"], crew: 15, materialReady: true, lateStartRisk: false, assignee: "Raj Kumar", cost: 68000 },
  { id: "t6", wbs: "1.2.4", name: "Foundation Concrete Pour", start: "2024-03-12", finish: "2024-03-14", duration: 2, progress: 0, totalFloat: 0, status: "todo", trade: "Concrete", critical: true, dependencies: ["t5"], crew: 20, materialReady: true, lateStartRisk: false, assignee: "Tom Wilson", cost: 125000 },
  { id: "t7", wbs: "1.3.1", name: "Ground Floor Columns - Formwork", start: "2024-03-15", finish: "2024-03-20", duration: 5, progress: 0, totalFloat: 0, status: "todo", trade: "Carpentry", critical: true, dependencies: ["t6"], crew: 12, materialReady: true, lateStartRisk: false, assignee: "Carlos Rivera", cost: 58000 },
  { id: "t8", wbs: "1.3.2", name: "Ground Floor Columns - Rebar", start: "2024-03-21", finish: "2024-03-24", duration: 3, progress: 0, totalFloat: 0, status: "todo", trade: "Rebar", critical: true, dependencies: ["t7"], crew: 14, materialReady: false, lateStartRisk: true, assignee: "Raj Kumar", cost: 62000 },
  { id: "t9", wbs: "1.3.3", name: "Ground Floor Columns - Concrete", start: "2024-03-25", finish: "2024-03-26", duration: 1, progress: 0, totalFloat: 0, status: "todo", trade: "Concrete", critical: true, dependencies: ["t8"], crew: 18, materialReady: false, lateStartRisk: true, assignee: "Tom Wilson", cost: 95000 },
  { id: "t10", wbs: "2.1.1", name: "Electrical - Conduit Installation GF", start: "2024-02-25", finish: "2024-03-05", duration: 8, progress: 80, totalFloat: 5, status: "in-progress", trade: "Electrical", critical: false, dependencies: ["t3"], crew: 8, materialReady: true, lateStartRisk: false, assignee: "David Lee", cost: 42000 },
  { id: "t11", wbs: "2.1.2", name: "Plumbing - Underground Rough-in", start: "2024-02-26", finish: "2024-03-08", duration: 10, progress: 70, totalFloat: 3, status: "in-progress", trade: "Plumbing", critical: false, dependencies: ["t3"], crew: 6, materialReady: true, lateStartRisk: false, assignee: "Jose Garcia", cost: 48000 },
  { id: "t12", wbs: "2.2.1", name: "HVAC - Ductwork Fabrication", start: "2024-03-01", finish: "2024-03-15", duration: 14, progress: 40, totalFloat: 8, status: "in-progress", trade: "HVAC", critical: false, dependencies: [], crew: 5, materialReady: true, lateStartRisk: false, assignee: "Mark Chen", cost: 72000 },
  { id: "t13", wbs: "3.1.1", name: "MEP Coordination Meeting", start: "2024-03-10", finish: "2024-03-10", duration: 0, progress: 0, totalFloat: 2, status: "blocked", trade: "General", critical: false, dependencies: ["t10", "t11"], crew: 0, materialReady: true, lateStartRisk: true, assignee: "Project Manager", cost: 0 },
  { id: "t14", wbs: "1.4.1", name: "First Floor Slab - Formwork", start: "2024-03-27", finish: "2024-04-02", duration: 6, progress: 0, totalFloat: 0, status: "todo", trade: "Carpentry", critical: true, dependencies: ["t9"], crew: 14, materialReady: false, lateStartRisk: true, assignee: "Carlos Rivera", cost: 64000 },
  { id: "t15", wbs: "1.4.2", name: "First Floor Slab - Rebar", start: "2024-04-03", finish: "2024-04-07", duration: 4, progress: 0, totalFloat: 0, status: "todo", trade: "Rebar", critical: true, dependencies: ["t14"], crew: 16, materialReady: false, lateStartRisk: true, assignee: "Raj Kumar", cost: 71000 },
];

interface WorkPackage {
  id: string;
  taskId: string;
  title: string;
  startDate: string;
  trade: string;
  crew: number;
  materialReady: boolean;
  lateStartRisk: boolean;
  duration: number;
}

export function SchedulingEngine() {
  const [activeTab, setActiveTab] = useState<"master" | "lookahead" | "resource" | "baseline">("master");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);
  const [showCriticalPath, setShowCriticalPath] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");
  const [showBaseline, setShowBaseline] = useState(false);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  // Calculate today and 14 days from now for lookahead
  const today = new Date("2024-03-10");
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

  // Filter tasks for lookahead (next 14 days)
  const lookaheadTasks = mockTasks.filter(task => {
    const taskStart = new Date(task.start);
    return taskStart >= today && taskStart <= twoWeeksLater && task.status !== "completed";
  });

  // Group lookahead tasks by status for Kanban
  const todoTasks = lookaheadTasks.filter(t => t.status === "todo");
  const inProgressTasks = lookaheadTasks.filter(t => t.status === "in-progress");
  const blockedTasks = lookaheadTasks.filter(t => t.status === "blocked");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "in-progress": return "bg-blue-100 text-blue-700 border-blue-200";
      case "blocked": return "bg-red-100 text-red-700 border-red-200";
      case "todo": return "bg-slate-100 text-slate-700 border-slate-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in-progress": return "In Progress";
      case "blocked": return "Blocked";
      case "todo": return "To Do";
      default: return "Unknown";
    }
  };

  // Calculate timeline range
  const allDates = mockTasks.flatMap(t => [new Date(t.start), new Date(t.finish)]);
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  
  // Generate day columns for Gantt
  const dayColumns: Date[] = [];
  const currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    dayColumns.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const totalDays = dayColumns.length;
  const dayWidth = 40; // pixels per day
  const chartWidth = totalDays * dayWidth;

  // Function to calculate task position in Gantt
  const getTaskPosition = (task: Task) => {
    const taskStart = new Date(task.start);
    const daysFromStart = Math.floor((taskStart.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const x = daysFromStart * dayWidth;
    const width = task.duration * dayWidth;
    return { x, width };
  };

  return (
    <div className="h-full flex flex-col bg-[#f8fafc]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-[18px] font-bold text-slate-900">Scheduling Engine</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">Dubai Marina Tower - Phase 2 Construction</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-[12px] font-medium text-slate-700 transition-colors">
            <Calendar className="w-4 h-4" />
            Export Schedule
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#FF8C00] hover:bg-[#e67e00] text-white rounded-md text-[12px] font-medium transition-colors">
            <Clock className="w-4 h-4" />
            Update Progress
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 px-6 flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => setActiveTab("master")}
          className={`px-4 py-3 text-[14px] font-medium transition-colors border-b-2 ${
            activeTab === "master"
              ? "text-[#FF8C00] border-[#FF8C00]"
              : "text-slate-600 border-transparent hover:text-slate-900"
          }`}
        >
          Master Schedule
        </button>
        <button
          onClick={() => setActiveTab("lookahead")}
          className={`px-4 py-3 text-[14px] font-medium transition-colors border-b-2 ${
            activeTab === "lookahead"
              ? "text-[#FF8C00] border-[#FF8C00]"
              : "text-slate-600 border-transparent hover:text-slate-900"
          }`}
        >
          2-Week Lookahead
        </button>
        <button
          onClick={() => setActiveTab("resource")}
          className={`px-4 py-3 text-[14px] font-medium transition-colors border-b-2 ${
            activeTab === "resource"
              ? "text-[#FF8C00] border-[#FF8C00]"
              : "text-slate-600 border-transparent hover:text-slate-900"
          }`}
        >
          Resource Loading
        </button>
        <button
          onClick={() => setActiveTab("baseline")}
          className={`px-4 py-3 text-[14px] font-medium transition-colors border-b-2 ${
            activeTab === "baseline"
              ? "text-[#FF8C00] border-[#FF8C00]"
              : "text-slate-600 border-transparent hover:text-slate-900"
          }`}
        >
          Baselines
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4 flex-shrink-0">
        {/* Filter Bar */}
        <div className="flex-1 flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder='Filter: status = "Blocked" AND trade = "Electrical"'
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="flex-1 h-[36px] px-3 border border-slate-200 rounded-md text-[12px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
            style={{ fontFamily: 'monospace' }}
          />
        </div>

        {/* Toggle Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCriticalPath(!showCriticalPath)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-[12px] font-medium transition-colors ${
              showCriticalPath
                ? "bg-[#FF8C00] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Highlight Critical Path
          </button>
          <button
            onClick={() => setShowBaseline(!showBaseline)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-[12px] font-medium transition-colors ${
              showBaseline
                ? "bg-[#FF8C00] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            Baseline Comparison
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* MASTER SCHEDULE VIEW */}
        {activeTab === "master" && (
          <div className="h-full flex">
            {/* Left - Data Grid */}
            <div className="w-[550px] bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
              {/* Grid Header */}
              <div className="bg-slate-50 border-b border-slate-200 flex items-center text-[12px] font-semibold text-slate-700 sticky top-0 z-10">
                <div className="w-[40px] px-2 py-3 border-r border-slate-200 flex items-center justify-center">
                  <GripVertical className="w-4 h-4 text-slate-400" />
                </div>
                <div className="w-[80px] px-3 py-3 border-r border-slate-200">WBS Code</div>
                <div className="flex-1 px-3 py-3 border-r border-slate-200">Task Name</div>
                <div className="w-[85px] px-3 py-3 border-r border-slate-200">Start</div>
                <div className="w-[85px] px-3 py-3 border-r border-slate-200">Finish</div>
                <div className="w-[60px] px-3 py-3 border-r border-slate-200">Float</div>
                <div className="w-[100px] px-3 py-3">Status</div>
              </div>

              {/* Grid Body */}
              <div className="flex-1 overflow-y-auto">
                {mockTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={`flex items-center text-[14px] border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
                      selectedTask === task.id ? "bg-blue-50" : ""
                    } ${hoveredTask === task.id ? "bg-slate-50" : ""}`}
                    onClick={() => setSelectedTask(task.id)}
                    onMouseEnter={() => setHoveredTask(task.id)}
                    onMouseLeave={() => setHoveredTask(null)}
                  >
                    {/* Drag Handle */}
                    <div className="w-[40px] px-2 py-3 border-r border-slate-100 flex items-center justify-center cursor-move">
                      <GripVertical className="w-4 h-4 text-slate-300" />
                    </div>

                    {/* WBS Code */}
                    <div className="w-[80px] px-3 py-3 border-r border-slate-100 text-slate-600 font-mono text-[12px]">
                      {task.wbs}
                    </div>

                    {/* Task Name */}
                    <div className="flex-1 px-3 py-3 border-r border-slate-100 flex items-center gap-2">
                      {task.critical && showCriticalPath && (
                        <Zap className="w-3.5 h-3.5 text-[#FF8C00] flex-shrink-0" />
                      )}
                      <span className={`font-medium ${task.critical && showCriticalPath ? "text-[#FF8C00]" : "text-slate-900"}`}>
                        {task.name}
                      </span>
                    </div>

                    {/* Start Date */}
                    <div className="w-[85px] px-3 py-3 border-r border-slate-100 text-slate-600 text-[12px]">
                      {new Date(task.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>

                    {/* Finish Date */}
                    <div className="w-[85px] px-3 py-3 border-r border-slate-100 text-slate-600 text-[12px]">
                      {new Date(task.finish).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>

                    {/* Total Float */}
                    <div className={`w-[60px] px-3 py-3 border-r border-slate-100 font-semibold text-[12px] ${
                      task.totalFloat === 0 ? "text-red-600" : "text-emerald-600"
                    }`}>
                      {task.totalFloat}d
                    </div>

                    {/* Status Badge */}
                    <div className="w-[100px] px-3 py-3">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-medium ${getStatusColor(task.status)}`}>
                        {task.status === "completed" && <CheckCircle className="w-3 h-3" />}
                        {task.status === "in-progress" && <Play className="w-3 h-3" />}
                        {task.status === "blocked" && <AlertCircle className="w-3 h-3" />}
                        {task.status === "todo" && <Clock className="w-3 h-3" />}
                        <span className="whitespace-nowrap">{getStatusLabel(task.status).split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Gantt Chart */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Timeline Header */}
              <div className="bg-slate-50 border-b border-slate-200 overflow-x-auto flex-shrink-0">
                <div style={{ width: `${chartWidth}px` }} className="flex">
                  {dayColumns.map((date, index) => (
                    <div
                      key={index}
                      className="border-r border-slate-200 text-center"
                      style={{ width: `${dayWidth}px` }}
                    >
                      <div className="text-[10px] text-slate-500 py-1 border-b border-slate-200">
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-[12px] font-semibold text-slate-700 py-1">
                        {date.getDate()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gantt Body */}
              <div className="flex-1 overflow-auto relative">
                <div style={{ width: `${chartWidth}px`, minHeight: '100%' }} className="relative">
                  {/* Vertical Grid Lines */}
                  {dayColumns.map((date, index) => (
                    <div
                      key={index}
                      className="absolute top-0 bottom-0 border-r border-slate-100"
                      style={{ left: `${index * dayWidth}px`, width: '1px' }}
                    />
                  ))}

                  {/* Task Bars */}
                  {mockTasks.map((task, index) => {
                    const { x, width } = getTaskPosition(task);
                    const rowHeight = 49; // matches grid row height
                    const y = index * rowHeight + 12;
                    const barHeight = 24;

                    return (
                      <div key={task.id}>
                        {/* Task Bar */}
                        <div
                          className={`absolute rounded-md cursor-pointer transition-all ${
                            task.critical && showCriticalPath
                              ? "border-2 border-[#FF8C00] shadow-[0_0_8px_rgba(255,140,0,0.3)]"
                              : "border border-slate-300"
                          } ${hoveredTask === task.id ? "shadow-lg" : ""}`}
                          style={{
                            left: `${x}px`,
                            top: `${y}px`,
                            width: `${width}px`,
                            height: `${barHeight}px`,
                            backgroundColor: task.status === "completed" ? "#10b981" : 
                                           task.status === "in-progress" ? "#3b82f6" :
                                           task.status === "blocked" ? "#ef4444" : "#94a3b8"
                          }}
                          onMouseEnter={() => setHoveredTask(task.id)}
                          onMouseLeave={() => setHoveredTask(null)}
                          onClick={() => setSelectedTask(task.id)}
                        >
                          {/* Progress Overlay */}
                          {task.progress > 0 && (
                            <div
                              className="absolute top-0 left-0 bottom-0 bg-white/30 rounded-l-md"
                              style={{ width: `${task.progress}%` }}
                            />
                          )}

                          {/* Task Label */}
                          <div className="absolute inset-0 flex items-center px-2">
                            <span className="text-[11px] font-semibold text-white truncate">
                              {task.name} ({task.progress}%)
                            </span>
                          </div>

                          {/* Critical Icon */}
                          {task.critical && showCriticalPath && (
                            <div className="absolute -top-1 -right-1 bg-[#FF8C00] rounded-full p-0.5">
                              <Zap className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Baseline Bar (if enabled) */}
                        {showBaseline && (
                          <div
                            className="absolute border border-dashed border-slate-400 bg-slate-200/30 rounded-sm"
                            style={{
                              left: `${x - 20}px`,
                              top: `${y + 28}px`,
                              width: `${width + 40}px`,
                              height: '4px'
                            }}
                          />
                        )}

                        {/* Dependency Connectors */}
                        {task.dependencies.map(depId => {
                          const depTask = mockTasks.find(t => t.id === depId);
                          if (!depTask) return null;

                          const depPos = getTaskPosition(depTask);
                          const depIndex = mockTasks.findIndex(t => t.id === depId);
                          const depY = depIndex * rowHeight + 12 + barHeight / 2;
                          const currentY = y + barHeight / 2;

                          // Simple finish-to-start connector
                          const startX = depPos.x + depPos.width;
                          const endX = x;
                          const midX = (startX + endX) / 2;

                          return (
                            <svg
                              key={`dep-${task.id}-${depId}`}
                              className="absolute pointer-events-none"
                              style={{
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: '100%',
                                overflow: 'visible'
                              }}
                            >
                              <path
                                d={`M ${startX} ${depY} L ${midX} ${depY} L ${midX} ${currentY} L ${endX} ${currentY}`}
                                stroke={hoveredTask === task.id || hoveredTask === depId ? "#FF8C00" : "#94a3b8"}
                                strokeWidth={hoveredTask === task.id || hoveredTask === depId ? "2" : "1"}
                                fill="none"
                                markerEnd="url(#arrowhead)"
                              />
                              <defs>
                                <marker
                                  id="arrowhead"
                                  markerWidth="10"
                                  markerHeight="10"
                                  refX="8"
                                  refY="3"
                                  orient="auto"
                                >
                                  <polygon points="0 0, 6 3, 0 6" fill="#94a3b8" />
                                </marker>
                              </defs>
                            </svg>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2-WEEK LOOKAHEAD - KANBAN VIEW */}
        {activeTab === "lookahead" && (
          <div className="h-full p-6 overflow-auto">
            <div className="mb-6">
              <h2 className="text-[18px] font-bold text-slate-900 mb-1">2-Week Lookahead</h2>
              <p className="text-[12px] text-slate-500">Work packages starting within the next 14 days • {lookaheadTasks.length} total tasks</p>
            </div>

            <div className="grid grid-cols-3 gap-6 h-[calc(100%-80px)]">
              {/* TO DO Column */}
              <div className="bg-white rounded-lg border border-slate-200 flex flex-col">
                <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-slate-900">To Do</h3>
                    <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px] font-semibold">
                      {todoTasks.length}
                    </span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {todoTasks.map(task => (
                    <div
                      key={task.id}
                      className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all cursor-move"
                      draggable
                      onDragStart={() => setDraggedTask(task.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="text-[13px] font-semibold text-slate-900 mb-1">
                            {task.name}
                          </div>
                          <div className="text-[11px] text-slate-500">{task.wbs}</div>
                        </div>
                        {task.critical && (
                          <div className="px-2 py-0.5 bg-[#FF8C00] text-white rounded text-[9px] font-bold">
                            CRITICAL
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-3 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.duration}d
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-slate-50 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Users className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase">Crew</span>
                          </div>
                          <div className="text-[13px] font-bold text-slate-900">{task.crew}</div>
                        </div>
                        <div className="bg-slate-50 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Package className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase">Materials</span>
                          </div>
                          <div className="text-[13px] font-bold">
                            {task.materialReady ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                            )}
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <AlertTriangle className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase">Risk</span>
                          </div>
                          <div className="text-[13px] font-bold">
                            {task.lateStartRisk ? (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 uppercase">{task.trade}</span>
                        <span className="text-[10px] font-medium text-slate-700">{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IN PROGRESS Column */}
              <div className="bg-white rounded-lg border border-slate-200 flex flex-col">
                <div className="px-4 py-3 border-b border-slate-200 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-slate-900">In Progress</h3>
                    <span className="px-2 py-1 bg-blue-200 text-blue-700 rounded text-[11px] font-semibold">
                      {inProgressTasks.length}
                    </span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {inProgressTasks.map(task => (
                    <div
                      key={task.id}
                      className="bg-white border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition-all cursor-move"
                      draggable
                      onDragStart={() => setDraggedTask(task.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="text-[13px] font-semibold text-slate-900 mb-1">
                            {task.name}
                          </div>
                          <div className="text-[11px] text-slate-500">{task.wbs}</div>
                        </div>
                        {task.critical && (
                          <div className="px-2 py-0.5 bg-[#FF8C00] text-white rounded text-[9px] font-bold">
                            CRITICAL
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-slate-500 uppercase">Progress</span>
                          <span className="text-[11px] font-semibold text-slate-900">{task.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.duration}d
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-slate-50 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Users className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase">Crew</span>
                          </div>
                          <div className="text-[13px] font-bold text-slate-900">{task.crew}</div>
                        </div>
                        <div className="bg-slate-50 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Package className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase">Materials</span>
                          </div>
                          <div className="text-[13px] font-bold">
                            {task.materialReady ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                            )}
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <AlertTriangle className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase">Risk</span>
                          </div>
                          <div className="text-[13px] font-bold">
                            {task.lateStartRisk ? (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 uppercase">{task.trade}</span>
                        <span className="text-[10px] font-medium text-slate-700">{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BLOCKED Column */}
              <div className="bg-white rounded-lg border border-slate-200 flex flex-col">
                <div className="px-4 py-3 border-b border-slate-200 bg-red-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-slate-900">Blocked</h3>
                    <span className="px-2 py-1 bg-red-200 text-red-700 rounded text-[11px] font-semibold">
                      {blockedTasks.length}
                    </span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {blockedTasks.map(task => (
                    <div
                      key={task.id}
                      className="bg-white border-2 border-red-200 rounded-lg p-4 hover:shadow-md transition-all cursor-move"
                      draggable
                      onDragStart={() => setDraggedTask(task.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="text-[13px] font-semibold text-slate-900 mb-1">
                            {task.name}
                          </div>
                          <div className="text-[11px] text-slate-500">{task.wbs}</div>
                        </div>
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      </div>

                      <div className="flex items-center gap-3 mb-3 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.duration}d
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-slate-50 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Users className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase">Crew</span>
                          </div>
                          <div className="text-[13px] font-bold text-slate-900">{task.crew}</div>
                        </div>
                        <div className="bg-slate-50 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Package className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase">Materials</span>
                          </div>
                          <div className="text-[13px] font-bold">
                            {task.materialReady ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                            )}
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <AlertTriangle className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase">Risk</span>
                          </div>
                          <div className="text-[13px] font-bold">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 uppercase">{task.trade}</span>
                        <span className="text-[10px] font-medium text-slate-700">{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESOURCE LOADING VIEW */}
        {activeTab === "resource" && (
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-[18px] font-bold text-slate-900 mb-2">Resource Loading View</h2>
              <p className="text-[14px] text-slate-500">Resource histograms and crew allocation charts coming soon...</p>
            </div>
          </div>
        )}

        {/* BASELINES VIEW */}
        {activeTab === "baseline" && (
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <GitBranch className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-[18px] font-bold text-slate-900 mb-2">Baseline Management</h2>
              <p className="text-[14px] text-slate-500">Compare current schedule against saved baselines...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
