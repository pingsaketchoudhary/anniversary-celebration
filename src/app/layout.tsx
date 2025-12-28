import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes, Cormorant_Garamond } from "next/font/google"; // Added premium fonts
import "./globals.css";
import CinematicContainer from "@/components/layout/CinematicContainer";
import GSAPRegistry from "@/components/animations/GSAPRegistry";
import GlobalAudioPlayer from "@/components/ui/GlobalAudioPlayer";
import EntranceOverlay from "@/components/ui/EntranceOverlay";

import ColorGrader from "@/components/interactive/ColorGrader";

// Optimization: Subsets and refined weights
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-signature" }); // For Signature
const cormorant = Cormorant_Garamond({ weight: ["300", "400", "600"], subsets: ["latin"], variable: "--font-handwriting" }); // For Letter

export const metadata: Metadata = {
  title: "Three Years of Us",
  description: "A journey through time and love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} ${cormorant.variable} antialiased bg-background text-foreground overflow-x-hidden transition-colors duration-1000`}
      >
        <EntranceOverlay />
        <GSAPRegistry />
        <GlobalAudioPlayer />

        <ColorGrader />
        <CinematicContainer>
          {children}
        </CinematicContainer>
      </body>
    </html>
  );
}
