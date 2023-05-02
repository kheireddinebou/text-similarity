export async function revokeApiKey() {
  const res = await fetch("/api/api-key/revoke", {
    method: "POST",
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }
}
