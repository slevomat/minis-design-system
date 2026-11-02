# Mini\*S re-definice: Kompletní re-fit design systému. Mantinely, ne UI kit.

Oct 23, 2026 · @Alexandr Hudeček

> **Poznámka:** Tato redefinice shrnuje, co jsme se naučili za zhruba rok, kdy jsme MiniS budovali tradičně: design systém jako UI kit, kód a dokumentace. V našem prostředí tento model nefunguje tak, jak bychom potřebovali. Alespoň ne v plném rozsahu. Proto je potřeba MiniS redefinovat, případně přenastavit (re-fit), aby se stal větší oporou při rozvoji služeb Slevomatu.

## Cíle design systému

Cíle, kvůli kterým MiniS vznikl, se redefinicí nemění. Mění se cesta k nim.

| Cíl | Co znamená |
| --- | --- |
| Jednotný zážitek | Slevomat vypadá a chová se stejně na webu, v adminu, u partnerů i v aplikaci |
| Rychlejší vývoj | Hotová rozhodnutí a vzory místo navrhování a psaní od nuly |
| Méně duplicit a snižování dluhu | Jeden vzor místo pěti podobných, méně natvrdo zapsaných hodnot |
| Kvalita a přístupnost | Ověřené vzory a WCAG jako výchozí stav, ne dodatečná oprava |
| Společný jazyk | Design, vývoj, produkt i AI mluví o stejných věcech stejnými názvy |
| Snadné změny | Rebrand, témata nebo tmavý režim změnou tokenů, ne stovek souborů |

## Má design systém ještě smysl?

Ano, ale ne v podobě, ve které jsme ho budovali. Slib „knihovna komponent, kterou všichni importují“ se v našem prostředí nenaplnil: produkce stojí na Nette a Latte a webové komponenty v ní nežijí. Kdybychom MiniS měřili podle toho, kolik komponent běží v produkci, vycházel by jako neúspěch.

Hodnota design systému se přesunula, ale nezmizela. Tokeny už dnes používají všichni, včetně lidí, kteří vibují s AI, **a to je skutečná adopce.** Když UI vzniká z promptů, musí existovat jasná pravidla i co je zakázané. Bez toho každý prompt vytvoří trochu jiný produkt. **AI nepotřebuje naše komponenty, potřebuje naše rozhodnutí**.&#32;

Co mluví proti:

- Udržovat webové komponenty, které produkce nepoužívá, stojí čas. Bez jasné role (reference, sandbox, mobilní aplikace) je to náklad bez výnosu.
- Pokud se MiniS nedostane do Nette repozitáře (tokeny, skilly, registr), designéři i vývojáři ho budou obcházet a design systém ztratí smysl.
- Pravidla, která nikdo automaticky nehlídá, se nedodržují. Design systém, který jen radí, bude ignorován.

Smysl tedy má za tří podmínek: žije tam, kde se UI skutečně staví; jeho pravidla hlídá stroj; a jeho úspěch měříme konzistencí UI, ne počtem importovaných komponent. Poznáme to podle podílu hodnot z tokenů v Nette repozitáři (výchozí stav k 29. 10. 2026: zhruba 18 % použití proměnných), podle toho, kolik nových prvků vzniklo bez záznamu v registru, a podle počtu Local vzorů, které se povýšily. Tyto tři podmínky vedou celou redefinici níže.

## Proč to měníme

UI ve Slevomatu nevzniká v rukou pár lidí, v jednom nástroji, a proto MiniS nemůžeme dál definovat jako knihovnu komponent, která se importuje a je konzumována.

Design kit navíc nevzniká na zelené louce. Je silně ukotvený v produkční technologii a zajetých postupech, na které se organicky nabalují další řešení a hotfixy. MiniS proto musí stavět na tom, co v produkci skutečně je, ne vedle toho.

Změnily se tři věci. Produkce běží na Nette a Latte a přechod na React ani Lit nikdo nikdy neslíbil (na začátku jsme nevěděli, jak bude nově vznikající DS přijat, ani jak přesně bude vypadat technické řešení; celá tato fáze byla do určité míry discovery), takže webové komponenty MiniS se v produkci nepoužívají. Hlavní vývojář navrhuje přímo v kódu, jak to dělal vždycky. A od tohoto týdne Nette tým dovoluje designérům vibe-codovat návrhy přímo nad produkčním kódem.

Výsledek: UI teď přichází z Figmy, z ručně psaného Latte, od designérů, kteří promptují AI přímo v produkčním repozitáři, i od kohokoli, kdo promptuje AI jinde. Design systém, který stojí v cestě jako brána, lidé obejdou. Design systém, na kterém lidé můžou stavět, budou používat.

## Co je MiniS teď

MiniS je sdílená sada rozhodnutí, pravidel a receptů, díky kterým kdokoli, člověk i AI, postaví UI, které vypadá a chová se jako Slevomat, a to v jakémkoli prostředí.

