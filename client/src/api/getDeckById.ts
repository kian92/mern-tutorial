import { API_URL } from "./config";

export async function getDeckById(id: string) {
    const response = await fetch(`${API_URL}/decks/${id}`);

    return response.json();
}
