'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Calendar, Wrench, User } from 'lucide-react'

const TIME_SLOTS = [
  '7:00 AM – 9:00 AM',
  '9:00 AM – 11:00 AM',
  '11:00 AM – 1:00 PM',
  '1:00 PM – 3:00 PM',
  '3:00 PM – 5:00 PM',
  '5:00 PM – 7:00 PM',
]

const SERVICES = [
  'Lawn Mowing', 'Snow Removal', 'Paver Installation', 'Road Paving',
  'Tree Services', 'Gutter Cleaning', 'Seasonal Cleanup', 'Brick Lane Construction', 'Other',
]

const LOCATIONS = [
  'Fargo, ND', 'Moorhead, MN', 'West Fargo, ND', 'Horace, ND',
  'Dilworth, MN', 'Casselton, ND', 'Mapleton, ND', 'Other Area',
]

function toYMD(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatDisplayDate(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BookingForm() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [step, setStep] = useState(1)
  const [service, setService] = useState('')
  const [calMonth, setCalMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', location: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!selectedDate) return
    setLoadingSlots(true)
    setSelectedSlot('')
    fetch(`/api/bookings?date=${selectedDate}`)
      .then((r) => r.json())
      .then((d) => setBookedSlots(d.bookedSlots ?? []))
      .finally(() => setLoadingSlots(false))
  }, [selectedDate])

  function buildCalendar() {
    const year = calMonth.getFullYear()
    const month = calMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: (Date | null)[] = Array(firstDay).fill(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }

  function isDayDisabled(d: Date) {
    if (d < today) return true
    if (d.getDay() === 0) return true // Sunday
    return false
  }

  async function handleSubmit() {
    if (!form.name || !form.email) { setError('Name and email are required.'); return }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service, date: selectedDate, timeSlot: selectedSlot }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed to submit.'); return }
      setDone(true)
    } catch {
      setError('Something went wrong. Please call (218) 979-1154.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="bg-pk-900 border border-pk-700 rounded-3xl p-12 text-center max-w-lg mx-auto">
        <CheckCircle size={56} className="text-pk-500 mx-auto mb-4" />
        <h2 className="font-heading font-black text-white text-2xl mb-2">Booking Request Sent!</h2>
        <p className="text-gray-400 mb-4">We&apos;ll review your request and send you a confirmation email within a few hours.</p>
        <div className="bg-pk-800 rounded-xl p-4 text-left space-y-1 text-sm mb-6">
          <p className="text-gray-400"><span className="text-white font-semibold">Service:</span> {service}</p>
          <p className="text-gray-400"><span className="text-white font-semibold">Date:</span> {formatDisplayDate(selectedDate)}</p>
          <p className="text-gray-400"><span className="text-white font-semibold">Time:</span> {selectedSlot}</p>
        </div>
        <p className="text-gray-500 text-sm">Questions? Call <a href="tel:+12189791154" className="text-pk-400 font-semibold">(218) 979-1154</a></p>
      </div>
    )
  }

  const stepLabel = ['Service', 'Date', 'Time Slot', 'Your Info']
  const stepIcon = [Wrench, Calendar, Clock, User]

  const cells = buildCalendar()

  return (
    <div className="bg-pk-900 border border-pk-700 rounded-3xl overflow-hidden">
      {/* Step indicator */}
      <div className="flex border-b border-pk-700">
        {stepLabel.map((label, i) => {
          const Icon = stepIcon[i]
          const num = i + 1
          const active = step === num
          const done = step > num
          return (
            <button
              key={label}
              onClick={() => { if (done || (num === 2 && service) || (num === 3 && selectedDate) || (num === 4 && selectedSlot)) setStep(num) }}
              className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-4 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
                active ? 'border-pk-500 text-pk-400 bg-pk-500/10'
                : done ? 'border-pk-700 text-gray-400 hover:text-gray-300 cursor-pointer'
                : 'border-transparent text-gray-600 cursor-default'
              }`}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          )
        })}
      </div>

      <div className="p-6 sm:p-8">
        {/* Step 1: Service */}
        {step === 1 && (
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-5">What service do you need?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {SERVICES.map((s) => (
                <button
                  key={s}
                  onClick={() => setService(s)}
                  className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${
                    service === s
                      ? 'bg-pk-500/20 border-pk-500 text-white'
                      : 'bg-pk-800 border-pk-700 text-gray-400 hover:border-pk-600 hover:text-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!service}
              className="btn-primary w-full disabled:opacity-40"
            >
              Next: Pick a Date →
            </button>
          </div>
        )}

        {/* Step 2: Date */}
        {step === 2 && (
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-5">Choose a date</h2>
            <div className="max-w-sm mx-auto">
              {/* Month nav */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-heading font-bold text-white">
                  {calMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                  <div key={d} className="text-center text-xs text-gray-500 font-semibold py-1">{d}</div>
                ))}
              </div>
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((d, i) => {
                  if (!d) return <div key={i} />
                  const ymd = toYMD(d)
                  const disabled = isDayDisabled(d)
                  const selected = selectedDate === ymd
                  return (
                    <button
                      key={i}
                      onClick={() => { if (!disabled) { setSelectedDate(ymd) } }}
                      disabled={disabled}
                      className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                        selected ? 'bg-pk-500 text-white font-bold'
                        : disabled ? 'text-gray-700 cursor-not-allowed'
                        : 'text-gray-300 hover:bg-pk-700 hover:text-white'
                      }`}
                    >
                      {d.getDate()}
                    </button>
                  )
                })}
              </div>
              <p className="text-gray-600 text-xs text-center mt-3">We work Mon – Sat, 7am – 8pm. Sundays closed.</p>
            </div>
            <div className="flex gap-3 mt-6 max-w-sm mx-auto">
              <button onClick={() => setStep(1)} className="flex-1 py-3 border border-pk-700 text-gray-400 rounded-xl hover:text-white transition-colors flex items-center justify-center gap-2">
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate}
                className="flex-1 btn-primary disabled:opacity-40"
              >
                Next: Pick Time →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Time Slot */}
        {step === 3 && (
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-1">Choose a time slot</h2>
            <p className="text-gray-500 text-sm mb-5">{formatDisplayDate(selectedDate)}</p>
            {loadingSlots ? (
              <div className="text-gray-500 text-center py-8">Checking availability...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {TIME_SLOTS.map((slot) => {
                  const booked = bookedSlots.includes(slot)
                  const selected = selectedSlot === slot
                  return (
                    <button
                      key={slot}
                      onClick={() => { if (!booked) setSelectedSlot(slot) }}
                      disabled={booked}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                        booked ? 'bg-pk-900 border-pk-800 text-gray-700 cursor-not-allowed'
                        : selected ? 'bg-pk-500/20 border-pk-500 text-white'
                        : 'bg-pk-800 border-pk-700 text-gray-300 hover:border-pk-500 hover:text-white'
                      }`}
                    >
                      <Clock size={13} className={booked ? 'text-gray-700' : selected ? 'text-pk-400' : 'text-pk-500'} />
                      {slot}
                      {booked && <span className="text-xs text-gray-700">Booked</span>}
                    </button>
                  )
                })}
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 border border-pk-700 text-gray-400 rounded-xl hover:text-white transition-colors flex items-center justify-center gap-2">
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!selectedSlot}
                className="flex-1 btn-primary disabled:opacity-40"
              >
                Next: Your Info →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Contact Info */}
        {step === 4 && (
          <div>
            <h2 className="font-heading font-bold text-white text-xl mb-2">Your contact info</h2>
            <div className="bg-pk-800 rounded-xl p-3 mb-5 text-sm flex flex-wrap gap-x-6 gap-y-1">
              <span className="text-gray-400"><span className="text-white font-semibold">Service:</span> {service}</span>
              <span className="text-gray-400"><span className="text-white font-semibold">Date:</span> {formatDisplayDate(selectedDate)}</span>
              <span className="text-gray-400"><span className="text-white font-semibold">Time:</span> {selectedSlot}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Full Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-pk-800 border border-pk-700 text-white rounded-lg text-sm outline-none focus:border-pk-500 placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(218) 000-0000"
                  className="w-full px-4 py-3 bg-pk-800 border border-pk-700 text-white rounded-lg text-sm outline-none focus:border-pk-500 placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email *</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-pk-800 border border-pk-700 text-white rounded-lg text-sm outline-none focus:border-pk-500 placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Your City</label>
                <select
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-3 bg-pk-800 border border-pk-700 text-white rounded-lg text-sm outline-none focus:border-pk-500"
                >
                  <option value="">Select city...</option>
                  {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Additional Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                placeholder="Property details, gate codes, special requests..."
                className="w-full px-4 py-3 bg-pk-800 border border-pk-700 text-white rounded-lg text-sm outline-none focus:border-pk-500 placeholder-gray-600"
              />
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="flex-1 py-3 border border-pk-700 text-gray-400 rounded-xl hover:text-white transition-colors flex items-center justify-center gap-2">
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 btn-primary disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Confirm Booking →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
