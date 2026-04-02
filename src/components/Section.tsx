import { type ReactNode } from "react"
import { Container } from "@/components/ui/container"
import { Download } from "lucide-react"

interface SectionProps {
  id: string
  title?: string
  description?: string
  children: ReactNode
  className?: string
  downloadLink?: string
}

export function Section({ id, title, description, children, className = "", downloadLink }: SectionProps) {
  const descriptionParagraphs = description 
    ? description.split(/\\n|\n/).filter(p => p.trim()) 
    : []
  
  return (
    <section id={id} className={`my-0 py-24 ${className}`}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {title &&
            <h2 className="text-3xl  tracking-tight mb-0">{title}</h2>
          }
          {descriptionParagraphs.length > 0 && (
            <div className="text-main md:col-span-2 max-w-2xl space-y-4">
              {descriptionParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {downloadLink && (
                <a href={downloadLink} download target="_blank" className="text-muted-foreground hover:text-foreground transition-colors opacity-75">
                  <Download className="h-5 w-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </Container>
      {children}
    </section>
  )
}
