// app/collections/[category]/page.tsx

const SHOPIFY_API_VERSION = '2026-04';

async function getCollection(handle: string) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  if (!domain || !token) return null;

  const query = `#graphql
    query GetCollection($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        description
        products(first: 100) {
          edges {
            node {
              id
              title
              handle
              description
              featuredImage {
                url
                altText
                width
                height
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(`https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query,
      variables: { handle },
    }),
    next: { revalidate: 60 },
  });

  if (!response.ok) return null;
  const payload = await response.json();
  return payload?.data?.collectionByHandle ?? null;
}

type CollectionProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    }
  };
};

export default async function CategoryPage({ params }: { params: { category: string } }) {
  try {
    const collection = await getCollection(params.category);

    if (!collection) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category "{params.category}" doesn't exist in Shopify.</p>
          <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">← Back to Home</a>
        </div>
      );
    }

    const products = collection.products?.edges?.map((edge: any) => edge.node) || [];

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <a href="/" className="text-blue-600 hover:underline text-sm">← Back to Home</a>
          <h1 className="text-3xl font-bold capitalize mt-2">{collection.title}</h1>
          {collection.description && (
            <p className="text-gray-600 mt-2">{collection.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">{products.length} products found</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
            <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">← Back to Home</a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: CollectionProduct) => (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                {product.featuredImage && (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="font-medium text-lg">{product.title}</h3>
                <p className="text-blue-600 font-bold mt-2">
                  {new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: product.priceRange.minVariantPrice.currencyCode 
                  }).format(Number(product.priceRange.minVariantPrice.amount))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h1>
        <p className="text-gray-600">There was a problem loading the products. Please try again.</p>
        <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">← Back to Home</a>
      </div>
    );
  }
}