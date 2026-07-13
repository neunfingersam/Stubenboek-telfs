import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';

function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mb-6 h-12 w-12 text-gold">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643" />
    </svg>
  );
}

export default function Sustainability() {
  const t = useTranslations('sustainability');

  return (
    <SectionWrapper id="sustainability" dark>
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <IconLeaf />
        </div>
        <h2 className="mb-6 font-serif text-4xl font-bold text-white md:text-5xl">
          {t('headline')}
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-white/75">{t('text')}</p>
        <blockquote className="font-serif text-2xl font-bold italic text-gold">
          &ldquo;{t('quote')}&rdquo;
        </blockquote>
      </div>
    </SectionWrapper>
  );
}
