import { Check, X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import * as Dialog from '@radix-ui/react-dialog'

const createTagSchema = z.object({
  name: z.string().min(3, {message: "Minimum 3 Characters"}),
  slug: z.string(),
})

type CreateTagSchema = z.infer<typeof createTagSchema>;

// transformar em LowerCase, retirando caracteres especiais, etc.
function getSlugFromString(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-");
}

export function CreateTagForm() {

   // React Hook Form + Zod + ZodResolver
    const { register, handleSubmit, watch } = useForm<CreateTagSchema>({
      resolver: zodResolver(createTagSchema),
    });

    async function createTag({ name, slug }: CreateTagSchema) {
      await fetch('http://localhost:3333/tags', {
      method: 'POST',
      body: JSON.stringify({
        name,
        slug,
        }),
      })
    }

    const generatedSlug = watch("name") ? getSlugFromString(watch("name")) : ""; // o valor do slug vai observar a variavel name mudar e atribuir a essa variavel.


  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit(createTag)}>
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="name">
          Tag Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="border border-zinc-800 px-3 py-2.5 rounded-lg bg-zinc-800/50 w-full text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">
          Slug
        </label>
        <input
          {...register("slug")}
          id="slug"
          type="text"
          readOnly
          value={generatedSlug}
          className="border border-zinc-800 px-3 py-2.5 rounded-lg bg-zinc-800/50 w-full text-sm"
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Dialog.Close asChild>
          <Button type="submit">
            <X className="size-3" /> Cancel
          </Button>
        </Dialog.Close>
        <Button type="submit" className="bg-teal-400 text-teal-900">
          <Check className="size-3" /> Save
        </Button>
      </div>
    </form>
  );
}