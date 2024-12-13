import axios from "axios";

const base_url = 'https://todo-server-o44l.onrender.com';

export const getTodos=async()=>{
    return await axios.get(`${base_url}/TodoList`)
}

export const addUser=async(data)=>{
    return await axios.post(`${base_url}/TodoList`,data)
}

export const getUser=async()=>{
    return await axios.get(`${base_url}/TodoList`)
}

export const delTodos=async(id)=>{
    return await axios.delete(`${base_url}/TodoList/${id}`)
}

export const updateTodos = async (data, id) => {
    return axios.put(`${base_url}/TodoList/${id}`, data);
  };

