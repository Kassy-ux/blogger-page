# The Attackers Left Their Own Panel Open

*More than 1,600 ARTEX consoles are reachable from the public internet. Ten of them expose the operators’ own databases.*

By Stancy Ngereso · November 10, 2026 · Template 01 · Riftweld research briefing

More than 1,600 systems running ARTEX, the autonomous AI attack framework, are reachable from the public internet, researchers said this week. Ten of those consoles are misconfigured so badly that they expose the operators’ own databases to anyone who asks.

Check Point Research counted 2,557 systems that host, or have hosted, an ARTEX panel. Of those, 1,608 were live and publicly reachable at the time of the research. Ten instances were misconfigured to expose their full databases, which is how the researchers could read operator goals, model configurations and agent message logs directly rather than infer them from traffic.

ARTEX is an open-source, LLM-driven penetration-testing framework published on GitHub on 26 July 2026 by a developer using the handle “Autumn-27.” It is written in Go with an embedded Next.js console. An operator gives it a target and an objective in natural language; a planner agent chooses the next step, worker agents run tools such as nmap, curl, Impacket, sqlmap, nuclei, httpx, jadx, apktool and frida-tools, and every result feeds a shared graph of assets and findings. ARTEX does not ship a model. It calls external providers, and the operator picks which one.

- **2,557** — panel systems observed
- **1,608** — live and public
- **10** — exposed operator databases

A panel is an ordinary admin console, which is the point. It offers task orchestration, traffic recording, findings, coverage and an approval queue. It also shows the model the operator selected, the prompts the agents are running, and the results coming back. When the database behind that console is reachable, the console becomes a window into a working intrusion.

A second measurement puts the population lower. GitGuardian, citing Censys, reported roughly 1,400 publicly exposed ARTEX instances across about 800 deployments as of 4 November. Check Point’s figure is higher and counts systems rather than deployments. The two methods differ, and the true number is not knowable from outside: many panels sit behind firewalls or on local networks where no scan will find them.

Incredibly, the exposure is not concentrated in one jurisdiction. Of the live ARTEX command-and-control servers, 882, or 54%, were in the United States; 295, or 18%, in Hong Kong; and 103, or 6%, in China. The framework is open source and the operators are everywhere the internet is.

“Check Point Research observed 2,557 systems hosting or having hosted ARTEX panels, of which 1,608 were live and publicly reachable at the time of research, and 10 instances misconfigured to expose their full databases,” the firm wrote. That is not a description of a stealth tool. It is a description of a popular tool whose users are no more careful with their own infrastructure than their victims were with theirs.

The original ARTEX repository was taken down and made closed source on 8 October 2026, after abuse reports. By then it had more than 12,000 forks, and maintained forks such as ScopeWeaver and “ARTEX PRO” remain in circulation. Deleting the upstream project removed the documentation. It did not remove the install base.

As detailed in earlier Riftweld briefings, agentic offensive frameworks have moved from proof of concept to shared infrastructure in under a year. The operators treat them the way earlier generations treated Cobalt Strike: a licensed or forked tool, a licence server, and a console that someone has to keep patched.

The exposed databases matter because they invert the usual visibility problem. Defenders normally learn about an intrusion from traffic, which is indirect and slow. Reading an operator’s console gives the researchers the attacker’s goals, their model choice, their prompt structure and their agent logs. That is why the 10 misconfigured instances produced more intelligence than the 1,598 correctly configured ones combined.

The economics are also visible in the panels. In one Check Point-observed cybercrime campaign, an operator ran an Apple iOS code-signing certificate heist from 14 to 29 October, consumed roughly 36 billion tokens, spent an estimated $700 to $1,500 on inference, and obtained more than 300 certificates, of which three were validated. A second campaign burned about 167.5 million tokens against 292 domains and stole nothing; many of its recorded “successes” were model hallucinations.

None of this requires the operator to compromise the panel. The panel is the operator’s own machine. It is installed the way any web application is installed: pulled from a repository, configured with an API key, and exposed on a port. The ten open databases were not breached by an attacker. They were published by their owners.

That is the uncomfortable symmetry of the ARTEX economy. The same framework that gives a criminal machine-speed reconnaissance also gives researchers a map of the criminal’s own estate, and the map is only available because the estate was built with the same missing controls the framework exploits in everyone else. The victim count is 1,608 live panels, about 1,400 exposed instances by the narrower count, and more than 12,000 forks that nobody can see.
