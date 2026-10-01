import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CurveClarity — Make launch mechanics legible",
  description: "A transparent design studio for Meteora DBC token launches.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
