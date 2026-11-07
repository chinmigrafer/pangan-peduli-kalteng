import { Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";

export function PrintToolbar({ title }: { title: string }) {
  return (
    <div className="print:hidden sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 text-sm">
        <Link to="/lomba" className="font-medium text-primary hover:underline">
          ← Paket juri
        </Link>
        <span className="hidden sm:inline text-muted-foreground">{title}</span>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-warm)] px-3 py-1.5 font-semibold text-primary-foreground shadow-elegant"
        >
          <Printer className="h-4 w-4" />
          Cetak / PDF
        </button>
      </div>
    </div>
  );
}
