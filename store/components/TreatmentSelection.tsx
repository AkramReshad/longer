import { LongerProvider, SectionHeading, TreatmentCard } from '@longer/ds';

const treatments = [
  {
    code: 'LNG-01',
    name: 'Blue Pill',
    status: 'First-line option',
    image: '/concepts/treatment-blue-powder-cutout-v3.png',
    note: 'INITIAL THERAPY'
  },
  {
    code: 'LNG-02',
    name: 'Watermelonafil',
    status: 'Extended release',
    image: '/concepts/treatment-watermelon-red-powder-v4.png',
    note: 'UNDER CLINICAL REVIEW'
  },
  {
    code: 'LNG-03',
    name: 'PED Pineapple',
    status: 'Performance enhancing drink',
    image: '/concepts/treatment-pineapple-yellow-powder-v4.png',
    note: 'UNDER CLINICAL REVIEW'
  }
] as const;

/** Preserved for a later multi-flavor launch. */
export function TreatmentSelection() {
  return (
    <LongerProvider
      className="leaflet-options lngr-tone-white"
      tone="white"
    >
      <SectionHeading
        eyebrow="Treatment selection / Form LNG-RX"
        title="Ask your trainer which option is right for you."
      />
      <div className="leaflet-treatments">
        {treatments.map((treatment, index) => (
          <TreatmentCard
            key={treatment.code}
            code={treatment.code}
            name={treatment.name}
            status={treatment.status}
            image={treatment.image}
            note={treatment.note}
            primary={index === 0}
          />
        ))}
      </div>
    </LongerProvider>
  );
}
