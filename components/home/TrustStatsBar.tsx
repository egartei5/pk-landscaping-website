import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 6, suffix: '+', label: 'Years in Business' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 5, prefix: '★ ', suffix: '.0', label: 'Google Rating' },
  { value: 100, suffix: '%', label: 'Satisfaction Guaranteed' },
]

export default function TrustStatsBar() {
  return (
    <section className="bg-pk-800 border-y border-pk-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-pk-700">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-6">
              <div className="font-heading font-black text-pk-500 text-4xl sm:text-5xl mb-1">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
