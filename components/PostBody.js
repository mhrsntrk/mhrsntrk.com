import { useEffect, useRef } from 'react'
import markdownStyles from './markdown-styles.module.css'

export default function PostBody({ content }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pres = Array.from(container.querySelectorAll('pre'))
    pres.forEach((preEl) => {
      if (preEl.dataset.hasCopyButton === 'true') return

      // Ensure pre is positioned to anchor the button inside
      preEl.classList.add('relative')
      preEl.dataset.hasCopyButton = 'true'

      const btn = document.createElement('button')
      btn.type = 'button'
      btn.setAttribute('aria-label', 'Copy code to clipboard')
      btn.className = 'absolute top-2 right-2 z-10 px-2 py-1 text-xs text-gray-700 border border-gray-300 rounded-md bg-white/80 backdrop-blur hover:bg-gray-100 active:bg-gray-200 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800/70 dark:hover:bg-gray-700'
      btn.textContent = 'Copy'

      const getCodeText = () => {
        const code = preEl.querySelector('code')
        return code ? code.textContent : preEl.textContent || ''
      }

      const setLabel = (text) => {
        btn.textContent = text
        window.setTimeout(() => {
          btn.textContent = 'Copy'
        }, 1500)
      }

      btn.addEventListener('click', async () => {
        const text = getCodeText()
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text)
          } else {
            const ta = document.createElement('textarea')
            ta.value = text
            ta.style.position = 'fixed'
            ta.style.top = '-1000px'
            document.body.appendChild(ta)
            ta.focus()
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
          }
          setLabel('Copied!')
        } catch (e) {
          setLabel('Failed')
        }
      })

      preEl.appendChild(btn)
    })
  }, [content])

  return (
    <div className="max-w-2xl mx-auto" ref={containerRef}>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
