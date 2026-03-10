import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import { PaymentRequestsPage } from "./pages/PaymentRequestsPage";
import DailySiteReportDetailPage from "./pages/DailySiteReportDetailPage";
import CreateDailySiteReportPage from "./pages/CreateDailySiteReportPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "projects",
        Component: ProjectsPage,
      },
      {
        path: "projects/:projectId",
        Component: ProjectDetailPage,
      },
      {
        path: "projects/:projectId/reports/create",
        Component: CreateDailySiteReportPage,
      },
      {
        path: "projects/:projectId/reports/:reportId",
        Component: DailySiteReportDetailPage,
      },
      {
        path: "payment-requests",
        Component: PaymentRequestsPage,
      },
    ],
  },
]);