import Image from 'next/image';

const treatments = [
  {
    code: 'LNG-01',
    name: 'Blue Pill',
    status: 'First-line option',
    image: '/concepts/treatment-blue-powder-cutout-v3.png'
  },
  {
    code: 'LNG-02',
    name: 'Watermelonafil',
    status: 'Extended release',
    image: '/concepts/treatment-watermelon-red-powder-v4.png'
  },
  {
    code: 'LNG-03',
    name: 'PED Pineapple',
    status: 'Performance enhancing drink',
    image: '/concepts/treatment-pineapple-yellow-powder-v4.png'
  }
] as const;

/** Preserved for a later multi-flavor launch. */
export function TreatmentSelection() {
  return (
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
            <Image src={treatment.image} width={420} height={315} alt={treatment.name} />
            <h3>{treatment.name}</h3>
            <small>{index === 0 ? 'INITIAL THERAPY' : 'UNDER CLINICAL REVIEW'}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
