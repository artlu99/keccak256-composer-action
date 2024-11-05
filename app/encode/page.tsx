"use client";

import EncodeForm from "@/app/components/EncodedForm";
import Header from "@/app/components/Header";
import NoNonce from "@/app/components/NoNonce";
import { endpoint, query, Response } from "@/external/schema";
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
  const fid = fidParam ? parseInt(fidParam, 10) : undefined;
  const timestamp = searchParams.get("timestamp") ?? undefined;
  const messageHash = searchParams.get("messageHash") ?? undefined;
  const text = searchParams.get("text") ?? "";
  const nonce = searchParams.get("nonce") ?? undefined;

  const [response, setResponse] = useState<Response>({ heartbeat: false });

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
            fid={fid}
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
