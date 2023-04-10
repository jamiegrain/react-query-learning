import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Example from "@/components/example";

const queryClient = new QueryClient();

export default function Home() {
	return (
		<QueryClientProvider client={queryClient}>
			<Head>
				<title>Create Next App</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div>
					<Example></Example>
				</div>
			</main>
		</QueryClientProvider>
	);
}
