import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSearchPeople = (search = 'x') => {
  return useQuery({
    queryKey: ["search", search],
    queryFn: () => axios.post("/api/search_person", search),
  });
};