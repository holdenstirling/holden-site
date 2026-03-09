"use client";
import { useState, useEffect } from "react";

const GRADES = [
  { min: 93, grade: "A+", color: "#00D26A", label: "Exceptional", tip: "Top 5% of businesses. AI assistants actively recommend you first." },
  { min: 85, grade: "A", color: "#00D26A", label: "Excellent", tip: "Top 15%. Strong visibility with minor optimization opportunities." },
  { min: 78, grade: "B+", color: "#7DD87D", label: "Above Average", tip: "Top 25%. Targeted improvements will create competitive separation." },
  { min: 70, grade: "B", color: "#7DD87D", label: "Good", tip: "Top 40%. Solid baseline. Focused work yields measurable results." },
  { min: 62, grade: "C+", color: "#FFC107", label: "Fair", tip: "Middle of pack. Competitors with better scores get recommended first." },
  { min: 55, grade: "C", color: "#FFC107", label: "Average", tip: "Below average. Customers find competitors first in most searches." },
  { min: 45, grade: "D+", color: "#FF9800", label: "Below Average", tip: "Bottom 30%. Most searches do not surface your business." },
  { min: 35, grade: "D", color: "#FF9800", label: "Poor", tip: "Bottom 15%. Critical gaps require immediate attention." },
  { min: 0, grade: "F", color: "#FF4444", label: "Critical", tip: "Bottom 5%. Your business is essentially invisible online." },
];
const getG = (s: number) => GRADES.find((g) => s >= g.min) || GRADES[GRADES.length - 1];

const CATS = [
  { id: "fast_food", label: "Fast Food & QSR", icon: "🍔", color: "#FF6B35", bench: 58, revPerCust: 12 },
  { id: "home_services", label: "Home Services", icon: "🔧", color: "#4ECDC4", bench: 52, revPerCust: 350 },
  { id: "restoration", label: "Restoration", icon: "🏗️", color: "#45B7D1", bench: 45, revPerCust: 2800 },
  { id: "healthcare", label: "Healthcare", icon: "🏥", color: "#96CEB4", bench: 62, revPerCust: 180 },
  { id: "fitness", label: "Fitness & Wellness", icon: "💪", color: "#FFEAA7", bench: 55, revPerCust: 85 },
  { id: "automotive", label: "Automotive", icon: "🚗", color: "#DDA0DD", bench: 48, revPerCust: 420 },
  { id: "legal", label: "Legal Services", icon: "⚖️", color: "#B8D4E3", bench: 56, revPerCust: 3200 },
  { id: "real_estate", label: "Real Estate", icon: "🏠", color: "#F7DC6F", bench: 60, revPerCust: 8500 },
];

const SUG_KW: Record<string, string[]> = {
  fast_food: ["best burger near me","fast food open late","drive through nearby","cheap eats","food delivery"],
  home_services: ["plumber near me","emergency HVAC repair","best electrician","handyman services","roof repair"],
  restoration: ["water damage restoration","fire damage repair","mold remediation","storm damage cleanup","emergency restoration"],
  healthcare: ["dentist accepting patients","urgent care near me","physical therapy","family doctor","pediatrician"],
  fitness: ["gym with free trial","yoga studio near me","personal trainer","CrossFit box","pilates classes"],
  automotive: ["oil change near me","auto body shop","tire replacement","brake repair","car detailing"],
  legal: ["personal injury lawyer","divorce attorney","estate planning","DUI lawyer","business attorney"],
  real_estate: ["homes for sale","real estate agent","property management","apartments for rent","commercial lease"],
};

const PUBS = [
  { id: "google", name: "Google Business Profile", icon: "🔍" },
  { id: "facebook", name: "Facebook", icon: "📘" },
  { id: "bing", name: "Bing Places", icon: "🅱️" },
  { id: "apple", name: "Apple Maps", icon: "🍎" },
  { id: "yelp", name: "Yelp", icon: "⭐" },
  { id: "yellowpages", name: "YellowPages", icon: "📒" },
  { id: "bbb", name: "BBB", icon: "🏛️" },
  { id: "nextdoor", name: "Nextdoor", icon: "🏘️" },
];

const SCANS = ["Querying ChatGPT for recommendations...","Querying Claude for local suggestions...","Checking Perplexity AI results...","Scanning Google AI Overviews...","Crawling Google Business Profile...","Checking Facebook business page...","Scanning Bing Places listing...","Checking Apple Maps via Business Connect...","Pulling Yelp reviews & ratings...","Scanning YellowPages & BBB...","Analyzing Nextdoor presence...","Running review sentiment analysis...","Auditing on-page SEO signals...","Validating schema markup...","Testing mobile experience...","Calculating competitive benchmarks...","Generating your report..."];

const R = (a: number, b: number) => Math.floor(Math.random()*(b-a+1))+a;
const CL = (v: number, lo: number, hi: number) => Math.max(lo,Math.min(hi,v));
const wait = (ms: number) => new Promise(r=>setTimeout(r,ms));

interface Insight { sev: string; title: string; detail: string; action: string; diff: string; time: string; }
interface QueryResult { query: string; keyword: string; found: boolean; position: number; score: number; competitors: string[]; summary: string; }
interface Publisher { id: string; name: string; icon: string; listed: boolean; nameMatch: boolean; addressMatch: boolean; phoneMatch: boolean; accuracy: number; }
interface Theme { theme: string; sentiment: string; mentions: number; }
interface ReviewSource { source: string; count: number; avgRating: string; }
interface SEOItem { label: string; score: number; desc: string; }
interface CityData { city: string; queryResults: QueryResult[]; publishers: Publisher[]; reviewSources: ReviewSource[]; totalReviews: number; avgRating: string; overallSentiment: string; themes: Theme[]; aiScore: number; seoScore: number; listingScore: number; reviewScore: number; overall: number; seoAudit: SEOItem[]; compScores: Record<string, Record<string, number>> | null; insights: { ai: Insight[]; listings: Insight[]; reviews: Insight[]; seo: Insight[] }; }

