# Barati.dev

A personal portfolio and resume site for Bharathiraja Muthurajan, Data Platform and AI Engineer. Built with Jekyll, featuring project showcases, a downloadable resume, and automated PDF generation.

## Features

- **Personal Portfolio**: Landing page with profile, experience, education, and contact links.
- **Project Showcases**: Detailed markdown files for analytics, financial, and sales performance projects.
- **Resume**: 
  - Viewable as a web page (`resume.html`).
  - Downloadable as a PDF (`assets/BM_resume.pdf`), auto-generated from Markdown.
- **Automated PDF Generation**: 
  - Uses Jekyll to build the site and md-to-pdf to generate a PDF from the Markdown resume.
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
│   └── js/generate-pdf.js     # Puppeteer script for PDF generation (legacy)
├── content/
│   ├── projects.md            # Project list
│   ├── project-*.md           # Individual project details
├── index.md                   # Main landing page
├── resume.html                # Resume web page
├── .github/workflows/
│   └── generate-barati-dev.yml # GitHub Actions workflow
└── CNAME                      # Custom domain config
```

## Contact

- [LinkedIn](https://www.linkedin.com/in/bharathirajam)
- [GitHub](https://github.com/brt-rj)
- [Email](mailto:barati_m@pm.me) 