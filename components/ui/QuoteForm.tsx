'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle } from 'lucide-react'
import WhatsAppHandoff from './WhatsAppHandoff'
import { buildQuoteWhatsAppUrl } from '@/lib/whatsapp'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().optional(),
  email: z.string().email('Valid email required'),
  service: z.string().optional(),
  location: z.string().optional(),
  message: z.string().min(5, 'Please describe your project'),
})

type FormData = z.infer<typeof schema>

const serviceOptions = [
  'Snow Removal', 'Road Paving', 'Paver Installation', 'Lawn Mowing',
  'Tree Services', 'Brick Lane Construction', 'Gutter Cleaning', 'Seasonal Cleanup', 'Other',
]

const locationOptions = [
  'Fargo, ND', 'Moorhead, MN', 'West Fargo, ND', 'Horace, ND',
  'Dilworth, MN', 'Casselton, ND', 'Mapleton, ND', 'Other Area',
]

interface QuoteFormProps {
  dark?: boolean
}

export default function QuoteForm({ dark = false }: QuoteFormProps) {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const inputClass = `w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors border ${
    dark
      ? 'bg-pk-900 border-pk-700 text-white placeholder-gray-500 focus:border-pk-500'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-pk-500'
  }`

  const labelClass = `block text-xs font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`

  async function onSubmit(data: FormData) {
    setError('')
    try {
      const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error('Failed')
      setSubmittedData(data)
    } catch {
      setError('Something went wrong. Please call us at (218) 979-1154.')
    }
  }

  if (submittedData) {
    const whatsappUrl = buildQuoteWhatsAppUrl(submittedData)
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
        <CheckCircle size={48} className="text-pk-500" />
        <h3 className={`font-heading font-bold text-xl ${dark ? 'text-white' : 'text-gray-900'}`}>Request Received!</h3>
        <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>We&apos;ll get back to you within one business day.</p>
        <WhatsAppHandoff href={whatsappUrl} />
        <p className="text-xs text-gray-500">WhatsApp will open with your request ready to review and send.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input {...register('name')} placeholder="Your full name" className={inputClass} />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input {...register('phone')} placeholder="(218) 000-0000" className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Email *</label>
          <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Your Location</label>
          <select {...register('location')} className={inputClass}>
            <option value="">Select city...</option>
            {locationOptions.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Service Interested In</label>
        <select {...register('service')} className={inputClass}>
          <option value="">Select a service...</option>
          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClass}>Message *</label>
        <textarea {...register('message')} rows={4} placeholder="Describe your project or ask a question..." className={inputClass} />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
        <Send size={16} />
        {isSubmitting ? 'Sending...' : 'Send Request'}
      </button>
    </form>
  )
}
