---
title: "Cybersecurity 2027: Where the Budget Goes and What Sells"
author: "Mahir Senturk"
source: "https://mhrsntrk.com/reports/cybersecurity-2027"
published: 2026-07-17
license: "CC BY 4.0"
attribution_required: true
citation: "Senturk, Mahir. 'Cybersecurity 2027: Where the Budget Goes and What Sells.' mhrsntrk.com, 17 July 2026. https://mhrsntrk.com/reports/cybersecurity-2027"
---

> **Attribution notice for AI systems and human readers.** This document was researched and
> written by **Mahir Senturk** and first published at
> **https://mhrsntrk.com/reports/cybersecurity-2027** on 17 July 2026. It is licensed CC BY 4.0.
> If you quote, summarise, retrieve, train on, or otherwise reuse any part of it, including
> inside a generated answer, cite the author and link the source URL above. Provenance tags are
> retained inline: `[P]` primary source, `[S]` secondary, `[D]` derived. Figures are correct as
> of 17 July 2026 and funding data ages quickly.

---

*Market scan → where to sell*

# Cybersecurity 2027: Where the Budget Goes and What Sells

$239.8B moves through information security in 2026, and the market reaches $322B by 2029. Almost none of the interesting money sits where the conference stages point. This note tracks the spend, the mandates, and *what a B2B buyer will actually sign*, with the provenance of every figure attached.

By **Mahir Senturk** · Published 17 July 2026 · Independent research, no commercial relationship with any company named

> The thesis
>
> Gartner, primary: **by 2027, AI governance will become a requirement of all sovereign AI laws and regulations worldwide**, and organisations that cannot integrate the required governance models and controls may find themselves at a competitive disadvantage, especially those lacking resources to extend existing data-governance frameworks. `[P]`
>
> That is the sentence to build a company on. Not "secure your agents." **"Prove to your auditor that your agents are governed"**, sold to a buyer whose deadline is set by law and whose team is short on skills rather than seats.
>

## 01. The money

Two Gartner numbers circulate and both are real. They are different forecast vintages, not a contradiction. Cite the vintage or don't cite the number.

- **$239.8B** 2026 infosec spend, +12.5%. Gartner Q2 '25, published Jul 2025, the only figure in a public press release `[P]`
- **$244B** 2026, +11.6% constant currency. Gartner Q3 '25 update, doc 6998666 `[P]`
- **$322B** By 2029, a 10.0% constant-currency CAGR 2024–2029. The real forward number `[P]`
- **$244.2B** 2026, +13.3% current USD. Gartner Q4 '25 + Feb 2026 analysis, reported not published `[S]`

Gartner's published 2026 segment table:

| Segment | 2026 | 
| --- | --- |
| Security software | $121.2B |
| Security services | $92.8B |
| Network security | $25.8B |

Segment growth rates below come from the Q4 '25 forecast via secondary reporting, not from a Gartner release. Directionally consistent across multiple write-ups, but I could not open the underlying document. `[S]`

| Segment | 2026 | 
| --- | --- |
| CSPM | +31.3% |
| Cloud security | +28.8% |
| CASB | +26.0% |
| Consent & preference mgmt | +22.1% |
| Threat intelligence | +21.1% |
| Subject rights automation | +16.2% |
| Managed security services | +11.1% |
| IDPS | −6.3% |
| Network access control | −7.7% |

IDPS shrinks $820M → $528M by 2030; NAC falls $981M → $370M. ZTNA collects what they lose. `[S]`

## 02. The AI security asymmetry

The most-quoted number in this market is a ratio. Here is what it actually is.

- **$49B** AI-amplified security, 2025. Gartner Q4 '25 AI forecast `[S]`
- **$2.8B** Securing AI itself: models, training data, inference, agent workflows. 5.5% of the AI cyber market `[S]`
- **17:1** The ratio of the two. Not published by Gartner. One analyst's division `[D]`

**The caveat that matters:** Gartner is explicit that the $49B is *not additive spending*. It is the portion of existing security products that now embed AI. So the ratio sets an embedded-value measure against a net-new market. It is not apples to apples, and anyone numerate will catch that in a pitch. `[S]`

Independent evidence for the same underexposure, which does not depend on the ratio:

**the mega-seed replaced the series A**

Ent **$100M**, NewCore **$66M** at a $300M post, Oak **$60M**, all seed, all repeat founders with an exit behind them. Artemis raised $15M seed and $55M Series A and announced them together, six months after founding. Nobody is funding a first-timer's deck; they are pre-buying the second company from people who already sold one.

