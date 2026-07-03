import { FiCheck, FiX } from 'react-icons/fi';

const rows = [
  { feature: 'Portable grinder + espresso machine', ours: true, theirs: true },
  { feature: 'Full portable coffee kit', ours: true, theirs: false },
  { feature: 'Specialty coffee included', ours: true, theirs: false },
  { feature: 'USB rechargeable devices', ours: true, theirs: false },
  { feature: '30-day money-back guarantee', ours: true, theirs: false },
  { feature: 'Price', ours: 'From $54.90', theirs: '$150+' },
  { feature: 'Free shipping', ours: true, theirs: 'Varies' },
];

const Cell = ({ value, highlight }) => {
  if (value === true) {
    return (
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
          highlight ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-600'
        }`}
      >
        <FiCheck className="text-[13px]" strokeWidth={3} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-400">
        <FiX className="text-[13px]" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className={`text-[13px] font-medium ${highlight ? 'text-white' : 'text-stone-500'}`}>
      {value}
    </span>
  );
};

const Comparison = () => {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            className="text-stone-900 tracking-tight leading-[1.05] mb-5"
            style={{
             
              fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
              fontWeight: 500,
            }}
          >
            Same function.
            <br className="hidden sm:block" /> Without the premium price tag.
          </h2>
          <p className="text-[14px] text-stone-500 max-w-md mx-auto leading-relaxed">
            You don't need to spend $150+ to get great portable coffee.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white border border-stone-200 overflow-hidden">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[2fr_1fr_2fr] items-stretch">
            <div className="px-5 sm:px-6 py-5 flex items-end">
              <span className="text-[10px] tracking-[0.18em] uppercase text-stone-400">
                Feature
              </span>
            </div>

            <div className="px-3 py-5 flex items-center justify-center ">

              <span
                className="text-amber-950 tracking-[0.1em] mt-2"
                style={{ fontSize: '1rem', fontWeight: 500 }}
              >
                Caffeetino
              </span>
            </div>

            <div className="px-3 py-5 flex items-center justify-center">
              <span className="text-[11px] tracking-[0.1em] uppercase text-stone-400 text-center leading-tight">
                Premium branded grinders
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col divide-y divide-stone-100">
            {rows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[2fr_1fr_2fr] items-center ${
                  i % 2 === 1 ? 'bg-stone-50/50' : ''
                }`}
              >
                <div className="px-5 sm:px-6 py-4">
                  <span className="text-[13px] sm:text-[13.5px] text-stone-700 font-medium leading-snug">
                    {row.feature}
                  </span>
                </div>
                <div className=" px-3 py-4 h-full flex items-center justify-center">
                  <Cell value={row.ours} />
                </div>
                <div className="px-3 py-4 flex items-center justify-center">
                  <Cell value={row.theirs} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Comparison;