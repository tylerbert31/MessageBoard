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

export const useGetConvo = (convo_id) => {
  return useQuery({
    queryKey: [`convo_${convo_id}`, convo_id],
    queryFn: () => axios.post(`/api/convo`,{convo_id}),
    refetchInterval: 5 * 1000,
  });
}

export const getConvoList = () => {
  return useQuery({
    queryKey: ['convo_list'],
    queryFn: () => axios.get('/api/convo/list'),
    refetchInterval: 10 * 1000,
  });
}