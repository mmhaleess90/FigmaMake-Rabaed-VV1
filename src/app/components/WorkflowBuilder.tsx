import { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  MarkerType,
  Handle,
  Position,
  NodeProps,
} from "reactflow";
import { Plus, Save, Play, ChevronLeft, X, User, AlertCircle, Zap, Trash2, Check } from "lucide-react";

// Custom Start Node (Circle) - Cannot be deleted
function StartNode({ data, selected }: NodeProps) {
  return (
    <div className="relative">
      <div
        className={`w-[80px] h-[80px] rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-4 shadow-lg flex items-center justify-center ${
          selected ? "border-blue-500" : "border-green-600"
        }`}
      >
        <div className="text-center">
          <span className="text-[12px] font-bold text-white block">START</span>
          <span className="text-[9px] text-green-100 block mt-1">{data.label || "Create Request"}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

// Custom Node Component for Status
function StatusNode({ data, selected, id }: NodeProps) {
  const getStatusColor = (type: string) => {
    switch (type) {
      case "pending":
        return { bg: "#fef3c7", border: "#fbbf24", text: "#d97706" };
      case "approval":
        return { bg: "#dbeafe", border: "#60a5fa", text: "#2563eb" };
      case "complete":
        return { bg: "#d1fae5", border: "#34d399", text: "#059669" };
      case "rejected":
        return { bg: "#fee2e2", border: "#f87171", text: "#dc2626" };
      default:
        return { bg: "#f1f5f9", border: "#cbd5e1", text: "#64748b" };
    }
  };

  const colors = getStatusColor(data.type);

  return (
    <div className="relative">
      <div
        className={`px-4 py-3 rounded-lg shadow-md border-2 min-w-[160px] cursor-pointer ${selected ? "ring-2 ring-blue-400" : ""}`}
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (data.onNodeClick) {
            data.onNodeClick(id);
          }
        }}
      >
        <Handle type="target" position={Position.Top} className="w-3 h-3" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: colors.text }}>
              {data.label}
            </span>
            {data.isEndStatus && (
              <div className="bg-white/80 px-1.5 py-0.5 rounded text-[8px] font-bold text-gray-600">
                END
              </div>
            )}
          </div>
          {data.description && (
            <p className="text-[10px] text-gray-600 mt-1">{data.description}</p>
          )}
          {data.assignee && (
            <div className="mt-2 pt-2 border-t border-white/30">
              <span className="text-[9px] font-medium text-gray-500">Assignee: {data.assignee}</span>
            </div>
          )}
          {data.actions && data.actions.length > 0 && (
            <div className="mt-1 pt-1 border-t border-white/30">
              <span className="text-[8px] font-medium text-gray-500">{data.actions.length} Action(s)</span>
            </div>
          )}
        </div>
        {!data.isEndStatus && (
          <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
        )}
      </div>
      {data.onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete();
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
          style={{ opacity: selected ? 1 : 0 }}
        >
          <Trash2 className="w-3 h-3 text-white" />
        </button>
      )}
    </div>
  );
}

