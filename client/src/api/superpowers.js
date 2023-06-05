import {$host} from "./index.js";
export const addSuperpower = async (superheroId,name)=>{
    const {data}=await $host.post(`api/superpowers/${superheroId}`, {name});
    return data;
}
export const removeSuperpower = async (id)=>{
    const {data}=await $host.delete(`api/superpowers/${id}`);
    return data;
}
export const editSuperpower = async (id,name)=>{
    const {data}=await $host.patch(`api/superpowers/${id}`,{name});
    return data;
}