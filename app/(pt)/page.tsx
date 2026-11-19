import type { Metadata } from "next";

import { HubPage } from "@/components/HubPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("pt-br");

export default function Page() {
  return <HubPage locale="pt-br" />;
}
