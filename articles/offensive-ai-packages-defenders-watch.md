# Offensive AI Packages Defenders Should Watch: PentAGI, Cairn, and the Agentic Threat Wave

**By Stancy Ngereso · November 9, 2026 · Based on Riftweld research briefing Item 3499**

*A watch-list names 18 open-source "offensive AI" frameworks. Only a handful have surfaced in real intrusions — and how they are used matters more than which one is trending.*

## The article in three judgments

- **Confirmed** — Open-source agentic pentest frameworks ARTEX, PentAGI, Cairn, and HexStrike appear in live intrusions observed since late August 2026 (GTIG/Mandiant, Microsoft, Wiz, CrowdStrike, Zscaler).
- **Confirmed** — ARTEX is the center of gravity: linked to Storm-0940/Vapor Panda, a ConnectWise multi-tenant supply-chain compromise, and sign-in attempts against 2,250+ tenants.
- **Reported** — Use of the other 13 packages in intrusions is largely watch-list framing. Several claims (Kaspersky, NorForge, CERT-In) rest on single secondary sources.

The first sign wasn't malware. It was a rhythm.

In one incident reviewed by Google's Threat Intelligence Group and Mandiant, an intruder ran 27 cloud-permission checks in 23 seconds. Across other cases, actions came in 2-to-25-second flurries. That cadence — too fast for a tired human, too messy for a careful one — is now the tell for a class of open-source "offensive AI" frameworks that moved from GitHub curiosity to live intrusion in a matter of months.

On November 8, RuntimeWire published a defensive watch-list of 18 such packages, headlined by **ARTEX**, **PentAGI**, and **Cairn**. The framing sounds like the opening scene of an "AI hackers are here" movie. The evidence is more interesting: the tools aren't magic, and they aren't malware. They are legitimate pentest harnesses — planners, workers, and tool wrappers — pointed at systems nobody authorized them to touch.

## The list, and the three names that matter

RuntimeWire's 18: ARTEX, Cairn, CyberStrike, PentAGI, CyberStrikeAI, PentestGPT, PentestAgent, AutoPentester, VulnBot, RedAmon, MAPTA, Strix, Shannon, BugTraceAI, Nebula, hackingBuddyGPT, HexStrike AI, and CAI. The briefing that seeded this research called it "17"; the article's own list and title say 18, and we follow the article.

Only four of the 18 have primary-source incident confirmation: ARTEX, PentAGI, Cairn, and HexStrike. That gap is the story. A watch-list is a map of possibility, not a rap sheet — and conflating the two is how defenders end up chasing tool names instead of behavior.

> **One name-collision warning.** Three similar names are doing very different things: **CyberStrikeAI** (Ed1s0nZ, Apache-2.0, Go/JavaScript), **CyberStrike** (CyberStrikeus, AGPL-3.0), and **CrowdStrike**, the security vendor. RuntimeWire explicitly says CyberStrike was *not* named in the Google/Mandiant report. Search telemetry by exact reputation, not by partial name.

## What ARTEX actually is

GTIG and Mandiant describe ARTEX as an autonomous, multi-agent, LLM-driven pentesting and command-and-control platform written in Go with an embedded Next.js web console. It splits the attack lifecycle across six specialized sub-agents. Wiz describes a planner/worker model: the operator supplies a target and a goal, a planner chooses the next step, and worker agents run tools such as nmap, curl, and Impacket while results feed a shared graph of assets and findings.

Think of it less as a weapon and more as a very eager sous-chef. It reads the recipe, improvises when an ingredient is missing, and never asks whether the kitchen is yours.

*[Figure 1 — diagram of the ARTEX planner/worker loop: operator goal → planner → nmap/curl/Impacket workers → shared asset graph → back to planner.]*

Three numbers explain why it spread: the project was published on GitHub in July 2026, won Baidu's "Agent+" red-team challenge that September, and had more than 12,000 forks by the time its author closed the source on October 8. You cannot un-publish a fork.

## Anatomy of an ARTEX intrusion

Mapped end to end, the observed tradecraft looks less like novel malware and more like a very fast operator using valid credentials and supported features — "living off the land," with better stamina.

**1. Recon, at machine tempo.** Sub-second Azure credential-permission checks (SAS tokens, service principals, Kudu credentials, storage keys), ARM deployment validate dry-runs across 11 resource types in about eight seconds, AWS DryRun IAM permission testing, and 500+ web requests probing file names and extensions.

**2. Foothold.** Kudu administrative API abuse to run arbitrary commands and stage PowerShell, C#, or Python; command-and-control via native `curl` pulling generated scripts from 491 rotating `webhook.site` URLs.

