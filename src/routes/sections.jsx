import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "src/layouts/dashboard";

import AuthGuard from "../authGuard/authGuard";

export const IndexPage = lazy(() => import("src/pages/app"));
export const EditContent = lazy(() => import("src/pages/editcontent"));
export const ComapanyCategoryPage = lazy(() => import("src/pages/user"));
export const LoginPage = lazy(() => import("src/pages/login"));
export const ProductsPage = lazy(() => import("src/pages/products"));
export const Page404 = lazy(() => import("src/pages/page-not-found"));
export const Product = lazy(() => import("src/pages/one-product"));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <AuthGuard>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </AuthGuard>
      ),
      children: [
        { path: "/dashboard", element: <IndexPage /> },
        { path: "/companyandcategory", element: <ComapanyCategoryPage /> },
        { path: "/products", element: <ProductsPage /> },
        { path: "/editcontent", element: <EditContent /> },
        { path: "/product", element: <Product /> },
      ],
    },
    {
      path: "/",
      element: <LoginPage />,
      index: true,
    },
    {
      path: "/404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
