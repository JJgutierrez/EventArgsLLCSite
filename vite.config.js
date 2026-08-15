import { resolve } from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        caseStudies: resolve(__dirname, 'case-studies.html'),
        caseStudyKnowledgeCopilot: resolve(__dirname, 'case-study-knowledge-copilot.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        engineeringInsights: resolve(__dirname, 'engineering-insights.html'),
        insightRag: resolve(__dirname, 'engineering-insights/designing-citation-grounded-rag-microsoft-365.html'),
        insightPilots: resolve(__dirname, 'engineering-insights/why-enterprise-rag-pilots-fail.html'),
        insightPrReview: resolve(__dirname, 'engineering-insights/ai-assisted-pr-review-azure-devops.html'),
      },
    },
  },
})