Je to dohoda, ne stavebnice. Figma a webové komponenty v něm zůstávají, ale jsou to jen dva z několika způsobů, jak ho používat, ne jeho jádro.

1. **Pravidla místo schvalování.** Nikdo nemusí žádat tým MiniS o schválení, než začne stavět. Definuje několik základních pravidel a ta tvoří mantinely, uvnitř kterých může kdokoli volně stavět.
2. **Usnadnit práci.** Každé pravidlo přichází s nástrojem, díky kterému je jeho dodržení ta nejsnazší cesta: token, recept, skill, lint pravidlo. Pravidlo bez pomocníka je jen přání.
3. **Nezávislost na prostředí.** Zdrojem pravdy jsou rozhodnutí a tokeny. Každé prostředí (Latte, webové komponenty, Figma, AI) je dostane ve své podobě podle pravidel portování.

### Analogie: zahrada, ne Lego

Klasická analogie design systému je Lego: hotové kostky z jedné továrny, ze kterých jde postavit jen to, co krabice dovolí. MiniS 2.0 je spíš zahrada. Nedáváme nutně hotové věci, ale půdu, nářadí a pravidla péče, a roste, co kdo zasadí.

| Zahrada | MiniS |
| --- | --- |
| Půda | Tokeny, Základ |
| Nářadí | Skilly, Stylelint, registr |
| Pravidla péče a zálivky | Sedm základních pravidel |
| Plot a záhony | Mantinely: sázet se smí volně, jen ne na cestu |
| Semínka a sazenice od kohokoli | Nová práce jako Local; jmenovky jsou záznamy v registru |
| Zahradník, který nehlídá bránu | Revize registru: co se ujalo, přesadí do hlavního záhonu (Local → Recipe → Core) |
| Plevel | Duplicity, natvrdo zapsané hodnoty, kopie bez záznamu v registru; pleje se pravidelně, automaticky v CI i při revizi registru |

Zahrada, ne divočina: plevel poroste vždy a jeho odstraňování je součástí péče, ne selhání. Analogie slouží k vysvětlení; terminologie v dokumentech zůstává věcná (registr, revize, Local).

### Kde se MiniS používá

MiniS se dnes více či méně používá na šesti platformách a každá ho dostává v jiné podobě.

| Platforma | Prostředí | Jak dostává MiniS |
| --- | --- | --- |
| Web | Nette/Latte | Tokeny; recepty a skilly v Nette repozitáři |
| Web FE pro lidi (B2C) |  |  |
| Admin |  |  |
| Slevomat for Partners |  |  |
| Vibecoding aplikace | Webové komponenty (sandbox) | Webové komponenty, tokeny, skill minis-app |
| Mobilní aplikace | Vlastní kód aplikace (vydaná) | Hodnoty tokenů MiniS už převzala; v plánu je převzít i jejich názvy a strukturu. Webové komponenty jsou otevřená otázka |

Otevřené: na čem běží Admin a Slevomat for Partners (také Nette/Latte?) a jak MiniS dostávají.

## Společná odpovědnost

**Redefinice nefunguje bez závazku celého týmu.** MiniS přestává být projektem jednoho člověka, který udržuje knihovnu, a stává se dohodou, kterou drží všichni, kdo staví UI Slevomatu: designéři, vývojáři i produkt.

Volnost má svou cenu. Kdo může stavět bez schvalování, přebírá odpovědnost za to, že dodrží základní pravidla. Tým se proto zavazuje:

- Dodržovat základní pravidla i ve spěchu. Výjimky se řeší otevřeně v registru, ne potichu v kódu.
- Nejdřív hledat v registru a mezery hlásit, ne obcházet.
- Registrovat vše nové, co vznikne, i když je to jen pro jednu funkci.
- Účastnit se měsíční revize registru a rozhodovat o tom, co se povýší, sloučí nebo zruší.
- Brát selhání kontroly v CI jako chybu, kterou je potřeba opravit, ne jako překážku, kterou je potřeba obejít.

Na oplátku se MiniS zavazuje, že dodržování pravidel bude ta nejsnazší cesta: tokeny, recepty, skilly a registr budou aktuální a po ruce.

Bez tohoto závazku se MiniS vrátí tam, kde byl: k dokumentaci, kterou nikdo nečte.

## Základ: co dostane každý

Každý člověk a každé prostředí dostává pět věcí. Dohromady jsou to MiniS; všechno ostatní se staví na nich.