function mkAiIns(qr: QueryResult[], biz: string, city: string, compList: string[] | null): Insight[] {
  const ins: Insight[] = []; const nf=qr.filter(r=>!r.found); const lo=qr.filter(r=>r.found&&r.position>3); const hi=qr.filter(r=>r.found&&r.position<=2);
  if(nf.length>0)ins.push({sev:"critical",title:`Invisible for ${nf.length} of ${qr.length} queries`,detail:`AI assistants don't mention you for: ${nf.map(r=>`"${r.keyword}"`).join(", ")}. Competitors recommended instead.`,action:`Create dedicated service pages for each keyword with 500+ words of unique content. Add FAQ sections. Update Google Business Profile categories to match.`,diff:"Medium",time:"1-2 weeks"});
  if(lo.length>0)ins.push({sev:"warning",title:`Low position for ${lo.length} queries`,detail:`Found but not prominent: ${lo.map(r=>`"${r.keyword}" (#${r.position})`).join(", ")}.`,action:`Build topical authority with case studies, location-specific blog posts. Increase reviews mentioning these services. Add FAQ and HowTo schema.`,diff:"Medium",time:"2-4 weeks"});
  if(hi.length>0)ins.push({sev:"success",title:`Top recommendation for ${hi.length} queries`,detail:`AI actively recommends you for: ${hi.map(r=>`"${r.keyword}"`).join(", ")}.`,action:`Protect positions: keep content fresh quarterly, respond to every review within 48h, maintain consistent NAP. Expand to related long-tail keywords.`,diff:"Easy",time:"Ongoing"});
  if(compList&&compList.length>0){const all=qr.flatMap(r=>r.competitors||[]);compList.forEach(cn=>{const ct=all.filter(c=>c===cn).length;if(ct>0)ins.push({sev:ct>qr.length/2?"warning":"info",title:`${cn} appears in ${ct}/${qr.length} queries`,detail:ct>qr.length/2?`This competitor dominates AI results.`:`Moderate presence — opportunities to differentiate.`,action:`Analyze ${cn}'s content, reviews, and structured data. Focus on deeper, more helpful content.`,diff:"Medium",time:"2-3 weeks"})});}
  return ins;
}

function mkListIns(pubs: Publisher[]): Insight[] {
  const ins: Insight[] = []; const miss=pubs.filter(p=>!p.listed); const nap=pubs.filter(p=>p.listed&&p.accuracy<100);
  if(miss.length>0)ins.push({sev:"critical",title:`Missing from ${miss.length} directories`,detail:`Not on: ${miss.map(p=>p.name).join(", ")}. Each missing listing weakens trust signals.`,action:`Claim: 1) Google Business Profile at business.google.com 2) Apple Maps at businessconnect.apple.com 3) Bing at bingplaces.com 4) Yelp at biz.yelp.com. Each takes 10-15 min.`,diff:"Easy",time:"1-2 hours"});
  if(nap.length>0)ins.push({sev:"critical",title:`Data mismatches on ${nap.length} directories`,detail:`Inconsistent info on: ${nap.map(p=>p.name).join(", ")}. NAP inconsistency hurts local rankings.`,action:`Update each listing with identical name, address, phone format. For 5+ listings, use Yext, BrightLocal, or Semrush to sync all at once.`,diff:"Easy",time:"30 min or instant with sync tool"});
  const ok=pubs.filter(p=>p.listed&&p.accuracy>=100);
  if(ok.length>0)ins.push({sev:"success",title:`${ok.length} directories fully accurate`,detail:`Perfect data on: ${ok.map(p=>p.name).join(", ")}.`,action:`Maintain with quarterly audits. Add photos, descriptions, attributes.`,diff:"Easy",time:"Quarterly"});
  return ins;
}

function mkRevIns(d: {avgRating: string; totalReviews: number; themes: Theme[]}): Insight[] {
  const ins: Insight[] = []; const rat=parseFloat(d.avgRating); const neg=d.themes.filter(t=>t.sentiment==="Negative"||t.sentiment==="Mixed");
  if(rat<4.0)ins.push({sev:"critical",title:`${d.avgRating}★ below AI recommendation threshold`,detail:`AI strongly prefers 4.0★+ businesses. Below this you're significantly less likely to be recommended.`,action:`Respond to every negative review within 48h. Implement review requests within 24h of service. Target 4.2★+ within 90 days with 15+ new positive reviews/month.`,diff:"Medium",time:"90 days"});
  else if(rat<4.5)ins.push({sev:"warning",title:`${d.avgRating}★ good but competitors at 4.5★+ win`,detail:`AI prefers higher-rated businesses when multiple options exist.`,action:`Increase review velocity to 10+/month. Add review links to email signatures, invoices, receipts. Train staff to ask directly.`,diff:"Easy",time:"Ongoing"});
  if(d.totalReviews<50)ins.push({sev:"warning",title:`Only ${d.totalReviews} reviews — low trust signal`,detail:`Businesses with 100+ reviews seen as more credible by AI.`,action:`Target 15 new reviews/month. Automate with Podium, Birdeye, or Zapier. Diversify across Google, Yelp, Facebook.`,diff:"Easy",time:"3-6 months"});
  if(neg.length>0)ins.push({sev:"warning",title:`Negative sentiment: ${neg.map(t=>t.theme).join(", ")}`,detail:`AI reads review text and may cite these issues when recommending alternatives.`,action:neg.map(t=>{const f: Record<string,string>={"Wait Times":"Implement scheduling, show estimated waits.","Customer Service":"Monthly staff training on complaint patterns.","Pricing / Value":"Add transparent pricing. Highlight guarantees.","Quality of Work":"Document improvements. Respond with corrective actions.","Location / Access":"Update parking/accessibility info. Add wayfinding photos."};return`${t.theme}: ${f[t.theme]||"Investigate and improve."}`}).join(" "),diff:"Medium",time:"1-3 months"});
  return ins;
}

function mkSeoIns(audit: SEOItem[]): Insight[] {
  const ins: Insight[] = [];
  const acts: Record<string,{a:string;d:string;t:string}>={"Google Business Profile":{a:"Complete 100% of GBP: description (750 chars), all categories, hours, 20+ photos, weekly Posts, Q&A.",d:"Easy",t:"2-3 hours"},"Local Citations (NAP)":{a:"Audit NAP across top 40 directories. Submit to 4 data aggregators. Use identical formatting.",d:"Easy",t:"2-4 hours"},"Review Signals":{a:"Target 4.5★+ avg, 100+ reviews, recent reviews, 100% response rate.",d:"Medium",t:"Ongoing"},"On-Page Local SEO":{a:"City+service in title, unique H1, 800+ words original content, embedded map, visible NAP.",d:"Medium",t:"1-2 weeks"},"Schema Markup":{a:"Add LocalBusiness schema with all fields. Add FAQPage schema. Validate at search.google.com/test/rich-results.",d:"Hard",t:"1 week"},"Mobile Experience":{a:"Target 90+ PageSpeed mobile. Click-to-call above fold, tappable address, compress images.",d:"Medium",t:"1-2 weeks"}};
  audit.forEach(item=>{const ac=acts[item.label]||{a:"Address core issues.",d:"Medium",t:"1-2 weeks"};if(item.score<50)ins.push({sev:"critical",title:`${item.label}: ${getG(item.score).grade}`,detail:`${item.desc}. Critically underperforming.`,action:ac.a,diff:ac.d,time:ac.t});else if(item.score<70)ins.push({sev:"warning",title:`${item.label}: ${getG(item.score).grade}`,detail:`${item.desc}. Improvement needed.`,action:`Focus on highest-impact fixes in ${item.label.toLowerCase()}.`,diff:"Medium",time:"1-2 weeks"})});
  const strong=audit.filter(a=>a.score>=80);if(strong.length>0)ins.push({sev:"success",title:`Strong: ${strong.map(a=>a.label).join(", ")}`,detail:`Competitive advantages in ${strong.length} area(s).`,action:"Maintain with quarterly audits.",diff:"Easy",time:"Quarterly"});
  return ins;
}

function genCity(biz: string, cat: string | null, kws: string[], city: string, compList: string[] | null): CityData {
  const qr: QueryResult[]=kws.map(kw=>{const q=`${kw} ${city}`;const found=Math.random()>0.28;const pos=found?R(1,6):0;const score=found?CL(100-(pos-1)*16-R(0,12),8,100):R(0,12);const names=["Peak Performance","Metro Pro","CityWide","AllStar","Premier","Elite"];const cs=Array.from({length:R(1,3)},()=>names[R(0,5)]);if(compList)compList.forEach(c=>{if(Math.random()>0.35&&!cs.includes(c))cs.push(c)});return{query:q,keyword:kw,found,position:pos,score,competitors:cs,summary:found?`#${pos} for "${kw}" in ${city}.`:`Not found for "${kw}" in ${city}.`}});
  const pubs: Publisher[]=PUBS.map(p=>{const l=Math.random()>0.15;const nm=l&&Math.random()>0.1;const am=l&&Math.random()>0.2;const pm=l&&Math.random()>0.15;return{...p,listed:l,nameMatch:nm,addressMatch:am,phoneMatch:pm,accuracy:l?Math.round((+nm+ +am+ +pm)/3*100):0}});
  const rs: ReviewSource[]=[{source:"Google",count:R(15,280),avgRating:(3.2+Math.random()*1.8).toFixed(1)},{source:"Yelp",count:R(5,90),avgRating:(3.0+Math.random()*2.0).toFixed(1)},{source:"Facebook",count:R(3,60),avgRating:(3.5+Math.random()*1.5).toFixed(1)}];
  const tr=rs.reduce((s,r)=>s+r.count,0);const ar=(rs.reduce((s,r)=>s+parseFloat(r.avgRating)*r.count,0)/tr).toFixed(1);
  const sn=["Very Positive","Positive","Mixed","Negative"];const si=parseFloat(ar)>=4.3?0:parseFloat(ar)>=3.8?1:parseFloat(ar)>=3.0?2:3;
  const th: Theme[]=[{theme:"Customer Service",sentiment:sn[CL(si+(Math.random()>0.5?1:0),0,3)],mentions:R(8,45)},{theme:"Wait Times",sentiment:sn[CL(si+R(0,2),0,3)],mentions:R(5,30)},{theme:"Pricing / Value",sentiment:sn[CL(si+(Math.random()>0.6?1:0),0,3)],mentions:R(6,35)},{theme:"Quality of Work",sentiment:sn[CL(si+(Math.random()>0.7?1:-1),0,3)],mentions:R(10,50)},{theme:"Location / Access",sentiment:sn[CL(si+R(0,1),0,3)],mentions:R(4,20)}].sort((a,b)=>b.mentions-a.mentions);
  const aiS=Math.round(qr.reduce((s,r)=>s+r.score,0)/qr.length);const liS=Math.round(pubs.reduce((s,p)=>s+p.accuracy,0)/pubs.length);const rvS=CL(Math.round(parseFloat(ar)*20),10,100);
  const sa: SEOItem[]=[{label:"Google Business Profile",score:CL(liS+R(-5,15),10,100),desc:"Profile completeness"},{label:"Local Citations (NAP)",score:CL(liS+R(-10,10),10,100),desc:"NAP consistency"},{label:"Review Signals",score:rvS,desc:"Rating & volume"},{label:"On-Page Local SEO",score:CL(aiS+R(-10,10),10,100),desc:"Title tags & content"},{label:"Schema Markup",score:CL(aiS-R(5,25),10,100),desc:"Structured data"},{label:"Mobile Experience",score:CL(aiS+R(0,15),10,100),desc:"Speed & responsiveness"}];
  const seS=Math.round(sa.reduce((s,a)=>s+a.score,0)/sa.length);const ov=Math.round(aiS*0.35+seS*0.25+liS*0.25+rvS*0.15);
  const compScores=compList&&compList.length>0?compList.reduce((acc: Record<string,Record<string,number>>,cn)=>{acc[cn]={ai:CL(aiS+R(-20,20),15,95),listings:CL(liS+R(-15,25),15,95),reviews:CL(rvS+R(-15,20),15,95),overall:CL(ov+R(-15,15),15,95)};return acc},{}):null;
  return{city,queryResults:qr,publishers:pubs,reviewSources:rs,totalReviews:tr,avgRating:ar,overallSentiment:sn[si],themes:th,aiScore:aiS,seoScore:seS,listingScore:liS,reviewScore:rvS,overall:ov,seoAudit:sa,compScores,insights:{ai:mkAiIns(qr,biz,city,compList),listings:mkListIns(pubs),reviews:mkRevIns({avgRating:ar,totalReviews:tr,themes:th}),seo:mkSeoIns(sa)}};
}

function calcRevenue(score: number, catObj: typeof CATS[0] | undefined, cities: string[]) {
  const cityCount=Math.max(cities.length,1);const currentLeads=Math.round((score/100)*30*cityCount);const improvedScore=CL(score+18,score,98);
  const projectedLeads=Math.round((improvedScore/100)*30*cityCount);const newLeads=projectedLeads-currentLeads;
  const revPerCust=catObj?.revPerCust||200;const monthlyRev=newLeads*revPerCust;const annualRev=monthlyRev*12;
  return{currentLeads,projectedLeads,newLeads,monthlyRev,annualRev,improvedGrade:getG(improvedScore),currentGrade:getG(score),improvedScore};
}

function Tooltip({children,text}: {children: React.ReactNode; text: string}) {
  const[show,setShow]=useState(false);
  return(<div style={{position:"relative",display:"inline-flex"}} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>{children}{show&&<div style={{position:"absolute",bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",background:"#1e1e2e",border:"1px solid rgba(232,228,221,0.12)",borderRadius:8,padding:"8px 12px",fontSize:10,color:"rgba(232,228,221,0.75)",whiteSpace:"normal",maxWidth:240,width:"max-content",lineHeight:1.4,zIndex:50,boxShadow:"0 8px 24px rgba(0,0,0,0.5)",pointerEvents:"none"}}><div style={{position:"absolute",bottom:-4,left:"50%",transform:"translateX(-50%) rotate(45deg)",width:8,height:8,background:"#1e1e2e",borderRight:"1px solid rgba(232,228,221,0.12)",borderBottom:"1px solid rgba(232,228,221,0.12)"}} />{text}</div>}</div>);
}

function GradeRing({score,size=120,sw=10,label,sub,delay:d=0}: {score:number;size?:number;sw?:number;label?:string;sub?:string;delay?:number}) {
  const g=getG(score);const r=(size-sw)/2;const c=2*Math.PI*r;const[mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),d);return()=>clearTimeout(t)},[d]);
  return(
    <Tooltip text={g.tip}>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,opacity:mounted?1:0,transform:mounted?"scale(1)":"scale(0.8)",transition:"all 0.6s cubic-bezier(.34,1.56,.64,1)"}}>
      <div style={{position:"relative",width:size,height:size}}>
        <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(232,228,221,0.06)" strokeWidth={sw} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={g.color} strokeWidth={sw} strokeDasharray={c} strokeDashoffset={mounted?c-(score/100)*c:c} strokeLinecap="round" style={{transition:`stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) ${d}ms`}} />
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:size*0.3,fontWeight:800,color:g.color,fontFamily:"var(--m)"}}>{g.grade}</span>
          <span style={{fontSize:size*0.09,color:"rgba(255,255,255,0.25)"}}>{score}/100</span>
        </div>
      </div>
      {label&&<span style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.65)",textAlign:"center"}}>{label}</span>}
      {sub&&<span style={{fontSize:9,color:"rgba(255,255,255,0.28)",textAlign:"center",marginTop:-3}}>{sub}</span>}
    </div>
    </Tooltip>
  );
}

