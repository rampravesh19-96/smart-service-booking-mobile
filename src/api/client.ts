type RequestConfig = {
  path: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
};

export async function apiClient<T>({ path, method = "GET" }: RequestConfig) {
  return Promise.resolve({
    path,
    method,
  } as T);
}
