interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span className={`section-label ${className}`}>
      <span className="w-5 h-0.5 bg-pk-500 inline-block" />
      {children}
    </span>
  )
}
