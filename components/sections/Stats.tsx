const STATS = [
  { value: '50+', label: 'Projektov' },
  { value: '4', label: 'Let izkušenj' },
  { value: '75%', label: 'Povrnjenega videza ' },
  { value: '24h', label: 'Odzivni čas' },
]

export default function Stats() {
  return (
    <section className="w-full bg-white border-b border-[#404751]">
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-12 px-6 flex flex-col items-center justify-center border-[#404751]/20
              ${i < 3 ? 'border-r' : ''}
              ${i < 2 ? 'border-b lg:border-b-0' : ''}
            `}
          >
            <span className="text-[48px] font-black text-black leading-none mb-2">{stat.value}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#404751]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
