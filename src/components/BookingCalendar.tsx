import { useState, useEffect } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Bed, Users, DoorOpen, CalendarBlank, CheckCircle } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { format, addDays, differenceInDays, isAfter, isBefore, startOfDay } from "date-fns"
import { DateRange } from "react-day-picker"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/LanguageContext"
import { t, formatCurrency } from "@/lib/i18n-new"
import { useIsMobile } from "@/hooks/use-mobile"

interface RoomType {
  id: string
  name: string
  type: string
  capacity: number
  price: number
  description: string
  features: string[]
}

interface Booking {
  id: string
  roomId: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  createdAt: string
}

const ROOM_TYPES: RoomType[] = [
  {
    id: "private-double",
    name: "Private Double Room",
    type: "private",
    capacity: 2,
    price: 28,
    description: "Cozy private room perfect for couples or solo travelers seeking privacy",
    features: ["Private entrance", "Television", "Secure locker", "Interior-facing windows", "Fan ventilation"]
  },
  {
    id: "dorm-6",
    name: "6-Bed Mixed Dorm",
    type: "dorm",
    capacity: 6,
    price: 11,
    description: "Social dormitory with secure lockers and spacious layout",
    features: ["Secure lockers", "Reading lights", "Power outlets", "Shared bathroom", "Fan ventilation"]
  },
  {
    id: "dorm-8",
    name: "8-Bed Mixed Dorm",
    type: "dorm",
    capacity: 8,
    price: 10,
    description: "Budget-friendly option with excellent community atmosphere",
    features: ["Secure lockers", "Reading lights", "Power outlets", "Shared bathroom", "Fan ventilation"]
  },
  {
    id: "dorm-10",
    name: "10-Bed Mixed Dorm",
    type: "dorm",
    capacity: 10,
    price: 9,
    description: "Ultra-budget accommodation ideal for backpackers",
    features: ["Secure lockers", "Reading lights", "Power outlets", "Shared bathroom", "Fan ventilation"]
  }
]

