import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";

import { App } from "./app";
import { TagsPage } from "./pages/TagsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { UploadPages } from "./pages/UploadsPage";
import { useAuthStore } from "./store/authStore";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

// Componente wrapper para proteção de rotas
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

// Configuração das rotas
const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
    {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
       <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/uploads",
    element: (
      <ProtectedRoute>
        <UploadPages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tags",
    element: (
      <ProtectedRoute>
        <TagsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryClientProvider>
  </React.StrictMode>
);