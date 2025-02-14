import { ChevronDown, LogOut } from "lucide-react";
import nivoLogo from "../assets/logo-nivo.svg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function Header() {
  return (
    <div className="max-w-[1200px] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <img src={nivoLogo} alt="nivo.video" />

            <Badge>BETA</Badge>
          </div>

        <svg
          width="6"
          height="16"
          viewBox="0 0 6 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1.18372"
            y1="15.598"
            x2="5.32483"
            y2="0.143194"
            className="stroke-zinc-700"
          />
        </svg>

        <div className="flex items-center gap-2.5">
          <img
            src="https://github.com/rocketseat.png"
            className="size-5 rounded-full"
            alt=""
          />

          <span className="text-sm font-medium text-zinc-100">Rocketseat</span>

          <Badge variant="primary">PRO</Badge>

          <ChevronDown className="text-zinc-600 size-4" />
        </div>

        <svg
          width="6"
          height="16"
          viewBox="0 0 6 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1.18372"
            y1="15.598"
            x2="5.32483"
            y2="0.143194"
            className="stroke-zinc-700"
          />
        </svg>

        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-zinc-100">Ignite</span>

          <ChevronDown className="text-zinc-600 size-4" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-sm font-medium">Gugel Group</span>
              </div>
              <ChevronDown className="text-zinc-600 size-4" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item className="p-2 bg-dark outline-none rounded-sm w-56 flex flex-col gap-1">
              <span className="text-sm font-medium">Otto Gugel</span>
              <span className="text-xs text-zinc-400">otto@nivo.com</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="border border-b" />
            <DropdownMenu.Item className="rounded-sm p-5 w-56">
              <span className="text-sm flex flex-row gap-1">
                <LogOut className="size-4" /> Logout
              </span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
