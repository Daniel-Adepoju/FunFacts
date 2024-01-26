'use client'
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()
const ReactQueryProvider = ({children}) => {

  return (
    <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools/> */}
        {children}
        </QueryClientProvider>
  )
}

export default ReactQueryProvider