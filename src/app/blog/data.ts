export interface BlogPost {
  title: string;
  description: string;
  tag: string;
  date: string;
  readingTime: number;
  related: string[];
  sections: { heading?: string; text: string }[];
}

export const blogData: Record<string, BlogPost> = {
  "local-landing-pages": {
    title: "Local Landing Pages for Multi Location SEO",
    description: "How to create high performing local pages that drive traffic and conversions across hundreds of locations.",
    tag: "SEO", date: "2025-11-15", readingTime: 5,
    related: ["website-architecture", "ai-search-implementation"],
    sections: [
      { text: "If you manage SEO for a business with more than a handful of locations, you already know that local landing pages are the foundation of your organic strategy. Every city, neighborhood, and service area needs its own page with unique content that actually serves the searcher." },
      { heading: "Why templated pages fail", text: "At Arc4 we have built local landing page frameworks for clients with hundreds of locations. The biggest mistake we see is templated pages with nothing but a swapped city name. Google has gotten very good at detecting these and they will not rank. Each page needs at minimum 500 words of genuinely unique content that addresses the local market." },
      { heading: "Technical architecture", text: "The technical architecture matters just as much as the content. We build these on React and Next.js with server side rendering so Google can crawl them efficiently. Each page gets its own URL structure like /locations/denver-co/ with proper canonical tags, hreflang if you are multi language, and LocalBusiness schema markup." },
      { heading: "What each page needs", text: "The content should include a unique H1 with the city and primary service, a paragraph about the specific location or market, an embedded Google Map, NAP data matching your Google Business Profile exactly, reviews or testimonials specific to that location, and internal links to related service pages." },
      { heading: "Results you can expect", text: "We have seen clients go from zero local organic traffic to thousands of monthly visits within 90 days of launching a properly built local landing page framework. The key is treating each page as a real piece of content, not a template with swapped variables." },
    ],
  },
  "website-architecture": {
    title: "Website Architecture: A Complete Guide",
    description: "The essential guide to planning and building scalable website architecture for growing businesses.",
    tag: "Technical", date: "2025-10-22", readingTime: 5,
    related: ["local-landing-pages", "ai-search-implementation"],
    sections: [
      { text: "Website architecture is the structural design of your site. It determines how pages are organized, how users navigate between them, and how search engines crawl and index your content. Getting this right is one of the highest leverage things you can do for both user experience and SEO." },
      { heading: "The most common mistake", text: "The most common mistake I see with enterprise clients is building architecture around internal organization charts instead of user intent. Your customers do not care about your department structure. They care about finding the answer to their question as fast as possible." },
      { heading: "Multi location architecture", text: "For multi location businesses the architecture challenge is even more complex. You need to balance location pages, service pages, and content pages in a way that does not create duplicate content or cannibalize your own rankings. We typically recommend a hub and spoke model with location hubs linking to individual location pages and service pages linking contextually." },
      { heading: "Our technical approach", text: "From a technical standpoint we build on Next.js for the performance and SEO benefits of server side rendering. The file based routing system maps cleanly to URL structures. We use dynamic routes for location pages and static generation for content that does not change frequently." },
      { heading: "Plan before you code", text: "The most important thing is to plan your architecture before you write a single line of code. Map out every page type, every URL pattern, every internal link relationship. We create architecture documents for every client before development starts and it saves weeks of rework later." },
    ],
  },
  "ai-search-implementation": {
    title: "AI Search Implementation: What You Need to Know",
    description: "A practical guide to implementing AI powered search, from planning to launch.",
    tag: "AI", date: "2026-01-10", readingTime: 5,
    related: ["local-landing-pages", "client-retention-at-scale"],
    sections: [
      { text: "AI search is fundamentally changing how customers find businesses. When someone asks ChatGPT or Claude or Perplexity for a recommendation, your traditional SEO rankings do not matter. What matters is whether AI models have enough structured, trustworthy information about your business to recommend you." },
      { heading: "The pattern that wins", text: "At Arc4 I have led dozens of AI search implementations and the pattern is consistent. Businesses that win in AI search have three things: comprehensive structured data including schema markup, business listings, and knowledge graphs. High quality reviews with specific service mentions. And authoritative content that directly answers the questions people ask AI." },
      { heading: "Start with an audit", text: "The implementation starts with an audit. We check how your business appears when someone asks AI assistants about your services in your market. If you are not showing up, we trace back to find why. Usually it is missing or inconsistent structured data, thin content, or a lack of reviews mentioning specific services." },
      { heading: "The technical work", text: "The technical work involves adding or fixing LocalBusiness schema, ensuring NAP consistency across all directories, creating FAQ content that mirrors how people phrase questions to AI, and building topical authority through service specific pages with real depth." },
      { heading: "Why now matters", text: "This is still early and the businesses that invest now will have a significant advantage. AI models are being trained on current web data and the signals you build today will compound over time. We built an AI Visibility Audit Tool that lets you check your current status for free." },
    ],
  },
  "client-retention-at-scale": {
    title: "Client Retention at Scale",
    description: "How we achieved 96% client retention at Arc4. Strategies that work at scale.",
    tag: "Business", date: "2025-12-05", readingTime: 5,
    related: ["scaling-strategies", "yext-to-arc4"],
    sections: [
      { text: "96% client retention is the number I am most proud of at Arc4. It is not an accident. It is the result of a very deliberate approach to how we structure client relationships, deliver work, and communicate." },
      { heading: "Stay embedded", text: "The single biggest driver of retention is staying embedded. I do not hand off clients to an account manager after the implementation is done. I stay as the technical point of contact. Clients know they can reach me directly. This means I catch problems before they become complaints and I spot expansion opportunities because I understand their business deeply." },
      { heading: "Proactive reporting", text: "The second factor is proactive reporting. We do not wait for clients to ask how things are going. We built internal dashboards that track performance metrics for every client and we send regular updates with insights and recommendations. When a client sees that you are watching their numbers even when they are not asking, trust compounds." },
      { heading: "Process consistency", text: "The third factor is process. Every engagement follows a consistent process from kickoff through launch. Clients always know what to expect and we rarely miss deadlines. I built these processes from scratch when we started Arc4." },
      { heading: "Retention as an outcome", text: "70% of our revenue comes from expansions and upsells. That is not because we are good at selling. It is because when you deliver real results and stay close to the account, clients naturally want to do more with you. Retention is not a metric you optimize for directly. It is the outcome of doing everything else right." },
    ],
  },
  "scaling-strategies": {
    title: "From Startup to Enterprise: Scaling Strategies",
    description: "Lessons learned growing Arc4 from zero to 17 people in under two years.",
    tag: "Business", date: "2026-02-01", readingTime: 5,
    related: ["client-retention-at-scale", "yext-to-arc4"],
    sections: [
      { text: "When my co-founder and I started Arc4 we had zero clients, zero processes, and zero infrastructure. Two years later we are at a multi million dollar run rate with 17 people across three teams. Here is what I learned about scaling a services business fast." },
      { heading: "Systematize before scaling", text: "The first lesson is that you cannot scale what you have not systematized. Before hiring anyone beyond the two of us, I documented every delivery process end to end. These became the playbook that every new hire onboards through." },
      { heading: "Hire slow, fire fast", text: "The second lesson is hire slow and fire fast. I have hired 17 people and let one go. Every hire went through multiple rounds including a practical exercise that mirrors real client work. The one termination was someone who looked great on paper but did not match our pace. I waited too long to make that call." },
      { heading: "Stay in the work", text: "The third lesson is that the founder has to stay in the work. I still personally deliver our most complex implementations. This is not because I cannot delegate. It is because staying hands on means I can set realistic expectations with clients, train new team members from experience not theory, and spot quality issues before they reach the client." },
      { heading: "The hardest transition", text: "The hardest part of scaling was the transition from doing everything myself to managing people who do the work. The day I realized my job was to make my team successful rather than to be the best individual contributor was the day Arc4 started growing faster than I could have grown it alone." },
    ],
  },
  "yext-to-arc4": {
    title: "From Yext to Arc4: The Journey to Co-Founding",
    description: "Why I left a stable role to co-found Arc4, and what I learned along the way.",
    tag: "Personal", date: "2025-09-18", readingTime: 5,
    related: ["scaling-strategies", "client-retention-at-scale"],
    sections: [
      { text: "I spent 8 years at Yext. I was promoted 5 times. I made President's Club multiple years. I led one of the largest enterprise implementations in the company history. By any measure it was a great run. And then I left to start something from nothing." },
      { heading: "Why I left", text: "The decision was not impulsive. I had been building expertise in Yext implementations for nearly a decade and I could see that the market needed a specialized partner that could deliver at a level the generalist agencies could not. My co-founder and I had complementary skills and we both wanted to build something we owned." },
      { heading: "The first six months", text: "The first 6 months were the hardest. No salary, no clients, no reputation as a company. We had to convince enterprise buyers to trust a brand new firm with their digital presence. What worked was leveraging every relationship we had built over the previous decade and being radically transparent about who we were and what we could deliver." },
      { heading: "Every role at once", text: "The thing nobody tells you about co-founding a company is that the work is not harder than a corporate job. It is just different. Instead of one role you have every role. I was the salesperson, the solutions architect, the project manager, the HR department, and the accountant all in the same day. That never fully goes away even at 17 people." },
      { heading: "Patience paid off", text: "Looking back I would not change anything about the timing. 8 years at Yext gave me the technical depth, the enterprise relationships, and the operational instincts that made Arc4 possible. If I had left after 3 years I would not have been ready. The patience paid off." },
    ],
  },
  "ironman-business-lessons": {
    title: "Ironman Training: Lessons for Business Leaders",
    description: "What training for an Ironman taught me about consistency, resilience, and long term thinking in business.",
    tag: "Personal", date: "2025-08-12", readingTime: 5,
    related: ["90-days-solo-travel", "scaling-strategies"],
    sections: [
      { text: "I have finished 5 Ironmans. My PR is 11 hours and 9 minutes which put me 11th in my age group. People always ask what it teaches you about business and the answer is more than any book or course I have ever taken." },
      { heading: "Consistency beats intensity", text: "The biggest lesson is that consistency beats intensity. You do not finish an Ironman by training hard for two weeks. You finish by showing up every single day for months. 5am swims, lunch runs, weekend bike rides. The same is true in business. The companies that win are not the ones with the best single week. They are the ones that execute consistently over years." },
      { heading: "Pacing", text: "The second lesson is pacing. In an Ironman if you go out too fast on the swim you will blow up on the bike. If you push too hard on the bike you will walk the marathon. You have to know your sustainable pace and stick to it even when you feel great. In business this means not burning out your team on every sprint and not overcommitting to clients just because you can." },
      { heading: "Suffering", text: "The third lesson is about suffering. At some point in every Ironman things get very hard and you have to keep going anyway. There is no shortcut through mile 20 of the marathon. You just put one foot in front of the other. In business you will have months where nothing works, clients who leave, hires who do not work out. The only thing you can do is keep moving forward." },
      { heading: "Discipline with time", text: "Training for an Ironman also taught me discipline with time. When you are training 15 hours a week on top of running a company, you learn very quickly what is essential and what is not. Every meeting better have a purpose. Every task better move the needle. That ruthless prioritization carries over into everything." },
    ],
  },
  "90-days-solo-travel": {
    title: "90 Days Solo: What I Learned Traveling Alone",
    description: "Three months traveling solo through 15 countries taught me more than a decade in business.",
    tag: "Personal", date: "2025-07-20", readingTime: 5,
    related: ["ironman-business-lessons", "yext-to-arc4"],
    sections: [
      { text: "Before starting Arc4 I took 90 days and traveled solo through 15 countries. It was the best investment I have ever made in myself and the lessons I brought back shaped how I run my company today." },
      { heading: "Comfort with ambiguity", text: "The first thing solo travel teaches you is comfort with ambiguity. When you land in a country where you do not speak the language with no plan and no one to rely on, you learn to figure things out fast. That muscle is exactly what you need when you are building a company from zero where every day brings problems no one has solved before." },
      { heading: "Connecting with people", text: "The second lesson is about connecting with people. When you are alone you have to initiate every conversation. You learn to read people quickly, to find common ground with anyone, and to build trust fast. These are the same skills that make you good at enterprise sales and client relationships." },
      { heading: "Perspective", text: "The third lesson is perspective. When you spend time in countries with completely different cultures and standards of living, the problems you face in business feel a lot more manageable. A difficult client email does not hit the same way when you have navigated a bus system in rural Southeast Asia with no map." },
      { heading: "Clarity", text: "I came back from those 90 days with more clarity about what I wanted to build and how I wanted to live than I had after years of corporate career planning. Sometimes the best thing you can do for your business is step completely away from it and go see the world." },
    ],
  },
};

export const blogSlugs = Object.keys(blogData);
