"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Provider = ({ children }: { children: React.ReactNode; }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div>{children}</div>
    </QueryClientProvider>
  );
}
export default Provider