import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bed, Users as UsersIcon, Check, X, CaretLeft, CaretRight, XCircle } from "@phosphor-icons/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n-new"
import { useState } from "react"

export function Accommodations() {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<{ roomId: string; index: number } | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const roomImages = {
    private: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80'
    ],
    dorm6: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
      'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&q=80',
      'https://images.unsplash.com/photo-1616594266827-f9e36c1b234b?w=800&q=80'
    ],
    dorm8: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
      'https://images.unsplash.com/photo-1631049035242-67c5e3f46b56?w=800&q=80'
    ]
  }

  const rooms = [
    {
      id: "private",
      name: t('accommodations.private.name', language),
      price: t('accommodations.private.price', language),
      icon: Bed,
      description: t('accommodations.private.description', language),
      features: t('accommodations.private.features', language).split('|'),
      capacity: t('accommodations.private.capacity', language),
      images: roomImages.private
    },
    {
      id: "dorm6",
      name: t('accommodations.dorm6.name', language),
      price: t('accommodations.dorm6.price', language),
      icon: UsersIcon,
      description: t('accommodations.dorm6.description', language),
      features: t('accommodations.dorm6.features', language).split('|'),
      capacity: t('accommodations.dorm6.capacity', language),
      images: roomImages.dorm6
    },
    {
      id: "dorm8",
      name: t('accommodations.dorm8.name', language),
      price: t('accommodations.dorm8.price', language),
      icon: UsersIcon,
      description: t('accommodations.dorm8.description', language),
      features: t('accommodations.dorm8.features', language).split('|'),
      capacity: t('accommodations.dorm8.capacity', language),
      images: roomImages.dorm8
    }
  ]

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !selectedImage) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    const room = rooms.find(r => r.id === selectedImage.roomId)
    if (!room) return

    if (isLeftSwipe && selectedImage.index < room.images.length - 1) {
      setSelectedImage({ ...selectedImage, index: selectedImage.index + 1 })
    }
    if (isRightSwipe && selectedImage.index > 0) {
      setSelectedImage({ ...selectedImage, index: selectedImage.index - 1 })
    }
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return
    
    const room = rooms.find(r => r.id === selectedImage.roomId)
    if (!room) return

    if (direction === 'next' && selectedImage.index < room.images.length - 1) {
      setSelectedImage({ ...selectedImage, index: selectedImage.index + 1 })
    } else if (direction === 'prev' && selectedImage.index > 0) {
      setSelectedImage({ ...selectedImage, index: selectedImage.index - 1 })
    }
  }

  return (
    <section className="py-20 px-6 bg-background" id="rooms">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            {t('accommodations.title', language)}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('accommodations.subtitle', language)}
          </p>
        </motion.div>

        <Tabs defaultValue="private" className="mb-12">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="private" className="touch-manipulation">{t('tabs.private', language)}</TabsTrigger>
            <TabsTrigger value="dorm6" className="touch-manipulation">{t('tabs.dorm6', language)}</TabsTrigger>
            <TabsTrigger value="dorm8" className="touch-manipulation">{t('tabs.dorm8', language)}</TabsTrigger>
          </TabsList>

          {rooms.map((room, index) => (
            <TabsContent key={room.id} value={room.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-6 md:p-12 max-w-4xl mx-auto card-hover-effect overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110">
                          <room.icon size={28} weight="fill" className="text-primary md:w-8 md:h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                            <h3 className="text-2xl md:text-3xl font-semibold">{room.name}</h3>
                            <Badge className="bg-accent text-accent-foreground w-fit">{room.price}/night</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm md:text-base mb-1">{room.description}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">Capacity: {room.capacity}</p>
                        </div>
                      </div>

                      <div className="grid gap-3 pt-4">
                        {room.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <Check size={18} weight="bold" className="text-secondary flex-shrink-0" />
                            <span className="text-xs md:text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {room.images.map((image, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => setSelectedImage({ roomId: room.id, index: idx })}
                            className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer touch-manipulation group"
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <img 
                              src={image} 
                              alt={`${room.name} - Image ${idx + 1}`}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                                View
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground pattern-ripple touch-manipulation text-base md:text-lg py-6 md:py-7"
                  >
                    {t('common.bookThisRoom', language)}
                  </Button>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 overflow-hidden bg-black/95 border-none">
            <DialogTitle className="sr-only">Room Gallery</DialogTitle>
            {selectedImage && (
              <div 
                className="relative w-full"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors touch-manipulation"
                  aria-label="Close gallery"
                >
                  <XCircle size={32} weight="fill" className="text-white" />
                </button>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage.index}
                    src={rooms.find(r => r.id === selectedImage.roomId)?.images[selectedImage.index]}
                    alt={`Room view ${selectedImage.index + 1}`}
                    className="w-full h-[70vh] md:h-[80vh] object-contain"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {selectedImage.index > 0 && (
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 hover:bg-black/70 transition-colors touch-manipulation"
                    aria-label="Previous image"
                  >
                    <CaretLeft size={28} weight="bold" className="text-white" />
                  </button>
                )}

                {selectedImage.index < (rooms.find(r => r.id === selectedImage.roomId)?.images.length || 0) - 1 && (
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 hover:bg-black/70 transition-colors touch-manipulation"
                    aria-label="Next image"
                  >
                    <CaretRight size={28} weight="bold" className="text-white" />
                  </button>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {rooms.find(r => r.id === selectedImage.roomId)?.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage({ roomId: selectedImage.roomId, index: idx })}
                      className={`w-2 h-2 rounded-full transition-all touch-manipulation ${
                        idx === selectedImage.index 
                          ? 'bg-white w-6' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">{t('accommodations.expect.title', language)}</h3>
          <Accordion type="single" collapsible className="bg-card rounded-xl">
            <AccordionItem value="climate">
              <AccordionTrigger className="px-6">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span>{t('accommodations.climate.title', language)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('accommodations.climate.description', language)}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bathrooms">
              <AccordionTrigger className="px-6">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span>{t('accommodations.bathrooms.title', language)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('accommodations.bathrooms.description', language)}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="vibe">
              <AccordionTrigger className="px-6">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span>{t('accommodations.vibe.title', language)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('accommodations.vibe.description', language)}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
