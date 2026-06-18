import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const { GET: authGet, POST: authPost } = toNextJsHandler(auth);

function toBetterAuthCallbackRequest(request: Request) {
  const url = new URL(request.url);
  url.pathname = "/api/auth/callback/google";

  return new Request(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    duplex: "half",
  } as RequestInit);
}

export async function GET(request: Request) {
  return authGet(toBetterAuthCallbackRequest(request));
}

export async function POST(request: Request) {
  return authPost(toBetterAuthCallbackRequest(request));
}
