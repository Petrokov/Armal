import { useCallback, useEffect, useId, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Copy, FileText, ImageUp, LogOut, Plus, Save, Trash2 } from 'lucide-react'
import {
  SUPABASE_CATALOGS_BUCKET,
  SUPABASE_MEDIA_BUCKET,
  isSupabaseConfigured,
  supabaseAdmin,
  supabaseAuth,
} from '../lib/supabaseClient'

const locales = [
  { value: 'hr', label: 'HR' },
  { value: 'slo', label: 'SLO' },
  { value: 'rs', label: 'RS' },
]

const emptyBlogPost = {
  locale: 'hr',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image_url: '',
  gallery_image_urls: [],
  status: 'draft',
  published_at: '',
  seo_title: '',
  seo_description: '',
}

const emptyCatalog = {
  locale: 'hr',
  title: '',
  slug: '',
  subtitle: '',
  cover_image_url: '',
  pdf_url: '',
  file_size: '',
  year: new Date().getFullYear(),
  sort_order: 0,
  status: 'draft',
  published_at: '',
  seo_title: '',
  seo_description: '',
}

const slugify = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const AdminShell = ({ children }) => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabaseAuth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link to="/admin/blog" className="text-xl font-bold text-slate-950">
            Armal Admin
          </Link>
          <nav className="flex flex-wrap items-center gap-2">
            <Link className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100" to="/admin/blog">
              Blog
            </Link>
            <Link className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100" to="/admin/catalogs">
              Katalozi
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <LogOut size={16} />
              Odjava
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  )
}

