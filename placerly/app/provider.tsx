"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
export const queryClient = new QueryClient()
const Provider = ({ children }: { children: React.ReactNode; }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
}
export default Provider