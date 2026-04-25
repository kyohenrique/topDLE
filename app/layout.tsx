import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://topdle.vercel.app"),
  title: {
    default: "topDLE",
    template: "%s | topDLE",
  },
  description: "Lista diaria de jogos de adivinhacao no estilo Wordle.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "topDLE",
    description: "Descubra jogos diarios de adivinhacao em um diretorio rapido.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="h-full antialiased dark" suppressHydrationWarning>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
