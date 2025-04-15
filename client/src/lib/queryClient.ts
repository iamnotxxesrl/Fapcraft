import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Helper to ensure API URL is properly formed for both development and production
const getApiUrl = (path: string) => {
  // If the path already starts with /api, use it as is
  if (path.startsWith('/api/')) {
    return path;
  }
  
  // If path starts with slash but not /api, add /api prefix
  if (path.startsWith('/')) {
    return `/api${path}`;
  }
  
  // Otherwise, ensure there's a leading slash and add /api
  return `/api/${path}`;
};

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Format the URL to ensure it has the proper /api prefix
  const apiUrl = getApiUrl(url);
  
  const res = await fetch(apiUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Format the URL if it's a string to ensure it has the proper /api prefix
    const url = typeof queryKey[0] === 'string' 
      ? getApiUrl(queryKey[0] as string) 
      : queryKey[0];
      
    const res = await fetch(url as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
