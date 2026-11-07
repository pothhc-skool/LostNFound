import React from 'react'

const paths = {
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="M18 6 6 18M6 6l12 12" /></>,
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.6"/><path d="m16 16 5 5"/></>,
  forms: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
  signin: <><path d="M13 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M3 12h13m-4-4 4 4-4 4"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/></>,
  arrow: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
  packageSearch: <><path d="m4 6 8-4 8 4v7M4 6v12l8 4 2-1M4 6l8 4 8-4M12 10v8M8 14h3"/><circle cx="18" cy="18" r="4"/><path d="m21 21 2 2"/></>,
}

export default function Icon({ name, size = 20, className = '' }) {
  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.info}</svg>
}
