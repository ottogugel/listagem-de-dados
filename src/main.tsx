import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { App } from './app'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from "sonner";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors/>
    </QueryClientProvider>
  </React.StrictMode>
);
