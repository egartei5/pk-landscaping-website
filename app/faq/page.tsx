'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Link from 'next/link'

const faqs = [
  {
    q: 'What Types of Properties Do You Service?',
    a: 'We specialize in both residential and commercial property care. Our team adapts landscaping strategies based on each site\'s size, layout, and intended function. Whether we\'re restoring curb appeal for a home or maintaining grounds for a business, we implement tailored solutions using our experience across diverse property types. This approach ensures functional beauty that lasts through all seasons.',
  },
  {
    q: 'What Areas Do You Serve?',
    a: 'We provide comprehensive services throughout the Fargo-Moorhead region, including Fargo ND, Moorhead MN, West Fargo ND, Horace ND, Dilworth MN, Casselton ND, Mapleton ND, Kindred ND, Argusville ND, Glyndon MN, Hawley MN, Barnesville MN, Sabin MN, Prosper ND, Prairiewood ND, Reed Township ND, and surrounding communities.',
  },
  {
    q: 'How Long Has Your Company Been Providing Landscaping Services?',
    a: 'Our experience spans over six years, with operations officially launched in 2020. Since then, we\'ve built a dedicated team focused on delivering long-term solutions for outdoor spaces. From lawn mowing to paver installations, our projects reflect consistent methodology backed by hands-on field expertise and client feedback integration.',
  },
  {
    q: 'What Professional Credentials and Qualifications Does Your Team Hold?',
    a: 'As bonded and insured providers, we operate with full compliance under industry safety and service standards. Our team includes trained professionals skilled in equipment operation — such as snow plows and mowing machines — and certified to deliver performance-based outcomes. We ensure every project follows professional landscape services guidelines from start to finish.',
  },
  {
    q: 'How Can I Request an Estimate for My Landscaping or Lawn Care Project?',
    a: 'You can request a free estimate by calling us at (218) 979-1154, filling out our online contact form, or using our online booking system at pklandscapingmn.com/book. During the consultation, we assess site-specific needs and recommend customized service plans that reflect your property\'s condition and desired outcome.',
  },
  {
    q: 'What Warranty Options Are Available for Landscaping or Paver Projects?',
    a: 'Warranty coverage depends on the scope of each job. We evaluate the materials used, project complexity, and environmental exposure before outlining warranty terms. Some paver installations may include extended protection based on structural reinforcement processes implemented by our crew using specialized tools.',
  },
  {
    q: 'What Should I Consider When Planning a New Landscaping Design?',
    a: 'When designing a new landscape, it\'s essential to account for long-term maintenance needs, drainage patterns, sun exposure, and seasonal variations. We recommend balancing hardscape features with plant groupings suited to your soil type and climate conditions. This strategy enhances sustainability while delivering lasting curb appeal.',
  },
  {
    q: 'How Often Should I Schedule Lawn Maintenance to Keep My Yard Healthy?',
    a: 'A consistent schedule supports turf health through seasonal changes. In most cases, weekly or bi-weekly visits maintain optimal growth during peak seasons while preventing buildup of debris or pests in dormant periods. We tailor maintenance frequency based on grass species, irrigation systems, and soil health indicators observed during initial assessments.',
  },
  {
    q: 'What Factors Can Affect the Timeline of a Paver Installation Project?',
    a: 'Paver installation timelines depend on multiple variables: surface preparation depth, terrain leveling needs, material delivery schedules, and weather conditions all play roles. Our approach involves careful staging — from excavation through compaction — to ensure every layer meets durability benchmarks before proceeding to the next phase.',
  },
  {
    q: 'How Should I Prepare My Property for Seasonal Cleanups in Spring or Fall?',
    a: 'To prepare for seasonal cleanups, we recommend clearing access paths around key areas like garden beds or tree bases ahead of scheduled visits. Remove personal items such as furniture or decorations where possible so our team can operate efficiently with leaf blowers or rakes during cleanup procedures tailored to spring recovery or fall leaf removal cycles.',
  },
]

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <div className="bg-pk-900 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h1 className="font-heading font-black text-white text-5xl sm:text-6xl mb-4">
            Landscape Maintenance FAQ
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expert answers from our team — serving the Fargo-Moorhead region with 6+ years of professional outdoor care.
          </p>
        </div>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3 mb-12">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-heading font-bold text-pk-900 text-base pr-4">{faq.q}</span>
                  <ChevronDown size={18} className={`text-pk-500 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-pk-900 rounded-2xl p-8 text-center">
            <h3 className="font-heading font-bold text-white text-2xl mb-2">Still Have Questions?</h3>
            <p className="text-gray-400 mb-6">Call us directly or send a message — we respond within one business day.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+12189791154" className="btn-primary">Call (218) 979-1154</a>
              <Link href="/contact" className="btn-outline">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
