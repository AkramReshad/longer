import Image from 'next/image';
import { WaitlistForm } from '@/components/WaitlistForm';

const symptoms = [
  ['01', 'Finishing Early', 'Losing stamina before you, your partner, or the occasion is satisfied.'],
  ['02', 'Difficulty maintaining performance', 'Starting strong, then going soft when conditions become demanding.'],
  ['03', 'Failure to finish', 'Plenty of initial enthusiasm. No convincing conclusion.'],
  ['04', 'Waking up dry', 'The morning-after symptom following prolonged... activities.']
] as const;

function Wordmark({ inverse = false }: { readonly inverse?: boolean }) {
  return (
    <span className={`bold-wordmark${inverse ? ' bold-wordmark-inverse' : ''}`} aria-label="Longer — Electrolyte Dysfunction">
      <Image src="/logos/longer-horizontal-lockup.svg?v=3" width={1080} height={244} alt="" priority />
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
        <p>Clinical hydration. No prescription required.</p>
        <a href="#enrollment">See if Longer is right for you <span>+</span></a>
      </header>

      <section className="bold-hero" aria-labelledby="bold-hero-title">
        <Image
          className="bold-hero-scene"
          src="/concepts/longer-hero-wide-v4.png"
          fill
          alt="Longer performance hydration stick packs arranged beside a white clinical plinth"
          sizes="100vw"
          priority
        />
        <div className="bold-hero-copy">
          <p className="bold-overline"><span>Rx</span> Patient information / Issue 001</p>
          <h1 id="bold-hero-title">Are you suffering from ED?</h1>
          <p className="bold-hero-body">
            Electrolyte Dysfunction can happen to any man. In the gym. In bed.<br />
            Longer is performance-enhancing for harder pumps, longer nights, and better finishes.
          </p>
          <div className="bold-hero-actions">
            <a href="#enrollment">See if Longer is right for you</a>
            <a href="#diagnosis">See how Electrolyte Dysfunction affects you.</a>
          </div>
          <p className="bold-hero-fineprint">
            For sexual, athletic, and social performance. Individual stamina may vary.
          </p>
        </div>

        <div className="bold-hero-product" aria-label="Longer Blue Pill performance hydration">
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
          <h2 id="diagnosis-title">Is Electrolyte Dysfunction affecting you?</h2>
          <span>Check all that apply.</span>
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
          <p>If one or more symptoms sound familiar, its time to Last Longer.</p>
          <a href="#treatment">Review treatment options ↓</a>
        </footer>
      </section>

      <section className="bold-blue-pill" id="treatment" aria-labelledby="blue-pill-title">
        <div className="bold-blue-copy">
          <p>Introducing LNG-01</p>
          <h2 id="blue-pill-title">Blue<br />Pill.</h2>
          <p className="bold-blue-lede">Performance matters.</p>
          <p className="bold-blue-support">Be Harder. Last Longer. Stay Hydrated.</p>
          <dl>
            <div><dt>Route</dt><dd>Oral hydration</dd></div>
            <div><dt>Flavor</dt><dd>Blue raspberry</dd></div>
            <div><dt>Onset</dt><dd>30 minutes before physical activity</dd></div>
            <div><dt>Duration</dt><dd>Long enough to become someone else&apos;s problem</dd></div>
          </dl>
        </div>
        <div className="bold-blue-product">
          <Image
            src="/concepts/pharma-product-stage-longer-v3.png"
            fill
            alt="Longer Blue Pill box and stick pack on a clinical laboratory stage"
            sizes="(max-width: 980px) 100vw, 65vw"
          />
          <p>Individual performance may vary.</p>
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
          <h2 id="study-title">When the moment comes, how long will you last?</h2>
          <blockquote>
            “My wife used to laugh, now she&apos;s the one tapping out”
            <cite>— Flacyd Johnson, cohort</cite>
          </blockquote>
        </div>
        <div className="bold-study-data">
          <div><strong>3/4</strong><span>Americans suffer from Electrolyte Dysfunction</span></div>
          <div><strong>5/4</strong><span>Women agree that finishing matters</span></div>
          <div><strong>01</strong><span>Packet administered before the relationship deteriorated</span></div>
        </div>
      </section>

      <section className="bold-effects" aria-labelledby="effects-title">
        <div className="bold-effects-title">
          <p>Adverse reactions</p>
          <h2 id="effects-title">Possible side effects include:</h2>
        </div>
        <div className="bold-effects-marquee" aria-hidden="true">
          <span>INCREASED STAMINA</span><i>•</i><span>EXTENDED PERFORMANCE</span><i>•</i><span>IMPROVED CONFIDENCE</span><i>•</i>
          <span>HARDER EFFORTS</span><i>•</i><span>ANOTHER ROUND</span><i>•</i><span>BETTER FINISHES</span><i>•</i>
        </div>
        <div className="bold-effects-notes">
          <p>Rare reactions may include renewed interest from former partners, winning fatigue, being catcalled.</p>
          <p>Discontinue use if confidence becomes medically significant.</p>
        </div>
      </section>

      <section className="bold-insert" aria-labelledby="insert-title">
        <div className="bold-insert-spine">FULL PRESCRIBING INFORMATION</div>
        <div className="bold-insert-main">
          <div className="bold-insert-rx">Rx</div>
          <h2 id="insert-title">Longer™</h2>
          <p className="bold-insert-deck">For men experiencing a lack of performance.</p>
          <div className="bold-insert-columns">
            <article>
              <h3>Indications and usage</h3>
              <p>Longer is indicated for men seeking more stamina, more confidence, and a stronger finish in the bedroom, workouts, nights out, and other forms of physical activity.</p>
              <h3>Dosage and administration</h3>
              <p>Mix one stick pack with 16–24 fl oz of water. Take approximately 30 minutes before activity. Maintain eye contact.</p>
            </article>
            <article>
              <h3>Warnings and precautions</h3>
              <p>Use caution around training partners, romantic partners, open bars, finish lines, and anyone with prior knowledge of your history.</p>
              <h3>Drug interactions</h3>
              <p>Longer may interact with poor judgment, direct sunlight, loud music, and the belief that tomorrow is someone else&apos;s problem.</p>
            </article>
            <article>
              <h3>Adverse reactions</h3>
              <p>The most commonly observed reactions were increased confidence, extended duration, repeat performance, and questions about the blue packet.</p>
              <h3>Patient counseling</h3>
              <p>If performance lasts longer than four hours, call your doctor to brag.</p>
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
        <blockquote>“The maid of honor, two bridesmaids, and a waitress. All thanks to Longer.”</blockquote>
        <cite>— Best man, hydration history unknown</cite>
      </section>

      <section className="bold-enrollment" id="enrollment" aria-labelledby="enrollment-title">
        <div className="bold-enrollment-copy">
          <p>Clinical enrollment now open</p>
          <h2 id="enrollment-title">See if Longer is right for you.</h2>
          <span>Join the first Longer Electrolyte Dysfunction trial. Cohort 001 is limited to 500 participants. Participation begins with your email address.</span>
        </div>
        <WaitlistForm buttonLabel="Improve my performance" source="bold-storefront" />
      </section>

      <footer className="bold-footer">
        <Wordmark />
        <p>This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
        <a href="#top">Return to top ↑</a>
      </footer>
    </main>
  );
}
