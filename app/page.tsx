import { getProducts } from '@/lib/shopify'
import { Storefront } from '@/components/storefront'

export default async function Page() {
  const products = await getProducts()
  return <Storefront products={products} />
}
