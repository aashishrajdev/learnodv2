import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - Learnod",
  description:
    "Comprehensive guide to using Learnod's programming learning platform with YouTube integration and AI assistance.",
  icons: {
    icon: "/assets/learnodlogo.png",
    shortcut: "/assets/learnodlogo.png",
    apple: "/assets/learnodlogo.png",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
