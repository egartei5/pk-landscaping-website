import SectionLabel from '@/components/ui/SectionLabel'

const steps = [
  { num: '01', title: 'Schedule a Consultation', desc: 'Book a no-obligation consultation at a time that works for you — we come to you.' },
  { num: '02', title: 'Discuss Goals & Site', desc: 'We listen first. You tell us the problem; we assess the site conditions and your vision.' },
  { num: '03', title: 'Receive a Written Estimate', desc: 'Clear, itemized pricing with no hidden fees — you know the cost before we start.' },
  { num: '04', title: 'Confirm Scheduling', desc: 'We lock in a start date together and keep you updated as the project approaches.' },
  { num: '05', title: 'Complete Work On-Site', desc: 'Our crew arrives on time, uses proper tools, and cleans up completely when done.' },
  { num: '06', title: 'Follow-Up & Satisfaction', desc: 'We check in after every project to make sure you are completely satisfied.' },
]

export default function ProcessSection() {
  return (
    <section className="bg-pk-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel className="text-pk-500">Our Process</SectionLabel>
          <h2 className="font-heading font-black text-white text-4xl sm:text-5xl mb-4">
            How We Work With You
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Transparent communication drives everything we do. Here is exactly what to expect from first contact to final follow-up.
          </p>
        </div>

        {/* Desktop: horizontal stepper */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-1/2 w-full h-px bg-pk-700" />
              )}
              <div className="relative z-10 w-12 h-12 bg-pk-500 rounded-full flex items-center justify-center font-heading font-black text-white text-sm mb-4 shadow-lg shadow-pk-500/20">
                {step.num}
              </div>
              <h3 className="font-heading font-bold text-white text-sm mb-2">{step.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-pk-500 rounded-full flex items-center justify-center font-heading font-black text-white text-xs shrink-0 shadow-lg">
                  {step.num}
                </div>
                <div className="w-px flex-1 bg-pk-700 mt-2" />
              </div>
              <div className="pb-6">
                <h3 className="font-heading font-bold text-white text-base mb-1">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