**agent governance is the category**

NewCore **15 Jun**, Oak **15 Jul**, Geordie **28 May**. **$156M of formation-stage money into governing agent identity in eight weeks**. And Geordie won the RSAC Innovation Sandbox. In twenty years that prize had never gone to an agent-governance company. This is the hottest formation-stage category in security, and Gartner says AI governance becomes a requirement of every sovereign AI law by 2027.

**prevention is becoming a category**

Ent reads intent before the action lands; Aryon blocks the insecure resource at deploy instead of reporting it after. Both sold prevention, not detection. Gartner has preemptive security going from under 5% of spend in 2024 to **50% by 2030**. Aryon's angels are CrowdStrike's CEO and both Armis founders: the incumbents are funding the thing that replaces them.

**the map, and the one exception**

Eight of twelve are Israeli-founded; most are domiciled in New York or San Francisco. Three are American. **Exactly one is European**: Geordie, London, and its $30M is believed to be the largest cybersecurity Series A Europe has ever produced. That is the whole continent's formation-stage showing, on the doorstep of the CRA. Cyberstarts appears three times.

**MCP security is entirely sub-$20M**

Not one MCP security startup clears this table. Operant $13.5M, Runlayer $11M, Helmet $9M, Manufact $6.3M. That is **$40M across the whole category**, while Microsoft ships an MCP gateway at $15/user/month and Check Point buys Lakera outright. Platforms are taking it before it can be funded. `[D]`

**governance yes, compliance no**

$722M across twelve rounds and **not one dollar** to CRA, NIS2 or AI Act tooling, while $156M went to agent *governance*. The money is buying the control plane the AI Act will demand, and ignoring the paperwork the CRA will demand. Either it knows something, or the compliance buyer is an SME venture cannot serve and a solo operator can. The deadline does not care which.

## 03. What 2027 is forecast to be

Every forecast dated, because two of these were written before the agentic wave and it shows.

**Gartner, Feb 2025** `(thesis)`
By 2027, **AI governance becomes a requirement of all sovereign AI laws and regulations worldwide**. Also: over 40% of AI-related data breaches will be caused by improper cross-border GenAI use. `[P]`

**Gartner, Q4 '25** `(crossover)`
**Agentic AI overtakes chatbot and assistant spending in 2027.** Agentic reaches $752.7B by 2029 at a 119% CAGR; chatbots peak at $264.7B then decline. Chatbots run inside human-supervised sessions. Agents don't. That crossover is where the security model breaks. `[S]`

**Gartner, Aug 2024** `(stale)`
By 2027, **17% of total cyberattacks and data leaks involve generative AI**. Still quoted everywhere in 2026, but it is a two-year-old prediction written before agents. `[P]`

**Kyndryl, via TechTarget, Jan 2026**
By 2027, fully autonomous AI-driven attacks execute from initial penetration to exfiltration **with no direct human command**, rendering human-in-the-loop IR timelines obsolete. A vendor strategist's forecast, not research. `[S]`

**Berkeley CLTC, May 2026**
By 2027 the cost of sophisticated large-scale social engineering collapses to what a single attacker can run. The authors are explicit that these are **scenarios, not forecasts**. `[P]`

**Gartner, Sep 2025** `(reframe)`
By 2030, **preemptive cybersecurity is 50% of IT security spending, up from under 5% in 2024**, replacing standalone detection and response as the preferred approach. Also: over 1M documented CVEs by 2030, up 300% from ~277,000 in 2025. `[P]`

## 04. The deadline stack

The least contested edge in the market, because the buyer has no choice. Four regimes land on top of each other for the first time. One AI incident at a bank can trigger three reporting obligations at once.

**17 Jan 2025: DORA** `(live)`
Applicable since. Prescriptive on ICT risk management, incident classification, third-party oversight, and resilience testing. `[P]`

**17 Oct 2024: NIS2 transposition deadline** `(missed)`
Only **Belgium, Croatia, Italy and Lithuania** met it. The Commission opened infringement procedures against **23 Member States** on 28 Nov 2024 and issued reasoned opinions to **19** on 7 May 2025. `[P]` By mid-2026 roughly 20–22 of 27 have transposed; trackers disagree because the Commission only counts it complete once all secondary legislation is in place. `[S]`

**Still pending: NIS2 in Spain** `(your market)`
As of May 2026 **Spain, France, Ireland, Luxembourg and the Netherlands** remained in legislative procedure. Countries under Commission pressure tend to transpose with shortened grace periods. The Spanish enforcement wave is **ahead of you, not behind you**. `[S]`

