export function RouteLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <p className="text-muted-foreground font-mono text-sm">Loading...</p>
      </div>
    </div>
  );
}
