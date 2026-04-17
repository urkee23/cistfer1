import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FAQ as FAQ_DATA } from '@/content/faq'

export default function FAQ() {
  return (
    <section id="faq" style={{
      background: '#fff', padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
            color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
            fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
            Pogosta vprašanja
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: 'var(--dark)', letterSpacing: '-0.8px',
          }}>
            Odgovori na vaša vprašanja
          </h2>
        </div>

        <Accordion multiple={false} className="reveal">
          {FAQ_DATA.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} style={{ borderBottom: '1px solid var(--border-light)' }}>
              <AccordionTrigger style={{
                fontFamily: 'var(--font-heading)', fontWeight: 600,
                color: 'var(--dark)', fontSize: '1rem', textAlign: 'left',
                padding: 'var(--space-xl) 0',
              }}>
                {item.vprasanje}
              </AccordionTrigger>
              <AccordionContent style={{
                fontFamily: 'var(--font-body)', color: 'var(--text-secondary)',
                lineHeight: 1.7, paddingBottom: 'var(--space-xl)',
              }}>
                {item.odgovor}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
