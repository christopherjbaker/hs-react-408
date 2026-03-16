import { useAsync } from "#shared/async"

import { get } from "./api"

/** A Cat object from Cat-aas. */
export type Cat = {
  id: string
  tags: string[]
  created_at: Date
  /** The URL to the image of the cat. */
  url: string
  /** A mime type for an image. */
  mimetype: string
}

/** Fetches a random cat from Cat-aaS. */
export async function getCat(success: boolean = true): Promise<Cat> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const cat = await get<Cat>(`/cat${success ? "" : "-error"}?json=true`)

  return cat
}

/** Fetches a random cat from Cat-aaS. */
export function useCat(): [
  (
    /** Undefined if not yet available. */
    Cat | undefined
  ),
  {
    /** Fetches a new random cat. */
    refresh: () => void
  },
] {
  return useAsync(getCat)
}
