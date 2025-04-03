export default async function handler(req, res) {
  // ✅ CORS 허용 헤더 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ 브라우저 사전 요청(OPTIONS) 응답
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ POST만 허용
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwkAxDumPMdsap7bfij2G3kFUCX11JbmpbUDJEMhwnetRNAeHpdxoe-ycjTO5ny_dIsQQ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const text = await response.text();
    return res.status(200).send(text);
  } catch (error) {
    console.error("프록시 오류:", error);
    return res.status(500).json({ error: "프록시 서버 오류" });
  }
}