**3. Privilege escalation and lateral movement.** Kerberoasting, SQL-injection credential dumps, DCSync scripts targeting krbtgt and domain-controller hashes, accounts created with `is_admin=true` within minutes, then pass-the-ticket, WinRM, Kerberos relay, and pass-the-hash (blocked by endpoint protection in some observed cases).

**4. Persistence and mission.** SSH key pairs, dedicated Elastic IPs, `t3.micro` EC2 jump hosts, `ArtexProbe`-named administrator accounts. For the payoff: SQL interrogation of roughly 400 KB across ~20 queries, mass blob reads, and ephemeral keyless EC2 boot scripts to harvest EBS volumes.

> **Behavioral fingerprints worth alerting on**
> - Execution bursts of 2–25 seconds; one case logged 27 events in 23 seconds.
> - JSP webshells (`cl1217.jsp`, `f1219a.jsp`, `z1219a.jsp`) dropped via MySQL log poisoning — `SET GLOBAL general_log_file` plus `SET GLOBAL general_log = 1`.
> - Files named `artex-probe-*` with five-digit increments; `ArtexProbe` account names.
> - Outbound calls to LLM APIs (`api.deepseek.com`, `open.bigmodel.cn`, `api.x.ai`, `api.anthropic.com`) and to `webhook.site`.

*[Figure 2 — attack lifecycle bar: recon → foothold → privesc → lateral → persist → exfil, annotated with "under three hours, one case ~15 minutes."]*

## The footprint: 1,465 consoles

A tool is only as rare as its exposed deployments. Censys found 1,465 hosts worldwide exposing an ARTEX console to the public internet: roughly 650 in two identical-hosting blocks and about 815 distinct-looking deployments. Of those, 155 (10.6%) also ran another threat artefact, including traditional C2 such as Vshell, Cobalt Strike, and Adaptix C2.

ARTEX also shares infrastructure with PentAGI, HexStrike AI, and RedAmon; 43 ARTEX hosts run self-hosted LLM gateway or reseller software. In other words: this isn't a rare artifact. It's a crowded, messy ecosystem — and the messy part is exploitable by attackers and defenders alike.

## Timeline: how we got here

| Date | Event | Status |
|------|-------|--------|
| Jul 2026 | ARTEX published on GitHub by "Autumn-27" | Confirmed |
| Late Aug 2026 | GTIG/Mandiant begin seeing ARTEX, PentAGI, Cairn, HexStrike in IR engagements | Confirmed |
| Sep 2026 | ARTEX wins Baidu "Agent+" red-team challenge; Storm-0940 starts using ARTEX | Confirmed |
| Late Sep 2026 | ARTEX activity against South Korean financial institutions | Confirmed |
| Oct 8 2026 | ARTEX source closed; 12,000+ forks already exist | Confirmed |
| Oct 10–14 2026 | Storm-0940 cross-tenant password spray: 327 accounts, 8 orgs, 151,000+ failed logons | Confirmed |
| Oct 17 2026 | Vapor Panda campaign reported: 200+ orgs in 14 countries | Reported |
| Oct 30 2026 | GTIG + Mandiant publish "ARTEX and Friends" | Confirmed |
| Nov 8 2026 | RuntimeWire publishes the 18-package watch-list | Confirmed |

## Who's behind it

Most of the confirmed activity clusters around **Storm-0940** — also tracked as Vapor Panda, UNC7228, CovertNetwork-1658, and ORB07 — which Microsoft assesses as China-state-aligned. The observed tempo is the alarming part: initial targeting to privileged access in under three hours in multiple cases, and one case in roughly 15 minutes.

But attribution is not a single villain. CrowdStrike tied a late-September to early-October campaign against South Korean financial institutions to a financially motivated Chinese-speaking actor, assessed with **moderate confidence**. That intrusion used DeepSeek v4.1-flash as the ARTEX backend, supplemented by GLM-5.3 and Grok 4.6, likely via a proxy reseller. Zscaler independently documented ~67,000 individuals' PII exfiltrated through SQL injection and authentication bypass in peripheral web apps.

> Same tool, different motives: espionage in one intrusion, data theft for sale in another. That is what a widely forked framework does.

## What defenders should do

GTIG and Mandiant are blunt: tool names, hashes, IP addresses, and other static indicators "will not cover much of this activity," because it rides valid credentials and supported functionality. The defense is behavioral and layered:

