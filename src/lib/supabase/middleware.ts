import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const pathname = request.nextUrl.pathname

  // Protect routes that require authentication
  const isProtected = pathname.startsWith('/profile')
  // Auth routes where logged-in users shouldn't be
  const isAuthRoute = pathname === '/login' || pathname === '/register'

  if (isProtected || isAuthRoute) {
    // For protected routes, use getUser() to securely verify the token against the Supabase server
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user && isProtected) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    if (user && isAuthRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/profile'
      return NextResponse.redirect(url)
    }
  } else {
    // For all other routes, use getSession() which is much faster. 
    // It only decodes the JWT and will quietly refresh the token if it's expired,
    // without making a blocking network request on every page transition.
    await supabase.auth.getSession()
  }

  return supabaseResponse
}