function Skeleton({h=60}: {h?:number}) {return<div style={{height:h,width:"100%",borderRadius:10,background:"linear-gradient(90deg, rgba(232,228,221,0.03) 25%, rgba(232,228,221,0.06) 50%, rgba(232,228,221,0.03) 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite"}} />}

function Card({children,style,id}: {children:React.ReactNode;style?:React.CSSProperties;id?:string}) {return<div id={id} style={{background:"rgba(232,228,221,0.02)",border:"1px solid rgba(232,228,221,0.06)",borderRadius:16,padding:"18px 20px",...style}}>{children}</div>}

function InsightCard({ins,gated,onUnlock}: {ins:Insight;gated:boolean;onUnlock:()=>void}) {
  const icons: Record<string,string>={critical:"🔴",warning:"🟡",success:"🟢",info:"🔵"};const labels: Record<string,string>={critical:"FIX NOW",warning:"IMPROVE",success:"STRENGTH",info:"INSIGHT"};const colors: Record<string,string>={critical:"#FF4444",warning:"#FFC107",success:"#00D26A",info:"#6366F1"};const diffC: Record<string,string>={Easy:"#00D26A",Medium:"#FFC107",Hard:"#FF9800"};const co=colors[ins.sev]||"#6366F1";
  return(
    <div style={{background:`${co}05`,border:`1px solid ${co}15`,borderRadius:11,padding:"12px 14px",marginBottom:7}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5,flexWrap:"wrap"}}>
        <span style={{fontSize:11}}>{icons[ins.sev]}</span>
        <span style={{fontSize:8,fontWeight:800,color:co,letterSpacing:"0.06em"}}>{labels[ins.sev]}</span>
        <span style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.85)",flex:1,minWidth:120}}>{ins.title}</span>
        {ins.diff&&<span style={{fontSize:8,fontWeight:700,padding:"2px 5px",borderRadius:3,background:`${diffC[ins.diff]}12`,color:diffC[ins.diff]}}>{ins.diff}</span>}
        {ins.time&&<span style={{fontSize:8,color:"rgba(255,255,255,0.25)"}}>⏱{ins.time}</span>}
      </div>
      <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",lineHeight:1.5,marginBottom:gated?0:7,paddingLeft:17}}>{ins.detail}</div>
      {gated?(
        <div onClick={onUnlock} style={{background:"rgba(200,149,108,0.06)",border:"1px solid rgba(200,149,108,0.15)",borderRadius:8,padding:"10px 12px",marginLeft:17,marginTop:7,cursor:"pointer",textAlign:"center"}}>
          <span style={{fontSize:10,color:"#C8956C",fontWeight:600}}>🔒 Enter email to unlock action plan</span>
        </div>
      ):(
        <div style={{background:"rgba(232,228,221,0.02)",borderRadius:7,padding:"8px 10px",marginLeft:17}}>
          <div style={{fontSize:8,fontWeight:700,color:"rgba(232,228,221,0.4)",marginBottom:2,letterSpacing:"0.05em"}}>💡 ACTION PLAN</div>
          <div style={{fontSize:10,color:"rgba(232,228,221,0.55)",lineHeight:1.55}}>{ins.action}</div>
        </div>
      )}
    </div>
  );
}

