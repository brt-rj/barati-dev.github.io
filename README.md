# Barati.dev

A personal portfolio and resume site for Bharathiraja Muthurajan, Data Platform and AI Engineer. Built with Jekyll, featuring project showcases, a downloadable resume, and automated PDF generation.

## Features

- **Personal Portfolio**: Landing page with profile, experience, education, and contact links.
- **Project Showcases**: Detailed markdown files for analytics, financial, and sales performance projects.
- **Resume**: 
  - Viewable as a web page (`resume.html`).
  - Downloadable as a PDF (`assets/BM_resume.pdf`), auto-generated from Markdown.
- **Automated PDF Generation**: 
  - Uses Jekyll to build the site and Puppeteer to generate a PDF from the rendered HTML.
  - Managed via GitHub Actions workflow (`.github/workflows/generate-barati-dev.yml`).

## Directory Structure

```
.
├── _config.yml                # Jekyll configuration
├── _includes/                 # Reusable HTML components (e.g., header)
├── _layouts/                  # Jekyll layouts (default, project)
├── assets/
│   ├── BM_resume.md           # Resume in Markdown
│   ├── BM_resume.pdf          # Auto-generated PDF resume
│   ├── css/style.scss         # Main stylesheet
│   ├── img/Bharathi.png       # Profile image
│   └── js/generate-pdf.js     # Puppeteer script for PDF generation
├── content/
│   ├── projects.md            # Project list
│   ├── project-*.md           # Individual project details
├── index.md                   # Main landing page
├── resume.html                # Resume web page
├── .github/workflows/
│   └── generate-barati-dev.yml # GitHub Actions workflow
└── CNAME                      # Custom domain config
```

## Resume PDF Generation

- The resume is written in Markdown (`assets/BM_resume.md`).
- On push, the GitHub Actions workflow:
  1. Builds the site with Jekyll.
  2. Runs `assets/js/generate-pdf.js` (Puppeteer) to create `assets/BM_resume.pdf` from the rendered HTML.
  3. Commits the updated PDF back to the repository.

## Local Development

1. **Install dependencies**:
   - Ruby, Bundler, Jekyll for site generation.
   - Node.js for Puppeteer (if you want to generate the PDF locally).

2. **Serve the site locally**:
   ```sh
   bundle install
   bundle exec jekyll serve
   ```

3. **Generate PDF locally** (optional):
   ```sh
   npm install puppeteer
   node assets/js/generate-pdf.js
   ```

## Deployment

- The site is designed for GitHub Pages.
- The workflow auto-generates and commits the latest resume PDF on each push.

## Contact

- [LinkedIn](https://www.linkedin.com/in/bharathirajam)
- [GitHub](https://github.com/brt-rj)
- [Email](mailto:barati_m@pm.me) 