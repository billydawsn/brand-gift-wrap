import { Container } from "@/components/ui/container"
import { assetUrl } from "@/lib/asset"

interface IconographyBlockProps {
  icons: { name: string; src: string }[]
}

export function IconographyBlock({ icons }: IconographyBlockProps) {
  return (

    <section id="iconography" className={`scroll-mt-20`}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
            <h3 className="text-2xl tracking-tight mb-0"></h3>
           {icons && icons.length > 0 && (
            <div className="grid gap-4 md:col-span-2 grid-cols-2 md:grid-cols-4 justify-center w-full">
              {icons.map((icon, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    src={assetUrl(icon.src)}
                    alt={icon.name}
                    className="w-full h-auto"
                  />
                  <p className="text-center mt-2 text-sm">{icon.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
