import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Manrope, Space_Grotesk } from "next/font/google";
import { SessionProvider } from "./components/contexts/SessionContext";
import SidebarComponent from "./components/navigation/SidebarComponent";
import { CollectionProvider } from "./components/contexts/CollectionContext";
import { ConversationProvider } from "./components/contexts/ConversationContext";
import { SocketProvider } from "./components/contexts/SocketContext";
import { EvaluationProvider } from "./components/contexts/EvaluationContext";
{/* import StartDialog from "./components/dialog/StartDialog"; */}
import { ToastProvider } from "./components/contexts/ToastContext";

import { Toaster } from "@/components/ui/toaster";

import { GoogleAnalytics } from "@next/third-parties/google";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RouterProvider } from "./components/contexts/RouterContext";
import { ProcessingProvider } from "./components/contexts/ProcessingContext";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-text",
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MAAT",
  description: "Your Legal AI Platform",
  icons: {
    icon: "/logo.svg", // 👈 explicitly points to logo.svg in /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_G_KEY || ""} />
      <body
        className={`bg-background h-screen w-screen overflow-hidden ${space_grotesk.variable} ${manrope.variable} font-text antialiased flex`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ToastProvider>
            <RouterProvider>
              <SessionProvider>
                <CollectionProvider>
                  <ConversationProvider>
                    <SocketProvider>
                      <EvaluationProvider>
                        <ProcessingProvider>
                          <SidebarProvider>
                            <SidebarComponent />
                            <main className="flex flex-1 min-w-0 flex-col md:flex-row w-full gap-2 md:gap-6 items-start justify-start p-2 md:p-6 overflow-hidden">
                              {/* <img
                              referrerPolicy="no-referrer-when-downgrade"
                              className="absolute bottom-0 right-0"
                              src="https://pixel.weaviate.cloud/a.png?x-pxid=32943cfc-5ae4-4f43-9f12-0c057a0b0df9"
                            /> */}
                              <SidebarTrigger className="lg:hidden flex text-secondary hover:text-primary hover:bg-foreground_alt z-50" />
                              {/* <StartDialog /> */}
                              {children}
                            </main>
                          </SidebarProvider>
                        </ProcessingProvider>
                        <Toaster />
                      </EvaluationProvider>
                    </SocketProvider>
                  </ConversationProvider>
                </CollectionProvider>
              </SessionProvider>
            </RouterProvider>
          </ToastProvider>
        </Suspense>
      </body>
    </html>
  );
}
