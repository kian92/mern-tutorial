import { API_URL } from "./config";

export async function createCard(text: string, id: string) {
    const response = await fetch(`${API_URL}/decks/${id}/card`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text,
        })
    });

    return response.json();
}
