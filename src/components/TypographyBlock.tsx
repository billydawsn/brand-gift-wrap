import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { assetUrl } from "@/lib/asset"
import type { Typography, Font } from "@/lib/brandSchema"
import { Download } from "lucide-react"


interface TypographyBlockProps {
  typography: Typography,
  id: string
}

export function TypographyBlock({ typography, id }: TypographyBlockProps) {
  useEffect(() => {
    // Load fonts dynamically
    typography.fonts.forEach((font) => {
      if (font.source.type === "google") {
        loadGoogleFont(font)
      } else if (font.source.type === "file") {
        loadLocalFont(font)
      }
    })
  }, [typography.fonts])

  const showTabs = typography.fonts.length > 1 || typography.examples.length > 0

  const typePreviews = {
    'playfairdisplay': 'Discover Your Perfect Piece',
    'epilogue': 'Pieces crafted to inspire and adorn',
  } as { [key: string]: string }

  const typeDescriptions = {
    0: 'The primary typeface (Playfair Display) brings a sense of elegance and refinement, reflecting the jewellery-led positioning of the brand. Its high contrast and classic forms make it ideal for creating impact and a premium feel.\nUse for headings, key statements and moments where you want to draw attention. Allow generous spacing and avoid overusing at small sizes, where legibility can be reduced.\nAvoid using for long paragraphs or dense content, as this can feel heavy and harder to read.',
    1: 'The secondary typeface (Epilogue) provides clarity and balance, supporting the primary font with a clean, modern feel. It ensures readability across both digital and print applications.\nUse for body copy, supporting text, UI elements and smaller details. It should carry the majority of written content, creating a clear and accessible reading experience.\nAvoid over-styling or excessive weight variation, keep it simple to maintain consistency and legibility.',
    'hierarchy': 'Typography should be used to create a clear and consistent hierarchy across all communications. The contrast between Playfair Display and Epilogue helps guide the reader and establish structure.\nUse Playfair Display for headings and key moments, and Epilogue for supporting text. Maintain consistent sizing, spacing and weight relationships to ensure clarity and flow.\nAvoid mixing styles inconsistently or introducing additional typefaces, as this can weaken the overall system and reduce cohesion.',
    'in-use': 'Typography should be used to create a clear and consistent hierarchy across all communications. The contrast between Playfair Display and Epilogue helps guide the reader and establish structure.\nUse Playfair Display for headings and key moments, and Epilogue for supporting text. Maintain consistent sizing, spacing and weight relationships to ensure clarity and flow.\nAvoid mixing styles inconsistently or introducing additional typefaces, as this can weaken the overall system and reduce cohesion.'
  } as { [key: string]: string }

  // store Tab value in state to show description based on selected tab
  const [selectedTab, setSelectedTab] = useState("0")

  return (
    <Container>
      <div className="space-y-6 mt-14 mb-24" id={id}>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <h2 className="text-3xl  tracking-tight mb-0">Typography</h2>
          {/* get selected tab and then add the description */}
      {typeDescriptions[selectedTab] && (
        <div className="text-main md:col-span-2 max-w-2xl space-y-2">
          {typeDescriptions[selectedTab].split("\n").map((line, idx) => (
            <p key={idx} className="text-[#26260E]">
              {line}
            </p>
          ))}
        </div>
      )}
        </div>

        


      {showTabs ? (
        <Tabs defaultValue="0" className="w-full bg-transparent" onValueChange={(value) => setSelectedTab(value)}>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <TabsList className="flex flex-col gap-5 h-auto bg-transparent items-start">
                {typography.fonts.map((font, idx) => (
                  <TabsTrigger key={idx} value={idx.toString()}>
                    {font.label || font.name}
                  </TabsTrigger>
                ))}
                {typography.examples.length > 0 && (
                  <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
                )}
                <TabsTrigger value="in-use">In Use</TabsTrigger>
              </TabsList>
            </div>

            <div className="col-span-1 md:col-span-2">
            
            {typography.fonts.map((font, idx) => (
              <TabsContent key={idx} value={idx.toString()}>
                <Card className="border-none p-0 shadow-none">
                  <CardHeader className="p-0">
                    <div className="flex items-center justify-between">
                      {font.source.type === "file" && font.source.files[0] && (
                        <a
                          href={assetUrl(font.source.files[0].src)}
                          download
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8 p-0">
                    {/* Weight Variations Grid */}
                    <div className="">
                      

                      <div className="col-span-1 md:col-span-2">
                        
                        <div className="flex gap-3 items-center mb-6 ">
                          <CardTitle className="text-main" style={{
                          fontFamily: font.name,
                          fontWeight: 300
                          }}>{font.name}</CardTitle>

                          {/* google download link if google font */}
                          {font.source.type === "google" && (
                            <a
                              href={`https://fonts.google.com/specimen/${font.source.family.replace(/ /g, "+")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
                            >
                              <Download className="h-4 w-4 inline-block text-muted-foreground" />
                            </a>
                          )}                        
                        </div>
                        
                        {/* Alphabet Display */}
                        <div className="text-left">
                          <p
                            style={{
                              fontFamily: font.name,
                              fontSize: "32px",
                              lineHeight: "1.4",
                            }}
                            className="text-main"
                          >
                            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789
                          </p>
                        </div>

                        <div className="items-start mt-8">
                          
                          <div className="">
                            {/* Weight Labels */}
                            {font.source.type === "google" && (
                              <div className="">

                                  {font.source.weights.map((weight) => (
                                    <div key={weight} className="grid md:grid-cols-4 gap-2 md:gap-8 py-6 border-b md:py-0 md:mt-3 md:border-b-0">
                                      <div className="col-span-1">
                                        <p
                                          key={weight}
                                          style={{
                                            fontFamily: font.name,
                                            fontWeight: weight,
                                          }}
                                          className="text-main text-2xl xl:text-3xl"
                                        >
                                          {getWeightName(weight)}
                                        </p>
                                      </div>
                                      <div className="col-span-3">
                                        {/* Example Text */}
                                        <p
                                          style={{
                                            fontFamily: font.name,
                                            fontWeight: weight,
                                          }}
                                          className="text-main md:right md:text-right text-2xl xl:text-3xl"
                                        >
                                          {typePreviews[font.name.toLowerCase().replace(' ', '')] || 'Discover your perfect piece'}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}
                            {font.source.type === "file" && (
                              <div className="col-span-1">
                                {font.source.files.map((file, fileIdx) => (
                                  <p
                                    key={fileIdx}
                                    style={{
                                      fontFamily: font.name,
                                      fontWeight: file.weight,
                                      fontStyle: file.style,
                                      fontSize: "20px",
                                    }}
                                    className="text-main"
                                  >
                                    {getWeightName(file.weight)}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>

                      </div>

                      

                      
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

            {/* Hierarchy Tab */}
            {typography.examples.length > 0 && (
              <TabsContent value="hierarchy" className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t py-6">

                  <div className="text-left left">
                    <p className="text-sm text-[#26260E] font-medium">Epilogue Regular</p>
                    <p className="text-sm text-[#26260E50]">Font size 24 pt</p>
                    <p className="text-sm text-[#26260E50]">Letter spacing 10%</p>
                    <p className="text-sm text-[#26260E50]">Olive Ink</p>
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <p className="uppercase" style={{ fontFamily: 'Epilogue', fontWeight: 300, fontSize: '24px', letterSpacing: '10%' }}>
                      Strapline
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t py-6">
                  <div className="text-left left">
                    <p className="text-sm text-[#26260E] font-medium">Playfair Display</p>
                    <p className="text-sm text-[#26260E50]">Font size 64 pt</p>
                    <p className="text-sm text-[#26260E50]">Letter spacing 0%</p>
                    <p className="text-sm text-[#26260E50]">Heritage Olive</p>
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <p style={{ fontFamily: 'Playfair Display', fontWeight: 300, fontSize: '64px', letterSpacing: '0%' }}>
                      Heading 1
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t py-6">
                  <div className="text-left left">
                    <p className="text-sm text-[#26260E] font-medium">Playfair Display</p>
                    <p className="text-sm text-[#26260E50]">Font size 42 pt</p>
                    <p className="text-sm text-[#26260E50]">Letter spacing 0%</p>
                    <p className="text-sm text-[#26260E50]">Heritage Olive</p>
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <p style={{ fontFamily: 'Playfair Display', fontWeight: 300, fontSize: '42px', letterSpacing: '0%' }}>
                      Heading 2
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t py-6">
                  <div className="text-left left">
                    <p className="text-sm text-[#26260E] font-medium">Playfair Display</p>
                    <p className="text-sm text-[#26260E50]">Font size 30 pt</p>
                    <p className="text-sm text-[#26260E50]">Letter spacing 0%</p>
                    <p className="text-sm text-[#26260E50]">Heritage Olive</p>
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <p style={{ fontFamily: 'Playfair Display', fontWeight: 300, fontSize: '30px', letterSpacing: '0%' }}>
                      Heading 3
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t py-6">
                  <div className="text-left left">
                    <p className="text-sm text-[#26260E] font-medium">Epilogue Italic</p>
                    <p className="text-sm text-[#26260E50]">Font size 23 pt</p>
                    <p className="text-sm text-[#26260E50]">Letter spacing 0%</p>
                    <p className="text-sm text-[#26260E50]">Olive Ink</p>
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <p style={{ fontFamily: 'Epilogue', fontStyle: 'italic', fontWeight: 300, fontSize: '23px', letterSpacing: '0%' }}>
                      Quote
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t py-6">
                  <div className="text-left left">
                    <p className="text-sm text-[#26260E] font-medium">Epilogue Regular</p>
                    <p className="text-sm text-[#26260E50]">Font size 21 pt</p>
                    <p className="text-sm text-[#26260E50]">Letter spacing 0%</p>
                    <p className="text-sm text-[#26260E50]">Heritage Olive</p>
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <p style={{ fontFamily: 'Epilogue', fontWeight: 300, fontSize: '21px', letterSpacing: '0%' }}>
                      Body Copy
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t py-6">
                  <div className="text-left left">
                    <p className="text-sm text-[#26260E] font-medium">Epilogue Medium</p>
                    <p className="text-sm text-[#26260E50]">Font size 21 pt</p>
                    <p className="text-sm text-[#26260E50]">Letter spacing 0%</p>
                    <p className="text-sm text-[#26260E50]">Olive Ink</p>
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <p style={{ fontFamily: 'Epilogue', fontWeight: 500, textDecoration:"underline", fontSize: '21px', letterSpacing: '0%', textUnderlineOffset: '4px' }}>
                      Button
                    </p>
                  </div>
                </div>

                
              </TabsContent>
            )}

            {/* In Use Tab */}
            <TabsContent value="in-use" className="mt-5 space-y-6">
                <p className="uppercase" style={{ fontFamily: 'Epilogue', fontWeight: 300, fontSize: '24px', letterSpacing: '10%' }}>
                  Lorem ipsum
                </p>
                <p style={{ fontFamily: 'Playfair Display', fontWeight: 300, fontSize: '64px', letterSpacing: '0%' }}>
                  Dolor Sit Amet
                </p>
                <div className="border-l pl-6">
                <p style={{ fontFamily: 'Epilogue', fontStyle: 'italic', fontWeight: 300, fontSize: '23px', letterSpacing: '0%' }}>
                  Bibendum sit dui in tempus arcu. Tempus amet, sagittis, cras quis donec lacinia.
                </p>
                </div>
                <p style={{ fontFamily: 'Epilogue', fontWeight: 300, fontSize: '21px', letterSpacing: '0%' }}>
                  Consectetur adipiscing elit. Odio sagittis gravida semper in pretium ac urna ferment. Amet ipsum dolor a, pretium et aliquet non. Amet, maecenas cras auctor vitae. 
                </p>
                <p style={{ fontFamily: 'Playfair Display', fontWeight: 300, fontSize: '42px', letterSpacing: '0%' }}>
                      Luctus non et cursus 
                </p>
                <p style={{ fontFamily: 'Epilogue', fontWeight: 300, fontSize: '21px', letterSpacing: '0%' }}>
                  Consectetur adipiscing elit. Odio sagittis gravida semper in pretium ac urna ferment. Amet ipsum dolor a, pretium et aliquet non. Amet, maecenas cras auctor vitae. 
                </p>
                <p className="cursor-pointer" style={{ fontFamily: 'Epilogue', fontWeight: 500, textDecoration:"underline", fontSize: '21px', letterSpacing: '0%', textUnderlineOffset: '4px' }}>
                  Learn More
                </p>
            </TabsContent>
            </div>
          </div>
        </Tabs>
      ) : (
        /* Single font, no examples - no tabs needed */
        typography.fonts.map((font, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-main">{font.name}</CardTitle>
                {font.source.type === "file" && font.source.files[0] && (
                  <a
                    href={assetUrl(font.source.files[0].src)}
                    download
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Alphabet Display */}
              <div className="text-center">
                <p
                  style={{
                    fontFamily: font.name,
                    fontSize: "32px",
                    lineHeight: "1.4",
                  }}
                  className="text-main"
                >
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789
                </p>
              </div>

              {/* Weight Variations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Large Aa */}
                <div className="flex items-center justify-center md:justify-start">
                  <p
                    style={{
                      fontFamily: font.name,
                      fontSize: "120px",
                      lineHeight: "1",
                    }}
                    className="text-main"
                  >
                    Aa
                  </p>
                </div>

                {/* Weight Labels */}
                {font.source.type === "google" && (
                  <div className="flex flex-col justify-center space-y-3">
                    {font.source.weights.map((weight) => (
                      <p
                        key={weight}
                        style={{
                          fontFamily: font.name,
                          fontWeight: weight,
                          fontSize: "20px",
                        }}
                        className="text-main"
                      >
                        {getWeightName(weight)}
                      </p>
                    ))}
                  </div>
                )}
                {font.source.type === "file" && (
                  <div className="flex flex-col justify-center space-y-3">
                    {font.source.files.map((file, fileIdx) => (
                      <p
                        key={fileIdx}
                        style={{
                          fontFamily: font.name,
                          fontWeight: file.weight,
                          fontStyle: file.style,
                          fontSize: "20px",
                        }}
                        className="text-main"
                      >
                        {getWeightName(file.weight)}
                      </p>
                    ))}
                  </div>
                )}

                {/* Example Text */}
                {font.source.type === "google" && (
                  <div className="flex flex-col justify-center space-y-3">
                    {font.source.weights.map((weight) => (
                      <p
                        key={weight}
                        style={{
                          fontFamily: font.name,
                          fontWeight: weight,
                          fontSize: "20px",
                        }}
                        className="text-main"
                      >
                        Welcome to Chapel House
                      </p>
                    ))}
                  </div>
                )}
                {font.source.type === "file" && (
                  <div className="flex flex-col justify-center space-y-3">
                    {font.source.files.map((file, fileIdx) => (
                      <p
                        key={fileIdx}
                        style={{
                          fontFamily: font.name,
                          fontWeight: file.weight,
                          fontStyle: file.style,
                          fontSize: "20px",
                        }}
                        className="text-main"
                      >
                        Welcome to Chapel House
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
      </div>
    </Container>
  )
}

function getWeightName(weight: number): string {
  const weightNames: Record<number, string> = {
    100: "Thin",
    200: "Extra Light",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "Semi Bold",
    700: "Bold",
    800: "Extra Bold",
    900: "Black",
  }
  return weightNames[weight] || `weight ${weight}`
}

function loadGoogleFont(font: Font) {
  if (font.source.type !== "google") return
  
  const family = font.source.family
  const weights = font.source.weights.join(";")
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+"
  )}:wght@${weights}&display=swap`
  
  // Check if already loaded
  if (document.querySelector(`link[href="${url}"]`)) return
  
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = url
  document.head.appendChild(link)
}

function loadLocalFont(font: Font) {
  if (font.source.type !== "file") return
  
  // Check if already loaded
  const styleId = `font-${font.name.replace(/\s/g, "-")}`
  if (document.getElementById(styleId)) return
  
  const fontFaces = font.source.files
    .map(
      (file) => `
    @font-face {
      font-family: "${font.name}";
      font-weight: ${file.weight};
      font-style: ${file.style};
      src: url("${assetUrl(file.src)}") format("woff2");
      font-display: swap;
    }
  `
    )
    .join("\n")
  
  const style = document.createElement("style")
  style.id = styleId
  style.textContent = fontFaces
  document.head.appendChild(style)
}