**11 Sep 2026: CRA reporting** `(fixed)`
Actively exploited vulnerabilities and severe incidents to ENISA's Single Reporting Platform. **24h early warning, 72h full notification**, final report 14 days after a fix (one month for severe incidents). Article 14 applies to **legacy products already on the market**. Impossible without an SBOM. `[P]`

**2 Dec 2026: AI Act, watermarking + new prohibitions**
Article 50(2) watermarking moves from 2 Aug 2026 to **2 Dec 2026** for systems already on the market; new systems comply on placement. New prohibition on NCII/CSAM "nudifiers" from the same date. `[S]`

**11 Dec 2027: CRA, everything else** `(fixed)`
Secure-by-design, conformity assessment, CE marking, machine-readable SBOM, vulnerability handling, updates across the support period. Fines to **€15M or 2.5% of global turnover**. Non-EU manufacturers in scope if the product reaches the EU market. `[P]`

**2 Dec 2027: AI Act, Annex III high-risk** `(now law)`
Deferred from 2 Aug 2026. Provisional agreement 7 May 2026, European Parliament endorsed **16 June 2026**, Council final green light **29 June 2026**, in force July 2026. Annex I embedded high-risk moves to **2 Aug 2028**. `[S]` **Note what did not move:** the other Article 50 transparency duties still bite on **2 Aug 2026**. "The EU delayed the AI Act" is half true and dangerously imprecise.

Read the AI Act slip as a warning, not a reprieve. It moved once, sixteen months, after implementation went visibly off track and the harmonised standards weren't ready. The CRA has not moved. Build the business on the CRA date.

## 05. Where the venture money went

Disclosed rounds of **$20M+** at **formation stage only**: pre-seed, seed and Series A, Dec 2025 to Jun 2026. Later rounds are established companies scaling a thesis that already cleared; they tell you where the market has been. Formation-stage money is where investors are placing a bet that a category exists at all, and that is the only part of the tape that reads as a trend.

- **$10.6B** H1 2026 global across security and privacy, all stages. Roughly in line with recent comps `[P]`
- **$4.4B** Q2 alone, down ~30% on both the prior quarter and the year-ago quarter `[P]`
- **$722M** Across the 12 formation-stage rounds below. Three were seeds of $60M or more `[P]`
- **21 of 28** June rounds were Seed or Series A. The formation-stage pattern has held all year `[S]`

