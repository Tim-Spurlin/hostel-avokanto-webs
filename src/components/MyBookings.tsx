import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Bed, Users, Trash, Envelope } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { format, isPast, isFuture, parseISO } from "date-fns"
import { toast } from "sonner"

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

const ROOM_NAMES: Record<string, string> = {
  "private-double": "Private Double Room",
  "dorm-6": "6-Bed Mixed Dorm",
  "dorm-8": "8-Bed Mixed Dorm",
  "dorm-10": "10-Bed Mixed Dorm"
}

export function MyBookings() {
  const [bookings, setBookings] = useKV<Booking[]>("hostel-bookings", [])

  const handleCancelBooking = (bookingId: string) => {
    const booking = bookings?.find(b => b.id === bookingId)
    if (!booking) return

    const checkInDate = parseISO(booking.checkIn)
    const now = new Date()
    const hoursDiff = (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursDiff < 72) {
      toast.error("Cannot cancel within 72 hours of check-in")
      return
    }

    setBookings((currentBookings) => 
      (currentBookings || []).filter(b => b.id !== bookingId)
    )
    
    toast.success("Booking cancelled successfully", {
      description: "Free cancellation applied"
    })
  }

  const upcomingBookings = (bookings || []).filter(b => isFuture(parseISO(b.checkIn)))
  const pastBookings = (bookings || []).filter(b => isPast(parseISO(b.checkOut)))
  const activeBookings = (bookings || []).filter(b => {
    const checkIn = parseISO(b.checkIn)
    const checkOut = parseISO(b.checkOut)
    const now = new Date()
    return isPast(checkIn) && isFuture(checkOut)
  })

  if (!bookings || bookings.length === 0) {
    return (
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <Calendar size={64} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">No Bookings Yet</h2>
          <p className="text-muted-foreground mb-6">
            Start planning your stay at Hostel Avokanto
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Browse Rooms
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">My Bookings</h2>
          <p className="text-xl text-muted-foreground">
            Manage your reservations at Hostel Avokanto
          </p>
        </motion.div>

        {activeBookings.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Badge variant="default" className="bg-green-600">Active</Badge>
              Current Stay
            </h3>
            <div className="grid gap-6">
              {activeBookings.map((booking, idx) => (
                <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} idx={idx} />
              ))}
            </div>
          </div>
        )}

        {upcomingBookings.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Badge variant="secondary">Upcoming</Badge>
              Future Reservations
            </h3>
            <div className="grid gap-6">
              {upcomingBookings.map((booking, idx) => (
                <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} idx={idx} />
              ))}
            </div>
          </div>
        )}

        {pastBookings.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Badge variant="outline">Past</Badge>
              Previous Stays
            </h3>
            <div className="grid gap-6">
              {pastBookings.map((booking, idx) => (
                <BookingCard key={booking.id} booking={booking} idx={idx} isPast />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

interface BookingCardProps {
  booking: Booking
  onCancel?: (id: string) => void
  isPast?: boolean
  idx: number
}

function BookingCard({ booking, onCancel, isPast = false, idx }: BookingCardProps) {
  const checkInDate = parseISO(booking.checkIn)
  const checkOutDate = parseISO(booking.checkOut)
  const now = new Date()
  const hoursDiff = (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60)
  const canCancel = hoursDiff >= 72 && !isPast

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
    >
      <Card className={isPast ? "opacity-75" : ""}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 mb-2">
                <Bed size={24} weight="duotone" className="text-primary" />
                {ROOM_NAMES[booking.roomId] || booking.roomId}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Envelope size={16} />
                {booking.guestEmail}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${booking.totalPrice}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-sm font-medium mb-1">Guest Name</div>
              <div className="text-muted-foreground">{booking.guestName}</div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Check-in</div>
              <div className="text-muted-foreground flex items-center gap-1">
                <Calendar size={16} />
                {format(checkInDate, "MMM d, yyyy")}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Check-out</div>
              <div className="text-muted-foreground flex items-center gap-1">
                <Calendar size={16} />
                {format(checkOutDate, "MMM d, yyyy")}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Users size={14} weight="fill" />
                {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Booked {format(parseISO(booking.createdAt), "MMM d, yyyy")}
              </span>
            </div>
            
            {!isPast && onCancel && (
              <Button
                variant={canCancel ? "destructive" : "ghost"}
                size="sm"
                onClick={() => onCancel(booking.id)}
                disabled={!canCancel}
                className="flex items-center gap-2"
              >
                <Trash size={16} />
                {canCancel ? "Cancel Booking" : "Cannot Cancel"}
              </Button>
            )}
          </div>

          {!canCancel && !isPast && (
            <p className="text-xs text-muted-foreground mt-2">
              Free cancellation available up to 72 hours before check-in
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
