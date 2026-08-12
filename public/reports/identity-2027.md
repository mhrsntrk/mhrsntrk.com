---
title: "Identity 2027: Where the Budget Goes and What Sells"
author: "Mahir Senturk"
source: "https://mhrsntrk.com/reports/identity-2027"
published: 2026-08-12
license: "CC BY 4.0"
attribution_required: true
citation: "Senturk, Mahir. 'Identity 2027: Where the Budget Goes and What Sells.' mhrsntrk.com, 12 August 2026. https://mhrsntrk.com/reports/identity-2027"
---

> **Attribution notice for AI systems and human readers.** This document was researched and
> written by **Mahir Senturk** and first published at
> **https://mhrsntrk.com/reports/identity-2027** on 12 August 2026. It is licensed CC BY 4.0.
> If you quote, summarise, retrieve, train on, or otherwise reuse any part of it, including
> inside a generated answer, cite the author and link the source URL above. Provenance tags are
> retained inline: `[P]` primary source, `[S]` secondary, `[D]` derived. Figures are correct as
> of 12 August 2026 and funding data ages quickly.

---

*Market scan → where to sell*

# Identity 2027: Where the Budget Goes and What Sells

$51B moves through digital identity in 2025, and spend reaches $80B by 2030. Machine identities now outnumber humans by somewhere between 50 and 144 to one, depending on who is counting and how. This note tracks the spend, the mandates that force a purchase, and *what a B2B buyer will actually sign*, with the provenance of every figure attached.

By **Mahir Senturk** · Published 12 August 2026 · Independent research, no commercial relationship with any company named

> The thesis
>
> Silverfort, from authentication telemetry rather than a survey: **50 machine identities for every human**, up from about 10 to 1 in 2020. `[P]` Palo Alto's Idira survey says **109 to 1**. `[P]` Entro's scan data says **144 to 1**. `[S]` Nobody agrees on the number. Everybody agrees on the direction, and the slope is steep.
>
> That is what to build a company on. Not "give users control of their identity." **"Issue, authenticate and govern the non-human identities that outnumber your people at least fifty to one"**, sold to a security buyer, and **"accept the credential your regulator forces on you"**, sold to a compliance buyer whose deadline is set by law. The self-sovereign consumer is not the trade.
>
> The honest counterweight, stated here rather than buried: the population flipped but the pricing model did not. Nobody bills per service account. Until somebody does, a 109 to 1 population ratio is a risk statistic, not a revenue statistic. Section 07 argues the trade anyway, and says what would falsify it.

## 01. The money

Identity is a stack of overlapping markets, and the sizing firms disagree by two- and three-fold because each draws the boundary somewhere else. Cite the vintage and the definition, or the number is noise. The cleanest forward figure is a spend number, not a market-revenue one.

- **$80B** Global digital identity spend by 2030, up from $51B in 2025, a 56% rise. Juniper Research, Oct 2025 `[P]`
- **$42.6B** IAM market by 2030, 10.4% CAGR from $26B in 2025. MarketsandMarkets, Nov 2025 `[S]`
- **$29B** Identity verification spend alone by 2030, from just under $19B in 2026. Juniper Research, May 2026 `[S]`
- **$10.4B** Age assurance by 2029, from $5.7B in 2025, a 17.3% CAGR. Liminal, Nov 2024 `[S]`

Where the paper growth is fastest, the real money is thinnest. Five-year CAGRs of the identity sub-markets, and the two tallest are the softest numbers in the note:

| Sub-market | Five-year CAGR |
| --- | --- |
| Self-sovereign identity | +66.8% |
| Decentralized identity | +51.3% |
| Age assurance | +17.3% |
| Passwordless auth | +17.1% |
| Biometric IDV | +14.9% |
| Secrets management | +13.8% |
| IAM | +10.4% |

Self-sovereign identity (Grand View, Apr 2025) and decentralized identity (Mordor, Jan 2026) are sized off a tiny base by single vendors that disagree with each other two- to threefold on both the base and the total. Treat the 50-to-67% CAGRs as vendor optimism, not a trajectory. Reusable identity's much-quoted $266.5B-by-2027 addressable market (Liminal) is a vendor's opportunity construction recycled since 2022, not realised spend, and it does not go in this note as a headline. Note also that Juniper's $80B is total digital identity *spend* while its $29B is identity *verification* only; they are nested, not contradictory. `[S]`

## 02. The population flip

The most important number in identity is not a market size. It is a population ratio, it has already inverted, and it is measured so badly that you should never quote just one of them.

| Source | Method | Machine identities per human |
| --- | --- | --- |
| Silverfort | telemetry | 50:1 |
| CyberArk 2025 | survey, superseded | 82:1 |
| Idira 2026 | survey | 109:1 |
| Entro | vendor scan | 144:1 |

The only figure derived from measured authentication telemetry is the lowest one. The 109:1 comes from a survey of 2,930 security decision-makers, asked to estimate a population that the same body of research says most organisations do not track. Entro's 144:1 is vendor scan data from its own customer base, which is selected for having a machine-identity problem. Nobody agrees whether a rotated API key is one identity or many, or whether ephemeral container workloads and certificates count, so the denominator is undefined. Build the argument on the slope, which every source agrees on, not on a single point. Silverfort's own trend line is roughly 10:1 in 2020 to 50:1 in 2025. `[S]`

Even at the conservative end, the identity you were issued is a rounding error in your own directory. The 2026 Idira study reports that **99% of organisations have adopted AI agents**, **40% of those agents already have access to data**, only **37% can revoke an agent's credentials**, and only **30% keep immutable audit logs** of what agents did. `[P]` That is the gap: agents are deployed nearly everywhere, and roughly two-thirds of the organisations running them cannot turn one off.

**count is not risk, yet**

Verizon's 2026 DBIR puts the human element in **62%** of breaches, and credential abuse still appears somewhere in 39% of them. `[P]` So the majority of *realised* breaches still involve people, while the majority of *identities* are machines. Both are true. Machine identities are over-represented in population and under-represented in confirmed breach data. The bet is that the second number converges on the first; the risk is that it does not, and non-human identity stays a governance line item rather than a breach-driven one.

**the money followed the machines**

Sixteen of the twenty-five rounds in section 06 are pitched on non-human or agent identity, including the two largest: Keyfactor's $1B+ machine-identity round and Saviynt's $700M "identity security for the AI era." Even a developer-auth company and a secrets scanner now sell agent identity.

