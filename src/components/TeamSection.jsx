import { useLanguage } from '../contexts/LanguageContext'



const TeamSection = ({ maxMembers, showLearnMore = true, columnsLg = 5, memberRows }) => {
  const { t } = useLanguage()

  // Team members data
  const teamMembers = [
    {
      name: 'Simona Zavratnik',
      role: 'Direktorica',
      image: '/slike_team/simona_zavratnik_2.png',
      linkedin: '#',
      email: 'simona.zavratnik@armal.hr',
    },
    {
      name: 'Suzana Mahović',
      role: 'COO – operativni direktor',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'suzana.mahovic@armal.hr',
    },
    {
      name: 'Anja Križanić',
      role: 'Koordinator prodaje za RH',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'anja.krizanic@armal.hr',
    },
    {
      name: 'Aleksandar Franolić',
      role: 'Export menager',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'aleksandar.franolic@armal.hr',
    },
    {
      name: 'Miroslav Salopek',
      role: 'Terenski komercijalist',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'miroslav.salopek@armal.hr',
    },
    {
      name: 'Saša Čačić',
      role: 'Terenski komercijalist',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'sasa.cacic@armal.hr',
    },
    {
      name: 'Marko Čović',
      role: 'Terenski komercijalist',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'marko.covic@armal.hr',
    },
    {
      name: 'Sandra Miklec',
      role: 'Administrator u odjelu prodaje',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'sandra.miklec@armal.hr',
    },
    {
      name: 'Marko Hrgetić',
      role: 'Voditelj nabave',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'marko.hrgetic@armal.hr',
    },
    {
      name: 'Natalija Jović',
      role: 'Referent nabave',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'natalija.jovic@armal.hr',
    },
    {
      name: 'Marija Pršir',
      role: 'Administrator nabave',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'marija.prsir@armal.hr',
    },
    {
      name: 'Morena Sršen',
      role: 'Voditelj odjela postprodaje',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'morena.srsen@armal.hr',
    },
    {
      name: 'Mladen Luketić',
      role: 'Serviser i montažer',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
      email: 'mladen.luketic@armal.hr',
    },
  ]

  // Display members based on maxMembers prop
  // If maxMembers is not provided or is undefined, show all members
  const displayedMembers = maxMembers ? teamMembers.slice(0, maxMembers) : teamMembers

  const membersByName = new Map(teamMembers.map((member) => [member.name, member]))
  const hasCustomRows = Array.isArray(memberRows) && memberRows.length > 0

  const renderMemberCard = (member, indexKey) => (
    <div
      key={indexKey}
      className="group flex flex-col pb-6 items-center rounded-2xl bg-white p-0 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Image Container */}
      <div className="mb-4 h-64 w-full overflow-hidden rounded-t-2xl">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <h3 className="mb-2 text-xl font-bold text-slate-900">
        {member.name}
      </h3>

      {/* Role */}
      <p className="mb-4 text-sm text-slate-600">{member.role}</p>

      {/* Contact Buttons */}
      <div className="flex items-center gap-3">
        {/* Email Button */}
        <a
          href={`mailto:${member.email}`}
          className="inline-flex items-center justify-center rounded-full bg-slate-700 p-2 text-white transition-colors hover:bg-slate-600"
          aria-label={`Pošalji email ${member.name}`}
          title={member.email}
        >
          <EmailIcon />
        </a>

        {/* LinkedIn Button */}
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#0070CD] p-2 text-white transition-colors hover:bg-[#005bb0]"
          aria-label={`${member.name} LinkedIn profil`}
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  )

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {t('team.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 md:text-lg">
            {t('team.subtitle')}
          </p>
        </div>

        {hasCustomRows ? (
          <div className="mb-12 space-y-8">
            {memberRows.map((row, rowIndex) => {
              const columns = rowIndex === 1 ? 4 : 3
              const maxWidthClass = rowIndex === 1 ? 'max-w-[1200px]' : 'max-w-[900px]'
              const rowMembers = row
                .map((memberName) => membersByName.get(memberName))
                .filter(Boolean)

              return (
                <div
                  key={`team-row-${rowIndex}`}
                  className={`mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} ${maxWidthClass}`}
                >
                  {rowMembers.map((member) => renderMemberCard(member, member.name))}
                </div>
              )
            })}
          </div>
        ) : (
          /* Team Members Grid: 1 col mobile, 2 cols tablet, columnsLg na laptop+ (3 za Landing, 5 za O nama) */
          <div className={`mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 ${columnsLg === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-5'}`}>
            {displayedMembers.map((member) => renderMemberCard(member, member.name))}
          </div>
        )}

        {/* Learn More Button */}
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

// Email Icon Component
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

// LinkedIn Icon Component
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

