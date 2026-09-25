# Experience layout and photo previews

Scope: apply the reference's company-logo, company-name, role, and date hierarchy to the existing portfolio. Keep its dark theme and detailed experience descriptions. The reference is not a request to recreate the other person's entire website.

## Visual evidence

- Source: user-supplied `/var/folders/t3/tsnnlg4j6md13jy38fwb55mw0000gn/T/codex-clipboard-YQH74R.png`, 3420 × 2214 pixels.
- Full comparison: `/private/tmp/niru-experience-comparison.png`; source and implementation displayed together, each normalised to 988 × 640 pixels. Browser chrome and existing theme/content differences are outside the requested scope.
- Implementation: `/private/tmp/niru-experience-1976.png`, captured at 1976 × 1280 CSS pixels and device scale factor 1.
- Detail views: `/private/tmp/niru-experience-1440.png`, `/private/tmp/niru-experience-hover.png`, `/private/tmp/niru-experience-nus.png`.
- Focused comparison: `/private/tmp/niru-experience-header-comparison.png`, showing the reference and implemented company/role/date rows together. Reference region extracted after normalising to 1976 × 1280, then scaled from 860 × 72 to 884 × 74; implementation region is 884 × 74 at device scale factor 1.
- Mobile: `/private/tmp/niru-experience-390.png`, `/private/tmp/niru-photo-dialog-390.png`, each at 390 × 900 CSS pixels and device scale factor 1.
- States: experience list, pointer-hover preview, full-size photo dialog, mobile list and dialog.

## Comparison history

First visual review found two P2 issues:

1. Skydio's horizontal wordmark was too small at the row's logo size. Replaced it with the official compact Skydio mark. Before: `/private/tmp/niru-experience-1440-before.png`.
2. The hover preview covered dates at a 1440-pixel viewport even though the right margin could fit a slightly narrower image. The preview now uses that margin when at least 220 pixels are available. Before: `/private/tmp/niru-experience-hover-before.png`.

The second comparison confirmed the compact logo fix but caught a fractional-pixel rounding issue that still placed the narrower preview over the dates. Positioning now uses the available-margin decision directly and rounds the preview width down. The final capture, `/private/tmp/niru-experience-hover.png`, shows the photo beside the row with its date unobscured. The preview has a hoverable bridge across the small gap.

Final full-view and focused comparisons show no remaining actionable P0/P1/P2 findings. Existing Sora typography, dark colours, and detailed bullets intentionally differ from the reference; the requested logo/name/role/date hierarchy is implemented.

## Required surfaces

- Typography: company names lead, job titles sit directly below, dates and locations are quieter. Existing Sora typography is preserved.
- Spacing: consistent logo column and aligned dates on desktop; metadata wraps below roles on phones, with descriptions using the full available width.
- Colours: existing dark background, muted copy, and teal accents; original brand colours are preserved.
- Images: original company artwork and real personal photos; no invented logos or substituted portraits. Full-size photos preserve their complete frames.
- Copy: Skydio dates match the user's correction. NUS and Cogniverse additions are supported by the public posts documented in `assets/SOURCES.md`.

## Interaction verification

Browser checks passed at 1976, 1440, 1024, 768, 390, and 320 pixels: all six logos load, all three personal photos open, no horizontal overflow, no JavaScript errors. Hover previews are hoverable and dismissible with Escape. Dialogs support keyboard, touch, Close, Escape, backdrop dismissal, focus restoration, and scroll unlocking. Without JavaScript, photo links open the image directly and experience content remains readable. After the final positioning correction, desktop hover, viewport bounds, placement outside the role, all photo dialogs, keyboard dismissal, and no-JavaScript behavior passed again.

## Open limitations

Personal photos are available for Skydio, Travelers, and NUS. Inspected Ascend and Cogniverse posts contain logos or project/certificate images, and no suitable public Colt photo was found. No misleading photo previews are shown for those entries.

final result: passed
