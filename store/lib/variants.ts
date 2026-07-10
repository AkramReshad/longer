export type VariantSlug = 'clinical' | 'performance' | 'pharma';

export type Flavor = {
  readonly name: string;
  readonly descriptor: string;
  readonly dose: string;
};

export type BentoCard = {
  readonly title: string;
  readonly copy: string;
  readonly span: 'wide' | 'tall' | 'standard';
  readonly image?: string;
};

export type UseCase = {
  readonly title: string;
  readonly copy: string;
  readonly image: string;
};

export type PageVariant = {
  readonly slug: VariantSlug;
  readonly themeClass: string;
  readonly shortName: string;
  readonly pickerTitle: string;
  readonly pickerCopy: string;
  readonly eyebrow: string;
  readonly heroLineOne: string;
  readonly heroLineTwo: string;
  readonly heroCopy: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly heroImage: string;
  readonly inlineImage: string;
  readonly proofLine: string;
  readonly bentoTitle: string;
  readonly bentoCopy: string;
  readonly bentoCards: readonly BentoCard[];
  readonly productTitle: string;
  readonly productCopy: string;
  readonly flavors: readonly Flavor[];
  readonly useCaseTitle: string;
  readonly useCases: readonly UseCase[];
  readonly testimonial: string;
  readonly testimonialSource: string;
  readonly finalHeadline: string;
  readonly finalCopy: string;
};

const sharedFlavors: readonly Flavor[] = [
  {
    name: 'Blue Pill',
    descriptor: 'Blue raspberry electrolyte powder',
    dose: '490mg sodium / 350mg potassium / 120mg magnesium'
  },
  {
    name: 'Watermelonafil',
    descriptor: 'For moments when sustained output matters',
    dose: 'Take one packet 30 minutes before physical activity'
  },
  {
    name: 'PED Pineapple',
    descriptor: 'Performance Enhancing Drink',
    dose: 'No sugar. Serious minerals. Questionable bedside manner.'
  }
];

