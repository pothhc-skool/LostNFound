## L&F Frontend — React Application

The FSC Lost & Found frontend is developed using **React, Vite, JavaScript, HTML, and CSS**.

The application provides a responsive interface for students and staff to navigate the Lost & Found system.

### Current Features
- Responsive homepage based on the team's Figma designs
- Animated, collapsible navigation sidebar
- FSC Lost & Found branding and logos
- Forms and Sign In navigation
- Demo possible-matches review with sample lost/found report details
- Reusable React components and CSS styles
- Placeholder pages for features under development

### Prerequisites

Before running the application, install:

- [Git](https://git-scm.com/downloads)
- [Node.js LTS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/pothhc-skool/LostNFound.git
cd LostNFound
```

### 2. Switch to the Frontend Branch

The latest React homepage is currently on the `feature/homepage-react` branch.

```bash
git fetch origin
git switch --track origin/feature/homepage-react
```

If you already have this branch locally:

```bash
git switch feature/homepage-react
```

### 3. Navigate to the Frontend

```bash
cd frontend
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal, typically:

http://localhost:5173/

The FSC Lost & Found homepage should now appear in your browser.

The **Possible Matches (Demo)** view displays fixture data only. Its short-answer security check compares responses locally against sample details; responses are not saved or sent anywhere, and the check does not verify ownership. Because this is a frontend-only demo, its sample answer keys are not secure and can be inspected in the source/bundle. A production verification flow must keep private answer keys on the server and use staff review. It does not run AI matching, connect to a backend, or represent real item reports.

### 6. Stop the Server

Press **Control + C** in the terminal.

### 7. Run the Application Again

From the repository root:

```bash
cd frontend
npm run dev
```

### 8. Get the Latest Changes

From the repository root:

```bash
git switch feature/homepage-react
git pull origin feature/homepage-react
```

Run `npm install` again if dependencies have changed.

### Windows PowerShell Troubleshooting

If PowerShell blocks npm scripts, use:

```powershell
npm.cmd install
npm.cmd run dev
```

### Project Folder Structure

```text
LostNFound/
├── frontend/
│   ├── public/
│   │   └── images/
│   │       └── branding/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── index.html
└── README.md
```

### Development Notes

- Each webpage will be developed as an individual React component.
- Shared navigation and visual elements will be stored in `components/`.
- Reusable CSS variables will help maintain consistent branding.
- Future pages will follow the existing Figma designs.
- The frontend currently provides a demonstration interface; backend functionality and authentication will be integrated separately.

### GitHub Repository

https://github.com/pothhc-skool/LostNFound

**Current frontend branch:** `feature/homepage-react`