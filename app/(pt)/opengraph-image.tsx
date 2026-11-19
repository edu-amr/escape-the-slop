import { OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Escape the Slop";

export default function Image() {
  return ogImage("pt-br");
}