export const variants: readonly PageVariant[] = [
  {
    slug: 'clinical',
    themeClass: 'theme-clinical',
    shortName: 'Clinical',
    pickerTitle: 'White coat product trust',
    pickerCopy: 'The cleanest DTC version: clinical white, blue authority, deadpan dosage language.',
    eyebrow: 'Electrolyte Dysfunction presents as fatigue, cramps, regret, and premature quitting.',
    heroLineOne: 'Are you suffering from ED?',
    heroLineTwo: 'Electrolyte Dysfunction.',
    heroCopy:
      'Longer is a legitimate electrolyte powder wearing the deeply serious skin of pharmaceutical advertising.',
    primaryCta: 'Join the waitlist',
    secondaryCta: 'Review dosing',
    heroImage: 'https://picsum.photos/seed/longer-clinical-packet/1800/1100',
    inlineImage: 'https://picsum.photos/seed/longer-blue-macro/480/240',
    proofLine: 'Blue Pill is the hero dose. Watermelonafil and PED Pineapple are under review.',
    bentoTitle: 'A real formula with a fake bedside manner.',
    bentoCopy:
      'The joke earns the click. Sodium, potassium, and magnesium have to earn the second box.',
    bentoCards: [
      {
        title: 'Clinical enough to trust',
        copy: 'White-label seriousness, pharmaceutical typography, and a mineral profile modeled for actual use.',
        span: 'wide',
        image: 'https://picsum.photos/seed/clinical-white-longer/900/620'
      },
      {
        title: 'Take one packet by mouth',
        copy: 'Thirty minutes before physical activity. Or before whatever you are calling physical activity.',
        span: 'tall'
      },
      {
        title: 'No bro-supplement screaming',
        copy: 'No alpha fonts. No lightning bolt tubs. No neon gym wall.',
        span: 'standard'
      },
      {
        title: 'The disclaimer is the distribution',
        copy: 'If you are going longer than four hours, consult your training partner.',
        span: 'standard'
      }
    ],
    productTitle: 'Blue Pill leads the trial.',
    productCopy:
      'Three launch flavors. One clinical visual system. Enough innuendo to travel without becoming a novelty product.',
    flavors: sharedFlavors,
    useCaseTitle: 'Indicated for the situations that break people.',
    useCases: [
      {
        title: 'Mile 20',
        copy: 'For the part of the race where the body starts negotiating with management.',
        image: 'https://picsum.photos/seed/mile-twenty-blue/900/1100'
      },
      {
        title: 'Pregame',
        copy: 'For extended social activity with questionable hydration history.',
        image: 'https://picsum.photos/seed/bar-clinical-blue/900/1100'
      },
      {
        title: 'Heat exposure',
        copy: 'When the sun starts practicing medicine without a license.',
        image: 'https://picsum.photos/seed/desert-clinical-blue/900/1100'
      }
    ],
    testimonial:
      'It looks like something I should ask a doctor about. That is exactly why I would buy it.',
    testimonialSource: 'Early retail read',
    finalHeadline: 'Ask your trainer if Blue Pill is right for you.',
    finalCopy:
      'Join the waitlist for launch updates, flavor trials, and the first production run.'
  },
  {
    slug: 'performance',
    themeClass: 'theme-performance',
    shortName: 'Performance',
    pickerTitle: 'Cinematic TikTok conversion',
    pickerCopy: 'The film-trailer version: darker, faster, built around the launch video energy.',
    eyebrow: 'When the moment comes, the question is simple.',
    heroLineOne: 'Will you be ready',
    heroLineTwo: 'to go Longer?',
    heroCopy:
      'A serious electrolyte dose for races, nights out, long days, heat, and other conditions of exertion.',
    primaryCta: 'Get notified',
    secondaryCta: 'See warnings',
    heroImage: 'https://picsum.photos/seed/longer-night-runner/1800/1100',
    inlineImage: 'https://picsum.photos/seed/longer-festival-blue/480/240',
    proofLine: 'For mile 20, last call, hot sidewalks, and morning consequences.',
    bentoTitle: 'Performance anxiety, but make it electrolytes.',
    bentoCopy:
      'The page sells the occasion first: pressure, depletion, timing, and the packet you reach for before things get soft.',
    bentoCards: [
      {
        title: 'Hook in one second',
        copy: 'The visual reads like a pharmaceutical ad before the punchline arrives.',
        span: 'wide',
        image: 'https://picsum.photos/seed/cinematic-run-blue/900/620'
      },
      {
        title: 'Built for TikTok traffic',
        copy: 'Big first read, immediate waitlist action, no catalog maze.',
        span: 'standard'
      },
      {
        title: 'Occasion-led',
        copy: 'Race, bar, heat, gym, festival, long shift. The joke always lands on a real use case.',
        span: 'tall'
      },
      {
        title: 'Not currently evaluated by your group chat',
        copy: 'But comments asking where to buy it will be treated as a positive signal.',
        span: 'standard'
      }
    ],
    productTitle: 'Take before the situation takes from you.',
    productCopy:
      'This route turns Longer into a physical-performance object: darker contrast, stronger image crops, and more urgency.',
    flavors: sharedFlavors,
    useCaseTitle: 'Moments when performance becomes observable.',
    useCases: [
      {
        title: 'The long run',
        copy: 'When confidence leaves the body through sweat.',
        image: 'https://picsum.photos/seed/night-race-longer/900/1100'
      },
      {
        title: 'The long night',
        copy: 'When sparkling water is no longer an adequate plan.',
        image: 'https://picsum.photos/seed/blue-night-party/900/1100'
      },
      {
        title: 'The long day',
        copy: 'When ordinary hydration fails to achieve duration.',
        image: 'https://picsum.photos/seed/workday-blue-longer/900/1100'
      }
    ],
    testimonial:
      'The bit gets attention. The use cases make it feel like something people would actually keep around.',
    testimonialSource: 'Validation note',
    finalHeadline: 'Do not wait until symptoms become visible.',
    finalCopy:
      'Get the launch notice before Blue Pill enters public circulation.'
  },
  {
    slug: 'pharma',
    themeClass: 'theme-pharma',
    shortName: 'Pharma',
    pickerTitle: 'The hard-bit brand page',
    pickerCopy: 'Maximum commitment: insert language, product tiles, and fake regulatory gravity.',
    eyebrow: 'This information is intended for people experiencing intermittent electrolyte performance issues.',
    heroLineOne: 'Electrolyte Dysfunction',
    heroLineTwo: 'requires attention.',
    heroCopy:
      'Longer delivers sodium, potassium, and magnesium in packets designed for suspiciously serious physical moments.',
    primaryCta: 'Join clinical waitlist',
    secondaryCta: 'Read product insert',
    heroImage: 'https://picsum.photos/seed/pharma-paper-blue/1800/1100',
    inlineImage: 'https://picsum.photos/seed/prescription-blue-macro/480/240',
    proofLine: 'Blue Pill. Watermelonafil. PED Pineapple. Available when the trial concludes.',
    bentoTitle: 'Every packet includes minerals and plausible concern.',
    bentoCopy:
      'The strongest version for brand memory: product-first, insert-heavy, and completely straight-faced.',
    bentoCards: [
      {
        title: 'Active ingredients',
        copy: 'Sodium complex, potassium citrate, magnesium glycinate, and a legally survivable sense of humor.',
        span: 'wide',
        image: 'https://picsum.photos/seed/pharma-insert-grid/900/620'
      },
      {
        title: 'Dosage',
        copy: 'Take one packet 30 minutes before physical activity.',
        span: 'standard'
      },
      {
        title: 'Contraindications',
        copy: 'Do not use if you are seeking a vague wellness brand.',
        span: 'standard'
      },
      {
        title: 'Adverse reactions',
        copy: 'May cause unsolicited comments, screenshotting, and asking where to buy.',
        span: 'tall'
      }
    ],
    productTitle: 'The launch set looks prescribed.',
    productCopy:
      'This page treats flavor selection like a clinical decision. That is the whole advantage.',
    flavors: sharedFlavors,
    useCaseTitle: 'Approved by nobody. Understood immediately.',
    useCases: [
      {
        title: 'Packet trial',
        copy: 'A clean box, a single blue mark, and no confession that any of this is a joke.',
        image: 'https://picsum.photos/seed/pharma-box-blue/900/1100'
      },
      {
        title: 'Use-case insert',
        copy: 'A readable bridge from satire to running, heat, cramps, parties, and long days.',
        image: 'https://picsum.photos/seed/medical-insert-blue/900/1100'
      },
      {
        title: 'Retail memory',
        copy: 'The shelf read is immediate: pharmaceutical ad language with powder inside.',
        image: 'https://picsum.photos/seed/retail-white-blue/900/1100'
      }
    ],
    testimonial:
      'This is the version that makes the brand feel real enough to manufacture and illegal enough to remember.',
    testimonialSource: 'Internal positioning',
    finalHeadline: 'For moments when performance matters.',
    finalCopy:
      'Enter the waitlist. Consult your training partner if anticipation lasts longer than four hours.'
  }
] as const;

export function getVariant(slug: VariantSlug): PageVariant {
  const variant = variants.find((candidate) => candidate.slug === slug);

  if (variant === undefined) {
    throw new Error(`Unknown Longer page variant: ${slug}`);
  }

  return variant;
}
