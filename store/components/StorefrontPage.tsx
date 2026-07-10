import Image from 'next/image';
import { WaitlistForm } from '@/components/WaitlistForm';

const symptoms = [
  ['01', 'Premature quitting', 'Stopping before the night, race, set, or story has reached a satisfying conclusion.'],
  ['02', 'Soft splits', 'A sudden inability to maintain pace when performance becomes observable.'],
  ['03', 'Failure to finish', 'Beginning with confidence. Ending with an explanation.'],
  ['04', 'Waking up dry', 'A common morning-after complication of prolonged social activity.']
] as const;

const treatments = [
  {
    code: 'LNG-01',
    name: 'Blue Pill',
    flavor: 'Blue raspberry',
    status: 'First-line option',
    image: '/concepts/pharma-product-stage-longer-v2.png'
  },
  {
    code: 'LNG-02',
    name: 'Watermelonafil',
    flavor: 'Watermelon',
    status: 'Extended release',
    image: '/concepts/pharma-watermelon.png'
  },
  {
    code: 'LNG-03',
    name: 'PED Pineapple',
    flavor: 'Pineapple',
    status: 'Performance enhancing drink',
    image: '/concepts/pharma-pineapple.png'
  }
] as const;

function Wordmark({ inverse = false }: { readonly inverse?: boolean }) {
  return (
    <span className={`bold-wordmark${inverse ? ' bold-wordmark-inverse' : ''}`} aria-label="Longer — Electrolyte Dysfunction">
      <Image src="/longer-mark-pantone-2935c-transparent.png" width={27} height={40} alt="" priority />
      <span>
        <strong>LONGER</strong>
        <small>ELECTROLYTE DYSFUNCTION</small>
      </span>
    </span>
  );
}

