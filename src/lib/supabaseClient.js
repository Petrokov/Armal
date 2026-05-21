const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const SUPABASE_MEDIA_BUCKET = 'armal-media'
export const SUPABASE_CATALOGS_BUCKET = 'armal-catalogs'

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem('armal_supabase_session') || 'null')
  } catch {
    return null
  }
}

const setSession = (session) => {
  if (!session) {
    localStorage.removeItem('armal_supabase_session')
    return
  }

  localStorage.setItem('armal_supabase_session', JSON.stringify(session))
}

const getHeaders = (accessToken, extraHeaders = {}) => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${accessToken || SUPABASE_ANON_KEY}`,
  ...extraHeaders,
})

const assertConfigured = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase env varijable nisu postavljene.')
  }
}

const request = async (path, options = {}) => {
  assertConfigured()

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: getHeaders(options.accessToken, options.headers),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Supabase request failed: ${response.status}`)
  }

  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  return contentType.includes('application/json') ? response.json() : response.text()
}

const select = (table, query = '') => request(`/rest/v1/${table}${query}`)

const mutate = (table, method, body, accessToken, query = '') =>
  request(`/rest/v1/${table}${query}`, {
    method,
    accessToken,
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(body),
  })

const remove = (table, accessToken, query = '') =>
  request(`/rest/v1/${table}${query}`, {
    method: 'DELETE',
    accessToken,
    headers: {
      Prefer: 'return=representation',
    },
  })

export const supabaseAuth = {
  getSession,
  setSession,
  async signInWithPassword(email, password) {
    const data = await request('/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    setSession(data)
    return data
  },
  async signOut() {
    const session = getSession()
    if (session?.access_token) {
      await request('/auth/v1/logout', {
        method: 'POST',
        accessToken: session.access_token,
      }).catch(() => null)
    }
    setSession(null)
  },
  async getAdminProfile() {
    const session = getSession()
    if (!session?.access_token) return null

    if (session.user?.id) {
      const query = `?select=*&user_id=eq.${session.user.id}&limit=1`
      const rows = await request(`/rest/v1/admin_users${query}`, {
        accessToken: session.access_token,
      })
      if (rows?.[0]) return rows[0]
    }

    if (session.user?.email) {
      const query = `?select=*&email=eq.${encodeURIComponent(session.user.email)}&limit=1`
      const rows = await request(`/rest/v1/admin_users${query}`, {
        accessToken: session.access_token,
      })
      if (rows?.[0]) return rows[0]
    }

    return null
  },
}

export const supabasePublic = {
  async getPublishedBlogPosts(locale) {
    const query =
      `?select=*&locale=eq.${locale}&status=eq.published&order=published_at.desc,created_at.desc`
    return select('blog_posts', query)
  },
  async getPublishedBlogPost(locale, slug) {
    const rows = await select(
      'blog_posts',
      `?select=*&locale=eq.${locale}&status=eq.published&slug=eq.${encodeURIComponent(slug)}&limit=1`,
    )
    return rows?.[0] || null
  },
  async getPublishedCatalogs(locale) {
    const query =
      `?select=*&locale=eq.${locale}&status=eq.published&order=sort_order.asc,published_at.desc,created_at.desc`
    return select('catalogs', query)
  },
}

export const supabaseAdmin = {
  async listBlogPosts(locale) {
    const session = getSession()
    return request(`/rest/v1/blog_posts?select=*&locale=eq.${locale}&order=created_at.desc`, {
      accessToken: session?.access_token,
    })
  },
  async getBlogPost(id) {
    const session = getSession()
    const rows = await request(`/rest/v1/blog_posts?select=*&id=eq.${id}&limit=1`, {
      accessToken: session?.access_token,
    })
    return rows?.[0] || null
  },
  async saveBlogPost(payload) {
    const session = getSession()
    const body = { ...payload, updated_at: new Date().toISOString() }
    if (payload.id) {
      const rows = await mutate('blog_posts', 'PATCH', body, session?.access_token, `?id=eq.${payload.id}`)
      return rows?.[0] || null
    }

    const rows = await mutate('blog_posts', 'POST', body, session?.access_token)
    return rows?.[0] || null
  },
  async deleteBlogPost(id) {
    const session = getSession()
    return remove('blog_posts', session?.access_token, `?id=eq.${id}`)
  },
  async listCatalogs(locale) {
    const session = getSession()
    return request(`/rest/v1/catalogs?select=*&locale=eq.${locale}&order=sort_order.asc,created_at.desc`, {
      accessToken: session?.access_token,
    })
  },
  async getCatalog(id) {
    const session = getSession()
    const rows = await request(`/rest/v1/catalogs?select=*&id=eq.${id}&limit=1`, {
      accessToken: session?.access_token,
    })
    return rows?.[0] || null
  },
  async saveCatalog(payload) {
    const session = getSession()
    const body = { ...payload, updated_at: new Date().toISOString() }
    if (payload.id) {
      const rows = await mutate('catalogs', 'PATCH', body, session?.access_token, `?id=eq.${payload.id}`)
      return rows?.[0] || null
    }

    const rows = await mutate('catalogs', 'POST', body, session?.access_token)
    return rows?.[0] || null
  },
  async deleteCatalog(id) {
    const session = getSession()
    return remove('catalogs', session?.access_token, `?id=eq.${id}`)
  },
  async uploadFile(bucket, file, folder = 'uploads') {
    const session = getSession()
    if (!session?.access_token) throw new Error('Niste prijavljeni.')

    const safeName = file.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase()
    const path = `${folder}/${Date.now()}-${safeName}`

    await request(`/storage/v1/object/${bucket}/${path}`, {
      method: 'POST',
      accessToken: session.access_token,
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
        'x-upsert': 'true',
      },
      body: file,
    })

    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
  },
}
