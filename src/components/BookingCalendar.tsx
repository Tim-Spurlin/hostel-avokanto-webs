import { useState } from "react"
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
      toast.error("Please select check-in and check-out dates")
      return
    }

    if (!guestName || !guestEmail) {
      toast.error("Please provide your name and email")
      return
    }

    if (guestCount < 1 || guestCount > selectedRoom.capacity) {
      toast.error(`Guest count must be between 1 and ${selectedRoom.capacity}`)
      return
    }

    const nights = differenceInDays(dateRange.to, dateRange.from)
    if (nights < 1) {
      toast.error("Minimum stay is 1 night")
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
    
    toast.success("Booking confirmed!", {
      description: `${nights} night(s) in ${selectedRoom.name} - Total: $${newBooking.totalPrice}`
    })

    setDateRange(undefined)
    setGuestName("")
    setGuestEmail("")
    setGuestCount(1)
  }

  const totalPrice = calculateTotalPrice()
  const nights = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) : 0

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Book Your Stay</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check real-time availability and reserve your spot at our solidarity haven
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bed size={24} weight="duotone" className="text-primary" />
                  Select Your Room
                </CardTitle>
                <CardDescription>Choose from private rooms or social dormitories</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedRoom.id} onValueChange={(value) => {
                  const room = ROOM_TYPES.find(r => r.id === value)
                  if (room) setSelectedRoom(room)
                }}>
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
                    {ROOM_TYPES.map((room) => (
                      <TabsTrigger key={room.id} value={room.id} className="text-xs sm:text-sm">
                        {room.type === "private" ? <DoorOpen size={16} className="mr-1" /> : <Users size={16} className="mr-1" />}
                        {room.name.split(" ")[0]} {room.type === "dorm" ? room.name.split(" ")[0] : ""}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {ROOM_TYPES.map((room) => (
                    <TabsContent key={room.id} value={room.id}>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
                            <p className="text-muted-foreground mb-4">{room.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-primary">${room.price}</div>
                            <div className="text-sm text-muted-foreground">per night</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Users size={14} weight="fill" />
                            Up to {room.capacity} guests
                          </Badge>
                          {room.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline">{feature}</Badge>
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
                <CardTitle className="flex items-center gap-2">
                  <CalendarBlank size={24} weight="duotone" className="text-primary" />
                  Select Dates
                </CardTitle>
                <CardDescription>Choose your check-in and check-out dates</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={(date) => {
                    const today = startOfDay(new Date())
                    if (isBefore(date, today)) return true
                    return isDateBooked(date, selectedRoom.id)
                  }}
                  className="rounded-md border w-full"
                />
                
                {dateRange?.from && dateRange?.to && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-4 bg-muted rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Check-in:</span>
                      <span className="text-sm">{format(dateRange.from, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Check-out:</span>
                      <span className="text-sm">{format(dateRange.to, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-sm">Total nights:</span>
                      <span className="text-sm">{nights} {nights === 1 ? "night" : "nights"}</span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="guestName" className="text-sm font-medium mb-2 block">
                    Your Name *
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="guestEmail" className="text-sm font-medium mb-2 block">
                    Email Address *
                  </label>
                  <input
                    id="guestEmail"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="guestCount" className="text-sm font-medium mb-2 block">
                    Number of Guests
                  </label>
                  <input
                    id="guestCount"
                    type="number"
                    min="1"
                    max={selectedRoom.capacity}
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Max {selectedRoom.capacity} guests
                  </p>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Room type:</span>
                    <span className="font-medium">{selectedRoom.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="font-medium">${selectedRoom.price}/night</span>
                  </div>
                  {nights > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Nights:</span>
                        <span className="font-medium">{nights}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>Total:</span>
                        <span className="text-primary">${totalPrice}</span>
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
                  Confirm Booking
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Free cancellation up to 72 hours before arrival. Cash payment upon check-in.
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
          className="mt-12 p-6 bg-muted rounded-lg"
        >
          <h3 className="font-semibold text-lg mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Check-in: 2:00 PM - 11:00 PM (24-hour reception available)</li>
            <li>• Check-out: Before 11:00 AM</li>
            <li>• Cash payment only upon arrival (all local taxes included)</li>
            <li>• 72-hour advance notice required for free cancellation</li>
            <li>• Historic building with fan ventilation (no AC) - perfect for eco-conscious travelers</li>
            <li>• Shared bathroom facilities (3 bathrooms) - please plan accordingly during peak hours</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