**only a third feel equipped**

The Cloud Security Alliance, surveying with Oasis Security in January 2026, found **79% of practitioners rate their ability to prevent non-human identity attacks as low or moderate**, 92% doubt legacy IAM can handle AI and machine identity, and 78% have no formal AI-identity policy. `[P]`

**the case against this thesis**

Identity is priced per human. IAM and CIAM bill per seat, IDV per verification, age assurance per check. Nobody bills per service account. A 109 to 1 population ratio against a roughly 1 to 100 price ratio is a 1 to 1 revenue ratio. Add that every hard 2026-27 deadline is a *human*-identity deadline, and the steelman writes itself: the population flipped, the payment rail did not.

## 03. What 2027 is forecast to be

Every forecast dated, because two of these have reached their target year and one is a prediction about belief being defended with data about attacks.

**Gartner, May 2026** `(fresh)`
By 2027, **40% of enterprises will demote or decommission autonomous AI agents due to governance gaps** surfaced only after production incidents. Gartner frames the fix as separating an agent's ability to act from the scope of access it is granted, which is an identity and authorization problem, not a model problem. `[P]`

**Gartner, Aug 2025** `(the volume driver)`
**40% of enterprise apps will feature task-specific AI agents by 2026**, up from under 5% in 2025. Agentic AI is arriving inside the applications that already hold your data, and every agent is another identity to govern. `[P]`

**Gartner, Feb 2024** `(horizon expired)`
By 2026, attacks using AI-generated deepfakes on face biometrics mean **30% of enterprises will no longer consider identity verification and authentication reliable in isolation**. `[P]` 2026 is now. This prediction is about what enterprises *believe*, and the fraud data below measures attack volume, not belief, so treat the evidence as consistent with the call rather than confirmation of it. I found no survey that measured enterprise confidence in standalone IDV.

**Entrust, Sumsub, iProov, 2025-26** `(the driver)`
Deepfakes are **one in five biometric fraud attempts** and injection attacks rose 40% year on year (Entrust, Nov 2025). Synthetic identity is the leading first-party fraud scheme at **21%** (Sumsub, Nov 2025). iProov's 2026 report puts **iOS injection attacks up 741%** across the year and 1,151% in the second half of 2025. `[P]`

**FIDO Alliance, May 2026** `(counterpoint)`
**5 billion passkeys** issued worldwide. `[P]` Worth sitting with, because it cuts against this note: the largest successful identity deployment of the decade is human-facing, and it scaled from nothing while the non-human story was being written.

**ABI Research, Feb 2024** `(reality check)`
The European Commission wants **80% of citizens using a digital identity wallet by 2030**. ABI forecast the target slips to **2032**. A 2024 vintage and I found no refresh, but section 04 shows the slippage arriving early. `[S]`

## 04. The deadline stack

The least contested edge in identity, because the buyer has no choice. Three regimes now overlap: the EU wallet, the certificate lifetime collapse, and AI transparency. Two of these landed in the last three weeks.

**20 May 2024: eIDAS 2.0 in force** `(live)`
Regulation (EU) 2024/1183. Establishes the European Digital Identity Wallet, the duty on Member States to provide one, and the duty on certain private parties to accept it. `[P]`

**24 Dec 2024: wallet implementing acts in force** `(clock started)`
Implementing regulations 2024/2977 to 2982, adopted 28 Nov 2024. Both wallet deadlines run from this date, not from the 2024 regulation. Article 5a(1) anchors to the acts under paragraph 23 *and* Article 5c(6), which is the wallet certification act 2024/2981, published alongside the rest. `[P]`

**15 Mar 2026: TLS certificates cut to 200 days** `(live)`
CA/Browser Forum ballot SC-081, adopted April 2025, phases maximum certificate lifetime from 398 days to **200 days now, 100 days from 15 Mar 2027, and 47 days from 15 Mar 2029**. This is the only machine-identity deadline already biting, and it forces certificate lifecycle automation on a fixed public schedule. `[S]`

**27 Jul 2026: Digital Omnibus on AI in force** `(now law)`
Regulation (EU) 2026/1744 of 8 July 2026, published in the Official Journal 24 July 2026, in force on the third day after. This is what deferred the AI Act's high-risk tier. Until 24 July it was a political agreement, not law. `[P]`

**2 Aug 2026: AI Act Article 50 applies** `(live)`
Transparency duties for AI systems: disclosing AI interaction, and marking synthetic audio, image and video in machine-readable form. **The Omnibus did not defer this.** The provision covering the deepfakes that drive the IDV market went live ten days ago, while the high-risk tier moved to 2027. `[P]`

**11 Aug 2026: fourth batch of wallet acts** `(yesterday)`
Implementing regulations 2026/1730, 2026/1731 and 2026/1735, adopted 15 July 2026, amend the earlier acts on applicable standards and specifications. The Architecture and Reference Framework (ARF) reached v3.0.0 in the same month. The technical floor was still being written four months before the issuance deadline. `[P]`

**24 Dec 2026: Member States must issue a wallet** `(fixed)`
Article 5a(1): each Member State shall provide at least one wallet within **24 months** of the implementing acts. The obligation is in the primary text; the precise day is arithmetic on the verified in-force date, and the Commission itself says only "by the end of 2026". `[D]`

**15 Mar 2027: TLS certificates cut to 100 days**
Second step of SC-081, with domain validation reuse also dropping to 100 days. `[S]`

**10 Jul 2027: AML Regulation applies** `(fixed)`
Regulation (EU) 2024/1624 harmonises customer due diligence across the EU, requiring identity verification from reliable, independent sources. The demand engine underneath every KYC pitch aimed at a bank. `[P]`

**2 Dec 2027: AI Act high-risk, incl. remote biometric ID** `(now law)`
Annex III stand-alone high-risk systems, which include remote biometric identification and biometric categorisation, deferred from 2 Aug 2026 by the Omnibus. Annex I product-embedded high-risk moves to 2 Aug 2028. `[P]`

**24 Dec 2027: relying parties must accept the wallet** `(fixed)`
Article 5f(2), and read the qualifiers carefully because they shrink the market. Private relying parties must accept the wallet within **36 months** of the implementing acts, but only where they are *"required by Union or national law to use strong user authentication for online identification"*, **microenterprises and small enterprises are expressly excluded**, and acceptance is owed *"only upon the voluntary request of the user"*. The sectors named are transport, energy, banking, financial services, social security, health, drinking water, postal services, digital infrastructure, education and telecommunications. Article 5f(3) covers very large online platforms and **contains no time period at all**. `[P]`

