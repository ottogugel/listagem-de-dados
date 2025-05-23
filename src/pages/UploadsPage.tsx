import { FileDown, Tags, MoreHorizontal, Search } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { Header } from "../components/header";
import { Tabs } from "../components/tabs";
import { Button } from "../components/ui/button";
import { Control, Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Pagination } from "../components/pagination";
import { Spinner } from "../components/ui/spinner";

// Interface para os dados dos uploads
export interface UploadResponse {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Upload[];
}

export interface Upload {
  id: string;
  title: string;
  duration: string;
  size: string;
  status: 'READY' | 'PROCESSING' | 'ERROR';
  uploadedAt: string;
}

export function UploadPages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter") ?? "";
  const [filter, setFilter] = useState(urlFilter);
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Mock data - substitua por sua chamada API real
  const mockUploads: Upload[] = [
    {
      id: "fabs4dae-7fd-483f-82ab-20f05d3d0del",
      title: "Criando seed com Drizzle",
      duration: "12:37",
      size: "90.73 MB",
      status: "READY",
      uploadedAt: "7 days ago"
    },
    {
      id: "99b814be-5947-46ac-8af7-c9d830059e9f",
      title: "Criando API com Bun e Elysia",
      duration: "12:29",
      size: "130.54 MB",
      status: "PROCESSING",
      uploadedAt: "12 days ago"
    },
    {
      id: "fabs4dae-7fd-483f-82ab-20f05d3d0del",
      title: "Conectando no PostgreSQL",
      duration: "12:29",
      size: "90.73 MB",
      status: "ERROR",
      uploadedAt: "1 month ago"
    },
    // Adicione mais itens conforme necessário
  ];

  const mockResponse: UploadResponse = {
    first: 1,
    prev: null,
    next: 2,
    last: 11,
    pages: 11,
    items: 228,
    data: mockUploads
  };

  // Simulação de chamada API - substitua por sua implementação real
  const { data: uploadsResponse, isLoading } = useQuery<UploadResponse>({
    queryKey: ["get-uploads", urlFilter, page],
    queryFn: async () => {
      // Simulação de delay de API
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Em uma aplicação real, você faria:
      // const response = await fetch(`http://localhost:3333/uploads?_page=${page}&_per_page=10&title=${urlFilter}`);
      // return await response.json();
      
      return mockResponse;
    },
    placeholderData: keepPreviousData,
  });

  function handleFilter() {
    setSearchParams((params) => {
      params.set("page", "1");
      params.set("filter", filter);
      return params;
    });
  }

  if (isLoading) {
    return <Spinner />;
  }

  // Função para estilizar o status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'READY':
        return 'text-green-600';
      case 'PROCESSING':
        return 'text-yellow-600';
      case 'ERROR':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Uploads</h1>
          <div className="flex items-center gap-2">
            <Input variant="filter">
              <Search className="size-3" />
              <Control
                placeholder="Search uploads..."
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              />
            </Input>
            <Button onClick={handleFilter}>
              <Tags className="size-3" />
              Tags
            </Button>
            <Button>
              <FileDown className="size-3" />
              Export
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Video</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded at</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploadsResponse?.data.map((upload) => (
              <TableRow key={upload.id}>
                <TableCell className="font-medium">
                  {upload.title}
                  <div className="text-xs text-muted-foreground">
                    {upload.id}
                  </div>
                </TableCell>
                <TableCell>{upload.duration}</TableCell>
                <TableCell>{upload.size}</TableCell>
                <TableCell className={getStatusStyle(upload.status)}>
                  ({upload.status})
                </TableCell>
                <TableCell>{upload.uploadedAt}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {uploadsResponse && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>10</strong> of <strong>{uploadsResponse.items}</strong> items
            </div>
            <Pagination
              pages={uploadsResponse.pages}
              items={uploadsResponse.items}
              page={page}
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page</span>
              <select className="bg-transparent border rounded px-2 py-1">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}