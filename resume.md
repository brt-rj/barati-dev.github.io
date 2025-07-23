---
layout: default
title: Resume
permalink: /resume/
---

<div class="resume-header">
  <a href="{{ site.baseurl }}/assets/BM_resume.pdf" class="resume-download" download>Download PDF</a>
</div>

<div class="resume-container">
  {% capture resume_content %}
  {% include_relative assets/BM_resume.md %}
  {% endcapture %}
  {{ resume_content | markdownify }}
</div>