| Vrstva | Co to je | Kdo ji používá | Podoba |
| --- | --- | --- | --- |
| Tokeny | Rozhodnutí o barvách, mezerách, zaobleních, typografii a layoutu, exportovaná z proměnných ve Figmě | Všichni, všechna prostředí | CSS custom properties, JSON |
| Recepty | Ověřené vzory zapsané jako markup a CSS, s poznámkou, kdy je použít | Designéři vibující v Latte, vývojáři, AI | Latte snippety, HTML/CSS, stránka v dokumentaci |
| Skilly | Jak stavět UI Slevomatu s MiniS: který recept na co, co dělat a co ne | AI nástroje a lidé, kteří je čtou | Soubory SKILL.md a AGENTS.md v kořeni |
| AI skill pro přispívání | Jak přispívat: rozhodovací cesta, základní pravidla, jak registrovat Local práci | Kdokoli, kdo staví s AI | SKILL.md v repozitáři |
| Pravidla portování | Jak se tokeny a recepty převádějí do jednotlivých prostředí | Kdo dané prostředí spravuje | Krátký návod pro každý cíl: Latte/Nette, webové komponenty |

Pravidla portování drží vrstvy v souladu. Recept se zapíše jednou jako rozhodnutí a pak se portuje do Latte pro produkci a do webových komponent pro dokumentaci a vibovací sandbox. Když se obě verze rozejdou, pravidlo portování určí, která vyhrává: zatím je referencí pro chování produkční Latte a pro hodnoty tokeny MiniS. Dlouhodobě by měl být referencí pro obojí MiniS, ale v krátkém ani středním horizontu to není reálné.

### Skilly, které MiniS potřebuje

Dnes existuje jediný skill v repozitáři (minis-app); další znalosti jsou v CLAUDE.md a docs/ai-prompts. Nový model potřebuje následující skilly. Každý skill jde v Claude Code spustit i jako slash command (např. `/minis-bug`).

| Skill | K čemu | Kdo ho používá | Stav |
| --- | --- | --- | --- |
| Stavění UI v Latte | Který recept na co, pravidla, co dělat a co ne; načtený v Nette repozitáři | Designéři vibující v Nette, vývojáři | Chybí |
| Přispívání (contribution) | Hledej v registru → uprav variantou nebo tokeny → postav Local a zaregistruj | Kdokoli, kdo staví s AI | Chybí |
| minis-app | Scaffold prototypu na webových komponentách (sandbox); doplnit krok „zaregistruj jako Local“ | Kdokoli s promptem mimo Nette | Existuje, upravit |
| Psaní todo plánů | Založení a aktualizace plánu v todo-plans/ podle zavedených konvencí (číslování, stavy, index); dnes je to jen mechanismus v CLAUDE.md, takže ho nikdo jiný nepoužije | Vlastník DS, kdokoli, kdo navrhuje větší změnu | Chybí |
| Hlášení chyb | Provede člověka nahlášením chyby v MiniS a skončí založením issue v GitHub repozitáři MiniS; později jako slash command | Kdokoli, kdo narazí na chybu | Chybí |
| Aktualizace tokenů (návrh) | Export z Figmy → tokens.json → CSS → build → changelog, včetně kontroly nastavení exportéru | Vlastník DS | Volitelné |
| Mod pro upozorňování na pravidla (hook) | Při úpravě CSS nebo Latte souboru zkontroluje změnu (tokeny, registr) a hned uživateli i AI vysvětlí, které pravidlo porušuje a co použít místo toho. Na začátku session krátce připomene základní pravidla. Doplňuje CI, nenahrazuje ho | Kdokoli, kdo staví s AI v Claude Code | Návrh |

Aby skilly mohl používat kdokoli a v jakémkoli repozitáři, je potřeba je distribuovat mimo repozitář MiniS, ideálně jako jeden balíček (plugin pro Claude Code).

### Registr komponent: registry.json

Sdíleným zdrojem pravdy o tom, co už existuje, je `registry.json`. Každý nástroj, ať AI v Nette repozitáři, skill pro přispívání, nebo CI, se do něj podívá dřív, než vznikne něco nového.

