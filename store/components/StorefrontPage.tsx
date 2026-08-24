import Image from 'next/image';
import {
  Button,
  FinePrint,
  LongerProvider,
  Marquee,
  Overline,
  PatientQuote,
  PrescribingInsert,
  PullQuote,
  RxSeal,
  SafetyAlert,
  SectionHeading,
  SpecList,
  StatBlock,
  SymptomChecklist,
  VerticalIndex,
  WaitlistForm,
  Wordmark
} from '@longer/ds';

const symptoms = [
  {
    index: '01',
    title: 'Finishing Early',
    copy: 'Losing stamina before you, your partner, or the occasion is satisfied.'
  },
  {
    index: '02',
    title: 'Difficulty maintaining performance',
    copy: 'Starting strong, then going soft when conditions become demanding.'
  },
  {
    index: '03',
    title: 'Failure to finish',
    copy: 'Plenty of initial enthusiasm. No convincing conclusion.'
  },
  {
    index: '04',
    title: 'Waking up dry',
    copy: 'The morning-after symptom following prolonged... activities.'
  }
] as const;

const dosing = [
  { term: 'Route', value: 'Oral hydration' },
  { term: 'Flavor', value: 'Blue raspberry' },
  { term: 'Onset', value: '30 minutes before physical activity' },
  { term: 'Duration', value: 'Long enough to become someone else’s problem' }
] as const;

const trialData = [
  { figure: '3/4', label: 'Americans suffer from Electrolyte Dysfunction' },
  { figure: '5/4', label: 'Women agree that finishing matters' },
  { figure: '01', label: 'Packet administered before the relationship deteriorated' }
] as const;

const sideEffects = [
  'INCREASED STAMINA',
  'EXTENDED PERFORMANCE',
  'IMPROVED CONFIDENCE',
  'HARDER EFFORTS',
  'ANOTHER ROUND',
  'BETTER FINISHES'
] as const;

const prescribing = [
  {
    term: 'Indications and usage',
    body: 'Longer is indicated for men seeking more stamina, more confidence, and a stronger finish in the bedroom, workouts, nights out, and other forms of physical activity.'
  },
  {
    term: 'Dosage and administration',
    body: 'Mix one stick pack with 16–24 fl oz of water. Take approximately 30 minutes before activity. Maintain eye contact.'
  },
  {
    term: 'Warnings and precautions',
    body: 'Use caution around training partners, romantic partners, open bars, finish lines, and anyone with prior knowledge of your history.'
  },
  {
    term: 'Drug interactions',
    body: 'Longer may interact with poor judgment, direct sunlight, loud music, and the belief that tomorrow is someone else’s problem.'
  },
  {
    term: 'Adverse reactions',
    body: 'The most commonly observed reactions were increased confidence, extended duration, repeat performance, and questions about the blue packet.'
  },
  {
    term: 'Patient counseling',
    body: 'If performance lasts longer than four hours, call your doctor to brag.'
  }
] as const;

