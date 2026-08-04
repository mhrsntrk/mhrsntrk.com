/**
 * Per-post <title> overrides.
 *
 * A post title is written for the page, where length is free. A SERP title is
 * truncated around 60 characters, so anything longer gets cut mid-phrase and
 * loses whatever sat at the end. These overrides are the short form for the
 * handful of posts whose own title does not fit; the H1 on the page keeps the
 * full title.
 *
 * Only add a slug here when the post title is longer than 60 characters —
 * BlogSeo already drops the " – mhrsntrk" suffix on its own when the combined
 * string would overflow.
 */
const SEO_TITLES = {
  'agent-privacy-liability-paradox':
    'Proving an Agent Is Vouched For Without Naming the Voucher',
  'agent-identity-standards-map':
    'Agent Identity Standards Map: eIDAS2, EUDI, MCP, ERC-8004',
  'oid4vc-oid4vp-in-plain-english':
    'OID4VC and OID4VP in Plain English: Issue and Present',
  'delegation-chain-accountability':
    'The Delegation Chain: Who Is Accountable for an Agent',
  'dijital-kimlik-yoenetiminin-gelecegi-oez-kimlik-self-sovereign-identity':
    'Dijital Kimliğin Geleceği: Öz Kimlik (SSI)',
  'the-eus-anonymous-age-verification-app-is-not-anonymous':
    'The EU Age Verification App Is Not Anonymous',
  'building-my-personal-ssi-ecosystem-part-2-fortune-cookie-issuer':
    'Personal SSI Ecosystem Part 2: Fortune Cookie Issuer',
  'know-your-agent-kya-in-action-mcp-servers-as-ai-identity-wallets':
    'KYA in Action: MCP Servers as AI Identity Wallets',
  'tuerkiye-nin-veri-sizintisi-krizi-ve-oez-kimlik-ssi-ile-coezuem-yolu':
    'Türkiye’nin Veri Sızıntısı Krizi ve Öz Kimlik (SSI)',
  'introducing-bino-kids-safe-image-search':
    'Bino: A Kids-Safe Image Search App That Collects Nothing',
  'open-id-for-verifiable-credential-issuance-oidc-4-vci-1-0-is-here':
    'OpenID for Verifiable Credential Issuance (OID4VCI) 1.0',
  'open-id-for-verifiable-presentations-oidc-4-vp-1-0-is-here':
    'OpenID for Verifiable Presentations 1.0 (OID4VP)',
  'enabling-a-sustainable-future-through-self-sovereign-identity':
    'A Sustainable Future Through Self-Sovereign Identity',
  'remove-exif-from-iphone-photos-shortcut':
    'Remove EXIF From iPhone Photos in Three Taps',
  // Short the other way: two words carry no query terms at all.
  'boring-identity': 'Boring Identity: Why SSI Loses to the Dull Option'
};

export default SEO_TITLES;
