import type { Metadata } from "next";
import { inter, montserrat } from "@/utils/font";
import "./globals.css";
import AppShell from "@/components/ui/app-shell";


export const metadata: Metadata = {
  title: "DOSTv",
  description: "DOSTV brings science closer to every Filipino. It showcases programs, stories, and innovations from the Department of Science and Technology, highlighting how research and technology improve everyday life. From documentaries and interviews to live events and educational features, DOSTV makes science informative, relevant, and inspiring.",
  openGraph: {
    title: "DOSTv",
    description: "DOSTV brings science closer to every Filipino. It showcases programs, stories, and innovations from the Department of Science and Technology, highlighting how research and technology improve everyday life. From documentaries and interviews to live events and educational features, DOSTV makes science informative, relevant, and inspiring.",
    images: [
      {
        url: "/storage/images/logos/dostv.png",
        width: 1200,
        height: 630,
        alt: "DOSTV Logo",
      },
    ],
  },
  icons: {
    icon: "/storage/images/logos/logo.png",
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="h-screen overflow-hidden main">
        <AppShell>
          <main className="flex-1 h-screen overflow-y-auto font-monstserrat scroll-slim ">
            {children}
          </main>
        </AppShell>
      </body>
    </html>
  );
}
