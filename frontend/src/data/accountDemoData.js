/** Sample dashboard data ONLY. Replace with authenticated API results later. */
export const DEMO_ACCOUNT = {
  id: 'student-demo-01', name: 'Ava Kim', email: 'a.kim@student.farmingdale.edu', studentIdLast4: '2048',
}

export const REPORT_STAGES = [
  { id: 'reported', label: 'Reported' },
  { id: 'possible_match', label: 'Possible match' },
  { id: 'under_verification', label: 'Under verification' },
  { id: 'ready_for_pickup', label: 'Ready for pickup' },
  { id: 'returned', label: 'Returned' },
]

// AI scores are illustrative SAMPLE VALUES, NOT AI-produced results.
export const DEMO_REPORTS = [
  { id:'LF-101', title:'Black smartphone', category:'Electronics', type:'lost', location:'Student Union', reportedAt:'2026-10-18', description:'Black smartphone in a dark protective case.', status:'possible_match', archiveSemester:null, possibleMatches:[{id:'MATCH-01', matchScore:87, explanation:'Sample score only — not evaluated by AI.', item:{title:'Black smartphone',category:'Electronics',type:'found',location:'Student Union entrance',reportedAt:'2026-10-19',description:'Black smartphone in a protective case.'}, securityCheck:[
    { id:'screen-detail', prompt:'What image or content was visible on the screen?', answer:'a sunset photo' },
    { id:'damage-detail', prompt:'Describe a specific deformity or mark on the device.', answer:'small crack in the upper-left corner' },
    { id:'device-quirk', prompt:'What unusual behavior or quirk did the device have?', answer:'the volume-down button sticks' },
    { id:'case-detail', prompt:'What distinctive detail is on the case or an attached accessory?', answer:'a worn yellow star sticker' },
  ]}], claimPending:false },
  { id:'LF-102', title:'Calculus textbook', category:'Books', type:'lost', location:'Whitman Hall', reportedAt:'2026-10-17', description:'Calculus textbook with a blue bookmark.', status:'reported', archiveSemester:null, possibleMatches:[], claimPending:false },
  { id:'LF-103', title:'Student ID wallet', category:'Wallets & IDs', type:'found', location:'Campus Center', reportedAt:'2026-10-16', description:'Black wallet found near the campus center.', status:'under_verification', archiveSemester:null, possibleMatches:[], claimPending:true },
  { id:'LF-080', title:'Wireless headphones', category:'Electronics', type:'lost', location:'Library', reportedAt:'2026-09-12', description:'Wireless earbuds in black charging case.', status:'returned', archiveSemester:null, possibleMatches:[], claimPending:false },
  { id:'LF-044', title:'Blue backpack', category:'Bags', type:'lost', location:'Student Union', reportedAt:'2026-05-04', description:'Blue canvas backpack with a notebook.', status:'closed', archiveSemester:'Spring 2026', possibleMatches:[], claimPending:false },
]
