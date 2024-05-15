import { API_URL } from "./config";

export async function deleteCardByIndex(id: string, index: number) {
    const response = await fetch(`${API_URL}/decks/${id}/card/${index}`, {
    method: "DELETE"
  })

  return response.json();
}