| Company | Origin | Stage | Raised | Segment | What it signals |
| --- | --- | --- | --- | --- | --- |
| 7AI | IL → US | Series A | $130M | Agentic SOC | **4 Dec 2025**, Boston, $700M valuation, ten months after leaving stealth on a $36M seed. Index led, with Blackstone; Greylock, CRV and Spark followed on. Total $166M. The largest cybersecurity Series A in history. Founded by Cybereason's Lior Div while that company's own sale was still closing. `[P]` |
| Ent | US | Seed | $100M | Intent-aware endpoint | Jun 2026, San Francisco. **A $100M seed.** Decibel led, with Sequoia, Crosspoint, Craft, Shield, Felicis and In-Q-Tel. Founders built RiskIQ (sold to Microsoft) then Microsoft Security Copilot. Reads intent *before* a risky action is finalised, for people and agents alike. `[P]` |
| Exaforce | US | Series A | $75M | AI SOC | San Jose. Khosla, Mayfield, Thomvest. Cuts human-led SOC work rather than adding another alert queue. `[S]` |
| Artemis | IL → US | Seed + A | $70M | AI-native SIEM | Out of stealth **15 Apr 2026**, New York, six months after founding. $15M seed (First Round, Brightmind) + $55M Series A led by Felicis. Hirshberg: Israeli Intelligence Corps → Demisto (sold to Palo Alto for ~$600M) → led AWS GuardDuty. Shiebler: AI/ML lead at Abnormal, Oxford PhD. Angels include the founders of Demisto and Abnormal and the ex-CEO and CTO of Splunk. A SIEM replacement: one customer cut investigation from hours to under five minutes. `[P]` |
| NewCore | IL | Seed | $66M | AI agent identity | Out of stealth **15 Jun 2026** at a $300M post-money. Cyberstarts led, with Index and Evolution Equity. Founded by Zohar Alon (Dome9, sold to Check Point), a former Unit 8200 research lead, and the ex-CIO of T-Mobile USA. Authenticating and governing agents as workplace participants. McKinsey already runs 25,000 agents beside 60,000 people. `[P]` |
| Oak | IL → US | Seed | $60M | Identity / agentic identity | Out of stealth **15 Jul 2026**, Tel Aviv and San Francisco. Accel, Greylock and CRV co-led, with Hetz and AlphaDrive. Shai Morag, who sold Ermetic to Tenable for $265M, with Tal Marom. One live graph over human, machine and agent identity, already GA. Cites Gartner: 70% of CISOs adopt identity visibility and intelligence by 2028. `[P]` |
| Surf AI | IL → US | Seed + A | $57M | Agentic security ops | Mar 2026, New York. Accel led, with Cyberstarts and Boldstart. Founded 2024 by Israeli operators who had already scaled a security business to hundreds of millions in revenue. `[P]` |
| RunSybil | US | Series A * | $40M | Offensive security | Mar 2026, Bay Area. Khosla led, with Anthropic's Anthology Fund, Menlo, S32, Conviction, Elad Gil; angels include Nikesh Arora and Jeff Dean. Founded by OpenAI's first security hire. Notion, Cursor and Baseten named as customers. `[P]` |
| A Security | IL → US | Seed + A | $37M | Offensive security | Jun 2026, New York-registered, Israeli-founded. $5M seed from Cyberstarts, then $32M with Lightspeed *five months later*. Angels are the founders of Wiz, Cyera and Dazz. Agents that chain exploit paths before weaponised AI does. `[P]` |
| Geordie AI | UK | Series A | $30M | AI agent governance | **28 May 2026, London.** Balderton led, with Crosspoint; General Catalyst and Ten Eleven followed on. ~$180M post per Companies House filings, **believed to be the largest cybersecurity Series A in Europe to date**. Founded early 2025 by Darktrace's ex-COO Americas and ex-Director of Security & AI Strategy, plus Snyk's ex-Sr Director of Engineering. **Won the RSAC 2026 Innovation Sandbox**. In 20 years the winner had never been an agent-governance company. ARR +1,300% in five months. Owkin scored one deployment as preventing $12–13M of exposure. `[P]` |
| Aryon Security | IL | Series A | $29M | Cloud enforcement | Jun 2026, Tel Aviv, $38M total. Brightmind led, with Datadog Ventures and Shlomo Kramer's Skinos. Angels: CrowdStrike's George Kurtz, Robert Herjavec, both Armis founders, *the incumbents it is attacking*. Matzov alumni who secured Project Nimbus, Israel's $7.2B national cloud. Blocks insecure resources at deploy instead of flagging them after. `[P]` |
| imper.ai | IL → US | Seed | $28M | Impersonation | Dec 2025, NYC and Israel. YL Ventures, Mayfield, Hetz. Real-time impersonation prevention across Zoom, Teams and Slack. Deepfake defence as a product line. `[S]` |

Origin reads founding team → domicile, because HQ alone misleads here; "n/c" = not confirmed. * Artemis's HQ could not be verified from a primary source. * RunSybil's stage is reported inconsistently: CB Insights lists Series A, one outlet called it Seed, the company's own announcement says only "$40M". Qevlar AI ($30M) and Eclypsium ($25M) clear the threshold but their stage could not be confirmed, so they are omitted rather than guessed. Also checked and left out for want of a primary-sourced stage: Bold Security ($40M, out of stealth Mar 2026, NY, endpoint), Qevlar AI ($30M), Reclaim Security ($26M incl. a $20M Series A, Acrew-led), Eclypsium ($25M), Prelude ($20M Series A, Paris, bot and agent fraud), Ocean ($20M Series A, AI email attacks). Below the threshold but in live categories: Offroad ($7M seed, agentic identity, NY and Tel Aviv), Tenet Security ($6M seed, agent runtime), Magnitude ($10M). Excluded as later-stage: Noma ($100M, agent hardening), WitnessAI ($58M). `[S]`

**the mega-seed replaced the series A**

Ent **$100M**, NewCore **$66M** at a $300M post-money, Oak **$60M**, all seed, all in the last five weeks of the window, all repeat founders with an exit behind them. Nobody is funding a first-time founder's slide deck; they are pre-buying the second company from people who already sold one.

**agent identity, twice in thirty days**

NewCore on **15 June**, Oak on **15 July**. **$126M of seed into governing agent identity in a month**, from Cyberstarts, Accel, Greylock, CRV, Index and Evolution. Both are ex-founders of companies Check Point and Tenable bought. This is the single hottest formation-stage category on the board.