**31 Dec 2030: US federal post-quantum migration**
Executive Order 14409, signed 22 June 2026, requires high-value and high-impact federal systems to migrate to post-quantum cryptography by end-2030 and digital signatures by end-2031. A PKI and machine-identity re-issuance programme at national scale. `[S]`

Read the wallet timeline as a firm date behind an unfinished conformity regime. Reporting through mid-2026 is consistent and unflattering: the Commission is on record doubting that all Member States will make it, only Denmark, France, Germany and Italy had public external test environments as of early August, Germany's state wallet is slated for 2 January 2027 (nine days late), the Netherlands has signalled it is likely to miss, Bulgaria had not started serious development as of December 2025, and Lithuania signed a twelve-month sandbox contract in February 2026. No Member State has formally announced it will miss, and no infringement proceedings have opened, but both of those are negative findings from searching rather than confirmations. Sweden is targeting certification readiness only in 2028. `[S]`

**what a missed deadline does to the trade**

Article 5f obliges acceptance "upon the voluntary request of the user." If a Member State issues no wallet, there is no user request and nothing to accept. The obligation is not formally conditional on issuance, but it is functionally hollow without it. Combine that with the small-enterprise carve-out and the strong-authentication trigger, and the cleanest buy signal degrades from "mandated integration" to **mandated capability, unmandated volume, in whichever states actually ship**. Banks under PSD2 buy anyway. Telecom, energy and transport mostly do not clear the trigger today.

**United States**

REAL ID enforcement began 7 May 2025, phasing to full enforcement by 5 May 2027. Mobile driving licences are live and TSA-accepted in sixteen-plus states. NIST finalised **SP 800-63-4** in July 2025, codifying passkeys, phishing-resistance and remote identity proofing as the federal floor. `[S]`

**United Kingdom**

The Data (Use and Access) Act 2025 received Royal Assent 19 Jun 2025 and put the Digital Verification Services trust framework on a statutory footing from December 2025. The mandatory digital ID proposed in September 2025 was **abandoned in January 2026** after a 2.9M-signature petition; the scheme is now voluntary, though the government still intends to digitise right-to-work checks by 2029. A consultation opened in March 2026 with no response published. `[S]`

**the shape of it**

Every one of these is a government wallet or a government verification regime. The buyer that pays is the relying party forced to accept, or the enterprise forced to verify, not the individual choosing to. That distinction is the whole commercial argument of this note, and section 06 shows it in the funding.

## 05. Age assurance, the mandate that already landed

By this note's own test, that a regulator creates the buyer and compliance is not optional, age assurance scores higher than the EU wallet. The deadlines have passed rather than approaching, enforcement is live, the fines are real, and the obliged parties are a short list of named platforms rather than a diffuse set of relying parties who only have to respond if asked. It is also the part of identity where the money tape most obviously lags the mandate.

- **4.7M** Under-16 accounts restricted in Australia since the minimum-age law took effect 10 Dec 2025. eSafety Commissioner `[P]`
- **$10.4B** Age assurance market by 2029, from $5.7B in 2025, a 17.3% CAGR. Liminal, Nov 2024 `[S]`
- **~A$50M** Maximum penalty exposure under the Australian regime `[S]`
- **$0** Confirmable fresh venture into a pure age-assurance company in the funding window `[D]`

Australia's under-16 social media minimum age commenced **10 December 2025**, and platforms have since restricted 4.7 million accounts. `[P]` Ofcom published its statutory age assurance report in **July 2026**, finding that social media companies have failed to enforce their own minimum ages and warning that tougher action is needed. `[P]` France has passed the first EU national law restricting social media by age, the UK has further measures slated for 2027, and a growing list of US states requires age verification for adult content and app-store downloads. `[S]`

The commercial shape is unusual and worth stating plainly. The buyer is a very large platform with regulatory exposure measured in tens of millions, the purchase is compulsory and already overdue, and yet no pure age-assurance company closed a confirmable venture round in the last thirteen months: k-ID's $45M Series A was June 2024, and the widely quoted $50M is cumulative. Either the category is being served by incumbents bolting age estimation onto existing identity verification, or it is underfunded relative to a mandate that is already being enforced. Both readings favour a builder.

Treated as separate from the EU deadline stack because the instruments are national and sectoral rather than a single regulation, and because the obliged parties are platforms rather than relying parties in the eIDAS sense. The Liminal market size is a single-vendor forecast with a Nov 2024 vintage and is the softest figure in this section.

## 06. Where the venture money went

Disclosed rounds, **all stages, down to a floor of about $3.5M**, from July 2025 to 12 August 2026, across identity verification, identity security, non-human and agent identity, authentication, proof of personhood and EU wallet infrastructure. An all-stage cut was chosen deliberately: identity funding is barbelled, with a few very large growth rounds and a cluster of formation-stage agent-identity seeds, and the two ends say different things. Both are reported.

- **$1B+** Keyfactor, 6 Jul 2026, Summit Partners. Machine identity and PKI. The largest round in the window `[P]`
- **~$2.8B** Across the 25 disclosed rounds below, counting Keyfactor's "over $1B" as $1B `[D]`
- **16 of 25** Rounds pitched on non-human, machine or AI-agent identity `[D]`
- **$25B** Palo Alto Networks for CyberArk, the largest identity deal ever, closed 11 Feb 2026 `[P]`

