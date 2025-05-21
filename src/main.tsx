import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";

import { App } from "./app";
import { TagsPage } from "./pages/TagsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { UploadPages } from "./pages/UploadsPage";

const queryClient = new QueryClient();

// Configuração das rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Página inicial (se necessário)
  },
  {
    path: "/uploads",
    element: <UploadPages />, // Página de Uploads
  },
  {
    path: "/tags",
    element: <TagsPage />, // Página de tags
  },
  {
    path: "/settings",
    element: <SettingsPage />, // Página de tags
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
