import { NextRequest, NextResponse } from "next/server";
import { curoAIResponse } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();
    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'input' field" },
        { status: 400 }
      );
    }
    const response = await curoAIResponse(input);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("API /api/bhura/beat error:", error);
    return NextResponse.json(
      {
        response: {
          interpretation: {
            summary:
              "Something went wrong on the server. " +
              (error instanceof Error ? error.message : String(error)),
          },
          home_remedies: { detailed_explanation: "", remedies: [] },
          precautions: { detailed_explanation: "", precaution_list: [] },
          when_to_see_doctor: {
            detailed_explanation: "",
            red_flags: [],
            after_how_many_days: [],
          },
          relevant_medical_departments: [],
          language_adaptation: { instruction: "" },
        },
      },
      { status: 200 }
    );
  }
}