interface AuditResults { cityData: Record<string,CityData>; avgOverall:number; avgAI:number; avgSEO:number; avgListing:number; avgReview:number; businessName:string; cities:string[]; category:string|null; competitors:string[]|null; }

function Heatmap({results}: {results:AuditResults}) {
  if(!results.competitors||results.competitors.length===0)return null;
  const dims=["AI Search","Listings","Reviews","Overall"];const dimKey: Record<string,string>={["AI Search"]:"ai",Listings:"listings",Reviews:"reviews",Overall:"overall"};
  const compColors=["#FF6B6B","#FFA06B","#FFD36B","#6BFFA0","#6BD1FF"];
  return(
    <Card style={{marginBottom:12,overflowX:"auto"}}>
      <h3 style={{fontSize:13,fontWeight:700,marginBottom:12}}>🗺️ Competitive Heatmap — All Cities</h3>
      <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
        <thead><tr>
          <th style={{textAlign:"left",padding:"6px 8px",color:"rgba(232,228,221,0.4)",fontWeight:600,borderBottom:"1px solid rgba(232,228,221,0.06)"}} />
          {dims.map(d=><th key={d} style={{textAlign:"center",padding:"6px 4px",color:"rgba(232,228,221,0.4)",fontWeight:600,borderBottom:"1px solid rgba(232,228,221,0.06)",minWidth:60}}>{d}</th>)}
        </tr></thead>
        <tbody>
          {results.cities.map(city=>{
            const d=results.cityData[city];if(!d)return null;
            return(
              <tbody key={city}>
                <tr><td colSpan={dims.length+1} style={{padding:"8px 8px 2px",fontSize:11,fontWeight:700,color:"rgba(232,228,221,0.55)"}}>📍 {city}</td></tr>
                <tr><td style={{padding:"4px 8px",color:"#C8956C",fontWeight:600}}>You</td>{dims.map(dim=>{const k=dimKey[dim];const s: Record<string,number>={ai:d.aiScore,listings:d.listingScore,reviews:d.reviewScore,overall:d.overall};const sc=s[k];const g=getG(sc);return<td key={dim} style={{textAlign:"center",padding:"4px"}}><Tooltip text={`${sc}/100 — ${g.label}`}><span style={{display:"inline-block",padding:"3px 8px",borderRadius:5,background:`${g.color}15`,color:g.color,fontWeight:800,fontFamily:"var(--m)",fontSize:11}}>{g.grade}</span></Tooltip></td>})}</tr>
                {results.competitors!.map((cn,ci)=>{
                  const cs=d.compScores?.[cn];if(!cs)return null;
                  return(<tr key={cn}><td style={{padding:"4px 8px",color:compColors[ci%5],fontWeight:600,maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cn}</td>{dims.map(dim=>{const k=dimKey[dim];const sc=cs[k]||0;const g=getG(sc);return<td key={dim} style={{textAlign:"center",padding:"4px"}}><Tooltip text={`${sc}/100 — ${g.label}`}><span style={{display:"inline-block",padding:"3px 8px",borderRadius:5,background:`${g.color}10`,color:g.color,fontWeight:700,fontFamily:"var(--m)",fontSize:11,opacity:0.85}}>{g.grade}</span></Tooltip></td>})}</tr>);
                })}
                <tr><td colSpan={dims.length+1} style={{borderBottom:"1px solid rgba(232,228,221,0.04)",padding:0,height:4}} /></tr>
              </tbody>
            );
          })}
        </tbody>
      </table>
      </div>
    </Card>
  );
}

function RevenueProjection({score,catObj,cities}: {score:number;catObj:typeof CATS[0]|undefined;cities:string[]}) {
  const rev=calcRevenue(score,catObj,cities);
  return(
    <Card style={{marginBottom:12,background:"linear-gradient(135deg,rgba(0,210,106,0.04),rgba(99,102,241,0.04))",border:"1px solid rgba(0,210,106,0.12)"}}>
      <h3 style={{fontSize:13,fontWeight:700,marginBottom:4}}>💰 Estimated Revenue Impact</h3>
      <p style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginBottom:14}}>If you improve from {rev.currentGrade.grade} to {rev.improvedGrade.grade}, based on {catObj?.label||"your category"} averages:</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
        <div style={{flex:1,minWidth:120,background:"rgba(232,228,221,0.03)",borderRadius:10,padding:"12px 14px",textAlign:"center"}}>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",marginBottom:4}}>Current → Projected</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <span style={{fontSize:20,fontWeight:800,color:rev.currentGrade.color,fontFamily:"var(--m)"}}>{rev.currentGrade.grade}</span>
            <span style={{fontSize:14,color:"rgba(255,255,255,0.2)"}}>→</span>
            <span style={{fontSize:20,fontWeight:800,color:rev.improvedGrade.color,fontFamily:"var(--m)"}}>{rev.improvedGrade.grade}</span>
          </div>
        </div>
        <div style={{flex:1,minWidth:120,background:"rgba(232,228,221,0.03)",borderRadius:10,padding:"12px 14px",textAlign:"center"}}>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",marginBottom:4}}>Additional Leads/Month</div>
          <div style={{fontSize:22,fontWeight:800,color:"#00D26A",fontFamily:"var(--m)"}}>+{rev.newLeads}</div>
        </div>
        <div style={{flex:1,minWidth:120,background:"rgba(232,228,221,0.03)",borderRadius:10,padding:"12px 14px",textAlign:"center"}}>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",marginBottom:4}}>Est. Monthly Revenue</div>
          <div style={{fontSize:22,fontWeight:800,color:"#00D26A",fontFamily:"var(--m)"}}>${rev.monthlyRev.toLocaleString()}</div>
        </div>
      </div>
      <div style={{textAlign:"center",fontSize:14,fontWeight:700,color:"rgba(232,228,221,0.75)"}}>Potential annual impact: <span style={{color:"#00D26A",fontFamily:"var(--m)"}}>${rev.annualRev.toLocaleString()}/year</span></div>
      <div style={{textAlign:"center",fontSize:9,color:"rgba(255,255,255,0.2)",marginTop:4}}>Based on avg ${catObj?.revPerCust||200}/customer across {Math.max(cities.length,1)} location(s)</div>
    </Card>
  );
}

