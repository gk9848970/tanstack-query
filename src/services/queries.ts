import {
  useQuery,
  useQueries,
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  getProjects,
  getTodo,
  getTodoIds,
} from "./api";
import { Product } from "../types/product";

// Todos
export const useTodoIds = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodoIds,
  });
};

export const useTodos = (ids: number[] | undefined) => {
  return useQueries({
    queries: (ids ?? []).map((id) => ({
      queryKey: ["todos", { id }],
      queryFn: () => getTodo(id),
    })),
  });
};

// Projects
export const useProjects = (page: number) => {
  return useQuery({
    queryKey: ["projects", { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  });
};

// Products
export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
};

export const useProduct = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct(id!),
    enabled: !!id,
    placeholderData: () => {
      const cachedProducts = queryClient.getQueryData(["products"]) as {
        pages: Product[];
      };
      if (!cachedProducts) return undefined;

      return cachedProducts.pages.flat(1).find((p) => p.id === id);
    },
  });
};
