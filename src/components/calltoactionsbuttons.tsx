// components/CallToActionButtons.tsx
import { Link } from "react-router-dom";
import { Button } from "./ui/button"; // Importe o componente Button do shadcn/ui

export function CallToActionButtons() {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <Link to="/courses">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Ver Cursos
        </Button>
      </Link>
      <Link to="/signup">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Comece Agora
        </Button>
      </Link>
    </div>
  );
}
