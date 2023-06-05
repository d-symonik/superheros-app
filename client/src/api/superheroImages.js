import {$host} from "./index.js";
export const addImage = async (superheroId,image)=>{
    const {data}=await $host.post(`api/images/${superheroId}`,image);
    return data;
}
export const removeImage = async (id)=>{
    const {data}=await $host.delete(`api/images/${id}`);
    return data;
}
