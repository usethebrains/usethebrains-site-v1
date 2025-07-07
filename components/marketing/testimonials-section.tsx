import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Course Creator",
      content: "usethebrains has transformed how I deliver my online courses. The white-labeling features let me maintain my brand identity, and my students love the learning experience.",
      avatar: "AJ",
    },
    {
      name: "Sarah Williams",
      role: "Community Manager",
      content: "Managing our learning community has never been easier. The analytics provide valuable insights, and the customization options allow us to create a unique experience.",
      avatar: "SW",
    },
    {
      name: "Michael Chen",
      role: "Education Entrepreneur",
      content: "I've tried several LMS platforms, but usethebrains stands out with its intuitive interface and powerful features. Our course completion rates have increased by 40%.",
      avatar: "MC",
    },
  ];

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Trusted by Educators Worldwide
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our users have to say about their experience with our platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden border bg-background shadow-sm transition-shadow hover:shadow-md h-full flex flex-col">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-6">
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}