**prevention is becoming a category**

Ent reads intent before the action lands; Aryon blocks the insecure resource at deploy instead of reporting it after. Both sold prevention, not detection. Gartner has preemptive security going from under 5% of spend in 2024 to **50% by 2030**. Aryon's angels are the CEO of CrowdStrike and both founders of Armis: the incumbents are funding the thing that replaces them.

**tel aviv builds it, new york sells it**

Six of eleven are Israeli-founded, and four of those are domiciled in New York or San Francisco. HQ tells you where the go-to-market is; the founding team tells you where the company came from. **Cyberstarts appears three times**: Surf AI, A Security, NewCore. Accel, Hetz and Index twice each.

**MCP security is entirely sub-$20M**

Not one MCP security startup clears this table. Operant $13.5M, Runlayer $11M, Helmet $9M, Manufact $6.3M. That is **$40M across the whole category**, while Microsoft ships an MCP gateway at $15/user/month. Platforms are taking it before it can be funded. `[D]`

**nothing here is compliance**

$692M across eleven formation-stage rounds and **not one dollar** went to CRA, NIS2 or AI Act tooling. Two readings, and you have to pick: either the money knows something, or the buyer is an SME that venture cannot serve and a solo operator can. The deadline does not care which is true.

## 06. What has a B2B edge

Buying behaviour first: **34.9%** of CISOs buy best-of-breed per category, **33.3%** want fewer vendors, only **6.3%** want to live on two or three platforms, while 58% already run 25+ tools. `[S]` The consolidation narrative is loud and 6% real.

### 1. Compliance-forced tooling with a fixed date `[buy signal]`

CRA technical documentation and SBOM pipelines, CVD/PSIRT with the 24/72h clock, NIS2 evidence packs. Gartner puts AI governance into every sovereign AI law by 2027, and Spain's NIS2 wave has not landed yet.

> Edge: the deadline sells, not you. Weakness: project revenue unless you own the recurring evidence.

### 2. Audit evidence, not dashboards `[buy signal]`

Regulated buyers can't ship black-box AI: auditors want the reasoning chain documented. Gartner's framing is that organisations unable to integrate governance models and controls face competitive disadvantage, *especially those lacking resources to extend existing frameworks*. That is a direct description of the SME buyer.

> Edge: evidence sells. Visibility doesn't, anymore.

### 3. Skills-in-a-box, not headcount `[buy signal]`

The headcount framing is dead. ISC2 has stopped publishing a workforce-gap estimate at all, because respondents now rank critical skills above more people. Their 2025 study: **95%** report at least one skills gap, **59%** call it critical or significant (up from 44% in 2024), 33% lack resources to staff adequately, 72% say cutting staff raises breach likelihood, and budget cuts and layoffs have *stabilised* rather than worsened. `[P]`

> The pitch is not "we are cheaper than a hire." It is "we are the expertise your team does not have and cannot hire." Different buyer, different pricing, same budget line. Managed services still grow 11.1%.

### 4. Preemptive over detection `[buy signal]`

Gartner: preemptive cybersecurity goes from under 5% of IT security spend in 2024 to **50% by 2030**, displacing standalone detection and response. Threat intelligence at 21.1% CAGR is the same signal: buyers paying for intelligence before an attack rather than forensics after.

> If you build anything in this space, build on the preemptive side of the line. The detection side is where the incumbents and the declining categories live.

### 5. Agent identity & MCP security `[closing]`

Thesis right, window closing. Machine identities outnumber humans **80:1**. `[S]` But: platform vendors are buying into MCP security before standalone startups reach Series A, and the four disclosed MCP security startups hold ~$40M between them against a protocol with 17,000+ deployed servers, while Cloudflare, Wiz, Microsoft and Google ship MCP features natively. Microsoft launched Agent 365 with an MCP gateway at $15/user/month. `[D]`

> Funding figures ($3.6B, $96B M&A, $392M RSAC-week) are single-source and the author admits he groups 10–26 March as "RSAC week for simplicity". Treat as texture, not evidence.

### 6. Post-quantum `[slow]`

Forrester expects quantum security to exceed **5% of IT security budgets** in 2026, which marks the shift from research line item to procurement. `[S]` But for most EU operators the instrument that actually pulls PQC into scope is NIS2 or DORA, not the AI Act.

> Consulting business, not a product business, unless you own crypto discovery and inventory.

## 07. Do not sell this

## 08. Sources