Formát přebíráme od shadcn: obálka se seznamem `items`, každá položka má `name`, `type`, `title`, `description`, `files`, `registryDependencies` a `categories`. Vlastní pole MiniS patří do `meta`, kam shadcn dovoluje libovolné klíče ([registry-item.json](https://ui.shadcn.com/docs/registry/registry-item-json)). AI nástroje tento formát znají a shadcn MCP server umí procházet jakýkoli registr v tomto formátu, takže agenti v Claude Code nebo Cursoru můžou MiniS prohledávat bez další práce ([MCP Server](https://ui.shadcn.com/docs/registry/mcp)).

```json
{
  "name": "dialog",
  "type": "registry:ui",
  "title": "Dialog",
  "description": "Blokující překryv pro krátké rozhodnutí nebo formulář.",
  "categories": ["overlay"],
  "registryDependencies": ["button"],
  "files": [
    { "path": "recipes/dialog/dialog.latte", "type": "registry:file", "target": "~/app/templates/components/dialog.latte" },
    { "path": "components/dialog/minis-dialog.ts", "type": "registry:component" }
  ],
  "meta": {
    "tier": "core",
    "aliases": ["modal", "popup", "overlay"],
    "whenToUse": "Potvrzení, krátký formulář, zásadní volba.",
    "whenNotToUse": "Dlouhý obsah nebo navigace; použij stránku nebo drawer.",
    "variants": ["default", "danger"],
    "tokens": ["--color-surface-primary", "--radius-16"],
    "implementations": { "latte": true, "webComponent": "minis-dialog", "figma": "<component key>" },
    "usedIn": 14
  }
}
```

Tím se zjednoduší i kontroly: AI popis znamená platnou položku v registru a registrace Local práce je položka s `meta.tier: "local"`. CI hlídá, že každý soubor komponenty má položku, že každá cesta ve `files` existuje a že povinná pole v `meta` nejsou prázdná.

Registr nepopisuje jen to, co už je v MiniS. Velká část historické zátěže leží v produkci: komponenty v Latte, které v MiniS zatím nejsou, a spousta věcí, které nejsou komponenty v pravém smyslu (spíš knihovny v PHP). Do registru se zapisují nejdřív tak, jak jsou: účel, kdy použít, cesta k souboru v produkci. Facelift a zpětné nasazení jsou samostatný další krok a zápis na ně nečeká, jinak se inventář zasekne a AI mezitím bude stavět duplicity. Jaký tier tyto položky dostanou, je zatím otevřené (návrh: vlastní tier `production`).

Jedno omezení: instalační část shadcn CLI (cílové cesty, npm závislosti) počítá s React projekty. Pro Latte ji nepoužíváme, registr slouží hlavně k vyhledávání a jako jediný seznam toho, co existuje.

## Základní pravidla

Mantinely MiniS definuje sedm základních pravidel. Platí pro veškeré UI, ať ho vytvořil kdokoli nebo cokoli. Co jde zkontrolovat automaticky, kontroluje CI (lint, testy, kontrola registru) u každého PR, bez ohledu na to, kdo nebo co kód napsal. Pravidla, která vyžadují úsudek, vede skill pro přispívání během práce s AI a ověřuje je měsíční revize registru.

| # | Pravidlo | Co znamená | Jak se hlídá |
| --- | --- | --- | --- |
| 1 | Nevynalézej znovu kolo | Použij, co už máme: komponenty, recepty, Latte makra i zavedené mechanismy produkce. Postup: nejdřív prohledej registry.json; když nic nesedí přesně, uprav existující prvek variantou nebo tokeny a mezeru nahlas; teprve když nejde ani to, postav nový. Existující prvek nikdy nekopíruj bokem | Úsudek: skill pro přispívání + revize PR a revize registru |
| 2 | Jen tokeny | Žádné natvrdo zapsané hex, pixely ani písma; každá hodnota pochází z tokenu MiniS | Automaticky v CI: Stylelint s baseline, blokuje jen nová porušení a stávající se postupně snižují |
| 3 | Přístupnost | Kontrast, focus stavy, popisky a ovládání klávesnicí splňují WCAG 2.2 AA | Automaticky v CI: a11y test, kontrola kontrastu dvojic tokenů |
| 4 | Každý prvek má popis | Platná položka v registru: účel, kdy použít a kdy ne, varianty, tokeny | Automaticky v CI: kontrola registru |
| 5 | Nové začíná jako Local | Cokoli nového je Local a hned se registruje (`meta.tier: "local"`) | Automaticky v CI: kontrola registru |
| 6 | Povýšení podle důkazu a schválení | Návrh se eviduje v registru; do Recipe a Core postupuje jen to, co se používá na 3+ místech a projde schválením | Úsudek: měsíční revize registru |
| 7 | Jedna reference | Hodnoty určují tokeny MiniS; chování zatím produkční Latte, dlouhodobě MiniS | Úsudek: pravidla portování |

AI popis dělá systém použitelným pro agenty. Bez něj vzor existuje, ale žádný AI nástroj ho nenajde, a tak lidé vedle něj nechají vygenerovat nový. S ním dokáže skill pro přispívání odpovědět na otázku „existuje to už?“ dřív, než se začne stavět něco nového.

Automatické kontroly také berou debatě osobní rovinu. Nikdo nemusí hlavnímu vývojáři ani designérovi říkat, že jejich práce porušuje pravidla; řekne to build.

## Jak funguje přispívání

Nový prvek nepotřebuje schválení předem, ale musí splnit základní pravidla: projít kontrolami v CI a zapsat se do registru jako Local. Co se osvědčí, MiniS převezme do Recipe a Core.

&#91;embedded content: contribution flow · 3 sources, 1 floor, 3 tiers, ground floor\]

Práce z jakéhokoli zdroje prochází stejnými automatickými kontrolami a začíná jako Local. Vzory, které se opakují, postupují do Recipe a pak do Core, a Core zpětně plní základ, ze kterého příště staví všechny zdroje.

Skill pro přispívání provede každou AI session stejnou cestou: použij, co existuje; uprav pomocí tokenů a nahlas mezeru; nebo postav Local a zaregistruj ho.

### Návrhy a schvalování

Stavět Local smí kdokoli bez schválení předem, jinak by se z MiniS znovu stala brána. Co se ale má stát součástí design systému, prochází evidencí a schválením.

1. **Návrh.** Kdokoli navrhne nový vzor nebo povýšení existujícího. Návrh je položka v registru se stavem `proposed` a odkazem na issue nebo PR. Skill pro přispívání ho založí sám, když AI narazí na mezeru.
2. **Posouzení.** Na měsíční revizi registru návrhy projde vlastník DS spolu se schvalovací skupinou: hlavní vývojář, zástupce designu a podle potřeby produkt.
3. **Rozhodnutí.** Schválit (povýšení do Recipe nebo Core), sloučit s existujícím prvkem, vrátit k úpravě, nebo zamítnout. Rozhodnutí i důvod se zapíší do registru (`meta.status`, `meta.decision`), takže je dohledatelné, co a proč do MiniS patří.
4. **Zapracování.** Schválený návrh dostane AI popis a stav implementace pro každou platformu a stane se součástí Základu.

Kdo přesně tvoří schvalovací skupinu a jak se rozhoduje při neshodě, zbývá potvrdit.

### Ikony (návrh)

Ikony mají vlastní cestu, protože nejsou komponenty, ale grafika s vlastním zdrojem pravdy: knihovna [Slevomat Icons](https://www.figma.com/design/lZsWlkVSBRTlpI2vKpnAXT/Slevomat-Icons?node-id=2-4) (Icons 2.0) v samostatném Figma souboru. MiniS je dnes vydává jako SVG přes `<minis-icon>` (287 ikon), produkce je bere z webfontů a sada `figma-only` (51 ikon) v produkčním webfontu ještě není.

1. **Nejdřív hledej.** Projdi existující ikony včetně starých aliasů v registru; pravidlo 1 platí i tady.
2. **Nová ikona vzniká ve Figmě** v souboru Slevomat Icons: mřížka 24 × 24 px, živá plocha 20 px, jedna výplň, název podle sekce.
3. **Export do repozitáře** podle postupu v dokumentaci ikony (SVG do `packages/icons`, záznam v `registry.ts`).
4. **Produkce:** dostat ikonu do webfontu, jinak zůstane jen ve Figmě a v MiniS.

## Role

Přispěvatelem je každý; role se liší tím, co lidé vytvářejí a co jim MiniS dává.

| Role | Jak staví | Co jim MiniS dává | Co dluží zpět |
| --- | --- | --- | --- |
| Designér vibující v Nette repozitáři | Promptuje AI nad produkčním Latte | Skilly a skill pro přispívání načtené v repozitáři, Latte recepty, tokeny | Splnit základní pravidla; registrovat Local práci |
| Hlavní vývojář | Píše Latte ručně, často i navrhuje | Tokeny, recepty, pravidla portování pro Latte | Spoluvlastní revizi registru; jeho vzory jsou první kandidáti na Recipe |
| Kdokoli s promptem jinde | Vibuje prototypy v sandboxu s webovými komponentami | Webové komponenty, skilly, tokeny | Výstup brát jako návrh, ne jako produkci |
| Vlastník DS (Lexa) | Kurátoruje, nehlídá bránu | Registr a jeho revize, pravidla portování | Udržuje tokeny, skilly a popisy aktuální |

Největší posun je v prvním řádku. Když designéři pracují v produkčním repozitáři, záleží na Latte receptech a skillech uvnitř toho repozitáře víc než na knihovně ve Figmě. Tam musí být MiniS přítomný jako první.

## Kam patří Figma a webové komponenty

Obojí zůstává, s užší a poctivější rolí.

**Figma** zůstává zdrojem pravdy pro tokeny: proměnné vznikají tam a exportují se do repozitáře. Mimo tokeny je knihovna ve Figmě plocha pro návrh a revize, ne něco, na čem produkce závisí.

**Webové komponenty** se stávají referenční implementací a vibovacím sandboxem. Ukazují přesně, jak se má recept chovat, dávají AI prototypům mimo Nette repozitář něco skutečného, s čím stavět, a jsou připravené, kdyby je převzala mobilní aplikace. Nejsou závislostí produkce a jejich úspěch se neměří nasazením v produkci.

## Současný stav a mezery

Vrstva tokenů je vyspělá; skoro všechno, co nový model přidává nad ni, zatím chybí. Vychází to z projektových poznámek ze září a z Figma souboru MiniS-DS, ne z čerstvého pohledu do repozitáře, takže před plánováním ověřit.

| Oblast | Hotovo | Chybí pro tento model |
| --- | --- | --- |
| Tokeny | Proměnné ve Figmě (Foundation light/dark, Layout s režimy breakpointů, Theme Classic/Gift, Typography, Scales); export do tokens.json a packages/tokens; OKLCH primitivní škály | Publikovaný nebo do Nette repozitáře vložený balíček tokenů; automatický export místo ručního; tokeny za běhu (CSS custom properties) pro témata; adopce typografie |
| Recepty | Webové komponenty ve Storybooku jako reference | Latte verze stejných vzorů |
| Skilly | Nic | Skill pro stavění, skill pro přispívání, AGENTS.md v kořeni, ideálně generované z tokenů a popisů |
| Automatické kontroly | Nic v CI | Stylelint pravidlo pro tokeny, a11y test, kontrola AI popisů |
| Pravidla portování | Implicitně v buildu tokenů | Sepsané návody pro Latte/Nette a webové komponenty |
| Registr a jeho revize | Nic | Registr Local prvků, měsíční revize s hlavním vývojářem |
| Figma | Proměnné, komponenty, stránky dokumentace, plugin pro export tokenů | Nic nového; ponechat jako plochu pro návrh a revize |

### Adopce tokenů v Nette repozitáři (29. 10. 2026)

Analýza Nette týmu ukazuje, že adopce je skutečná, ale do cíle je daleko. Ze 557 exportovaných názvů MiniS se v repozitáři efektivně používá 133, zhruba čtvrtina. Vlastní Stylus proměnné mají 5 278 přímých použití, generované proměnné MiniS 1 157, takže na MiniS připadá zhruba 18 % použití proměnných. K tomu přibližně 1 300 natvrdo zapsaných hex barev, 14 400 hodnot v px a 986 literálních velikostí písma.

| Kategorie | V exportu | Dostupné v repu | Efektivně použité | Soubory |
| --- | --- | --- | --- | --- |
| `--color-*` | 247 | 191 | 101 | 254 |
| `--spacing-layout-*` | 7 | 6 | 6 | 3 |
| `--border-radius-*` | 6 | 6 | 5 | 172 |
| `--typography-*` | 66 | 62 | 21 | 6 |
| `--components-*` | 120 | 0 | 0 | 0 |
| `--theme-*` | 10 | 0 | 0 | 0 |
| `--scales-*`, `--breakpoint-*` | 88 | 0 | 0 | 0 |

Barvy a zaoblení se do produkce částečně dostaly, typografie téměř ne. Tokeny komponent, témat, škál a breakpointů se nepoužívají vůbec.

Co z toho plyne:

- **Tokeny žijí jen při buildu.** Style Dictionary je převádí na Stylus proměnné a ty se vyrenderují do literálního CSS. V produkci za běhu žádné CSS custom properties MiniS nejsou, takže přepínání témat (Gift) ani tmavý režim takto nefungují.
- **Tokeny se používají ve Stylusu, ne v Latte.** Šablony jen vybírají CSS bundle, recept proto musí být dvojice Latte + Stylus.
- **Pravidlo „jen tokeny“ musí začít s baseline.** Při 14 tisících porušení by blokující kontrola zastavila všechno. Kontrola proto blokuje jen nová porušení a počet stávajících se sleduje jako metrika. Stylelint Stylus nativně nepodporuje, je potřeba plugin nebo vlastní kontrola.
- **Pipeline se rozjíždí.** Exportér se spouští ručně a poslední export je novější než tokeny uložené v repozitáři.
- **Dobrá zpráva: jeden vstupní bod.** Web, admin, partner admin i partner guide importují společnou vrstvu `settings`, takže jedna změna zasáhne všechny povrchy.
- **Nejrychlejší cesta k vyšší adopci.** 90 barevných aliasů v `colors.styl` lze přesměrovat na tokeny MiniS. Podíl MiniS tím vzroste bez zásahu do 279 souborů.
- **Mobilní aplikace.** Style Dictionary už generuje i výstup pro Kotlin.

Čísla výše měří jen produkční kód webu. Další formou adopce je zpřístupnění MiniS v Claude Design a možnost vibovat aplikace s použitím tokenů a komponent; adopce tak nemusí začínat v produkčním kódu.

## Rozhodnutí k validaci

Rozhodnutí vyplývají z auditu repozitáře minis-design-system (23. 10. 2026) a z diskuse nad briefem a je potřeba je uzavřít, než brief půjde dál. Návrhy jsou od Clauda a zatím nejsou ověřené.

Podklady k rozhodnutím: Audit repozitáře (neověřeno)

| # | Rozhodnutí | Návrh | Stav |
| --- | --- | --- | --- |
| 1 | Heritage barvy vs. pravidlo 7 | Heritage barvy jsou součást MiniS jako vlastní vrstva tokenů označená jako legacy (ve Figmě už existuje skrytá kolekce `.heritage`). Pravidlo „jen tokeny“ pak platí v produkci hned a přechod z heritage je změna tokenů, ne výjimka z pravidla. | K validaci |
| 2 | Fallback hodnoty ve `var()` (pravidlo 2) | Povolené jen tokenové fallbacky `var(--a, var(--b))`, literály `var(--a, #hex)` zakázané. Platí stejně pro Latte i webové komponenty. Stávající literály (75 hex, 212 px) se uklídí, dokud je Stylelint ve varovném režimu. | K validaci |
| 3 | Kanonické názvy tokenů | Kanonický je `tokens.css`, protože ho používá kód. Názvy ve Figmě nebo exportér se upraví, aby `tokens.json` odpovídal. Registr a Stylelint čtou zbuildované CSS. | K validaci |
| 4 | Stávající AI vrstva (CLAUDE.md, docs/ai-prompts, skill minis-app) | Zdrojem popisů je registr a dokumentace pro AI se z něj generuje. CLAUDE.md se rozdělí na AGENTS.md se základními pravidly pro všechna prostředí a části pro jednotlivá prostředí (Latte, webové komponenty). Skill minis-app zůstává pro sandbox a dostane krok „zaregistruj jako Local“. | K validaci |
| 5 | Code Connect | Přestat ho vyžadovat, plán Professional ho neumožňuje publikovat. Stávající `.figma.ts` zůstávají jako volitelné. Klíč komponenty ve Figmě a odkaz na Storybook patří do `meta.implementations.figma` v registru. | K validaci |
| 6 | Mobilní aplikace | Mobilní aplikace je vydaná a už převzala hodnoty tokenů MiniS; v plánu je převzít i jejich názvy a strukturu. Je tedy třetím cílem portování tokenů. Zda převezme i webové komponenty, zůstává otevřené (viz otázky níže). | Přijato |
| 7 | Komponenty z produkce, které v MiniS nejsou | Zapsat je do registru nejdřív tak, jak jsou; facelift a zpětné nasazení jsou samostatný krok. Tier položek zatím otevřený (návrh: production). | Přijato |
| 8 | Implementace vzoru na všech platformách v registru | meta.implementations má povinný klíč pro každou platformu z tabulky platforem a pro Figmu. Každý klíč nese stav: hotovo (+ cesta nebo identifikátor), částečně, chybí, netýká se, neznámo. CI hlídá, že žádný klíč nechybí, takže „nedefinováno“ je vždy výslovně uvedené. Z registru pak jde vyčíst matice pokrytí vzor × platforma, což je i podklad pro měření adopce. | K validaci |

## Plán zavedení

Návrh: změny zavádět po fázích, od dohody přes tokeny a kontroly k registru a receptům. Každá fáze má jasné „hotovo, když“, aby šlo poznat, že se posunula. Termíny jsou orientační a čísla cílů zatím nejsou stanovená.

| Fáze | Kdy | Co | Hotovo, když | todo-plans |
| --- | --- | --- | --- | --- |
| 0. Dohoda | listopad 2026 | Projít brief s vedením designu a vývoje a potvrdit společnou odpovědnost; jmenovat schvalovací skupinu; dohodnout s Nette týmem, kde MiniS v jejich repozitáři žije; uzavřít rozhodnutí 1–3 | Závazek týmu potvrzený, schvalovací skupina jmenovaná, rozhodnutí 1–3 přijatá | Nový plán |
| 1. Tokeny v Nette | listopad–prosinec | Automatický export tokenů místo ručního; distribuce jako verzovaný balíček a zdroj ve formátu Style Dictionary; přesměrovat barevné aliasy v colors.styl na MiniS; změřit baseline adopce | Export běží bez ruční práce; podíl MiniS roste z výchozích \~18 % \[cíl \_\_\_ %\] | 001 heritage (existuje); plán distribuce tokenů (ověřit) |
| 2. Kontroly | prosinec–leden | Kontrola tokenů pro Stylus s baseline, nejdřív varování a pak blokující; pravidlo pro fallbacky ve var(); a11y test v CI | CI blokuje nová porušení a počet stávajících klesá | Plán Stylelint (ověřit) |
| 3. Registr a skilly | leden | registry.json ve formátu shadcn s JSON Schema pro meta; naplnit webovými komponentami a komponentami z produkce; kontrola registru v CI; AGENTS.md a skill pro přispívání v Nette repozitáři; skill minis-app s krokem registrace | AI session v Nette repozitáři najde existující prvek dřív, než postaví nový | Plány skillů (ověřit); registr: nový plán |
| 4. Recepty a první revize | únor | Tři nejpoužívanější vzory jako recepty Latte + Stylus s AI popisem; návod portování pro Latte/Nette; první měsíční revize registru a první schválený návrh | První Local vzor prošel schválením a je v Základu | Nový plán |
| 5. Rozšíření | od března 2027 | MiniS v Claude Design; adopce typografických tokenů; tokeny za běhu pro témata a tmavý režim; názvy tokenů v mobilní aplikaci; ikony do produkčního webfontu | Podle samostatných plánů | Nové plány |

Sloupec todo-plans vychází z poznámek v tomto briefu, ne z aktuálního stavu repozitáře. Před startem je potřeba ho porovnat se složkou todo-plans/ v MiniS repozitáři.

## Další kroky a otevřené otázky

Začít tam, kde teď designéři pracují: uvnitř Nette repozitáře.

- [ ] Dohodnout s Nette týmem, kde bude MiniS v jejich repozitáři žít (vložený balíček, submodul, nebo zkopírované soubory)
- [ ] Dát do Nette repozitáře AGENTS.md a skill pro přispívání, aby je načetla každá AI session designérů
- [ ] Přidat do Nette repozitáře Stylelint pravidlo pro tokeny v režimu varování a po měsíci ho zpřísnit na blokující
- [ ] Převést tři nejpoužívanější vzory na Latte recepty s AI popisy, začít snippety hlavního vývojáře
- [ ] Sepsat jednostránkový návod portování pro Latte/Nette
- [ ] Naplánovat první revizi registru s hlavním vývojářem
- [ ] Analyzovat, jaký podíl tokenů MiniS je portovaný a skutečně používaný v Nette repozitáři, jako měřítko, jak úspěšná je adopce DS ve skutečnosti (výstup pro Ladislava Suchánka); hotovo 29. 10., viz Adopce tokenů v Nette repozitáři
- [ ] Založit v todo-plans/ draft plány pro skilly ze sekce „Skilly, které MiniS potřebuje“ a pro jejich distribuci
- [ ] Založit v todo-plans/ draft plán pro Stylelint (pravidlo „jen tokeny“): zkušební běh, sdílená konfigurace, nasazení v repozitáři MiniS a pak v Nette; závisí na rozhodnutích 2 a 3
- [ ] Založit v todo-plans/ draft plán pro distribuci tokenů: verzovaný balíček a zdroj ve formátu Style Dictionary, ze kterého si Nette tým vygeneruje vlastní výstupy (Nette tým chce použít Style Dictionary)

* [ ] Založit registry.json ve formátu shadcn a JSON Schema pro pole `meta`
* [ ] Naplnit registr existujícími webovými komponentami, prvními Latte recepty a komponentami z produkce, které v MiniS zatím nejsou: nejdřív je zdokumentovat tak, jak jsou, pak případně faceliftovat a zpětně aplikovat
* [ ] Přidat do CI kontrolu registru: chybějící položky, neexistující soubory, prázdné popisy
* [ ] Vyzkoušet shadcn MCP server nad registrem MiniS v Claude Code

- [ ] Přesměrovat barevné aliasy v `colors.styl` na tokeny MiniS
- [ ] Napojit exportér tokenů na automatický krok (např. PR z exportu), aby tokeny v repozitáři nezaostávaly
- [ ] Změřit baseline pro pravidlo „jen tokeny“ (hex, px, font-size) a sledovat ji jako metriku adopce
- [ ] Rozhodnout, zda produkce potřebuje tokeny za běhu (CSS custom properties) kvůli tématům a tmavému režimu
- [ ] Naplánovat adopci typografických tokenů

Otevřené otázky:

- Znamená vibování nad kódem, že designéři otevírají pull requesty, nebo jejich výstup přebírají a přepracovávají vývojáři?
- Kdo schvaluje pull request, který projde kontrolami v CI, ale přidává nový Local vzor?
- Přejde mobilní aplikace i na webové komponenty MiniS? Odpověď ovlivní, kolik investovat do webových komponent. (Známé: aplikace je vydaná, hodnoty tokenů MiniS už převzala, názvy a struktura tokenů jsou v plánu.)
- Na čem běží Admin a Slevomat for Partners (také Nette/Latte?) a jak dnes MiniS používají?
- Čím se liší „Web“ a „Web FE pro lidi (B2C)“ a na čem každý běží?
- Přejmenovat sekci „Jak funguje přispívání“ na „Contribution guide“?
- Diagram přispívání má stále anglické popisky s „floor“ – přepsat je stejně jako text?
- Jaký tier v registru dostanou zdokumentované komponenty z produkce? Vlastní (např. „production“), aby se nepletly s novou Local prací?
- Kdo může zakládat issues v GitHub repozitáři MiniS? Mají designéři a lidé mimo DS tým přístup, nebo musí skill pro hlášení chyb umět i jinou cestu?
- Jak skilly distribuovat do Nette repozitáře a k lidem: plugin pro Claude Code, kopie souborů, nebo součást balíčku MiniS?
- Kdo a jak dostává nové ikony do produkčního webfontu? Bez toho sada figma-only v produkci chybí.
- Jak ikony zapsat do registry.json: jedna položka za celou sadu, nebo položka pro každou ikonu?
- Style Dictionary export drží v cestě názvy kolekcí (color.foundation.surface.primary), CSS má --color-surface-primary. Jaká transformace názvů platí pro Nette, aby tam tokeny nevznikly pod jinými jmény? (navazuje na rozhodnutí 3)
