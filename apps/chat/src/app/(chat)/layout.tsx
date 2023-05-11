/* eslint-disable @next/next/no-page-custom-font */
import "@/styles/globals.scss";
import "@/styles/markdown.scss";
import "@/styles/prism.scss";

import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "HSKhelper",
  description: "Your personal HSK helper.",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
