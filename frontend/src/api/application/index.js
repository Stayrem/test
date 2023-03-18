import {axiosInstance} from "../index";

export const fetchCountries = () => axiosInstance.get('/countries.json').then((res) => res
    .data.map((it) => ({ value: it, label: it })));