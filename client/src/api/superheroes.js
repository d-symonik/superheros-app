import {$host} from "./index.js";

export const createSuperhero = async (superhero) => {
    const {data} = await $host.post('api/superheroes', superhero);
    return data;
}
export const getSuperheroes = async (page, limit = 5) => {
    const {data} = await $host.get('api/superheroes', {
        params: {
            page, limit
        }
    })
    return data;
}
export const getOneSuperhero = async (id) => {
    const {data} = await $host.get(`api/superheroes/${id}`);
    return data;
}
export const removeSuperhero = async (id) => {
    const {data} = await $host.delete(`api/superheroes/${id}`);
    return data;
}
export const updateSuperhero = async (id, superhero) => {
    const {data} = await $host.patch(`api/superheroes/${id}`, superhero);
    return data;
}