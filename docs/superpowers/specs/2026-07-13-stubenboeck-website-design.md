# Haus Stubenböck — Website Redesign Spec
**Datum:** 2026-07-13
**Stack:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion + SQLite + Resend

---

## 1. Ziel

Vollständige Neugestaltung der Website stubenboeck-telfs.com als modernes, hochwertiges Buchungsportal für eine familiengeführte Pension in Telfs, Tirol. Kundenauftrag (Demo/Showcase).

---

## 2. Tech Stack

| Schicht | Technologie |
|--------|-------------|
| Framework | Next.js 14 App Router |
| Styling | Tailwind CSS v3 |
| Animationen | Framer Motion |
| Datenbank | SQLite via Prisma |
| E-Mail | Resend (kostenlos bis 3000/Monat) |
| Deployment | Vercel (kostenlos) |
| Bilder | Eigene Website + Airbnb (öffentlich) + Unsplash als Fallback |

---

## 3. Design-Sprache

**Stil:** Alpine Boutique — warm, modern, hochwertig

**Farben:**
- `#1C2B1E` — Tiefes Alpingrün (Primär, Navbar, Buttons)
- `#C8A96E` — Warmes Gold (Akzent, CTAs, Icons)
- `#F7F4EF` — Cremeweiß (Haupthintergrund)
- `#2D4A32` — Helleres Grün (Hover-States)
- `#6B7280` — Grau (Sekundärtext)
- `#1A1A1A` — Fast Schwarz (Haupttext)

**Typografie:**
- Headlines: `Playfair Display` (serif, elegant)
- Body: `Inter` (sans-serif, lesbar)

**Design-Prinzipien:**
- Viel Weißraum
- Große, qualitative Bilder
- Sanfte Scroll-Animationen (fade-in, slide-up)
- Mobile-first, vollständig responsiv

---

## 4. Seitenstruktur

### 4.1 Navigation (sticky, transparent → solid beim Scrollen)
- Logo links (Haus Stubenböck)
- Links: Zimmer | Galerie | Nachhaltigkeit | Anreise | Kontakt
- Rechts: Sprache DE/EN + "Jetzt buchen"-Button (gold)

### 4.2 Hero
- Vollbild-Slider (Autoplay, 5s) mit echten Fotos vom Haus
- Animierte Headline: "Herzlich Willkommen im Haus Stubenböck"
- Subtext: "Ruhig und zentral — Telfs, Tirol"
- CTA-Button: "Zimmer & Verfügbarkeit" → scrollt zu Buchung
- Dunkler Overlay-Gradient für Lesbarkeit

### 4.3 Willkommen-Sektion
- 2-Spalten Layout: Text links, Bild rechts
- Headline + kurzer Willkommenstext (Maria Verena Stubenböck)
- 3 USP-Badges: Familiengeführt | Nachhaltig | Zentral gelegen
- Rating-Anzeige: 4.76★ (50 Bewertungen, Airbnb)

### 4.4 Zimmer
- 3 Karten (Einzel-, Doppel-, Mehrbettzimmer)
- Jede Karte: Foto, Name, kurze Beschreibung, Ausstattung-Icons, Preis ab X€
- "Verfügbarkeit prüfen"-Button pro Zimmer → öffnet Buchungsformular mit vorausgefülltem Zimmertyp

### 4.5 Für Berufspendler / Monteure
- Eigene Sektion mit grünem Hintergrund
- Icon-Liste: Längere Aufenthalte willkommen | Küche kostenlos | Parkplatz | WLAN | Wäscheraum
- CTA: Direkt anfragen

### 4.6 Ausstattung
- Icon-Grid (6–8 Icons): Parkplatz, Fahrradraum, Küche, Balkon, WLAN, Frühstück optional, Welcome Card, Haustiere auf Anfrage

### 4.7 Galerie
- Masonry-Grid mit allen verfügbaren Fotos
- Lightbox beim Klick (mit Pfeilen zum Durchblättern)
- Lazy-loading

### 4.8 Nachhaltigkeit
- Dunkler grüner Hintergrund
- Headline: "Nachhaltig, biologisch & familiär"
- Text: eigener Obst- und Gemüsegarten, regionale Produkte, bewusster Umgang mit Ressourcen
- Zitat: "There is no Planet B"