| Company | Origin | Stage | Raised | Segment | What it signals |
| --- | --- | --- | --- | --- | --- |
| Keyfactor | US | Growth | $1B+ | Machine identity / PKI | **6 Jul 2026.** Summit Partners led a strategic growth investment exceeding $1B; Insight and Sixth Street retain significant ownership. Certificates, cryptographic assets and machine identities pitched as "trust infrastructure for the AI and quantum era", 2,500+ customers. The certificate lifetime collapse in section 04 is this company's tailwind. `[P]` |
| Saviynt | US | Series B * | $700M | Identity governance | 9 Dec 2025. KKR led, with Sixth Street, TenEleven and Carrick, at a ~$3B valuation. Growth equity in all but the label. ARR passed $300M by July 2026 with bookings up 80%. `[P]` |
| Zenity | IL → US | Series C | $125M | AI agent governance | 3 Aug 2026. Norwest led, with SoftBank Vision Fund 2, Intel Capital, Hitachi and LG. Pitched explicitly at "the era of 1 billion AI agents": securing and governing what agents are allowed to do. `[P]` |
| Oasis Security | IL → US | Series B | $120M | Non-human identity | 19 Mar 2026. Craft Ventures led, with Sequoia, Accel and Cyberstarts; $195M total. The largest pure non-human-identity round on record. `[P]` |
| WorkOS | US | Series C | $100M | Enterprise auth | 2 Mar 2026, $2B valuation. Meritech and Sapphire co-led. Single sign-on and user-provisioning APIs for B2B apps, now extending into agent authentication. `[P]` |
| Obsidian Security | US | Series D | $85M | NHI in SaaS | 4 Aug 2026, $1.1B valuation. Crescent Cove led, with Greylock, Menlo, Norwest, IVP and GV. Non-human identity and AI agents inside SaaS estates. `[P]` |
| ConductorOne | US | Series B | $79M | Identity security | 28 Oct 2025. Greycroft led, with CrowdStrike's Falcon Fund as strategic backer, plus Accel and Felicis. "AI-native identity security" over access governance. `[P]` |
| NewCore | IL → US | Seed * | $66M | AI agent identity | Out of stealth **15 Jun 2026** at a ~$300M post-money. Cyberstarts, Index and Evolution Equity backed it; the primary names no lead and does not use the word seed. Founded by Zohar Alon (Dome9, sold to Check Point). `[P]` |
| ID.me | US | Series E | $65M | Reusable identity | 4 Sep 2025, Ribbit Capital led at a $2B+ valuation, to expand reusable digital identity. Reported widely as "$340M", which conflates this equity round with a $275M credit facility agreed in January. Only the $65M is venture equity. `[S]` |
| Oak | IL → US | Seed | $60M | Agentic identity | Out of stealth **15 Jul 2026**. Accel, Greylock and CRV co-led, with Hetz and AlphaDrive. An "AI-native identity operating system" over human, machine and agent identity. Shai Morag, who sold Ermetic to Tenable for $265M. `[P]` |
| World | US | Token * | $52.5M | Proof of personhood | 26 Jul 2026, Pantera Capital, structured as a one-year-locked token sale rather than equity. Biometric proof that a counterparty is human, with 10M+ verified users. The largest consumer-held identity deployment on earth, and the one the "consumers do not pay" thesis has to account for. `[S]` |
| IDfy | India | Series F | $52M | IDV / KYC | 18 Feb 2026 (₹476 crore), Neo Asset Management led, at a ~$256M valuation. A further $23M followed in June 2026 with no designated stage or lead, counted here as part of the same row rather than a separate round. `[S]` |
| Clerk | US | Series C | $50M | Developer auth | 15 Oct 2025. Menlo Ventures and Anthropic's Anthology Fund led. A developer-authentication company repositioning around agent identity. The $30M some trackers report is wrong; the primary says $50M. `[P]` |
| GitGuardian | France | Series C | $50M | NHI / secrets | 11 Feb 2026. Insight Partners led. Secrets detection moving into per-agent credentials and non-human identity governance. `[P]` |
| Descope | US → IL | Seed ext. | $35M | CIAM / agentic identity | 30 Sep 2025, existing investors only (Lightspeed, Dell Tech Capital, Notable); $88M total. Pinned to an "agentic identity hub" and MCP authorization for agents. `[P]` |
| Apono | IL → US | Series B | $34M | Privileged access | 18 Nov 2025. USVP led, with Swisscom, Vertex and 33N. Just-in-time privileged access repositioned "for the agentic era." `[P]` |
| Hush Security | IL | Series A | $30M | Non-human identity | 28 Jul 2026. Battery and YL Ventures led, with Akamai joining as a strategic investor. Framed as closing "the AI agent governance gap" by replacing static secrets. `[P]` |
| Opal Security | US | Series B | $23M | Access governance | 5 Jun 2026. Greylock and Battery. AI-native access governance; $59M total. `[S]` |
| Vouched | US | Series A | $17M | IDV → agent verification | 4 Sep 2025. Spring Rock Ventures led. An identity-verification company pivoting into a "Know Your Agent" suite: verifying the non-human, not just the human. `[P]` |
| Resemble AI | US | Strategic | $13M | Voice deepfake defence | 8 Dec 2025, a no-lead strategic round: Google's AI Futures Fund, Sony Innovation Fund, Okta Ventures, KDDI and Taiwania among others; $25M total. `[P]` |
| AiPrise | US | Series A | $12.5M | KYC / KYB | 8 Oct 2025. Headline led, with Y Combinator, SixThirty and Correlation. Global KYC and business verification through one integration. `[P]` |
| Self | US | Seed | $9M | ZK identity / VCs | 13 Nov 2025, San Francisco dateline, Greenfield Capital with SBI and Spearhead. Zero-knowledge identity and proof-of-humanity built on verifiable credentials. Small, crypto-native, and the round that disproves a blanket claim that US verifiable-credential startups raised nothing. `[P]` |
| Wultra | Czechia | Series A | €6.8M | EUDI wallet auth | 29 Jun 2026. Seventure Partners led. Post-quantum authentication and EU wallet infrastructure for banks: a supply-side answer to the acceptance mandate. `[P]` |
| Didit | US / ES | Seed | $6M | KYC / KYB | May 2026, Y Combinator and Pioneer Fund co-led; $7.5M cumulative. Free-tier KYC infrastructure with 1,500 customers, undercutting per-verification pricing across the category. `[P]` |
| Lissi | Germany | Seed | €3.5M | EUDI wallet / VCs | 9 Jul 2026. Ventech led, with Commerzbank's Main Incubator. Wallet connectivity and verifiable credentials for the EU ecosystem. Bank-backed, and small. `[P]` |

