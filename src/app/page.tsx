"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const ACC = "#C8956C";
const BG = "#0B0A0F";
const TXT = "#E8E4DD";
const DIM = "rgba(232,228,221,0.45)";
const FAINT = "rgba(232,228,221,0.06)";
const SF = "'Instrument Serif', Georgia, serif";
const SN = "'DM Sans', sans-serif";
const MN = "'JetBrains Mono', monospace";
const BG2 = "rgba(200,149,108,0.015)";

const personSchema = {"@context":"https://schema.org","@type":"Person",name:"Holden Stirling Ottolini",jobTitle:"Co-Founder & VP of Operations & Services",worksFor:{"@type":"Organization",name:"Arc4"},url:"https://holdenottolini.com",sameAs:["https://www.linkedin.com/in/holden-stirling-ottolini/","https://github.com/holdenstirling","https://www.instagram.com/holdenottolini/"],email:"holdenstirling@gmail.com",address:{"@type":"PostalAddress",addressLocality:"Denver",addressRegion:"CO",addressCountry:"US"},alumniOf:{"@type":"CollegeOrUniversity",name:"Binghamton University"},knowsAbout:["AI Search","Claude API","Enterprise Implementation","Solution Architecture","Local SEO","CMS Platforms","React","Next.js","Python","LLM Evaluation"],description:"Technical co-founder. Co-founded and scaled a technical services company delivering 50+ Fortune 500 implementations. 5x Ironman finisher."};
const websiteSchema = {"@context":"https://schema.org","@type":"WebSite",name:"Holden Ottolini",url:"https://holdenottolini.com",author:{"@type":"Person",name:"Holden Stirling Ottolini"},description:"Personal site of Holden Ottolini. Co-Founder at Arc4. Solutions Architect. AI Developer. Speaker.",potentialAction:{"@type":"SearchAction",target:"https://holdenottolini.com/?q={search_term_string}","query-input":"required name=search_term_string"}};
const speakingEvents = [{"@context":"https://schema.org","@type":"Event",name:"The Rise of AI for Small Businesses",performer:{"@type":"Person",name:"Holden Stirling Ottolini"},organizer:{"@type":"Organization",name:"Localogy"},location:{"@type":"Place",name:"Localogy L25 Conference"}},{"@context":"https://schema.org","@type":"Event",name:"Achieve Podcast Guest Appearance",performer:{"@type":"Person",name:"Holden Stirling Ottolini"},organizer:{"@type":"Organization",name:"Achieve Podcast"},location:{"@type":"VirtualLocation",url:"https://holdenottolini.com"}}];

