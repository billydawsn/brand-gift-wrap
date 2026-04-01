import { useState, useMemo } from "react"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getColorContrast } from "@/lib/contrast"
import type { Color } from "@/lib/brandSchema"

interface ColorPaletteBlockProps {
  colors: Color[]
}

export function ColorPaletteBlock({ colors }: ColorPaletteBlockProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    toast.success(`${label} copied to clipboard`)
  }

  // Extract all unique roles from colors
  const roles = useMemo(() => {
    const roleSet = new Set<string>()
    colors.forEach((color) => {
      if (color.role) {
        color.role.forEach((r) => roleSet.add(r))
      }
    })
    const rolesArray = Array.from(roleSet)
    
    // Sort with Primary first, Secondary second, then alphabetically
    return rolesArray.sort((a, b) => {
      if (a === "Primary") return -1
      if (b === "Primary") return 1
      if (a === "Secondary") return -1
      if (b === "Secondary") return 1

      return a.localeCompare(b)
    })

  }, [colors])

  // remove "Primary" and "Secondary" from roles array to avoid duplication in tabs
  const filteredRoles = roles.filter(role => role !== "Primary" && role !== "Secondary")

  const [selectedRole, setSelectedRole] = useState<string>("all")

  // Filter colors based on selected role
  const filteredColors = useMemo(() => {
    if (selectedRole === "all") {
      // Exclude opacity variants from All Colors view
      return colors.filter((color) => 
        !color.role?.includes("Primary Opacity") && 
        !color.role?.includes("Secondary Opacity")
      )
    }
    return colors.filter((color) => color.role?.includes(selectedRole))
  }, [colors, selectedRole])

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-18">
      {/* Role Filter Tabs */}
      {filteredRoles.length > 1 && (
        <Tabs value={selectedRole} onValueChange={setSelectedRole} className="bg-transparent">
          <TabsList className="flex flex-col gap-5 h-auto bg-transparent items-start">
            <TabsTrigger value="all">All Colors</TabsTrigger>
            {filteredRoles.map((role) => (
              <TabsTrigger key={role} value={role}>
                {/* remove "Opacity" from role names */}
                {role.replace(" Opacity", "")}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Color Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 md:col-span-2 w-full">
      {filteredColors.map((color, idx) => (
          <Card 
            key={idx} 
            className={`overflow-hidden cursor-pointer rounded-none shadow-none border-0 relative ${
              selectedRole.includes("all") 
                ? "col-span-1 lg:col-span-6" 
                : "col-span-1 lg:col-span-3"
            }`}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color.values.hex }}
          >
            <CardHeader className="pb-4 pt-48">
              <CardTitle className="text-lg font-normal text-white mb-0">
                {color.name}
                <p className="text-sm font-normal text-white">{color.values.hex}</p>
                {color.opacity && (
                  <div className="text-sm font-normal text-white mt-1">
                    {color.opacity}
                  </div>
                )}
              </CardTitle>
              <CardDescription className="flex items-center justify-between">
                <Button
                  size="sm"
                  variant="link"
                  className="h-6 w-6 p-0 absolute top-4 left-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCopy(color.values.hex, "HEX")
                  }}
                >
                  <Copy className="h-4 w-4 text-white" />
                  <span className="sr-only">Copy HEX</span>
                </Button>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Color Detail Dialog */}
      <Dialog open={!!selectedColor} onOpenChange={() => setSelectedColor(null)}>
        <DialogContent className="max-w-xs rounded-none border-0">
          {selectedColor && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedColor.name}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Color Swatch */}
                <div
                  className="h-32 w-full"
                  style={{ backgroundColor: selectedColor.values.hex }}
                />

                {/* Roles */}
                {selectedColor.role && selectedColor.role.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">ROLES</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedColor.role.map((r, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Values */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">COLOR VALUES</p>
                  <ColorValueRow
                    label="HEX"
                    value={selectedColor.values.hex}
                    onCopy={() => handleCopy(selectedColor.values.hex, "HEX")}
                  />
                  {selectedColor.values.rgb && (
                    <ColorValueRow
                      label="RGB"
                      value={selectedColor.values.rgb}
                      onCopy={() => handleCopy(selectedColor.values.rgb!, "RGB")}
                    />
                  )}
                  {selectedColor.values.cmyk && (
                    <ColorValueRow
                      label="CMYK"
                      value={selectedColor.values.cmyk}
                      onCopy={() => handleCopy(selectedColor.values.cmyk!, "CMYK")}
                    />
                  )}
                  {selectedColor.values.pantone && (
                    <ColorValueRow
                      label="Pantone"
                      value={selectedColor.values.pantone}
                      onCopy={() => handleCopy(selectedColor.values.pantone!, "Pantone")}
                    />
                  )}
                </div>

                {/* Accessibility Info */}
                <div className="border-t pt-4 space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">ACCESSIBILITY</p>
                  {(() => {
                    const contrast = getColorContrast(selectedColor.values.hex)
                    return (
                      <>
                        {contrast.white && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">vs White: </span>
                            <span className="font-mono">{contrast.white.ratio.toFixed(2)}:1</span>
                            {contrast.white.aa && (
                              <span className="ml-2 text-xs text-green-600">✓ AA</span>
                            )}
                            {contrast.white.aaa && (
                              <span className="ml-1 text-xs text-green-600">✓ AAA</span>
                            )}
                          </div>
                        )}
                        {contrast.black && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">vs Black: </span>
                            <span className="font-mono">{contrast.black.ratio.toFixed(2)}:1</span>
                            {contrast.black.aa && (
                              <span className="ml-2 text-xs text-green-600">✓ AA</span>
                            )}
                            {contrast.black.aaa && (
                              <span className="ml-1 text-xs text-green-600">✓ AAA</span>
                            )}
                          </div>
                        )}
                      </>
                    )
                  })()}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </Container>
  )
}

function ColorValueRow({
  label,
  value,
  onCopy,
}: {
  label: string
  value: string
  onCopy: () => void
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <code className="font-mono text-xs">{value}</code>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0"
          onClick={onCopy}
        >
          <Copy className="h-3 w-3" />
          <span className="sr-only">Copy {label}</span>
        </Button>
      </div>
    </div>
  )
}