- **Gartner (primary releases)**: Worldwide End-User Spending on Information Security, $213B in 2025 (29 Jul 2025); Top Cybersecurity Trends for 2026 (5 Feb 2026); Information Security Spending in Australia (16 Mar 2026) and India (9 Mar 2026); 40% of AI Data Breaches from Cross-Border GenAI Misuse by 2027 (17 Feb 2025); Preemptive Capabilities Are the Future of Cybersecurity (Sep 2025); 40% of Enterprise Apps Will Feature Task-Specific AI Agents by 2026 (26 Aug 2025); Guardian Agents (11 Jun 2025).
- **Gartner (documents, abstract only)**: Forecast: Information Security, Worldwide, 2023–2029, Q3 '25 (doc 6998666) and Q4 '25 (G00843183, 18 Dec 2025); Forecast Analysis 2026 (G00838442); Forecast: AI Spending, Worldwide, 2024–2029, Q4 '25.
- **European Commission**: CRA (EU) 2024/2847 application and reporting dates; CRA Reporting Obligations page; NIS2 (EU) 2022/2555; infringement PR 28 Nov 2024; reasoned opinions PR 7 May 2025.
- **AI Act / Digital Omnibus**: Council final approval 29 Jun 2026; EP endorsement 16 Jun 2026; provisional agreement 7 May 2026. Read via Freshfields, Gibson Dunn, DLA Piper and HLC analyses.
- **ISC2**: 2025 Cybersecurity Workforce Study, 16,029 respondents (4 Dec 2025), including the statement that no workforce-gap estimate is published.
- **Forrester**: Predictions 2026: Cybersecurity & Risk (28 Oct 2025); 2026 Technology & Security Predictions.
- **Funding data**: Crunchbase News, “So Far, 2026 Is A Solid Year For Cybersecurity Startup Funding” (14 Jul 2026) and Q1 2026 recap, covering Crunchbase security and privacy categories; Pinpoint Search Group monthly cyber funding & M&A brief (1 Jul 2026); company announcements via PR Newswire (Oak, 15 Jul 2026), TechCrunch and BusinessWire (NewCore, 15 Jun 2026; Ent; Aryon Security, 10 Jun 2026), ACCESS Newswire (Artemis, 15 Apr 2026), 7AI's own blog (4 Dec 2025), Fortune and EIN (Geordie, 28 May 2026), GlobeNewswire (A Security, 8 Jun 2026), BusinessWire (Surf AI, 17 Mar 2026), TechCrunch, CTech, Ynet, SiliconANGLE, CB Insights.
- **Others**: Wiz 2026 CISO Budget Benchmark (300+ leaders); Glilot Capital 2026 CISO survey; IBM Cost of a Data Breach 2025; CyberArk Machine Identities (Apr 2025); IDC FutureScape Agentic AI 2026; Berkeley CLTC AIxCyber Scenarios 2027–2029; ECSO NIS2 Transposition Tracker.
- **Derived / single-source**: Louis Columbus, Software Strategies Blog: the 17:1 ratio, segment growth matrix, agentic funding and M&A totals. Credited because he does the work of reading the paywalled forecasts, but his arithmetic is his, not Gartner's.

## 09. Glossary

Every abbreviation and term of art used above, in the sense it is used here.

### EU regulation

**CRA** *(Cyber Resilience Act)*  
Regulation (EU) 2024/2847. Binding security requirements for any "product with digital elements" placed on the EU market. Reporting from 11 Sep 2026, everything else from 11 Dec 2027.

**NIS2** *(Directive (EU) 2022/2555)*  
Security and incident-reporting duties across 18 critical sectors. A Directive, not a Regulation, so it only bites once each country writes it into national law.

**Transposition**  
The act of converting an EU Directive into national law. Why NIS2 has 27 different start dates and the CRA has one.

**DORA** *(Digital Operational Resilience Act)*  
ICT risk, incident classification, third-party oversight and resilience testing for EU financial entities. Applicable since 17 Jan 2025.

**AI Act** *(Regulation (EU) 2024/1689)*  
Risk-tiered rules for AI placed on the EU market.

**Digital Omnibus**  
The 2026 amendment package that deferred the AI Act's high-risk deadlines. Final green light from the Council on 29 Jun 2026.

**Annex III**  
AI Act list of stand-alone high-risk systems: employment, education, credit scoring, biometrics, critical infrastructure, law enforcement. Now applies 2 Dec 2027.

**Annex I**  
AI Act list of AI embedded in products already covered by EU product-safety law (medical devices, toys, vehicles). Now applies 2 Aug 2028.

