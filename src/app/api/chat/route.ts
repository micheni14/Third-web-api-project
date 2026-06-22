import { NextRequest } from "next/server";

export const runtime = "edge";
export const maxDuration = 300;

const THIRDWEB_API = "https://api.thirdweb.com";

export async function POST(req: NextRequest) {
  try {
    const { messages, from, sessionId } = await req.json();

    if (!process.env.THIRDWEB_SECRET_KEY) {
      return Response.json(
        { error: "Thirdweb secret key not configured" },
        { status: 500 }
      );
    }

    const body: Record<string, any> = {
      model: "t0-latest",
      messages,
      stream: false,
      context: {
        chain_ids: [8453],
        auto_execute_transactions: false,
      },
    };

    if (from) {
      body.context.from = from;
    }

    const res = await fetch(`${THIRDWEB_API}/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": process.env.THIRDWEB_SECRET_KEY!,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Thirdweb AI API error:", res.status, errText);
      return Response.json(
        { error: `AI API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json({
      message: data.message || data.choices?.[0]?.message?.content || "No response",
      session_id: data.session_id || sessionId,
      reasoning: data.reasoning || null,
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
