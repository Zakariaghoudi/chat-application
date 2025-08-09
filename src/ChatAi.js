import axios from "axios";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function SendMessageToAPI(messages) {
  if (!API_KEY) {
    return Promise.reject(new Error("API key not found"));
  }

  const formattedMessages = messages.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  const resquestBody = {
    contents: formattedMessages,
  };

  try {
    const response = await axios.post(API_URL, resquestBody, {
      headers: {
        "Content-Type": "application/json"
      },
    });

    console.log('full api res:', response.data);

    if (
      response.data &&
      response.data.candidates &&
      response.data.candidates.length > 0 &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts &&
      response.data.candidates[0].content.parts.length > 0
    ) {

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      console.log('AI response:', aiResponse);
      return { role: 'model', text: aiResponse };
    } else {

      console.error("API response is incomplete or empty.");
      return { role: 'model', text: 'Sorry, I could not generate a response. Please try again with a different query.' };
    }

  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return { role: 'model', text: 'Sorry, something went wrong. Please try again later.' };
  }
}