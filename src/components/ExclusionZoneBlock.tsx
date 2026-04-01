import { Container } from "@/components/ui/container"
import { assetUrl } from "@/lib/asset"
import type { ExclusionZone } from "@/lib/brandSchema"

interface ExclusionZoneBlockProps {
  exclusionZone: ExclusionZone

}

export function ExclusionZoneBlock({ exclusionZone }: ExclusionZoneBlockProps) {
  return (

    <section id="exclusion-zone" className={`scroll-mt-20 -mt-20`}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <h3 className="text-2xl  tracking-tight mb-0">Exclusion Zone</h3>
           {exclusionZone.examples && exclusionZone.examples.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 md:col-span-2 w-full">
              {exclusionZone.examples.map((example: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-center bg-muted/50 rounded-lg"
                >
                  <img
                    src={assetUrl(example)}
                    alt={`Exclusion zone example ${idx + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