// Custom Node Component for Decision
function DecisionNode({ data, selected }: NodeProps) {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div
        className={`w-[120px] h-[120px] rotate-45 bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-400 shadow-md flex items-center justify-center ${
          selected ? "ring-2 ring-blue-400" : ""
        }`}
      >
        <div className="-rotate-45 text-center px-2">
          <span className="text-[11px] font-bold text-purple-700 block">{data.label}</span>
          {data.decisionType && (
            <span className="text-[9px] text-purple-600 block mt-1">{data.decisionType}</span>
          )}
          {data.condition && (
            <span className="text-[8px] text-purple-500 block mt-0.5">{data.condition}</span>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="yes"
        className="w-3 h-3"
        style={{ top: "50%", right: "-6px" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        className="w-3 h-3"
        style={{ left: "50%", bottom: "-6px" }}
      />
      {data.onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete();
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md z-10"
          style={{ opacity: selected ? 1 : 0 }}
        >
          <Trash2 className="w-3 h-3 text-white" />
        </button>
      )}
    </div>
  );
}

const nodeTypes = {
  startNode: StartNode,
  statusNode: StatusNode,
  decisionNode: DecisionNode,
};

const initialNodes: Node[] = [
  {
    id: "start-1",
    type: "startNode",
    position: { x: 250, y: 20 },
    data: {
      label: "Request Created",
    },
  },
];

const initialEdges: Edge[] = [];

interface ActionData {
  id: string;
  name: string;
  events: string[];
}

interface StatusNodeData {
  label: string;
  type: string;
  description: string;
  assignee: string;
  assigneeType: "role" | "user";
  actions: ActionData[];
  isEndStatus: boolean;
}

export function WorkflowBuilder({ onBack }: { onBack?: () => void }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeType, setSelectedNodeType] = useState<"statusNode" | "decisionNode">("statusNode");
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [showTransitionEditor, setShowTransitionEditor] = useState(false);
  const [showStatusEditor, setShowStatusEditor] = useState(false);
  const [selectedStatusNodeId, setSelectedStatusNodeId] = useState<string | null>(null);
  const [statusNodeData, setStatusNodeData] = useState<StatusNodeData>({
    label: "",
    type: "pending",
    description: "",
    assignee: "",
    assigneeType: "role",
    actions: [],
    isEndStatus: false,
  });
  const [transitionData, setTransitionData] = useState({
    id: "",
    name: "",
    events: ["On Enter", "On Exit"],
    validations: [] as string[],
    actions: [] as { type: string; value: string }[],
  });
  const [isSaving, setIsSaving] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    },
    [setNodes, setEdges]
  );

  const handleNodeClick = useCallback((nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node && node.type === "statusNode") {
      setSelectedStatusNodeId(nodeId);
      setStatusNodeData({
        label: node.data.label || "",
        type: node.data.type || "pending",
        description: node.data.description || "",
        assignee: node.data.assignee || "",
        assigneeType: node.data.assigneeType || "role",
        actions: node.data.actions || [],
        isEndStatus: node.data.isEndStatus || false,
      });
      setShowStatusEditor(true);
    }
  }, [nodes]);

  const addNode = () => {
    // Prevent adding more than one Start Node
    if (selectedNodeType === "statusNode" || selectedNodeType === "decisionNode") {
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: selectedNodeType,
        position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
        data: {
          label: selectedNodeType === "statusNode" ? "New Status" : "New Decision",
          type: selectedNodeType === "statusNode" ? "pending" : undefined,
          decisionType: selectedNodeType === "decisionNode" ? "Amount" : undefined,
          description: "",
          onDelete: () => onDeleteNode(`node-${Date.now()}`),
          onNodeClick: selectedNodeType === "statusNode" ? handleNodeClick : undefined,
        },
      };
      setNodes((nds) => [...nds, newNode]);
    }
  };

  // Update existing nodes with delete handlers and click handlers
  const nodesWithHandlers = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onDelete: node.type !== "startNode" ? () => onDeleteNode(node.id) : undefined,
      onNodeClick: node.type === "statusNode" ? handleNodeClick : undefined,
    },
  }));

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setTransitionData({
      id: edge.id,
      name: edge.label as string || "Transition",
      events: ["On Enter", "On Exit"],
      validations: [],
      actions: [],
    });
    setShowTransitionEditor(true);
  }, []);

  const handleSaveWorkflow = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("Saving workflow:", { nodes, edges });
      setIsSaving(false);
      alert("Workflow saved successfully!");
    }, 1000);
  };

  const addValidation = () => {
    setTransitionData((prev) => ({
      ...prev,
      validations: [...prev.validations, ""],
    }));
  };

  const addAction = () => {
    setTransitionData((prev) => ({
      ...prev,
      actions: [...prev.actions, { type: "change_assignee", value: "" }],
    }));
  };

  const updateValidation = (index: number, value: string) => {
    setTransitionData((prev) => ({
      ...prev,
      validations: prev.validations.map((v, i) => (i === index ? value : v)),
    }));
  };

  const updateAction = (index: number, field: "type" | "value", value: string) => {
    setTransitionData((prev) => ({
      ...prev,
      actions: prev.actions.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
    }));
  };

  const removeValidation = (index: number) => {
    setTransitionData((prev) => ({
      ...prev,
      validations: prev.validations.filter((_, i) => i !== index),
    }));
  };

  const removeAction = (index: number) => {
    setTransitionData((prev) => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index),
    }));
  };

  const saveTransition = () => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === selectedEdge?.id
          ? { ...edge, label: transitionData.name, data: transitionData }
          : edge
      )
    );
    setShowTransitionEditor(false);
  };

  // Status Node Editor Functions
  const addStatusAction = () => {
    setStatusNodeData((prev) => ({
      ...prev,
      actions: [...prev.actions, { id: `action-${Date.now()}`, name: "", events: [] }],
    }));
  };

  const updateStatusAction = (index: number, field: keyof ActionData, value: any) => {
    setStatusNodeData((prev) => ({
      ...prev,
      actions: prev.actions.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
    }));
  };

  const removeStatusAction = (index: number) => {
    setStatusNodeData((prev) => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index),
    }));
  };

  const addEventToAction = (actionIndex: number) => {
    setStatusNodeData((prev) => ({
      ...prev,
      actions: prev.actions.map((action, i) =>
        i === actionIndex ? { ...action, events: [...action.events, ""] } : action
      ),
    }));
  };

  const updateActionEvent = (actionIndex: number, eventIndex: number, value: string) => {
    setStatusNodeData((prev) => ({
      ...prev,
      actions: prev.actions.map((action, i) =>
        i === actionIndex
          ? { ...action, events: action.events.map((e, ei) => (ei === eventIndex ? value : e)) }
          : action
      ),
    }));
  };

  const removeActionEvent = (actionIndex: number, eventIndex: number) => {
    setStatusNodeData((prev) => ({
      ...prev,
      actions: prev.actions.map((action, i) =>
        i === actionIndex ? { ...action, events: action.events.filter((_, ei) => ei !== eventIndex) } : action
      ),
    }));
  };

  const saveStatusNode = () => {
    if (selectedStatusNodeId) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedStatusNodeId
            ? { ...node, data: { ...node.data, ...statusNodeData } }
            : node
        )
      );
      setShowStatusEditor(false);
      setSelectedStatusNodeId(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#f8fafc]">
      {/* Toolbar */}
      <div className="bg-white border-b border-[#e2e8f0] px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          {onBack && (
            <>
              <button
                onClick={onBack}
                className="flex items-center gap-2 h-[32px] px-3 bg-white border border-[#e2e8f0] text-[#64748b] rounded text-[12px] font-medium hover:bg-[#f8fafc] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <div className="h-4 w-px bg-[#e2e8f0]"></div>
            </>
          )}
          <h2 className="font-['Inter'] font-semibold text-[14px] text-[#0f172a]">
            Payment Request Workflow
          </h2>
          <div className="h-4 w-px bg-[#e2e8f0]"></div>
          <select
            value={selectedNodeType}
            onChange={(e) => setSelectedNodeType(e.target.value as any)}
            className="h-[32px] bg-[#f8fafc] border border-[#e2e8f0] rounded px-3 pr-8 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
          >
            <option value="statusNode">Status Node</option>
            <option value="decisionNode">Decision Node</option>
          </select>
          <button
            onClick={addNode}
            className="flex items-center gap-2 h-[32px] px-4 bg-[#ff5e3a] text-white rounded text-[12px] font-medium hover:bg-[#e04628] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Node
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 h-[32px] px-4 bg-white border border-[#e2e8f0] text-[#64748b] rounded text-[12px] font-medium hover:bg-[#f8fafc] transition-colors">
            <Play className="w-4 h-4" />
            Test Workflow
          </button>
          <button 
            onClick={handleSaveWorkflow}
            disabled={isSaving}
            className="flex items-center gap-2 h-[32px] px-4 bg-[#34d399] text-white rounded text-[12px] font-medium hover:bg-[#10b981] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save & Publish"}
          </button>
        </div>
      </div>

      {/* Workflow Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm" />
          <MiniMap
            className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm"
            nodeColor={(node) => {
              if (node.type === "startNode") return "#34d399";
              const type = node.data.type;
              switch (type) {
                case "complete":
                  return "#34d399";
                case "pending":
                  return "#fbbf24";
                case "approval":
                  return "#60a5fa";
                case "rejected":
                  return "#f87171";
                default:
                  return "#cbd5e1";
              }
            }}
          />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#e2e8f0" />
        </ReactFlow>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white border border-[#e2e8f0] rounded-lg shadow-lg p-4 max-w-[220px]">
          <h3 className="text-[11px] font-semibold text-[#0f172a] mb-3">Node Types</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"></div>
              <span className="text-[10px] text-[#64748b]">Start Node (Fixed)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#d1fae5] border-2 border-[#34d399]"></div>
              <span className="text-[10px] text-[#64748b]">Status Node</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rotate-45 bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-400"></div>
              <span className="text-[10px] text-[#64748b]">Decision Node</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#e2e8f0]">
            <p className="text-[9px] text-[#94a3b8]">💡 Click status nodes to edit</p>
            <p className="text-[9px] text-[#94a3b8] mt-1">💡 Click edges to edit transitions</p>
            <p className="text-[9px] text-[#94a3b8] mt-1">🗑️ Select node to delete</p>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-white border-t border-[#e2e8f0] px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-6 text-[11px] text-[#64748b]">
          <span>{nodes.length} nodes</span>
          <span>{edges.length} transitions</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#34d399]"></span>
            Active Workflow
          </span>
        </div>
        <div className="text-[11px] text-[#94a3b8]">
          Last saved: 2 minutes ago
        </div>
      </div>

      {/* Status Node Editor Slider */}
      {showStatusEditor && selectedStatusNodeId && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowStatusEditor(false)}
          />

          {/* Slide-out Panel */}
          <div className="fixed right-0 top-0 h-full w-[500px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between flex-shrink-0">
              <h2 className="font-['Inter'] font-bold text-[18px] text-[#0f172a]">Edit Status Node</h2>
              <button
                onClick={() => setShowStatusEditor(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#64748b]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Status Name */}
              <div className="mb-4">
                <label className="block text-[12px] font-medium text-[#334155] mb-2">
                  Status Name
                </label>
                <input
                  type="text"
                  value={statusNodeData.label}
                  onChange={(e) => setStatusNodeData({ ...statusNodeData, label: e.target.value })}
                  className="w-full h-[36px] border border-[#e2e8f0] rounded px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                  placeholder="e.g., Pending Approval"
                />
              </div>

              {/* Status Type */}
              <div className="mb-4">
                <label className="block text-[12px] font-medium text-[#334155] mb-2">
                  Status Type
                </label>
                <select
                  value={statusNodeData.type}
                  onChange={(e) => setStatusNodeData({ ...statusNodeData, type: e.target.value })}
                  className="w-full h-[36px] border border-[#e2e8f0] rounded px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                >
                  <option value="pending">Pending</option>
                  <option value="approval">Approval</option>
                  <option value="complete">Complete</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-[12px] font-medium text-[#334155] mb-2">
                  Description
                </label>
                <textarea
                  value={statusNodeData.description}
                  onChange={(e) => setStatusNodeData({ ...statusNodeData, description: e.target.value })}
                  className="w-full h-[60px] border border-[#e2e8f0] rounded px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] resize-none"
                  placeholder="Describe this status..."
                />
              </div>

              {/* Assignee Type */}
              <div className="mb-4">
                <label className="block text-[12px] font-medium text-[#334155] mb-2">
                  Assignee Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="role"
                      checked={statusNodeData.assigneeType === "role"}
                      onChange={(e) => setStatusNodeData({ ...statusNodeData, assigneeType: "role" })}
                      className="w-4 h-4"
                    />
                    <span className="text-[12px] text-[#475569]">Role</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="user"
                      checked={statusNodeData.assigneeType === "user"}
                      onChange={(e) => setStatusNodeData({ ...statusNodeData, assigneeType: "user" })}
                      className="w-4 h-4"
                    />
                    <span className="text-[12px] text-[#475569]">Specific User</span>
                  </label>
                </div>
              </div>

              {/* Assignee */}
              <div className="mb-6">
                <label className="block text-[12px] font-medium text-[#334155] mb-2">
                  {statusNodeData.assigneeType === "role" ? "Assigned Role" : "Assigned User"}
                </label>
                {statusNodeData.assigneeType === "role" ? (
                  <select
                    value={statusNodeData.assignee}
                    onChange={(e) => setStatusNodeData({ ...statusNodeData, assignee: e.target.value })}
                    className="w-full h-[36px] border border-[#e2e8f0] rounded px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                  >
                    <option value="">Select Role</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Finance Team">Finance Team</option>
                    <option value="Requester">Requester</option>
                    <option value="Approver">Approver</option>
                    <option value="Admin">Admin</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={statusNodeData.assignee}
                    onChange={(e) => setStatusNodeData({ ...statusNodeData, assignee: e.target.value })}
                    className="w-full h-[36px] border border-[#e2e8f0] rounded px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                    placeholder="Enter user name or email"
                  />
                )}
              </div>

              {/* Actions Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#ff5e3a]" />
                    <h3 className="text-[13px] font-semibold text-[#0f172a]">Actions / Transitions</h3>
                  </div>
                  <button
                    onClick={addStatusAction}
                    className="text-[11px] text-[#ff5e3a] hover:text-[#e04628] font-medium"
                  >
                    + Add Action
                  </button>
                </div>
                <div className="space-y-4">
                  {statusNodeData.actions.map((action, actionIndex) => (
                    <div key={action.id} className="border border-[#e2e8f0] rounded-lg p-3 bg-[#f8fafc]">
                      <div className="flex items-start gap-2 mb-3">
                        <input
                          type="text"
                          value={action.name}
                          onChange={(e) => updateStatusAction(actionIndex, "name", e.target.value)}
                          className="flex-1 h-[32px] border border-[#e2e8f0] rounded px-3 text-[12px] bg-white focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                          placeholder="Action Name (e.g., Approve, Reject)"
                        />
                        <button
                          onClick={() => removeStatusAction(actionIndex)}
                          className="p-1.5 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>

                      {/* Events under this action */}
                      <div className="ml-2 pl-3 border-l-2 border-[#ff5e3a]/30">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[11px] font-medium text-[#64748b]">
                            Events (Notifications)
                          </label>
                          <button
                            onClick={() => addEventToAction(actionIndex)}
                            className="text-[10px] text-[#ff5e3a] hover:text-[#e04628] font-medium"
                          >
                            + Add Event
                          </button>
                        </div>
                        <div className="space-y-2">
                          {action.events.map((event, eventIndex) => (
                            <div key={eventIndex} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={event}
                                onChange={(e) => updateActionEvent(actionIndex, eventIndex, e.target.value)}
                                className="flex-1 h-[28px] border border-[#e2e8f0] rounded px-2 text-[11px] bg-white focus:outline-none focus:ring-1 focus:ring-[#ff5e3a]"
                                placeholder="e.g., Send email to finance"
                              />
                              <button
                                onClick={() => removeActionEvent(actionIndex, eventIndex)}
                                className="p-1 hover:bg-red-50 rounded transition-colors"
                              >
                                <X className="w-3 h-3 text-red-500" />
                              </button>
                            </div>
                          ))}
                          {action.events.length === 0 && (
                            <p className="text-[10px] text-[#94a3b8] italic">No events added</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {statusNodeData.actions.length === 0 && (
                    <p className="text-[11px] text-[#94a3b8] italic">No actions added</p>
                  )}
                </div>
              </div>

              {/* End Status Flag */}
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={statusNodeData.isEndStatus}
                    onChange={(e) => setStatusNodeData({ ...statusNodeData, isEndStatus: e.target.checked })}
                    className="w-4 h-4 rounded border-[#e2e8f0]"
                  />
                  <span className="text-[12px] text-[#334155]">
                    Mark as End Status (No further actions)
                  </span>
                </label>
                {statusNodeData.isEndStatus && (
                  <p className="text-[10px] text-[#64748b] ml-6 mt-1">
                    This status will be the final state. No transitions are allowed after this.
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#e2e8f0] flex items-center justify-end gap-3 flex-shrink-0">
              <button
                onClick={() => setShowStatusEditor(false)}
                className="h-[36px] px-4 border border-[#e2e8f0] rounded text-[13px] font-medium text-[#64748b] hover:bg-[#f8fafc] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveStatusNode}
                className="h-[36px] px-4 bg-[#ff5e3a] text-white rounded text-[13px] font-medium hover:bg-[#e04628] transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save Status
              </button>
            </div>
          </div>
        </>
      )}

      {/* Transition Editor Slider */}
      {showTransitionEditor && selectedEdge && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowTransitionEditor(false)}
          />

          {/* Slide-out Panel */}
          <div className="fixed right-0 top-0 h-full w-[500px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between flex-shrink-0">
              <h2 className="font-['Inter'] font-bold text-[18px] text-[#0f172a]">Edit Transition</h2>
              <button
                onClick={() => setShowTransitionEditor(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#64748b]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Transition Name */}
              <div className="mb-6">
                <label className="block text-[12px] font-medium text-[#334155] mb-2">
                  Transition Name
                </label>
                <input
                  type="text"
                  value={transitionData.name}
                  onChange={(e) => setTransitionData({ ...transitionData, name: e.target.value })}
                  className="w-full h-[36px] border border-[#e2e8f0] rounded px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                  placeholder="e.g., Submit for Approval"
                />
              </div>

              {/* Events Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-[#ff5e3a]" />
                  <h3 className="text-[13px] font-semibold text-[#0f172a]">Events</h3>
                </div>
                <div className="space-y-2">
                  {transitionData.events.map((event, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded border-[#e2e8f0]"
                      />
                      <span className="text-[12px] text-[#475569]">{event}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validations Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#ff5e3a]" />
                    <h3 className="text-[13px] font-semibold text-[#0f172a]">Validations</h3>
                  </div>
                  <button
                    onClick={addValidation}
                    className="text-[11px] text-[#ff5e3a] hover:text-[#e04628] font-medium"
                  >
                    + Add Validation
                  </button>
                </div>
                <div className="space-y-3">
                  {transitionData.validations.map((validation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <input
                        type="text"
                        value={validation}
                        onChange={(e) => updateValidation(index, e.target.value)}
                        className="flex-1 h-[36px] border border-[#e2e8f0] rounded px-3 text-[12px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                        placeholder="e.g., Amount must be greater than 0"
                      />
                      <button
                        onClick={() => removeValidation(index)}
                        className="p-2 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                  {transitionData.validations.length === 0 && (
                    <p className="text-[11px] text-[#94a3b8] italic">No validations added</p>
                  )}
                </div>
              </div>

              {/* Actions Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#ff5e3a]" />
                    <h3 className="text-[13px] font-semibold text-[#0f172a]">Actions</h3>
                  </div>
                  <button
                    onClick={addAction}
                    className="text-[11px] text-[#ff5e3a] hover:text-[#e04628] font-medium"
                  >
                    + Add Action
                  </button>
                </div>
                <div className="space-y-3">
                  {transitionData.actions.map((action, index) => (
                    <div key={index} className="border border-[#e2e8f0] rounded p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <select
                          value={action.type}
                          onChange={(e) => updateAction(index, "type", e.target.value)}
                          className="flex-1 h-[32px] border border-[#e2e8f0] rounded px-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                        >
                          <option value="change_assignee">Change Assignee</option>
                          <option value="send_notification">Send Notification</option>
                          <option value="update_field">Update Field</option>
                          <option value="create_task">Create Task</option>
                        </select>
                        <button
                          onClick={() => removeAction(index)}
                          className="p-1.5 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={action.value}
                        onChange={(e) => updateAction(index, "value", e.target.value)}
                        className="w-full h-[32px] border border-[#e2e8f0] rounded px-3 text-[12px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                        placeholder={
                          action.type === "change_assignee"
                            ? "e.g., Finance Team"
                            : action.type === "send_notification"
                            ? "e.g., approval@company.com"
                            : action.type === "update_field"
                            ? "e.g., status = approved"
                            : "e.g., Follow up task"
                        }
                      />
                    </div>
                  ))}
                  {transitionData.actions.length === 0 && (
                    <p className="text-[11px] text-[#94a3b8] italic">No actions added</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#e2e8f0] flex items-center justify-end gap-3 flex-shrink-0">
              <button
                onClick={() => setShowTransitionEditor(false)}
                className="h-[36px] px-4 border border-[#e2e8f0] rounded text-[13px] font-medium text-[#64748b] hover:bg-[#f8fafc] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveTransition}
                className="h-[36px] px-4 bg-[#ff5e3a] text-white rounded text-[13px] font-medium hover:bg-[#e04628] transition-colors"
              >
                Save Transition
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