1. **Protect the control plane.** Restrict admin APIs, consoles, and CI/CD to trusted networks. The Kudu and ARM abuse in these cases lived in the control plane.
2. **Kill long-lived secrets.** Short-lived workload credentials: AWS IAM roles, Entra Managed Identities, GCP Workload Identity Federation, fine-grained PATs/OIDC.
3. **Reduce attack paths.** Continuous vuln scanning, database least-privilege, less error feedback, AD CS hardening, credential-replay mitigations.
4. **Add application friction.** Rate limits, recipient/transaction thresholds, abuse controls — the things that break machine-speed enumeration.
5. **Detect behavior.** Baseline identity and workload behavior; watch control-plane velocity, data-plane enumeration, east-west movement, and server egress to AI and webhook endpoints.
6. **Treat the harness as hostile.** Isolate open-source pentest frameworks, deny production credentials, and review forks before execution. CAI was archived in August 2026 but still lives on in internal forks.

Concrete alerts to build first: outbound calls from servers to `api.deepseek.com`, `open.bigmodel.cn`, `api.x.ai`, `api.anthropic.com`, and `webhook.site`; sequential high-frequency requests to login and search endpoints; unusual `.aspx`/`.jsp` files in unexpected paths; and identity velocity that no human team could produce.

One caveat worth carrying into the boardroom: SpecterOps argues that public evidence for end-to-end autonomy is still thin, and that the accountable operator remains human. Both things can be true. The tool still compresses expertise, labor, and time — and that compression is enough to change the defender's math.

## What we still don't know

- Which of the 18 packages besides ARTEX, PentAGI, Cairn, and HexStrike actually appear in the GTIG/Mandiant incident set. RuntimeWire says CyberStrike was *not* named.
- Whether the Kaspersky, NorForge, and CERT-In "Crafty Falcon" details hold up; each rests on a single secondary source in this research.
- Whether any package on the list carries its own CVE or vendor advisory. None was found. The Zammad CVEs exploited alongside ARTEX are Zammad flaws, not framework flaws.
- Where the autonomy curve actually ends. GTIG/Mandiant place activity at Stage 5 of 7; SpecterOps urges caution on the upper stages.

A watch-list is a prompt to look, not a verdict. The defensible conclusion is narrower and more useful than the headline: frameworks like ARTEX turn ordinary valid-credential abuse into a volume problem. Defenders who measure identity velocity, control-plane bursts, and egress to AI endpoints will see it. Those waiting for a signature will not.

## Sources

- RuntimeWire, "We put together a list of 18 offensive AI packages…" (Nov 8, 2026) — https://runtimewire.com/article/17-offensive-ai-packages-defenders-should-watch-starting-with-pentagi-and-cairn
- Google Cloud GTIG + Mandiant, "ARTEX and Friends: Enter Agentic Offensive Frameworks" (Oct 30, 2026) — https://cloud.google.com/blog/topics/threat-intelligence/artex-and-friends-enter-agentic-offensive-frameworks
- Microsoft Security Blog, Storm-0940 / ARTEX / ConnectWise (Oct 21, 2026) — https://www.microsoft.com/en-us/security/blog/2026/10/21/storm-0940-uses-artex-agentic-ai-connectwise-supply-chain-compromise/
- Wiz, "ARTEX in the Wild" (Oct 22, 2026) — https://www.wiz.io/blog/artex-in-the-wild-storm-0940-expands-targeting-of-it-and-software-vendors
- CrowdStrike, "Unknown Threat Actor Uses AI-Driven ARTEX to Target South Korean Finance" (Oct 7, 2026) — https://www.crowdstrike.com/en-us/blog/unknown-threat-actor-uses-artex-to-target-south-korean-finance/
- Zscaler ThreatLabz (Oct 14, 2026) — https://www.zscaler.com/blogs/security-research/threat-actor-abuses-agentic-ai-pentesting-framework-target-south-korean
- Infosecurity Magazine / Censys (Nov 6, 2026) — https://www.infosecurity-magazine.com/news/artex-activity-exceeds-reported/
- Cybersecurity Dive (Nov 2, 2026) — https://www.cybersecuritydive.com/news/agentic-pen-testing-tool-espionage-campaigns/873427/
- Hadrian, "The AI hacking boom" — https://hadrian.io/blog/the-ai-offensive-security-boom-seventy-tools-in-eighteen-months
- Resecurity, "When AI Becomes the Attacker" — https://www.resecurity.com/blog/article/when-ai-becomes-the-attacker-understanding-autonomous-offensive-security-agents
- SpecterOps, "AI for Offensive Security: What Works, What Does Not" (Sep 24, 2026) — https://specterops.io/blog/2026/09/24/ai-for-offensive-security/
- GitHub: vxcontrol/pentagi, oritera/Cairn, BaaRai/ARTEX, Ed1s0nZ/CyberStrikeAI, 0x4m4/hexstrike-ai, CyberStrikeus/cyberstrike, aliasrobotics/cai
