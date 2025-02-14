import { ListVideo, Tags, Settings, Code2, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Importe useLocation

export function Tabs() {
  const location = useLocation(); // Hook para pegar a rota atual

  // Função para verificar se a rota está ativa
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="border-b border-zinc-800 py-4">
      <nav className="flex items-center gap-2 max-w-[1200px] mx-auto">
        <Link
          to="/home"
          className={`py-1.5 px-3 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border transition-colors ${
            isActive("/home")
              ? "bg-zinc-800 text-zinc-100 border-zinc-700" // Estilo quando ativo
              : "text-zinc-300 border-transparent hover:border-zinc-800" // Estilo padrão
          }`}
        >
          <Home className="size-4" />
          Home
        </Link>

        <Link
          to="/uploads"
          className={`py-1.5 px-3 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border transition-colors ${
            isActive("/uploads")
              ? "bg-zinc-800 text-zinc-100 border-zinc-700" // Estilo quando ativo
              : "text-zinc-300 border-transparent hover:border-zinc-800" // Estilo padrão
          }`}
        >
          <ListVideo className="size-4" />
          Uploads
        </Link>

        <Link
          to="/tags"
          className={`py-1.5 px-3 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border transition-colors ${
            isActive("/tags")
              ? "bg-zinc-800 text-zinc-100 border-zinc-700" // Estilo quando ativo
              : "text-zinc-300 border-transparent hover:border-zinc-800" // Estilo padrão
          }`}
        >
          <Tags className="size-4" />
          Tags
        </Link>

        <Link
          to="/settings"
          className={`py-1.5 px-3 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border transition-colors ${
            isActive("/settings")
              ? "bg-zinc-800 text-zinc-100 border-zinc-700" // Estilo quando ativo
              : "text-zinc-300 border-transparent hover:border-zinc-800" // Estilo padrão
          }`}
        >
          <Settings className="size-4" />
          Settings
        </Link>

        <a
          href="#"
          className="py-1.5 px-3 text-zinc-300 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border border-transparent hover:border-zinc-800"
        >
          <Code2 className="size-4" />
          Developers
        </a>
      </nav>
    </div>
  );
}
