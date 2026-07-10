import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { MotionOrchestrator } from '@/components/MotionOrchestrator';
import { WaitlistForm } from '@/components/WaitlistForm';
import type { BentoCard, PageVariant, UseCase } from '@/lib/variants';

type LandingPageProps = {
  readonly variant: PageVariant;
};

type CssVariableStyle = CSSProperties & {
  readonly '--hero-image'?: string;
  readonly '--inline-image'?: string;
  readonly '--case-image'?: string;
  readonly '--card-image'?: string;
};

function splitWords(text: string): readonly string[] {
  return text.split(' ');
}

function cardClass(card: BentoCard): string {
  return `bento-card bento-card-${card.span} group-hoverable`;
}

function caseStyle(useCase: UseCase): CssVariableStyle {
  return {
    '--case-image': `url(${useCase.image})`
  };
}

function cardStyle(card: BentoCard): CssVariableStyle {
  if (card.image === undefined) {
    return {};
  }

  return {
    '--card-image': `url(${card.image})`
  };
}

export function LandingPage({ variant }: LandingPageProps) {
  const heroStyle: CssVariableStyle = {
    '--hero-image': `url(${variant.heroImage})`,
    '--inline-image': `url(${variant.inlineImage})`
  };

  return (
    <MotionOrchestrator>
      <main className={`page-root ${variant.themeClass}`}>
        <nav className="site-nav reveal">
          <Link href="/" className="brand-link" aria-label="Longer landing page picker">
            <img src="/longer-mark-transparent.png" alt="" />
            <span>LONGER</span>
          </Link>
          <div className="nav-links" aria-label="Variant routes">
            <Link href="/clinical">Clinical</Link>
            <Link href="/performance">Performance</Link>
            <Link href="/pharma">Pharma</Link>
          </div>
          <a className="nav-cta" href="#waitlist">
            Waitlist <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </nav>

        <section className="hero-section" style={heroStyle}>
          <div className="hero-image-plane media-reveal" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-eyebrow reveal">{variant.eyebrow}</p>
            <h1 className="hero-title reveal">
              {variant.heroLineOne}
              <span className="inline-type-image" aria-hidden="true" />
              <br />
              {variant.heroLineTwo}
            </h1>
            <p className="hero-copy reveal">{variant.heroCopy}</p>
            <div className="hero-actions reveal">
              <a href="#waitlist" className="button-primary">
                {variant.primaryCta}
              </a>
              <a href="#dosing" className="button-secondary">
                {variant.secondaryCta}
              </a>
            </div>
          </div>
        </section>

        <section className="proof-strip reveal" aria-label="Launch context">
          <p>{variant.proofLine}</p>
        </section>

        <section className="bento-section" id="dosing">
          <div className="section-heading reveal">
            <h2>{variant.bentoTitle}</h2>
            <p>{variant.bentoCopy}</p>
          </div>
          <div className="bento-grid">
            {variant.bentoCards.map((card) => (
              <article className={cardClass(card)} style={cardStyle(card)} key={card.title}>
                {card.image === undefined ? null : <div className="bento-image" aria-hidden="true" />}
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="product-section">
          <div className="product-copy reveal">
            <h2>{variant.productTitle}</h2>
            <p className="word-reveal">
              {splitWords(variant.productCopy).map((word, index) => (
                <span key={`${variant.slug}-${index}-${word}`}>{word} </span>
              ))}
            </p>
          </div>
          <div className="product-stack" aria-label="Launch flavors">
            {variant.flavors.map((flavor, index) => (
              <article className="flavor-card stack-card group-hoverable" key={flavor.name}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{flavor.name}</h3>
                <p>{flavor.descriptor}</p>
                <small>{flavor.dose}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="accordion-section">
          <div className="section-heading reveal">
            <h2>{variant.useCaseTitle}</h2>
          </div>
          <div className="use-case-accordion">
            {variant.useCases.map((useCase) => (
              <article className="use-case-panel group-hoverable" style={caseStyle(useCase)} key={useCase.title}>
                <div className="use-case-image" aria-hidden="true" />
                <div>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.copy}</p>
                  <ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonial-section reveal">
          <blockquote>{variant.testimonial}</blockquote>
          <p>{variant.testimonialSource}</p>
        </section>

        <section className="final-section" id="waitlist">
          <div className="final-copy reveal">
            <h2>{variant.finalHeadline}</h2>
            <p>{variant.finalCopy}</p>
          </div>
          <WaitlistForm buttonLabel={variant.primaryCta} />
        </section>

        <footer className="site-footer">
          <p>Longer is an electrolyte powder. It is not intended to diagnose, treat, cure, or prevent disease.</p>
          <div>
            <Link href="/clinical">Clinical</Link>
            <Link href="/performance">Performance</Link>
            <Link href="/pharma">Pharma</Link>
          </div>
        </footer>
      </main>
    </MotionOrchestrator>
  );
}
