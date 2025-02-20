import { FileDown, Filter, MoreHorizontal, Search } from "lucide-react";
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
import { Spinner } from "../components/ui/spinner"; // Importe o Spinner

// JSON -> Typescript
export interface TagResponse {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Tag[];
}

export interface Tag {
  title: string;
  slug: string;
  amountOfVideos: number;
  id: string;
}

export function UploadPages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter") ?? "";

  const [filter, setFilter] = useState(urlFilter);

  // Converter a página em um número se não estarei na página 1.
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Função que vai me devolver os dados da API. (Requisição GET)
  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ["get-tags", urlFilter, page], // Buscar Tags
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`
      );
      const data = await response.json();

      // delay 2s
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return data;
    },
    // Não vai ficar recarregando a tela ao voltar de pagina.
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
    return <Spinner />; // Exibe o spinner enquanto os dados estão sendo carregados
  }

  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Input variant="filter">
              <Search className="size-3" />
              <Control
                placeholder="Search uploads..."
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              />
            </Input>
            <Button onClick={handleFilter}>
              <Filter className="size-3" />
              Filter
            </Button>
          </div>

          <Button>
            <FileDown className="size-3" />
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* CRIAR UM ARRAY APARTIR DE UMA LENGTH ESPECIFICADA */}
            {tagsResponse?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell>
                    <span className="text-xs">{tag.id}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{tag.title}</span>
                      <span className="text-xs text-zinc-500">{tag.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {tag.amountOfVideos}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {tagsResponse && (
          <Pagination
            pages={tagsResponse.pages}
            items={tagsResponse.items}
            page={page}
          />
        )}
      </main>
    </div>
  );
}
