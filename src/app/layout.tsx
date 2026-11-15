import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://syntask.example"),
  title: "SYNTASK — Find your next great hike",
  description:
    "A little less scrolling. A lot more exploring. Discover beautiful trails, save your favorites, and find your next adventure with SYNTASK.",
  applicationName: "SYNTASK",
  robots: { index: true, follow: true },
  openGraph: {
    title: "SYNTASK — Find your next great hike",
    description: "Find the best hikes for your next trip.",
    type: "website",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1800,
        height: 1200,
        alt: "A quiet forest lake",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#151411",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
