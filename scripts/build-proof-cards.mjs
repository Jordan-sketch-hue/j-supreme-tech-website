import { spawn } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'public', 'products', 'mockups', 'proof');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TOKEN = 'TkL3JoMooW2ihHLCWcaXV0eWW6c5Xr41C-Ri_uU4bxw';
if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });

const GF = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"/>';

function base(a) {
  return `*{margin:0;padding:0;box-sizing:border-box}html,body{width:1280px;height:720px;overflow:hidden;background:#0d0d0d;font-family:'Inter',sans-serif}body{position:relative}.bg-glow{position:absolute;width:500px;height:500px;border-radius:50%;background:${a};opacity:.07;filter:blur(100px);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}.label{font-size:10px;font-weight:700;letter-spacing:.18em;color:${a};text-transform:uppercase;margin-bottom:8px}.accent{color:${a}}`;
}

const proofs = [
  {
    id: 'n2gDhx5QrvKJSVWbGyRJIw==', slug: 'founders-launch-playbook', accent: '#FF3B3B',
    build(a) {
      const chapters = [
        ['01','Brand Identity from Scratch','No designer required'],
        ['02','Finding Your First 10 Clients','Outreach scripts included'],
        ['03','Pricing with Confidence','Value-based pricing models'],
        ['04','Digital Infrastructure','Website, email and payments'],
        ['05','90-Day Revenue Roadmap','Weekly milestones and KPIs'],
        ['06','Content and Social Strategy','Post templates included'],
        ['07','Scale and Systemize','SOPs and hiring framework'],
      ];
      const chHTML = chapters.map(([n,t,s]) =>
        `<div class="chapter"><div class="ch-num">${n}</div><div><div class="ch-title">${t}</div><div class="ch-sub">${s}</div></div></div>`
      ).join('');
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${GF}<style>${base(a)}
body{display:grid;grid-template-columns:1fr 1fr;height:720px}
.left{padding:56px 48px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid #1a1a1a}
.right{padding:56px 48px;display:flex;flex-direction:column;justify-content:center}
h2{font-size:36px;font-weight:900;color:#fff;line-height:1.1;margin-bottom:12px}
.sub{font-size:14px;color:rgba(255,255,255,.4);margin-bottom:36px}
.chapter{display:flex;align-items:flex-start;gap:12px;margin-bottom:18px}
.ch-num{width:28px;height:28px;border-radius:4px;background:${a};color:#000;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ch-title{font-size:13px;font-weight:600;color:#fff;line-height:1.3}
.ch-sub{font-size:11px;color:rgba(255,255,255,.35);margin-top:2px}
.stat-row{display:flex;gap:32px;margin-top:36px}
.stat-n{font-size:40px;font-weight:900;color:${a};line-height:1}
.stat-l{font-size:11px;color:rgba(255,255,255,.35);letter-spacing:.08em;margin-top:4px}
.tag{display:inline-block;border:1px solid ${a};color:${a};font-size:10px;font-weight:700;letter-spacing:.15em;padding:4px 14px;border-radius:2px;margin-bottom:28px}
</style></head><body><div class="bg-glow"></div>
<div class="left">
  <div class="tag">INSIDE THE GUIDE</div>
  <h2>60-Page<br/><span class="accent">Launch System</span></h2>
  <div class="sub">Everything a first-time founder needs to go from idea to paying clients.</div>
  <div class="stat-row">
    <div><div class="stat-n">60</div><div class="stat-l">PAGES</div></div>
    <div><div class="stat-n">7</div><div class="stat-l">CHAPTERS</div></div>
    <div><div class="stat-n">90</div><div class="stat-l">DAY PLAN</div></div>
  </div>
</div>
<div class="right">
  <div class="label">Chapter Overview</div>
  ${chHTML}
</div></body></html>`;
    }
  },
  {
    id: 'GmCDJvvmitjavPGIqUznSQ==', slug: 'nextjs-pro-starter-guide', accent: '#00B4D8',
    build(a) {
      const files = [
        ['folder','/ src'],['indent','/ app'],['indent','  layout.tsx'],['indent','  page.tsx'],['indent','  / (auth)'],
        ['folder','/ components'],['indent','ui/Button.tsx'],['indent','ui/Modal.tsx'],
        ['folder','/ lib'],['indent','supabase.ts'],['indent','auth.ts'],['indent','utils.ts'],
        ['folder','/ hooks'],['indent','useUser.ts'],
        ['','middleware.ts'],['','.env.example'],['','tailwind.config.ts'],
      ];
      const badges = ['Next.js 15','Tailwind 4','Supabase','TypeScript','Auth Ready','SEO Meta','Dark Mode','Vercel Deploy','MDX Blog','API Routes'];
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${GF}<style>${base(a)}
body{display:grid;grid-template-columns:260px 1fr;height:720px}
.sidebar{background:#0a0a0a;border-right:1px solid #1a1a1a;padding:32px 20px;overflow:hidden}
.main{padding:40px 48px}
.file{padding:4px 0;font-size:11px;color:rgba(255,255,255,.45);font-family:'JetBrains Mono',monospace}
.file.folder{color:${a};font-weight:700;margin-top:10px}
.file.indent{padding-left:18px}
.code-block{background:#111;border:1px solid #1e1e1e;border-radius:6px;padding:18px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.7;margin-bottom:20px}
.kw{color:#7B2FFF}.fn{color:${a}}.str{color:#FFD700}.cm{color:#444}
.tag2{display:inline-block;border:1px solid ${a};color:${a};font-size:10px;font-weight:700;letter-spacing:.15em;padding:3px 12px;border-radius:2px;margin-bottom:16px}
h3{font-size:20px;font-weight:800;color:#fff;margin-bottom:16px}
.badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}
.badge{background:#1a1a1a;border:1px solid #222;color:rgba(255,255,255,.5);font-size:10px;font-weight:600;padding:4px 12px;border-radius:20px}
</style></head><body><div class="bg-glow"></div>
<div class="sidebar">
  <div class="label" style="margin-bottom:14px">File Structure</div>
  ${files.map(([c,t]) => `<div class="file ${c}">${t}</div>`).join('')}
</div>
<div class="main">
  <div class="tag2">INCLUDED CODE</div>
  <h3>Production-Ready <span class="accent">Boilerplate</span></h3>
  <div class="code-block">
<span class="cm">// Auth middleware - ready to use</span>
<span class="kw">export async function</span> <span class="fn">middleware</span>(req) {
  <span class="kw">const</span> { data: { session } } = <span class="kw">await</span> supabase
    .auth.<span class="fn">getSession</span>();
  <span class="kw">if</span> (!session) <span class="fn">redirect</span>(<span class="str">'/login'</span>);
}</div>
  <div class="badges">${badges.map(b => `<div class="badge">${b}</div>`).join('')}</div>
</div></body></html>`;
    }
  },
  {
    id: 'KWTIknjB8s6Ch0ukdCChGQ==', slug: 'courier-app-guide', accent: '#00C853',
    build(a) {
      const features = ['Real-time package tracking and status updates','Driver mobile app with route optimization','Customer SMS and email notifications','Admin dashboard with analytics','Stripe and WiPay payment integration','Multi-branch and zone management','Proof of delivery with photo upload','API-ready for third-party integrations'];
      const portals = [['Admin Portal','Full business management and reporting'],['Driver App','Mobile-first dispatch and navigation'],['Customer Portal','Track orders and manage deliveries'],['Operations Hub','Branch and zone configuration']];
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${GF}<style>${base(a)}
body{display:grid;grid-template-columns:1fr 1fr;height:720px}
.left{padding:52px 48px;border-right:1px solid #1a1a1a;display:flex;flex-direction:column;justify-content:center}
.right{padding:52px 48px;display:flex;flex-direction:column;justify-content:center}
.tag2{display:inline-block;border:1px solid ${a};color:${a};font-size:10px;font-weight:700;letter-spacing:.15em;padding:4px 14px;border-radius:2px;margin-bottom:24px}
h2{font-size:34px;font-weight:900;color:#fff;margin-bottom:10px;line-height:1.1}
.sub2{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:28px}
.feature{display:flex;align-items:center;gap:12px;margin-bottom:13px}
.dot{width:5px;height:5px;border-radius:50%;background:${a};flex-shrink:0}
.feat-text{font-size:13px;color:rgba(255,255,255,.65)}
.portal{background:#111;border:1px solid #1e1e1e;border-radius:8px;padding:16px 18px;margin-bottom:12px}
.portal-name{font-size:12px;font-weight:700;color:${a};letter-spacing:.08em;margin-bottom:5px}
.portal-desc{font-size:12px;color:rgba(255,255,255,.35)}
</style></head><body><div class="bg-glow"></div>
<div class="left">
  <div class="tag2">PLATFORM FEATURES</div>
  <h2>Full Logistics<br/><span class="accent">Platform</span></h2>
  <div class="sub2">Built for courier and delivery businesses in the Caribbean and globally.</div>
  ${features.map(f => `<div class="feature"><div class="dot"></div><div class="feat-text">${f}</div></div>`).join('')}
</div>
<div class="right">
  <div class="label" style="margin-bottom:18px">4 Portal System</div>
  ${portals.map(([n,d]) => `<div class="portal"><div class="portal-name">${n}</div><div class="portal-desc">${d}</div></div>`).join('')}
</div></body></html>`;
    }
  },
  {
    id: 'bfJaJi3tpEXBzBTQ72oVtA==', slug: 'booking-app-guide', accent: '#FF3B3B',
    build(a) {
      const industries = [['Salons and Barbershops','Chair booking with staff selection'],['Gyms and Fitness','Class scheduling and memberships'],['Medical Clinics','Patient intake and appointments'],['Auto Services','Bay booking and service tracking'],['Pet Services','Grooming and vet scheduling']];
      const features = ['Real-time availability calendar','Automated email and SMS reminders','Online payment processing','Staff and resource management','Customer booking history','Admin dashboard and reporting','Mobile-responsive design','Commercial use license'];
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${GF}<style>${base(a)}
body{display:grid;grid-template-columns:1fr 1fr;height:720px}
.left{padding:52px 48px;border-right:1px solid #1a1a1a;display:flex;flex-direction:column;justify-content:center}
.right{padding:52px 48px;display:flex;flex-direction:column;justify-content:center}
.tag2{display:inline-block;border:1px solid ${a};color:${a};font-size:10px;font-weight:700;letter-spacing:.15em;padding:4px 14px;border-radius:2px;margin-bottom:24px}
h2{font-size:34px;font-weight:900;color:#fff;margin-bottom:10px;line-height:1.1}
.sub2{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:28px}
.industry{background:#111;border:1px solid #1e1e1e;border-radius:6px;padding:11px 16px;margin-bottom:10px}
.ind-name{font-size:13px;font-weight:600;color:#fff;margin-bottom:3px}
.ind-desc{font-size:11px;color:rgba(255,255,255,.35)}
.feature{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.dot{width:5px;height:5px;border-radius:50%;background:${a};flex-shrink:0}
.feat-text{font-size:13px;color:rgba(255,255,255,.65)}
</style></head><body><div class="bg-glow"></div>
<div class="left">
  <div class="tag2">WORKS FOR ANY INDUSTRY</div>
  <h2>9 Business<br/><span class="accent">Types Included</span></h2>
  <div class="sub2">One codebase, fully configurable for any appointment-based service.</div>
  ${industries.map(([n,d]) => `<div class="industry"><div class="ind-name">${n}</div><div class="ind-desc">${d}</div></div>`).join('')}
</div>
<div class="right">
  <div class="label" style="margin-bottom:18px">Built-in Features</div>
  ${features.map(f => `<div class="feature"><div class="dot"></div><div class="feat-text">${f}</div></div>`).join('')}
</div></body></html>`;
    }
  },
  {
    id: 'BTTyAdSwQbqLTfRfcr9D7w==', slug: 'supreme-suite-guide', accent: '#7B2FFF',
    build(a) {
      const systems = [['01','CRM','Contact and lead management'],['02','POS','Point of sale and inventory'],['03','Invoicing','Quotes, invoices and payments'],['04','Bookings','Appointment scheduling'],['05','Project Mgr','Tasks and team collaboration'],['06','Client Portal','White-label client access'],['07','Email/SMS','Marketing automation'],['08','Analytics','Revenue and growth reporting'],['09','Doc Manager','File storage and contracts'],['10','Review System','Google and social reviews'],['11','Employee Portal','HR and payroll tools'],['12','Courier Module','Dispatch and tracking'],['13','Academy','Team training and LMS']];
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${GF}<style>${base(a)}
body{padding:44px 52px;display:flex;flex-direction:column;height:720px}
.tag2{display:inline-block;border:1px solid ${a};color:${a};font-size:10px;font-weight:700;letter-spacing:.15em;padding:4px 14px;border-radius:2px;margin-bottom:18px;align-self:flex-start}
h2{font-size:30px;font-weight:900;color:#fff;margin-bottom:6px}
.sub2{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:24px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;flex:1}
.sys{background:#111;border:1px solid #1e1e1e;border-radius:8px;padding:14px;display:flex;flex-direction:column;gap:5px}
.sys-num{font-size:10px;font-weight:700;color:${a};letter-spacing:.1em}
.sys-name{font-size:12px;font-weight:700;color:#fff;line-height:1.2}
.sys-desc{font-size:10px;color:rgba(255,255,255,.3);line-height:1.4}
</style></head><body><div class="bg-glow"></div>
<div class="tag2">13 SYSTEMS INCLUDED</div>
<h2>Everything Your Business <span class="accent">Needs to Operate</span></h2>
<div class="sub2">One login. One platform. Enterprise-grade tools for Caribbean SMEs.</div>
<div class="grid">
  ${systems.map(([n,name,desc]) => `<div class="sys"><div class="sys-num">${n}</div><div class="sys-name">${name}</div><div class="sys-desc">${desc}</div></div>`).join('')}
</div></body></html>`;
    }
  },
  {
    id: 'BRtdZQcP5hdGPLs4y6r15w==', slug: 'done-for-you-website-guide', accent: '#00B4D8',
    build(a) {
      const steps = [['1','Discovery Call','Goals, brand, and content brief'],['2','Design and Build','Custom Next.js site, your domain'],['3','Review and Revise','2 rounds of revisions included'],['4','Deploy and Train','Goes live plus you get the controls'],['5','30-Day Support','Post-launch fixes and guidance']];
      const includes = ['Custom Next.js website (not a template)','Mobile-responsive design','SEO setup and meta tags','Contact form and lead capture','Google Analytics integration','Full source code ownership','Vercel deployment and hosting setup','Training session (60 min)','30-day post-launch support'];
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${GF}<style>${base(a)}
body{display:grid;grid-template-columns:1fr 1fr;height:720px}
.left{padding:52px 48px;border-right:1px solid #1a1a1a;display:flex;flex-direction:column;justify-content:center}
.right{padding:52px 48px;display:flex;flex-direction:column;justify-content:center}
.tag2{display:inline-block;border:1px solid ${a};color:${a};font-size:10px;font-weight:700;letter-spacing:.15em;padding:4px 14px;border-radius:2px;margin-bottom:24px}
h2{font-size:34px;font-weight:900;color:#fff;margin-bottom:10px;line-height:1.1}
.sub2{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:28px}
.step{display:flex;gap:16px;margin-bottom:18px;align-items:flex-start}
.step-n{width:30px;height:30px;border-radius:50%;border:2px solid ${a};color:${a};font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.step-title{font-size:13px;font-weight:700;color:#fff;margin-bottom:3px}
.step-desc{font-size:12px;color:rgba(255,255,255,.35)}
.include{display:flex;align-items:center;gap:10px;margin-bottom:11px}
.check{color:${a};font-size:13px;font-weight:800;flex-shrink:0}
.inc-text{font-size:13px;color:rgba(255,255,255,.65)}
</style></head><body><div class="bg-glow"></div>
<div class="left">
  <div class="tag2">THE PROCESS</div>
  <h2>Live in<br/><span class="accent">5-7 Business Days</span></h2>
  <div class="sub2">We handle everything — design, copy, dev, and deployment.</div>
  ${steps.map(([n,t,d]) => `<div class="step"><div class="step-n">${n}</div><div><div class="step-title">${t}</div><div class="step-desc">${d}</div></div></div>`).join('')}
</div>
<div class="right">
  <div class="label" style="margin-bottom:18px">What Is Included</div>
  ${includes.map(i => `<div class="include"><div class="check">+</div><div class="inc-text">${i}</div></div>`).join('')}
</div></body></html>`;
    }
  },
  {
    id: 'CdsTP-jg2ZekrRKEnmawPw==', slug: '90-day-content-calendar', accent: '#FFD700',
    build(a) {
      const days = [['1','Reel','Hook: Most businesses fail because...'],['2','Story','Poll: What is your biggest challenge?'],['3','Carousel','5 Signs You Need a Website'],['4','',''],['5','Post','Client Win: 3x revenue in 60 days'],['6','Story','Behind the scenes: Our process'],['7','Reel','Tutorial: How to set up Google Business'],['8','Post','Quote: Your brand is a promise...'],['9','Carousel','Top 5 tools we use daily'],['10','Story','Q and A: Ask us anything'],['11','Reel','Before and After: Client website'],['12','',''],['13','Post','Case Study: 0 to 100 clients'],['14','Story','Day in the life of our team']];
      const platforms = ['Instagram','Facebook','TikTok','LinkedIn','Twitter / X'];
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${GF}<style>${base(a)}
body{padding:40px 52px;display:flex;flex-direction:column;height:720px}
.top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px}
.tag2{display:inline-block;border:1px solid ${a};color:${a};font-size:10px;font-weight:700;letter-spacing:.15em;padding:4px 14px;border-radius:2px}
.stats{display:flex;gap:28px}
.stat-n{font-size:30px;font-weight:900;color:${a};line-height:1}
.stat-l{font-size:9px;color:rgba(255,255,255,.3);letter-spacing:.08em;margin-top:2px}
h2{font-size:28px;font-weight:900;color:#fff;margin-bottom:5px}
.sub2{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:20px}
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;flex:1}
.day{background:#111;border:1px solid #1e1e1e;border-radius:6px;padding:9px 8px}
.day.hl{border-color:${a};background:#141000}
.day-n{font-size:10px;font-weight:700;color:rgba(255,255,255,.2);margin-bottom:4px}
.day-type{font-size:9px;font-weight:700;letter-spacing:.08em;color:${a};text-transform:uppercase;margin-bottom:3px}
.day-copy{font-size:9px;color:rgba(255,255,255,.35);line-height:1.3}
.platforms{display:flex;gap:8px;margin-top:14px}
.plat{background:#1a1a1a;border:1px solid #222;color:rgba(255,255,255,.4);font-size:9px;font-weight:600;padding:3px 10px;border-radius:10px}
</style></head><body><div class="bg-glow"></div>
<div class="top">
  <div>
    <div class="tag2">CONTENT SYSTEM</div>
    <h2 style="margin-top:14px">90 Days of <span class="accent">Ready-to-Post</span> Content</h2>
    <div class="sub2">Instagram, Facebook, TikTok, LinkedIn — fully mapped out.</div>
  </div>
  <div class="stats">
    <div><div class="stat-n">150+</div><div class="stat-l">CAPTIONS</div></div>
    <div><div class="stat-n">90</div><div class="stat-l">DAYS</div></div>
    <div><div class="stat-n">4</div><div class="stat-l">PLATFORMS</div></div>
  </div>
</div>
<div class="cal">
  ${days.map(([n,type,copy]) => `<div class="day ${type ? 'hl' : ''}"><div class="day-n">Day ${n}</div>${type ? `<div class="day-type">${type}</div><div class="day-copy">${copy}</div>` : ''}</div>`).join('')}
</div>
<div class="platforms">${platforms.map(p => `<div class="plat">${p}</div>`).join('')}</div>
</body></html>`;
    }
  },
  {
    id: 'mNZ5b2dIKqHkYiz7K9_NDg==', slug: 'brand-starter-kit', accent: '#7B2FFF',
    build(a) {
      const deliverables = ['Primary logo (horizontal and stacked)','Icon / monogram mark','Color palette with HEX, RGB and CMYK','Typography system and usage guide','Business card design','Letterhead template','Social media profile and cover images','Brand usage guidelines (PDF)'];
      const swatches = ['#7B2FFF','#5B1FDF','#ffffff','#0d0d0d','#F0F0F0'];
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${GF}<style>${base(a)}
body{display:grid;grid-template-columns:1fr 1fr;height:720px}
.left{padding:52px 48px;border-right:1px solid #1a1a1a;display:flex;flex-direction:column;justify-content:center}
.right{padding:52px 48px;display:flex;flex-direction:column;justify-content:center}
.tag2{display:inline-block;border:1px solid ${a};color:${a};font-size:10px;font-weight:700;letter-spacing:.15em;padding:4px 14px;border-radius:2px;margin-bottom:24px}
h2{font-size:34px;font-weight:900;color:#fff;margin-bottom:10px;line-height:1.1}
.sub2{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:24px}
.palette{display:flex;gap:8px;margin-bottom:28px}
.swatch{height:44px;border-radius:6px;flex:1;border:1px solid #222}
.fd-label{font-size:10px;color:rgba(255,255,255,.3);letter-spacing:.1em;margin-bottom:5px}
.fd-primary{font-size:26px;font-weight:900;color:#fff;letter-spacing:-.02em;margin-bottom:16px}
.fd-secondary{font-size:14px;font-weight:400;color:rgba(255,255,255,.5);margin-bottom:28px}
.deliverable{display:flex;align-items:center;gap:10px;margin-bottom:11px}
.check{color:${a};font-size:13px;font-weight:800;flex-shrink:0}
.del-text{font-size:13px;color:rgba(255,255,255,.65)}
.formats{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.fmt{background:#1a1a1a;border:1px solid #222;color:rgba(255,255,255,.4);font-size:10px;font-weight:600;padding:4px 10px;border-radius:12px}
</style></head><body><div class="bg-glow"></div>
<div class="left">
  <div class="tag2">BRAND KIT PREVIEW</div>
  <h2>Your Brand,<br/><span class="accent">Professionally</span><br/>Packaged</h2>
  <div class="sub2">Everything to look professional from day one.</div>
  <div class="palette">${swatches.map(c => `<div class="swatch" style="background:${c}"></div>`).join('')}</div>
  <div class="fd-label">PRIMARY FONT</div>
  <div class="fd-primary">Inter Black 900</div>
  <div class="fd-label">SECONDARY FONT</div>
  <div class="fd-secondary">Inter Regular — body copy and captions</div>
</div>
<div class="right">
  <div class="label" style="margin-bottom:16px">What You Get</div>
  ${deliverables.map(d => `<div class="deliverable"><div class="check">+</div><div class="del-text">${d}</div></div>`).join('')}
  <div class="formats">${['AI','SVG','PNG','PDF','Figma'].map(f => `<div class="fmt">.${f}</div>`).join('')}</div>
</div></body></html>`;
    }
  },
  {
    id: '2fgbRo_nlXod31aojHXUSQ==', slug: 'website-template-guide', accent: '#FF8C00',
    build(a) {
      const stack = [['Next.js 15','App Router + SSR','Latest'],['Tailwind CSS 4','Utility-first styling','v4'],['TypeScript','Type-safe codebase','Strict'],['Supabase','Auth + Database','Ready'],['Vercel','One-click deploy','Free tier'],['MDX','Blog and content','Built-in']];
      const pages = ['Homepage with hero and CTA sections','About / Team page','Services with pricing tables','Blog with MDX support','Contact form with email','Privacy Policy and Terms','Mobile-responsive on all pages','Dark mode support built-in','SEO meta tags pre-configured'];
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${GF}<style>${base(a)}
body{display:grid;grid-template-columns:1fr 1fr;height:720px}
.left{padding:52px 48px;border-right:1px solid #1a1a1a;display:flex;flex-direction:column;justify-content:center}
.right{padding:52px 48px;display:flex;flex-direction:column;justify-content:center}
.tag2{display:inline-block;border:1px solid ${a};color:${a};font-size:10px;font-weight:700;letter-spacing:.15em;padding:4px 14px;border-radius:2px;margin-bottom:24px}
h2{font-size:34px;font-weight:900;color:#fff;margin-bottom:10px;line-height:1.1}
.sub2{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:24px}
.tech-row{display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid #1a1a1a}
.tech-name{font-size:13px;font-weight:700;color:#fff}
.tech-desc{font-size:11px;color:rgba(255,255,255,.35)}
.tech-badge{font-size:10px;font-weight:700;color:${a};background:#1a0800;border:1px solid rgba(255,140,0,.2);padding:3px 10px;border-radius:10px}
.feature{display:flex;align-items:center;gap:10px;margin-bottom:11px}
.dot{width:5px;height:5px;border-radius:50%;background:${a};flex-shrink:0}
.feat-text{font-size:13px;color:rgba(255,255,255,.65)}
</style></head><body><div class="bg-glow"></div>
<div class="left">
  <div class="tag2">TECH STACK</div>
  <h2>Full Source Code<br/><span class="accent">Included</span></h2>
  <div class="sub2">Production-ready. No build tools. No npm. Deploy in minutes.</div>
  ${stack.map(([n,d,b]) => `<div class="tech-row"><div><div class="tech-name">${n}</div><div class="tech-desc">${d}</div></div><div class="tech-badge">${b}</div></div>`).join('')}
</div>
<div class="right">
  <div class="label" style="margin-bottom:18px">Pages Included</div>
  ${pages.map(f => `<div class="feature"><div class="dot"></div><div class="feat-text">${f}</div></div>`).join('')}
</div></body></html>`;
    }
  },
  {
    id: 'ZnSAd-fae2bBUY6i-CGPrQ==', slug: 'jst-academy-monthly', accent: '#00B4D8',
    build(a) {
      const months = [['M1','Business Foundations','4 lessons','active'],['M2','Brand and Identity','5 lessons',''],['M3','Website and Digital Presence','6 lessons',''],['M4','Social Media Strategy','5 lessons',''],['M5','Sales and Client Acquisition','6 lessons',''],['M6','Pricing and Packaging','4 lessons',''],['M7','Operations and Systems','5 lessons',''],['M8','Finance and Cash Flow','5 lessons',''],['M9','Marketing and Ads','6 lessons',''],['M10','Scaling Your Team','4 lessons',''],['M11','Advanced Tech Tools','5 lessons',''],['M12','Exit and Growth Strategy','5 lessons','']];
      const access = ['Video Lessons','PDF Downloads','Private Discord','WhatsApp Group','Live Q&A Sessions','Templates Library'];
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${GF}<style>${base(a)}
body{padding:40px 52px;display:flex;flex-direction:column;height:720px}
.top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:22px}
.tag2{display:inline-block;border:1px solid ${a};color:${a};font-size:10px;font-weight:700;letter-spacing:.15em;padding:4px 14px;border-radius:2px}
.stats{display:flex;gap:24px}
.stat-n{font-size:28px;font-weight:900;color:${a};line-height:1}
.stat-l{font-size:9px;color:rgba(255,255,255,.3);letter-spacing:.08em;margin-top:2px}
h2{font-size:26px;font-weight:900;color:#fff;margin-bottom:5px}
.sub2{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:18px}
.curriculum{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;flex:1}
.month{background:#111;border:1px solid #1e1e1e;border-radius:8px;padding:12px 14px}
.month.active{border-color:${a}}
.m-num{font-size:10px;font-weight:700;color:${a};letter-spacing:.1em;margin-bottom:5px}
.m-title{font-size:11px;font-weight:700;color:#fff;margin-bottom:3px;line-height:1.2}
.m-lessons{font-size:10px;color:rgba(255,255,255,.3)}
.access{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
.ac{background:#1a1a1a;border:1px solid #222;color:rgba(255,255,255,.45);font-size:10px;font-weight:600;padding:4px 12px;border-radius:10px}
</style></head><body><div class="bg-glow"></div>
<div class="top">
  <div>
    <div class="tag2">12-MONTH CURRICULUM</div>
    <h2 style="margin-top:12px">Build a <span class="accent">Real Business</span> Month by Month</h2>
    <div class="sub2">Practical education for Caribbean entrepreneurs. $15/mo, cancel anytime.</div>
  </div>
  <div class="stats">
    <div><div class="stat-n">12</div><div class="stat-l">MONTHS</div></div>
    <div><div class="stat-n">60+</div><div class="stat-l">LESSONS</div></div>
    <div><div class="stat-n">$15</div><div class="stat-l">PER MONTH</div></div>
  </div>
</div>
<div class="curriculum">
  ${months.map(([n,t,l,ac]) => `<div class="month ${ac}"><div class="m-num">${n}</div><div class="m-title">${t}</div><div class="m-lessons">${l}</div></div>`).join('')}
</div>
<div class="access">${access.map(x => `<div class="ac">${x}</div>`).join('')}</div>
</body></html>`;
    }
  },
];

async function screenshot(htmlFile, outFile) {
  return new Promise((resolve) => {
    const proc = spawn(CHROME, [
      '--headless=new','--disable-gpu','--no-sandbox',
      '--disable-dev-shm-usage','--hide-scrollbars',
      '--window-size=1280,720',
      `--screenshot=${outFile}`,
      `file:///${htmlFile.replace(/\\/g,'/')}`
    ], { stdio: 'pipe' });
    const t = setTimeout(() => { try{proc.kill()}catch(e){} resolve(); }, 25000);
    proc.on('close', () => { clearTimeout(t); resolve(); });
    proc.on('error', () => resolve());
  });
}

async function addCoverURL(productId, url) {
  const r = await fetch(`https://api.gumroad.com/v2/products/${encodeURIComponent(productId)}/covers`,
    { method:'POST', headers:{Authorization:`Bearer ${TOKEN}`,'Content-Type':'application/x-www-form-urlencoded'},
      body: new URLSearchParams({url}).toString() });
  return r.json();
}

async function main() {
  const BASE = 'https://jsupremetech.online/products/mockups/proof';
  for (const p of proofs) {
    console.log(`Building: ${p.slug}`);
    const htmlFile = path.join(DIR, `${p.slug}.html`);
    const pngFile  = path.join(DIR, `${p.slug}.png`);
    writeFileSync(htmlFile, p.build(p.accent), 'utf8');
    await screenshot(htmlFile, pngFile);
    console.log(`  Screenshot: ${existsSync(pngFile) ? 'OK' : 'FAILED'}`);
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('\nAll proof cards built. Deploying...');
}

main().catch(console.error);
