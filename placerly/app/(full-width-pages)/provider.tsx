"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const Provider = ({ children }: { children: React.ReactNode; }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <div>{children}</div>
    </QueryClientProvider>
  );
}
export default Provider