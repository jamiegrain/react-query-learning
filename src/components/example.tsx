import { getData, postData } from "@/pages/api/postApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface IPost {
	author: string;
	postBody: string;
	id: number;
}

const URL = "http://localhost:5000/posts";

export default function Example() {
	const { isLoading, data, isError, error } = useQuery<IPost[]>(
		["postsData"],
		getData
	);

	const client = useQueryClient();

	const mutation = useMutation((data: IPost) =>
		postData(
			{
				author: "foo",
				postBody: "bar",
				id: 1,
			},
			client
		)
	);

	async function handleSubmit(data: IPost): Promise<void> {
		mutation.mutate(data);
	}

	if (isLoading) return <>Loading...</>;

	if (isError) return <>Error!: {error}</>;

	return (
		<div>
			<h1>Post Title: {data[0]?.postBody}</h1>
			<p>User ID: {data[0]?.author}</p>
			<p>There are {data.length.toString()} posts</p>
			<input type="text"></input>
			<input type="text"></input>
			<input type="text"></input>
			<button
				onClick={() => {
					handleSubmit({
						author: "foo",
						postBody: "bar",
						id: 1,
					});
				}}
			>
				Submit
			</button>
		</div>
	);
}