export function StorefrontPage() {
  return (
    <LongerProvider className="storefront" tone="paper">
      <a className="leaflet-skip" href="#diagnosis">
        Skip to patient information
      </a>

      <header className="leaflet-header lngr-tone-white">
        <a href="#top" aria-label="Longer home">
          <Wordmark src="/brand/logo/horizontal_blue.svg" />
        </a>
        <FinePrint>Clinical hydration. No prescription required.</FinePrint>
        <Button variant="secondary" href="#enrollment" trailing="+">
          See if Longer is right for you
        </Button>
      </header>

      <section className="leaflet-hero" id="top" aria-labelledby="hero-title">
        <Image
          className="leaflet-hero-scene"
          src="/concepts/longer-hero-wide-v4.png"
          fill
          alt="Longer performance hydration stick packs arranged beside a white clinical plinth"
          sizes="100vw"
          priority
        />
        <div className="leaflet-hero-copy">
          <Overline symbol="Rx">Patient information / Issue 001</Overline>
          <h1 id="hero-title">Are you suffering from ED?</h1>
          <p className="leaflet-hero-body">
            Electrolyte Dysfunction can happen to any man. In the gym. In bed.
            <br />
            Longer is performance-enhancing for harder pumps, longer nights, and better finishes.
          </p>
          <div className="leaflet-hero-actions">
            <Button variant="primary" href="#enrollment">
              See if Longer is right for you
            </Button>
            <Button variant="secondary" href="#diagnosis">
              See how Electrolyte Dysfunction affects you.
            </Button>
          </div>
          <FinePrint className="leaflet-hero-fineprint">
            For sexual, athletic, and social performance. Individual stamina may vary.
          </FinePrint>
        </div>

        <div className="leaflet-hero-product" aria-label="Longer Blue Pill performance hydration">
          <RxSeal caption="For oral hydration only" />
        </div>

        <VerticalIndex
          className="leaflet-hero-index"
          items={['LONGER / LNG-01', 'BLUE RASPBERRY', 'CLINICAL TRIAL PENDING']}
        />
      </section>

      <SafetyAlert
        label="Important safety information"
        statement="If performance lasts longer than four hours, call your doctor."
        note="Scroll for full prescribing information"
      />

      <section
        className="leaflet-diagnosis lngr-tone-deep"
        id="diagnosis"
        aria-labelledby="diagnosis-title"
      >
        <SectionHeading
          eyebrow="Self-assessment / Form ED-04"
          title={<span id="diagnosis-title">Is Electrolyte Dysfunction affecting you?</span>}
          note="Check all that apply."
        />
        <SymptomChecklist items={symptoms} />
        <footer>
          <p>If one or more symptoms sound familiar, its time to Last Longer.</p>
          <a href="#treatment">Review treatment options ↓</a>
        </footer>
      </section>

      <section
        className="leaflet-product lngr-tone-blue"
        id="treatment"
        aria-labelledby="product-title"
      >
        <div className="leaflet-product-copy">
          <Overline>Introducing LNG-01</Overline>
          <h2 id="product-title">
            Blue
            <br />
            Pill.
          </h2>
          <p className="leaflet-product-lede">Performance matters.</p>
          <p className="leaflet-product-support">Be Harder. Last Longer. Stay Hydrated.</p>
          <SpecList items={dosing} />
        </div>
        <div className="leaflet-product-stage">
          <Image
            src="/concepts/pharma-product-stage-longer-v3.png"
            fill
            alt="Longer Blue Pill box and stick pack on a clinical laboratory stage"
            sizes="(max-width: 980px) 100vw, 65vw"
          />
          <p>Individual performance may vary.</p>
        </div>
        <VerticalIndex
          inverse
          items={['PRESCRIPTION HYDRATION / LONGER / BLUE PILL / LNG-01']}
        />
      </section>

      <section className="leaflet-study" aria-labelledby="study-title">
        <Image
          src="/concepts/performance-runner-longer.png"
          fill
          alt="Runner pushing through a race at night"
          sizes="100vw"
        />
        <div className="leaflet-study-scrim" aria-hidden="true" />
        <div className="leaflet-study-copy">
          <h2 id="study-title">When the moment comes, how long will you last?</h2>
          <PullQuote
            quote="My wife used to laugh, now she's the one tapping out"
            cite="— Flacyd Johnson, cohort"
          />
        </div>
        <StatBlock items={trialData} />
      </section>

      <section className="leaflet-effects lngr-tone-paper" aria-labelledby="effects-title">
        <SectionHeading
          tone="danger"
          eyebrow="Adverse reactions"
          title={<span id="effects-title">Possible side effects include:</span>}
        />
        <Marquee items={sideEffects} />
        <div className="leaflet-effects-notes">
          <p>
            Rare reactions may include renewed interest from former partners, winning fatigue,
            being catcalled.
          </p>
          <p>Discontinue use if confidence becomes medically significant.</p>
        </div>
      </section>

      <PrescribingInsert
        title="Longer™"
        deck="For men experiencing a lack of performance."
        sections={prescribing}
        notice="For oral hydration only. Not for parenteral use. Not for the emotionally unavailable."
        code="LNG-PI-001 / REV 07.26"
      />

      <PatientQuote
        className="leaflet-quote lngr-tone-white"
        label="Patient-reported outcome"
        quote="“The maid of honor, two bridesmaids, and a waitress. All thanks to Longer.”"
        attribution="— Best man, hydration history unknown"
      />

      <section
        className="leaflet-enrollment lngr-tone-blue"
        id="enrollment"
        aria-labelledby="enrollment-title"
      >
        <div className="leaflet-enrollment-copy">
          <SectionHeading
            stacked
            eyebrow="Clinical enrollment now open"
            title={<span id="enrollment-title">See if Longer is right for you.</span>}
          />
          <p>
            Join the first Longer Electrolyte Dysfunction trial. Cohort 001 is limited to 500
            participants. Participation begins with your email address.
          </p>
        </div>
        <WaitlistForm buttonLabel="Improve my performance" source="bold-storefront" />
      </section>

      <footer className="leaflet-footer lngr-tone-white">
        <Wordmark className="leaflet-footer-mark" src="/brand/logo/horizontal_blue.svg" />
        <FinePrint centered>
          This statement has not been evaluated by the Food and Drug Administration. This product
          is not intended to diagnose, treat, cure, or prevent any disease.
        </FinePrint>
        <a href="#top">Return to top ↑</a>
      </footer>
    </LongerProvider>
  );
}