const faqData = [
  {q:"What does Holden Ottolini do?",a:"I am the Co-Founder and VP of Operations & Services at Arc4, a technical services company we built from zero to a 17 person team. We deliver enterprise implementations for Fortune 500 clients across CMS, search, and digital experience platforms."},
  {q:"What kind of consulting does Holden offer?",a:"I consult on AI search strategy, multi location SEO, enterprise CMS implementation (WordPress, Contentful, Sanity, Drupal), solution architecture, and technical team building."},
  {q:"What is the AI Visibility Audit Tool?",a:"A free tool I built that scores businesses across AI search engines (ChatGPT, Claude, Perplexity, Google AI), 8 local directories, 3 review platforms, and 6 SEO dimensions with letter grades, competitive benchmarking, and revenue impact projections."},
  {q:"Does Holden speak at conferences?",a:"Yes. I spoke at Localogy L25 on the rise of AI for small businesses and appeared on the Achieve Podcast. I speak on AI search, building from zero, enterprise implementation, and endurance sports."},
  {q:"What is Holden's background before Arc4?",a:"8 years at Yext. Promoted 5 times from Enterprise Sales Coordinator to Senior Solutions Architect. Made President's Club multiple years. Led one of the largest enterprise implementations in the company's history."},
  {q:"What technologies does Holden work with?",a:"Python and Claude API daily. React, Next.js, TypeScript, Vercel. CMS platforms: WordPress, Contentful, Sanity, Drupal. Also ChatGPT, Gemini, REST APIs, AWS, Jira, HubSpot, and Slack."},
  {q:"What makes Arc4 different?",a:"Every one of our 50+ engagements was net new business. We maintain industry leading client retention with the majority of revenue coming from expansions."},
  {q:"What are Holden's accomplishments outside work?",a:"5x Ironman finisher (PR 11:09, 11th in age group). Mountaineer and backcountry skier. 90 days solo through 15 countries. Started first business at 14 selling pumpkins."},
  {q:"Where is Holden located?",a:"Denver, Colorado. I work with clients nationwide and previously lived in New York City and Washington D.C."},
];
const faqSchema = {"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqData.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))};

function useVis(ref: React.RefObject<HTMLDivElement | null>) { const [v,setV]=useState(false); useEffect(()=>{if(!ref.current)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:0.1});o.observe(ref.current);return()=>o.disconnect()},[ref]); return v }
function Rv({children,delay=0}:{children:React.ReactNode;delay?:number}) { const ref=useRef<HTMLDivElement>(null);const v=useVis(ref); return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(24px)",transition:`opacity 0.65s cubic-bezier(.4,0,.2,1) ${delay}ms, transform 0.65s cubic-bezier(.4,0,.2,1) ${delay}ms`}}>{children}</div> }
function HCard({children,href}:{children:React.ReactNode;href?:string}) { const[h,setH]=useState(false);const s={background:h?"rgba(200,149,108,0.04)":"rgba(232,228,221,0.02)",border:`1px solid ${h?"rgba(200,149,108,0.2)":FAINT}`,borderRadius:14,padding:"22px 24px",height:"100%",transition:"all 0.3s",cursor:href?"pointer":"default" as const};const inner=<div style={s} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>{children}</div>;if(href)return<a href={href} target="_blank" rel="noreferrer" style={{textDecoration:"none",color:"inherit"}}>{inner}</a>;return inner }
function FaqItem({q,a}:{q:string;a:string}) { const[open,setOpen]=useState(false);return(<div style={{borderBottom:`1px solid ${FAINT}`}}><button onClick={()=>setOpen(!open)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",background:"none",border:"none",cursor:"pointer",color:"rgba(232,228,221,0.8)",fontFamily:SN,fontSize:14,fontWeight:600,textAlign:"left",lineHeight:1.5}}>{q}<span style={{fontSize:18,color:ACC,transition:"transform 0.3s",transform:open?"rotate(45deg)":"rotate(0)",flexShrink:0,marginLeft:12}}>+</span></button><div style={{maxHeight:open?400:0,overflow:"hidden",transition:"max-height 0.4s cubic-bezier(.4,0,.2,1)"}}><p style={{fontSize:13,fontFamily:SN,color:DIM,lineHeight:1.7,padding:"0 0 16px"}}>{a}</p></div></div>)}

const Lbl=({children}:{children:React.ReactNode})=><div style={{fontSize:11,fontFamily:SN,fontWeight:600,color:ACC,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:16}}>{children}</div>;
const H2=({children}:{children:React.ReactNode})=><h2 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:400,lineHeight:1.15,margin:"0 0 16px",letterSpacing:"-0.01em",fontFamily:SF,color:TXT}}>{children}</h2>;
const It=({children}:{children:React.ReactNode})=><span style={{fontStyle:"italic",color:ACC}}>{children}</span>;
const P=({children,style={}}:{children:React.ReactNode;style?:React.CSSProperties})=><p style={{fontSize:14,fontFamily:SN,color:DIM,lineHeight:1.7,...style}}>{children}</p>;

const metrics=[{n:"17",l:"Team Built",s:"from zero in <2 years"},{n:"50+",l:"Implementations",s:"Fortune 500 clients"},{n:"96%",l:"Client Retention",s:"across all accounts"},{n:"5x",l:"Ironman Finisher",s:"PR 11:09, 11th in AG"}];
const timeline=[{yr:"2023 \u2014 Present",t:"Co-Founder & VP of Operations & Services",co:"Arc4",loc:"Denver, CO",pts:["Co-founded and grew from zero to a growing team in under two years","Led a full platform rollout for a global manufacturing brand: React, Next.js, multi national deployment","Delivered 50+ enterprise implementations for Fortune 500 clients across retail, healthcare, education, and manufacturing","Built internal tools for operations, reporting, and team management","Python and Claude API code daily for production internal and client tools","Manage multiple teams across delivery, development, and strategy"]},{yr:"2019 \u2014 2023",t:"Senior Solutions Architect",co:"Yext",loc:"Washington, D.C.",pts:["Led one of the largest healthcare AI search and provider search deployments in the company\u2019s history","Technical pre sales: API architecture, POCs, C suite presentations","Multiple President\u2019s Club awards, top SA, off cycle promotions","Created integration frameworks adopted org wide, mentored junior architects"]},{yr:"2015 \u2014 2019",t:"4 Roles, 4 Promotions",co:"Yext",loc:"NYC & D.C.",pts:["SA Partnerships \u2014 enabled agency and tech partners (NYC)","Solutions Engineer \u2014 live demos and POCs for enterprise (D.C.)","Technical Project Manager \u2014 10+ concurrent implementations (NYC)","Enterprise Sales Coordinator \u2014 first job, promoted within a year (NYC)"]}];
const projects=[{name:"Claude API Content Engine",desc:"Python CLI using the Claude API to generate SEO optimized local landing pages with LLM as judge evaluation.",tech:"Python, Claude API",link:"https://github.com/holdenstirling/claude-local-content-engine"},{name:"Multi Platform CMS Connector",desc:"Unified library connecting WordPress, Contentful, and Sanity APIs with normalized data model and sync.",tech:"Python, REST APIs",link:"https://github.com/holdenstirling/multi-platform-cms-connector"},{name:"AI Search Evaluator",desc:"LLM as judge search quality evaluation framework with test suites and 6 quality dimensions.",tech:"Python, Claude API",link:"https://github.com/holdenstirling/ai-search-evaluator"}];
const techStack=[{cat:"Daily Use",items:["Python","Claude API","React","Next.js","TypeScript","Vercel"]},{cat:"CMS",items:["WordPress","Contentful","Sanity","Drupal"]},{cat:"AI / LLM",items:["Claude API","ChatGPT","Gemini","Prompt Eng.","LLM Eval"]},{cat:"Infra",items:["Vercel","Netlify","AWS","REST APIs","Git"]},{cat:"Enterprise",items:["Solution Arch.","Pre Sales","API Design","Multi National"]},{cat:"Tools",items:["Conductor","Jira","HubSpot","Slack"]}];
const speakingTopics=[{title:"The Rise of AI for Small Businesses",desc:"How local businesses can prepare for AI search and LLMs. Presented at Localogy L25.",tag:"AI"},{title:"Building from Zero",desc:"Starting a company from nothing and scaling it with no playbook.",tag:"Founder"},{title:"Enterprise Implementation at Scale",desc:"Lessons from 50+ Fortune 500 implementations.",tag:"Enterprise"},{title:"Mountains, Ironmans, and Business",desc:"What 5 Ironman finishes taught me about performing under pressure.",tag:"Personal"},{title:"AI Search and Local SEO Strategy",desc:"Visibility across ChatGPT, Claude, Perplexity, and Google AI.",tag:"AI"},{title:"Scaling Teams in Ambiguity",desc:"Building a team from scratch when no process or precedent exists.",tag:"Leadership"}];
const TC:Record<string,string>={AI:"#C8956C",Founder:"#4ECDC4",Enterprise:"#6366F1",Personal:"#FF9800",Leadership:"#7DD87D",SEO:"#4ECDC4",Technical:"#6366F1",Business:"#7DD87D"};
const blogPosts=[{title:"Local Landing Pages for Multi Location SEO",desc:"High performing local pages across hundreds of locations.",tag:"SEO",slug:"local-landing-pages"},{title:"Website Architecture: A Complete Guide",desc:"Scalable website architecture for growing businesses.",tag:"Technical",slug:"website-architecture"},{title:"AI Search Implementation",desc:"A practical guide from planning to launch.",tag:"AI",slug:"ai-search-implementation"},{title:"Client Retention at Scale",desc:"How we achieved 96% retention at Arc4.",tag:"Business",slug:"client-retention-at-scale"},{title:"From Startup to Enterprise",desc:"Growing Arc4 from zero to 17 people.",tag:"Business",slug:"scaling-strategies"},{title:"From Yext to Arc4",desc:"Why I left to co-found a company.",tag:"Personal",slug:"yext-to-arc4"},{title:"Ironman: Lessons for Leaders",desc:"Consistency, resilience, and long term thinking.",tag:"Personal",slug:"ironman-business-lessons"},{title:"90 Days Solo Travel",desc:"15 countries. More than a decade of lessons.",tag:"Personal",slug:"90-days-solo-travel"}];
const testimonials=[{quote:"Arc4 has been an exceptional development partner. Their combination of technical skill, professionalism, and efficiency makes them one of the most dependable vendors we work with.",source:"Fortune 500 Retail Client",via:"G2"},{quote:"They made this project so easy, especially when I had multiple large projects moving at the same time. I knew I did not have to worry about deadlines.",source:"Enterprise Client",via:"G2"},{quote:"A vital partner rather than just a vendor. They come with recommendations to make our work easier, more accurate, and better for the end customer.",source:"Enterprise Client",via:"G2"},{quote:"They actively monitor, flag issues, and provide recommendations before problems arise. Communication is always prompt and clear.",source:"Enterprise Client",via:"G2"}];
const NAVS=["home","about","work","audit","testimonials","speaking","blog","faq","contact"];

export default function Home() {
  const[scrollY,setScrollY]=useState(0);
  const[menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{const h=()=>setScrollY(window.scrollY);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h)},[]);
  const scrollTo=(id:string)=>{setMenuOpen(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"})};
  const nb=scrollY>60;

  return(
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(personSchema)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/>
      {speakingEvents.map((ev,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ev)}}/>)}
      <div style={{minHeight:"100vh",background:BG,color:TXT,fontFamily:SF,overflowX:"hidden"}}>

        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:nb?"rgba(11,10,15,0.92)":"transparent",backdropFilter:nb?"blur(16px)":"none",borderBottom:nb?`1px solid ${FAINT}`:"none",transition:"all 0.4s",padding:"12px 24px"}}>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div onClick={()=>scrollTo("home")} style={{cursor:"pointer",fontSize:17,fontFamily:SN,fontWeight:700,letterSpacing:"-0.02em",color:TXT}}>H<span style={{color:ACC}}>.</span> Ottolini</div>
            <div className="nl" style={{display:"flex",gap:20,alignItems:"center"}}>
              {NAVS.map(s=><span key={s} onClick={()=>scrollTo(s)} style={{cursor:"pointer",fontSize:10.5,fontFamily:SN,fontWeight:500,color:"rgba(232,228,221,0.4)",letterSpacing:"0.04em",textTransform:"uppercase",transition:"color 0.2s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color=ACC} onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(232,228,221,0.4)"}>{s}</span>)}
              <a href="https://github.com/holdenstirling" target="_blank" rel="noreferrer" style={{fontSize:10,fontFamily:SN,fontWeight:700,color:BG,background:ACC,padding:"5px 12px",borderRadius:5,textDecoration:"none"}}>GitHub</a>
            </div>
            <button className="mob-show" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{display:"none",background:"none",border:"none",cursor:"pointer",padding:8}}>
              <div style={{width:20,height:2,background:TXT,marginBottom:4,transition:"all 0.3s",transform:menuOpen?"rotate(45deg) translateY(6px)":"none"}}/>
              <div style={{width:20,height:2,background:TXT,marginBottom:4,opacity:menuOpen?0:1,transition:"all 0.3s"}}/>
              <div style={{width:20,height:2,background:TXT,transition:"all 0.3s",transform:menuOpen?"rotate(-45deg) translateY(-6px)":"none"}}/>
            </button>
          </div>
          {menuOpen&&<div className="mob-show" style={{display:"none",flexDirection:"column",gap:12,padding:"16px 0",borderTop:`1px solid ${FAINT}`,marginTop:8}}>
            {NAVS.map(s=><span key={s} onClick={()=>scrollTo(s)} style={{cursor:"pointer",fontSize:13,fontFamily:SN,fontWeight:500,color:"rgba(232,228,221,0.6)",textTransform:"capitalize"}}>{s}</span>)}
          </div>}
        </nav>

        <header id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 50%,rgba(200,149,108,0.06) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(200,149,108,0.03) 0%,transparent 50%)"}}/>
          <div style={{position:"relative",maxWidth:1100,margin:"0 auto",padding:"120px 24px 80px",width:"100%"}}>
            <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr auto",gap:50,alignItems:"center"}}>
              <div>
                <Rv><p style={{fontSize:11,fontFamily:SN,fontWeight:600,color:ACC,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:20}}>Co-Founder & VP of Operations & Services at Arc4</p></Rv>
                <Rv delay={100}><h1 style={{fontSize:"clamp(36px,6vw,68px)",fontWeight:400,lineHeight:1.05,margin:"0 0 24px",letterSpacing:"-0.02em",fontFamily:SF,color:TXT}}>I build companies,<br/><It>ship products,</It><br/>and close deals.</h1></Rv>
                <Rv delay={200}><P style={{maxWidth:520,margin:"0 0 36px",fontSize:16}}>From selling pumpkins at 14 to co-founding a company and scaling it to 17 people. I write Claude API code in the morning, present to Fortune 500 executives in the afternoon, and manage my team in between.</P></Rv>
                <Rv delay={300}><div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <a href="mailto:holdenstirling@gmail.com" style={{padding:"11px 26px",borderRadius:6,background:ACC,color:BG,fontFamily:SN,fontSize:13,fontWeight:600,textDecoration:"none"}}>Get in Touch</a>
                  <a href="/ai-audit" target="_blank" rel="noreferrer" style={{padding:"11px 26px",borderRadius:6,border:`1px solid ${ACC}40`,color:ACC,fontFamily:SN,fontSize:13,fontWeight:500,textDecoration:"none"}}>Try My AI Audit Tool</a>
                  <span onClick={()=>scrollTo("work")} style={{padding:"11px 26px",borderRadius:6,border:"1px solid rgba(232,228,221,0.1)",color:TXT,fontFamily:SN,fontSize:13,fontWeight:500,cursor:"pointer"}}>View My Work</span>
                  <a href="/resume-coach" style={{padding:"11px 26px",borderRadius:6,border:`1px solid rgba(99,102,241,0.3)`,color:"#6366F1",fontFamily:SN,fontSize:13,fontWeight:500,textDecoration:"none"}}>AI Resume Coach</a>
                </div></Rv>
              </div>
              <Rv delay={200}><div style={{width:200,height:200,borderRadius:"50%",overflow:"hidden",border:`3px solid ${ACC}30`,flexShrink:0}}>
                <img src="/headshot.jpg" alt="Holden Stirling Ottolini, Co-Founder and VP of Operations and Services at Arc4" width={200} height={200} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
              </div></Rv>
            </div>
            <div className="g2" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,marginTop:60,background:FAINT,borderRadius:12,overflow:"hidden"}}>
              {metrics.map((m,i)=><Rv key={m.l} delay={400+i*80}><div style={{background:BG,padding:"24px 16px",textAlign:"center"}}><div style={{fontSize:30,color:ACC,fontFamily:SF}}>{m.n}</div><div style={{fontSize:10,fontFamily:SN,fontWeight:600,color:"rgba(232,228,221,0.55)",letterSpacing:"0.06em",textTransform:"uppercase",marginTop:3}}>{m.l}</div><div style={{fontSize:9,fontFamily:SN,color:"rgba(232,228,221,0.2)",marginTop:2}}>{m.s}</div></div></Rv>)}
            </div>
          </div>
        </header>

        <section id="about" style={{padding:"90px 24px",maxWidth:1100,margin:"0 auto"}}><Rv><Lbl>About</Lbl></Rv>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:50,alignItems:"start"}}>
            <div>
              <Rv delay={100}><H2>Building teams, scaling companies, <It>pushing limits.</It></H2></Rv>
              <Rv delay={200}><P style={{marginBottom:14}}>I started my first business at 14 selling pumpkins in upstate New York. Almost failed out of college. Ended up in NYC, got promoted 5 times in 8 years at Yext, made President's Club multiple years, closed some of the largest deals in company history, and eventually left to co-found Arc4.</P></Rv>
              <Rv delay={300}><P>Today I run a 17 person team delivering implementations for 50+ enterprise clients across retail, healthcare, manufacturing, and education. I write production code with Python and the Claude API every day. Outside of work I have finished 5 Ironmans, climb mountains, and spent 90 days traveling solo through 15 countries.</P></Rv>
            </div>
            <Rv delay={200}><aside style={{background:"rgba(200,149,108,0.04)",border:"1px solid rgba(200,149,108,0.1)",borderRadius:14,padding:24}}>
              <h3 style={{fontSize:12,fontFamily:SN,fontWeight:700,color:ACC,marginBottom:14}}>Quick Facts</h3>
              {[["Current","Co-Founder & VP, Arc4"],["Team","17 people, 3 teams"],["Yext","5 promotions, 8 years"],["President\u2019s Club","Multiple years"],["Ironman","5x finisher, PR 11:09"],["Location","Denver, Colorado"],["Education","Binghamton University"]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${FAINT}`}}><span style={{fontSize:11,fontFamily:SN,color:"rgba(232,228,221,0.3)"}}>{k}</span><span style={{fontSize:11,fontFamily:SN,fontWeight:600,color:"rgba(232,228,221,0.7)"}}>{v}</span></div>)}
            </aside></Rv>
          </div>
        </section>

        <section style={{padding:"60px 24px 80px",background:BG2}}><div style={{maxWidth:1100,margin:"0 auto"}}><Rv><Lbl>Skills & Stack</Lbl><H2>What I <It>work with.</It></H2></Rv>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginTop:32}}>
            {techStack.map((g,i)=><Rv key={g.cat} delay={i*50}><div style={{background:BG,border:"1px solid rgba(232,228,221,0.05)",borderRadius:12,padding:"18px 16px"}}><h3 style={{fontSize:10,fontFamily:SN,fontWeight:700,color:ACC,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>{g.cat}</h3><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{g.items.map(item=><span key={item} style={{fontSize:10,fontFamily:SN,padding:"3px 8px",borderRadius:4,background:"rgba(232,228,221,0.04)",color:"rgba(232,228,221,0.55)",fontWeight:500}}>{item}</span>)}</div></div></Rv>)}
          </div>
        </div></section>

        <section style={{padding:"80px 24px"}}><div style={{maxWidth:1100,margin:"0 auto"}}><Rv><Lbl>Career</Lbl><H2>The <It>full story.</It></H2></Rv>
          {timeline.map((t,i)=><Rv key={i} delay={i*80}><div className="g2" style={{display:"grid",gridTemplateColumns:"170px 1fr",gap:28,padding:"24px 0",borderTop:`1px solid ${FAINT}`}}><div><time style={{fontSize:12,fontFamily:MN,color:ACC,fontWeight:600}}>{t.yr}</time><div style={{fontSize:10,fontFamily:SN,color:"rgba(232,228,221,0.25)",marginTop:3}}>{t.co} — {t.loc}</div></div><div><h3 style={{fontSize:19,fontWeight:400,margin:"0 0 10px",fontFamily:SF,color:TXT}}>{t.t}</h3>{t.pts.map((p,j)=><div key={j} style={{fontSize:12,fontFamily:SN,color:DIM,lineHeight:1.6,paddingLeft:12,position:"relative",marginBottom:4}}><span style={{position:"absolute",left:0,color:ACC}}>·</span>{p}</div>)}</div></div></Rv>)}
        </div></section>

        <section id="work" style={{padding:"80px 24px",background:BG2}}><div style={{maxWidth:1100,margin:"0 auto"}}><Rv><Lbl>Work</Lbl><H2>Things I've <It>built.</It></H2></Rv>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginTop:32}}>
            {projects.map((p,i)=><Rv key={p.name} delay={i*70}><HCard href={p.link}><span style={{fontFamily:MN,fontSize:10,color:ACC,letterSpacing:"0.05em"}}>{p.tech}</span><h3 style={{fontSize:17,fontWeight:400,margin:"8px 0 6px",fontFamily:SF,color:TXT}}>{p.name}</h3><P style={{fontSize:12,margin:0}}>{p.desc}</P><div style={{marginTop:12,fontSize:11,fontFamily:SN,fontWeight:600,color:ACC}}>View on GitHub {"\u2192"}</div></HCard></Rv>)}
          </div>
        </div></section>

        <section id="audit" style={{padding:"80px 24px"}}><div style={{maxWidth:1100,margin:"0 auto"}}><Rv>
          <div className="g2" style={{background:"linear-gradient(135deg,rgba(200,149,108,0.06),rgba(99,102,241,0.04))",border:"1px solid rgba(200,149,108,0.15)",borderRadius:18,padding:"clamp(24px,4vw,40px) clamp(20px,3vw,36px)",display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:40,alignItems:"center"}}>
            <div>
              <span style={{display:"inline-block",fontSize:9,fontFamily:SN,fontWeight:700,color:ACC,letterSpacing:"0.06em",background:"rgba(200,149,108,0.1)",border:"1px solid rgba(200,149,108,0.2)",borderRadius:100,padding:"4px 12px",marginBottom:16}}>FEATURED PROJECT</span>
              <h2 style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:400,lineHeight:1.15,margin:"0 0 12px",fontFamily:SF,color:TXT}}>AI Visibility & Local SEO <It>Audit Tool</It></h2>
              <P style={{margin:"0 0 8px",maxWidth:440}}>Free tool scoring businesses across ChatGPT, Claude, Perplexity, Google AI, 8 directories, 3 review platforms, and 6 SEO dimensions.</P>
              <P style={{margin:"0 0 20px",maxWidth:440,fontSize:12,color:"rgba(232,228,221,0.35)"}}>Competitive benchmarking, revenue projections, email gated action plans. React, Next.js, Vercel.</P>
              <a href="/ai-audit" target="_blank" rel="noreferrer" style={{display:"inline-block",padding:"11px 24px",borderRadius:7,background:ACC,color:BG,fontFamily:SN,fontSize:13,fontWeight:700,textDecoration:"none"}}>Try the Live Tool {"\u2192"}</a>
            </div>
            <div style={{background:"rgba(11,10,15,0.5)",borderRadius:12,padding:20,border:`1px solid ${FAINT}`}}>
              <h3 style={{fontSize:11,fontFamily:SN,fontWeight:600,color:"rgba(232,228,221,0.35)",marginBottom:12}}>What it audits:</h3>
              {["AI search visibility (ChatGPT, Claude, Perplexity, Google AI)","8 publisher directory listings with NAP checks","Review sentiment across Google, Yelp, Facebook","6 point SEO audit with letter grades A+ through F","Competitive benchmarking vs up to 5 competitors","Revenue impact projections by category","Email gated action plans for lead gen","Multi city support (up to 6 locations)"].map(item=><div key={item} style={{fontSize:11,fontFamily:SN,color:"rgba(232,228,221,0.5)",padding:"5px 0",borderBottom:"1px solid rgba(232,228,221,0.03)",lineHeight:1.5}}>{item}</div>)}
            </div>
          </div>
        </Rv></div></section>


        <section style={{padding:"60px 24px"}}><div style={{maxWidth:1100,margin:"0 auto"}}><Rv>
          <div className="g2" style={{background:"linear-gradient(135deg,rgba(99,102,241,0.06),rgba(200,149,108,0.04))",border:"1px solid rgba(99,102,241,0.15)",borderRadius:18,padding:"clamp(24px,4vw,40px) clamp(20px,3vw,36px)",display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:40,alignItems:"center"}}>
            <div>
              <span style={{display:"inline-block",fontSize:9,fontFamily:SN,fontWeight:700,color:"#6366F1",letterSpacing:"0.06em",background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:100,padding:"4px 12px",marginBottom:16}}>FREE TOOL</span>
              <h2 style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:400,lineHeight:1.15,margin:"0 0 12px",fontFamily:SF,color:TXT}}>AI Resume <span style={{fontStyle:"italic",color:"#6366F1"}}>Coach</span></h2>
              <P style={{margin:"0 0 8px",maxWidth:440}}>Upload your resume, paste a job description, and get a scored review with specific recommendations from a hiring manager perspective.</P>
              <P style={{margin:"0 0 20px",maxWidth:440,fontSize:12,color:"rgba(232,228,221,0.35)"}}>Hiring manager comparison, ATS compatibility check, industry-specific tips, and a 6-second test. Powered by Claude AI.</P>
              <a href="/resume-coach" style={{display:"inline-block",padding:"11px 24px",borderRadius:7,background:"#6366F1",color:"#fff",fontFamily:SN,fontSize:13,fontWeight:700,textDecoration:"none"}}>Try the Resume Coach {"\u2192"}</a>
            </div>
            <div style={{background:"rgba(11,10,15,0.5)",borderRadius:12,padding:20,border:`1px solid ${FAINT}`}}>
              <h3 style={{fontSize:11,fontFamily:SN,fontWeight:600,color:"rgba(232,228,221,0.35)",marginBottom:12}}>What you get:</h3>
              {["Overall letter grade with 5 category scores","6-second test: would a hiring manager keep reading?","Stack rank vs other candidates at your level","ATS compatibility score with explanation","Industry-specific tips for your target role","Top 3 prioritized actions to take right now","Strengths analysis so you know what to keep","Direct consultation option for deeper help"].map(item=><div key={item} style={{fontSize:11,fontFamily:SN,color:"rgba(232,228,221,0.5)",padding:"5px 0",borderBottom:"1px solid rgba(232,228,221,0.03)",lineHeight:1.5}}>{item}</div>)}
            </div>
          </div>
        </Rv></div></section>

        <section id="testimonials" style={{padding:"80px 24px",background:BG2}}><div style={{maxWidth:1100,margin:"0 auto"}}>
          <Rv><Lbl>Testimonials</Lbl><H2>What clients <It>say.</It></H2><P style={{maxWidth:480,margin:"0 0 36px"}}>Verified reviews from G2.com for Arc4.</P></Rv>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {testimonials.map((t,i)=><Rv key={i} delay={i*70}><blockquote style={{background:BG,border:`1px solid ${FAINT}`,borderRadius:14,padding:"24px 26px",height:"100%",margin:0}}>
              <div style={{fontSize:28,color:ACC,fontFamily:SF,lineHeight:1,marginBottom:8,opacity:0.4}}>{"\u201C"}</div>
              <p style={{fontSize:13,fontFamily:SN,color:"rgba(232,228,221,0.55)",lineHeight:1.7,margin:"0 0 14px"}}>{t.quote}</p>
              <footer style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><cite style={{fontSize:11,fontFamily:SN,fontWeight:600,color:"rgba(232,228,221,0.7)",fontStyle:"normal"}}>{t.source}</cite><span style={{fontSize:9,fontFamily:SN,fontWeight:600,color:ACC,background:"rgba(200,149,108,0.1)",padding:"2px 8px",borderRadius:3}}>{t.via}</span></footer>
            </blockquote></Rv>)}
          </div>
          <Rv delay={300}><p style={{textAlign:"center",marginTop:20}}><a href="https://www.g2.com/products/arc4/reviews" target="_blank" rel="noreferrer" style={{fontSize:12,fontFamily:SN,fontWeight:600,color:ACC,textDecoration:"none"}}>Read all reviews on G2 {"\u2192"}</a></p></Rv>
        </div></section>

        <section id="speaking" style={{padding:"80px 24px"}}><div style={{maxWidth:1100,margin:"0 auto"}}>
          <Rv><Lbl>Speaking</Lbl><H2>Available for <It>speaking.</It></H2><P style={{maxWidth:480,margin:"0 0 36px"}}>Localogy L25 speaker. Achieve Podcast guest.</P></Rv>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:12}}>
            {speakingTopics.map((t,i)=><Rv key={t.title} delay={i*50}><article style={{background:BG,border:"1px solid rgba(232,228,221,0.05)",borderRadius:12,padding:"18px 20px"}}><span style={{fontSize:9,fontFamily:SN,fontWeight:700,padding:"2px 8px",borderRadius:3,background:`${TC[t.tag]}15`,color:TC[t.tag],letterSpacing:"0.04em",textTransform:"uppercase"}}>{t.tag}</span><h3 style={{fontSize:14,fontFamily:SN,fontWeight:700,margin:"8px 0 5px",color:"rgba(232,228,221,0.8)"}}>{t.title}</h3><P style={{fontSize:11,margin:0}}>{t.desc}</P></article></Rv>)}
          </div>
        </div></section>

        <section id="blog" style={{padding:"80px 24px",background:BG2}}><div style={{maxWidth:1100,margin:"0 auto"}}>
          <Rv><Lbl>Blog</Lbl><H2>Insights & <It>stories.</It></H2><P style={{maxWidth:480,margin:"0 0 36px"}}>Strategy, technical deep dives, personal growth, and lessons from the road.</P></Rv>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {blogPosts.map((p,i)=><Rv key={p.title} delay={i*40}><Link href={`/blog/${p.slug}`} style={{textDecoration:"none",color:"inherit"}}><HCard><span style={{fontSize:9,fontFamily:SN,fontWeight:700,padding:"2px 7px",borderRadius:3,background:`${TC[p.tag]}15`,color:TC[p.tag],letterSpacing:"0.04em",textTransform:"uppercase"}}>{p.tag}</span><h3 style={{fontSize:15,fontFamily:SN,fontWeight:600,margin:"8px 0 5px",color:"rgba(232,228,221,0.8)"}}>{p.title}</h3><P style={{fontSize:11,margin:0}}>{p.desc}</P><div style={{marginTop:10,fontSize:11,fontFamily:SN,fontWeight:600,color:ACC}}>Read {"\u2192"}</div></HCard></Link></Rv>)}
          </div>
        </div></section>

        <section id="faq" style={{padding:"80px 24px"}}><div style={{maxWidth:740,margin:"0 auto"}}>
          <Rv><Lbl>FAQ</Lbl><H2>Frequently <It>asked.</It></H2><P style={{margin:"0 0 32px"}}>Common questions about my work, consulting, and background.</P></Rv>
          {faqData.map((f,i)=><Rv key={i} delay={i*30}><FaqItem q={f.q} a={f.a}/></Rv>)}
        </div></section>

        <section id="contact" style={{padding:"90px 24px 50px",maxWidth:1100,margin:"0 auto"}}><Rv>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:50,alignItems:"center"}}>
            <div>
              <Lbl>Contact</Lbl><H2>Let's <It>talk.</It></H2>
              <P style={{maxWidth:380}}>Whether you need consulting, a speaker, or just want to connect about AI, enterprise tech, or endurance sports.</P>
              <a href="/Holden_Ottolini_Resume.pdf" download style={{display:"inline-block",marginTop:16,padding:"9px 20px",borderRadius:6,border:`1px solid ${FAINT}`,color:"rgba(232,228,221,0.5)",fontFamily:SN,fontSize:12,fontWeight:500,textDecoration:"none"}}>Download Resume {"\u2193"}</a>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[{l:"Email",v:"holdenstirling@gmail.com",h:"mailto:holdenstirling@gmail.com"},{l:"LinkedIn",v:"holden-stirling-ottolini",h:"https://www.linkedin.com/in/holden-stirling-ottolini/"},{l:"GitHub",v:"holdenstirling",h:"https://github.com/holdenstirling"},{l:"Instagram",v:"@holdenottolini",h:"https://www.instagram.com/holdenottolini/"}].map(c=><a key={c.l} href={c.h} target="_blank" rel="noreferrer" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",background:"rgba(232,228,221,0.02)",border:`1px solid ${FAINT}`,borderRadius:10,textDecoration:"none",color:"inherit",transition:"border-color 0.3s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(200,149,108,0.25)"} onMouseLeave={e=>e.currentTarget.style.borderColor=FAINT}><span style={{fontSize:10,fontFamily:SN,color:"rgba(232,228,221,0.3)",textTransform:"uppercase",letterSpacing:"0.06em"}}>{c.l}</span><span style={{fontSize:13,fontFamily:SN,fontWeight:500,color:ACC}}>{c.v}</span></a>)}
            </div>
          </div>
        </Rv></section>

        <footer style={{padding:"28px 24px",borderTop:`1px solid ${FAINT}`,textAlign:"center"}}><p style={{fontSize:10,fontFamily:SN,color:"rgba(232,228,221,0.12)"}}>{"\u00A9"} 2026 Holden Stirling Ottolini. Denver, Colorado.</p></footer>
      </div>
    </>
  );
}
