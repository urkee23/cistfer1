import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Lokalne slike iz /public delujejo brez konfiguracije.
    // Dodaj domene sem ko boš uporabljal externe AI-generirane slike:
    remotePatterns: [
      // { hostname: 'example.com' },
    ],
  },
}

export default nextConfig