export function BookingCalendar() {
  const { language, currency } = useLanguage()
  const isMobile = useIsMobile()
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(ROOM_TYPES[0])
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [guestCount, setGuestCount] = useState(1)
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  
  const [bookings, setBookings] = useKV<Booking[]>("hostel-bookings", [])

  const calculateTotalPrice = () => {
    if (!dateRange?.from || !dateRange?.to) return 0
    const nights = differenceInDays(dateRange.to, dateRange.from)
    return nights * selectedRoom.price
  }

  const isDateBooked = (date: Date, roomId: string): boolean => {
    if (!bookings) return false
    const dateStr = format(startOfDay(date), "yyyy-MM-dd")
    return bookings.some(booking => {
      if (booking.roomId !== roomId) return false
      const checkIn = new Date(booking.checkIn)
      const checkOut = new Date(booking.checkOut)
      return (
        (isAfter(date, checkIn) || format(startOfDay(date), "yyyy-MM-dd") === booking.checkIn) &&
        (isBefore(date, checkOut) || format(startOfDay(date), "yyyy-MM-dd") === booking.checkOut)
      )
    })
  }

  const handleBooking = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error(t('toast.selectDates', language))
      return
    }

    if (!guestName || !guestEmail) {
      toast.error(t('toast.provideDetails', language))
      return
    }

    if (guestCount < 1 || guestCount > selectedRoom.capacity) {
      toast.error(t('toast.invalidGuestCount', language, { max: selectedRoom.capacity.toString() }))
      return
    }

    const nights = differenceInDays(dateRange.to, dateRange.from)
    if (nights < 1) {
      toast.error(t('toast.minimumStay', language))
      return
    }

    const newBooking: Booking = {
      id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      roomId: selectedRoom.id,
      guestName,
      guestEmail,
      checkIn: format(dateRange.from, "yyyy-MM-dd"),
      checkOut: format(dateRange.to, "yyyy-MM-dd"),
      guests: guestCount,
      totalPrice: calculateTotalPrice(),
      createdAt: new Date().toISOString()
    }

    setBookings((currentBookings) => [...(currentBookings || []), newBooking])
    
    const nightsWord = nights === 1 ? t('night', language) : t('nights', language)
    toast.success(t('toast.bookingConfirmed', language), {
      description: `${nights} ${nightsWord} ${selectedRoom.name} - ${t('booking.total', language)} ${formatCurrency(newBooking.totalPrice, currency)}`
    })

    setDateRange(undefined)
    setGuestName("")
    setGuestEmail("")
    setGuestCount(1)
  }

  const totalPrice = calculateTotalPrice()
  const nights = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) : 0

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">{t('booking.title', language)}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('booking.subtitle', language)}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Bed size={24} weight="duotone" className="text-primary" />
                  {t('booking.selectRoom', language)}
                </CardTitle>
                <CardDescription>{t('booking.selectRoom.description', language)}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedRoom.id} onValueChange={(value) => {
                  const room = ROOM_TYPES.find(r => r.id === value)
                  if (room) setSelectedRoom(room)
                }}>
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 h-auto">
                    {ROOM_TYPES.map((room) => (
                      <TabsTrigger key={room.id} value={room.id} className="text-xs sm:text-sm py-2 px-1 sm:px-3">
                        <span className="flex items-center gap-1">
                          {room.type === "private" ? <DoorOpen size={16} className="hidden sm:inline" /> : <Users size={16} className="hidden sm:inline" />}
                          <span className="truncate">{room.type === "private" ? "Private" : `${room.capacity}-Bed`}</span>
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {ROOM_TYPES.map((room) => (
                    <TabsContent key={room.id} value={room.id}>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-semibold mb-2">{room.name}</h3>
                            <p className="text-sm md:text-base text-muted-foreground mb-4">{room.description}</p>
                          </div>
                          <div className="text-left sm:text-right w-full sm:w-auto">
                            <div className="text-2xl md:text-3xl font-bold text-primary">{formatCurrency(room.price, currency)}</div>
                            <div className="text-sm text-muted-foreground">{t('perNight', language)}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Users size={14} weight="fill" />
                            {t('booking.maxGuests', language, { count: room.capacity.toString() })}
                          </Badge>
                          {room.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{feature}</Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <CalendarBlank size={24} weight="duotone" className="text-primary" />
                  {t('booking.selectDates', language)}
                </CardTitle>
                <CardDescription>{t('booking.selectDates.description', language)}</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="min-w-0">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={isMobile ? 1 : 2}
                    disabled={(date) => {
                      const today = startOfDay(new Date())
                      if (isBefore(date, today)) return true
                      return isDateBooked(date, selectedRoom.id)
                    }}
                    className="rounded-md border w-full mx-auto"
                  />
                </div>
                
                {dateRange?.from && dateRange?.to && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-4 bg-muted rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{t('booking.checkIn', language)}</span>
                      <span className="text-sm">{format(dateRange.from, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{t('booking.checkOut', language)}</span>
                      <span className="text-sm">{format(dateRange.to, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-sm">{t('booking.totalNights', language)}</span>
                      <span className="text-sm">{nights} {nights === 1 ? t('night', language) : t('nights', language)}</span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-6">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">{t('booking.summary', language)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="guestName" className="text-sm font-medium mb-2 block">
                    {t('booking.yourName', language)} *
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm md:text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="guestEmail" className="text-sm font-medium mb-2 block">
                    {t('booking.email', language)} *
                  </label>
                  <input
                    id="guestEmail"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm md:text-base"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="guestCount" className="text-sm font-medium mb-2 block">
                    {t('booking.guestCount', language)}
                  </label>
                  <input
                    id="guestCount"
                    type="number"
                    min="1"
                    max={selectedRoom.capacity}
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm md:text-base"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('booking.maxGuests', language, { count: selectedRoom.capacity.toString() })}
                  </p>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('booking.roomType', language)}</span>
                    <span className="font-medium text-right text-xs sm:text-sm">{selectedRoom.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('booking.rate', language)}</span>
                    <span className="font-medium">{formatCurrency(selectedRoom.price, currency)}/{t('night', language)}</span>
                  </div>
                  {nights > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('booking.totalNights', language)}</span>
                        <span className="font-medium">{nights}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>{t('booking.total', language)}</span>
                        <span className="text-primary">{formatCurrency(totalPrice, currency)}</span>
                      </div>
                    </>
                  )}
                </div>

                <Button 
                  onClick={handleBooking}
                  disabled={!dateRange?.from || !dateRange?.to || !guestName || !guestEmail}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all hover:scale-105"
                  size="lg"
                >
                  <CheckCircle size={20} className="mr-2" weight="bold" />
                  {t('booking.confirm', language)}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {t('booking.cancellationPolicy', language)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 md:mt-12 p-4 md:p-6 bg-muted rounded-lg"
        >
          <h3 className="font-semibold text-base md:text-lg mb-3">{t('booking.info.title', language)}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• {t('booking.info.ventilation', language)}</li>
            <li>• {t('booking.info.bathrooms', language)}</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
