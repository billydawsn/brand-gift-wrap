import { assetUrl } from "@/lib/asset"
import type { GalleryItem } from "@/lib/brandSchema"
import { Container } from "./ui/container"

interface GalleryBlockProps {
  gallery: GalleryItem[]
}

export function GalleryBlock({ gallery }: GalleryBlockProps) {

  const colSpans = ["col-span-1", "col-span-1", "col-span-2", "col-span-2"]

  return (
    <>
      <section className={`scroll-mt-20 my-0 pt-24`}>
            <Container>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <p></p>
                <div className="md:col-span-2">
                  {gallery.map((item, index) => (
                    <a href={item.link} className={`${colSpans[index % colSpans.length]}`} target="_blank" rel=" noreferrer">
                    <img
                      src={assetUrl(item.src)}
                      alt={item.caption}
                      className={`h-auto w-full object-cover transition-transform group-hover:scale-105 `}
                    />
                    </a>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        <div className="grid grid-cols-2 mt-8">
        
        </div>
    </>
  )
}
