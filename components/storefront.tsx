'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingCart, MapPin, UserRound, Package, Menu, Heart, ChevronRight, Sparkles, X, Plus } from 'lucide-react'
import { formatMoney, type ShopaProduct } from '@/lib/shopify'

const logo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shopa-i5NYEJnopnd9c1bXAnhXIDdG0A86mW.png'

// Define categories with their handles and sub-categories
const categories = [
  { 
    name: 'Fashion', 
    handle: 'fashion',
    description: 'Wardrobe refresh', 
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80'
  },
  { 
    name: 'Electronics', 
    handle: 'electronics',
    description: 'Tech picks', 
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80'
  },
  { 
    name: 'Home & Living', 
    handle: 'home-living',
    description: 'Make it yours', 
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80'
  },
  { 
    name: 'Beauty', 
    handle: 'beauty',
    description: 'Feel your best', 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80'
  },
  { 
    name: 'Sports', 
    handle: 'sports',
    description: 'Move more', 
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80'
  },
  { 
    name: 'Groceries', 
    handle: 'groceries',
    description: 'Fresh essentials', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80'
  },
]

export function Storefront({ products }: { products: ShopaProduct[] }) {
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<ShopaProduct[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  
  const visibleProducts = useMemo(() => 
    products.filter((product) => 
      product.title.toLowerCase().includes(query.toLowerCase())
    ), 
    [products, query]
  )
  
  const addToCart = (product: ShopaProduct) => { 
    setCart((items) => [...items, product]); 
    setCartOpen(true) 
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Banner */}
      <div className="bg-primary px-4 py-2 text-center text-xs font-semibold tracking-wide text-primary-foreground">
        Fast delivery across Kampala · Shopa Days are here
      </div>

      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-4 lg:px-8">
          <button aria-label="Open menu" className="rounded-md p-2 hover:bg-primary-foreground/10">
            <Menu />
          </button>
          <Image src={logo} alt="Shopa Collection" width={72} height={72} className="size-14 rounded-md object-contain" />
          <div className="hidden items-center gap-2 text-xs lg:flex">
            <MapPin className="text-accent" size={18} />
            <span>Deliver to<br /><b>Kampala, Uganda</b></span>
          </div>
          <div className="flex min-w-0 flex-1 overflow-hidden rounded-md bg-background">
            <select aria-label="Category" className="hidden border-0 bg-muted px-3 text-sm text-muted-foreground outline-none md:block">
              <option>All</option>
              {categories.map((cat) => (
                <option key={cat.name}>{cat.name}</option>
              ))}
            </select>
            <input 
              value={query} 
              onChange={(event) => setQuery(event.target.value)} 
              placeholder="Search Shopa Collection in Kampala" 
              className="min-w-0 flex-1 bg-background px-4 py-3 text-sm text-foreground outline-none" 
            />
            <button aria-label="Search" className="bg-accent px-4 text-accent-foreground">
              <Search />
            </button>
          </div>
          <div className="hidden items-center gap-2 text-xs lg:flex">
            <UserRound size={20} />
            <span>Hello, sign in<br /><b>Account & Lists</b></span>
          </div>
          <div className="hidden items-center gap-2 text-xs lg:flex">
            <Package size={20} />
            <span>Delivery<br /><b>& Orders</b></span>
          </div>
          <button 
            onClick={() => setCartOpen(true)} 
            className="relative flex items-center gap-1 rounded-md p-2 hover:bg-primary-foreground/10" 
            aria-label={`Cart with ${cart.length} items`}
          >
            <ShoppingCart size={25} />
            <b className="text-accent">{cart.length}</b>
            <span className="hidden text-sm font-bold md:inline">Cart</span>
          </button>
        </div>
        <nav className="flex gap-5 overflow-x-auto border-t border-primary-foreground/15 px-4 py-3 text-sm font-semibold lg:px-8">
          {categories.map((cat) => (
            <Link 
              href={`/collections/${cat.handle}`} 
              key={cat.name} 
              className="whitespace-nowrap hover:text-accent"
            >
              {cat.name}
            </Link>
          ))}
          <a href="#deals" className="whitespace-nowrap text-accent">Today's Deals</a>
        </nav>
      </header>

      <main className="mx-auto max-w-[1440px] px-4 pb-16 lg:px-8">
        {/* Hero Section */}
        <section className="relative mt-5 overflow-hidden rounded-2xl bg-secondary p-8 md:p-14">
          <div className="relative z-10 max-w-xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              <Sparkles size={16} /> The Shopa edit
            </p>
            <h1 className="text-balance text-4xl font-black tracking-tight text-primary md:text-6xl">
              More of what makes life better.
            </h1>
            <p className="mt-5 max-w-md text-pretty leading-6 text-muted-foreground">
              Curated finds across every aisle, from everyday essentials to the pieces you'll keep forever.
            </p>
            <a href="#find-your-favorite" className="mt-7 inline-flex rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-sm transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
              Explore the collection
            </a>
          </div>
          <div className="absolute right-0 top-0 hidden h-full w-1/2 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85')] bg-cover bg-center md:block" />
        </section>

        {/* Shop by Department */}
        <section id="find-your-favorite" className="scroll-mt-6 py-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Shop by department</p>
              <h2 className="mt-1 text-2xl font-bold text-primary">Find your next favorite</h2>
            </div>
            <a href="/collections" className="hidden items-center gap-1 text-sm font-bold text-primary md:flex">
              See all <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link 
                href={`/collections/${cat.handle}`} 
                key={cat.name} 
                className="group overflow-hidden rounded-xl border bg-card transition hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="p-3">
                  <b className="text-sm text-primary">{cat.name}</b>
                  <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Deals Banner */}
        <section id="deals" className="rounded-xl bg-primary p-5 text-primary-foreground md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Kampala offers</p>
              <h2 className="mt-1 text-2xl font-bold">Deals worth checking twice</h2>
              <p className="mt-2 text-sm text-primary-foreground/70">Local picks, quick delivery, and everyday value across Uganda.</p>
            </div>
            <button className="flex items-center gap-1 text-sm font-bold text-accent">
              View all deals <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Products Grid */}
        <section id="products" className="py-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Trending now</p>
              <h2 className="mt-1 text-2xl font-bold text-primary">Popular picks for you</h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {products.length ? `${products.length} products` : 'Catalog loading'}
            </span>
          </div>

          {visibleProducts.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {visibleProducts.map((product) => (
                <article key={product.id} className="group relative rounded-xl border bg-card p-3 transition hover:shadow-lg">
                  <button 
                    aria-label={`Add ${product.title} to wishlist`} 
                    className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-2 text-muted-foreground shadow-sm"
                  >
                    <Heart size={16} />
                  </button>
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-muted">
                    {product.featuredImage ? (
                      <img 
                        src={product.featuredImage.url} 
                        alt={product.featuredImage.altText || product.title} 
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105" 
                      />
                    ) : (
                      <Package className="text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-5">{product.title}</h3>
                  <p className="mt-2 text-lg font-black text-primary">
                    {formatMoney(
                      product.priceRange.minVariantPrice.amount, 
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                  </p>
                  <button 
                    onClick={() => addToCart(product)} 
                    className="mt-3 flex w-full items-center justify-center gap-1 rounded-md bg-accent py-2 text-xs font-bold text-accent-foreground transition hover:bg-accent/90"
                  >
                    <Plus size={15} /> Add to cart
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border bg-card p-10 text-center text-muted-foreground">
              Your Shopify catalog will appear here once products are available.
              <p className="text-sm mt-2">Go to your Shopify admin to add products.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary px-4 py-12 text-primary-foreground">
        <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-4">
          <div>
            <Image src={logo} alt="Shopa Collection" width={130} height={72} className="h-12 w-auto object-contain brightness-0 invert" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-primary-foreground/70">
              A collection of useful, beautiful, everyday things for Kampala and Uganda.
            </p>
          </div>
          {[
            ['Get to know Shopa', 'About Shopa Kampala', 'Careers', 'Contact us'],
            ['Let us help you', 'Your account', 'Delivery areas', 'Returns'],
            ['Partner with us', 'Sell on Shopa', 'Advertise products', 'Become an affiliate']
          ].map(([title, ...links]) => (
            <div key={title}>
              <b className="text-sm">{title}</b>
              <div className="mt-4 flex flex-col gap-2 text-sm text-primary-foreground/70">
                {links.map((link) => (
                  <a href="#" key={link} className="hover:text-accent">{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-[1440px] border-t border-primary-foreground/15 pt-5 text-xs text-primary-foreground/60">
          © 2026 Shopa Collection · Privacy · Terms · Accessibility
        </div>
      </footer>

      {/* Shopping Cart */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-primary/40" onClick={() => setCartOpen(false)}>
          <aside 
            role="dialog" 
            aria-label="Shopping cart" 
            className="ml-auto flex h-full w-full max-w-md flex-col bg-background p-5 shadow-xl" 
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-bold text-primary">
                Your cart <span className="text-sm font-normal text-muted-foreground">({cart.length})</span>
              </h2>
              <button aria-label="Close cart" onClick={() => setCartOpen(false)}>
                <X />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto py-5">
              {cart.length ? (
                cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-3 rounded-lg border p-3">
                    <div className="size-16 overflow-hidden rounded bg-muted">
                      {item.featuredImage && (
                        <img src={item.featuredImage.url} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="flex-1 text-sm font-semibold">
                      {item.title}
                      <br />
                      <span className="text-primary">
                        {formatMoney(
                          item.priceRange.minVariantPrice.amount, 
                          item.priceRange.minVariantPrice.currencyCode
                        )}
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="py-10 text-center text-muted-foreground">Your cart is ready when you are.</p>
              )}
            </div>
            {cart.length > 0 && (
              <button className="rounded-md bg-accent py-3 font-bold text-accent-foreground transition hover:bg-accent/90">
                Proceed to checkout
              </button>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}