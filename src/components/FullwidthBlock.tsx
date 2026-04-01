import { assetUrl } from "@/lib/asset"
import type { FullwidthBlock as FullwidthBlockType } from "@/lib/brandSchema"

interface FullwidthBlockProps {
  block: FullwidthBlockType
  className?: string
}

export function FullwidthBlock({ block, className }: FullwidthBlockProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-none ${className || ""}`}>
      {block.image && (
        <div className="relative w-full aspect-[21/9] bg-muted/50">
          <img
            src={assetUrl(block.image)}
            alt={block.alt || ""}
            className="w-full h-full object-cover"
          />
          {block.text && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <p className="text-white text-2xl md:text-4xl  text-center px-8 drop-shadow-lg">
                {block.text}
              </p>
            </div>
          )}
        </div>
      )}
      {!block.image && block.text && (
        <div className="w-full py-16 md:py-24 px-8 bg-muted/50 flex items-center justify-center">
          <p className="text-2xl md:text-4xl  text-center max-w-4xl">
            {block.text}
          </p>
        </div>
      )}
    </div>
  )
}
