import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'PK Landscaping Service — Fargo, ND'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a1a0b 0%, #0f2910 50%, #1a3d1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Green accent bar */}
        <div style={{ width: 60, height: 6, background: '#4caf50', borderRadius: 3, marginBottom: 32 }} />

        <div style={{ fontSize: 16, color: '#4caf50', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
          PK Landscaping Service
        </div>

        <div style={{ fontSize: 64, fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: 24, maxWidth: 800 }}>
          Professional Landscaping in Fargo, ND
        </div>

        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.65)', marginBottom: 48, maxWidth: 700 }}>
          Snow removal · Road paving · Lawn care · Tree services · And more
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: '#4caf50', borderRadius: 12, padding: '12px 28px', fontSize: 18, fontWeight: 700, color: '#fff' }}>
            Get a Free Quote
          </div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
            pklandscapingmn.com
          </div>
        </div>

        {/* Stars */}
        <div style={{ position: 'absolute', bottom: 60, right: 80, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <div style={{ fontSize: 32, color: '#fbbf24', letterSpacing: 4 }}>★★★★★</div>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>5.0 · 500+ Happy Customers</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
