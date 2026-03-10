import { useState } from "react";
import { ChevronRight, ChevronLeft, Search, Bell, ChevronDown, Calendar, Eye, FileText, Receipt, X, Upload, Plus } from "lucide-react";
import imgAvatar from "figma:asset/e1ff26a013c86d3e0bbad5caf45bed5603fbdbca.png";
import imgAvatar1 from "figma:asset/31301f8b659328e5b82af456628cb94ab3bf86f5.png";
import imgAvatar2 from "figma:asset/550f9662d6666083ca6300943d4af858dd041515.png";
import imgAvatar3 from "figma:asset/8bb74ac2ef0b0ad7bdf1ec78641528aaaadc4750.png";
import imgAvatar4 from "figma:asset/e5881884af2ade0decf2ae4f6675f56a270ed445.png";
import { KanbanView } from "./KanbanView";
import { FloorView } from "./FloorView";
import { InfrastructureView } from "./InfrastructureView";
import { ManufacturingView } from "./ManufacturingView";
import { SchedulingEngine } from "./SchedulingEngine";
import { RequestDetailSlider } from "./RequestDetailSlider";
import { WorkflowBuilder } from "./WorkflowBuilder";

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

const mockData: PaymentRequest[] = [
  {
    id: "REQ-1",
    name: "occaecati molestiae aperiam",
    status: "pending",
    project: "Project Build Villa Raghyee",
    supplier: "Salem Musa",
    requester: "Tahnoun Ahbabi",
    vat: "10%",
    amount: "2,898.15 SAR",
    assignee: "Tahnoun Ahbabi",
    assigneeAvatar: imgAvatar,
    role: "Finance",
  },
  {
    id: "REQ-2",
    name: "eaque in sed",
    status: "rejected",
    project: "Rabaed Build Tower",
    supplier: "Kholoud Ahmadon",
    requester: "Hessa Khalfan",
    vat: "10%",
    amount: "2,898.15 SAR",
    assignee: "Hessa Khalfan",
    assigneeAvatar: imgAvatar1,
    role: "Contractor Engineer",
  },
  {
    id: "REQ-3",
    name: "voluptas nesciunt velit",
    status: "approval",
    project: "TMG Constraction",
    supplier: "Mohammed Al Marzouki",
    requester: "Taif Al-Amri",
    vat: "15%",
    amount: "1,425.76 SAR",
    assignee: "Mohammed Al Marzouki",
    assigneeAvatar: imgAvatar2,
    role: "Contractor Project Manager",
  },
  {
    id: "REQ-4",
    name: "voluptas nesciunt velit",
    status: "requested",
    project: "TMG Constraction",
    supplier: "Mohammed Al Marzouki",
    requester: "Taif Al-Amri",
    vat: "10%",
    amount: "1,425.76 SAR",
    assignee: "Mohammed Al Marzouki",
    assigneeAvatar: imgAvatar3,
    role: "Engineer",
  },
  {
    id: "REQ-5",
    name: "magni aut non",
    status: "complete",
    project: "Project Build Villa 2 apartment",
    supplier: "Ahmed Abdulrahman",
    requester: "Ahmed Abdulrahman",
    vat: "14%",
    amount: "5,519.26 SAR",
    assignee: "Ahmed Abdulrahman",
    assigneeAvatar: imgAvatar4,
    role: "Finance",
  },
  {
    id: "REQ-6",
    name: "Interior Finishing Materials",
    status: "approval",
    project: "RABAED BUILD TOWER",
    supplier: "Salem Musa",
    requester: "Tahnoun Ahbabi",
    vat: "10%",
    amount: "12,340.00 SAR",
    assignee: "Mohammed",
    assigneeAvatar: imgAvatar,
    role: "Contractor Engineer",
  },
  {
    id: "REQ-7",
    name: "Steel Structure Components",
    status: "approval",
    project: "TMG CONSTRUCTION",
    supplier: "Kholoud Ahmadon",
    requester: "Hessa Khalfan",
    vat: "10%",
    amount: "18,750.00 SAR",
    assignee: "Yaf",
    assigneeAvatar: imgAvatar1,
    role: "Contractor Project Manager",
  },
  {
    id: "REQ-8",
    name: "Concrete Supply Order",
    status: "approval",
    project: "VILLA RAGHYEE",
    supplier: "Mohammed Al Marzouki",
    requester: "Taif Al-Amri",
    vat: "15%",
    amount: "9,250.00 SAR",
    assignee: "Ahmed",
    assigneeAvatar: imgAvatar2,
    role: "Finance",
  },
  {
    id: "REQ-9",
    name: "Electrical Wiring",
    status: "requested",
    project: "TMG Constraction",
    supplier: "Mohammed Al Marzouki",
    requester: "Taif Al-Amri",
    vat: "10%",
    amount: "1,425.76 SAR",
    assignee: "Mohammed Al Marzouki",
    assigneeAvatar: imgAvatar2,
    role: "Engineer",
  },
  {
    id: "REQ-10",
    name: "magni aut non",
    status: "complete",
    project: "Project Build Villa 2 apartment",
    supplier: "Ahmed Abdulrahman",
    requester: "Ahmed Abdulrahman",
    vat: "14%",
    amount: "5,519.26 SAR",
    assignee: "Ahmed Abdulrahman",
    assigneeAvatar: imgAvatar3,
    role: "Contractor Engineer",
  },
];

