
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
  graduation: <><path d="m2 9 10-5 10 5-10 5-10-5Z"/><path d="M6 11v5c4 3 8 3 12 0v-5M22 9v7"/></>,
  shield: <><path d="M12 2 20 6v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4Z"/><path d="m9 12 2 2 4-4"/></>,
  lock: <><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v3"/></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/></>,
  'eye-off': <><path d="M3 3 21 21M10.5 6.1A11 11 0 0 1 12 6c6.5 0 10 6 10 6a16 16 0 0 1-3.1 3.6M6.1 6.7C3.4 8.5 2 12 2 12s3.5 6 10 6c1.7 0 3.2-.4 4.5-1"/><path d="M10 10a3 3 0 0 0 4 4"/></>,
  packageSearch: <><path d="m4 6 8-4 8 4v7M4 6v12l8 4 2-1M4 6l8 4 8-4M12 10v8M8 14h3"/><circle cx="18" cy="18" r="4"/><path d="m21 21 2 2"/></>,
}

export default function Icon({ name, size = 20, className = '' }) {
  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.info}</svg>
}
