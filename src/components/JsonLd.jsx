import { useEffect } from 'react'

const JsonLd = ({ id, data }) => {
  useEffect(() => {
    if (!id || !data) return

    let script = document.querySelector(`script[data-jsonld-id="${id}"]`)
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-jsonld-id', id)
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(data)

    return () => {
      const mountedScript = document.querySelector(`script[data-jsonld-id="${id}"]`)
      mountedScript?.remove()
    }
  }, [id, data])

  return null
}

export default JsonLd