export function StorefrontPage() {
  return (
    <main className="bold-site" id="top">
      <a className="bold-skip" href="#diagnosis">
        Skip to patient information
      </a>

      <header className="bold-header">
        <a href="#top" aria-label="Longer home">
          <Wordmark />
        </a>
        <p>Prescription-strength branding. Electrolyte powder.</p>
        <a href="#enrollment">See if Longer is right for you <span>+</span></a>
      </header>

      <section className="bold-hero" aria-labelledby="bold-hero-title">
        <div className="bold-hero-copy">
          <p className="bold-overline"><span>Rx</span> Patient information / Issue 001</p>
          <h1 id="bold-hero-title">Are you suffering from ED?</h1>
          <p className="bold-hero-diagnosis">Electrolyte Dysfunction.</p>
          <p className="bold-hero-body">
            Millions of runners, ravers, golfers, groomsmen, and adults who said they were only having one may be living
            with undiagnosed performance issues.
          </p>
          <div className="bold-hero-actions">
            <a href="#enrollment">See if Longer is right for you</a>
            <a href="#diagnosis">Check your symptoms →</a>
          </div>
          <p className="bold-hero-fineprint">
            Longer is an electrolyte powder. Your results may become visible to training partners, bartenders, and anyone
            waiting at the finish line.
          </p>
        </div>

        <div className="bold-hero-product" aria-label="Longer Blue Pill electrolyte powder">
          <Image
            className="bold-hero-scene"
            src="/concepts/longer-hero-product-v2.png"
            fill
            alt="Longer Blue Pill electrolyte powder stick pack on a white clinical stage"
            sizes="(max-width: 980px) 100vw, 56vw"
            priority
          />
          <div className="bold-rx-seal" aria-hidden="true">
            <strong>Rx</strong>
            <span>For oral hydration only</span>
          </div>
        </div>

        <aside className="bold-hero-index" aria-label="Product reference">
          <span>LONGER / LNG-01</span>
          <span>BLUE RASPBERRY</span>
          <span>CLINICAL TRIAL PENDING</span>
        </aside>
      </section>

      <div className="bold-alert" role="note">
        <span>Important safety information</span>
        <strong>If performance lasts longer than four hours, call your doctor.</strong>
        <span>Scroll for full prescribing information</span>
      </div>

      <section className="bold-diagnosis" id="diagnosis" aria-labelledby="diagnosis-title">
        <header>
          <p>Self-assessment / Form ED-04</p>
          <h2 id="diagnosis-title">Do these symptoms look familiar?</h2>
          <span>Check all that apply. Lie to yourself if necessary.</span>
        </header>
        <div className="bold-symptoms">
          {symptoms.map(([number, title, copy]) => (
            <article key={title}>
              <span>{number}</span>
              <div className="bold-checkbox" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <footer>
          <p>If you checked one or more boxes, you may be ready to go Longer.</p>
          <a href="#treatment">Review treatment options ↓</a>
        </footer>
      </section>

      <section className="bold-blue-pill" id="treatment" aria-labelledby="blue-pill-title">
        <div className="bold-blue-copy">
          <p>Introducing LNG-01</p>
          <h2 id="blue-pill-title">Blue<br />Pill.</h2>
          <p className="bold-blue-lede">For moments when performance matters.</p>
          <dl>
            <div><dt>Route</dt><dd>Oral hydration</dd></div>
            <div><dt>Flavor</dt><dd>Blue raspberry</dd></div>
            <div><dt>Onset</dt><dd>30 minutes before physical activity</dd></div>
            <div><dt>Duration</dt><dd>Long enough to become someone else&apos;s problem</dd></div>
          </dl>
        </div>
        <div className="bold-blue-product">
          <Image
            src="/concepts/pharma-product-stage-longer-v2.png"
            fill
            alt="Longer Blue Pill box and stick pack on a clinical laboratory stage"
            sizes="(max-width: 980px) 100vw, 65vw"
          />
          <p>Actual product appearance may cause questions.</p>
        </div>
        <div className="bold-blue-vertical" aria-hidden="true">PRESCRIPTION HYDRATION / LONGER / BLUE PILL / LNG-01</div>
      </section>

      <section className="bold-study" aria-labelledby="study-title">
        <Image
          src="/concepts/performance-runner-longer.png"
          fill
          alt="Runner pushing through a race at night"
          sizes="100vw"
        />
        <div className="bold-study-scrim" aria-hidden="true" />
        <div className="bold-study-copy">
          <p>Observed in the field</p>
          <h2 id="study-title">When the moment comes, how long will you last?</h2>
          <blockquote>
            “At mile 20, confidence leaves the body through sweat.”
            <cite>— Patient 26.2, distance runner</cite>
          </blockquote>
        </div>
        <div className="bold-study-data">
          <div><strong>20</strong><span>Miles before symptoms became obvious</span></div>
          <div><strong>01</strong><span>Packet handed over by a concerned partner</span></div>
          <div><strong>100%</strong><span>Of investigators had a financial interest in the outcome</span></div>
        </div>
      </section>

      <section className="bold-effects" aria-labelledby="effects-title">
        <div className="bold-effects-title">
          <p>Adverse reactions</p>
          <h2 id="effects-title">Possible side effects include:</h2>
        </div>
        <div className="bold-effects-marquee" aria-hidden="true">
          <span>NEGATIVE SPLITS</span><i>•</i><span>EXTENDED NIGHTLIFE</span><i>•</i><span>INAPPROPRIATE CONFIDENCE</span><i>•</i>
          <span>ASKING FOR ANOTHER ROUND</span><i>•</i><span>FINISHING STRONG</span><i>•</i>
        </div>
        <div className="bold-effects-notes">
          <p>Rare reactions may include unsolicited race registration, excessive eye contact, and texting “still up?” after 2 a.m.</p>
          <p>Discontinue use if you begin explaining electrolyte ratios to strangers.</p>
        </div>
      </section>

      <section className="bold-options" id="options" aria-labelledby="options-title">
        <header>
          <p>Treatment selection / Form LNG-RX</p>
          <h2 id="options-title">Ask your trainer which option is right for you.</h2>
        </header>
        <div className="bold-treatment-list">
          {treatments.map((treatment, index) => (
            <article key={treatment.code} className={index === 0 ? 'bold-treatment-primary' : ''}>
              <div className="bold-treatment-meta">
                <span>{treatment.code}</span>
                <span>{treatment.status}</span>
              </div>
              <Image src={treatment.image} width={420} height={240} alt={`${treatment.name}, ${treatment.flavor}`} />
              <h3>{treatment.name}</h3>
              <p>{treatment.flavor}</p>
              <small>{index === 0 ? 'INITIAL THERAPY' : 'UNDER CLINICAL REVIEW'}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="bold-insert" aria-labelledby="insert-title">
        <div className="bold-insert-spine">FULL PRESCRIBING INFORMATION</div>
        <div className="bold-insert-main">
          <div className="bold-insert-rx">Rx</div>
          <h2 id="insert-title">Longer™ electrolyte powder</h2>
          <p className="bold-insert-deck">For the temporary management of boring hydration.</p>
          <div className="bold-insert-columns">
            <article>
              <h3>Indications and usage</h3>
              <p>Longer is indicated for runners, lifters, partygoers, travelers, festival attendees, hot people in hot weather, and anyone whose current performance is attracting concern.</p>
              <h3>Dosage and administration</h3>
              <p>Mix one stick pack with 16–24 fl oz of water. Take approximately 30 minutes before physical activity. Maintain eye contact.</p>
            </article>
            <article>
              <h3>Warnings and precautions</h3>
              <p>Do not combine with vague wellness language. Use caution around group chats, finish lines, open bars, and former partners.</p>
              <h3>Drug interactions</h3>
              <p>Longer may interact with poor judgment, direct sunlight, loud music, and the belief that tomorrow is someone else&apos;s problem.</p>
            </article>
            <article>
              <h3>Adverse reactions</h3>
              <p>The most commonly observed reactions were confidence, duration, repeat purchase intent, and friends asking what is in the blue packet.</p>
              <h3>Patient counseling</h3>
              <p>If performance lasts longer than four hours, call your doctor. Then tell your training partner.</p>
            </article>
          </div>
        </div>
        <aside>
          <strong>IMPORTANT</strong>
          <p>For oral hydration only. Not for parenteral use. Not for the emotionally unavailable.</p>
          <span>LNG-PI-001 / REV 07.26</span>
        </aside>
      </section>

      <section className="bold-quote" aria-label="Patient testimonial">
        <p>Patient-reported outcome</p>
        <blockquote>“I lasted through the entire wedding.”</blockquote>
        <cite>— Best man, hydration history unknown</cite>
      </section>

      <section className="bold-enrollment" id="enrollment" aria-labelledby="enrollment-title">
        <div className="bold-enrollment-copy">
          <Wordmark inverse />
          <p>Clinical enrollment now open</p>
          <h2 id="enrollment-title">See if Longer is right for you.</h2>
          <span>Join the first production trial. Side effects may include receiving emails from us.</span>
        </div>
        <WaitlistForm buttonLabel="Request a consultation" source="bold-storefront" />
      </section>

      <footer className="bold-footer">
        <Wordmark />
        <p>Longer is an electrolyte powder. Erectile Dysfunction remains outside our current service area.</p>
        <a href="#top">Return to top ↑</a>
      </footer>
    </main>
  );
}
