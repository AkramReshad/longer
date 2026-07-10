import Link from 'next/link';

type LogoProps = {
  readonly className?: string;
};

const routes = [
  {
    slug: 'clinical',
    title: 'Clinical Hydration',
    copy: 'White product stage, big diagnosis headline, immediate waitlist action.',
    image: '/concepts/clinical-reference-longer-candidate.png'
  },
  {
    slug: 'performance',
    title: 'Performance Moment',
    copy: 'Night race urgency, packet handoff, mile 20 pressure.',
    image: '/concepts/performance-reference-longer-candidate-2.png'
  },
  {
    slug: 'pharma',
    title: 'Prescription Sheet',
    copy: 'Hard pharmaceutical insert system with product, protocol, and flavors.',
    image: '/concepts/pharma-reference-longer-candidate.png'
  }
] as const;

const flavors = [
  {
    name: 'BLUE PILL',
    descriptor: 'Unflavored',
    servings: '30 SERVINGS',
    image: '/concepts/pharma-powder.png'
  },
  {
    name: 'WATERMELONAFIL',
    descriptor: 'Watermelon',
    servings: '30 SERVINGS',
    image: '/concepts/pharma-watermelon.png'
  },
  {
    name: 'PED PINEAPPLE',
    descriptor: 'Pineapple',
    servings: '30 SERVINGS',
    image: '/concepts/pharma-pineapple.png'
  }
] as const;

function LongerMark({ className }: LogoProps) {
  return <img className={className} src="/longer-mark-transparent.png" alt="" />;
}

function LongerLogo({ className }: LogoProps) {
  return (
    <span className={`longer-logo ${className ?? ''}`} aria-label="Longer">
      <LongerMark className="longer-logo-mark" />
      <span className="longer-logo-name">LONGER</span>
      <span className="longer-logo-tagline">ELECTROLYTE DYSFUNCTION</span>
    </span>
  );
}

function LongerWordmark({ className }: LogoProps) {
  return (
    <span className={`longer-wordmark ${className ?? ''}`} aria-label="Longer">
      <span>LONGER</span>
      <small>ELECTROLYTE DYSFUNCTION</small>
    </span>
  );
}

function ClinicalDivider() {
  return (
    <div className="clinical-divider" aria-hidden="true">
      <span />
      <LongerMark className="clinical-divider-logo" />
      <span />
    </div>
  );
}

export function ConceptHomePage() {
  return (
    <main className="concept-picker">
      <nav className="concept-picker-nav">
        <LongerWordmark className="concept-picker-logo" />
        <span>Electrolyte Dysfunction</span>
      </nav>
      <section className="concept-picker-hero">
        <p>Three built routes. One condition.</p>
        <h1>Pick the Longer front page.</h1>
      </section>
      <section className="concept-picker-grid" aria-label="Longer landing page concepts">
        {routes.map((route) => (
          <Link className={`concept-picker-card concept-picker-card-${route.slug}`} href={`/${route.slug}`} key={route.slug}>
            <img className="concept-card-reference" src={route.image} alt="" />
            <LongerWordmark className="concept-card-logo" />
            <span>{route.title}</span>
            <h2>{route.copy}</h2>
            <b aria-hidden="true">View</b>
          </Link>
        ))}
      </section>
    </main>
  );
}

export function ClinicalConceptPage() {
  return (
    <main className="concept-page clinical-campaign">
      <section className="clinical-hero" aria-labelledby="clinical-title">
        <LongerLogo className="clinical-main-logo" />
        <h1 id="clinical-title">
          Are you suffering
          <br />
          from ED?
        </h1>
        <ClinicalDivider />
        <p className="clinical-subhead">Electrolyte Dysfunction.</p>
        <div className="clinical-actions">
          <a className="clinical-button clinical-button-primary" href="#waitlist">
            Join the waitlist
          </a>
          <a className="clinical-button clinical-button-secondary" href="#dosing">
            See dosing information
          </a>
        </div>
      </section>
    </main>
  );
}

