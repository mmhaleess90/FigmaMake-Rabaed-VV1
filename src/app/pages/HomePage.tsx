import { useNavigate } from "react-router";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-auto">
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-[#f8fafc] min-h-full">
        {/* Home Header */}
        <div className="mb-6 md:mb-8 lg:mb-10">
          <h1 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#0f172a] mb-2">
            Welcome to Rabaed
          </h1>
          <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-[#64748b]">
            Select a module to get started with your work
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-[1400px]">
          {/* Projects Module */}
          <button
            onClick={() => navigate("/projects")}
            className="bg-white rounded-lg sm:rounded-xl border-2 border-[#e2e8f0] p-5 sm:p-6 md:p-7 lg:p-8 hover:border-[#ff5e3a] hover:shadow-lg transition-all duration-200 text-left group w-full"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#FEDDD7] rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24">
                <g>
                  <path d="M3 3h8v8H3V3z" stroke="#FA7258" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 13h8v8H3v-8z" stroke="#FA7258" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 3h8v8h-8V3z" stroke="#FA7258" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 13h8v8h-8v-8z" stroke="#FA7258" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </div>
            <h3 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-bold text-[#0f172a] mb-1.5 sm:mb-2 group-hover:text-[#ff5e3a] transition-colors">
              Projects
            </h3>
            <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#64748b] leading-relaxed">
              Manage and track all your construction projects in one place
            </p>
          </button>

          {/* Payment Requests Module */}
          <button
            onClick={() => navigate("/payment-requests")}
            className="bg-white rounded-lg sm:rounded-xl border-2 border-[#e2e8f0] p-5 sm:p-6 md:p-7 lg:p-8 hover:border-[#ff5e3a] hover:shadow-lg transition-all duration-200 text-left group w-full"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#FFF5E6] rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24">
                <g>
                  <rect width="18" height="14" x="3" y="5" stroke="#FA7258" strokeWidth="1.5" rx="2" fill="none" />
                  <path d="M3 10h18" stroke="#FA7258" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7 15h4" stroke="#FA7258" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7 17.5h2" stroke="#FA7258" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
            <h3 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-bold text-[#0f172a] mb-1.5 sm:mb-2 group-hover:text-[#ff5e3a] transition-colors">
              Payment Requests
            </h3>
            <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#64748b] leading-relaxed">
              Create, review, and approve payment requests efficiently
            </p>
          </button>

          {/* Coming Soon Module 1 - Contracts */}
          <div className="bg-white rounded-lg sm:rounded-xl border-2 border-[#e2e8f0] p-5 sm:p-6 md:p-7 lg:p-8 opacity-60 text-left relative overflow-hidden cursor-not-allowed w-full">
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#64748b] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              COMING SOON
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#E8F4FF] rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24">
                <g>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#2196F3" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6" stroke="#2196F3" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="#2196F3" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="#2196F3" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="#2196F3" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </div>
            <h3 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-bold text-[#0f172a] mb-1.5 sm:mb-2">
              Contracts
            </h3>
            <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#64748b] leading-relaxed">
              Manage contracts and agreements with suppliers and contractors
            </p>
          </div>

          {/* Coming Soon Module 2 - Reports */}
          <div className="bg-white rounded-lg sm:rounded-xl border-2 border-[#e2e8f0] p-5 sm:p-6 md:p-7 lg:p-8 opacity-60 text-left relative overflow-hidden cursor-not-allowed w-full">
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#64748b] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              COMING SOON
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#F3E8FF] rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24">
                <g>
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="#9333EA" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 12A10 10 0 0 0 12 2v10z" stroke="#9333EA" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </div>
            <h3 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-bold text-[#0f172a] mb-1.5 sm:mb-2">
              Reports & Analytics
            </h3>
            <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#64748b] leading-relaxed">
              Generate insights and reports on project performance and finances
            </p>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-[1400px]">
          <h2 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-bold text-[#0f172a] mb-3 sm:mb-4">
            Quick Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <div className="bg-white rounded-lg border border-[#e2e8f0] p-3 sm:p-4">
              <div className="text-[10px] sm:text-[11px] text-[#64748b] uppercase tracking-wider mb-1">
                Active Projects
              </div>
              <div className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold text-[#0f172a]">
                12
              </div>
            </div>
            <div className="bg-white rounded-lg border border-[#e2e8f0] p-3 sm:p-4">
              <div className="text-[10px] sm:text-[11px] text-[#64748b] uppercase tracking-wider mb-1">
                Pending Requests
              </div>
              <div className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold text-[#0f172a]">
                23
              </div>
            </div>
            <div className="bg-white rounded-lg border border-[#e2e8f0] p-3 sm:p-4">
              <div className="text-[10px] sm:text-[11px] text-[#64748b] uppercase tracking-wider mb-1">
                Total Suppliers
              </div>
              <div className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold text-[#0f172a]">
                45
              </div>
            </div>
            <div className="bg-white rounded-lg border border-[#e2e8f0] p-3 sm:p-4">
              <div className="text-[10px] sm:text-[11px] text-[#64748b] uppercase tracking-wider mb-1">
                Active Users
              </div>
              <div className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold text-[#0f172a]">
                8
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}