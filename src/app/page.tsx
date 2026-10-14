"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ACC = "#C8956C";
const BG = "#0B0A0F";
const TXT = "#E8E4DD";
const DIM = "rgba(232,228,221,0.45)";
const FAINT = "rgba(232,228,221,0.06)";
const SF = "'Instrument Serif', Georgia, serif";
const SN = "'DM Sans', sans-serif";
const MN = "'JetBrains Mono', monospace";
const BG2 = "rgba(200,149,108,0.015)";

const personSchema = {"@context":"https://schema.org","@type":"Person",name:"Holden Stirling Ottolini",jobTitle:"Senior Solutions Architect",worksFor:{"@type":"Organization",name:"Writer"},url:"https://holdenottolini.com",sameAs:["https://www.linkedin.com/in/holden-stirling-ottolini/","https://github.com/holdenstirling","https://www.instagram.com/holdenottolini/"],email:"holdenstirling@gmail.com",address:{"@type":"PostalAddress",addressLocality:"Denver",addressRegion:"CO",addressCountry:"US"},alumniOf:{"@type":"CollegeOrUniversity",name:"Binghamton University"},knowsAbout:["Solution Architecture","Technical Pre-Sales","Enterprise Implementation","Systems Integration","Microsoft Teams","Zoom","Digital Identity","CMS Platforms","Search","Python","Next.js"],description:"Senior Solutions Architect at Writer. Former co-founder of a systems integrator and 8 years at Yext. 50+ enterprise implementations. 5x Ironman finisher."};
const websiteSchema = {"@context":"https://schema.org","@type":"WebSite",name:"Holden Ottolini",url:"https://holdenottolini.com",author:{"@type":"Person",name:"Holden Stirling Ottolini"},description:"Personal site of Holden Ottolini. Senior Solutions Architect, advisor, and Ironman finisher based in Denver."};
const speakingEvents = [{"@context":"https://schema.org","@type":"Event",name:"The Rise of AI for Small Businesses",description:"How local businesses can prepare for AI search, LLMs, and the shifting digital landscape.",startDate:"2025-02-18",eventStatus:"https://schema.org/EventScheduled",eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode",performer:{"@type":"Person",name:"Holden Stirling Ottolini"},organizer:{"@type":"Organization",name:"Localogy",url:"https://www.localogy.com"},location:{"@type":"Place",name:"Localogy L25 Conference",address:{"@type":"PostalAddress",addressLocality:"Columbus",addressRegion:"OH",addressCountry:"US"}}}];

const faqData = [
  {q:"What does Holden Ottolini do?",a:"I'm a Senior Solutions Architect at Writer, covering enterprise accounts in the West. Day to day that means discovery with customer architecture and IT teams, solution design, proofs of concept, and figuring out how the thing actually plugs into their stack."},
  {q:"What kind of consulting does Holden take on?",a:"Pre-sales and solutions engineering help (including fractional SA work), platform and vendor advisory, website and CMS projects, search and local visibility, and expert calls for investors and research firms. Email me with what you're working on and I'll tell you honestly if I'm a fit."},
  {q:"What platforms does Holden know well?",a:"Enterprise conferencing and collaboration (Zoom, Microsoft Teams), digital identity and e-signature, cloud platforms (AWS, Azure), and web and CMS platforms (WordPress, Contentful, Sanity, Drupal, Webflow, Shopify). Plus a decade of search and listings work from Yext."},
  {q:"Does Holden do expert network calls?",a:"Yes. I regularly do calls through the major expert networks on enterprise software, collaboration platforms, digital identity, and website infrastructure, mostly from the buyer and implementation side."},
  {q:"Does Holden speak at conferences?",a:"Yes. I spoke at Localogy L25 and have been a podcast guest. Happy to talk about enterprise pre-sales, implementation, building a company from zero, or what Ironman training teaches you about work."},
  {q:"What did Holden do before Writer?",a:"I co-founded a systems integrator and grew it from zero to 17 people with 50+ enterprise implementations. Before that I spent 8 years at Yext, promoted 5 times from Enterprise Sales Coordinator to Senior Solutions Architect, with multiple President's Club years."},
  {q:"What does Holden do outside work?",a:"5x Ironman finisher. Mountaineer and backcountry skier based in Colorado. Traveled solo through 15 countries. Started my first business at 12 selling pumpkins in upstate Pennsylvania. Nearly failed out of college. Figured it out."},
  {q:"Where is Holden located?",a:"Denver, Colorado. I work with people nationwide and previously lived in New York City and Washington D.C."},
];
const faqSchema = {"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqData.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))};


function Rv({children,delay=0}:{children:React.ReactNode;delay?:number}) { return <div style={{animationName:'fadeUp',animationDuration:'0.6s',animationTimingFunction:'cubic-bezier(.4,0,.2,1)',animationFillMode:'both',animationDelay:`${delay}ms`}}>{children}</div> }
function HCard({children,href}:{children:React.ReactNode;href?:string}) { const[h,setH]=useState(false);const s={background:h?"rgba(200,149,108,0.04)":"rgba(232,228,221,0.02)",border:`1px solid ${h?"rgba(200,149,108,0.2)":FAINT}`,borderRadius:14,padding:"22px 24px",height:"100%",transition:"all 0.3s",cursor:href?"pointer":"default" as const};const inner=<div style={s} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>{children}</div>;if(href)return<a href={href} target="_blank" rel="noreferrer" style={{textDecoration:"none",color:"inherit"}}>{inner}</a>;return inner }
function FaqItem({q,a}:{q:string;a:string}) { const[open,setOpen]=useState(false);return(<div style={{borderBottom:`1px solid ${FAINT}`}}><button onClick={()=>setOpen(!open)} aria-expanded={open} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",background:"none",border:"none",cursor:"pointer",color:"rgba(232,228,221,0.8)",fontFamily:SN,fontSize:14,fontWeight:600,textAlign:"left",lineHeight:1.5}}>{q}<span style={{fontSize:18,color:ACC,transition:"transform 0.3s",transform:open?"rotate(45deg)":"rotate(0)",flexShrink:0,marginLeft:12}}>+</span></button><div style={{maxHeight:open?400:0,overflow:"hidden",transition:"max-height 0.4s cubic-bezier(.4,0,.2,1)"}}><p style={{fontSize:13,fontFamily:SN,color:DIM,lineHeight:1.7,padding:"0 0 16px"}}>{a}</p></div></div>)}

const Lbl=({children}:{children:React.ReactNode})=><div style={{fontSize:11,fontFamily:SN,fontWeight:600,color:ACC,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:16}}>{children}</div>;
const H2=({children}:{children:React.ReactNode})=><h2 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:400,lineHeight:1.15,margin:"0 0 12px",letterSpacing:"-0.01em",fontFamily:SF,color:TXT}}>{children}</h2>;
const It=({children}:{children:React.ReactNode})=><span style={{fontStyle:"italic",color:ACC}}>{children}</span>;
const P=({children,style={}}:{children:React.ReactNode;style?:React.CSSProperties})=><p style={{fontSize:14,fontFamily:SN,color:DIM,lineHeight:1.7,...style}}>{children}</p>;

const metrics=[{n:"10+",l:"Years",s:"pre-sales and delivery"},{n:"50+",l:"Implementations",s:"enterprise clients"},{n:"17",l:"Team Built",s:"from zero as co-founder"},{n:"5x",l:"Ironman Finisher",s:"and counting"}];
const timeline=[{yr:"2026 \u2013 Present",t:"Senior Solutions Architect",co:"Writer",loc:"Denver, CO",pts:["Technical pre-sales for enterprise accounts across the West region","Run discovery, solution design, and proofs of concept with customer architecture and IT teams","Plan integrations and deployments across AWS and Azure environments","Scope integration strategy: pre-built connectors vs custom builds, level of effort, sequencing"]},{yr:"2023 \u2013 2026",t:"Co-Founder",co:"Arc4",loc:"Denver, CO",pts:["Co-founded a systems integrator and grew it from zero to 17 people","Delivered 50+ enterprise implementations, mostly for financial services clients"]},{yr:"2019 \u2013 2023",t:"Senior Solutions Architect",co:"Yext",loc:"Washington, D.C.",pts:["Led one of the largest healthcare provider search deployments in the company\u2019s history","Technical pre-sales: API architecture, POCs, executive presentations","Multiple President\u2019s Club awards, top SA, off-cycle promotions","Built integration frameworks adopted org-wide and mentored junior architects"]},{yr:"2015 \u2013 2019",t:"4 Roles, 4 Promotions",co:"Yext",loc:"NYC & D.C.",pts:["SA Partnerships: enabled agency and tech partners (NYC)","Solutions Engineer: live demos and POCs for enterprise (D.C.)","Technical Project Manager: 10+ concurrent implementations (NYC)","Enterprise Sales Coordinator: first job, promoted within a year (NYC)"]}];
const services=[{title:"Pre-Sales & Solutions Engineering",desc:"Fractional SA support for software companies. Discovery, demos, POCs, RFPs, and technical win plans. I've done this job for a decade and can plug in fast.",tag:"Sales"},{title:"Platform & Vendor Advisory",desc:"Picking or renegotiating enterprise software? I help buyers cut through vendor pitches on collaboration (Zoom, Teams), digital identity and e-signature, and web platforms.",tag:"Advisory"},{title:"Website & CMS Projects",desc:"Strategy, platform selection, and builds on WordPress, Contentful, Sanity, Webflow, or Next.js. From a single site to hundreds of location pages.",tag:"Web"},{title:"Search & Local Visibility",desc:"Listings, structured data, and local pages so people find you on Google, Maps, and the newer AI answer engines.",tag:"Search"},{title:"Expert Calls",desc:"Buyer-side and implementation perspective for investors and research teams on enterprise software, collaboration, identity, and website infrastructure.",tag:"Research"}];
const projects=[{name:"Local Visibility Audit",desc:"Free tool that scores a business across search, directories, reviews, and SEO basics, with competitor benchmarks.",tech:"Next.js",link:"/ai-audit"},{name:"Resume Coach",desc:"Upload a resume and a job description, get a hiring-manager style review with scores and the top fixes.",tech:"Next.js",link:"/resume-coach"},{name:"Multi Platform CMS Connector",desc:"One library for WordPress, Contentful, and Sanity APIs with a shared data model and sync.",tech:"Python",link:"https://github.com/holdenstirling/multi-platform-cms-connector"},{name:"Local Content Engine",desc:"CLI that generates location landing pages at scale and grades them automatically before publishing.",tech:"Python",link:"https://github.com/holdenstirling/claude-local-content-engine"},{name:"Search Quality Evaluator",desc:"Test harness for scoring site search results across six quality dimensions.",tech:"Python",link:"https://github.com/holdenstirling/ai-search-evaluator"}];
const techStack=[{cat:"Pre-Sales",items:["Discovery","Solution Design","POCs","RFPs","Exec Presentations"]},{cat:"Cloud",items:["AWS","Azure","Vercel","REST APIs"]},{cat:"Collaboration & Identity",items:["Microsoft Teams","Zoom","Digital Identity","E-Signature"]},{cat:"Web & CMS",items:["WordPress","Contentful","Sanity","Drupal","Webflow","Shopify"]},{cat:"Build",items:["Python","TypeScript","React","Next.js","Git"]},{cat:"Tools",items:["Jira","HubSpot","Slack"]}];
const speakingTopics=[{title:"The Rise of AI for Small Businesses",desc:"How local businesses can stay findable as search changes. Presented at Localogy L25.",tag:"Search"},{title:"Running a POC That Actually Decides Something",desc:"How buyers and vendors can stop running proofs of concept that end in \u201Clet\u2019s revisit next quarter.\u201D",tag:"Enterprise"},{title:"Building from Zero",desc:"What it actually looks like to build something from nothing. No playbook, no safety net, no plan B.",tag:"Founder"},{title:"Enterprise Implementation at Scale",desc:"Lessons from 50+ enterprise implementations.",tag:"Enterprise"},{title:"Mountains, Ironmans, and Business",desc:"What 5 Ironman finishes taught me about performing under pressure.",tag:"Personal"},{title:"Scaling Teams in Ambiguity",desc:"When nothing exists yet and you have to build the plane while flying it.",tag:"Leadership"}];
const TC:Record<string,string>={AI:"#C8956C",Founder:"#4ECDC4",Enterprise:"#6366F1",Personal:"#FF9800",Leadership:"#7DD87D",SEO:"#4ECDC4",Technical:"#6366F1",Business:"#7DD87D",Search:"#C8956C",Sales:"#C8956C",Advisory:"#6366F1",Web:"#4ECDC4",Research:"#7DD87D"};
const blogPosts=[{title:"Local Landing Pages for Multi Location SEO",desc:"High performing local pages across hundreds of locations.",tag:"SEO",slug:"local-landing-pages"},{title:"Website Architecture: A Complete Guide",desc:"Scalable website architecture for growing businesses.",tag:"Technical",slug:"website-architecture"},{title:"Search Implementation",desc:"A practical guide from planning to launch.",tag:"SEO",slug:"ai-search-implementation"},{title:"Client Retention at Scale",desc:"How we kept 96% of clients year over year.",tag:"Business",slug:"client-retention-at-scale"},{title:"From Startup to Enterprise",desc:"Lessons from scaling a company from nothing.",tag:"Business",slug:"scaling-strategies"},{title:"From Corporate to Co-Founder",desc:"Why I left a stable career to build something new.",tag:"Personal",slug:"yext-to-arc4"},{title:"Ironman: Lessons for Leaders",desc:"Consistency, resilience, and long term thinking.",tag:"Personal",slug:"ironman-business-lessons"},{title:"90 Days Solo Travel",desc:"15 countries. More than a decade of lessons.",tag:"Personal",slug:"90-days-solo-travel"}];
const testimonials=[{quote:"Arc4 has been an exceptional development partner. Their combination of technical skill, professionalism, and efficiency makes them one of the most dependable vendors we work with.",source:"Fortune 500 Retail Client",via:"G2"},{quote:"They made this project so easy, especially when I had multiple large projects moving at the same time. I knew I did not have to worry about deadlines.",source:"Enterprise Client",via:"G2"},{quote:"A vital partner rather than just a vendor. They come with recommendations to make our work easier, more accurate, and better for the end customer.",source:"Enterprise Client",via:"G2"},{quote:"They actively monitor, flag issues, and provide recommendations before problems arise. Communication is always prompt and clear.",source:"Enterprise Client",via:"G2"}];
const NAVS=["home","about","career","consulting","projects","speaking","blog","faq","contact"];

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
              {NAVS.map(s=><span key={s} onClick={()=>scrollTo(s)} style={{cursor:"pointer",fontSize:10.5,fontFamily:SN,fontWeight:500,color:"rgba(232,228,221,0.4)",letterSpacing:"0.04em",textTransform:"uppercase",transition:"color 0.2s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color=ACC} onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(232,228,221,0.4)"} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter")scrollTo(s)}}>{s}</span>)}
              <a href="https://github.com/holdenstirling" target="_blank" rel="noreferrer" style={{fontSize:10,fontFamily:SN,fontWeight:700,color:BG,background:ACC,padding:"5px 12px",borderRadius:5,textDecoration:"none"}}>GitHub</a>
            </div>
            <button className="mob-show" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen} style={{display:"none",background:"none",border:"none",cursor:"pointer",padding:8}}>
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
          <div style={{position:"relative",maxWidth:1100,margin:"0 auto",padding:"80px 24px 50px",width:"100%"}}>
            <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr auto",gap:50,alignItems:"center"}}>
              <div>
                <Rv><p style={{fontSize:11,fontFamily:SN,fontWeight:600,color:ACC,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:20}}>Senior Solutions Architect at Writer · Denver, CO</p></Rv>
                <Rv delay={100}><h1 style={{fontSize:"clamp(36px,6vw,68px)",fontWeight:400,lineHeight:1.05,margin:"0 0 18px",letterSpacing:"-0.02em",fontFamily:SF,color:TXT}}>I help big companies<br/>pick the right tech,<br/><It>then make it work.</It></h1></Rv>
                <Rv delay={200}><P style={{maxWidth:520,margin:"0 0 24px",fontSize:16}}>Ten years in enterprise pre-sales and delivery. Yext, then co-founding a systems integrator, now Writer. I sit with the customer’s architects, figure out what they actually need, and get it live. I also take on select consulting work.</P></Rv>
                <Rv delay={300}><div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <a href="mailto:holdenstirling@gmail.com" style={{padding:"11px 26px",borderRadius:6,background:ACC,color:BG,fontFamily:SN,fontSize:13,fontWeight:600,textDecoration:"none"}}>Get in Touch</a>
                  <span onClick={()=>scrollTo("consulting")} style={{padding:"11px 26px",borderRadius:6,border:`1px solid ${ACC}40`,color:ACC,fontFamily:SN,fontSize:13,fontWeight:500,cursor:"pointer"}} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter")scrollTo("consulting")}}>Work With Me</span>
                  <span onClick={()=>scrollTo("career")} style={{padding:"11px 26px",borderRadius:6,border:"1px solid rgba(232,228,221,0.1)",color:TXT,fontFamily:SN,fontSize:13,fontWeight:500,cursor:"pointer"}} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter")scrollTo("career")}}>My Background</span>
                </div></Rv>
              </div>
              <Rv delay={200}><div style={{width:200,height:200,borderRadius:"50%",overflow:"hidden",border:`3px solid ${ACC}30`,flexShrink:0}}>
                <Image src="/headshot.jpg" alt="Holden Stirling Ottolini, Senior Solutions Architect" width={200} height={200} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}} priority />
              </div></Rv>
            </div>
            <div className="g2" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,marginTop:36,background:FAINT,borderRadius:12,overflow:"hidden"}}>
              {metrics.map((m,i)=><Rv key={m.l} delay={400+i*80}><div style={{background:BG,padding:"24px 16px",textAlign:"center"}}><div style={{fontSize:30,color:ACC,fontFamily:SF}}>{m.n}</div><div style={{fontSize:10,fontFamily:SN,fontWeight:600,color:"rgba(232,228,221,0.55)",letterSpacing:"0.06em",textTransform:"uppercase",marginTop:3}}>{m.l}</div><div style={{fontSize:9,fontFamily:SN,color:"rgba(232,228,221,0.2)",marginTop:2}}>{m.s}</div></div></Rv>)}
            </div>
          </div>
        </header>

        <section id="about" style={{padding:"60px 24px",maxWidth:1100,margin:"0 auto"}}><Rv><Lbl>About</Lbl></Rv>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:50,alignItems:"start"}}>
            <div>
              <Rv delay={100}><H2>Buyer side, seller side, <It>builder side.</It></H2></Rv>
              <Rv delay={200}><P style={{marginBottom:14}}>My first business was a pumpkin stand in upstate Pennsylvania. I was 12. By college I had more ambition than grades and nearly didn't make it out. But something clicked, and I landed in NYC at Yext where I got promoted 5 times in 8 years, made President's Club, and worked on some of the largest deals in company history. Then I left to co-found a systems integrator and spent three years on the delivery side, building the team from zero to 17 people.</P></Rv>
              <Rv delay={300}><P>Now I'm back in pre-sales as a Senior Solutions Architect at Writer, covering enterprise accounts in the West. Having sold software, implemented it, and been the one stuck supporting it, I tend to ask the uncomfortable questions early. I still build things on the side because it keeps me honest. When I'm not working I'm usually training for my next Ironman, somewhere in the mountains, or planning the next trip.</P></Rv>
            </div>
            <Rv delay={200}><aside style={{background:"rgba(200,149,108,0.04)",border:"1px solid rgba(200,149,108,0.1)",borderRadius:14,padding:24}}>
              <h3 style={{fontSize:12,fontFamily:SN,fontWeight:700,color:ACC,marginBottom:14}}>Quick Facts</h3>
              {[["Current","Sr. Solutions Architect, Writer"],["Before","Co-Founder, Arc4"],["Yext","5 promotions, 8 years"],["President\u2019s Club","Multiple years"],["Ironman","5x finisher"],["Location","Denver, Colorado"],["Education","Binghamton University"]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${FAINT}`}}><span style={{fontSize:11,fontFamily:SN,color:"rgba(232,228,221,0.3)"}}>{k}</span><span style={{fontSize:11,fontFamily:SN,fontWeight:600,color:"rgba(232,228,221,0.7)"}}>{v}</span></div>)}
            </aside></Rv>
          </div>
        </section>

        <section style={{padding:"60px 24px 80px",background:BG2}}><div style={{maxWidth:1100,margin:"0 auto"}}><Rv><Lbl>Skills & Stack</Lbl><H2>What I <It>work with.</It></H2></Rv>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginTop:32}}>
            {techStack.map((g,i)=><Rv key={g.cat} delay={i*50}><div style={{background:BG,border:"1px solid rgba(232,228,221,0.05)",borderRadius:12,padding:"18px 16px"}}><h3 style={{fontSize:10,fontFamily:SN,fontWeight:700,color:ACC,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>{g.cat}</h3><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{g.items.map(item=><span key={item} style={{fontSize:10,fontFamily:SN,padding:"3px 8px",borderRadius:4,background:"rgba(232,228,221,0.04)",color:"rgba(232,228,221,0.55)",fontWeight:500}}>{item}</span>)}</div></div></Rv>)}
          </div>
        </div></section>

        <section id="career" style={{padding:"80px 24px"}}><div style={{maxWidth:1100,margin:"0 auto"}}><Rv><Lbl>Career</Lbl><H2>The <It>full story.</It></H2></Rv>
          {timeline.map((t,i)=><Rv key={i} delay={i*80}><div className="g2" style={{display:"grid",gridTemplateColumns:"170px 1fr",gap:28,padding:"24px 0",borderTop:`1px solid ${FAINT}`}}><div><time style={{fontSize:12,fontFamily:SN,fontVariantNumeric:'tabular-nums',color:ACC,fontWeight:600}}>{t.yr}</time><div style={{fontSize:10,fontFamily:SN,color:"rgba(232,228,221,0.25)",marginTop:3}}>{t.co} · {t.loc}</div></div><div><h3 style={{fontSize:19,fontWeight:400,margin:"0 0 10px",fontFamily:SF,color:TXT}}>{t.t}</h3>{t.pts.map((p,j)=><div key={j} style={{fontSize:12,fontFamily:SN,color:DIM,lineHeight:1.6,paddingLeft:12,position:"relative",marginBottom:4}}><span style={{position:"absolute",left:0,color:ACC}}>·</span>{p}</div>)}</div></div></Rv>)}
        </div></section>

        <section id="consulting" style={{padding:"80px 24px",background:BG2}}><div style={{maxWidth:1100,margin:"0 auto"}}>
          <Rv><Lbl>Consulting</Lbl><H2>Work <It>with me.</It></H2><P style={{maxWidth:560,margin:"0 0 36px"}}>I take on a handful of outside engagements at a time. If you&apos;re buying, selling, or building enterprise software and want someone who has been on all three sides, let&apos;s talk.</P></Rv>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:12}}>
            {services.map((t,i)=><Rv key={t.title} delay={i*50}><article style={{background:BG,border:"1px solid rgba(232,228,221,0.05)",borderRadius:12,padding:"20px 22px",height:"100%"}}><span style={{fontSize:9,fontFamily:SN,fontWeight:700,padding:"2px 8px",borderRadius:3,background:`${TC[t.tag]}15`,color:TC[t.tag],letterSpacing:"0.04em",textTransform:"uppercase"}}>{t.tag}</span><h3 style={{fontSize:17,fontWeight:400,margin:"10px 0 6px",fontFamily:SF,color:TXT}}>{t.title}</h3><P style={{fontSize:12,margin:0}}>{t.desc}</P></article></Rv>)}
          </div>
          <Rv delay={300}><div style={{marginTop:28,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}><a href="mailto:holdenstirling@gmail.com?subject=Consulting%20inquiry" style={{padding:"11px 26px",borderRadius:6,background:ACC,color:BG,fontFamily:SN,fontSize:13,fontWeight:600,textDecoration:"none"}}>Start a Conversation</a><span style={{fontSize:12,fontFamily:SN,color:"rgba(232,228,221,0.35)"}}>Hourly, project, or monthly retainer.</span></div></Rv>
        </div></section>

        <section id="projects" style={{padding:"80px 24px"}}><div style={{maxWidth:1100,margin:"0 auto"}}><Rv><Lbl>Side Projects</Lbl><H2>Things I&apos;ve <It>built.</It></H2><P style={{maxWidth:480,margin:"0 0 28px"}}>Small tools I build on nights and weekends. Most are open source.</P></Rv>
          <div>
            {projects.map((p,i)=>{const ext=p.link.startsWith("http");return <Rv key={p.name} delay={i*50}><a href={p.link} target={ext?"_blank":undefined} rel={ext?"noreferrer":undefined} style={{display:"grid",gridTemplateColumns:"1fr auto",gap:20,alignItems:"center",padding:"16px 0",borderTop:`1px solid ${FAINT}`,textDecoration:"none",color:"inherit"}}><div><h3 style={{fontSize:16,fontWeight:400,margin:"0 0 4px",fontFamily:SF,color:TXT}}>{p.name} <span style={{fontFamily:SN,fontSize:10,color:"rgba(232,228,221,0.3)",marginLeft:6}}>{p.tech}</span></h3><P style={{fontSize:12,margin:0}}>{p.desc}</P></div><span style={{fontSize:11,fontFamily:SN,fontWeight:600,color:ACC,whiteSpace:"nowrap"}}>{ext?"GitHub":"Try it"} {"\u2192"}</span></a></Rv>})}
          </div>
        </div></section>

        <section id="testimonials" style={{padding:"80px 24px",background:BG2}}><div style={{maxWidth:1100,margin:"0 auto"}}>
          <Rv><Lbl>Testimonials</Lbl><H2>What clients <It>say.</It></H2><P style={{maxWidth:480,margin:"0 0 36px"}}>From clients I delivered for as co-founder of Arc4, verified on G2.</P></Rv>
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
          <Rv><Lbl>Speaking</Lbl><H2>Available for <It>speaking.</It></H2><P style={{maxWidth:480,margin:"0 0 36px"}}>Localogy L25 speaker and podcast guest. Happy to talk enterprise sales, implementation, or endurance sports.</P></Rv>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:12}}>
            {speakingTopics.map((t,i)=><Rv key={t.title} delay={i*50}><article style={{background:BG,border:"1px solid rgba(232,228,221,0.05)",borderRadius:12,padding:"18px 20px"}}><span style={{fontSize:9,fontFamily:SN,fontWeight:700,padding:"2px 8px",borderRadius:3,background:`${TC[t.tag]}15`,color:TC[t.tag],letterSpacing:"0.04em",textTransform:"uppercase"}}>{t.tag}</span><h3 style={{fontSize:14,fontFamily:SN,fontWeight:700,margin:"8px 0 5px",color:"rgba(232,228,221,0.8)"}}>{t.title}</h3><P style={{fontSize:11,margin:0}}>{t.desc}</P></article></Rv>)}
          </div>
        </div></section>

        <section id="blog" style={{padding:"80px 24px",background:BG2}}><div style={{maxWidth:1100,margin:"0 auto"}}>
          <Rv><Lbl>Blog</Lbl><H2>Insights & <It>stories.</It></H2><P style={{maxWidth:480,margin:"0 0 36px"}}>Notes on search, websites, building a company, and lessons from the road.</P></Rv>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {blogPosts.map((p,i)=><Rv key={p.title} delay={i*40}><Link href={`/blog/${p.slug}`} style={{textDecoration:"none",color:"inherit"}}><HCard><span style={{fontSize:9,fontFamily:SN,fontWeight:700,padding:"2px 7px",borderRadius:3,background:`${TC[p.tag]}15`,color:TC[p.tag],letterSpacing:"0.04em",textTransform:"uppercase"}}>{p.tag}</span><h3 style={{fontSize:15,fontFamily:SN,fontWeight:600,margin:"8px 0 5px",color:"rgba(232,228,221,0.8)"}}>{p.title}</h3><P style={{fontSize:11,margin:0}}>{p.desc}</P><div style={{marginTop:10,fontSize:11,fontFamily:SN,fontWeight:600,color:ACC}}>Read {"\u2192"}</div></HCard></Link></Rv>)}
          </div>
        </div></section>

        <section id="faq" style={{padding:"80px 24px"}}><div style={{maxWidth:740,margin:"0 auto"}}>
          <Rv><Lbl>FAQ</Lbl><H2>Frequently <It>asked.</It></H2><P style={{margin:"0 0 32px"}}>Quick answers about my work, consulting, and background.</P></Rv>
          {faqData.map((f,i)=><Rv key={i} delay={i*30}><FaqItem q={f.q} a={f.a}/></Rv>)}
        </div></section>

        <section id="contact" style={{padding:"90px 24px 50px",maxWidth:1100,margin:"0 auto"}}><Rv>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:50,alignItems:"center"}}>
            <div>
              <Lbl>Contact</Lbl><H2>Let's <It>talk.</It></H2>
              <P style={{maxWidth:380}}>Consulting, expert calls, speaking, or just comparing notes on enterprise software or the mountains. Email is fastest.</P>
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
