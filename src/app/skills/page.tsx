"use client"
import { Navigation } from "@/components/Navigation"

const skills = [
  {
    category: "Browser Automation",
    items: [
      { name: "Playwright", description: "Headless browser automation for web interactions", status: "active" },
      { name: "Stealth Browser", description: "Anti-detection browser with fingerprint masking", status: "active" },
    ]
  },
  {
    category: "CAPTCHA Solving",
    items: [
      { name: "Image CAPTCHA (YOLO)", description: "GPU-accelerated image classification for grid CAPTCHAs", status: "active" },
      { name: "Audio CAPTCHA (Whisper)", description: "Speech-to-text for audio challenges", status: "active" },
      { name: "Text CAPTCHA (Tesseract)", description: "OCR for text-based CAPTCHAs", status: "active" },
      { name: "Cloudflare Solver", description: "Behavioral simulation for Turnstile challenges", status: "experimental" },
    ]
  },
  {
    category: "Communication",
    items: [
      { name: "Discord Bridge", description: "Send/receive messages via Discord", status: "active" },
      { name: "Telegram Bridge", description: "Send/receive messages via Telegram", status: "active" },
    ]
  },
  {
    category: "File & Code Operations",
    items: [
      { name: "Read/Write Files", description: "Read, edit, and create files", status: "active" },
      { name: "Git Operations", description: "Commit, push, pull, create PRs", status: "active" },
      { name: "Code Search (Glob/Grep)", description: "Find files and search code patterns", status: "active" },
    ]
  },
  {
    category: "Web & APIs",
    items: [
      { name: "Web Search", description: "Search the internet for information", status: "active" },
      { name: "Web Fetch", description: "Retrieve and analyze web content", status: "active" },
      { name: "GitHub CLI", description: "Manage repos, issues, PRs via gh command", status: "active" },
    ]
  },
  {
    category: "Security Tools (WSL2)",
    items: [
      { name: "Nmap", description: "Network scanning and port discovery", status: "available" },
      { name: "Nikto", description: "Web vulnerability scanning", status: "available" },
      { name: "Ghidra", description: "Reverse engineering and binary analysis", status: "available" },
      { name: "Sysinternals Suite", description: "Windows process and system analysis", status: "available" },
    ]
  },
  {
    category: "AI & Media",
    items: [
      { name: "DALL-E 3", description: "Generate images from text prompts", status: "active" },
      { name: "Text-to-Speech", description: "Convert text to speech (multiple voices)", status: "active" },
      { name: "Cursor CLI", description: "Parallel AI coding assistant", status: "available" },
    ]
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Docker (WSL2)", description: "Container management and deployment", status: "available" },
      { name: "Vercel Deploy", description: "Deploy web apps to Vercel", status: "active" },
      { name: "Memory System", description: "Persistent memory for tracking tasks", status: "active" },
    ]
  },
]

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      <main className="p-6 pt-20">
        <h1 className="text-3xl font-bold text-white mb-2">Skills & Capabilities</h1>
        <p className="text-gray-400 mb-8">Tools and integrations available to TeleClaude</p>

        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((category) => (
            <div key={category.category} className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <h2 className="text-xl font-semibold text-white mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div key={item.name} className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ml-3 whitespace-nowrap ${
                      item.status === 'active' ? 'bg-green-900 text-green-300' :
                      item.status === 'experimental' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
