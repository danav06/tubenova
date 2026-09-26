import { LoaderCircle } from "lucide-react";

export function ToolForm({
  label,
  placeholder,
  value,
  loading,
  button,
  onChange,
  onSubmit,
}: {
  label: string;
  placeholder: string;
  value: string;
  loading: boolean;
  button: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}) {
  return (
    <form
      className="dock mt-8"
      onSubmit={(event) => {
        event.preventDefault();
        const field = event.currentTarget.elements.namedItem("q");
        const next = field instanceof HTMLInputElement ? field.value : value;
        onSubmit(next.trim());
      }}
    >
      <div className="dock-inner flex flex-col gap-3 p-2 sm:flex-row">
        <label className="sr-only" htmlFor="tool-q">
          {label}
        </label>
        <input
          id="tool-q"
          name="q"
          suppressHydrationWarning
          value={value}
          enterKeyHint="search"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-14 min-w-0 flex-1 rounded-2xl border border-transparent bg-transparent px-4 text-base outline-none"
        />
        <button type="submit" disabled={loading} className="btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white disabled:opacity-70">
          {loading ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {button}
        </button>
      </div>
    </form>
  );
}
