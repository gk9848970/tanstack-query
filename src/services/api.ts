import axios from "axios";
import { Todo } from "../types/todo";
import { Project } from "../types/project";
import { Product } from "../types/product";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({ baseURL: BASE_URL });

// Todos
export const getTodoIds = async () => {
  const response = await axiosInstance.get<Todo[]>("/todos");
  return response.data.map((todo) => todo.id);
};

export const getTodo = async (id: number) => {
  const response = await axiosInstance.get<Todo>(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (data: Todo) => {
  const response = await axiosInstance.post<Todo>(`/todos`, data);
  return response.data;
};

export const updateTodo = async (data: Todo) => {
  const response = await axiosInstance.put<Todo>(`/todos/${data.id}`, data);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await axiosInstance.delete<Todo>(`/todos/${id}`);
  return response.data;
};

// Projects
export const getProjects = async (page: number) => {
  const response = await axiosInstance.get<Project[]>(
    `/projects?_page=${page}&_limit=3`
  );
  return response.data;
};

// Products
// Why not page params instead
export const getProducts = async ({ pageParam }: { pageParam: number }) => {
  const response = await axiosInstance.get<Product[]>(
    `/products?_page=${pageParam}&_limit=3`
  );
  return response.data;
};

export const getProduct = async (id: number) => {
  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return response.data;
};
