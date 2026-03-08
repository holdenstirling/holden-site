import { Metadata } from "next";
import { blogData, blogSlugs } from "../data";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date, authors: ["Holden Stirling Ottolini"], tags: [post.tag] },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogData[slug];
  if (!post) notFound();

  const TC: Record<string,string> = { SEO:"#4ECDC4",Technical:"#6366F1",AI:"#C8956C",Business:"#7DD87D",Personal:"#FF9800" };
  const SN = "'DM Sans', sans-serif";
  const SF = "'Instrument Serif', Georgia, serif";
  const ACC = "#C8956C";
  const BG = "#0B0A0F";
  const TXT = "#E8E4DD";
  const FAINT = "rgba(232,228,221,0.06)";
  const dateFormatted = new Date(post.date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});

  const articleSchema = {"@context":"https://schema.org","@type":"Article",headline:post.title,description:post.description,author:{"@type":"Person",name:"Holden Stirling Ottolini",url:"https://holdenottolini.com"},datePublished:post.date,dateModified:post.date,mainEntityOfPage:{"@type":"WebPage","@id":`https://holdenottolini.com/blog/${slug}`},keywords:[post.tag,"Holden Ottolini","Arc4"]};
  const relatedPosts = post.related.map((s)=>({slug:s,...blogData[s]})).filter((p)=>p.title);

  return(
    <div style={{minHeight:"100vh",background:BG,color:TXT,fontFamily:SF}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema)}}/>

      <nav style={{padding:"16px 24px",borderBottom:`1px solid ${FAINT}`}}>
        <div style={{maxWidth:740,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Link href="/" style={{fontSize:17,fontFamily:SN,fontWeight:700,letterSpacing:"-0.02em",color:TXT,textDecoration:"none"}}>H<span style={{color:ACC}}>.</span> Ottolini</Link>
          <Link href="/#blog" style={{fontSize:12,fontFamily:SN,fontWeight:500,color:ACC,textDecoration:"none"}}>{"\u2190"} All Posts</Link>
        </div>
      </nav>

      <article style={{maxWidth:740,margin:"0 auto",padding:"60px 24px 80px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,flexWrap:"wrap"}}>
          <span style={{fontSize:10,fontFamily:SN,fontWeight:700,padding:"3px 10px",borderRadius:4,background:`${TC[post.tag]||ACC}15`,color:TC[post.tag]||ACC,letterSpacing:"0.04em",textTransform:"uppercase"}}>{post.tag}</span>
          <time dateTime={post.date} style={{fontSize:12,fontFamily:SN,color:"rgba(232,228,221,0.3)"}}>{dateFormatted}</time>
          <span style={{fontSize:12,fontFamily:SN,color:"rgba(232,228,221,0.2)"}}>{post.readingTime} min read</span>
        </div>

        <h1 style={{fontSize:"clamp(28px,5vw,44px)",fontWeight:400,lineHeight:1.15,margin:"0 0 12px",letterSpacing:"-0.01em"}}>{post.title}</h1>
        <p style={{fontSize:15,fontFamily:SN,color:"rgba(232,228,221,0.4)",lineHeight:1.7,marginBottom:40}}>{post.description}</p>

        <div style={{borderTop:`1px solid ${FAINT}`,paddingTop:32}}>
          {post.sections.map((sec,i)=>(
            <div key={i}>
              {sec.heading&&<h2 style={{fontSize:22,fontWeight:400,fontFamily:SF,color:TXT,margin:"32px 0 12px",letterSpacing:"-0.01em"}}>{sec.heading}</h2>}
              <p style={{fontSize:16,fontFamily:SN,color:"rgba(232,228,221,0.6)",lineHeight:1.85,marginBottom:20}}>{sec.text}</p>
            </div>
          ))}
        </div>

        <div style={{borderTop:`1px solid ${FAINT}`,marginTop:40,paddingTop:28,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:12,fontFamily:SN,fontWeight:600,color:"rgba(232,228,221,0.7)"}}>Holden Stirling Ottolini</div>
            <div style={{fontSize:11,fontFamily:SN,color:"rgba(232,228,221,0.3)"}}>Co-Founder & VP of Operations & Services, Arc4</div>
          </div>
          <a href="mailto:holdenstirling@gmail.com" style={{fontSize:12,fontFamily:SN,fontWeight:600,color:ACC,textDecoration:"none"}}>Get in touch {"\u2192"}</a>
        </div>

        {relatedPosts.length>0&&(
          <div style={{borderTop:`1px solid ${FAINT}`,marginTop:32,paddingTop:28}}>
            <h3 style={{fontSize:14,fontFamily:SN,fontWeight:700,color:"rgba(232,228,221,0.5)",marginBottom:16}}>Related posts</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {relatedPosts.map((rp)=>(
                <Link key={rp.slug} href={`/blog/${rp.slug}`} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",background:"rgba(232,228,221,0.02)",border:`1px solid ${FAINT}`,borderRadius:10,textDecoration:"none",color:"inherit"}}>
                  <div>
                    <span style={{fontSize:9,fontFamily:SN,fontWeight:700,padding:"2px 7px",borderRadius:3,background:`${TC[rp.tag]||ACC}15`,color:TC[rp.tag]||ACC,letterSpacing:"0.04em",textTransform:"uppercase",marginRight:8}}>{rp.tag}</span>
                    <span style={{fontSize:13,fontFamily:SN,fontWeight:600,color:"rgba(232,228,221,0.7)"}}>{rp.title}</span>
                  </div>
                  <span style={{fontSize:12,fontFamily:SN,color:ACC,flexShrink:0}}>{"\u2192"}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <footer style={{padding:"28px 24px",borderTop:`1px solid ${FAINT}`,textAlign:"center"}}>
        <p style={{fontSize:10,fontFamily:SN,color:"rgba(232,228,221,0.12)"}}>{"\u00A9"} 2026 Holden Stirling Ottolini. Denver, Colorado.</p>
      </footer>
    </div>
  );
}
