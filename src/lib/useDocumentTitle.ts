import { useEffect } from 'react'

const SITE_TITLE = 'Data Mining & Data Warehouse'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE
  }, [title])
}