export function PerformanceConceptPage() {
  return (
    <main className="concept-page performance-campaign">
      <img className="performance-runner" src="/concepts/performance-runner-longer.png" alt="" />
      <div className="performance-scrim" aria-hidden="true" />
      <section className="performance-copy" aria-labelledby="performance-title">
        <h1 id="performance-title">
          When
          <br />
          performance
          <br />
          matters.
        </h1>
        <p>Take one packet 30 minutes before physical activity.</p>
        <div className="performance-actions">
          <a className="performance-button performance-button-primary" href="#waitlist">
            Get notified
          </a>
          <a className="performance-button performance-button-secondary" href="#warnings">
            Read warnings
          </a>
        </div>
        <div className="performance-wordmark" aria-label="Longer electrolyte powder">
          <span>LONGER</span>
          <i />
          <small>
            ELECTROLYTE
            <br />
            POWDER
          </small>
        </div>
      </section>
    </main>
  );
}

export function PharmaConceptPage() {
  return (
    <main className="concept-page pharma-campaign">
      <nav className="pharma-nav">
        <Link className="pharma-logo-link" href="/">
          <LongerWordmark className="pharma-logo" />
        </Link>
        <div className="pharma-links">
          <a href="#product">Product</a>
          <a href="#science">Science</a>
          <a href="#ingredients">Ingredients</a>
          <a href="#protocol">Protocol</a>
          <a href="#journal">Journal</a>
        </div>
        <a className="pharma-waitlist" href="#waitlist">
          Clinical waitlist <span aria-hidden="true">+</span>
        </a>
      </nav>

      <section className="pharma-hero" id="product" aria-labelledby="pharma-title">
        <div className="pharma-rail" aria-hidden="true">
          <span>01</span>
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="pharma-copy">
          <p>Prescription Hydration</p>
          <h1 id="pharma-title">
            Electrolyte
            <br />
            Dysfunction
            <br />
            <span>is treatable.</span>
          </h1>
          <p className="pharma-coming">
            <strong>Blue Pill</strong> is coming soon.
          </p>
          <a className="pharma-primary" href="#waitlist">
            Join clinical waitlist <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
        <img className="pharma-product-stage" src="/concepts/pharma-product-stage-longer.png" alt="" />
      </section>

      <section className="pharma-insert" id="protocol">
        <aside className="insert-spine">Prescriber insert</aside>
        <article className="rx-card">
          <span className="rx-mark">Rx</span>
          <h2>Longer electrolyte powder medical food</h2>
          <h3>Indication</h3>
          <p>For the dietary management of electrolyte deficiency.</p>
          <h3>Dosage</h3>
          <p>Mix 1 stick pack with 16-24 fl oz of water. Consume daily or as directed.</p>
        </article>
        <div className="protocol-steps" aria-label="Dosing protocol">
          <article>
            <span>1</span>
            <div className="protocol-icon protocol-pour" aria-hidden="true" />
            <p>Pour</p>
          </article>
          <article>
            <span>2</span>
            <div className="protocol-icon protocol-stir" aria-hidden="true" />
            <p>Stir</p>
          </article>
          <article>
            <span>3</span>
            <div className="protocol-icon protocol-hydrate" aria-hidden="true" />
            <p>Hydrate</p>
          </article>
        </div>
        <p className="insert-warning">
          Use under medical supervision. Not for parenteral use. Not for use in individuals with renal impairment except
          under medical supervision.
        </p>
        <div className="flavor-row" id="ingredients">
          {flavors.map((flavor) => (
            <article className="flavor-panel" key={flavor.name}>
              <h2>{flavor.name}</h2>
              <p>{flavor.descriptor}</p>
              <img src={flavor.image} alt="" />
              <span>{flavor.servings}</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="pharma-footer">
        <span>Longer 2024</span>
        <strong>This is a medical food for the dietary management of electrolyte deficiency.</strong>
        <span>Not for parenteral use.</span>
      </footer>
    </main>
  );
}
