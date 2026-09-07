// Server-only storage. Credentials must never use a NEXT_PUBLIC_ prefix.
type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
};

export async function saveInquiry(inquiry: Inquiry): Promise<void> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('Inquiry storage is not configured');
  const endpoint = new URL(url);
  if (endpoint.protocol !== 'https:') throw new Error('Storage requires HTTPS');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['HSET', 'nosh:inquiries', inquiry.id, JSON.stringify(inquiry)]),
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error('Inquiry storage request failed');
  const result = await response.json();
  if (result.error || (result.result !== 0 && result.result !== 1)) {
    throw new Error('Inquiry storage rejected the write');
  }
}