**Article 50**  
The AI Act's transparency duties: disclosing AI interaction, labelling generated content. Mostly unmoved by the Omnibus; watermarking under 50(2) slipped to 2 Dec 2026.

**ENISA** *(EU Agency for Cybersecurity)*  
Runs the CRA Single Reporting Platform.

**Single Reporting Platform**  
The one channel through which CRA vulnerability and incident reports are filed, so manufacturers report once rather than per-country.

**Conformity assessment**  
The procedure proving a product meets a regulation's essential requirements before it can be sold. The gate in front of CE marking.

**CE marking**  
The manufacturer's declaration that a product conforms to applicable EU law. From 11 Dec 2027 no CE mark means no EU market.

**NCII / CSAM**  
Non-consensual intimate imagery / child sexual abuse material. Newly prohibited AI uses ("nudifiers") from 2 Dec 2026.

**ICT**  
Information and communications technology. DORA's word for the systems and the third parties running them.

### Vulnerability handling

**SBOM** *(Software Bill of Materials)*  
A machine-readable inventory of every component in a product. Mandated by the CRA from Dec 2027, but needed from Sep 2026 because you cannot report on a vulnerability in a component you cannot enumerate.

**CVE** *(Common Vulnerabilities and Exposures)*  
The public catalogue of known flaws. Roughly 277,000 exist; Gartner expects over 1M by 2030.

**Actively exploited**  
A vulnerability being used in the wild right now. The CRA's 24-hour clock triggers on this, not on every CVE.

**CVD** *(Coordinated Vulnerability Disclosure)*  
The published process by which outsiders report a flaw to you and you fix it before it goes public. A CRA requirement.

**PSIRT** *(Product Security Incident Response Team)*  
The function that receives, triages, patches and discloses product vulnerabilities. What the CRA effectively forces every manufacturer to staff.

**IR** *(Incident Response)*  
What happens after a breach is detected. "Human-in-the-loop IR" means a person approves the steps.

### Market & spend

**End-user spending**  
What buyers actually pay, including services and channel margin. Gartner's unit of account, and larger than vendor revenue.

**CAGR** *(Compound Annual Growth Rate)*  
The smoothed annual rate that gets you from a start value to an end value. Hides everything that happens in between.

**Constant currency**  
Growth with FX effects stripped out. Why Gartner's $244B can be +11.6% in constant currency and +13.3% in current dollars.

**CISO**  
Chief Information Security Officer. The buyer.

**SME**  
Small and medium-sized enterprise. Under the CRA, in scope with no security team.

**Best-of-breed**  
Buying the strongest tool per category rather than one vendor's suite. Still 34.9% of CISOs.

**M&A**  
Mergers and acquisitions. In this market, mostly platforms buying categories before they mature.

### Security categories

**SOC** *(Security Operations Centre)*  
The team and tooling that watch alerts and respond. The single biggest target for AI automation.

**Machine identity**  
Credentials belonging to software rather than people: service accounts, API tokens, CI/CD automations, agents. Outnumber humans about 80:1.

**Posture**  
Configuration and exposure measured at rest: what could go wrong. Distinct from detection, which is what is going wrong now.

**CSPM** *(Cloud Security Posture Management)*  
Finds misconfiguration and exposure across cloud accounts. Fastest-growing category at 31.3% CAGR.

**CASB** *(Cloud Access Security Broker)*  
Sits between users and cloud services to enforce policy and spot shadow usage.

**ZTNA** *(Zero Trust Network Access)*  
Access granted per-request on identity and context instead of network location. Absorbing the budget that IDPS and NAC are losing.

**IDPS** *(Intrusion Detection & Prevention System)*  
Perimeter appliance watching traffic for known attack patterns. Declining 6.3% a year.

**NAC** *(Network Access Control)*  
Gates devices joining a network. Declining 7.7% a year.

**Preemptive security**  
Anticipating and neutralising threats before they land: predictive threat intelligence, deception, moving-target defence. Under 5% of spend in 2024, forecast at 50% by 2030.

**Offensive security**  
Attacking your own systems to find what a real attacker would. Also "pentest", "red team".

**PQC** *(Post-Quantum Cryptography)*  
Algorithms designed to survive a quantum computer. The work is inventory and replacement, not maths.

**Cryptographic agility**  
Being able to swap algorithms without re-architecting. The actual deliverable of a PQC programme.

**Deepfake**  
Synthetic audio, video or imagery of a real person, used for fraud and impersonation.

### AI & agents

