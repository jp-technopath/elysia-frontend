"use client";

import React, { useContext, useEffect, useState } from "react";

import { SocketContext } from "../contexts/SocketContext";

import { MdChatBubbleOutline } from "react-icons/md";
import { AiOutlineExperiment } from "react-icons/ai";
import { FaCircle } from "react-icons/fa6";

import HomeSubMenu from "@/app/components/navigation/HomeSubMenu";
import EvalSubMenu from "@/app/components/navigation/EvalSubMenu";

import { public_path } from "@/app/components/host";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

import { RouterContext } from "../contexts/RouterContext";
import { SessionContext } from "../contexts/SessionContext";
import packageJson from "../../../package.json";

type NavItem = {
  title: string;
  mode: string[];
  icon: React.ReactNode;
  onClick: () => void;
};

const SidebarComponent: React.FC = () => {
  const { socketOnline } = useContext(SocketContext);
  const { changePage, currentPage } = useContext(RouterContext);
  const { unsavedChanges } = useContext(SessionContext);

  const [items, setItems] = useState<NavItem[]>([]);

  useEffect(() => {
    setItems([
      {
        title: "Chat",
        mode: ["chat"],
        icon: <MdChatBubbleOutline />,
        onClick: () => changePage("chat", {}, true, unsavedChanges),
      },
      {
        title: "Evaluation",
        mode: ["eval", "feedback", "display"],
        icon: <AiOutlineExperiment />,
        onClick: () => changePage("eval", {}, true, unsavedChanges),
      },
    ]);
  }, [changePage, unsavedChanges]);

  return (
    <Sidebar className="fade-in">
      <SidebarHeader>
        <div className="flex items-center gap-2 w-full justify-between p-2">
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="MAAT"
              className="w-5 h-5 stext-primary"
            />
            <p className="text-sm font-bold text-primary">MAAT</p>
          </div>
          <div className="flex items-center justify-center gap-1">
            {socketOnline ? (
              <FaCircle scale={0.2} className="text-lg pulsing_color w-5 h-5" />
            ) : (
              <FaCircle scale={0.2} className="text-lg pulsing w-5 h-5" />
            )}
            <div className="flex flex-col items-end">
              <p className="text-xs text-muted-foreground">
                v{packageJson.version}
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    variant={item.mode.includes(currentPage) ? "active" : "default"}
                    onClick={item.onClick}
                  >
                    <p className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.title}</span>
                    </p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        {currentPage === "chat" && <HomeSubMenu />}
        {(currentPage === "eval" ||
          currentPage === "feedback" ||
          currentPage === "display") && <EvalSubMenu />}
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarComponent;
