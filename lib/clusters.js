// Topic clusters. Curated here (Strapi posts carry no category field) so the
// pillar hub page, the per-post "part of series" banner, and related-posts all
// share one source of truth. Order is the intended reading order.

export const AGENT_IDENTITY = {
  slug: 'agent-identity',
  title: 'Agent Identity',
  tagline:
    'How AI agents get verifiable identity: recognition (which agent is this) and, the harder half, authority (what is it allowed to do, for whom, until when).',
  // Canonical, quotable definition featured at the top of the hub.
  definition:
    'Agent identity is the set of claims that let a counterparty decide whether to trust an AI agent’s request. It splits into two very different things: recognition, which agent this is, an identifier and some metadata; and authority, what it is allowed to do, on whose behalf, and until when. Recognition resembles the human identity systems we already have. Authority is the part that actually gates actions, and it is where the hard problems live.',
  posts: [
    {
      slug: 'what-is-know-your-agent-kya',
      title: 'What Is Know Your Agent (KYA)?',
      blurb: 'Plain-english explainer of KYA and why it is not KYC for bots.'
    },
    {
      slug: 'know-your-agent-kya',
      title: 'Know Your Agent (KYA)',
      blurb:
        'The canonical KYA definition, splitting agent identity into recognition and authority.'
    },
    {
      slug: 'why-api-keys-fail-agent-identity',
      title: 'Why API Keys and Service Accounts Fail as Agent Identity',
      blurb: 'Why workload identity proves what a process is, not who authorized it.'
    },
    {
      slug: 'your-agent-needs-a-mandate-not-a-name',
      title: 'Your Agent Needs a Mandate, Not a Name',
      blurb: 'Why agent identity is a scoped mandate and authority, not just a name.'
    },
    {
      slug: 'know-your-agent-kya-in-action-mcp-servers-as-ai-identity-wallets',
      title: 'KYA in Action: MCP Servers as AI Identity Wallets',
      blurb: 'How Model Context Protocol servers act as identity wallets that make KYA real.'
    },
    {
      slug: 'the-agent-web-stack',
      title: 'The Agent Web Stack',
      blurb: 'The stack an agent uses to work the open web: search, extract, interact.'
    },
    {
      slug: 'ai-social-graphs-and-the-rise-of-agent-societies',
      title: 'AI Social Graphs and the Rise of Agent Societies',
      blurb: 'How agents discover, trust, and collaborate, forming their own social graphs.'
    },
    {
      slug: 'why-i-gave-my-ai-agent-a-physical-body',
      title: 'Why I Gave My AI Agent a Physical Body',
      blurb: 'A physical-device experiment for human-in-the-loop agent workflows.'
    },
    {
      slug: 'when-your-agent-dies',
      title: 'When Your Agent Dies',
      blurb: 'The missing death story for agent identity: revocation, offboarding, end of life.'
    }
  ]
};

// Set of slugs in the agent-identity cluster, for quick membership checks.
export const AGENT_IDENTITY_SLUGS = new Set(AGENT_IDENTITY.posts.map((p) => p.slug));

// Returns the cluster a post belongs to, or null.
export function clusterForSlug(slug) {
  return AGENT_IDENTITY_SLUGS.has(slug) ? AGENT_IDENTITY : null;
}

// Up to `n` sibling posts in the same cluster (excludes the given slug).
export function relatedInCluster(slug, n = 3) {
  const cluster = clusterForSlug(slug);
  if (!cluster) return [];
  return cluster.posts.filter((p) => p.slug !== slug).slice(0, n);
}