const AdminGate = ({ children }) => {
  const [state, setState] = useState({ loading: true, session: null, profile: null, error: '' })

  useEffect(() => {
    let active = true

    const load = async () => {
      if (!isSupabaseConfigured) {
        setState({ loading: false, session: null, profile: null, error: 'Supabase env varijable nisu postavljene.' })
        return
      }

      const session = supabaseAuth.getSession()
      if (!session?.access_token) {
        setState({ loading: false, session: null, profile: null, error: '' })
        return
      }

      try {
        const profile = await supabaseAuth.getAdminProfile()
        if (active) setState({ loading: false, session, profile, error: '' })
      } catch (error) {
        if (active) setState({ loading: false, session, profile: null, error: error.message })
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  if (state.loading) return <AdminStatus>Ucitavanje admina...</AdminStatus>
  if (!state.session) return <Navigate to="/admin/login" replace />
  if (!state.profile) {
    return (
      <AdminShell>
        <AdminNotice
          title="Admin pristup nije aktivan"
          body={state.error || 'Korisnik je prijavljen, ali nije upisan u admin_users tablicu.'}
        />
      </AdminShell>
    )
  }

  return children
}

const AdminStatus = ({ children }) => (
  <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 text-center text-slate-700">
    {children}
  </div>
)

const AdminNotice = ({ title, body }) => (
  <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950">
    <h1 className="text-lg font-bold">{title}</h1>
    <p className="mt-2 text-sm leading-6">{body}</p>
  </div>
)

const FormField = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
    {children}
  </label>
)

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0070CD] focus:ring-2 focus:ring-[#0070CD]/20'

const TextInput = (props) => <input {...props} className={`${inputClass} ${props.className || ''}`} />
const TextArea = (props) => <textarea {...props} className={`${inputClass} min-h-32 ${props.className || ''}`} />

export const AdminLoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('tin.lojen@petrokov.hr')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (supabaseAuth.getSession()?.access_token) {
    return <Navigate to="/admin/blog" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await supabaseAuth.signInWithPassword(email, password)
      navigate('/admin/blog')
    } catch {
      setError('Prijava nije uspjela. Provjeri email, lozinku i Supabase Auth korisnika.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-950">Armal admin prijava</h1>
        <p className="mt-2 text-sm text-slate-600">Prijava koristi Supabase email/password autentikaciju.</p>

        {!isSupabaseConfigured && (
          <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
            Nedostaju VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY.
          </div>
        )}

        {error && <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <div className="mt-6 space-y-4">
          <FormField label="Email">
            <TextInput type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </FormField>
          <FormField label="Lozinka">
            <TextInput type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </FormField>
        </div>

        <button
          type="submit"
          disabled={loading || !isSupabaseConfigured}
          className="mt-6 w-full rounded-md bg-[#0070CD] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#005bb0] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? 'Prijava...' : 'Prijavi se'}
        </button>
      </form>
    </div>
  )
}

export const AdminBlogListPage = () => {
  const [locale, setLocale] = useState('hr')
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')

  const loadPosts = useCallback(() => {
    supabaseAdmin
      .listBlogPosts(locale)
      .then((items) => {
        setPosts(items)
        setError('')
      })
      .catch((err) => setError(err.message))
  }, [locale])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const handleDeletePost = async (post) => {
    if (!window.confirm(`Obrisati blog "${post.title || 'Bez naslova'}"?`)) return

    try {
      await supabaseAdmin.deleteBlogPost(post.id)
      loadPosts()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AdminGate>
      <AdminShell>
        <ListHeader title="Blog" newPath="/admin/blog/new" locale={locale} setLocale={setLocale} />
        {error && <AdminNotice title="Greska" body={error} />}
        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {posts.map((post) => (
            <ListRow
              key={post.id}
              title={post.title}
              meta={`${post.locale.toUpperCase()} | ${post.status} | ${post.slug}`}
              editPath={`/admin/blog/${post.id}`}
              copyPath={`/admin/blog/new?copy=${post.id}`}
              onDelete={() => handleDeletePost(post)}
            />
          ))}
          {!posts.length && <EmptyState label="Nema blog zapisa za odabrani jezik." />}
        </div>
      </AdminShell>
    </AdminGate>
  )
}

export const AdminCatalogListPage = () => {
  const [locale, setLocale] = useState('hr')
  const [catalogs, setCatalogs] = useState([])
  const [error, setError] = useState('')

  const loadCatalogs = useCallback(() => {
    supabaseAdmin
      .listCatalogs(locale)
      .then((items) => {
        setCatalogs(items)
        setError('')
      })
      .catch((err) => setError(err.message))
  }, [locale])

  useEffect(() => {
    loadCatalogs()
  }, [loadCatalogs])

  const handleDeleteCatalog = async (catalog) => {
    if (!window.confirm(`Obrisati katalog "${catalog.title || 'Bez naslova'}"?`)) return

    try {
      await supabaseAdmin.deleteCatalog(catalog.id)
      loadCatalogs()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AdminGate>
      <AdminShell>
        <ListHeader title="Katalozi" newPath="/admin/catalogs/new" locale={locale} setLocale={setLocale} />
        {error && <AdminNotice title="Greska" body={error} />}
        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {catalogs.map((catalog) => (
            <ListRow
              key={catalog.id}
              title={catalog.title}
              meta={`${catalog.locale.toUpperCase()} | ${catalog.status} | ${catalog.year || ''}`}
              editPath={`/admin/catalogs/${catalog.id}`}
              copyPath={`/admin/catalogs/new?copy=${catalog.id}`}
              onDelete={() => handleDeleteCatalog(catalog)}
            />
          ))}
          {!catalogs.length && <EmptyState label="Nema kataloga za odabrani jezik." />}
        </div>
      </AdminShell>
    </AdminGate>
  )
}

const ListHeader = ({ title, newPath, locale, setLocale }) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
      <p className="mt-1 text-sm text-slate-600">Draft zapisi ostaju skriveni na javnom webu.</p>
    </div>
    <div className="flex items-center gap-3">
      <select value={locale} onChange={(event) => setLocale(event.target.value)} className={inputClass}>
        {locales.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <Link
        to={newPath}
        className="inline-flex items-center gap-2 rounded-md bg-[#0070CD] px-4 py-2 text-sm font-bold text-white hover:bg-[#005bb0]"
      >
        <Plus size={16} />
        Novi
      </Link>
    </div>
  </div>
)

const ListRow = ({ title, meta, editPath, copyPath, onDelete }) => (
  <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 hover:bg-slate-50">
    <div>
      <h2 className="font-semibold text-slate-950">{title || 'Bez naslova'}</h2>
      <p className="mt-1 text-sm text-slate-500">{meta}</p>
    </div>
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Link
        to={editPath}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        Uredi
      </Link>
      {copyPath && (
        <Link
          to={copyPath}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Copy size={15} />
          Kopiraj
        </Link>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
        >
          <Trash2 size={15} />
          Obrisi
        </button>
      )}
    </div>
  </div>
)

const EmptyState = ({ label }) => <div className="px-5 py-10 text-center text-sm text-slate-500">{label}</div>

export const AdminBlogEditorPage = () => {
  const { id } = useParams()
  return (
    <AdminGate>
      <AdminShell>
        <BlogEditor id={id} />
      </AdminShell>
    </AdminGate>
  )
}

export const AdminCatalogEditorPage = () => {
  const { id } = useParams()
  return (
    <AdminGate>
      <AdminShell>
        <CatalogEditor id={id} />
      </AdminShell>
    </AdminGate>
  )
}

const BlogEditor = ({ id }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(emptyBlogPost)
  const [message, setMessage] = useState('')
  const isNew = id === 'new'
  const copyId = searchParams.get('copy')

  useEffect(() => {
    if (isNew && copyId) {
      supabaseAdmin.getBlogPost(copyId).then((post) => {
        if (!post) return

        const { id: _id, created_at: _createdAt, updated_at: _updatedAt, author_id: _authorId, ...copy } = post
        setForm({
          ...emptyBlogPost,
          ...copy,
          status: 'draft',
          published_at: '',
        })
        setMessage('Kopija je spremna kao novi draft. Promijeni jezik i prevedi tekstove prije spremanja.')
      })
      return
    }

    if (isNew) {
      queueMicrotask(() => setForm(emptyBlogPost))
      return
    }

    if (!isNew) {
      supabaseAdmin.getBlogPost(id).then((post) => {
        if (post) setForm({ ...emptyBlogPost, ...post, published_at: post.published_at?.slice(0, 16) || '' })
      })
    }
  }, [copyId, id, isNew])

  const update = (key, value) => {
    setForm((current) => {
      const next = {
        ...current,
        [key]: value,
      }

      if (key === 'title' && !current.slug) {
        next.slug = slugify(value)
      }

      return next
    })
  }

  const save = async (event) => {
    event.preventDefault()
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      gallery_image_urls: Array.isArray(form.gallery_image_urls) ? form.gallery_image_urls : [],
      published_at: form.status === 'published' ? form.published_at || new Date().toISOString() : null,
    }
    const saved = await supabaseAdmin.saveBlogPost(payload)
    setMessage('Spremljeno.')
    if (isNew && saved?.id) navigate(`/admin/blog/${saved.id}`, { replace: true })
  }

  const uploadCover = async (file) => {
    if (!file) return
    const url = await supabaseAdmin.uploadFile(SUPABASE_MEDIA_BUCKET, file, `blog/${form.locale}`)
    update('cover_image_url', url)
  }

  const uploadGalleryImages = async (files) => {
    const selectedFiles = Array.from(files || [])
    if (!selectedFiles.length) return

    const urls = []
    for (const file of selectedFiles) {
      const url = await supabaseAdmin.uploadFile(SUPABASE_MEDIA_BUCKET, file, `blog/${form.locale}/gallery`)
      urls.push(url)
    }

    setForm((current) => ({
      ...current,
      gallery_image_urls: [...(current.gallery_image_urls || []), ...urls],
    }))
  }

  const removeGalleryImage = (url) => {
    setForm((current) => ({
      ...current,
      gallery_image_urls: (current.gallery_image_urls || []).filter((item) => item !== url),
    }))
  }

  const handleDelete = async () => {
    if (!isNew && window.confirm('Obrisati blog zapis?')) {
      await supabaseAdmin.deleteBlogPost(id)
      navigate('/admin/blog')
    }
  }

  return (
    <EditorFrame backPath="/admin/blog" title={isNew ? 'Novi blog zapis' : 'Uredi blog zapis'} onSubmit={save} message={message}>
      <CommonFields form={form} update={update} />
      <FormField label="Kratki opis">
        <TextArea value={form.excerpt || ''} onChange={(event) => update('excerpt', event.target.value)} />
      </FormField>
      <FormField label="Sadrzaj">
        <TextArea className="min-h-72" value={form.content || ''} onChange={(event) => update('content', event.target.value)} />
      </FormField>
      <UploadField label="Cover slika" value={form.cover_image_url} onUpload={uploadCover} icon={<ImageUp size={16} />} />
      <GalleryUploadField
        images={form.gallery_image_urls || []}
        onUpload={uploadGalleryImages}
        onRemove={removeGalleryImage}
      />
      <SeoFields form={form} update={update} />
      <EditorActions showDelete={!isNew} onDelete={handleDelete} />
    </EditorFrame>
  )
}

const CatalogEditor = ({ id }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(emptyCatalog)
  const [message, setMessage] = useState('')
  const isNew = id === 'new'
  const copyId = searchParams.get('copy')

  useEffect(() => {
    if (isNew && copyId) {
      supabaseAdmin.getCatalog(copyId).then((catalog) => {
        if (!catalog) return

        const { id: _id, created_at: _createdAt, updated_at: _updatedAt, author_id: _authorId, ...copy } = catalog
        setForm({
          ...emptyCatalog,
          ...copy,
          status: 'draft',
          published_at: '',
        })
        setMessage('Kopija je spremna kao novi draft. Promijeni jezik i prevedi tekstove prije spremanja.')
      })
      return
    }

    if (isNew) {
      queueMicrotask(() => setForm(emptyCatalog))
      return
    }

    if (!isNew) {
      supabaseAdmin.getCatalog(id).then((catalog) => {
        if (catalog) setForm({ ...emptyCatalog, ...catalog, published_at: catalog.published_at?.slice(0, 16) || '' })
      })
    }
  }, [copyId, id, isNew])

  const update = (key, value) => {
    setForm((current) => {
      const next = {
        ...current,
        [key]: value,
      }

      if (key === 'title' && !current.slug) {
        next.slug = slugify(value)
      }

      return next
    })
  }

  const save = async (event) => {
    event.preventDefault()
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      year: Number(form.year) || null,
      sort_order: Number(form.sort_order) || 0,
      published_at: form.status === 'published' ? form.published_at || new Date().toISOString() : null,
    }
    const saved = await supabaseAdmin.saveCatalog(payload)
    setMessage('Spremljeno.')
    if (isNew && saved?.id) navigate(`/admin/catalogs/${saved.id}`, { replace: true })
  }

  const uploadCover = async (file) => {
    if (!file) return
    const url = await supabaseAdmin.uploadFile(SUPABASE_MEDIA_BUCKET, file, `catalogs/${form.locale}`)
    update('cover_image_url', url)
  }

  const uploadPdf = async (file) => {
    if (!file) return
    const url = await supabaseAdmin.uploadFile(SUPABASE_CATALOGS_BUCKET, file, `pdf/${form.locale}`)
    update('pdf_url', url)
    update('file_size', `${(file.size / 1024 / 1024).toFixed(1)} MB`)
  }

  const handleDelete = async () => {
    if (!isNew && window.confirm('Obrisati katalog?')) {
      await supabaseAdmin.deleteCatalog(id)
      navigate('/admin/catalogs')
    }
  }

  return (
    <EditorFrame backPath="/admin/catalogs" title={isNew ? 'Novi katalog' : 'Uredi katalog'} onSubmit={save} message={message}>
      <CommonFields form={form} update={update} />
      <FormField label="Podnaslov">
        <TextArea value={form.subtitle || ''} onChange={(event) => update('subtitle', event.target.value)} />
      </FormField>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Godina">
          <TextInput type="number" value={form.year || ''} onChange={(event) => update('year', event.target.value)} />
        </FormField>
        <FormField label="Velicina PDF-a">
          <TextInput value={form.file_size || ''} onChange={(event) => update('file_size', event.target.value)} />
        </FormField>
        <FormField label="Redoslijed">
          <TextInput type="number" value={form.sort_order || 0} onChange={(event) => update('sort_order', event.target.value)} />
        </FormField>
      </div>
      <UploadField label="Cover slika" value={form.cover_image_url} onUpload={uploadCover} icon={<ImageUp size={16} />} />
      <UploadField label="PDF katalog" value={form.pdf_url} onUpload={uploadPdf} icon={<FileText size={16} />} accept="application/pdf" />
      <SeoFields form={form} update={update} />
      <EditorActions showDelete={!isNew} onDelete={handleDelete} />
    </EditorFrame>
  )
}

const EditorFrame = ({ backPath, title, onSubmit, message, children }) => (
  <form onSubmit={onSubmit}>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <Link to={backPath} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0070CD]">
        <ArrowLeft size={16} />
        Nazad
      </Link>
      {message && <span className="rounded-md bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{message}</span>}
    </div>
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-3xl font-bold text-slate-950">{title}</h1>
      <div className="grid gap-5">{children}</div>
    </div>
  </form>
)

const CommonFields = ({ form, update }) => (
  <>
    <div className="grid gap-4 md:grid-cols-3">
      <FormField label="Jezik">
        <select value={form.locale} onChange={(event) => update('locale', event.target.value)} className={inputClass}>
          {locales.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Status">
        <select value={form.status} onChange={(event) => update('status', event.target.value)} className={inputClass}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </FormField>
      <FormField label="Datum objave">
        <TextInput type="datetime-local" value={form.published_at || ''} onChange={(event) => update('published_at', event.target.value)} />
      </FormField>
    </div>
    <FormField label="Naslov">
      <TextInput value={form.title || ''} onChange={(event) => update('title', event.target.value)} required />
    </FormField>
    <FormField label="Slug">
      <TextInput value={form.slug || ''} onChange={(event) => update('slug', slugify(event.target.value))} required />
    </FormField>
  </>
)

const SeoFields = ({ form, update }) => (
  <div className="grid gap-4 md:grid-cols-2">
    <FormField label="SEO title">
      <TextInput value={form.seo_title || ''} onChange={(event) => update('seo_title', event.target.value)} />
    </FormField>
    <FormField label="SEO description">
      <TextInput value={form.seo_description || ''} onChange={(event) => update('seo_description', event.target.value)} />
    </FormField>
  </div>
)

const UploadField = ({ label, value, onUpload, icon, accept = 'image/*' }) => {
  const fileId = `${label.replace(/\s+/g, '-').toLowerCase()}-${useId()}`

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={fileId}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          {icon}
          Upload
        </label>
        <input id={fileId} type="file" accept={accept} className="sr-only" onChange={(event) => onUpload(event.target.files?.[0])} />
        {value && (
          <a href={value} target="_blank" rel="noreferrer" className="break-all text-sm font-semibold text-[#0070CD]">
            {value}
          </a>
        )}
      </div>
    </div>
  )
}

const GalleryUploadField = ({ images, onUpload, onRemove }) => {
  const fileId = `galerija-slika-${useId()}`

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-slate-700">Galerija slika</span>
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={fileId}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <ImageUp size={16} />
          Upload slika
        </label>
        <input
          id={fileId}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(event) => onUpload(event.target.files)}
        />
        <span className="text-sm text-slate-500">Opcionalno, mozes dodati vise slika.</span>
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((url) => (
            <div key={url} className="overflow-hidden rounded-md border border-slate-200 bg-white">
              <img src={url} alt="" className="h-32 w-full object-cover" loading="lazy" />
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="flex w-full items-center justify-center gap-2 border-t border-slate-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
              >
                <Trash2 size={15} />
                Ukloni
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const EditorActions = ({ showDelete, onDelete }) => (
  <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-5">
    <button
      type="submit"
      className="inline-flex items-center gap-2 rounded-md bg-[#0070CD] px-5 py-3 text-sm font-bold text-white hover:bg-[#005bb0]"
    >
      <Save size={16} />
      Spremi
    </button>
    {showDelete && (
      <button
        type="button"
        onClick={onDelete}
        className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-700 hover:bg-red-50"
      >
        <Trash2 size={16} />
        Obrisi
      </button>
    )}
  </div>
)
