// lib/shopify.ts

const SHOPIFY_API_VERSION = '2024-10' // ✅ use a real, stable version

const productQuery = `#graphql
  query Products($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        description
        productType
        tags
        featuredImage { url altText width height }
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 1) { nodes { id } }
      }
    }
  }
`

export type ShopaProduct = {
  id: string
  title: string
  handle: string
  description?: string
  productType?: string
  featuredImage?: { url: string; altText?: string | null; width?: number; height?: number } | null
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
  variants: { nodes: { id: string }[] }
  tags: string[]
}

export async function getProducts(first = 24): Promise<ShopaProduct[]> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  if (!domain || !token) {
    console.warn('[shopify] Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN')
    return []
  }

  try {
    const response = await fetch(
      `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({ query: productQuery, variables: { first } }),
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      console.error('[shopify] HTTP error:', response.status, await response.text())
      return []
    }

    const payload = await response.json()

    if (payload.errors) {
      console.error('[shopify] GraphQL errors:', payload.errors)
      return []
    }

    return payload?.data?.products?.nodes ?? []
  } catch (err) {
    console.error('[shopify] Fetch failed:', err)
    return []
  }
}

export function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(Number(amount))
}

export const cartCreateMutation = `#graphql
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }
`

export const cartLinesAddMutation = `#graphql
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }
`

export const storefrontDocs = 'https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/cart-warnings'