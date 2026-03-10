import { useState } from "react";
import { FileText, Receipt, ChevronUp, ChevronDown } from "lucide-react";

interface PaymentRequest {
  id: string;
  name: string;
  status: "pending" | "rejected" | "approval" | "requested" | "complete";
  project: string;
  supplier: string;
  requester: string;
  vat: string;
  amount: string;
  assignee: string;
  assigneeAvatar: string;
  role: string;
}

interface KanbanViewProps {
  data: PaymentRequest[];
  onRequestClick: (request: PaymentRequest) => void;
}

// Role group combiner component
function RoleCombiner({
  role,
  requests,
  statusBadgeClass,
  statusLabel,
  onRequestClick,
}: {
  role: string;
  requests: PaymentRequest[];
  statusBadgeClass: string;
  statusLabel: string;
  onRequestClick: (request: PaymentRequest) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-3">
      {/* Role Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-white rounded-lg border border-[#e2e8f0] px-3 py-2 flex items-center justify-between hover:bg-[#f8fafc] transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></div>
          <span className="text-[12px] font-medium text-[#0f172a]">{role}</span>
          <span className="bg-[#f1f5f9] text-[#64748b] px-1.5 py-0.5 rounded text-[10px] font-semibold">
            {requests.length}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-[#94a3b8]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
        )}
      </button>

      {/* Cards */}
      {isExpanded && (
        <div className="space-y-2 mt-2">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg border border-[#e2e8f0] p-3 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onRequestClick(request)}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#64748b]">{request.id}</span>
                <span className={statusBadgeClass}>
                  {statusLabel}
                </span>
              </div>
              <h4 className="text-[13px] font-semibold text-[#0f172a] mb-2 line-clamp-2">
                {request.name}
              </h4>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-[#94a3b8]" />
                  <span className="text-[11px] text-[#64748b] truncate">{request.project}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Receipt className="w-3 h-3 text-[#94a3b8]" />
                  <span className="text-[11px] text-[#64748b] truncate">{request.supplier}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9]">
                <div className="flex items-center gap-1.5">
                  <img src={request.assigneeAvatar} alt="" className="w-5 h-5 rounded-full" />
                  <span className="text-[10px] text-[#64748b]">{request.assignee.split(' ')[0]}</span>
                </div>
                <span className="text-[12px] font-bold text-[#0f172a]">{request.amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Status column component
function StatusColumn({
  title,
  status,
  color,
  statusBadgeClass,
  statusLabel,
  data,
  onRequestClick,
}: {
  title: string;
  status: "pending" | "rejected" | "approval" | "requested" | "complete";
  color: string;
  statusBadgeClass: string;
  statusLabel: string;
  data: PaymentRequest[];
  onRequestClick: (request: PaymentRequest) => void;
}) {
  const statusRequests = data.filter((r) => r.status === status);

  // Group by role
  const roleMap = new Map<string, PaymentRequest[]>();
  statusRequests.forEach((request) => {
    const role = request.role;
    if (!roleMap.has(role)) {
      roleMap.set(role, []);
    }
    roleMap.get(role)!.push(request);
  });

  // Convert to sorted array
  const roleGroups = Array.from(roleMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="w-[320px] flex flex-col">
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-3 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
          <h3 className="text-[13px] font-semibold text-[#0f172a]">{title}</h3>
        </div>
        <span className="bg-[#f1f5f9] text-[#64748b] px-2 py-0.5 rounded text-[11px] font-semibold">
          {statusRequests.length}
        </span>
      </div>
      <div className="space-y-3 overflow-y-auto flex-1">
        {roleGroups.map(([role, requests]) => (
          <RoleCombiner
            key={role}
            role={role}
            requests={requests}
            statusBadgeClass={statusBadgeClass}
            statusLabel={statusLabel}
            onRequestClick={onRequestClick}
          />
        ))}
      </div>
    </div>
  );
}

export function KanbanView({ data, onRequestClick }: KanbanViewProps) {
  return (
    <div className="p-6 bg-[#f8fafc] h-full overflow-x-auto">
      <div className="flex gap-4 h-full min-w-max">
        {/* Pending Action Column */}
        <StatusColumn
          title="Pending Action"
          status="pending"
          color="#fbbf24"
          statusBadgeClass="bg-[#fef3c7] text-[#d97706] px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
          statusLabel="Pending"
          data={data}
          onRequestClick={onRequestClick}
        />

        {/* Pending Approval Column */}
        <StatusColumn
          title="Pending Approval"
          status="approval"
          color="#60a5fa"
          statusBadgeClass="bg-[#dbeafe] text-[#2563eb] px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
          statusLabel="Approval"
          data={data}
          onRequestClick={onRequestClick}
        />

        {/* Info Requested Column */}
        <StatusColumn
          title="Info Requested"
          status="requested"
          color="#a78bfa"
          statusBadgeClass="bg-[#ede9fe] text-[#7c3aed] px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
          statusLabel="Info Req"
          data={data}
          onRequestClick={onRequestClick}
        />

        {/* Payment Complete Column */}
        <StatusColumn
          title="Payment Complete"
          status="complete"
          color="#34d399"
          statusBadgeClass="bg-[#d1fae5] text-[#059669] px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
          statusLabel="Complete"
          data={data}
          onRequestClick={onRequestClick}
        />

        {/* Rejected Column */}
        <StatusColumn
          title="Rejected"
          status="rejected"
          color="#f87171"
          statusBadgeClass="bg-[#fee2e2] text-[#dc2626] px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
          statusLabel="Rejected"
          data={data}
          onRequestClick={onRequestClick}
        />
      </div>
    </div>
  );
}
