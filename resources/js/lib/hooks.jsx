import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSearchPeople = (search = 'x') => {
  return useQuery({
    queryKey: ["search", search],
    queryFn: () => axios.post("/api/search_person", search),
  });
};

export const sendNewMessage = (convo_id, message, callback) => {
  return useMutation({
    mutationFn: () => axios.post('/api/send', {convo_id, message}),
    onSuccess: () => {
      callback();
    }
  })
};