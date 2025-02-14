import { CreateTagForm } from "../components/ui/create-tag-form";
import * as Dialog from "@radix-ui/react-dialog";
import { Header } from "../components/header";
import { Tabs } from "../components/tabs";
import { Button } from "../components/ui/button";
import { Filter, Plus, Search } from "lucide-react";
import { Input, Control } from "../components/ui/input";

export function TagsPage() {
  return (
    <div className="py-10 ">
      <Header />
      <Tabs />
      <div className="flex items-center gap-3 ml-48 mt-4">
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
      <div>
        <div className="flex items-center justify-between ml-48 mt-4">
          <div className="flex items-center">
            <Input variant="filter">
              <Search className="size-3" />
              <Control
                placeholder="Search tags..."
                value={''}
              />
            </Input>
            <Button>
              <Filter className="size-3" />
              Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
