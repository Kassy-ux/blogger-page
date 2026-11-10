# Chrome 157 Isn't the Patch

*Two machines can both say "Chrome 157" and only one can be fixed. The label is not the version, and the download is not the fix.*

By Stancy Ngereso · November 10, 2026 · Riftweld research briefing · CVE-2026-125350

This week’s coverage says Google “patched Chrome 157” against CVE-2026-125350. It didn’t. Chrome 157 landed on November 3 with 213 fixes, seven of them critical, and the zero-day was not among them. The fix came six days later, in build 157.0.8103.50/.51. The distinction is not pedantic; it is the difference between being told a fix exists and actually running it.
The version label looks like the answer, and it isn’t. “Chrome 157” covers at least three builds. A machine on 157.0.8103.38/.39 is vulnerable. A machine on 157.0.8103.50 on Windows and Mac, or .50 on Linux, carries the libxslt patch. Same major number, same menu text, different security state. The menu will not tell you which one you have unless you make it.
Think of it as a spare part left on the doormat. A background update downloads the new lock. The old one is still on the door until the browser restarts.
Open Chrome’s menu, choose Help, then About Google Chrome. Read the full build string, not the word “157.”
If it says “Chrome is up to date” but shows 157.0.8103.38, you are up to date with the vulnerable build. That sentence means Google has nothing newer to send you. It does not mean the exploit is gone.
You are not patched because you updated. You are patched because the process restarted. An update sitting in a browser that has been open for a week is still a spare part on the doormat. Chrome downloads silently; that is the point of it, and also the trap.
The bug is genuinely nasty: a use-after-free in libxslt’s pattern-match cache, triggered when XPath evaluation re-enters the same cache slot and frees an object the caller still holds. Google says an exploit exists in the wild. The fix re-reads the slot after evaluation. The mystery is why anyone trusts a version label. The exploit is in the wild, the build is the boundary, and the restart is the act.
Check it now. Open `chrome://settings/help` and compare the build to 157.0.8103.50/.51, or .50 on Linux, and 156.0.8078.96 on Extended Stable. Then quit Chrome completely — on macOS, Command-Q, not the red button — and open it again. Selecting the text is not the fix. Restarting is.
