import { getData, postData } from "@/pages/api/postApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface IPost {
	author: string;
	postBody: string;
	id: number;
}

export default function Example() {
	const {
		isLoading,
		data,
		isError,
		refetch: refresh,
	} = useQuery<IPost[]>(["postsData"], getData, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

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

	if (isError) return <>Error!</>;

	return (
		<div>
			{data.map((d, i) => (
				<>
					<h1>Post Title: {d?.postBody}</h1>
					<p>User ID: {d?.author}</p>
					<p>There are {data.length.toString()} posts</p>
				</>
			))}
			<button onClick={() => refresh()}>Refresh data</button>

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