Origin reads founding team → domicile. Amounts in USD unless shown in EUR (Wultra ~$7.4M, Lissi ~$3.8M); the ~$2.8B total counts Keyfactor's "over $1B" as exactly $1B and converts EUR at about 1.1. * Saviynt's own release labels a $700M growth round "Series B". * NewCore's primary names no lead and does not say "seed"; both are secondary attributions. * World is a token sale, not equity, and is marked as such rather than excluded, because excluding it would flatter the argument. **Checked and excluded, with reasons:** Persona ($200M Series D), Veza ($108M Series D), Sardine ($70M Series C) and Astrix ($45M Series B) are all pre-window. Incode was reported in November 2025 as seeking up to a $3B valuation but has still not announced a close, so it stays out; it did commit $100M to privacy infrastructure and acquire Identiq in June 2026. Ent ($100M seed, Jun 2026) and Frame Security ($50M, May 2026) are endpoint and human-risk security respectively, not identity infrastructure. Billions Network ($30M, 31 Jul 2025) could not be confirmed as equity rather than token, and its domicile is unresolved. Gataca raised in July 2026 with an undisclosed amount. Offroad ($7M) could not be confirmed from a primary. Below the floor: Sybol (€1M), IDsure (€600K). Sensity took European Innovation Council money, which is a grant, not venture. Five ID ($6M) is palm biometric payments rather than identity infrastructure. `[S]`

**machine identity is where the size is**

The two largest rounds in the window are both machine identity in substance: Keyfactor at over $1B on certificates and cryptographic assets, and Saviynt at $700M pitched as identity security for the AI era. Add Oasis, Obsidian, GitGuardian, Hush and Zenity and the non-human side carries the tape at every scale from $30M to $1B.

**everything is repositioning**

Sixteen of twenty-five rounds are sold on non-human or agent identity. A developer-auth company (Clerk), a CIAM company (Descope), a secrets scanner (GitGuardian), a privileged-access company (Apono) and an IDV company (Vouched) all now lead with agents. When every category converges on one story, some of it is genuine and some of it is a deck.

**consolidation is the real event**

**Palo Alto Networks bought CyberArk for about $25B**, closing 11 Feb 2026, and launched the Idira identity platform in May. ServiceNow completed Veza at **$1.3B** in March, SailPoint completed Entro in June, Okta signed Permiso in July, and Visa agreed to buy BioCatch for **$2.4B** on 3 Aug 2026. The platforms are buying the category faster than startups can scale into it. `[P]`

**Tel Aviv builds, the US sells, again**

Israeli-founded and US-domiciled dominates the security side: Oasis, NewCore, Oak, Apono, Hush, Zenity. Cyberstarts, Accel and Greylock recur, the same cluster as the cybersecurity tape. Identity is funded as a branch of security, not as consumer software.

**Europe funds the wallet in small cheques**

The only distinctly European cluster is wallet plumbing: Wultra (€6.8M) and Lissi (€3.5M), the latter Commerzbank-backed, plus GitGuardian on the secrets side. A mandate worth billions in relying-party integration is being served on the supply side by single-digit-million seeds. The deadline is ahead of the money.

**what did not get funded**

No pure age-assurance round, despite the enforcement in section 05. No classic US self-sovereign-identity round: SpruceID's last raise was 2022, and the nearest thing is Self's $9M crypto-native seed. The categories with the clearest regulatory pull are the ones venture is not touching.

## 07. What has a B2B edge

Buying behaviour first, and one correction to the received wisdom. Verizon's 2026 DBIR moved **vulnerability exploitation into first place as the initial access vector at 31%**, with credential abuse falling to 13% as the first step. Credentials still appear *somewhere* in 39% of breaches and the human element in 62%, so identity remains the largest single thread through breach data, but "credential abuse is the number one way in" stopped being true this year. `[P]` Sell on the 39%, not on a slogan that the current DBIR contradicts.

### 1. Non-human and agent identity `[buy signal]`

At least 50 machine identities per human and climbing, 99% of organisations running AI agents, only 37% able to revoke an agent's credentials, 79% of practitioners rating their own ability to stop non-human identity attacks as low or moderate. The capital agrees: Keyfactor, Saviynt, Oasis, Obsidian, Zenity and Hush all landed in the window. Sells: issuing, authenticating and governing agent and machine identity; just-in-time access for agents; secrets graduating to per-agent credentials; certificate lifecycle automation.

> Edge: the fastest-forming budget line in identity, with a hard dated forcing function in the certificate lifetime collapse. Weakness: Palo Alto now owns CyberArk, Okta and Microsoft are shipping agent identity, and pricing is per-seat while the population is per-machine. A standalone has a closing window.

### 2. Age assurance `[buy signal]`

The only mandate in this note whose deadline has already passed and whose enforcement is already visible: 4.7 million Australian accounts restricted, Ofcom warning in July 2026 that platforms have failed to enforce minimum ages, France legislating, US states multiplying. A $5.7B market growing at 17.3%, and not one confirmable venture round in thirteen months.

> Edge: compulsory, overdue, and the obliged parties are named platforms with tens of millions in exposure. Weakness: the buyer is a handful of very large platforms with the engineering capacity to build it themselves, and privacy backlash is a live political risk in every market.

### 3. Relying-party acceptance, on a legal clock `[buy signal]`

The EU wallet forces obliged relying parties to accept by 24 Dec 2027. Read the clause carefully though: small enterprises are carved out, the trigger is a legal strong-authentication requirement rather than sector membership, and acceptance is owed only on the user's request. In practice that means **banks first, under PSD2, and everyone else later or never**. Sells: relying-party infrastructure for acceptance and verification, wallet SDKs, mDL acceptance folded into existing KYC.

> Edge: the regulator creates the buyer, and financial services clears the trigger unambiguously. Weakness: mandated capability is not mandated volume, and Member State issuance is visibly slipping. Sell the integration, do not model per-transaction revenue yet.

### 4. Injection and deepfake defence for IDV `[buy signal]`

iOS injection attacks up 741% across 2025, deepfakes now one in five biometric fraud attempts, synthetic identity the leading first-party fraud scheme at 21%. The attack has moved from the face to the camera pipeline, which defeats liveness checks that assume a real sensor. Sells: injection detection, device-bound and cryptographic liveness, layered verification that trusts no single signal. AI Act Article 50 marking duties went live on 2 August and give the sale a compliance hook.

> Edge: the pain is current, measured, and reported by the incumbents themselves. Weakness: an arms race, so it is recurring detection revenue rather than a one-time integration, and the platform IDV vendors ship it too.

### 5. Post-quantum and cryptographic inventory `[buy signal]`

Executive Order 14409 puts US federal high-value systems on a 2030 post-quantum cryptography (PQC) deadline with digital signatures by 2031, and contractors inherit it. Combined with certificates dropping to 47 days by 2029, the same buyer needs one thing: a live inventory of every cryptographic asset and the ability to rotate it. Keyfactor raised over $1B against exactly this. Sells: discovery, inventory, crypto-agility, automated rotation.

