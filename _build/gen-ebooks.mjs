// ============================================================
// gen-ebooks.mjs — render src/content/ebooks/*.json into premium
// black-and-white PDFs in public/library/<slug>.pdf, using headless
// Chrome or Edge (no npm deps). Run: node _build/gen-ebooks.mjs
// ============================================================
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src", "content", "ebooks");
// PRIVATE — paid e-books are gated; PDFs must NOT live under public/.
const OUT = path.join(ROOT, "private", "library");

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// light inline markdown for **bold**, *italic*, `code`
const inline = (s) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  ].filter(Boolean);
  for (const c of candidates) {
    try {
      if (fs.existsSync(c)) return c;
    } catch {}
  }
  return null;
}

function buildHtml(book) {
  const chapters = (book.chapters || [])
    .map((c, ci) => {
      const sections = (c.sections || [])
        .map((s) => {
          const paras = (s.paragraphs || []).map((p) => `<p>${inline(p)}</p>`).join("\n");
          const bullets = s.bullets && s.bullets.length
            ? `<ul>${s.bullets.map((b) => `<li>${inline(b)}</li>`).join("")}</ul>`
            : "";
          return `<section class="sec"><h3>${esc(s.heading)}</h3>${paras}${bullets}</section>`;
        })
        .join("\n");
      return `<article class="chapter">
        <div class="ch-head">
          <span class="ch-num">Chapter ${String(ci + 1).padStart(2, "0")}</span>
          <h2>${esc(c.title)}</h2>
          ${c.intro ? `<p class="ch-intro">${inline(c.intro)}</p>` : ""}
        </div>
        ${sections}
      </article>`;
    })
    .join("\n");

  const takeaways = (book.takeaways || []).length
    ? `<article class="chapter takeaways">
        <div class="ch-head"><span class="ch-num">In closing</span><h2>Key takeaways</h2></div>
        <ul class="big">${book.takeaways.map((t) => `<li>${inline(t)}</li>`).join("")}</ul>
      </article>`
    : "";

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
  @page { size: A4; margin: 22mm 20mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { font-family: 'Inter', -apple-system, system-ui, sans-serif; color: #141414; line-height: 1.65; font-size: 10.6pt; }
  .mono { font-family: 'JetBrains Mono', monospace; }
  h1,h2,h3 { font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.02em; }
  code { font-family: 'JetBrains Mono', monospace; background:#f4f4f4; border:1px solid #e6e6e6; border-radius:4px; padding:0 4px; font-size:0.86em; }
  strong { font-weight: 600; }

  /* Cover */
  .cover { height: 247mm; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always; position: relative; overflow: hidden; }
  .cover .grid { position:absolute; inset:-22mm -20mm; background-image: linear-gradient(to right, rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.05) 1px, transparent 1px); background-size: 16mm 16mm; }
  .cover-top { position: relative; display:flex; align-items:center; justify-content: space-between; }
  .logo { width: 13mm; height: 13mm; background:#141414; color:#fff; border-radius:3mm; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-weight:700; font-size:11pt; }
  .kicker { font-family:'JetBrains Mono',monospace; font-size:8pt; letter-spacing:.28em; text-transform:uppercase; color:#737373; }
  .cover-mid { position: relative; }
  .cover-mid .eyebrow { font-family:'JetBrains Mono',monospace; font-size:9pt; letter-spacing:.24em; text-transform:uppercase; color:#737373; }
  .cover-mid h1 { font-size: 40pt; line-height: 1.02; margin: 6mm 0 0; font-weight: 700; }
  .cover-mid .sub { font-size: 15pt; color:#525252; margin-top: 5mm; font-family:'Space Grotesk',sans-serif; }
  .cover-mid .rule { width: 28mm; height: 2px; background:#141414; margin: 8mm 0; }
  .cover-mid .summary { font-size: 11pt; color:#3d3d3d; max-width: 130mm; }
  .cover-bottom { position: relative; display:flex; justify-content: space-between; align-items:flex-end; font-family:'JetBrains Mono',monospace; font-size:8.5pt; letter-spacing:.12em; text-transform:uppercase; color:#525252; }

  /* Contents */
  .toc { page-break-after: always; }
  .toc h2 { font-size: 20pt; margin: 0 0 8mm; }
  .toc ol { list-style: none; counter-reset: c; padding: 0; margin: 0; }
  .toc li { counter-increment: c; display:flex; align-items: baseline; gap: 5mm; padding: 3mm 0; border-bottom: 1px solid #e6e6e6; }
  .toc li::before { content: counter(c, decimal-leading-zero); font-family:'JetBrains Mono',monospace; color:#a3a3a3; font-size:9pt; }
  .toc .t { font-family:'Space Grotesk',sans-serif; font-weight:600; font-size: 12pt; }

  /* Chapters */
  .chapter { page-break-before: always; }
  .ch-head { border-bottom: 2px solid #141414; padding-bottom: 6mm; margin-bottom: 7mm; }
  .ch-num { font-family:'JetBrains Mono',monospace; font-size:8.5pt; letter-spacing:.2em; text-transform:uppercase; color:#737373; }
  .ch-head h2 { font-size: 25pt; line-height: 1.08; margin: 4mm 0 0; font-weight: 700; }
  .ch-intro { font-family:'Space Grotesk',sans-serif; font-size: 12.5pt; color:#525252; margin: 5mm 0 0; line-height: 1.5; }
  .sec { margin-top: 7mm; }
  .sec h3 { font-size: 13.5pt; margin: 0 0 2mm; font-weight: 600; }
  .sec p { margin: 0 0 3.2mm; }
  .sec ul, .big { margin: 3mm 0; padding-left: 0; list-style: none; }
  .sec li { position: relative; padding-left: 6mm; margin-bottom: 2mm; }
  .sec li::before { content:""; position:absolute; left:0; top: 2.4mm; width: 2mm; height: 2mm; background:#141414; border-radius: 50%; }
  .takeaways .big li { position: relative; padding-left: 8mm; margin-bottom: 4mm; font-size: 12pt; font-family:'Space Grotesk',sans-serif; font-weight: 500; }
  .takeaways .big li::before { content:"→"; position:absolute; left:0; top:0; font-weight:700; }

  /* Back */
  .back { page-break-before: always; height: 247mm; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }
  .back .logo { width: 16mm; height:16mm; font-size:13pt; }
  .back h2 { font-size: 22pt; margin: 8mm 0 3mm; }
  .back p { color:#525252; max-width: 120mm; }
  .back .contact { margin-top: 8mm; font-family:'JetBrains Mono',monospace; font-size:9pt; letter-spacing:.1em; text-transform:uppercase; color:#737373; line-height: 2; }
</style></head>
<body>
  <div class="cover">
    <div class="grid"></div>
    <div class="cover-top">
      <div class="logo">JST</div>
      <div class="kicker">J Supreme Tech · E-Book</div>
    </div>
    <div class="cover-mid">
      <div class="eyebrow">${esc(book.category || "Field guide")}</div>
      <h1>${esc(book.title)}</h1>
      <div class="sub">${esc(book.subtitle || "")}</div>
      <div class="rule"></div>
      <div class="summary">${esc(book.summary || "")}</div>
    </div>
    <div class="cover-bottom">
      <span>${esc(book.author || "J Supreme Tech")}</span>
      <span>jsupremetech.online</span>
    </div>
  </div>

  <div class="toc">
    <h2>Contents</h2>
    <ol>
      ${(book.chapters || []).map((c) => `<li><span class="t">${esc(c.title)}</span></li>`).join("\n")}
      ${book.takeaways && book.takeaways.length ? '<li><span class="t">Key takeaways</span></li>' : ""}
    </ol>
  </div>

  ${chapters}
  ${takeaways}

  <div class="back">
    <div class="logo">JST</div>
    <h2>Build with us.</h2>
    <p>J Supreme Tech designs and ships websites, apps, CRMs and full digital systems — from Jamaica to the world. If this was useful, the next step is a conversation.</p>
    <div class="contact">
      WhatsApp (658) 218-2282 · global.jsuprememarketing@gmail.com<br/>
      jsupremetech.online · Systems That Work. Growth That Lasts.
    </div>
  </div>
</body></html>`;
}

function main() {
  const browser = findBrowser();
  if (!browser) {
    console.error("No Chrome/Edge found. Set CHROME_PATH or install a Chromium browser.");
    process.exit(2);
  }
  if (!fs.existsSync(SRC)) {
    console.error("No ebooks dir:", SRC);
    process.exit(2);
  }
  fs.mkdirSync(OUT, { recursive: true });
  const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".json"));
  if (!files.length) {
    console.error("No ebook JSON files found in", SRC);
    process.exit(2);
  }

  let ok = 0;
  for (const f of files) {
    let book;
    try {
      book = JSON.parse(fs.readFileSync(path.join(SRC, f), "utf8"));
    } catch (e) {
      console.error("SKIP (bad json)", f, e.message);
      continue;
    }
    const slug = book.slug || path.basename(f, ".json");
    const html = buildHtml(book);
    const tmp = path.join(os.tmpdir(), `jst-ebook-${slug}.html`);
    fs.writeFileSync(tmp, html, "utf8");
    const outPdf = path.join(OUT, `${slug}.pdf`);
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      `--print-to-pdf=${outPdf}`,
      "--virtual-time-budget=12000",
      `file:///${tmp.replace(/\\/g, "/")}`,
    ];
    const res = spawnSync(browser, args, { stdio: "ignore", timeout: 90000 });
    if (res.status === 0 && fs.existsSync(outPdf)) {
      const kb = Math.round(fs.statSync(outPdf).size / 1024);
      console.log(`✓ ${slug}.pdf (${kb} KB)`);
      ok++;
    } else {
      console.error(`✗ ${slug} — browser exit ${res.status} ${res.error || ""}`);
    }
  }
  console.log(`\nDone: ${ok}/${files.length} PDFs in private/library/`);
}

main();