### 4.9 Buchungssystem (Request-to-book)
- Schritt 1: Zimmer wählen (Einzel / Doppel / Mehrbett)
- Schritt 2: Anreise- und Abreisedatum (Kalender, belegte Daten blockiert)
- Schritt 3: Anzahl Personen + Name + E-Mail + Telefon + optionale Nachricht
- Schritt 4: Anfrage absenden → Bestätigungs-E-Mail an Gast ("Wir melden uns in Kürze")
- Admin erhält E-Mail mit Bestätigungs- und Ablehnungs-Link
- Bei Bestätigung: Buchung in DB als "confirmed" gesetzt, Gast bekommt Bestätigungs-Mail
- Bei Ablehnung: Gast bekommt höfliche Absage-Mail, Daten bleiben frei
- Keine Doppelbuchungen: belegte Daten werden im Kalender grau/blockiert

### 4.10 Anreise
- Eingebettete Google Maps Karte (Gießenweg 9, 6410 Telfs)
- Anfahrt mit Auto, Zug, Bus
- Parkplatz-Info

### 4.11 Kontakt
- Name, Adresse, Telefon, E-Mail (anklickbar)
- Einfaches Kontaktformular (kein Buchungsbezug, nur allgemeine Fragen)

### 4.12 Footer
- Logo + Kurzbeschreibung
- Links: Impressum | Datenschutz | Cookie-Einstellungen
- Partner-Logos: Alpine Gastgeber, Gemeinde Telfs
- Copyright

---

## 5. Buchungssystem — Datenmodell

```prisma
model Room {
  id          Int       @id @default(autoincrement())
  name        String    // "Einzelzimmer", "Doppelzimmer", "Mehrbettzimmer"
  slug        String    @unique
  maxGuests   Int
  pricePerNight Float
  bookings    Booking[]
}

model Booking {
  id          Int       @id @default(autoincrement())
  roomId      Int
  room        Room      @relation(fields: [roomId], references: [id])
  checkIn     DateTime
  checkOut    DateTime
  guestName   String
  guestEmail  String
  guestPhone  String
  message     String?
  status      BookingStatus @default(PENDING)
  token       String    @unique  // für Bestätigungs-/Ablehnungslink
  createdAt   DateTime  @default(now())
}

enum BookingStatus {
  PENDING
  CONFIRMED
  REJECTED
}
```

---

## 6. E-Mail-Flows

| Trigger | Empfänger | Inhalt |
|---------|-----------|--------|
| Neue Anfrage | Gast | "Danke für Ihre Anfrage, wir melden uns bald" |
| Neue Anfrage | Admin (Maria Verena) | Buchungsdetails + Bestätigen-Link + Ablehnen-Link |
| Admin bestätigt | Gast | "Ihre Buchung ist bestätigt!" mit Details |
| Admin lehnt ab | Gast | Höfliche Absage mit Alternativvorschlag |

---

## 7. Mehrsprachigkeit

- DE und EN (wie Original)
- Via `next-intl`
- Alle Texte in `messages/de.json` und `messages/en.json`

---

## 8. Performance & SEO

- Next.js Image Optimization für alle Bilder
- Meta-Tags + OpenGraph pro Seite
- Structured Data (LocalBusiness Schema)
- Lighthouse Score Ziel: 90+

---

## 9. Projektstruktur

```
stubenboeck/
  app/
    [locale]/
      page.tsx              # Hauptseite (alle Sektionen)
      booking/
        confirm/[token]/    # Admin-Bestätigung
        reject/[token]/     # Admin-Ablehnung
      api/
        bookings/           # POST neue Buchung, GET belegte Daten
        contact/            # POST Kontaktformular
  components/
    sections/               # Hero, Rooms, Gallery, Booking, ...
    ui/                     # Button, Card, Input, Modal, ...
  lib/
    db.ts                   # Prisma Client
    email.ts                # Resend E-Mail Funktionen
    booking.ts              # Buchungslogik (Verfügbarkeitsprüfung)
  messages/
    de.json
    en.json
  prisma/
    schema.prisma
```

---

## 10. Bilder-Quellen

- Haus-Fotos: `https://www.stubenboeck-telfs.com/images/willkommen/bildergalerie/` (25 Fotos)
- Airbnb: 8 Fotos (öffentlich zugänglich)
- Unsplash: Tirol/Alpen-Landschaftsfotos als Hero-Ergänzung

---

## 11. Out of Scope (für jetzt)

- Online-Zahlung (Stripe)
- Anbindung an Booking.com/Airbnb Channel Manager
- Blog/Neuigkeiten
- Bewertungssystem

---

## 12. Erfolgskriterien

- Vollständig responsiv (Mobile, Tablet, Desktop)
- Buchungsanfrage funktioniert End-to-End (inkl. E-Mails)
- Keine Doppelbuchungen möglich
- DE/EN Sprachwechsel
- Deployment auf Vercel lauffähig
