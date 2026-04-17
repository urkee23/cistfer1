import Image from 'next/image'

export default function ZaupajoNam() {
  const LOGOTIPI = [
    { name: 'Arctur', src: '/slike/logotipi/arctur.png' },
    { name: 'Gitri', src: '/slike/logotipi/gitri.png' },
    { name: 'Glasbena šola', src: '/slike/logotipi/glasbena.png' },
    { name: 'Komunala', src: '/slike/logotipi/komunala.png' },
    { name: 'Magmax', src: '/slike/logotipi/magmax.png' },
    { name: 'Mango', src: '/slike/logotipi/mango.png' },
    { name: 'Nova Gorica', src: '/slike/logotipi/nova-gorica.png' },
    { name: 'Pinss', src: '/slike/logotipi/pinss.png' },
    { name: 'Zavod', src: '/slike/logotipi/zavod.png' },
    { name: 'Zogica', src: '/slike/logotipi/zogica.png' },
  ]

  return (
    <section style={{
      padding: 'var(--space-2xl) 0',
      background: 'white', // Boljše za barvne logotipe
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      overflow: 'hidden',
    }}>
      <p style={{
        textAlign: 'center', marginBottom: 'var(--space-xl)',
        fontFamily: 'var(--font-body)', fontWeight: 700,
        fontSize: '0.8rem', color: 'var(--text-muted)',
        textTransform: 'uppercase', letterSpacing: '0.12em',
      }}>
        Zaupajo nam
      </p>
      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-3xl)', 
        animation: 'marquee 30s linear infinite', 
        width: 'max-content',
        alignItems: 'center'
      }}>
        {[...LOGOTIPI, ...LOGOTIPI].map((logo, i) => (
          <div key={logo.name + i} style={{
            position: 'relative',
            width: '120px',
            height: '60px',
            padding: '0 var(--space-xl)',
            flexShrink: 0,
            filter: 'grayscale(100%) opacity(0.6)',
            transition: 'filter var(--ease)',
          }}
          className="logo-hover"
          >
            <Image 
              src={logo.src} 
              alt={logo.name} 
              fill 
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .logo-hover:hover {
          filter: grayscale(0%) opacity(1) !important;
        }
      `}</style>
    </section>
  )
}

