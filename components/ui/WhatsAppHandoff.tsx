import { MessageCircle } from 'lucide-react'

export default function WhatsAppHandoff({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-bold text-white transition hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <MessageCircle size={18} aria-hidden="true" />
      Continue on WhatsApp
    </a>
  )
}
