import { FileDown, Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

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
import { CreateTagForm } from "../components/ui/create-tag-form";

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
  id: string;
  amountOfVideos: number;
}

export function TagsPage() {
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
        <div className="flex items-center gap-3 ml-2 mt-4">
          <h1 className="text-xl font-bold">Tags</h1>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="primary">
                <Plus className="size-3" />
                Create new
              </Button>
            </Dialog.Trigger>

            {/*  Acessibilidade para o modal. */}
            <Dialog.Portal>
              {/* Div preta que fica no conteudo */}
              <Dialog.Overlay className="fixed inset-0 bg-black/70" />
              <Dialog.Content className="space-y-10 fixed p-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-900">
                <div className="space-y-3">
                  <Dialog.Title className="text-xl font-bold">
                    Create Tag
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-zinc-500">
                    Tags can be used to group videos about similar concepts.
                  </Dialog.Description>
                </div>
                <CreateTagForm />
                <Dialog.Close />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Input variant="filter">
              <Search className="size-3" />
              <Control
                placeholder="Search Tags..."
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
              <TableHead className="w-[40%]">Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* CRIAR UM ARRAY APARTIR DE UMA LENGTH ESPECIFICADA */}
            {tagsResponse?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell>{tag.title}</TableCell>
                  <TableCell>{tag.amountOfVideos}</TableCell>
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
