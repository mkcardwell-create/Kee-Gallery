import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

async function getHomeData() {
  const essays = await client.fetch(groq`
    *[_type == "essay" && featured == true] | order(_createdAt desc) [0...3] {
      _id, title, slug, category, location, photographer, intro,
      coverImage { asset-> { url } }
    }
  `)
  const keeEdition = await client.fetch(groq`
    *[_type == "keeEdition" && active == true][0] {
      _id, title, month, price, editionSize, editionRemaining,
      camera, film, format, paper,
      image { asset-> { url } }
    }
  `)
  const prints = await client.fetch(groq`
    *[_type == "print" && featured == true] | order(_createdAt desc) [0...6] {
      _id, title, price, editionType, editionSize,
      image { asset-> { url } }
    }
  `)
  return { essays, keeEdition, prints }
}

export default async function Home() {
  const { essays, keeEdition, prints } = await getHomeData()

  return (
    <main style={{ fontFamily: 'Georgia, serif', background: '#e8e3d5', minHeight: '100vh' }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', borderBottom: '1px solid rgba(17,17,8,0.13)', background: '#e8e3d5', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.45rem', fontStyle: 'italic' }}>
          Kee Gallery
          <span style={{ fontFamily: 'monospace', fontStyle: 'normal', fontSize: '0.5rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#9a9a88', display: 'block', marginTop: '4px' }}>Hernando, Mississippi</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Essays', 'Kee Edition', '$1 More', 'Dispatch', 'Artists', 'About', 'Contact'].map(item => (
            <a key={item} href={`/${item.toLowerCase().replace(' ', '-').replace('$1-more', 'drops')}`} style={{ fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', color: '#7a7a68' }}>{item}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: '88vh', borderBottom: '1px solid rgba(17,17,8,0.13)' }}>
        <div style={{ padding: '5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid rgba(17,17,8,0.13)', background: '#f0ebe0' }}>
          <div>
            <p style={{ fontSize: '0.52rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#4e6038', marginBottom: '1.75rem' }}>Ongoing — Mississippi &amp; beyond</p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(3rem,5vw,5rem)', fontWeight: 400, lineHeight: 1.06 }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.28em', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9a9a88', display: 'block', marginBottom: '0.6rem' }}>photographs &amp; stories</span>
              Where the<br /><em style={{ color: '#4e6038' }}>light</em><br />sits still.
            </h1>
          </div>
          <div>
            <p style={{ fontStyle: 'italic', color: '#7a7a68', lineHeight: 2, maxWidth: '360px', borderLeft: '1.5px solid rgba(17,17,8,0.13)', paddingLeft: '1.1rem' }}>
              &ldquo;I shoot what I don&apos;t want to forget — the people, the places, the quiet between things.&rdquo;
            </p>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontStyle: 'italic', marginTop: '1rem' }}>— Kee</p>
            <a href="/essays" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', color: '#111108', marginTop: '1.5rem' }}>
              Browse the essays →
            </a>
          </div>
        </div>
        <div style={{ background: '#1c1c14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'rgba(232,227,213,0.3)', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Photographs load here</p>
        </div>
      </section>

      {/* KEE EDITION */}
      {keeEdition && (
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(17,17,8,0.13)', minHeight: '500px' }}>
          <div style={{ background: '#1c1c14', position: 'relative', overflow: 'hidden' }}>
            {keeEdition.image?.asset?.url && (
              <img src={keeEdition.image.asset.url} alt={keeEdition.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }} />
            )}
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,227,213,0.7)', border: '0.5px solid rgba(232,227,213,0.25)', padding: '4px 10px' }}>
              Kee Edition — {keeEdition.month}
            </div>
          </div>
          <div style={{ padding: '4rem 3rem', background: '#f0ebe0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid rgba(17,17,8,0.13)' }}>
            <div>
              <p style={{ fontSize: '0.5rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#4e6038', marginBottom: '1rem' }}>This month&apos;s Kee Edition</p>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 400, lineHeight: 1.1 }}>{keeEdition.title}</h2>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                {[['Camera', keeEdition.camera], ['Film', keeEdition.film], ['Edition', `${keeEdition.editionSize} prints (${keeEdition.editionRemaining} remaining)`], ['Format', keeEdition.format]].map(([label, value]) => value && (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid rgba(17,17,8,0.13)', fontSize: '0.52rem', color: '#7a7a68' }}>
                    <span>{label}</span><span style={{ fontStyle: 'italic' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontStyle: 'italic' }}>${keeEdition.price}</div>
              <a href="/kee-edition" style={{ display: 'inline-block', marginTop: '1.25rem', fontSize: '0.54rem', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#3a4a2e', color: '#f4f0e4', padding: '0.9rem 1.75rem', textDecoration: 'none' }}>
                View the edition ↗
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ESSAYS */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3rem 3rem 0' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontStyle: 'italic', fontWeight: 400 }}>Featured essays</h2>
          <a href="/essays" style={{ fontSize: '0.54rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7a68', textDecoration: 'none' }}>All essays →</a>
        </div>
        <div style={{ height: '1px', background: 'rgba(17,17,8,0.13)', margin: '1.25rem 3rem 0' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid rgba(17,17,8,0.13)' }}>
          {essays.length > 0 ? essays.map((essay: any) => (
            <a key={essay._id} href={`/essays/${essay.slug.current}`} style={{ borderRight: '1px solid rgba(17,17,8,0.13)', overflow: 'hidden', cursor: 'pointer', background: '#f0ebe0', textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{ height: '260px', overflow: 'hidden', borderBottom: '1px solid rgba(17,17,8,0.13)', background: '#1c1c14' }}>
                {essay.coverImage?.asset?.url && (
                  <img src={essay.coverImage.asset.url} alt={essay.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                )}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '0.48rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#4e6038', marginBottom: '0.55rem' }}>{essay.category} · {essay.location}</p>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.38, marginBottom: '0.5rem' }}>{essay.title}</h3>
                <p style={{ fontStyle: 'italic', fontSize: '0.7rem', color: '#7a7a68', lineHeight: 1.85 }}>{essay.intro}</p>
                <p style={{ fontSize: '0.5rem', letterSpacing: '0.12em', color: '#9a9a88', marginTop: '0.5rem' }}>— {essay.photographer}</p>
              </div>
            </a>
          )) : (
            <div style={{ gridColumn: 'span 3', padding: '4rem 3rem', textAlign: 'center', color: '#9a9a88', fontStyle: 'italic' }}>
              Essays will appear here once added to the CMS.
            </div>
          )}
        </div>
      </section>

      {/* PRINT SHOP */}
      <section style={{ borderBottom: '1px solid rgba(17,17,8,0.13)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3rem 3rem 0' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontStyle: 'italic', fontWeight: 400 }}>Print shop</h2>
          <a href="/prints" style={{ fontSize: '0.54rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7a68', textDecoration: 'none' }}>All prints →</a>
        </div>
        <div style={{ height: '1px', background: 'rgba(17,17,8,0.13)', margin: '1.25rem 3rem 0' }}></div>
        <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {prints.length > 0 ? prints.map((print: any) => (
            <a key={print._id} href={`/prints/${print.slug.current}`} style={{ flex: '0 0 240px', borderRight: '1px solid rgba(17,17,8,0.13)', overflow: 'hidden', cursor: 'pointer', background: '#f0ebe0', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ height: '190px', overflow: 'hidden', borderBottom: '1px solid rgba(17,17,8,0.13)', background: '#1c1c14' }}>
                {print.image?.asset?.url && (
                  <img src={print.image.asset.url} alt={print.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                )}
              </div>
              <div style={{ padding: '1rem 1.1rem' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '3px' }}>{print.title}</p>
                <p style={{ fontSize: '0.52rem', letterSpacing: '0.1em', color: '#7a7a68' }}>{print.price}</p>
                <p style={{ fontSize: '0.48rem', letterSpacing: '0.14em', color: '#4e6038', marginTop: '3px' }}>{print.editionType === 'open' ? 'Open edition' : `Edition of ${print.editionSize}`}</p>
              </div>
            </a>
          )) : (
            <div style={{ padding: '4rem 3rem', color: '#9a9a88', fontStyle: 'italic' }}>
              Prints will appear here once added to the CMS.
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: '2.5rem', background: '#111108' }}>
        <div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontStyle: 'italic', color: '#e8e3d5' }}>Kee Gallery</div>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6a7a58', marginTop: '5px' }}>Hernando, Mississippi</div>
          <p style={{ fontStyle: 'italic', fontSize: '0.66rem', color: 'rgba(232,227,213,0.28)', lineHeight: 2, marginTop: '1rem' }}>&ldquo;Photographs and the stories behind them.&rdquo;</p>
        </div>
        <div>
          <p style={{ fontSize: '0.48rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(232,227,213,0.22)', marginBottom: '1rem' }}>Navigate</p>
          {['Essays', 'Kee Edition', '$1 More', 'Dispatch', 'Artists', 'About'].map(item => (
            <div key={item} style={{ marginBottom: '0.5rem' }}>
              <a href={`/${item.toLowerCase().replace(' ', '-')}`} style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontStyle: 'italic', color: 'rgba(232,227,213,0.5)', textDecoration: 'none' }}>{item}</a>
            </div>
          ))}
        </div>
        <div>
          <p style={{ fontSize: '0.48rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(232,227,213,0.22)', marginBottom: '1rem' }}>Connect</p>
          {['Instagram', 'Newsletter', 'Contact'].map(item => (
            <div key={item} style={{ marginBottom: '0.5rem' }}>
              <a href={`/${item.toLowerCase()}`} style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', fontStyle: 'italic', color: 'rgba(232,227,213,0.5)', textDecoration: 'none' }}>{item}</a>
            </div>
          ))}
        </div>
      </footer>
      <div style={{ padding: '1.25rem 3rem', borderTop: '1px solid rgba(232,227,213,0.06)', display: 'flex', justifyContent: 'space-between', background: '#111108' }}>
        <span style={{ fontSize: '0.48rem', letterSpacing: '0.12em', color: 'rgba(232,227,213,0.2)' }}>© 2025 Kee Gallery. All rights reserved.</span>
        <span style={{ fontSize: '0.48rem', letterSpacing: '0.12em', color: 'rgba(232,227,213,0.2)' }}>Shot on film. Printed with care.</span>
      </div>
    </main>
  )
}