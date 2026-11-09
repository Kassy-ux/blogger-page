# $133 Million Stolen from Crédit Mutuel Arkéa via Exploited Service Provider

**By Stancy Ngereso · November 9, 2026 · Based on Riftweld research briefing Item 3531**

*This is not a crypto story, and it is not really a malware story. It is a perimeter story — one in which a third-party platform became the doorway and the bank's own account became the getaway car.*

## The thesis

The Arkéa heist is a trust-chain failure. When a bank hands a vendor platform privileged access to its payment rails, that vendor becomes the bank's real perimeter — and once an attacker is inside, the bank's own account is the cleanest exit on the network.

At 12:25 UTC on Sunday, November 1, a withdrawal left OKX. Forty-four minutes later, another left Kraken. By 23:10 that night, 84% of the money was already gone.

That is not how a bank robbery usually reads. There was no ransomware note, no dark-web auction, no exploited ATM. Instead, over roughly 28 hours, $126.04 million in USDC moved out of accounts at Kraken, Crypto.com, and OKX into seventeen wallets. A blockchain investigator noticed before the bank's customers did.

On November 4, Crédit Mutuel Arkéa — a French cooperative bank headquartered in Brest, with €211.5 billion in assets and more than 5.8 million members and customers — confirmed it had suffered a cyberattack that enabled fraudulent transactions. The attackers, it said, reached the bank directly through the platform of one of its service providers, used the bank's own account to wire funds to other banks, and did not touch customer accounts.

Read that last part twice. The money did not leave through the vault. It left through the front door, with the bank's keys, in the bank's name.

## The arc: how the perimeter moved

For two decades, "the perimeter" meant the firewall and the branch. Then it meant the identity provider and the API gateway. Now, for a bank of Arkéa's size, it increasingly means a vendor console that holds privileged access to payment operations — and that the bank does not fully control.

This is the systemic shift the incident illustrates. The compromise did not need to be exotic, because the trust relationship was not. A service provider with a platform "through which" the bank is reachable is, by definition, part of the bank's control plane. Attack that, and you inherit its permissions.

> The modern bank heist doesn't break the vault. It borrows the teller's login and writes itself a transfer.

