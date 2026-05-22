import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({
  loader: () => {
    throw redirect({ to: "/" });
  },
});
