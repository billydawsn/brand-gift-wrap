import { Download } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { assetUrl } from "@/lib/asset"
import type { Logo } from "@/lib/brandSchema"

interface LogoBlockProps {
  logos: Logo[]
}

export function LogoBlock({ logos }: LogoBlockProps) {
  return (
    <>
      <Container>
          <div className="space-y-4 mt-20">
            {logos.map((logo, idx) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {logo.name === "Primary" ?
                  <h3 className="text-2xl tracking-tight mb-0">Primary & Secondary</h3>
                :
                  <h3 className="text-2xl tracking-tight mb-0"></h3>
                } 
                <Card key={idx} className="border-0 p-0 rounded-none shadow-none w-full md:col-span-2">
                  <CardContent className="p-0">
                    <div className={`grid gap-4 sm:grid-cols-2 ${logo.name === "Secondary" ? "lg:grid-cols-4" : "lg:grid-cols-2"}`}> 
                      {logo.variants.map((variant, vIdx) => (
                        <div
                          key={vIdx}
                          className="flex flex-col"
                        >
                          <div className="flex items-center justify-center bg-muted/50 rounded">
                            <img
                              src={assetUrl(variant.src)}
                              alt={`${logo.name} - ${variant.label}`}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="flex items-center ml-auto gap-4 mr-4 text-[#A2BAC5] hidden">
                            <span className="text-sm font-medium">PNG / SVG</span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                asChild
                                className="rounded-none"
                              >
                                <a
                                  href={assetUrl(variant.assetPath)}
                                  download
                                  className="flex items-center gap-1"
                                >
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
      </Container>
    </>
  )
}