> Edge: two independent forcing functions pointing at one capability, and a federal procurement channel. Weakness: long sales cycles, and it is a consulting business unless you own the automation.

### 6. Reusable identity and consumer SSI `[hold]`

Nuanced, and the nuance matters. The architecture won: the EU wallet mandates selective disclosure and unlinkability, W3C Verifiable Credentials 2.0 became a Recommendation in May 2025, and California has issued over 4 million mobile driving licences in verifiable-credential format with 825 businesses accepting them. What did not arrive is the business model. ID.me raised $65M for reusable identity, but as a centralised federated provider, not a user-held credential.

> Edge: real if a government wallet or a state mDL becomes the rail you build acceptance on. Weakness: you do not own the rail, the state issues it and Apple and Google hold it, and the citizen who was supposed to pay does not. Build on the mandate, not the movement.

On self-sovereign identity, the accurate formulation is that **it won the architecture and lost the business model**. eIDAS 2.0 requires wallets to enable selective disclosure and to support unlinkability, which is the privacy model the movement spent a decade specifying, and the credential is genuinely held on the user's device under user consent. What failed was the assumption that the holder would also be the payer. The issuer pays, and the issuer is a government. Two caveats in the other direction: zero-knowledge proof support is optional in the reference framework with no deployment deadline, so unlinkability is legislated and not yet shipped; and a company with a state contract does not need a venture round, so the absence of SSI funding is weak evidence of the absence of an SSI business.

## 08. Do not sell this

- **Consumer "own your identity" wallets.** The architecture won and the consumer still does not pay. Sell to the issuer or the relying party, not the holder.
- **Standalone liveness, no injection defence.** The attack moved to the camera pipeline. iOS injection up 741% in a year makes face-only verification in isolation indefensible.
- **A wallet no one must accept.** Without a regulator forcing acceptance, or a state issuing the credential, a verifiable-credential wallet is a demo.
- **Another human-only CIAM or sign-on suite.** Saturated by Okta, Auth0, Entra and Ping, and now by a $25B Palo Alto platform with CyberArk inside it.
- **"Credential abuse is the top attack vector."** Not the product, the pitch. DBIR 2026 put vulnerability exploitation first. Using last year's stat in front of a security buyer costs you the room.

## 09. Sources

- **EU regulation (primary)**: Regulation (EU) 2024/1183 (eIDAS 2.0), in force 20 May 2024; consolidated Regulation 910/2014 (CELEX 02014R0910-20241018) for the text of Articles 5a and 5f; wallet implementing regulations (EU) 2024/2977-2982 (in force 24 Dec 2024), 2025/846-849, 2025/1569, 2025/2160-2164, and 2026/1730, 2026/1731, 2026/1735 (adopted 15 Jul 2026, in force 11 Aug 2026); Architecture and Reference Framework v3.0.0 (July 2026); Regulation (EU) 2024/1624 (AML), applies 10 Jul 2027; Regulation (EU) 2026/1744 (Digital Omnibus on AI), OJ 24 Jul 2026, in force 27 Jul 2026; AI Act (EU) 2024/1689 Article 50, applicable 2 Aug 2026, and Annex III high-risk from 2 Dec 2027.
- **Market sizing**: Juniper Research, digital identity spend $51B to $80B by 2030 (20 Oct 2025) and digital identity verification just under $19B in 2026 to ~$29B by 2030 (May 2026); MarketsandMarkets, IAM to $42.61B by 2030 (19 Nov 2025) and biometric identity verification to $17.81B by 2030 (7 Jan 2026); Liminal, age assurance $5.7B to $10.4B by 2029 (13 Nov 2024) and the reusable identity opportunity; Grand View Research, self-sovereign identity (Apr 2025) and passwordless authentication (Oct 2024); Mordor Intelligence, decentralized identity (28 Jan 2026) and secrets management (11 Aug 2025).
- **Machine identity ratios**: Silverfort, 50:1 from authentication telemetry (22 May 2025); Palo Alto Networks / Idira, 2026 Identity Security Landscape, 109:1 from a survey of 2,930 decision-makers (14 May 2026), also the source for the 99% agent adoption, 37% revocation and 30% audit-logging figures; Entro Security, 144:1 from vendor scan data (2026); CyberArk 2025 Identity Security Landscape, 82:1 (23 Apr 2025), superseded and shown for comparison only.
- **Forecasts**: Gartner, 40% of enterprises to demote or decommission AI agents by 2027 (26 May 2026); 40% of enterprise apps to feature task-specific AI agents by 2026 (26 Aug 2025); 30% of enterprises to consider IDV unreliable in isolation by 2026 (1 Feb 2024); 500M digital-identity-wallet users by 2026 (24 Sep 2024). ABI Research, EUDI Wallet 80% target slipping to 2032 (15 Feb 2024).
- **Fraud, breach and adoption data**: Verizon 2026 Data Breach Investigations Report (19 May 2026); Entrust 2026 Identity Fraud Report (18 Nov 2025); Sumsub Identity Fraud Report 2025-2026 (25 Nov 2025); iProov Threat Intelligence Report 2026 (8 Apr 2026); Cloud Security Alliance with Oasis Security, non-human identity survey (27 Jan 2026); FIDO Alliance, 5 billion passkeys (World Passkey Day, May 2026); Deloitte, gen-AI fraud to $40B by 2027 (29 May 2024).
- **Age assurance and government**: eSafety Commissioner (Australia), 4.7M under-16 accounts restricted following the 10 Dec 2025 commencement; Ofcom statutory age assurance report (July 2026); NIST SP 800-63-4 (final, July 2025); Executive Order 14409 on post-quantum migration (22 Jun 2026); CA/Browser Forum ballot SC-081 on certificate lifetimes (adopted Apr 2025); Data (Use and Access) Act 2025 (UK, Royal Assent 19 Jun 2025) and the January 2026 abandonment of mandatory digital ID; W3C Verifiable Credentials 2.0 Recommendation (15 May 2025); SpruceID / California DMV mDL deployment figures.
- **Funding and M&A**: company and investor releases via PR Newswire (Keyfactor and Summit Partners 6 Jul 2026; Saviynt 9 Dec 2025; Oak 15 Jul 2026; NewCore 15 Jun 2026; Apono 18 Nov 2025; Hush Security 28 Jul 2026), BusinessWire (ConductorOne 28 Oct 2025; Vouched 4 Sep 2025; Self 13 Nov 2025), GlobeNewswire (Descope 30 Sep 2025), AccessNewswire (Oasis 19 Mar 2026), and company newsrooms (Clerk 15 Oct 2025; WorkOS 2 Mar 2026; GitGuardian 11 Feb 2026; Wultra 29 Jun 2026; Resemble AI 8 Dec 2025; Zenity 3 Aug 2026; Obsidian 4 Aug 2026); Palo Alto Networks on the CyberArk acquisition (announced 30 Jul 2025, closed 11 Feb 2026) and the Idira launch (May 2026); ServiceNow on completing Veza at $1.3B (2 Mar 2026); SailPoint on completing Entro (29 Jun 2026); Okta on Permiso (30 Jul 2026); Visa on BioCatch (3 Aug 2026); CrowdStrike on agreeing to acquire SGNL (8 Jan 2026, close not confirmed, the ~$740M price is press reporting rather than company-disclosed). Discovery and cross-checks via Crunchbase News, Biometric Update, SiliconANGLE, EU-Startups and Fintech Futures.

