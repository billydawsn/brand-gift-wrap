import { Container } from "@/components/ui/container"
import { assetUrl } from "@/lib/asset"
import type { IncorrectUsageItem } from "@/lib/brandSchema"

interface IncorrectUsageBlockProps {
  items: IncorrectUsageItem[]
}

export function IncorrectUsageBlock({ items }: IncorrectUsageBlockProps) {
  return (
    <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          
            <div className="text-main md:col-start-2 md:col-span-2 space-y-4 grid gap-4 grid-cols-2 lg:grid-cols-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col space-y-4"
                >
                  <img
                      src={assetUrl(item.src)}
                      alt={item.caption}
                      className="max-h-full max-w-full object-cover"
                    />
                  <p className="text-sm text-[#99ADB7] text-left max-w-sm">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>
        </div>
    </Container>
  )
}
