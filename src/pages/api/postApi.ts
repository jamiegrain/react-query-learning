import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

interface IPost {
	author: string;
	postBody: string;
	id: number;
}

const URL = "http://localhost:5000/posts";

export async function getData() {
   return (await axios.get(URL)).data
}

export async function postData(post: IPost, client: QueryClient){

    const res = (await axios.post(URL, post)).data
    client.invalidateQueries(['postsData'])
    return res
}