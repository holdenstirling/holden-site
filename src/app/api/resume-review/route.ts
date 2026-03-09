import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resume, jobDescription, company, targetRole, experience, biggestWin, struggle } = body;

    if (!resume || resume.trim().length < 50) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    const prompt = `You are an expert career coach and hiring manager who has personally reviewed hundreds of resumes and built teams from scratch. You know exactly what makes a hiring manager stop scrolling and what gets a resume tossed in 6 seconds.

A user has submitted their resume for review. Analyze it and provide a detailed, actionable review.

RESUME:
${resume}

${jobDescription ? `TARGET JOB DESCRIPTION:\n${jobDescription}` : ""}
${company ? `TARGET COMPANY: ${company}` : ""}
${targetRole ? `TARGET ROLE: ${targetRole}` : ""}
${experience ? `YEARS OF EXPERIENCE: ${experience}` : ""}
${biggestWin ? `THEIR BIGGEST PROFESSIONAL WIN: ${biggestWin}` : ""}
${struggle ? `WHAT THEY STRUGGLE WITH MOST: ${struggle}` : ""}

Respond ONLY with a JSON object (no markdown, no backticks, no preamble) with this exact structure:
{
  "overallGrade": "A letter grade from A+ to F",
  "oneLineSummary": "A single encouraging but honest sentence summarizing the resume",
  "categories": {
    "jobFit": { "grade": "letter grade", "summary": "1 sentence", "recommendations": ["specific action 1", "specific action 2", "specific action 3"] },
    "impactLanguage": { "grade": "letter grade", "summary": "1 sentence", "recommendations": ["specific action 1", "specific action 2", "specific action 3"] },
    "technicalDepth": { "grade": "letter grade", "summary": "1 sentence", "recommendations": ["specific action 1", "specific action 2", "specific action 3"] },
    "formatting": { "grade": "letter grade", "summary": "1 sentence", "recommendations": ["specific action 1", "specific action 2"] },
    "missingElements": { "grade": "letter grade", "summary": "1 sentence", "recommendations": ["specific action 1", "specific action 2", "specific action 3"] }
  },
  "topThreeActions": ["The single most important thing to fix first", "Second priority", "Third priority"],
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "hiringManagerComparison": {
    "sixSecondTest": "Pass or Fail - would a hiring manager keep reading after 6 seconds? Explain why in 1-2 sentences.",
    "whatStandsOut": "The 1 thing a hiring manager would remember about this resume after reviewing 50 others",
    "whatsMissing": "The 1 thing a hiring manager would immediately notice is missing",
    "stackRank": "How this resume compares to others at this experience level: Top 10%, Top 25%, Top 50%, Bottom 50%, or Bottom 25%. Be honest.",
    "atsScore": "Estimated ATS pass rate as a percentage (e.g. 65%) with a 1 sentence explanation"
  },
  "industryTips": [
    "A specific tip for the industry or role they are targeting. Reference the actual industry/role.",
    "A second industry-specific tip with concrete advice",
    "A third tip about what companies in this space specifically look for in resumes"
  ]
}

Be specific. Reference actual content from their resume. Do not give generic advice. If a job description was provided, score job fit against that specific role. If no target role is provided, infer the likely target from the resume content and provide industry tips based on that.

For the hiring manager comparison, think like a VP or director who has 200 resumes on their desk and 30 minutes to get through them. What would make them stop on this one? What would make them skip it?`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json({ error: "AI analysis failed. Please try again." }, { status: 500 });
    }

    const data = await response.json();
    const text = data.content?.map((i: { text?: string }) => i.text || "").join("") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Resume review error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
