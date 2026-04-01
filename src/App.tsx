import { useEffect, useState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PageShell } from "@/components/PageShell"
import { Section } from "@/components/Section"
import { LogoBlock } from "@/components/LogoBlock"
import { ExclusionZoneBlock } from "@/components/ExclusionZoneBlock"
import { IncorrectUsageBlock } from "@/components/IncorrectUsageBlock"
import { FullwidthBlock } from "@/components/FullwidthBlock"
import { ColorPaletteBlock } from "@/components/ColorPaletteBlock"
import { TypographyBlock } from "@/components/TypographyBlock"
import { GalleryBlock } from "@/components/GalleryBlock"
import { IconographyBlock } from "@/components/IconographyBlock"
import { BrandGuidelinesSchema, type BrandGuidelines } from "@/lib/brandSchema"
import { assetUrl } from "@/lib/asset"

function App() {
  const [data, setData] = useState<BrandGuidelines | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(assetUrl("data.json"))
        
        if (!response.ok) {
          throw new Error(
            `Failed to load data.json (${response.status} ${response.statusText})`
          )
        }
        
        const json = await response.json()
        
        // Validate with Zod
        const parsed = BrandGuidelinesSchema.parse(json)
        setData(parsed)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred")
        }
        console.error("Error loading brand guidelines:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Loading brand guidelines...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Brand Guidelines</AlertTitle>
          <AlertDescription className="mt-2">
            {error || "Failed to load data.json"}
            <div className="mt-4 text-sm">
              <p className="font-semibold">Troubleshooting:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ensure <code className="bg-muted px-1 rounded">public/data.json</code> exists</li>
                <li>Check that the JSON is valid</li>
                <li>Verify all required fields are present</li>
                <li>Check the browser console for more details</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // Determine which sections are visible
  const sections = [
    { id: "logos", label: "Logos", visible: !!data.logos?.length },
    { id: "exclusion-zone", label: "Exclusion Zone", visible: false },
    { id: "incorrect-usage", label: "Incorrect Usage", visible: false },
    { id: "colors", label: "Colours", visible: !!data.colors?.length },
    { id: "typography", label: "Typography", visible: !!data.typography },
    { id: "iconography", label: "Iconography", visible: !!data.icons?.length },
    { id: "gallery", label: "Application", visible: !!data.gallery?.length },
  ]

  return (
    <PageShell brand={data.brand} sections={sections}>

      <div className="relative w-full h-64 overflow-hidden rounded-none bg-[#26260E]"></div>

      <Section id="brand" title="Brand Guidelines" description="Gift & Wrap is a refined jewellery and gifting destination, rooted in quality, care and considered detail. The brand brings together a curated selection of pieces with a thoughtful, personal approach to gifting.\nThe visual identity balances elegance with warmth, drawing on soft tones, fluid forms and subtle handcrafted elements. It should feel calm, premium and approachable — timeless rather than trend-led. Consistency across all touchpoints is key to building recognition and maintaining the integrity of the brand.">
        <></>
      </Section>

      {data.fullwidthBlocks && data.fullwidthBlocks[0] && (
        <FullwidthBlock block={data.fullwidthBlocks[0]} />
      )}

      {data.logos && data.logos.length > 0 && (
        <Section id="logos" title="Logo" description="The Gift & Wrap logo is the primary visual identifier and should be used consistently across all communications. Designed to feel refined, fluid and timeless, it reflects the balance of elegance and warmth at the heart of the brand.\nThe logo should always be used in its approved formats and remain clear, legible and unobstructed. It must not be altered, distorted or modified in any way. Ensure sufficient spacing is maintained around the logo to preserve its clarity and impact across all applications.\nPrimary and secondary logo variations are provided for flexibility across different backgrounds. Select the version that offers the strongest contrast and readability, while maintaining a consistent and considered appearance.">
          <LogoBlock logos={data.logos} />
        </Section>
      )}

      {data.exclusionZone && (
        <ExclusionZoneBlock exclusionZone={data.exclusionZone} />
      )}

      {data.incorrectUsage && data.incorrectUsage.length > 0 && (
        <Section id="usage" title="Usage" description="Only approved logo assets should ever be used. To protect brand consistency, the following uses of the logo are not permitted:">
          <IncorrectUsageBlock items={data.incorrectUsage} />
        </Section>
      )}

      {data.colors && data.colors.length > 0 && (
        <Section id="colors" className="-mt-24" title="Colour" description="The palette is designed to feel warm, balanced and quietly premium, reflecting both gifting and jewellery. Each tone works together as part of a cohesive system, combining depth with softness.\nUse colour with restraint, allow space and contrast to lead layouts rather than overfilling with colour. Avoid using too many tones at once; keep combinations considered and minimal.">
          <ColorPaletteBlock colors={data.colors} />
        </Section>
      )}

      {data.fullwidthBlocks && data.fullwidthBlocks[1] && (
        <FullwidthBlock block={data.fullwidthBlocks[1]} />
      )}

      {data.typography && (
        <TypographyBlock id="typography" typography={data.typography} />
      )}

      {data.fullwidthBlocks && data.fullwidthBlocks[2] && (
        <FullwidthBlock block={data.fullwidthBlocks[2]} />
      )}

      {data.icons && data.icons.length > 0 && (
        <Section id="iconography" className="pb-0" title="Iconography" description="The iconography adopts a hand-drawn, quietly expressive style, using simple and recognisable forms with subtle detailing to introduce warmth and personality.\nIcons should be used primarily in Cocoa Brown, sitting on Pearl Dust backgrounds to create a soft, refined contrast that aligns with the wider palette. Pearl Dust can also be used on image overlays and darker backgrounds to maintain consistency and legibility. This combination keeps the overall feel light, premium and approachable.\nUse icons sparingly and consistently, ensuring they support content rather than dominate it. Avoid overcomplicating shapes or introducing additional styles, so the system remains cohesive and easy to recognise.">
            <IconographyBlock icons={data.icons} />
        </Section>
      )}

      {data.gallery && data.gallery.length > 0 && (
        <Section id="gallery" title="Application" description="The brand is designed to work seamlessly across digital and print, bringing together colour, typography and iconography into a cohesive and considered system. Soft, neutral backgrounds are paired with deeper tones for contrast, while refined typography ensures clarity and elegance throughout. Iconography adds subtle moments of personality without overpowering the overall look. Together, these elements create a consistent, premium and approachable visual language.\nThe examples below show how the identity comes together across the website, social and print, with all elements working in harmony.">
          <GalleryBlock gallery={data.gallery} />
        </Section>
      )}

      {data.fullwidthBlocks && data.fullwidthBlocks[3] && (
        <FullwidthBlock block={data.fullwidthBlocks[3]} />
      )}

    </PageShell>
  )
}

export default App
