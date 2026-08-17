# Rock Paper Scissors (React + Vite)

A simple Rock Paper Scissors game built with React and Vite, with score tracking.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Push to Jenkins

1. Unzip this project and push it to a Git repository (GitHub/GitLab/Bitbucket, etc.):
   ```bash
   cd rps-react
   git init
   git add .
   git commit -m "Initial commit: Rock Paper Scissors React app"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. In Jenkins:
   - Create a new **Pipeline** job (or **Multibranch Pipeline**).
   - Point it to your Git repository.
   - Make sure a **NodeJS** tool is configured under
     `Manage Jenkins > Tools > NodeJS Installations` and named `NodeJS`
     (or update the `tools` block in the `Jenkinsfile` to match your setup).
   - Jenkins will automatically detect the included `Jenkinsfile` and run:
     - `npm install`
     - `npm test`
     - `npm run build`
     - archive the `dist/` build output as a build artifact
     - deploy the contents of `dist/` to the `DEPLOY_DIR` path set in the
       `Jenkinsfile` (defaults to `/var/www/html/rps-react` on the Jenkins
       agent — change this `environment { DEPLOY_DIR = ... }` value to match
       your server, e.g. your Nginx/Apache docroot)

3. Trigger a build — the built app will appear under **Build Artifacts** in
   Jenkins, and the live site will be updated at `DEPLOY_DIR`.

## Project structure

```
rps-react/
├── Jenkinsfile
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── App.css
└── public/
```