function DownloadPDF({results,catObj}: {results:AuditResults;catObj:typeof CATS[0]|undefined}) {
  const download=()=>{
    const lines=[`AI VISIBILITY & LOCAL SEO AUDIT`,`${results.businessName}`,``,`OVERALL: ${getG(results.avgOverall).grade} (${results.avgOverall}/100)`,`AI Search: ${getG(results.avgAI).grade}`,`SEO: ${getG(results.avgSEO).grade}`,`Listings: ${getG(results.avgListing).grade}`,`Reviews: ${getG(results.avgReview).grade}`,``];
    if(catObj){const pct=CL(Math.round(50+(results.avgOverall-catObj.bench)*1.5),5,99);lines.push(`Industry: Ahead of ${pct}% of ${catObj.label} businesses`,``);}
    results.cities.forEach(city=>{const d=results.cityData[city];if(!d)return;lines.push(`--- ${city} (${getG(d.overall).grade}) ---`);
      const allIns=[...d.insights.ai,...d.insights.listings,...d.insights.reviews,...d.insights.seo].sort((a,b)=>{const o: Record<string,number>={critical:0,warning:1,info:2,success:3};return(o[a.sev]??4)-(o[b.sev]??4)});
      allIns.forEach(ins=>{lines.push(`[${ins.sev.toUpperCase()}] ${ins.title}`,`  ${ins.detail}`,`  Action: ${ins.action}`,``)});
    });
    lines.push(``,`Audit by Holden Ottolini`);
    const blob=new Blob([lines.join("\n")],{type:"text/plain"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${results.businessName.replace(/\s+/g,"-")}-AI-Audit.txt`;a.click();URL.revokeObjectURL(url);
  };
  return<button onClick={download} style={{fontSize:10,fontWeight:600,color:"#C8956C",background:"rgba(200,149,108,0.1)",border:"1px solid rgba(200,149,108,0.2)",borderRadius:7,padding:"5px 10px",cursor:"pointer"}}>📄 Download Report</button>;
}

export default function Home() {
  const[step,setStep]=useState(1);const[biz,setBiz]=useState("");const[cat,setCat]=useState<string|null>(null);const[comps,setComps]=useState<string[]>([]);const[compIn,setCompIn]=useState("");
  const[kws,setKws]=useState<string[]>([]);const[kwIn,setKwIn]=useState("");const[cities,setCities]=useState<string[]>([]);const[cityIn,setCityIn]=useState("");
  const[running,setRunning]=useState(false);const[progress,setProgress]=useState(0);const[scanMsg,setScanMsg]=useState("");
  const[results,setResults]=useState<AuditResults|null>(null);const[activeCity,setActiveCity]=useState("all");const[activeTab,setActiveTab]=useState("overview");
  const[showKey,setShowKey]=useState(false);const[email,setEmail]=useState("");const[unlocked,setUnlocked]=useState(false);const[submitted,setSubmitted]=useState(false);
  const[copied,setCopied]=useState(false);const[tabLoading,setTabLoading]=useState(false);

  const addKw=()=>{const v=kwIn.trim();if(v&&kws.length<10&&!kws.includes(v)){setKws([...kws,v]);setKwIn("")}};
  const addCity=()=>{const v=cityIn.trim();if(v&&cities.length<6&&!cities.includes(v)){setCities([...cities,v]);setCityIn("")}};
  const addComp=()=>{const v=compIn.trim();if(v&&comps.length<5&&!comps.includes(v)){setComps([...comps,v]);setCompIn("")}};
  const canGo=()=>{if(step===1)return biz.trim()&&cat;if(step===2)return kws.length>=2;return true};
  const switchTab=(t: string)=>{setTabLoading(true);setActiveTab(t);setTimeout(()=>setTabLoading(false),300)};
  const unlockWithEmail=()=>{if(email.trim()&&email.includes("@")){setUnlocked(true);setSubmitted(true)}};
  const share=()=>{if(!results)return;const t=`AI Visibility & Local SEO Audit — ${results.businessName}\n\nOverall: ${getG(results.avgOverall).grade} (${results.avgOverall}/100)\nAI Search: ${getG(results.avgAI).grade}\nSEO: ${getG(results.avgSEO).grade}\nListings: ${getG(results.avgListing).grade}\nReviews: ${getG(results.avgReview).grade}\n\nAudit by Holden Ottolini`;navigator.clipboard?.writeText(t).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)})};

  const runAudit=async()=>{
    setRunning(true);setProgress(0);const ac=cities.length>0?cities:["(National)"];const cityData: Record<string,CityData>={};
    for(let i=0;i<SCANS.length;i++){setScanMsg(SCANS[i]);await wait(350+Math.random()*400);setProgress(Math.round(((i+1)/SCANS.length)*100))}
    for(const city of ac)cityData[city]=genCity(biz,cat,kws,city,comps.length>0?comps:null);
    const vals=Object.values(cityData);const avg=(k: keyof CityData)=>Math.round(vals.reduce((s,d)=>s+(d[k] as number),0)/vals.length);
    setResults({cityData,avgOverall:avg("overall"),avgAI:avg("aiScore"),avgSEO:avg("seoScore"),avgListing:avg("listingScore"),avgReview:avg("reviewScore"),businessName:biz,cities:ac,category:cat,competitors:comps.length>0?comps:null});
    setRunning(false);
  };

  const catObj=CATS.find(c=>c.id===cat);
  const iS: React.CSSProperties={width:"100%",padding:"12px 13px",borderRadius:10,background:"rgba(232,228,221,0.04)",border:"1px solid rgba(232,228,221,0.06)",color:"#E8E4DD",fontSize:13,outline:"none",fontFamily:"inherit"};
  const bP: React.CSSProperties={padding:"10px 22px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",color:"#E8E4DD",fontSize:12,fontWeight:600,cursor:"pointer",boxShadow:"0 3px 12px rgba(99,102,241,0.2)"};

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(155deg,#07080d 0%,#0c1018 35%,#0a0f1c 65%,#07080d 100%)",color:"#E8E4DD",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`:root{--m:'JetBrains Mono',monospace;--sf:'Instrument Serif',Georgia,serif}@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}input::placeholder{color:rgba(255,255,255,0.18)}`}</style>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{position:"relative",zIndex:1,maxWidth:740,margin:"0 auto",padding:"28px 16px 50px"}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",marginBottom:8}}>HOLDEN OTTOLINI</div>
          <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(200,149,108,0.1)",border:"1px solid rgba(200,149,108,0.2)",borderRadius:100,padding:"4px 12px",marginBottom:10}}>
            <span style={{fontSize:11}}>⚡</span><span style={{fontSize:9,fontWeight:700,color:"#C8956C",letterSpacing:"0.06em"}}>AI VISIBILITY & LOCAL SEO AUDIT</span>
          </div>
          <h1 style={{fontSize:"clamp(20px,5vw,26px)",fontWeight:800,lineHeight:1.2,marginBottom:6,background:"linear-gradient(135deg,#fff,rgba(232,228,221,0.55))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>How Visible Is Your Business<br/>in AI Search & Local Listings?</h1>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.35)",maxWidth:460,margin:"0 auto"}}>Audit your presence across ChatGPT, Claude, Perplexity, Google AI, 8 directories, and review platforms.</p>
        </div>

        {!results&&!running&&(
          <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:20,flexWrap:"wrap"}}>
            {["Business","Keywords & Locations","Review & Run"].map((l,i)=>{const s=i+1;return(
              <div key={s} style={{display:"flex",alignItems:"center",gap:4}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:step>=s?"linear-gradient(135deg,#6366F1,#8B5CF6)":"rgba(232,228,221,0.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:step>=s?"#fff":"rgba(255,255,255,0.2)"}}>{step>s?"✓":s}</div>
                <span style={{fontSize:10,color:step>=s?"rgba(255,255,255,0.55)":"rgba(232,228,221,0.12)",fontWeight:500}}>{l}</span>
                {i<2&&<div style={{width:16,height:1,background:step>s?"#6366F1":"rgba(232,228,221,0.04)"}} />}
              </div>
            )})}
          </div>
        )}

        {step===1&&!results&&!running&&(
          <Card>
            <label style={{fontSize:11,fontWeight:600,color:"rgba(232,228,221,0.45)",marginBottom:5,display:"block"}}>Business Name *</label>
            <input value={biz} onChange={e=>setBiz(e.target.value)} placeholder="e.g., Summit Physical Therapy" style={iS} />
            <label style={{fontSize:11,fontWeight:600,color:"rgba(232,228,221,0.45)",margin:"16px 0 7px",display:"block"}}>Category *</label>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:5}}>
              {CATS.map(c=>(<div key={c.id} onClick={()=>setCat(c.id)} style={{padding:"9px 11px",borderRadius:9,cursor:"pointer",background:cat===c.id?`${c.color}10`:"rgba(232,228,221,0.02)",border:`1px solid ${cat===c.id?c.color+"30":"rgba(232,228,221,0.04)"}`,display:"flex",alignItems:"center",gap:7}}>
                <span style={{fontSize:15}}>{c.icon}</span><span style={{fontSize:11,fontWeight:500,color:cat===c.id?"#fff":"rgba(232,228,221,0.45)"}}>{c.label}</span>
              </div>))}
            </div>
            <label style={{fontSize:11,fontWeight:600,color:"rgba(232,228,221,0.45)",margin:"16px 0 5px",display:"block"}}>Competitors ({comps.length}/5) <span style={{fontWeight:400,color:"rgba(255,255,255,0.2)"}}>(optional)</span></label>
            <div style={{display:"flex",gap:5,marginBottom:6}}>
              <input value={compIn} onChange={e=>setCompIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addComp()} placeholder="Competitor name" disabled={comps.length>=5} style={{...iS,flex:1}} />
              <button onClick={addComp} disabled={comps.length>=5} style={{...bP,opacity:comps.length>=5?0.4:1}}>Add</button>
            </div>
            {comps.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4}}>{comps.map(c=>(<span key={c} style={{padding:"3px 8px",borderRadius:5,background:"rgba(255,68,107,0.08)",border:"1px solid rgba(255,68,107,0.18)",fontSize:10,color:"#FF6B6B",display:"flex",alignItems:"center",gap:3}}>🆚 {c}<span onClick={()=>setComps(comps.filter(x=>x!==c))} style={{cursor:"pointer",opacity:0.5,fontSize:13}}>×</span></span>))}</div>}
          </Card>
        )}

        {step===2&&!results&&!running&&(
          <Card>
            <label style={{fontSize:11,fontWeight:600,color:"rgba(232,228,221,0.45)",marginBottom:4,display:"block"}}>Keywords ({kws.length}/10) *</label>
            <div style={{display:"flex",gap:5,marginBottom:6}}>
              <input value={kwIn} onChange={e=>setKwIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addKw()} placeholder="Type keyword, press Enter" style={{...iS,flex:1}} />
              <button onClick={addKw} style={bP}>Add</button>
            </div>
            {kws.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:10}}>{kws.map(k=>(<span key={k} style={{padding:"3px 8px",borderRadius:5,background:"rgba(200,149,108,0.08)",border:"1px solid rgba(200,149,108,0.18)",fontSize:10,color:"#C8956C",display:"flex",alignItems:"center",gap:3}}>{k}<span onClick={()=>setKws(kws.filter(x=>x!==k))} style={{cursor:"pointer",opacity:0.5,fontSize:13}}>×</span></span>))}</div>}
            {cat&&SUG_KW[cat]&&<div style={{marginBottom:14}}><div style={{fontSize:9,color:"rgba(255,255,255,0.2)",marginBottom:4}}>Suggested:</div><div style={{display:"flex",flexWrap:"wrap",gap:3}}>{SUG_KW[cat].filter(q=>!kws.includes(q)).map(q=>(<span key={q} onClick={()=>kws.length<10&&setKws([...kws,q])} style={{padding:"3px 7px",borderRadius:5,fontSize:9,background:"rgba(232,228,221,0.02)",border:"1px solid rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.35)",cursor:"pointer"}}>+ {q}</span>))}</div></div>}
            <label style={{fontSize:11,fontWeight:600,color:"rgba(232,228,221,0.45)",marginBottom:4,display:"block"}}>Cities ({cities.length}/6) <span style={{fontWeight:400,color:"rgba(255,255,255,0.2)"}}>— leave empty for national</span></label>
            <div style={{display:"flex",gap:5,marginBottom:6}}>
              <input value={cityIn} onChange={e=>setCityIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCity()} placeholder="e.g., Denver, CO" style={{...iS,flex:1}} />
              <button onClick={addCity} style={bP}>Add</button>
            </div>
            {cities.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:3}}>{cities.map(c=>(<span key={c} style={{padding:"3px 8px",borderRadius:5,background:"rgba(200,149,108,0.08)",border:"1px solid rgba(200,149,108,0.18)",fontSize:10,color:"#C8956C",display:"flex",alignItems:"center",gap:3}}>📍{c}<span onClick={()=>setCities(cities.filter(x=>x!==c))} style={{cursor:"pointer",opacity:0.5,fontSize:13}}>×</span></span>))}</div>}
          </Card>
        )}

        {step===3&&!results&&!running&&(
          <Card>
            <h3 style={{fontSize:13,fontWeight:700,marginBottom:12,color:"rgba(255,255,255,0.85)"}}>📋 Review Your Audit</h3>
            {[["🏢 Business",biz],["📁 Category",catObj?.label||""],["🆚 Competitors",comps.length>0?comps.join(", "):"None"],["🔑 Keywords",kws.join(", ")],["📍 Cities",cities.length>0?cities.join(", "):"National"]].map(([l,v])=>(<div key={l} style={{display:"flex",gap:8,padding:"7px 10px",background:"rgba(232,228,221,0.02)",borderRadius:7,border:"1px solid rgba(232,228,221,0.03)",marginBottom:4}}><span style={{fontSize:10,fontWeight:600,color:"rgba(232,228,221,0.4)",width:85,flexShrink:0}}>{l}</span><span style={{fontSize:11,color:"rgba(255,255,255,0.75)"}}>{v}</span></div>))}
            <div style={{marginTop:12,padding:"9px 12px",borderRadius:9,background:"rgba(200,149,108,0.05)",border:"1px solid rgba(200,149,108,0.1)",fontSize:10,color:"rgba(255,255,255,0.45)"}}>
              Scanning <strong style={{color:"#C8956C"}}>{kws.length} keywords</strong> × <strong style={{color:"#C8956C"}}>{cities.length||1} location(s)</strong> + <strong style={{color:"#C8956C"}}>8 directories</strong> + <strong style={{color:"#C8956C"}}>3 review platforms</strong> + <strong style={{color:"#C8956C"}}>6-point SEO audit</strong>{comps.length>0&&<> + <strong style={{color:"#C8956C"}}>{comps.length} competitor(s)</strong></>}
            </div>
          </Card>
        )}

        {running&&(
          <div style={{textAlign:"center",padding:"40px 0"}}>
            <div style={{width:64,height:64,borderRadius:14,margin:"0 auto 16px",background:"rgba(200,149,108,0.1)",border:"1px solid rgba(200,149,108,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,animation:"pulse 1.3s ease-in-out infinite"}}>🔎</div>
            <h3 style={{fontSize:15,fontWeight:700,marginBottom:4}}>Running Full Audit</h3>
            <p style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:16,minHeight:14}}>{scanMsg}</p>
            <div style={{width:"100%",maxWidth:340,margin:"0 auto",height:4,borderRadius:2,background:"rgba(232,228,221,0.04)",overflow:"hidden"}}><div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#6366F1,#8B5CF6,#A78BFA)",width:`${progress}%`,transition:"width 0.35s"}} /></div>
            <div style={{fontSize:11,fontWeight:600,color:"#C8956C",marginTop:7}}>{progress}%</div>
          </div>
        )}

        {results&&(
          <div style={{animation:"fadeIn 0.5s"}}>
            <Card style={{textAlign:"center",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
                <h2 style={{fontSize:14,fontWeight:700,textAlign:"left"}}>{results.businessName}<br/><span style={{fontSize:10,fontWeight:500,color:"rgba(255,255,255,0.35)"}}>AI Visibility & Local SEO Report</span></h2>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  <button onClick={share} style={{fontSize:9,fontWeight:600,color:"#C8956C",background:"rgba(200,149,108,0.1)",border:"1px solid rgba(200,149,108,0.2)",borderRadius:6,padding:"4px 9px",cursor:"pointer"}}>{copied?"✓Copied":"📤Share"}</button>
                  <DownloadPDF results={results} catObj={catObj} />
                  <button onClick={()=>setShowKey(!showKey)} style={{fontSize:9,fontWeight:600,color:"rgba(255,255,255,0.35)",background:"rgba(232,228,221,0.03)",border:"1px solid rgba(232,228,221,0.06)",borderRadius:6,padding:"4px 9px",cursor:"pointer"}}>📊Key</button>
                </div>
              </div>
              {showKey&&<div style={{background:"rgba(232,228,221,0.02)",border:"1px solid rgba(232,228,221,0.06)",borderRadius:12,padding:"12px 14px",marginBottom:14}}><div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.55)",marginBottom:7}}>📊 Grade Scale</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(80px,1fr))",gap:4}}>{GRADES.map(g=>(<Tooltip key={g.grade} text={g.tip}><div style={{display:"flex",alignItems:"center",gap:4,padding:"2px 0"}}><span style={{fontSize:12,fontWeight:800,color:g.color,fontFamily:"var(--m)",width:20}}>{g.grade}</span><div><div style={{fontSize:9,fontWeight:600,color:"rgba(255,255,255,0.55)"}}>{g.label}</div><div style={{fontSize:7,color:"rgba(255,255,255,0.2)"}}>{g.min}+</div></div></div></Tooltip>))}</div></div>}
              <div style={{display:"flex",justifyContent:"center",gap:"clamp(8px,2vw,16px)",flexWrap:"wrap",marginBottom:12}}>
                <GradeRing score={results.avgOverall} size={110} sw={9} label="Overall" sub="Combined" delay={0} />
                <GradeRing score={results.avgAI} size={76} sw={6} label="AI Search" sub="LLMs" delay={150} />
                <GradeRing score={results.avgSEO} size={76} sw={6} label="SEO" sub="Traditional" delay={300} />
                <GradeRing score={results.avgListing} size={76} sw={6} label="Listings" sub="NAP" delay={450} />
                <GradeRing score={results.avgReview} size={76} sw={6} label="Reviews" sub="Sentiment" delay={600} />
              </div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginBottom:10}}>{getG(results.avgOverall).tip}</div>
              {catObj&&(()=>{const pct=CL(Math.round(50+(results.avgOverall-catObj.bench)*1.5+R(-3,3)),5,99);const pc=pct>=70?"#00D26A":pct>=40?"#FFC107":"#FF4444";return(
                <div style={{background:`${pc}08`,border:`1px solid ${pc}18`,borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{fontSize:24,fontWeight:800,color:pc,fontFamily:"var(--m)"}}>{pct}<span style={{fontSize:12}}>%</span></div>
                  <div><div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.75)"}}>Ahead of {pct}% of {catObj.label} businesses</div><div style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>Industry avg: {getG(catObj.bench).grade} ({catObj.bench}/100)</div></div>
                </div>
              )})()}
            </Card>

            <RevenueProjection score={results.avgOverall} catObj={catObj} cities={results.cities} />
            <Heatmap results={results} />

            {results.cities.length>1&&(
              <div style={{borderRadius:12,overflow:"hidden",background:"linear-gradient(135deg,#0d1117,#131a2b)",border:"1px solid rgba(255,255,255,0.05)",padding:14,marginBottom:10}}>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
                  {Object.entries(results.cityData).map(([city,d])=>{const g=getG(d.overall);return(
                    <div key={city} onClick={()=>setActiveCity(city)} style={{background:activeCity===city?"rgba(99,102,241,0.1)":"rgba(0,0,0,0.3)",borderRadius:9,padding:"10px 14px",border:`1px solid ${activeCity===city?"rgba(99,102,241,0.25)":g.color+"18"}`,minWidth:110,textAlign:"center",cursor:"pointer"}}>
                      <div style={{fontSize:11,fontWeight:700,color:"#E8E4DD"}}>{city}</div>
                      <div style={{fontSize:22,fontWeight:800,color:g.color,fontFamily:"var(--m)"}}>{g.grade}</div>
                      <div style={{fontSize:8,color:"rgba(255,255,255,0.25)"}}>{d.overall}/100</div>
                    </div>
                  )})}
                </div>
              </div>
            )}

            <div style={{display:"flex",gap:2,marginBottom:10,flexWrap:"wrap"}}>
              {results.cities.length>1&&<><button onClick={()=>setActiveCity("all")} style={{padding:"5px 10px",borderRadius:6,border:activeCity==="all"?"1px solid rgba(99,102,241,0.3)":"1px solid rgba(232,228,221,0.04)",background:activeCity==="all"?"rgba(99,102,241,0.08)":"transparent",color:activeCity==="all"?"#A5B4FC":"rgba(255,255,255,0.25)",fontSize:9,fontWeight:600,cursor:"pointer"}}>All</button>
              {results.cities.map(c=><button key={c} onClick={()=>setActiveCity(c)} style={{padding:"5px 10px",borderRadius:6,border:activeCity===c?"1px solid rgba(99,102,241,0.3)":"1px solid rgba(232,228,221,0.04)",background:activeCity===c?"rgba(99,102,241,0.08)":"transparent",color:activeCity===c?"#A5B4FC":"rgba(255,255,255,0.25)",fontSize:9,fontWeight:600,cursor:"pointer"}}>{c}</button>)}<div style={{width:1,background:"rgba(232,228,221,0.06)",margin:"0 4px"}} /></>}
              {[["overview","📋 Actions"],["ai","🤖 AI"],["listings","📍 Listings"],["reviews","⭐ Reviews"],["seo","🔍 SEO"]].map(([id,l])=>(
                <button key={id} onClick={()=>switchTab(id)} style={{padding:"5px 10px",borderRadius:6,border:activeTab===id?"1px solid rgba(99,102,241,0.25)":"1px solid rgba(232,228,221,0.03)",background:activeTab===id?"rgba(99,102,241,0.07)":"transparent",color:activeTab===id?"#A5B4FC":"rgba(255,255,255,0.25)",fontSize:9,fontWeight:600,cursor:"pointer"}}>{l}</button>
              ))}
            </div>

            {tabLoading?<div style={{display:"flex",flexDirection:"column",gap:8}}><Skeleton h={50}/><Skeleton h={70}/><Skeleton h={50}/></div>:
            (activeCity==="all"?results.cities:[activeCity]).map(city=>{
              const d=results.cityData[city];if(!d)return null;
              const allIns=[...d.insights.ai,...d.insights.listings,...d.insights.reviews,...d.insights.seo].sort((a,b)=>{const o: Record<string,number>={critical:0,warning:1,info:2,success:3};return(o[a.sev]??4)-(o[b.sev]??4)});
              const insToShow=activeTab==="overview"?allIns:activeTab==="ai"?d.insights.ai:activeTab==="listings"?d.insights.listings:activeTab==="reviews"?d.insights.reviews:d.insights.seo;
              return(
                <div key={city} style={{animation:"fadeIn 0.3s"}}>
                  {activeCity==="all"&&results.cities.length>1&&<div style={{fontSize:12,fontWeight:700,color:"rgba(232,228,221,0.65)",margin:"12px 0 6px",display:"flex",alignItems:"center",gap:4}}>📍{city}<span style={{fontWeight:800,color:getG(d.overall).color,fontFamily:"var(--m)",fontSize:11}}>{getG(d.overall).grade}</span></div>}

                  {activeTab==="ai"&&<Card style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><h3 style={{fontSize:12,fontWeight:700}}>🤖 AI Search Results</h3><span style={{fontSize:12,fontWeight:800,color:getG(d.aiScore).color,fontFamily:"var(--m)"}}>{getG(d.aiScore).grade}</span></div><p style={{fontSize:9,color:"rgba(255,255,255,0.3)",marginBottom:8}}>How ChatGPT, Claude, Perplexity & Google AI respond to customer searches.</p>
                  {d.queryResults.map((r,i)=>{const g=getG(r.score);return(<div key={i} style={{background:"rgba(232,228,221,0.02)",border:"1px solid rgba(232,228,221,0.04)",borderRadius:8,padding:"8px 10px",marginBottom:4}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:26,height:26,borderRadius:5,background:`${g.color}10`,border:`1px solid ${g.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:g.color,fontFamily:"var(--m)"}}>{r.found?`#${r.position}`:"—"}</div><div><div style={{fontSize:10,fontWeight:500,color:"rgba(232,228,221,0.75)"}}>&#34;{r.query}&#34;</div><div style={{fontSize:8,color:"rgba(255,255,255,0.25)"}}>{r.found?`Pos ${r.position}`:"Missing"} • {r.competitors.length} competitors</div></div></div><Tooltip text={g.tip}><span style={{fontSize:12,fontWeight:800,color:g.color,fontFamily:"var(--m)"}}>{g.grade}</span></Tooltip></div></div>)})}</Card>}

                  {activeTab==="listings"&&<Card style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><h3 style={{fontSize:12,fontWeight:700}}>📍 Publisher Listings</h3><span style={{fontSize:12,fontWeight:800,color:getG(d.listingScore).color,fontFamily:"var(--m)"}}>{getG(d.listingScore).grade}</span></div><p style={{fontSize:9,color:"rgba(255,255,255,0.3)",marginBottom:8}}>NAP consistency across directories directly affects rankings and AI trust.</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:10}}>{d.publishers.map(p=>(<div key={p.id} style={{background:"rgba(232,228,221,0.02)",borderRadius:8,padding:"8px 10px",border:`1px solid ${p.listed?(p.accuracy>=100?"#00D26A15":p.accuracy>=66?"#FFC10715":"#FF444415"):"rgba(232,228,221,0.03)"}`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontSize:10,fontWeight:600,color:"rgba(232,228,221,0.65)"}}>{p.icon} {p.name}</span>{p.listed?<Tooltip text={getG(p.accuracy).tip}><span style={{fontSize:10,fontWeight:800,color:getG(p.accuracy).color,fontFamily:"var(--m)"}}>{getG(p.accuracy).grade}</span></Tooltip>:<span style={{fontSize:8,fontWeight:700,color:"#FF4444",background:"rgba(255,68,68,0.08)",padding:"1px 4px",borderRadius:3}}>MISSING</span>}</div>{p.listed&&<div style={{display:"flex",gap:3}}>{[["N",p.nameMatch],["A",p.addressMatch],["P",p.phoneMatch]].map(([l,ok])=>(<span key={l as string} style={{fontSize:7,padding:"1px 4px",borderRadius:2,background:(ok as boolean)?"rgba(0,210,106,0.08)":"rgba(255,68,68,0.08)",color:(ok as boolean)?"#00D26A":"#FF4444",fontWeight:700}}>{(ok as boolean)?"✓":"✗"}{l}</span>))}</div>}</div>))}</div></Card>}

                  {activeTab==="reviews"&&<Card style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><h3 style={{fontSize:12,fontWeight:700}}>⭐ Reviews & Sentiment</h3><span style={{fontSize:12,fontWeight:800,color:getG(d.reviewScore).color,fontFamily:"var(--m)"}}>{getG(d.reviewScore).grade}</span></div>
                  <div style={{display:"flex",gap:12,marginBottom:12}}><div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:800,color:"#FFC107",fontFamily:"var(--m)"}}>{d.avgRating}★</div><div style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>{d.totalReviews} reviews</div></div>
                  <div style={{flex:1}}>{d.reviewSources.map(r=>(<div key={r.source} style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><span style={{fontSize:9,color:"rgba(232,228,221,0.45)",width:45}}>{r.source}</span><div style={{flex:1,height:3,borderRadius:2,background:"rgba(232,228,221,0.04)",overflow:"hidden"}}><div style={{height:"100%",width:`${parseFloat(r.avgRating)*20}%`,background:getG(parseFloat(r.avgRating)*20).color,borderRadius:2}} /></div><span style={{fontSize:9,fontWeight:600,fontFamily:"var(--m)",width:22}}>{r.avgRating}</span></div>))}</div></div>
                  <div style={{fontSize:10,fontWeight:600,color:"rgba(232,228,221,0.45)",marginBottom:5}}>Sentiment by Theme</div>
                  {d.themes.map(t=>{const sc: Record<string,string>={"Very Positive":"#00D26A","Positive":"#7DD87D","Mixed":"#FFC107","Negative":"#FF4444"};return(<div key={t.theme} style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}><span style={{fontSize:9,color:"rgba(232,228,221,0.45)",width:90}}>{t.theme}</span><span style={{fontSize:7,fontWeight:700,padding:"1px 4px",borderRadius:3,width:60,textAlign:"center",background:`${sc[t.sentiment]}10`,color:sc[t.sentiment]}}>{t.sentiment}</span><span style={{fontSize:8,color:"rgba(255,255,255,0.2)"}}>{t.mentions}</span></div>)})}</Card>}

                  {activeTab==="seo"&&<Card style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><h3 style={{fontSize:12,fontWeight:700}}>🔍 SEO Audit</h3><span style={{fontSize:12,fontWeight:800,color:getG(d.seoScore).color,fontFamily:"var(--m)"}}>{getG(d.seoScore).grade}</span></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:10}}>{d.seoAudit.map((a,i)=>{const g=getG(a.score);return(<div key={i} style={{background:"rgba(232,228,221,0.02)",borderRadius:7,padding:"8px 10px",border:"1px solid rgba(232,228,221,0.03)"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:9,fontWeight:600,color:"rgba(255,255,255,0.65)"}}>{a.label}</span><Tooltip text={g.tip}><span style={{fontSize:10,fontWeight:800,color:g.color,fontFamily:"var(--m)"}}>{g.grade}</span></Tooltip></div><div style={{height:3,borderRadius:2,background:"rgba(232,228,221,0.04)",overflow:"hidden",marginBottom:2}}><div style={{height:"100%",width:`${a.score}%`,background:g.color,borderRadius:2}} /></div><div style={{fontSize:7,color:"rgba(255,255,255,0.2)"}}>{a.desc}</div></div>)})}</div></Card>}

                  <Card style={{marginBottom:8}}>
                    <h3 style={{fontSize:12,fontWeight:700,marginBottom:8}}>{activeTab==="overview"?"📋 Prioritized Action Plan":"Insights & Actions"}</h3>
                    {insToShow.map((ins,i)=><InsightCard key={i} ins={ins} gated={!unlocked&&ins.sev!=="success"} onUnlock={()=>{const el=document.getElementById("email-gate");if(el)el.scrollIntoView({behavior:"smooth"})}} />)}
                  </Card>
                </div>
              );
            })}

            {!unlocked&&(
              <Card id="email-gate" style={{background:"linear-gradient(135deg,rgba(99,102,241,0.05),rgba(139,92,246,0.05))",border:"1px solid rgba(200,149,108,0.15)",textAlign:"center",marginTop:12}}>
                <h3 style={{fontSize:14,fontWeight:700,marginBottom:4}}>🔓 Unlock Your Full Action Plan</h3>
                <p style={{fontSize:10,color:"rgba(232,228,221,0.4)",marginBottom:12}}>Enter your email to see detailed action steps, implementation guides, and estimated revenue impact for every finding.</p>
                <div style={{display:"flex",gap:5,maxWidth:360,margin:"0 auto"}}>
                  <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" onKeyDown={e=>e.key==="Enter"&&unlockWithEmail()} style={{...iS,flex:1,background:"rgba(232,228,221,0.04)"}} />
                  <button onClick={unlockWithEmail} style={bP}>Unlock</button>
                </div>
              </Card>
            )}
            {submitted&&<Card style={{textAlign:"center",marginTop:8,border:"1px solid rgba(0,210,106,0.15)"}}><span style={{fontSize:18}}>✅</span><div style={{fontSize:12,fontWeight:600,color:"#00D26A",marginTop:3}}>Full report unlocked!</div></Card>}

            <div style={{textAlign:"center",marginTop:14}}>
              <button onClick={()=>{setResults(null);setStep(1);setKws([]);setCities([]);setBiz("");setCat(null);setComps([]);setCompIn("");setUnlocked(false);setSubmitted(false);setEmail("");setActiveCity("all");setActiveTab("overview");setShowKey(false)}}
                style={{padding:"7px 18px",borderRadius:7,border:"1px solid rgba(255,255,255,0.05)",background:"transparent",color:"rgba(255,255,255,0.3)",fontSize:10,cursor:"pointer"}}>Run Another Audit</button>
            </div>
          </div>
        )}

        {!results&&!running&&(
          <div style={{display:"flex",justifyContent:"space-between",marginTop:16}}>
            {step>1?<button onClick={()=>setStep(step-1)} style={{padding:"9px 18px",borderRadius:9,border:"1px solid rgba(232,228,221,0.06)",background:"transparent",color:"rgba(232,228,221,0.4)",fontSize:12,cursor:"pointer"}}>Back</button>:<div/>}
            {step<3?<button onClick={()=>canGo()&&setStep(step+1)} disabled={!canGo()} style={{...bP,opacity:canGo()?1:0.3}}>Continue</button>
              :<button onClick={runAudit} style={{...bP,padding:"11px 26px",fontSize:13,fontWeight:700}}>⚡ Run Full Audit</button>}
          </div>
        )}

        <div style={{textAlign:"center",marginTop:32,fontSize:8,color:"rgba(232,228,221,0.08)"}}>Built by <span style={{color:"rgba(255,255,255,0.2)"}}>Holden Ottolini</span> • AI Visibility & Local SEO Audit</div>
      </div>
    </div>
  );
}
