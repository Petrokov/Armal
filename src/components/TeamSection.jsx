import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { isSupabaseConfigured, supabasePublic } from '../lib/supabaseClient'

const mapTeamMember = (member) => ({
  id: member.id,
  name: member.name,
  role: member.title,
  image: member.image_url,
  linkedin: member.linkedin_url || '#',
  email: member.email || '',
})

const GRID_COLS = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
}

const TeamSection = ({
  maxMembers,
  showLearnMore = true,
  columnsLg = 5,
  homepageOnly = false,
  rowLayout = false,
}) => {
  const { t } = useLanguage()
  const [members, setMembers] = useState([])
  const [layoutRows, setLayoutRows] = useState([])
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    let active = true

    const load = async () => {
      try {
        if (rowLayout) {
          const rows = await supabasePublic.getPublishedTeamLayout()
          if (active) setLayoutRows(Array.isArray(rows) ? rows : [])
        } else {
          const items = await supabasePublic.getPublishedTeamMembers()
          if (active) setMembers(Array.isArray(items) ? items : [])
        }
      } catch {
        if (active) {
          setMembers([])
          setLayoutRows([])
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [rowLayout])

  const displayedMembers = useMemo(() => {
    let list = members.map(mapTeamMember)

    if (homepageOnly) {
      list = members.filter((member) => member.show_on_homepage).map(mapTeamMember)
    }

    if (maxMembers) {
      list = list.slice(0, maxMembers)
    }

    return list
  }, [homepageOnly, maxMembers, members])

  const rowSections = useMemo(
    () =>
      layoutRows.map((row) => ({
        ...row,
        members: (row.team_members || []).map(mapTeamMember),
      })),
    [layoutRows],
  )

  const renderMemberCard = (member, indexKey) => (
    <div
      key={indexKey}
      className="group flex flex-col pb-6 items-center rounded-2xl bg-white p-0 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="mb-4 h-64 w-full overflow-hidden rounded-t-2xl">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover object-[center_25%] md:object-center transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-500">Nema slike</div>
        )}
      </div>

      <h3 className="mb-2 text-xl font-bold text-slate-900">{member.name}</h3>
      <p className="mb-4 text-sm text-slate-600">{member.role}</p>

      <div className="flex items-center gap-3">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center justify-center rounded-full bg-slate-700 p-2 text-white transition-colors hover:bg-slate-600"
            aria-label={`Pošalji email ${member.name}`}
            title={member.email}
          >
            <EmailIcon />
          </a>
        )}

        {member.linkedin && member.linkedin !== '#' && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#0070CD] p-2 text-white transition-colors hover:bg-[#005bb0]"
            aria-label={`${member.name} LinkedIn profil`}
          >
            <LinkedInIcon />
          </a>
        )}
      </div>
    </div>
  )

  const gridClass = GRID_COLS[columnsLg] || GRID_COLS[5]

  const renderStandardGrid = () => {
    if (loading) {
      return (
        <div className={`mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 ${gridClass}`}>
          {Array.from({ length: homepageOnly ? 3 : 5 }).map((_, index) => (
            <div key={`team-skeleton-${index}`} className="animate-pulse rounded-2xl bg-slate-100">
              <div className="h-64 rounded-t-2xl bg-slate-200" />
              <div className="space-y-3 px-6 py-6">
                <div className="mx-auto h-5 w-2/3 rounded bg-slate-200" />
                <div className="mx-auto h-4 w-1/2 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (displayedMembers.length === 0) {
      return (
        <div className="mb-12 rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center text-sm text-slate-500">
          Tim trenutno nije dostupan.
        </div>
      )
    }

    return (
      <div className={`mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 ${gridClass}`}>
        {displayedMembers.map((member) => renderMemberCard(member, member.id || member.name))}
      </div>
    )
  }

  const renderRowLayout = () => {
    if (loading) {
      return (
        <div className="mb-12 space-y-8">
          {[3, 4, 3].map((columns, index) => (
            <div
              key={`row-skeleton-${index}`}
              className={`mx-auto grid max-w-[900px] grid-cols-1 gap-8 md:grid-cols-2 ${GRID_COLS[columns] || GRID_COLS[3]}`}
            >
              {Array.from({ length: columns }).map((_, cardIndex) => (
                <div key={`row-skeleton-${index}-${cardIndex}`} className="animate-pulse rounded-2xl bg-slate-100">
                  <div className="h-64 rounded-t-2xl bg-slate-200" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    }

    if (!rowSections.length) {
      return (
        <div className="mb-12 rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center text-sm text-slate-500">
          Tim trenutno nije dostupan.
        </div>
      )
    }

    return (
      <div className="mb-12 space-y-8">
        {rowSections.map((row) => {
          const columns = row.columns_lg || 3
          const maxWidthClass = columns === 4 ? 'max-w-[1200px]' : 'max-w-[900px]'

          return (
            <div
              key={row.id}
              className={`mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 ${GRID_COLS[columns] || GRID_COLS[3]} ${maxWidthClass}`}
            >
              {row.members.map((member) => renderMemberCard(member, member.id || member.name))}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">{t('team.title')}</h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 md:text-lg">{t('team.subtitle')}</p>
        </div>

        {rowLayout ? renderRowLayout() : renderStandardGrid()}

        {showLearnMore && (
          <div className="text-center">
            <a
              href="/o-nama"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#005bb0] md:px-8 md:py-4 md:text-lg"
            >
              {t('team.learnMore')}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

const EmailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LinkedInIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default TeamSection
