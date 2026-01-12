import { useLanguage } from '../contexts/LanguageContext'



const TeamSection = ({ maxMembers, showLearnMore = true }) => {
  const { t } = useLanguage()

  // Team members data
  const teamMembers = [
    {
      name: 'Simona Zavratnik',
      role: 'Direktorica',
      image: '/slike_team/simona_zavratnik_2.png',
      linkedin: '#',
    },
    {
      name: 'Suzana Mahović',
      role: 'COO – operativni direktor',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Anja Križanić',
      role: 'Koordinator prodaje za RH',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Aleksandar Franolić',
      role: 'Export menager',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Miroslav Salopek',
      role: 'Terenski komercijalist',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Saša Čačić',
      role: 'Terenski komercijalist',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Marko Čović',
      role: 'Terenski komercijalist',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Sandra Miklec',
      role: 'Administrator u odjelu prodaje',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Marko Hrgetić',
      role: 'Voditelj nabave',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Natalija Jović',
      role: 'Referent nabave',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Marija Pršir',
      role: 'Administrator nabave',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Morena Sršen',
      role: 'Voditelj odjela postprodaje',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
    {
      name: 'Mladen Luketić',
      role: 'Serviser i montažer',
      image: '/slike_team/anonimno.jpg',
      linkedin: '#',
    },
  ]

  // Display members based on maxMembers prop
  // If maxMembers is not provided or is undefined, show all members
  const displayedMembers = maxMembers ? teamMembers.slice(0, maxMembers) : teamMembers

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

        {/* Team Members Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedMembers.map((member, index) => (
            <div
              key={index}
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
          ))}
        </div>

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