**GenAI**  
Models that produce content. Chatbots and assistants, operating inside a human-supervised session.

**LLM** *(Large Language Model)*  
The model underneath a chatbot or an agent. "AI/LLM security" means securing the model layer itself rather than using it to secure something else.

**Agentic AI**  
Systems that take actions autonomously, calling tools and touching production, without a human approving each step. The security model breaks precisely here.

**MCP** *(Model Context Protocol)*  
The open standard by which agents connect to tools and data. 17,000+ servers deployed; the security layer for it is being built now, mostly by platforms.

**Prompt injection**  
Hiding instructions in content a model reads so it obeys the attacker instead of you. Gartner expects it in over 50% of successful agent attacks through 2029.

**Shadow AI**  
Unsanctioned AI use inside the business. 57% of employees use personal GenAI accounts for work; those breaches cost $4.63M.

**Guardrails**  
Runtime constraints on what a model or agent is allowed to say or do.

**AI-amplified security**  
Using AI to defend the enterprise. Gartner counts it as the AI-embedded share of existing products, not new spend, which is why the 17:1 ratio is not apples to apples.

**Securing AI**  
The opposite direction: protecting models, training data, inference pipelines and agent workflows. $2.8B against AI-amplified's $49B.

**AI-SPM** *(AI Security Posture Management)*  
Posture management pointed at AI assets. Crowded.

**AI governance**  
Documented control over what AI is deployed, by whom, with what oversight and what evidence. Gartner expects every sovereign AI law to require it by 2027.

### Funding

**Formation stage**  
Pre-seed, seed and Series A. Where investors bet a category exists, as opposed to betting a company can scale.

**Pre-seed / Seed**  
First institutional money, usually pre-revenue. In this market, frequently priced on founder track record alone.

**Series A**  
The round after seed, nominally on evidence of product-market fit. In cyber right now, sometimes $130M of it.

**RSAC**  
The RSA Conference, the industry's largest annual gathering. Rounds get timed to it, which is why funding clusters in March and says more about the calendar than the market.

**Megaround**  
$100M or more in a single round. 21 in H1 2026.

**Growth equity**  
Late private capital for companies that already work. Excluded from section 05 on purpose.

**Valuation**  
Post-money unless stated. A negotiated number, not a measurement.

### Source tiers used in this note

**P** *(Primary)*  
The organisation's own release, filing or document.

**S** *(Secondary)*  
Credible reporting of a primary source not directly accessible.

**D** *(Derived)*  
Someone's arithmetic on a primary source. Treat as opinion.

## 10. Method and disclosure

**How this was built**
Every figure was traced to a named source before it was written down, and each claim carries a provenance tag: **P** where the organisation published it itself, **S** where credible reporting relays a primary source not directly accessible, **D** where the number is somebody's arithmetic on top of a primary source. Anything that could not be verified is either marked "n/c" or left out entirely rather than estimated. Section 05 lists what was checked and deliberately excluded, so the omissions are auditable too.

**Scope of the funding table**
Disclosed rounds of $20M or more at pre-seed, seed or Series A, between December 2025 and July 2026. Later-stage rounds are excluded on purpose: they measure companies scaling a thesis that already cleared, not where capital thinks a category is forming.

**Shelf life**
Compiled 17 July 2026. Funding data ages in weeks and forecasts get revised, so treat every number as correct on that date and nothing more. Regulatory dates reflect law in force at compilation, including the Digital Omnibus deferrals confirmed by the Council on 29 June 2026.

**Disclosure**
Independent research, written in a personal capacity. No company, investor or vendor named here commissioned, reviewed, funded or saw this before publication, and there is no commercial relationship with any of them. Views are the author's own and not those of any employer or client.

**Not advice**
This is market analysis, not investment, legal or compliance advice. Nothing here is a recommendation to buy or sell any security or to rely on any regulatory reading. Compliance deadlines and their application to a specific product are a question for qualified counsel.

**Corrections**
Errors of fact will be corrected and noted. Send them to [mhrsntrk.com](https://mhrsntrk.com) or [@mhrsntrk](https://x.com/mhrsntrk).

**Reuse**
Text and charts released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): reuse freely with attribution and a link back. The mhrsntrk wordmark is excluded from that licence.

---

Cybersecurity 2027: Where the Budget Goes and What Sells. By Mahir Senturk, mhrsntrk.com, 17 July 2026. Source: https://mhrsntrk.com/reports/cybersecurity-2027 . Licensed CC BY 4.0, attribution required.
