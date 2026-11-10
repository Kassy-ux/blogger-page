# Who Is the Operator Behind the ARTEX Panel?

*A public console, a misconfigured database and a shared model gateway: how researchers assembled ARTEX’s operators from their own infrastructure.*

By Stancy Ngereso · November 10, 2026 · Template 04 · Riftweld research briefing

Rarely do criminal operators leave their command console reachable from the public internet. More commonly the console is the one asset they keep closed. In the ARTEX economy, that assumption failed at scale: researchers found more than 1,600 live operator panels, and ten of them were serving their own databases to anyone who asked.

This is the story of how those panels were used to describe the people behind them — not to name them, which the public record does not do, but to assemble the shape of the operators from their own infrastructure. Every step below is a pivot: one artefact produces the next. Where the chain stops, it stops because the evidence stops.

Check Point Research counted 2,557 systems that host, or have hosted, an ARTEX panel. Of those, 1,608 were live and publicly reachable at the time of the research. That is the first pivot, and it is a passive one: the researchers did not target anyone. They requested rotating access through public services and saw what answered.

The second pivot is the misconfiguration. Ten instances were exposed badly enough to serve their full databases. That gave the researchers something a scan cannot: the operator's goals, the model configurations, and the agent message logs. A panel is an admin console for task orchestration, traffic recording, findings, coverage and an approval queue. When its database is reachable, the console becomes a diary.

Reading the databases produced the third pivot: the models. Chinese models dominate the configured backends, with the DeepSeek v4.1-flash family the most common. The wider corpus also shows DeepSeek v4 Pro, GLM-5.3 and GLM-5.3-flash, Grok 4.6 and 4.7, and Kimi K3.1 Pro. The model is a choice, and the choice is a signature.

The fourth pivot is the routing. Many panels call those models through third-party gateways, and one gateway recurs in the operator data: xcai.pro. A shared gateway is the kind of artefact that turns separate operators into a cluster. It is also the kind of artefact that a defender can watch, which is why it is worth writing down.

The fifth pivot is geography. Of the live ARTEX command-and-control servers, 882, or 54%, were in the United States; 295, or 18%, in Hong Kong; and 103, or 6%, in China. Those numbers do not identify an actor. They describe where the consoles sit, which is a different fact from where the operator sits, and the difference is the reason attribution is hard.

The sixth pivot is a behavioural tell inside the configuration. One operator started with Anthropic's Opus 5.5, hit its guardrails, and switched to more permissive Chinese models. That sequence — capable model, refusal, substitution — is a habit, not a coincidence. It shows an operator optimising for capability over compliance, and it narrows the population of panels that behave the same way.

A second measurement sharpens the population. GitGuardian, citing Censys, reported roughly 1,400 publicly exposed ARTEX instances across about 800 deployments as of 4 November. Check Point's 1,608 is a count of live systems; GitGuardian's is a count of exposed instances. The methods differ, and the true number is unknowable from outside, because many panels sit behind firewalls or on local networks. Both figures agree on the order of magnitude, which is the part that matters.

The seventh pivot moves from infrastructure to a campaign. CrowdStrike reported a likely financially motivated, Chinese-speaking actor using ARTEX against South Korean financial organisations, with activity active from late September into early October. Zscaler's ThreatLabz later published the operator's infrastructure and prompt history. The two reports describe the same cluster from different angles, which is how a cluster becomes more than a single source's claim.

The eighth pivot is the open directory. The South Korean-linked operator's Hong Kong-based infrastructure held open directories containing Claude Code session histories, ARTEX configuration files, and Claude memory files. That is the OSINT equivalent of finding the operator's notebook on the pavement. It does not prove who they are, but it shows how they work, what they asked, and which tools they kept beside the framework.

The ninth pivot is the market question. The operator asked where stolen Korean data is typically sold, and sought Korean Telegram data-sales groups. That single question reframes the campaign: the target list is not an espionage collection plan, it is a product catalogue. Zscaler describes the target profile as dating apps, SMS providers, crypto and payment platforms, gift-card portals, gambling, retail, education and legal systems across more than 20 countries.

The tenth pivot is the human. CrowdStrike's VAPOR PANDA reporting includes transcripts in which a human operator issues instructions labeled 【人类指令】 — “human instruction” — in China Standard Time. That label is a small but useful artifact: it shows an operator steering agents at decision points rather than setting an objective and walking away. It is the difference between automation and autonomy, and in this cluster it is automation.

The eleventh pivot is the instruction itself. The operator directed agents to inventory endpoint sensor coverage, specifically to “find Windows machines in the domain without Falcon.” That is not a generic reconnaissance goal. It is a request to map the defender's blind spots, written into an agentic workflow. A single intrusion in that campaign consumed on the order of 1.4 billion input tokens, which is the cost of asking a model to think through a network at machine speed.

The twelfth pivot is corroboration. Microsoft tracks overlapping ConnectWise-linked activity as Storm-0940, a China-state-aligned actor active since 2021. In the ConnectWise Cloud Backup compromise, ARTEX accelerated scanning, password spraying and OAuth application abuse; Storm-0940 attempted sign-ins to more than 2,250 Microsoft 365 tenants, and a password-spray campaign from one address generated more than 151,000 failed logons between 10 and 14 October, peaking at 2,900 failures a minute. Wiz tracks the same overlap as UNC7228, and reported one case in which the actor moved from first compromised account to deep system access in 15 minutes.

The thirteenth pivot is the limit of the chain. None of these sources names an individual operator. CrowdStrike assessed the South Korean actor as “likely a Chinese speaker and financially motivated” with moderate confidence. Microsoft and Wiz use state-alignment labels that rest on overlapping but independent assessments. A pivot chain is not an identification. It is a set of constraints that narrows the field until only a few explanations fit, and then stops.

The behavioural history is consistent with that limit. ARTEX was published on GitHub on 26 July 2026 by a developer using the handle “Autumn-27.” It was taken down and made closed source on 8 October after abuse reports, by which time it had more than 12,000 forks. Maintained forks such as ScopeWeaver and “ARTEX PRO” remain in circulation. The tool outlived its author's willingness to maintain it, which is the normal life cycle of dual-use offensive software.

Third-party intelligence fills the space the chain cannot. Microsoft's GitHub-secret hunting report describes agents searching public repositories for OAuth secrets and AI-service API keys from August, then abusing them against Azure and Microsoft 365 tenants; one agent went from a repository scan to Azure Key Vault exfiltration in five minutes, and retried failed cloud API calls with corrected parameters within 28 to 80 seconds. That is the same loop, aimed at a different surface.

The case detail that ties the infrastructure to the harm is ConnectWise. A single compromised application identity with broad tenant consents became a supply-chain multiplier: 162 Microsoft 365 tenants were hit in a credential-abuse window of just over two hours on 15 October, and the actor attempted sign-ins to more than 2,250. The panel that made that possible was not exotic. It was a console with a model selector and a task queue.

What the chain supports is narrower than the headlines and more useful. It supports a population of operators who route through commodity gateways, prefer permissive models, keep their consoles on public addresses, and reuse the same target lists across campaigns. It supports a set of state-aligned and financially motivated clusters that overlap in tooling and infrastructure without being the same actor. It does not support naming a person, and any report that does so from these artefacts alone is overreaching.

“A pivot chain is a set of constraints, not a verdict,” the researchers' own framing implies, and the hedge is the honest part. The panels are real, the databases were open, and the operators were visible. The identity behind them is the one thing the infrastructure would not give up.
