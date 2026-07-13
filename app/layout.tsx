// Root layout — minimal shell required by Next.js App Router.
// The locale-specific layout at app/[locale]/layout.tsx sets lang, fonts,
// and NextIntlClientProvider. This file intentionally has no styling.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