const statusConfig = {
  pending: {
    label: "Pending Action",
    bg: "bg-[#fef9c3]",
    text: "text-[#a16207]",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-[#fee2e2]",
    text: "text-[#b91c1c]",
  },
  approval: {
    label: "Pending Approval",
    bg: "bg-[#dbeafe]",
    text: "text-[#1d4ed8]",
  },
  requested: {
    label: "Info Requested",
    bg: "bg-[#ede9fe]",
    text: "text-[#6b21a8]",
  },
  complete: {
    label: "Payment Complete",
    bg: "bg-[#d1fae5]",
    text: "text-[#065f46]",
  },
};

export function TableView() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "requests" | "kanban" | "floorview" | "infrastructure" | "manufacturing" | "scheduling" | "projects" | "suppliers" | "settings">("dashboard");
  const [settingsSubmenu, setSettingsSubmenu] = useState<"users" | "roles" | "workflow">("users");
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(null);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  
  // Form states
  const [requestName, setRequestName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [amount, setAmount] = useState("");
  const [vatPercent, setVatPercent] = useState("10");
  const [attachments, setAttachments] = useState<File[]>([]);
  
  // Project form states
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [pmName, setPmName] = useState("");
  const [projectStatus, setProjectStatus] = useState<"active" | "inactive">("active");
  
  // Supplier form states
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierContactName, setNewSupplierContactName] = useState("");
  const [newSupplierContactEmail, setNewSupplierContactEmail] = useState("");
  
  // Mock data lists
  const [projectList] = useState([
    "Project Build Villa Raghyee",
    "Rabaed Build Tower",
    "TMG Constraction",
    "Project Build Villa 2 apartment",
  ]);
  
  const [supplierList, setSupplierList] = useState([
    "Salem Musa",
    "Kholoud Ahmadon",
    "Mohammed Al Marzouki",
    "Ahmed Abdulrahman",
  ]);
  
  // Mock PM users list
  const [pmUsersList] = useState([
    "Tahnoun Ahbabi",
    "Hessa Khalfan",
    "Mohammed Al Marzouki",
    "Ahmed Abdulrahman",
  ]);
  
  // Mock projects data
  interface Project {
    id: string;
    name: string;
    clientName: string;
    pmName: string;
    status: "active" | "inactive";
    totalRequests: number;
  }
  
  const [projectsData, setProjectsData] = useState<Project[]>([
    {
      id: "PRJ-001",
      name: "Project Build Villa Raghyee",
      clientName: "Raghyee Holdings",
      pmName: "Tahnoun Ahbabi",
      status: "active",
      totalRequests: 12,
    },
    {
      id: "PRJ-002",
      name: "Rabaed Build Tower",
      clientName: "Rabaed Development",
      pmName: "Hessa Khalfan",
      status: "active",
      totalRequests: 8,
    },
    {
      id: "PRJ-003",
      name: "TMG Constraction",
      clientName: "TMG Group",
      pmName: "Mohammed Al Marzouki",
      status: "inactive",
      totalRequests: 5,
    },
    {
      id: "PRJ-004",
      name: "Project Build Villa 2 apartment",
      clientName: "Private Client",
      pmName: "Ahmed Abdulrahman",
      status: "active",
      totalRequests: 15,
    },
  ]);
  
  // Mock suppliers data
  interface Supplier {
    id: string;
    name: string;
    city: string;
    address: string;
    contactPerson: string;
    email: string;
    mobile: string;
    status: "active" | "inactive";
    totalRequests: number;
  }
  
  const [suppliersData, setSuppliersData] = useState<Supplier[]>([
    {
      id: "SUP-001",
      name: "Salem Musa",
      city: "Dubai",
      address: "Sheikh Zayed Road, Business Bay, Tower 1",
      contactPerson: "Salem Musa",
      email: "salem.musa@company.ae",
      mobile: "+971 50 123 4567",
      status: "active",
      totalRequests: 24,
    },
    {
      id: "SUP-002",
      name: "Kholoud Ahmadon",
      city: "Abu Dhabi",
      address: "Al Maryah Island, Financial Center",
      contactPerson: "Kholoud Ahmadon",
      email: "kholoud.a@supplies.ae",
      mobile: "+971 52 987 6543",
      status: "active",
      totalRequests: 18,
    },
    {
      id: "SUP-003",
      name: "Mohammed Al Marzouki",
      city: "Sharjah",
      address: "Industrial Area 6, Warehouse Complex B",
      contactPerson: "Mohammed Al Marzouki",
      email: "m.almarzouki@trading.ae",
      mobile: "+971 55 456 7890",
      status: "inactive",
      totalRequests: 7,
    },
    {
      id: "SUP-004",
      name: "Ahmed Abdulrahman",
      city: "Dubai",
      address: "Al Quoz Industrial Area 3, Building 5",
      contactPerson: "Ahmed Abdulrahman",
      email: "ahmed.a@suppliers.ae",
      mobile: "+971 50 789 0123",
      status: "active",
      totalRequests: 31,
    },
  ]);
  
  // Mock users data
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    company: string;
    status: "active" | "inactive";
    joinDate: string;
  }
  
  const [usersData] = useState<User[]>([
    {
      id: "USR-001",
      name: "Tahnoun Ahbabi",
      email: "tahnoun.ahbabi@company.ae",
      role: "Admin",
      company: "Raghyee Holdings",
      status: "active",
      joinDate: "Jan 15, 2024",
    },
    {
      id: "USR-002",
      name: "Hessa Khalfan",
      email: "hessa.k@company.ae",
      role: "Project Manager",
      company: "Rabaed Development",
      status: "active",
      joinDate: "Feb 20, 2024",
    },
    {
      id: "USR-003",
      name: "Mohammed Al Marzouki",
      email: "m.almarzouki@company.ae",
      role: "Engineer",
      company: "TMG Group",
      status: "active",
      joinDate: "Mar 10, 2024",
    },
    {
      id: "USR-004",
      name: "Ahmed Abdulrahman",
      email: "ahmed.a@company.ae",
      role: "Project Manager",
      company: "Private Client",
      status: "active",
      joinDate: "Apr 5, 2024",
    },
    {
      id: "USR-005",
      name: "Taif Al-Amri",
      email: "taif.alamri@company.ae",
      role: "Site Engineer",
      company: "TMG Group",
      status: "inactive",
      joinDate: "May 12, 2024",
    },
  ]);
  
  // Mock roles data
  interface Role {
    id: string;
    name: string;
    description: string;
  }
  
  const [rolesData] = useState<Role[]>([
    {
      id: "ROLE-001",
      name: "Admin",
      description: "Full system access with all administrative privileges",
    },
    {
      id: "ROLE-002",
      name: "Project Manager",
      description: "Manage projects, assign tasks, and oversee team members",
    },
    {
      id: "ROLE-003",
      name: "Engineer",
      description: "Technical role with access to project specifications and documentation",
    },
    {
      id: "ROLE-004",
      name: "Site Engineer",
      description: "On-site supervision and reporting capabilities",
    },
    {
      id: "ROLE-005",
      name: "Accountant",
      description: "Financial management and payment request processing",
    },
  ]);
  
  // Mock workflow schemas data
  interface WorkflowSchema {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
  }
  
  const [workflowSchemas] = useState<WorkflowSchema[]>([
    {
      id: "WF-001",
      name: "Payment Request Approval",
      description: "Multi-stage approval workflow for payment requests including requester submission, manager review, finance approval, and final payment processing",
      isActive: true,
    },
    {
      id: "WF-002",
      name: "Project Initiation",
      description: "Workflow for starting new projects with client approval, resource allocation, and kickoff meeting scheduling",
      isActive: false,
    },
    {
      id: "WF-003",
      name: "Supplier Onboarding",
      description: "Process for adding new suppliers including documentation review, contract negotiation, and system registration",
      isActive: false,
    },
    {
      id: "WF-004",
      name: "Change Request",
      description: "Workflow for handling project changes with impact analysis, stakeholder approval, and implementation tracking",
      isActive: false,
    },
    {
      id: "WF-005",
      name: "Invoice Processing",
      description: "Automated invoice validation, matching with purchase orders, approval routing, and payment scheduling",
      isActive: false,
    },
  ]);
  
  const vatOptions = ["5", "10", "14", "15"];
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const handleAddSupplier = () => {
    if (newSupplierName && newSupplierContactName && newSupplierContactEmail) {
      setSupplierList([...supplierList, newSupplierName]);
      setSelectedSupplier(newSupplierName);
      setNewSupplierName("");
      setNewSupplierContactName("");
      setNewSupplierContactEmail("");
      setShowAddSupplier(false);
    }
  };
  
  const handleSubmitRequest = () => {
    // Handle form submission
    console.log({
      requestName,
      selectedProject,
      selectedSupplier,
      amount,
      vatPercent,
      attachments,
    });
    // Reset form
    setRequestName("");
    setSelectedProject("");
    setSelectedSupplier("");
    setAmount("");
    setVatPercent("10");
    setAttachments([]);
    setShowCreateRequest(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#e2e8f0] px-3 md:px-6 py-2 flex-shrink-0">
        <nav className="flex items-center gap-2 text-[12px] text-[#94a3b8]">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#ff5e3a] font-medium">Payment Requests</span>
        </nav>
      </div>

      {/* Tabs */}
        <div className="bg-white border-b border-[#e2e8f0] px-3 md:px-6 flex-shrink-0 overflow-x-auto">
          <div className="flex items-center min-w-max">
            <button
              className={`px-4 py-2 text-[12px] font-semibold ${
                activeTab === "dashboard" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b] hover:text-[#ff5e3a]"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`px-4 py-2 text-[12px] font-medium ${
                activeTab === "requests" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b] hover:text-[#ff5e3a]"
              }`}
              onClick={() => setActiveTab("requests")}
            >
              All Requests
            </button>
            <button
              className={`px-4 py-2 text-[12px] font-medium ${
                activeTab === "kanban" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b] hover:text-[#ff5e3a]"
              }`}
              onClick={() => setActiveTab("kanban")}
            >
              Kanban View
            </button>
            <button
              className={`px-4 py-2 text-[12px] font-medium ${
                activeTab === "floorview" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b] hover:text-[#ff5e3a]"
              }`}
              onClick={() => setActiveTab("floorview")}
            >
              Floor View
            </button>
            <button
              className={`px-4 py-2 text-[12px] font-medium ${
                activeTab === "infrastructure" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b] hover:text-[#ff5e3a]"
              }`}
              onClick={() => setActiveTab("infrastructure")}
            >
              Infrastructure
            </button>
            <button
              className={`px-4 py-2 text-[12px] font-medium ${
                activeTab === "manufacturing" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b] hover:text-[#ff5e3a]"
              }`}
              onClick={() => setActiveTab("manufacturing")}
            >
              Manufacturing
            </button>
            <button
              className={`px-4 py-2 text-[12px] font-medium ${
                activeTab === "scheduling" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b] hover:text-[#ff5e3a]"
              }`}
              onClick={() => setActiveTab("scheduling")}
            >
              Scheduling
            </button>
            <button
              className={`px-4 py-2 text-[12px] font-medium ${
                activeTab === "projects" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b] hover:text-[#ff5e3a]"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              Projects List
            </button>
            <button
              className={`px-4 py-2 text-[12px] font-medium ${
                activeTab === "suppliers" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b] hover:text-[#ff5e3a]"
              }`}
              onClick={() => setActiveTab("suppliers")}
            >
              Supplier List
            </button>
            <button
              className={`px-4 py-2 text-[12px] font-medium ${
                activeTab === "settings" ? "text-[#ff5e3a] border-b-2 border-[#ff5e3a]" : "text-[#64748b] hover:text-[#ff5e3a]"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Filters */}
        {activeTab !== "dashboard" && activeTab !== "home" && (
        <div className="bg-white px-3 md:px-6 py-3 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-[#e2e8f0] flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0">
            <div className="relative flex-shrink-0">
              <input
                type="text"
                placeholder="Search items..."
                className="w-[140px] md:w-[192px] h-[30px] bg-[#f8fafc] border border-[#e2e8f0] rounded pl-[33px] pr-3 py-2 text-[12px] text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            </div>

            {activeTab === "requests" && (
              <>
                <select className="flex-shrink-0 h-[30px] bg-[#f8fafc] border border-[#e2e8f0] rounded px-2 pr-8 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] appearance-none">
                  <option>Status</option>
                  <option>Pending Action</option>
                  <option>Rejected</option>
                  <option>Pending Approval</option>
                </select>

                <select className="flex-shrink-0 hidden sm:block h-[30px] bg-[#f8fafc] border border-[#e2e8f0] rounded px-2 pr-8 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] appearance-none">
                  <option>Project</option>
                </select>

                <div className="hidden md:block w-px h-4 bg-[#e2e8f0]" />

                <div className="relative flex-shrink-0 hidden sm:block">
                  <input
                    type="text"
                    placeholder="Creation Date"
                    className="w-[128px] h-[30px] bg-[#f8fafc] border border-[#e2e8f0] rounded pl-2 pr-8 py-2 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]"
                  />
                  <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 hidden md:flex">
                  <div className="w-7 h-4 bg-[#e2e8f0] rounded-full relative cursor-pointer">
                    <div className="w-3 h-3 bg-white border border-[#d1d5db] rounded-full absolute left-0.5 top-0.5" />
                  </div>
                  <span className="text-[11px] font-medium text-[#64748b]">Need My Action</span>
                </div>
              </>
            )}

            {activeTab === "projects" && (
              <>
                <select className="flex-shrink-0 h-[30px] bg-[#f8fafc] border border-[#e2e8f0] rounded px-2 pr-8 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] appearance-none">
                  <option>Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <select className="flex-shrink-0 hidden sm:block h-[30px] bg-[#f8fafc] border border-[#e2e8f0] rounded px-2 pr-8 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] appearance-none">
                  <option>PM Name</option>
                  {pmUsersList.map((pm) => (
                    <option key={pm} value={pm}>
                      {pm}
                    </option>
                  ))}
                </select>
              </>
            )}

            {activeTab === "suppliers" && (
              <>
                <select className="flex-shrink-0 h-[30px] bg-[#f8fafc] border border-[#e2e8f0] rounded px-2 pr-8 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] appearance-none">
                  <option>Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <select className="flex-shrink-0 hidden sm:block h-[30px] bg-[#f8fafc] border border-[#e2e8f0] rounded px-2 pr-8 text-[12px] text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] appearance-none">
                  <option>City</option>
                  <option>Dubai</option>
                  <option>Abu Dhabi</option>
                  <option>Sharjah</option>
                </select>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
          {activeTab === "requests" && (
            <button onClick={() => setShowCreateRequest(true)} className="bg-[#ff5e3a] hover:bg-[#e04628] text-white px-3 md:px-4 py-1.5 rounded flex items-center gap-1.5 text-[11px] md:text-[12px] font-semibold transition-colors whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 18 18">
                <path
                  d="M13.3136 5.28748C13.1336 5.25748 12.9461 5.24999 12.7511 5.24999H5.25105C5.04105 5.24999 4.83855 5.26498 4.64355 5.29498C4.74855 5.08498 4.89855 4.89001 5.07855 4.71001L7.51606 2.265C8.54356 1.245 10.2086 1.245 11.2361 2.265L12.5486 3.59247C13.0286 4.06497 13.2836 4.66498 13.3136 5.28748Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 9.375H14.25C13.425 9.375 12.75 10.05 12.75 10.875C12.75 11.7 13.425 12.375 14.25 12.375H16.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 9V12.75C16.5 15 15 16.5 12.75 16.5H5.25C2.73 16.5 1.5 14.76 1.5 12.75V9C1.5 6.96 2.73 5.535 4.6425 5.295C4.8375 5.265 5.04 5.25 5.25 5.25H12.75C12.945 5.25 13.1325 5.2575 13.3125 5.2875C15.2475 5.5125 16.5 6.945 16.5 9Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">Create Request</span>
              <span className="sm:hidden">Create</span>
            </button>
          )}

          {activeTab === "projects" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setProjectName("");
                  setClientName("");
                  setPmName("");
                  setProjectStatus("active");
                  setEditingProject(null);
                  setShowCreateProject(true);
                }}
                className="bg-[#ff5e3a] hover:bg-[#e04628] text-white px-3 md:px-4 py-1.5 rounded flex items-center gap-1.5 text-[11px] md:text-[12px] font-semibold transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Project</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button className="hidden sm:flex bg-white border border-[#e2e8f0] hover:bg-gray-50 text-[#64748b] px-4 py-1.5 rounded items-center gap-1.5 text-[12px] font-semibold transition-colors">
                <Upload className="w-4 h-4" />
                Import
              </button>
            </div>
          )}

          {activeTab === "suppliers" && (
            <div className="flex items-center gap-2">
              <button
                className="bg-[#ff5e3a] hover:bg-[#e04628] text-white px-4 py-1.5 rounded flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Supplier
              </button>
              <button className="bg-white border border-[#e2e8f0] hover:bg-gray-50 text-[#64748b] px-4 py-1.5 rounded flex items-center gap-1.5 text-[12px] font-semibold transition-colors">
                <Upload className="w-4 h-4" />
                Import
              </button>
            </div>
          )}
          </div>
        </div>
        )}

        {/* Table Container - Scrollable */}
        <div className="flex-1 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="p-3 md:p-6 bg-[#f8fafc]">
              {/* Dashboard Header */}
              <div className="mb-4 md:mb-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#0f172a] mb-1">Welcome back, Mohamed</h2>
                <p className="text-[12px] md:text-[13px] text-[#64748b]">Here's what's happening with your payment requests today.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                {/* Total Requests */}
                <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <span className="text-[11px] md:text-[12px] font-medium text-[#64748b] uppercase tracking-wider">Total Requests</span>
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#ffe9e3] rounded-full flex items-center justify-center">
                      <Receipt className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#ff5e3a]" />
                    </div>
                  </div>
                  <div className="text-[24px] md:text-[28px] font-bold text-[#0f172a] mb-1">127</div>
                  <div className="text-[10px] md:text-[11px] text-[#10b981] font-medium">+12% from last month</div>
                </div>

                {/* Pending Requests */}
                <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <span className="text-[11px] md:text-[12px] font-medium text-[#64748b] uppercase tracking-wider">Pending Action</span>
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#fef3c7] rounded-full flex items-center justify-center">
                      <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#d97706]" />
                    </div>
                  </div>
                  <div className="text-[24px] md:text-[28px] font-bold text-[#0f172a] mb-1">23</div>
                  <div className="text-[10px] md:text-[11px] text-[#64748b]">Requires your attention</div>
                </div>

                {/* Total Amount */}
                <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <span className="text-[11px] md:text-[12px] font-medium text-[#64748b] uppercase tracking-wider">Total Amount</span>
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#dbeafe] rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#1d4ed8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-[24px] md:text-[28px] font-bold text-[#0f172a] mb-1">1.2M SAR</div>
                  <div className="text-[10px] md:text-[11px] text-[#64748b]">This month</div>
                </div>

                {/* Approved This Week */}
                <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <span className="text-[11px] md:text-[12px] font-medium text-[#64748b] uppercase tracking-wider">Approved</span>
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#d1fae5] rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#065f46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-[24px] md:text-[28px] font-bold text-[#0f172a] mb-1">45</div>
                  <div className="text-[10px] md:text-[11px] text-[#64748b]">This week</div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Left Column - Wider */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                  {/* Requests by Status */}
                  <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 md:p-5">
                    <h3 className="text-[13px] md:text-[14px] font-semibold text-[#0f172a] mb-3 md:mb-4">Requests by Status</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#d97706] flex-shrink-0"></div>
                          <span className="text-[12px] md:text-[13px] text-[#334155]">Pending Action</span>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="flex-1 sm:w-32 md:w-48 h-2.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#fbbf24] rounded-full" style={{ width: "45%" }}></div>
                          </div>
                          <span className="text-[12px] md:text-[13px] font-semibold text-[#0f172a] w-6 md:w-8 text-right flex-shrink-0">23</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#2563eb] flex-shrink-0"></div>
                          <span className="text-[12px] md:text-[13px] text-[#334155]">Pending Approval</span>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="flex-1 sm:w-32 md:w-48 h-2.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#60a5fa] rounded-full" style={{ width: "35%" }}></div>
                          </div>
                          <span className="text-[12px] md:text-[13px] font-semibold text-[#0f172a] w-6 md:w-8 text-right flex-shrink-0">18</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#7c3aed] flex-shrink-0"></div>
                          <span className="text-[12px] md:text-[13px] text-[#334155]">Info Requested</span>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="flex-1 sm:w-32 md:w-48 h-2.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#a78bfa] rounded-full" style={{ width: "25%" }}></div>
                          </div>
                          <span className="text-[12px] md:text-[13px] font-semibold text-[#0f172a] w-6 md:w-8 text-right flex-shrink-0">13</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#059669] flex-shrink-0"></div>
                          <span className="text-[12px] md:text-[13px] text-[#334155]">Payment Complete</span>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="flex-1 sm:w-32 md:w-48 h-2.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#34d399] rounded-full" style={{ width: "70%" }}></div>
                          </div>
                          <span className="text-[12px] md:text-[13px] font-semibold text-[#0f172a] w-6 md:w-8 text-right flex-shrink-0">36</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#dc2626] flex-shrink-0"></div>
                          <span className="text-[12px] md:text-[13px] text-[#334155]">Rejected</span>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="flex-1 sm:w-32 md:w-48 h-2.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#f87171] rounded-full" style={{ width: "15%" }}></div>
                          </div>
                          <span className="text-[12px] md:text-[13px] font-semibold text-[#0f172a] w-6 md:w-8 text-right flex-shrink-0">8</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Requests */}
                  <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 md:p-5">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className="text-[13px] md:text-[14px] font-semibold text-[#0f172a]">Recent Requests</h3>
                      <button 
                        onClick={() => setActiveTab("requests")}
                        className="text-[11px] md:text-[12px] font-medium text-[#ff5e3a] hover:text-[#e04628]"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      {mockData.slice(0, 5).map((request) => (
                        <div key={request.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-[#f1f5f9] last:border-0">
                          <div className="flex-1">
                            <div className="text-[12px] md:text-[13px] font-medium text-[#334155] mb-1">{request.name}</div>
                            <div className="text-[10px] md:text-[11px] text-[#64748b]">{request.project}</div>
                          </div>
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-[11px] md:text-[12px] font-semibold text-[#0f172a]">{request.amount}</span>
                            <span
                              className={`${statusConfig[request.status].bg} ${
                                statusConfig[request.status].text
                              } px-1.5 py-0.5 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5px]`}
                            >
                              {statusConfig[request.status].label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Narrower */}
                <div className="space-y-4 md:space-y-6">
                  {/* Top Projects */}
                  <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 md:p-5">
                    <h3 className="text-[13px] md:text-[14px] font-semibold text-[#0f172a] mb-3 md:mb-4">Top Projects</h3>
                    <div className="space-y-3 md:space-y-4">
                      {projectsData.map((project) => (
                        <div key={project.id} className="pb-3 border-b border-[#f1f5f9] last:border-0 last:pb-0">
                          <div className="text-[12px] md:text-[13px] font-medium text-[#334155] mb-1">{project.name}</div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] md:text-[11px] text-[#64748b]">{project.pmName}</span>
                            <span className="bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded text-[9px] md:text-[10px] font-semibold">
                              {project.totalRequests} Requests
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg border border-[#e2e8f0] p-4 md:p-5">
                    <h3 className="text-[13px] md:text-[14px] font-semibold text-[#0f172a] mb-3 md:mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setActiveTab("requests");
                          setShowCreateRequest(true);
                        }}
                        className="w-full bg-[#ff5e3a] hover:bg-[#e04628] text-white px-4 py-2.5 rounded text-[13px] font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Create Request
                      </button>
                      <button
                        onClick={() => setActiveTab("projects")}
                        className="w-full bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#334155] px-4 py-2.5 rounded text-[13px] font-medium transition-colors"
                      >
                        View All Projects
                      </button>
                      <button
                        onClick={() => setActiveTab("suppliers")}
                        className="w-full bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-[#334155] px-4 py-2.5 rounded text-[13px] font-medium transition-colors"
                      >
                        View All Suppliers
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "requests" && (
            <div className="min-w-[1802px]">
              {/* Table Header */}
              <div className="sticky top-0 bg-[#f8fafc] border-b border-[#e2e8f0] flex text-[12px] font-semibold text-[#64748b] z-10">
                <div className="w-[153.86px] px-3 py-2 border-r border-[#e2e8f0]">Request ID</div>
                <div className="w-[230.8px] px-3 py-2 border-r border-[#e2e8f0]">Request Name</div>
                <div className="w-[173.09px] px-3 py-2 border-r border-[#e2e8f0]">Status</div>
                <div className="w-[269.25px] px-3 py-2 border-r border-[#e2e8f0]">Project</div>
                <div className="w-[192.33px] px-3 py-2 border-r border-[#e2e8f0]">Supplier</div>
                <div className="w-[192.33px] px-3 py-2 border-r border-[#e2e8f0]">Requester</div>
                <div className="w-[96.16px] px-3 py-2 border-r border-[#e2e8f0]">VAT</div>
                <div className="w-[153.86px] px-3 py-2 border-r border-[#e2e8f0]">Amount</div>
                <div className="w-[230.8px] px-3 py-2 border-r border-[#e2e8f0]">Assignee</div>
                <div className="w-[115.45px] px-3 py-2 text-center">Actions</div>
              </div>

              {/* Table Body */}
              <div className="bg-white">
                {mockData.map((request, index) => (
                  <div
                    key={request.id}
                    className={`flex text-[12px] border-t border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group ${
                      index === 0 ? "border-t-0" : ""
                    }`}
                  >
                    <div className="w-[153.86px] px-3 py-4 font-medium text-[#64748b]">{request.id}</div>
                    <div className="w-[230.8px] px-3 py-4 font-medium text-[#334155]">{request.name}</div>
                    <div className="w-[173.09px] px-3 py-3.5">
                      <span
                        className={`${statusConfig[request.status].bg} ${
                          statusConfig[request.status].text
                        } px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.5px] inline-block`}
                      >
                        {statusConfig[request.status].label}
                      </span>
                    </div>
                    <div className="w-[269.25px] px-3 py-4 text-[#475569]">{request.project}</div>
                    <div className="w-[192.33px] px-3 py-4 text-[#475569]">{request.supplier}</div>
                    <div className="w-[192.33px] px-3 py-4 text-[#475569]">{request.requester}</div>
                    <div className="w-[96.16px] px-3 py-4 text-center text-[#64748b]">{request.vat}</div>
                    <div className="w-[153.86px] px-3 py-4 font-bold text-[#0f172a]">{request.amount}</div>
                    <div className="w-[230.8px] px-3 py-4 flex items-center gap-1.5">
                      <img src={request.assigneeAvatar} alt="" className="w-5 h-5 rounded-full" />
                      <span className="text-[11px] text-[#0f172a]">{request.assignee}</span>
                    </div>
                    <div className="w-[115.45px] px-3 py-2 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ffe9e3] rounded"
                      >
                        <Eye className="w-4 h-4 text-[#FF5E3A]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "kanban" && <KanbanView data={mockData} onRequestClick={(request) => setSelectedRequest(request)} />}

          {activeTab === "floorview" && <FloorView />}

          {activeTab === "infrastructure" && <InfrastructureView />}

          {activeTab === "manufacturing" && <ManufacturingView />}

          {activeTab === "scheduling" && <SchedulingEngine />}

          {activeTab === "projects" && (
            <div className="min-w-[1600px]">
              {/* Projects Table Header */}
              <div className="sticky top-0 bg-[#f8fafc] border-b border-[#e2e8f0] flex text-[12px] font-semibold text-[#64748b] z-10">
                <div className="w-[300px] px-3 py-2 border-r border-[#e2e8f0]">Project Name</div>
                <div className="w-[250px] px-3 py-2 border-r border-[#e2e8f0]">Client Name</div>
                <div className="w-[250px] px-3 py-2 border-r border-[#e2e8f0]">PM Name</div>
                <div className="w-[200px] px-3 py-2 border-r border-[#e2e8f0]">Status</div>
                <div className="w-[200px] px-3 py-2 border-r border-[#e2e8f0]">Total Requests</div>
                <div className="w-[150px] px-3 py-2 text-center">Actions</div>
              </div>

              {/* Projects Table Body */}
              <div className="bg-white">
                {projectsData.map((project, index) => (
                  <div
                    key={project.id}
                    className={`flex text-[12px] border-t border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group ${
                      index === 0 ? "border-t-0" : ""
                    }`}
                  >
                    <div className="w-[300px] px-3 py-4 font-medium text-[#334155]">{project.name}</div>
                    <div className="w-[250px] px-3 py-4 text-[#475569]">{project.clientName}</div>
                    <div className="w-[250px] px-3 py-4 text-[#475569]">{project.pmName}</div>
                    <div className="w-[200px] px-3 py-3.5">
                      <span
                        className={`${
                          project.status === "active" ? "bg-[#d1fae5] text-[#065f46]" : "bg-[#fee2e2] text-[#b91c1c]"
                        } px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.5px] inline-block`}
                      >
                        {project.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="w-[200px] px-3 py-4 text-center">
                      <span className="bg-[#f1f5f9] text-[#334155] px-2 py-1 rounded text-[11px] font-semibold">
                        {project.totalRequests} Requests
                      </span>
                    </div>
                    <div className="w-[150px] px-3 py-2 flex items-center justify-center">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setProjectName(project.name);
                          setClientName(project.clientName);
                          setPmName(project.pmName);
                          setProjectStatus(project.status);
                          setShowEditProject(true);
                        }}
                        className="px-3 py-1.5 text-[11px] font-medium text-[#ff5e3a] hover:bg-[#ffe9e3] rounded transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "suppliers" && (
            <div className="min-w-[2000px]">
              {/* Suppliers Table Header */}
              <div className="sticky top-0 bg-[#f8fafc] border-b border-[#e2e8f0] flex text-[12px] font-semibold text-[#64748b] z-10">
                <div className="w-[200px] px-3 py-2 border-r border-[#e2e8f0]">Supplier Name</div>
                <div className="w-[150px] px-3 py-2 border-r border-[#e2e8f0]">City</div>
                <div className="w-[350px] px-3 py-2 border-r border-[#e2e8f0]">Full Address</div>
                <div className="w-[200px] px-3 py-2 border-r border-[#e2e8f0]">Contact Person</div>
                <div className="w-[250px] px-3 py-2 border-r border-[#e2e8f0]">Email</div>
                <div className="w-[180px] px-3 py-2 border-r border-[#e2e8f0]">Mobile Number</div>
                <div className="w-[150px] px-3 py-2 border-r border-[#e2e8f0]">Status</div>
                <div className="w-[170px] px-3 py-2 border-r border-[#e2e8f0]">Total Requests</div>
                <div className="w-[150px] px-3 py-2 text-center">Actions</div>
              </div>

              {/* Suppliers Table Body */}
              <div className="bg-white">
                {suppliersData.map((supplier, index) => (
                  <div
                    key={supplier.id}
                    className={`flex text-[12px] border-t border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group ${
                      index === 0 ? "border-t-0" : ""
                    }`}
                  >
                    <div className="w-[200px] px-3 py-4 font-medium text-[#334155]">{supplier.name}</div>
                    <div className="w-[150px] px-3 py-4 text-[#475569]">{supplier.city}</div>
                    <div className="w-[350px] px-3 py-4 text-[#475569]">{supplier.address}</div>
                    <div className="w-[200px] px-3 py-4 text-[#475569]">{supplier.contactPerson}</div>
                    <div className="w-[250px] px-3 py-4 text-[#475569]">{supplier.email}</div>
                    <div className="w-[180px] px-3 py-4 text-[#475569]">{supplier.mobile}</div>
                    <div className="w-[150px] px-3 py-3.5">
                      <span
                        className={`${
                          supplier.status === "active" ? "bg-[#d1fae5] text-[#065f46]" : "bg-[#fee2e2] text-[#b91c1c]"
                        } px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.5px] inline-block`}
                      >
                        {supplier.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="w-[170px] px-3 py-4 text-center">
                      <span className="bg-[#f1f5f9] text-[#334155] px-2 py-1 rounded text-[11px] font-semibold">
                        {supplier.totalRequests} Requests
                      </span>
                    </div>
                    <div className="w-[150px] px-3 py-2 flex items-center justify-center">
                      <button
                        className="px-3 py-1.5 text-[11px] font-medium text-[#ff5e3a] hover:bg-[#ffe9e3] rounded transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="flex h-full">
              {/* Left Submenu */}
              <div className="w-[240px] bg-white border-r border-[#e2e8f0] flex-shrink-0">
                <div className="p-4">
                  <h3 className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-3">
                    Settings
                  </h3>
                  <nav className="space-y-1">
                    <button
                      onClick={() => setSettingsSubmenu("users")}
                      className={`w-full text-left px-3 py-2 rounded text-[13px] font-medium transition-colors ${
                        settingsSubmenu === "users"
                          ? "bg-[#ffe9e3] text-[#ff5e3a]"
                          : "text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                    >
                      User List
                    </button>
                    <button
                      onClick={() => setSettingsSubmenu("roles")}
                      className={`w-full text-left px-3 py-2 rounded text-[13px] font-medium transition-colors ${
                        settingsSubmenu === "roles"
                          ? "bg-[#ffe9e3] text-[#ff5e3a]"
                          : "text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                    >
                      Roles
                    </button>
                    <button
                      onClick={() => {
                        setSettingsSubmenu("workflow");
                        setShowWorkflowBuilder(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-[13px] font-medium transition-colors ${
                        settingsSubmenu === "workflow"
                          ? "bg-[#ffe9e3] text-[#ff5e3a]"
                          : "text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                    >
                      Workflow
                    </button>
                  </nav>
                </div>
              </div>

              {/* Right Content Area */}
              <div className="flex-1 overflow-auto">
                {settingsSubmenu === "users" && (
                  <div className="min-w-[1600px]">
                    {/* Users Table Header */}
                    <div className="sticky top-0 bg-[#f8fafc] border-b border-[#e2e8f0] flex text-[12px] font-semibold text-[#64748b] z-10">
                      <div className="w-[250px] px-3 py-2 border-r border-[#e2e8f0]">Name</div>
                      <div className="w-[280px] px-3 py-2 border-r border-[#e2e8f0]">Email</div>
                      <div className="w-[200px] px-3 py-2 border-r border-[#e2e8f0]">Role</div>
                      <div className="w-[250px] px-3 py-2 border-r border-[#e2e8f0]">Company</div>
                      <div className="w-[150px] px-3 py-2 border-r border-[#e2e8f0]">Status</div>
                      <div className="w-[180px] px-3 py-2 border-r border-[#e2e8f0]">Join Date</div>
                      <div className="w-[150px] px-3 py-2 text-center">Actions</div>
                    </div>

                    {/* Users Table Body */}
                    <div className="bg-white">
                      {usersData.map((user, index) => (
                        <div
                          key={user.id}
                          className={`flex text-[12px] border-t border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group ${
                            index === 0 ? "border-t-0" : ""
                          }`}
                        >
                          <div className="w-[250px] px-3 py-4 font-medium text-[#334155]">{user.name}</div>
                          <div className="w-[280px] px-3 py-4 text-[#475569]">{user.email}</div>
                          <div className="w-[200px] px-3 py-4 text-[#475569]">{user.role}</div>
                          <div className="w-[250px] px-3 py-4 text-[#475569]">{user.company}</div>
                          <div className="w-[150px] px-3 py-3.5">
                            <span
                              className={`${
                                user.status === "active" ? "bg-[#d1fae5] text-[#065f46]" : "bg-[#fee2e2] text-[#b91c1c]"
                              } px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.5px] inline-block`}
                            >
                              {user.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <div className="w-[180px] px-3 py-4 text-[#475569]">{user.joinDate}</div>
                          <div className="w-[150px] px-3 py-2 flex items-center justify-center">
                            <button className="px-3 py-1.5 text-[11px] font-medium text-[#ff5e3a] hover:bg-[#ffe9e3] rounded transition-colors opacity-0 group-hover:opacity-100">
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {settingsSubmenu === "roles" && (
                  <div className="min-w-[1400px]">
                    {/* Roles Table Header */}
                    <div className="sticky top-0 bg-[#f8fafc] border-b border-[#e2e8f0] flex text-[12px] font-semibold text-[#64748b] z-10">
                      <div className="w-[300px] px-3 py-2 border-r border-[#e2e8f0]">Role Name</div>
                      <div className="w-[700px] px-3 py-2 border-r border-[#e2e8f0]">Description</div>
                      <div className="w-[150px] px-3 py-2 text-center">Actions</div>
                    </div>

                    {/* Roles Table Body */}
                    <div className="bg-white">
                      {rolesData.map((role, index) => (
                        <div
                          key={role.id}
                          className={`flex text-[12px] border-t border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group ${
                            index === 0 ? "border-t-0" : ""
                          }`}
                        >
                          <div className="w-[300px] px-3 py-4 font-medium text-[#334155]">{role.name}</div>
                          <div className="w-[700px] px-3 py-4 text-[#475569]">{role.description}</div>
                          <div className="w-[150px] px-3 py-2 flex items-center justify-center">
                            <button className="px-3 py-1.5 text-[11px] font-medium text-[#ff5e3a] hover:bg-[#ffe9e3] rounded transition-colors opacity-0 group-hover:opacity-100">
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {settingsSubmenu === "workflow" && (
                  <>
                    {showWorkflowBuilder ? (
                      <div className="h-full">
                        <WorkflowBuilder onBack={() => setShowWorkflowBuilder(false)} />
                      </div>
                    ) : (
                      <div className="min-w-[1400px]">
                        {/* Workflow Table Header */}
                        <div className="sticky top-0 bg-[#f8fafc] border-b border-[#e2e8f0] flex text-[12px] font-semibold text-[#64748b] z-10">
                          <div className="w-[400px] px-3 py-2 border-r border-[#e2e8f0]">Workflow Name</div>
                          <div className="w-[600px] px-3 py-2 border-r border-[#e2e8f0]">Description</div>
                          <div className="w-[150px] px-3 py-2 border-r border-[#e2e8f0] text-center">Status</div>
                          <div className="w-[150px] px-3 py-2 text-center">Actions</div>
                        </div>

                        {/* Workflow Table Body */}
                        <div className="bg-white">
                          {workflowSchemas.map((workflow, index) => (
                            <div
                              key={workflow.id}
                              className={`flex text-[12px] border-t border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group ${
                                index === 0 ? "border-t-0" : ""
                              }`}
                            >
                              <div className="w-[400px] px-3 py-4 font-medium text-[#334155]">{workflow.name}</div>
                              <div className="w-[600px] px-3 py-4 text-[#475569]">{workflow.description}</div>
                              <div className="w-[150px] px-3 py-2 flex items-center justify-center">
                                <button
                                  className={`relative w-12 h-6 rounded-full transition-colors ${
                                    workflow.isActive ? "bg-[#10b981]" : "bg-[#e2e8f0]"
                                  }`}
                                >
                                  <span
                                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                                      workflow.isActive ? "right-0.5" : "left-0.5"
                                    }`}
                                  />
                                </button>
                              </div>
                              <div className="w-[150px] px-3 py-2 flex items-center justify-center">
                                <button 
                                  onClick={() => setShowWorkflowBuilder(true)}
                                  className="px-3 py-1.5 text-[11px] font-medium text-[#ff5e3a] hover:bg-[#ffe9e3] rounded transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {activeTab !== "dashboard" && (
        <div className="bg-white border-t border-[#e2e8f0] px-3 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-[11px] md:text-[12px] text-[#64748b]">
            <span>Items per page:</span>
            <select className="border border-[#e2e8f0] rounded px-2 py-1 text-[11px] md:text-[12px] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a]">
              <option>15</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="ml-2 md:ml-4">1-15 of 100</span>
          </div>

          <div className="flex items-center gap-1">
            <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded hover:bg-gray-100 text-[#64748b]">
              <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded bg-[#ff5e3a] text-white text-[11px] md:text-[12px] font-medium">
              1
            </button>
            <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded hover:bg-gray-100 text-[#64748b] text-[11px] md:text-[12px] font-medium">
              2
            </button>
            <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded hover:bg-gray-100 text-[#64748b] text-[11px] md:text-[12px] font-medium">
              3
            </button>
            <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded hover:bg-gray-100 text-[#64748b]">
              <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
        )}

      {/* Create Request Slide-out Panel */}
      {showCreateRequest && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowCreateRequest(false)}
          />

          {/* Slide-out Panel */}
          <div className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="px-4 md:px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
              <h2 className="font-['Inter'] font-bold text-[16px] md:text-[18px] text-[#0f172a]">Create New Request</h2>
              <button
                onClick={() => setShowCreateRequest(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#64748b]" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6">
              <div className="space-y-6">
                {/* Request Name */}
                <div>
                  <label className="block text-[13px] font-medium text-[#334155] mb-2">
                    Request Name <span className="text-[#ff5e3a]">*</span>
                  </label>
                  <input
                    type="text"
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    placeholder="Enter request name"
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded text-[13px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                  />
                </div>

                {/* Project */}
                <div>
                  <label className="block text-[13px] font-medium text-[#334155] mb-2">
                    Project <span className="text-[#ff5e3a]">*</span>
                  </label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded text-[13px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                  >
                    <option value="">Choose Project</option>
                    {projectList.map((project) => (
                      <option key={project} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Supplier */}
                <div>
                  <label className="block text-[13px] font-medium text-[#334155] mb-2">
                    Supplier Name <span className="text-[#ff5e3a]">*</span>
                  </label>
                  <select
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded text-[13px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                  >
                    <option value="">Choose Supplier</option>
                    {supplierList.map((supplier) => (
                      <option key={supplier} value={supplier}>
                        {supplier}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowAddSupplier(true)}
                    className="mt-2 flex items-center gap-1.5 text-[13px] text-[#ff5e3a] hover:text-[#e04628] font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Supplier
                  </button>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-[13px] font-medium text-[#334155] mb-2">
                    Amount <span className="text-[#ff5e3a]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 pr-12 border border-[#e2e8f0] rounded text-[13px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#64748b] font-medium">
                      SAR
                    </span>
                  </div>
                </div>

                {/* VAT % */}
                <div>
                  <label className="block text-[13px] font-medium text-[#334155] mb-2">
                    VAT % <span className="text-[#ff5e3a]">*</span>
                  </label>
                  <select
                    value={vatPercent}
                    onChange={(e) => setVatPercent(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded text-[13px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                  >
                    {vatOptions.map((vat) => (
                      <option key={vat} value={vat}>
                        {vat}%
                      </option>
                    ))}
                  </select>
                </div>

                {/* Attachments */}
                <div>
                  <label className="block text-[13px] font-medium text-[#334155] mb-2">
                    Attachments
                  </label>
                  <div className="border-2 border-dashed border-[#e2e8f0] rounded p-4 text-center hover:border-[#ff5e3a] transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-[#94a3b8]" />
                      <span className="text-[13px] text-[#64748b]">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-[11px] text-[#94a3b8]">
                        PDF, DOC, JPG, PNG (max. 10MB)
                      </span>
                    </label>
                  </div>

                  {/* Attached Files List */}
                  {attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-[#f8fafc] rounded border border-[#e2e8f0]"
                        >
                          <span className="text-[12px] text-[#334155] truncate flex-1">
                            {file.name}
                          </span>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="ml-2 p-1 hover:bg-[#fee2e2] rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-[#ef4444]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#e2e8f0] flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCreateRequest(false)}
                className="px-4 py-2 text-[13px] font-medium text-[#64748b] hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequest}
                className="px-4 py-2 text-[13px] font-semibold text-white bg-[#ff5e3a] hover:bg-[#e04628] rounded transition-colors"
              >
                Create Request
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add Supplier Modal */}
      {showAddSupplier && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setShowAddSupplier(false)}
          />

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[450px] bg-white rounded-lg shadow-2xl z-[70]">
            {/* Header */}
            <div className="px-4 md:px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
              <h3 className="font-['Inter'] font-bold text-[15px] md:text-[16px] text-[#0f172a]">Add New Supplier</h3>
              <button
                onClick={() => setShowAddSupplier(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#64748b]" />
              </button>
            </div>

            {/* Form */}
            <div className="px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-5">
              <div>
                <label className="block text-[12px] md:text-[13px] font-medium text-[#334155] mb-2">
                  Supplier Name <span className="text-[#ff5e3a]">*</span>
                </label>
                <input
                  type="text"
                  value={newSupplierName}
                  onChange={(e) => setNewSupplierName(e.target.value)}
                  placeholder="Enter supplier name"
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded text-[12px] md:text-[13px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[12px] md:text-[13px] font-medium text-[#334155] mb-2">
                  Contact Name <span className="text-[#ff5e3a]">*</span>
                </label>
                <input
                  type="text"
                  value={newSupplierContactName}
                  onChange={(e) => setNewSupplierContactName(e.target.value)}
                  placeholder="Enter contact name"
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded text-[12px] md:text-[13px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[12px] md:text-[13px] font-medium text-[#334155] mb-2">
                  Contact Email <span className="text-[#ff5e3a]">*</span>
                </label>
                <input
                  type="email"
                  value={newSupplierContactEmail}
                  onChange={(e) => setNewSupplierContactEmail(e.target.value)}
                  placeholder="Enter contact email"
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded text-[12px] md:text-[13px] text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#ff5e3a] focus:border-transparent"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 md:px-6 py-3 md:py-4 border-t border-[#e2e8f0] flex items-center justify-end gap-2 md:gap-3">
              <button
                onClick={() => setShowAddSupplier(false)}
                className="px-3 md:px-4 py-2 text-[12px] md:text-[13px] font-medium text-[#64748b] hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSupplier}
                className="px-3 md:px-4 py-2 text-[12px] md:text-[13px] font-semibold text-white bg-[#ff5e3a] hover:bg-[#e04628] rounded transition-colors"
              >
                Add Supplier
              </button>
            </div>
          </div>
        </>
      )}

      {/* Request Detail Slider */}
      <RequestDetailSlider request={selectedRequest} onClose={() => setSelectedRequest(null)} />
    </div>
  );
}