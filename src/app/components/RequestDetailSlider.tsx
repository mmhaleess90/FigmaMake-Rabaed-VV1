import { useState, useRef, useEffect } from "react";
import { X, User, Calendar, DollarSign, FileText, MessageSquare, Clock, CheckCircle, XCircle, AlertCircle, Send } from "lucide-react";

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
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  text: string;
  timestamp: string;
}

interface AuditLogEntry {
  id: string;
  action: string;
  user: string;
  userAvatar: string;
  timestamp: string;
  details: string;
}

interface RequestDetailSliderProps {
  request: PaymentRequest | null;
  onClose: () => void;
}

export function RequestDetailSlider({ request, onClose }: RequestDetailSliderProps) {
  const [sliderWidth, setSliderWidth] = useState(600);
  const [isResizing, setIsResizing] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "comments" | "audit">("details");
  const [commentText, setCommentText] = useState("");
  const sliderRef = useRef<HTMLDivElement>(null);

  // Mock data for comments
  const [comments] = useState<Comment[]>([
    {
      id: "c1",
      author: "Sarah Johnson",
      authorAvatar: "https://i.pravatar.cc/150?img=1",
      text: "Please review the supplier quotation attached. The pricing seems competitive.",
      timestamp: "2 hours ago",
    },
    {
      id: "c2",
      author: "Mohamed",
      authorAvatar: "https://i.pravatar.cc/150?img=3",
      text: "Approved the initial review. Waiting for finance team confirmation.",
      timestamp: "1 hour ago",
    },
  ]);

  // Mock data for audit log
  const auditLog: AuditLogEntry[] = [
    {
      id: "a1",
      action: "Request Created",
      user: "Sarah Johnson",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      timestamp: "Feb 13, 2026 09:30 AM",
      details: "Request initiated for supplier payment",
    },
    {
      id: "a2",
      action: "Assigned",
      user: "System",
      userAvatar: "https://i.pravatar.cc/150?img=12",
      timestamp: "Feb 13, 2026 09:31 AM",
      details: "Automatically assigned to Mohamed",
    },
    {
      id: "a3",
      action: "Status Changed",
      user: "Mohamed",
      userAvatar: "https://i.pravatar.cc/150?img=3",
      timestamp: "Feb 13, 2026 10:15 AM",
      details: "Changed status from Pending to Pending Approval",
    },
    {
      id: "a4",
      action: "Comment Added",
      user: "Sarah Johnson",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      timestamp: "Feb 13, 2026 11:20 AM",
      details: "Added comment about supplier quotation",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 400 && newWidth <= 1200) {
        setSliderWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  if (!request) return null;

  const statusConfig = {
    pending: { bg: "bg-[#fef3c7]", text: "text-[#d97706]", label: "Pending Action", icon: AlertCircle },
    approval: { bg: "bg-[#dbeafe]", text: "text-[#2563eb]", label: "Pending Approval", icon: Clock },
    requested: { bg: "bg-[#ede9fe]", text: "text-[#7c3aed]", label: "Info Requested", icon: AlertCircle },
    complete: { bg: "bg-[#d1fae5]", text: "text-[#059669]", label: "Payment Complete", icon: CheckCircle },
    rejected: { bg: "bg-[#fee2e2]", text: "text-[#dc2626]", label: "Rejected", icon: XCircle },
  };

  const StatusIcon = statusConfig[request.status].icon;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Slider */}
      <div
        ref={sliderRef}
        className="fixed right-0 top-0 bottom-0 bg-white shadow-2xl z-50 flex"
        style={{ width: `${sliderWidth}px` }}
      >
        {/* Resize Handle */}
        <div
          className="w-1 bg-[#e2e8f0] hover:bg-[#ff5e3a] cursor-col-resize transition-colors flex-shrink-0"
          onMouseDown={() => setIsResizing(true)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#f8fafc] border-b border-[#e2e8f0] p-5 flex-shrink-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-[#64748b]">{request.id}</span>
                  <span
                    className={`${statusConfig[request.status].bg} ${
                      statusConfig[request.status].text
                    } px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider inline-flex items-center gap-1`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig[request.status].label}
                  </span>
                </div>
                <h2 className="text-[16px] font-semibold text-[#0f172a] leading-snug mb-2">{request.name}</h2>
                <div className="flex items-center gap-1.5 text-[11px] text-[#64748b]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Created Feb 13, 2026</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-[#e2e8f0] rounded transition-colors ml-3"
              >
                <X className="w-5 h-5 text-[#64748b]" />
              </button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#dbeafe] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-[#2563eb]" />
                </div>
                <div>
                  <div className="text-[10px] text-[#64748b] uppercase tracking-wider">Requester</div>
                  <div className="text-[12px] font-semibold text-[#0f172a]">{request.requester}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#fef3c7] rounded-full flex items-center justify-center">
                  <img src={request.assigneeAvatar} alt="" className="w-8 h-8 rounded-full" />
                </div>
                <div>
                  <div className="text-[10px] text-[#64748b] uppercase tracking-wider">Assignee</div>
                  <div className="text-[12px] font-semibold text-[#0f172a]">{request.assignee}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b border-[#e2e8f0] px-5 flex-shrink-0">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 py-2.5 text-[12px] font-semibold transition-colors ${
                  activeTab === "details"
                    ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]"
                    : "text-[#64748b] hover:text-[#ff5e3a]"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`px-4 py-2.5 text-[12px] font-semibold transition-colors relative ${
                  activeTab === "comments"
                    ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]"
                    : "text-[#64748b] hover:text-[#ff5e3a]"
                }`}
              >
                Comments
                <span className="ml-1.5 bg-[#ff5e3a] text-white px-1.5 py-0.5 rounded-full text-[9px] font-bold">
                  {comments.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("audit")}
                className={`px-4 py-2.5 text-[12px] font-semibold transition-colors ${
                  activeTab === "audit"
                    ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]"
                    : "text-[#64748b] hover:text-[#ff5e3a]"
                }`}
              >
                Audit Log
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === "details" && (
              <div className="space-y-5">
                {/* Request Information */}
                <div className="bg-white border border-[#e2e8f0] rounded-lg p-4">
                  <h3 className="text-[13px] font-semibold text-[#0f172a] mb-4">Request Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-32 text-[11px] text-[#64748b] uppercase tracking-wider pt-1">Project</div>
                      <div className="flex-1 text-[13px] text-[#0f172a] font-medium">{request.project}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-32 text-[11px] text-[#64748b] uppercase tracking-wider pt-1">Supplier</div>
                      <div className="flex-1 text-[13px] text-[#0f172a] font-medium">{request.supplier}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-32 text-[11px] text-[#64748b] uppercase tracking-wider pt-1">Amount</div>
                      <div className="flex-1 text-[16px] text-[#0f172a] font-bold">{request.amount}</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-32 text-[11px] text-[#64748b] uppercase tracking-wider pt-1">VAT</div>
                      <div className="flex-1 text-[13px] text-[#0f172a] font-medium">{request.vat}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white border border-[#e2e8f0] rounded-lg p-4">
                  <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Description</h3>
                  <p className="text-[12px] text-[#475569] leading-relaxed">
                    Payment request for {request.supplier} related to {request.project}. This includes all outstanding
                    invoices and deliverables completed as per contract terms. The amount has been verified and
                    approved by the project manager.
                  </p>
                </div>

                {/* Attachments */}
                <div className="bg-white border border-[#e2e8f0] rounded-lg p-4">
                  <h3 className="text-[13px] font-semibold text-[#0f172a] mb-3">Attachments</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-[#f8fafc] rounded border border-[#e2e8f0] hover:bg-[#f1f5f9] transition-colors cursor-pointer">
                      <FileText className="w-4 h-4 text-[#64748b]" />
                      <div className="flex-1">
                        <div className="text-[12px] font-medium text-[#0f172a]">Invoice_2026_02_001.pdf</div>
                        <div className="text-[10px] text-[#64748b]">2.4 MB</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-[#f8fafc] rounded border border-[#e2e8f0] hover:bg-[#f1f5f9] transition-colors cursor-pointer">
                      <FileText className="w-4 h-4 text-[#64748b]" />
                      <div className="flex-1">
                        <div className="text-[12px] font-medium text-[#0f172a]">Contract_Agreement.pdf</div>
                        <div className="text-[10px] text-[#64748b]">1.8 MB</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "comments" && (
              <div className="space-y-4">
                {/* Add Comment */}
                <div className="bg-white border border-[#e2e8f0] rounded-lg p-4">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full text-[12px] text-[#0f172a] border border-[#e2e8f0] rounded p-3 focus:outline-none focus:border-[#ff5e3a] resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="bg-[#ff5e3a] text-white px-4 py-2 rounded text-[11px] font-semibold hover:bg-[#ff4820] transition-colors inline-flex items-center gap-2">
                      <Send className="w-3.5 h-3.5" />
                      Post Comment
                    </button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-white border border-[#e2e8f0] rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <img src={comment.authorAvatar} alt="" className="w-8 h-8 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] font-semibold text-[#0f172a]">{comment.author}</span>
                            <span className="text-[10px] text-[#64748b]">{comment.timestamp}</span>
                          </div>
                          <p className="text-[12px] text-[#475569] leading-relaxed">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "audit" && (
              <div className="space-y-3">
                {auditLog.map((entry, index) => (
                  <div key={entry.id} className="relative pl-8">
                    {/* Timeline line */}
                    {index !== auditLog.length - 1 && (
                      <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-[#e2e8f0]" />
                    )}
                    
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-[30px] h-[30px] bg-white border-2 border-[#ff5e3a] rounded-full flex items-center justify-center overflow-hidden">
                      <img src={entry.userAvatar} alt="" className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 mb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-[12px] font-semibold text-[#0f172a]">{entry.action}</div>
                          <div className="text-[11px] text-[#64748b]">by {entry.user}</div>
                        </div>
                        <span className="text-[10px] text-[#64748b] whitespace-nowrap">{entry.timestamp}</span>
                      </div>
                      <p className="text-[12px] text-[#475569]">{entry.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-[#f8fafc] border-t border-[#e2e8f0] p-5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-[#10b981] text-white px-4 py-2.5 rounded text-[12px] font-semibold hover:bg-[#059669] transition-colors inline-flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button className="flex-1 bg-[#f59e0b] text-white px-4 py-2.5 rounded text-[12px] font-semibold hover:bg-[#d97706] transition-colors inline-flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Request Info
              </button>
              <button className="flex-1 bg-[#ef4444] text-white px-4 py-2.5 rounded text-[12px] font-semibold hover:bg-[#dc2626] transition-colors inline-flex items-center justify-center gap-2">
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}