*[Figure 1 — trust chain: attacker → service provider platform → bank's own account → other banks → pre-positioned CEX accounts → 17 wallets + Monero.]*

## The weekend, in order

| When | What happened | Status |
|------|---------------|--------|
| Sun Nov 1, 12:25 UTC | First withdrawal leaves OKX; Kraken follows ~13:09 | On-chain |
| Sun Nov 1, by 23:10 | 84% of funds already moved; Tether freezes $1.14M USDT | On-chain |
| Mon Nov 2 | ZachXBT alerts on >$106M from an unnamed EU entity | Reported |
| Mon Nov 2, 15:46–16:30 | Kraken pays $17.2M to two more wallets — after the alert | On-chain |
| Tue Nov 3 | Estimate raised to >$133M after another $27M traced | Reported |
| Wed Nov 4 | ZachXBT names Arkéa; bank confirms attack; prosecutor opens case | Confirmed |
| Thu Nov 5 | Official estimate ~€100M; operations largely resume | Confirmed |

The numbers do not agree, and the gap is itself a finding. Arkéa's first estimate was about €100 million ($112.6 million). It declined to confirm the $133 million / €118 million figure, saying only that it could "validate the order of magnitude." Bitquery's independent on-chain trace landed at $126.04 million. ZachXBT suspects more, including off-chain OTC settlement that never touches a public ledger.

> **What is confirmed — and what is not**
> - **Confirmed** — Arkéa was attacked; fraudulent transactions occurred; customer accounts were not accessed; entry came via a service provider's platform (provider unnamed).
> - **Confirmed** — The attackers used the bank's own account to wire funds to other banks, then moved value into crypto.
> - **Disputed** — Journalist Grégory Raymond alleges the entry point was Fortuneo, the bank's online subsidiary. Arkéa explicitly denies it. Neither claim is independently provable from public sources.
> - **Unconfirmed** — The provider's identity, the root cause, and whether the funds were treasury or customer money (beyond "the bank's own account") remain undisclosed.

## The getaway: fiat out, crypto in

This is where the story becomes interesting for defenders. The bank side of the theft leaves no trace on Ethereum. Only the crypto side is visible — and it is visible in detail.

Bitquery traced $126.04 million in USDC leaving Kraken, Crypto.com, and OKX across November 1–2, destined for seventeen wallets. Twelve of those seventeen had previously been paid by the same exchanges; two of them had been receiving funds since May 2026. That is not improvisation. Those are pre-positioned mule accounts, aged like fine wine, waiting for the wire to land.

From there, the money split into parallel escapes. Just before midnight on November 1, a fresh wallet began selling stablecoins through UniswapX; within about four hours it had swapped $62.98 million for 27,553 ETH. Another branch converted USDC into DAI, a stablecoin with no issuer freeze function — it ended up roughly a third of the remaining holdings. About $95.8 million exited through bridges, exchange deposits, and instant-swap services. Part was converted to Monero, which obscures sender, recipient, and amount.

*[Figure 2 — money flow: bank wires → exchanges → 17 wallets → UniswapX/ETH, bridges, DAI/Monero, frozen USDT.]*

| Metric | Value |
|--------|-------|
| On-chain trace (Bitquery) | $126.04M |
| Swapped to ETH | $62.98M (27,553 ETH) |
| Through bridges / instant swaps | $95.8M |
| Frozen (USDT only) | $1.14M |

The freeze scoreboard is the sobering part. Tether froze $1.14 million of USDT. Circle froze none of the $1.71 million in USDC the thief still held. As of November 5, $37.26 million still sat on Ethereum in attacker-linked addresses, mostly as ETH — which no issuer can freeze. Recovery is not impossible; it is just slow, partial, and dependent on intermediaries who were never party to the bank's risk model.

## Why the system changed

Four shifts make this incident a template rather than an outlier.

**1. Vendors are control planes now.** A platform that can reach the bank "directly" is not a supplier; it is part of the bank's identity and payment fabric. Third-party risk reviews that stop at contracts and questionnaires miss the operative question: what can this vendor do inside our rails, and who can impersonate it?

**2. The bank's own account is the quietest exit.** Customer accounts are watched. Treasury and operational accounts are often trusted by default. Sending transfers in the bank's own name, to other banks, in the exact name of the destination account holder, satisfies the checks designed for honest traffic.

**3. Mule accounts are aged, not spun up.** Twelve of seventeen receiving wallets had prior exchange payouts; two had been active since May. KYC at the destination does not help if the destination was cultivated months in advance.

**4. Disclosure timing is a security control.** ZachXBT's alert preceded the bank's disclosure by roughly two days. He argues that the delay let more than $30 million be laundered that EU law enforcement might otherwise have frozen. Whatever one thinks of pseudonymous investigators, the operational point stands: in crypto-laundering, hours are the difference between frozen and gone.

## The implication for defenders

1. **Map vendor privilege.** Treat service providers with payment or identity reach as Tier 0. Model what they can do inside your rails, not just what data they hold.
2. **Watch your own accounts.** Apply the same behavioral monitoring to treasury and operational accounts that you apply to customers — especially beneficiary-name changes and outbound velocity.
3. **Pre-position freeze relationships.** Know your exchange and issuer contacts before an incident. Tether froze; Circle did not. That difference is a policy and a phone call, not a law of nature.
4. **Treat disclosure as containment.** Decide in advance when and how you will publicize a theft. Silence is not neutral when the money is moving through third-party rails.
5. **Rehearse the crypto leg.** Your incident-response plan probably stops at the bank. Extend it through exchanges, bridges, and privacy coins — because the attacker's plan does.
6. **Distrust the perimeter story.** "We weren't breached, our vendor was" is not a defense. If the vendor can act as you, the vendor is you.

## What we still don't know

- Which service provider was the entry point, and how its platform was compromised. No CVE or technical root cause has been disclosed.
- Whether Fortuneo was involved. Raymond says yes; Arkéa says explicitly no. The contradiction is unresolved.
- The definitive loss: €100M, $126M, $133M, or more with OTC. The bank validated only "the order of magnitude."
- Whether the funds were treasury or customer money, beyond "the bank's own account."
- Why transfers continued for days without internal thresholds firing.
- Attribution. ZachXBT rules out Lazarus with high confidence; Raymond's sources point toward franco-israeli fraud networks. No law-enforcement attribution is public.

The headline is the number. The lesson is the shape: a vendor relationship became the perimeter, the bank's own account became the exit, and the crypto rails turned a fraud into a race against the freeze button. Banks that treat third-party access and disclosure timing as core security controls will be harder to rob next time. The rest will keep discovering that the vault was never the point.

## Sources

- Help Net Security, seed article (Nov 9, 2026) — https://helpnetsecurity.com/2026/11/09/credit-mutuel-arkea-cyberattack-133-million/
- Crédit Mutuel Arkéa, press release and Q&A "Additional Information" (Nov 4, 2026) — cm-arkea.com (primary)
- Bitquery, on-chain tracing investigation (Nov 5, 2026) — https://bitquery.io/investigations/eu-106m-crypto-theft
- ZachXBT, via The Defiant and Yahoo/Unchained (Nov 2–4, 2026)
- Grégory Raymond, X thread (Nov 4, 2026) — https://x.com/gregory_raymond/status/2117908781443031236
- AFP; Le Monde; Le Télégramme; The Record; BleepingComputer; Halborn; Kyneo; Cointelegraph via TradingView
