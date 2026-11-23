import type { Metadata } from "next";
import { ChaiClient } from "./chai-client";

export const metadata: Metadata = {
  title: "Buy a Chai - Academic Management System",
  description: "Support the project with a chai",
};

export default function ChaiPage() {
  return <ChaiClient />;
}
