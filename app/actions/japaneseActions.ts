// app/actions/japaneseActions.ts
export async function convertJapaneseClient(sentence: string, style: "polite" | "casual" | "formal") {
    try {
      const response = await fetch("/api/convert-japanese", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence, style }),
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return { success: true, result: data.result };
    } catch (error) {
      console.error("Error in convertJapaneseClient:", error);
      return { success: false, error: 'Failed to fetch from API' };
    }
  }  