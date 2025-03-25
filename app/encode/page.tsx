"use client";

import EncodeForm from "@/app/components/EncodedForm";
import Header from "@/app/components/Header";
import NoNonce from "@/app/components/NoNonce";
import { type Response, endpoint, query } from "@/external/schema";
import type { FrameContext } from "@farcaster/frame-core/dist/context";
import { sdk } from "@farcaster/frame-sdk";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
	return <Suspense fallback={<div>Loading...</div>}>{<EncodePage />}</Suspense>;
}

function EncodePage() {
	const searchParams = useSearchParams();
	const fidParam = searchParams.get("fid"); // this is easily spoofed
	const fid = fidParam ? Number.parseInt(fidParam, 10) : undefined;
	const timestamp = searchParams.get("timestamp") ?? undefined;
	const messageHash = searchParams.get("messageHash") ?? undefined;
	const text = searchParams.get("text") ?? "";
	const nonce = searchParams.get("nonce") ?? undefined;

	const [response, setResponse] = useState<Response>({ heartbeat: false });
	const [isSDKLoaded, setIsSDKLoaded] = useState(false);
	const [context, setContext] = useState<FrameContext | null>(null);

	useEffect(() => {
		const load = async () => {
			try {
				const context = await sdk.context;
				if (context) {
					setContext(context as FrameContext);
				} else {
					console.error("Failed to load Farcaster context");
				}
				await sdk.actions.ready();
			} catch (err) {
				console.error("SDK initialization error:", err);
			}
		};

		if (sdk && !isSDKLoaded) {
			load().then(() => {
				setIsSDKLoaded(true);
			});
		}
	}, [isSDKLoaded]);

	const { data } = useQuery<Response>({
		queryKey: ["external-query"],
		queryFn: () => request<Response>(endpoint, query, { fid }),
	});

	useEffect(() => data && setResponse(data), [data]);

	return (
		<div className="artboard phone-1">
			<div className="card w-96 bg-base-100">
				<div className="card-body">
					<Header
						fid={context?.user.fid ?? fid}
						heartbeat={response.heartbeat}
						isPrePermissionless={response?.isPrePermissionless}
					/>
					{nonce ? (
						<EncodeForm
							text={text}
							fid={fid}
							timestamp={timestamp}
							messageHash={messageHash}
							nonce={nonce}
						/>
					) : (
						<NoNonce />
					)}
				</div>
			</div>
		</div>
	);
}
