export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req) {
  return new Response(
    JSON.stringify({
      name: 'John Doe',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}
