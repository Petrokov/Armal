import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, Copy, FileText, ImageUp, LogOut, Plus, Save, Trash2 } from 'lucide-react'
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

const emptyTeamMember = {
  name: '',
  title: '',
  image_url: '',
  email: '',
  linkedin_url: '',
  sort_order: 0,
  show_on_homepage: false,
  row_id: '',
  position_in_row: 0,
  status: 'draft',
  published_at: '',
}

const emptyLayoutRow = (sortOrder = 1) => ({
  clientKey: `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  id: '',
  sort_order: sortOrder,
  columns_lg: 3,
  memberIds: [],
})

const slugify = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const toDatetimeLocalValue = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, 16)
}

const toPublishedAtIso = (value) => {
  if (!value) return new Date().toISOString()
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

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
            <Link className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100" to="/admin/team">
              Tim
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

export const AdminTeamListPage = () => {
  const [members, setMembers] = useState([])
  const [layoutRows, setLayoutRows] = useState([])
  const [layoutMessage, setLayoutMessage] = useState('')
  const [layoutBusy, setLayoutBusy] = useState(false)
  const [error, setError] = useState('')

  const loadMembers = useCallback(() => {
    supabaseAdmin
      .listTeamMembers()
      .then((items) => {
        setMembers(items)
        setError('')
      })
      .catch((err) => setError(err.message))
  }, [])

  const loadLayout = useCallback(() => {
    supabaseAdmin
      .listTeamRows()
      .then((rows) => {
        setLayoutRows(
          (rows || []).map((row) => ({
            clientKey: row.id,
            id: row.id,
            sort_order: row.sort_order,
            columns_lg: row.columns_lg,
            memberIds: (row.team_members || [])
              .sort((a, b) => (a.position_in_row || 0) - (b.position_in_row || 0))
              .map((member) => member.id),
          })),
        )
      })
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    loadMembers()
    loadLayout()
  }, [loadMembers, loadLayout])

  const handleDeleteMember = async (member) => {
    if (!window.confirm(`Obrisati zaposlenika "${member.name || 'Bez imena'}"?`)) return

    try {
      await supabaseAdmin.deleteTeamMember(member.id)
      loadMembers()
      loadLayout()
    } catch (err) {
      setError(err.message)
    }
  }

  const updateLayoutRow = (clientKey, patch) => {
    setLayoutRows((current) =>
      current.map((row) => (row.clientKey === clientKey ? { ...row, ...patch } : row)),
    )
  }

  const addLayoutRow = () => {
    setLayoutRows((current) => [...current, emptyLayoutRow(current.length + 1)])
  }

  const removeLayoutRow = (clientKey) => {
    setLayoutRows((current) => current.filter((row) => row.clientKey !== clientKey))
  }

  const moveLayoutRow = (clientKey, direction) => {
    setLayoutRows((current) => {
      const index = current.findIndex((row) => row.clientKey === clientKey)
      if (index === -1) return current

      const nextIndex = direction === 'up' ? index - 1 : index + 1
      if (nextIndex < 0 || nextIndex >= current.length) return current

      const next = [...current]
      ;[next[index], next[nextIndex]] = [next[nextIndex], next[index]]
      return next.map((row, rowIndex) => ({ ...row, sort_order: rowIndex + 1 }))
    })
  }

  const toggleLayoutMember = (clientKey, memberId) => {
    setLayoutRows((current) =>
      current.map((row) => {
        if (row.clientKey !== clientKey) return row

        const exists = row.memberIds.includes(memberId)
        return {
          ...row,
          memberIds: exists
            ? row.memberIds.filter((id) => id !== memberId)
            : [...row.memberIds, memberId],
        }
      }),
    )
  }

  const moveLayoutMember = (clientKey, memberId, direction) => {
    setLayoutRows((current) =>
      current.map((row) => {
        if (row.clientKey !== clientKey) return row

        const index = row.memberIds.indexOf(memberId)
        if (index === -1) return row

        const nextIndex = direction === 'up' ? index - 1 : index + 1
        if (nextIndex < 0 || nextIndex >= row.memberIds.length) return row

        const memberIds = [...row.memberIds]
        ;[memberIds[index], memberIds[nextIndex]] = [memberIds[nextIndex], memberIds[index]]
        return { ...row, memberIds }
      }),
    )
  }

  const saveLayout = async () => {
    setLayoutBusy(true)
    setLayoutMessage('')
    setError('')

    try {
      const payload = layoutRows.map((row, index) => ({
        id: row.id || undefined,
        sort_order: index + 1,
        columns_lg: Number(row.columns_lg) || 3,
        memberIds: row.memberIds,
      }))

      await supabaseAdmin.saveTeamLayout(payload)
      setLayoutMessage('Raspored je spremljen.')
      loadLayout()
      loadMembers()
    } catch (err) {
      setError(err.message || 'Spremanje rasporeda nije uspjelo.')
    } finally {
      setLayoutBusy(false)
    }
  }

  const memberNameById = useMemo(() => new Map(members.map((member) => [member.id, member.name])), [members])

  return (
    <AdminGate>
      <AdminShell>
        <TeamListHeader title="Tim" newPath="/admin/team/new" />
        {error && <AdminNotice title="Greska" body={error} />}
        {layoutMessage && (
          <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-700">
            {layoutMessage}
          </div>
        )}

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Raspored na O nama</h2>
              <p className="mt-1 text-sm text-slate-600">Definiraj redove, broj kolona i osobe po redu.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={addLayoutRow}
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Plus size={16} />
                Dodaj red
              </button>
              <button
                type="button"
                onClick={saveLayout}
                disabled={layoutBusy}
                className="inline-flex items-center gap-2 rounded-md bg-[#0070CD] px-4 py-2 text-sm font-bold text-white hover:bg-[#005bb0] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Save size={16} />
                {layoutBusy ? 'Spremanje...' : 'Spremi raspored'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {layoutRows.map((row, rowIndex) => (
              <div key={row.clientKey} className="rounded-lg border border-slate-200 p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">Red {rowIndex + 1}</span>
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      Kolona
                      <select
                        value={row.columns_lg}
                        onChange={(event) => updateLayoutRow(row.clientKey, { columns_lg: Number(event.target.value) })}
                        className={inputClass}
                      >
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => moveLayoutRow(row.clientKey, 'up')}
                      className="rounded-md border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-50"
                      aria-label="Pomakni red gore"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveLayoutRow(row.clientKey, 'down')}
                      className="rounded-md border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-50"
                      aria-label="Pomakni red dolje"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeLayoutRow(row.clientKey)}
                      className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Obrisi red
                    </button>
                  </div>
                </div>

                {row.memberIds.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <p className="text-sm font-semibold text-slate-700">Osobe u redu</p>
                    {row.memberIds.map((memberId) => (
                      <div key={memberId} className="flex items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-2">
                        <span className="text-sm font-medium text-slate-900">{memberNameById.get(memberId) || memberId}</span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => moveLayoutMember(row.clientKey, memberId, 'up')}
                            className="rounded border border-slate-300 bg-white p-1 text-slate-700 hover:bg-white"
                            aria-label="Gore"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveLayoutMember(row.clientKey, memberId, 'down')}
                            className="rounded border border-slate-300 bg-white p-1 text-slate-700 hover:bg-white"
                            aria-label="Dolje"
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleLayoutMember(row.clientKey, memberId)}
                            className="rounded border border-red-200 bg-white px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                          >
                            Ukloni
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">Dodaj osobe</p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {members.map((member) => {
                      const selected = row.memberIds.includes(member.id)
                      return (
                        <label
                          key={member.id}
                          className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                            selected ? 'border-[#0070CD] bg-blue-50 text-slate-900' : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleLayoutMember(row.clientKey, member.id)}
                            className="h-4 w-4 rounded border-slate-300 text-[#0070CD] focus:ring-[#0070CD]"
                          />
                          {member.name}
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}

            {!layoutRows.length && (
              <div className="rounded-md border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
                Nema definiranih redova. Dodaj prvi red za stranicu O nama.
              </div>
            )}
          </div>
        </section>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-950">Svi zaposlenici</h2>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            {members.map((member) => (
              <ListRow
                key={member.id}
                title={member.name}
                meta={`${member.title} | redoslijed ${member.sort_order} | ${member.status}${member.show_on_homepage ? ' | homepage' : ''}${member.row_id ? ' | O nama red' : ''}`}
                editPath={`/admin/team/${member.id}`}
                onDelete={() => handleDeleteMember(member)}
              />
            ))}
            {!members.length && <EmptyState label="Nema zaposlenika." />}
          </div>
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

const TeamListHeader = ({ title, newPath }) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
      <p className="mt-1 text-sm text-slate-600">Draft zaposlenici ostaju skriveni na javnom webu.</p>
    </div>
    <Link
      to={newPath}
      className="inline-flex items-center gap-2 rounded-md bg-[#0070CD] px-4 py-2 text-sm font-bold text-white hover:bg-[#005bb0]"
    >
      <Plus size={16} />
      Novi
    </Link>
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

export const AdminTeamEditorPage = () => {
  const { id } = useParams()
  return (
    <AdminGate>
      <AdminShell>
        <TeamEditor id={id} />
      </AdminShell>
    </AdminGate>
  )
}

const BlogEditor = ({ id }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(emptyBlogPost)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
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
        if (post) setForm({ ...emptyBlogPost, ...post, published_at: toDatetimeLocalValue(post.published_at) })
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
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        gallery_image_urls: Array.isArray(form.gallery_image_urls) ? form.gallery_image_urls : [],
        published_at: form.status === 'published' ? toPublishedAtIso(form.published_at) : null,
      }
      const saved = await supabaseAdmin.saveBlogPost(payload)
      setMessage('Spremljeno.')
      if (isNew && saved?.id) navigate(`/admin/blog/${saved.id}`, { replace: true })
    } catch (err) {
      setError(err.message || 'Spremanje bloga nije uspjelo.')
    } finally {
      setBusy(false)
    }
  }

  const uploadCover = async (file) => {
    if (!file) return
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const url = await supabaseAdmin.uploadFile(SUPABASE_MEDIA_BUCKET, file, `blog/${form.locale}`)
      update('cover_image_url', url)
      setMessage('Cover slika je uploadana.')
    } catch (err) {
      setError(err.message || 'Upload cover slike nije uspio.')
    } finally {
      setBusy(false)
    }
  }

  const uploadGalleryImages = async (files) => {
    const selectedFiles = Array.from(files || [])
    if (!selectedFiles.length) return

    setBusy(true)
    setError('')
    setMessage('')

    try {
      const urls = []
      for (const file of selectedFiles) {
        const url = await supabaseAdmin.uploadFile(SUPABASE_MEDIA_BUCKET, file, `blog/${form.locale}/gallery`)
        urls.push(url)
      }

      setForm((current) => ({
        ...current,
        gallery_image_urls: [...(current.gallery_image_urls || []), ...urls],
      }))
      setMessage('Galerija je uploadana.')
    } catch (err) {
      setError(err.message || 'Upload galerije nije uspio.')
    } finally {
      setBusy(false)
    }
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
    <EditorFrame backPath="/admin/blog" title={isNew ? 'Novi blog zapis' : 'Uredi blog zapis'} onSubmit={save} message={message} error={error}>
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
      <EditorActions showDelete={!isNew} onDelete={handleDelete} busy={busy} />
    </EditorFrame>
  )
}

const CatalogEditor = ({ id }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(emptyCatalog)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
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
        if (catalog) setForm({ ...emptyCatalog, ...catalog, published_at: toDatetimeLocalValue(catalog.published_at) })
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
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        year: Number(form.year) || null,
        sort_order: Number(form.sort_order) || 0,
        published_at: form.status === 'published' ? toPublishedAtIso(form.published_at) : null,
      }
      const saved = await supabaseAdmin.saveCatalog(payload)
      setMessage('Spremljeno.')
      if (isNew && saved?.id) navigate(`/admin/catalogs/${saved.id}`, { replace: true })
    } catch (err) {
      setError(err.message || 'Spremanje kataloga nije uspjelo.')
    } finally {
      setBusy(false)
    }
  }

  const uploadCover = async (file) => {
    if (!file) return
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const url = await supabaseAdmin.uploadFile(SUPABASE_MEDIA_BUCKET, file, `catalogs/${form.locale}`)
      update('cover_image_url', url)
      setMessage('Cover slika je uploadana.')
    } catch (err) {
      setError(err.message || 'Upload cover slike nije uspio.')
    } finally {
      setBusy(false)
    }
  }

  const uploadPdf = async (file) => {
    if (!file) return
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const url = await supabaseAdmin.uploadFile(SUPABASE_CATALOGS_BUCKET, file, `pdf/${form.locale}`)
      update('pdf_url', url)
      update('file_size', `${(file.size / 1024 / 1024).toFixed(1)} MB`)
      setMessage('PDF katalog je uploadan.')
    } catch (err) {
      setError(err.message || 'Upload PDF-a nije uspio.')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    if (!isNew && window.confirm('Obrisati katalog?')) {
      await supabaseAdmin.deleteCatalog(id)
      navigate('/admin/catalogs')
    }
  }

  return (
    <EditorFrame backPath="/admin/catalogs" title={isNew ? 'Novi katalog' : 'Uredi katalog'} onSubmit={save} message={message} error={error}>
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
      <EditorActions showDelete={!isNew} onDelete={handleDelete} busy={busy} />
    </EditorFrame>
  )
}

const TeamEditor = ({ id }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyTeamMember)
  const [teamRows, setTeamRows] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const isNew = id === 'new'

  useEffect(() => {
    supabaseAdmin.listTeamRows().then((rows) => setTeamRows(rows || []))
  }, [])

  useEffect(() => {
    if (isNew) {
      queueMicrotask(() => setForm(emptyTeamMember))
      return
    }

    supabaseAdmin.getTeamMember(id).then((member) => {
      if (member) {
        setForm({
          ...emptyTeamMember,
          ...member,
          row_id: member.row_id || '',
          published_at: toDatetimeLocalValue(member.published_at),
        })
      }
    })
  }, [id, isNew])

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const save = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const payload = {
        ...form,
        sort_order: Number(form.sort_order) || 0,
        position_in_row: Number(form.position_in_row) || 0,
        row_id: form.row_id || null,
        show_on_homepage: Boolean(form.show_on_homepage),
        published_at: form.status === 'published' ? toPublishedAtIso(form.published_at) : null,
      }
      const saved = await supabaseAdmin.saveTeamMember(payload)
      setMessage('Spremljeno.')
      if (isNew && saved?.id) navigate(`/admin/team/${saved.id}`, { replace: true })
    } catch (err) {
      setError(err.message || 'Spremanje zaposlenika nije uspjelo.')
    } finally {
      setBusy(false)
    }
  }

  const uploadImage = async (file) => {
    if (!file) return
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const url = await supabaseAdmin.uploadFile(SUPABASE_MEDIA_BUCKET, file, 'team')
      update('image_url', url)
      setMessage('Slika je uploadana.')
    } catch (err) {
      setError(err.message || 'Upload slike nije uspio.')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    if (!isNew && window.confirm('Obrisati zaposlenika?')) {
      await supabaseAdmin.deleteTeamMember(id)
      navigate('/admin/team')
    }
  }

  return (
    <EditorFrame backPath="/admin/team" title={isNew ? 'Novi zaposlenik' : 'Uredi zaposlenika'} onSubmit={save} message={message} error={error}>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Status">
          <select value={form.status} onChange={(event) => update('status', event.target.value)} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </FormField>
        <FormField label="Datum objave">
          <TextInput type="datetime-local" value={form.published_at || ''} onChange={(event) => update('published_at', event.target.value)} />
        </FormField>
        <FormField label="Redoslijed">
          <TextInput type="number" value={form.sort_order || 0} onChange={(event) => update('sort_order', event.target.value)} />
        </FormField>
      </div>
      <FormField label="Ime i prezime">
        <TextInput value={form.name || ''} onChange={(event) => update('name', event.target.value)} required />
      </FormField>
      <FormField label="Titula">
        <TextInput value={form.title || ''} onChange={(event) => update('title', event.target.value)} required />
      </FormField>
      <FormField label="Email">
        <TextInput type="email" value={form.email || ''} onChange={(event) => update('email', event.target.value)} />
      </FormField>
      <FormField label="LinkedIn URL">
        <TextInput value={form.linkedin_url || ''} onChange={(event) => update('linkedin_url', event.target.value)} placeholder="https://linkedin.com/in/..." />
      </FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Red (O nama)">
          <select value={form.row_id || ''} onChange={(event) => update('row_id', event.target.value)} className={inputClass}>
            <option value="">Nije u rasporedu</option>
            {teamRows.map((row, index) => (
              <option key={row.id} value={row.id}>
                Red {index + 1} ({row.columns_lg} kolone)
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Pozicija u redu">
          <TextInput
            type="number"
            min="0"
            value={form.position_in_row || 0}
            onChange={(event) => update('position_in_row', event.target.value)}
          />
        </FormField>
      </div>
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={Boolean(form.show_on_homepage)}
          onChange={(event) => update('show_on_homepage', event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-[#0070CD] focus:ring-[#0070CD]"
        />
        <span className="text-sm font-semibold text-slate-700">Prikazi na homepage</span>
      </label>
      <UploadField label="Slika zaposlenika" value={form.image_url} onUpload={uploadImage} icon={<ImageUp size={16} />} />
      {form.image_url && (
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
          <img src={form.image_url} alt={form.name || 'Preview'} className="h-48 w-full max-w-xs object-cover object-[center_25%]" loading="lazy" />
        </div>
      )}
      <EditorActions showDelete={!isNew} onDelete={handleDelete} busy={busy} />
    </EditorFrame>
  )
}

const EditorFrame = ({ backPath, title, onSubmit, message, error, children }) => (
  <form onSubmit={onSubmit}>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <Link to={backPath} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0070CD]">
        <ArrowLeft size={16} />
        Nazad
      </Link>
      {message && <span className="rounded-md bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{message}</span>}
    </div>
    {error && <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
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

const EditorActions = ({ showDelete, onDelete, busy }) => (
  <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-5">
    <button
      type="submit"
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-md bg-[#0070CD] px-5 py-3 text-sm font-bold text-white hover:bg-[#005bb0] disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      <Save size={16} />
      {busy ? 'Spremanje...' : 'Spremi'}
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