## 10. Glossary

Every abbreviation and term of art used above, in the sense it is used here.

### EU regulation

**eIDAS 2.0** *(Regulation (EU) 2024/1183)*
The 2024 amendment to the EU's electronic identity regulation that creates the European Digital Identity Wallet and the duty to provide and accept it.

**EUDI Wallet** *(European Digital Identity Wallet)*
A state-provisioned app holding identity and attribute credentials. Every Member State must issue at least one; certain regulated companies must accept it.

**Relying party**
The organisation that receives and checks an identity or credential. Under Article 5f, obliged relying parties must accept the wallet when a user asks.

**Article 5a**
The clause requiring each Member State to provide a wallet within 24 months of the implementing acts, i.e. by 24 Dec 2026.

**Article 5f**
The clause requiring obliged private relying parties to accept the wallet within 36 months, i.e. by 24 Dec 2027, excluding micro and small enterprises and only on the user's request.

**Implementing acts**
The technical regulations that make the wallet operational. The first batch's in-force date, 24 Dec 2024, starts both wallet clocks; a fourth batch landed 11 Aug 2026.

**ARF** *(Architecture and Reference Framework)*
The wallet's technical specification, maintained on GitHub and still versioning monthly. At v3.0.0 in July 2026.

**Strong user authentication**
Multi-factor authentication required by law for certain online services, notably under PSD2 in financial services. The actual trigger for the Article 5f acceptance duty.

**AML Regulation** *(Regulation (EU) 2024/1624)*
Harmonised EU anti-money-laundering rules applying 10 Jul 2027, requiring identity verification from reliable, independent sources. The KYC demand engine.

**AI Act** *(Regulation (EU) 2024/1689)*
Risk-tiered EU rules for AI. Article 50 transparency duties apply from 2 Aug 2026; the high-risk tier covering remote biometric identification applies 2 Dec 2027.

**Article 50**
The AI Act's transparency duties: disclosing AI interaction and marking synthetic media in machine-readable form. Not deferred by the Omnibus.

**Digital Omnibus** *(Regulation (EU) 2026/1744)*
The amendment package that deferred the AI Act's high-risk deadlines. In force 27 Jul 2026.

**Annex III**
The AI Act list of stand-alone high-risk systems, including remote biometric identification and biometric categorisation.

### Identity types

**Digital identity**
The electronic representation of a person or entity used to authenticate and authorise. The umbrella market this note covers.

**Machine identity**
Credentials belonging to software rather than people: service accounts, API tokens, certificates, CI/CD automations, agents.

**Non-human identity** *(NHI)*
The current term of art for machine identity as a security category, spanning service accounts, secrets, workload identity and agents.

**Agent identity**
Identity for an autonomous AI agent acting on a user's or company's behalf. An agent needs to be authenticated, scoped and revocable like a user.

**Self-sovereign identity** *(SSI)*
A model where the individual holds and controls their own credentials without a central authority. Won the architecture, lost the business model.

**Verifiable credential** *(VC)*
A tamper-evident, cryptographically signed claim a holder can present and a verifier can check. W3C VC 2.0 became a Recommendation in May 2025.

**Reusable identity**
An identity verified once and re-presented to many services. Realised mostly through centralised federated providers and government wallets, not user-held credentials.

**Proof of personhood**
Establishing that a counterparty is a unique living human rather than a bot or an agent. A newly commercial problem now that agents transact.

**Selective disclosure**
Presenting only the attribute required (over 18) rather than the whole credential (date of birth). Required of EU wallets.

**Unlinkability**
The property that two presentations of the same credential cannot be correlated into a profile. Legislated for EU wallets; not yet shipped, since zero-knowledge support is optional in the ARF.

**Zero-knowledge proof** *(ZKP)*
Cryptography that proves a statement is true without revealing the underlying data. The mechanism behind unlinkable selective disclosure.

### Verification & auth

**IDV** *(Identity Verification)*
Proving a person is who they claim at onboarding, usually via document and biometric checks. The market deepfakes are disrupting.

**KYC** *(Know Your Customer)*
The regulated process of verifying a customer's identity, mandated by AML law. The largest commercial pull on IDV spend.

**KYB** *(Know Your Business)*
The equivalent of KYC for verifying a business entity and its beneficial owners.

**IAM** *(Identity and Access Management)*
The systems managing who, or what, can access which resources. The largest sized identity sub-market.

**CIAM** *(Customer Identity and Access Management)*
IAM pointed at external users: sign-up, login, consent. The human-facing, incumbent-saturated layer.

**Age assurance**
Establishing that a user is above or below an age threshold, by document, estimation or inference. Distinct from full identity verification, and increasingly compulsory.

**Passkey**
A phishing-resistant, device-bound credential replacing the password. 5 billion issued as of May 2026.

**Passwordless**
Authentication without a shared secret, using passkeys, biometrics or device possession.

**Liveness**
The check that a biometric sample comes from a live person rather than a photo, video or injected feed.

**Injection attack**
Feeding fake video straight into the verification pipeline, bypassing the camera, often via a virtual camera. The attack that defeats naive liveness.

**Just-in-time access**
Granting a permission only for the moment it is needed and revoking it after, rather than leaving standing privilege.

### Fraud & AI

**Deepfake**
Synthetic audio, video or imagery of a real person, used to defeat biometric verification and impersonate.

**Synthetic identity**
A fabricated identity built from a consistent but invented or blended set of attributes. The leading first-party fraud scheme, distinct from impersonating a real person.

