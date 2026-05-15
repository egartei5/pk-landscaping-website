import { ReactNode } from 'react'

interface SceneWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SceneWrapper({ children, className = '', id }: SceneWrapperProps) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex flex-col snap-start overflow-hidden bg-pk-950 ${className}`}
    >
      <div className="scene-grain" />
      {children}
    </section>
  )
}
