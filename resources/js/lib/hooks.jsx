import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
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
    queryKey: [`convo_${convo_id}`],
    queryFn: async () => await axios.post(`/api/convo`,{convo_id:convo_id}),
    refetchInterval: 15 * 1000
  });
}

export const getConvoList = () => {
  return useQuery({
    queryKey: ['convo_list'],
    queryFn: () => axios.get('/api/convo/list'),
    refetchInterval: 10 * 1000,
  });
}

export const readLatestMessage = async (convo_id) => {
  await axios.post('/api/readLatest', {convo_id});
  queryClient.invalidateQueries(`convo_list`);
  return;
}