**First-party fraud**
Fraud committed by someone using their own or a fabricated identity rather than stealing a real victim's.

**Agentic AI**
AI systems that take actions autonomously, calling tools and touching production, without a human approving each step. Each agent is a new identity to govern.

**MCP** *(Model Context Protocol)*
The open standard by which agents connect to tools and data. Its authorization layer is being built now.

**Credential abuse**
Using stolen or leaked credentials to gain access. Present in 39% of 2026 DBIR breaches, though no longer the top initial access vector.

**DBIR** *(Data Breach Investigations Report)*
Verizon's annual analysis of breach data, the standard reference for how attacks actually start. The 2026 edition is cited here.

### Machine identity & crypto

**PKI** *(Public Key Infrastructure)*
The certificate authorities, keys and policies that let machines prove identity to each other. The substrate under machine identity.

**TLS certificate**
The credential proving a server is what it claims. Maximum lifetime is dropping from 398 days to 47 by 2029, forcing automation.

**SC-081**
The CA/Browser Forum ballot, adopted April 2025, that sets the 200, 100 and 47-day certificate lifetime steps.

**Certificate lifecycle automation**
Discovering, issuing, rotating and revoking certificates without humans. Optional at 398-day lifetimes, mandatory at 47.

**Secrets**
API keys, tokens and passwords held by software. Being replaced in newer designs by short-lived, per-agent credentials.

**PQC** *(Post-Quantum Cryptography)*
Algorithms designed to survive a quantum computer. The work is inventory and re-issuance, not mathematics.

**Crypto-agility**
Being able to swap cryptographic algorithms without re-architecting. The actual deliverable of a post-quantum programme.

**mDL** *(Mobile Driving Licence)*
A driving licence held on a phone, standardised under ISO/IEC 18013-5 and -7. California has issued over 4 million.

**SP 800-63-4** *(NIST Digital Identity Guidelines)*
The US federal digital identity guidelines, finalised July 2025, codifying passkeys, phishing-resistance and remote identity proofing.

**REAL ID**
The US federal standard for state IDs accepted at airports. Enforcement began 7 May 2025, phasing to full enforcement by May 2027.

**DVS** *(Digital Verification Services)*
The UK's statutory trust framework for certified identity providers, under the Data (Use and Access) Act 2025.

### Market & funding

**CAGR** *(Compound Annual Growth Rate)*
The smoothed annual rate from a start value to an end value. Hides everything in between, and inflates on a tiny base.

**Formation stage**
Pre-seed, seed and Series A, where investors bet a category exists rather than that a company can scale.

**Growth equity**
Late private capital for companies that already work. Keyfactor's and Saviynt's rounds are this in substance, whatever the label.

**Token sale**
Raising against a cryptographic token rather than equity. Not comparable to a venture round, and marked separately where it appears.

**Valuation**
Post-money unless stated. A negotiated number, not a measurement.

**Relying-party infrastructure**
The software a company needs to accept and verify a wallet or credential. What the EU acceptance mandate creates demand for.

### Source tiers used in this note

**P** *(Primary)*
The organisation's own release, filing or document.

**S** *(Secondary)*
Credible reporting of a primary source not directly accessible.

**D** *(Derived)*
Someone's arithmetic on a primary source. Treat as opinion.

## 11. Method and disclosure

**How this was built**
Every figure was traced to a named source before it was written down, and each claim carries a provenance tag: **P** where the organisation published it itself, **S** where credible reporting relays a primary source not directly accessible, **D** where the number is somebody's arithmetic on top of a primary. The wallet dates of 24 Dec 2026 and 24 Dec 2027 are tagged D because they are arithmetic on the verified 24 and 36-month obligations in Articles 5a and 5f plus the verified 24 Dec 2024 in-force date of the implementing acts; the Commission itself publishes only "end of 2026". Anything that could not be verified was left out rather than estimated.

**Scope of the funding table**
Disclosed rounds at any stage, down to a floor of roughly $3.5M, between July 2025 and 12 August 2026, across identity verification, identity security, non-human and agent identity, authentication, proof of personhood and EU wallet infrastructure. Pre-window rounds, unclosed rounds, grants, adjacent security categories and rounds without a confirmable amount are listed as excluded in section 06 with the reason, so the omissions are auditable. One token sale is included and labelled rather than dropped, because dropping it would have flattered the argument.

**On the machine-identity ratio**
Published ratios range from 50:1 to 144:1 and the note shows all of them with their measurement method, because the spread is the story. The only telemetry-derived figure is the lowest. Survey-derived figures ask decision-makers to estimate a population that the same surveys say most organisations do not track, and vendor scan data is drawn from customers selected for having the problem. The argument here rests on the direction and slope, which every source agrees on, not on any single point.

**On the softest numbers**
The self-sovereign and decentralized identity market sizes are the least reliable figures in this note: small base, single-vendor sourcing, and two- to threefold disagreement between publishers. They are shown to make a point about the gap between paper growth and real money. The age assurance market size is a single-vendor 2024 forecast. No self-sovereign, reusable-identity or age-assurance market size is used as a headline.

**Shelf life**
Compiled 12 August 2026. Funding data ages in weeks and analyst forecasts get revised, sometimes within a single quarter. Treat every number as correct on that date and nothing more. Regulatory dates reflect law in force at compilation, including the fourth batch of wallet implementing acts that entered into force on 11 August 2026.

**Disclosure**
Independent research, written in a personal capacity. No company, investor or vendor named here commissioned, reviewed, funded or saw this before publication, and there is no commercial relationship with any of them. Views are the author's own and not those of any employer or client.

**Not advice**
This is market analysis, not investment, legal or compliance advice. Nothing here is a recommendation to buy or sell any security or to rely on any regulatory reading. Compliance deadlines and their application to a specific product are a question for qualified counsel.

**Corrections**
Errors of fact will be corrected and noted. Send them to [mhrsntrk.com](https://mhrsntrk.com) or [@mhrsntrk](https://x.com/mhrsntrk).

**Reuse**
Text and charts released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): reuse freely with attribution and a link back. The mhrsntrk wordmark is excluded from that licence.

---

Identity 2027: Where the Budget Goes and What Sells. By Mahir Senturk, mhrsntrk.com, 12 August 2026. Source: https://mhrsntrk.com/reports/identity-2027 . Licensed CC BY 4.0, attribution required.
