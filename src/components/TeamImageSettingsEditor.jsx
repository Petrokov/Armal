import {
  DEFAULT_TEAM_IMAGE_SETTINGS,
  TEAM_IMAGE_BREAKPOINTS,
  TEAM_IMAGE_ZOOM_MAX,
  TEAM_IMAGE_ZOOM_MIN,
  normalizeTeamImageSettings,
} from '../lib/teamImageSettings'

const RangeField = ({ label, value, min, max, suffix = '', onChange }) => (
  <label className="mt-3 block">
    <span className="flex items-center justify-between text-xs font-semibold text-slate-600">
      <span>{label}</span>
      <span className="text-slate-900">
        {value}
        {suffix}
      </span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="mt-1 w-full accent-[#0070CD]"
    />
  </label>
)

const TeamImageSettingsEditor = ({ imageUrl, name, settings, onChange }) => {
  const value = normalizeTeamImageSettings(settings)

  const updateBreakpoint = (key, patch) => {
    onChange({ ...value, [key]: { ...value[key], ...patch } })
  }

  const applyToAll = (key) => {
    const source = value[key]
    onChange(
      TEAM_IMAGE_BREAKPOINTS.reduce((acc, breakpoint) => ({ ...acc, [breakpoint.key]: { ...source } }), {}),
    )
  }

  const resetBreakpoint = (key) => {
    onChange({ ...value, [key]: { ...DEFAULT_TEAM_IMAGE_SETTINGS[key] } })
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">Prikaz slike po ekranima</h2>
        {imageUrl && (
          <button
            type="button"
            onClick={() => onChange(DEFAULT_TEAM_IMAGE_SETTINGS)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Vrati sve na zadano
          </button>
        )}
      </div>
      <p className="mb-4 text-sm text-slate-600">
        Namjesti izrez slike (pomak lijevo/desno, gore/dolje i zoom) za svaku velicinu ekrana. Preview pokazuje kako ce
        slika izgledati u kartici na webu.
      </p>

      {!imageUrl ? (
        <div className="rounded-md border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
          Uploadaj sliku da bi mogao namjestiti prikaz po ekranima.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {TEAM_IMAGE_BREAKPOINTS.map((breakpoint) => {
            const current = value[breakpoint.key]

            return (
              <div key={breakpoint.key} className="rounded-md border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900">{breakpoint.label}</span>
                  <span className="text-xs text-slate-500">{breakpoint.hint}</span>
                </div>

                <div
                  className="mx-auto h-64 overflow-hidden rounded-md bg-slate-100"
                  style={{ width: breakpoint.previewWidth, maxWidth: '100%' }}
                >
                  <img
                    src={imageUrl}
                    alt={name || 'Preview'}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: `${current.x}% ${current.y}%`,
                      scale: String(current.zoom / 100),
                    }}
                    loading="lazy"
                  />
                </div>

                <RangeField
                  label="Pomak lijevo / desno"
                  value={current.x}
                  min={0}
                  max={100}
                  suffix="%"
                  onChange={(next) => updateBreakpoint(breakpoint.key, { x: next })}
                />
                <RangeField
                  label="Pomak gore / dolje"
                  value={current.y}
                  min={0}
                  max={100}
                  suffix="%"
                  onChange={(next) => updateBreakpoint(breakpoint.key, { y: next })}
                />
                <RangeField
                  label="Zoom"
                  value={current.zoom}
                  min={TEAM_IMAGE_ZOOM_MIN}
                  max={TEAM_IMAGE_ZOOM_MAX}
                  suffix="%"
                  onChange={(next) => updateBreakpoint(breakpoint.key, { zoom: next })}
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyToAll(breakpoint.key)}
                    className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Primijeni na sve ekrane
                  </button>
                  <button
                    type="button"
                    onClick={() => resetBreakpoint(breakpoint.key)}
                    className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-50"
                  >
                    Zadano
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TeamImageSettingsEditor
