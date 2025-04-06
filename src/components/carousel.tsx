// import React from 'react';
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";

// const testimonials = [
//     { id: 1, name: "John Musyoka", role: "farmer", company: "Nyeri Farmers", quote: "Field collection is so much easy now!" },
//     { id: 2, name: "Jane Atieno", role: "collector", company: "Brookside", quote: "Exceptional service and support." },
//     { id: 3, name: "Alex Wang'ombe", role: "farmer", company: "Self-employed", quote: "I can't imagine working without it now." },
// ];

// function TestimonialCarousel() {
//     return (
//         <div className="w-full  mx-auto px-4 py-16 bg-gray-100">
//             <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
//             <Carousel className="w-full">
//                 <CarouselContent>
//                     {testimonials.map((testimonial) => (
//                         <CarouselItem key={testimonial.id}>
//                             <Card className="bg-white rounded-lg shadow-md">
//                                 <CardContent className="flex flex-col items-center p-6 text-center">
//                                     <div className="w-24 h-24 mb-4 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
//                                         {testimonial.name.split(' ').map(n => n[0]).join('')}
//                                     </div>
//                                     <blockquote className="text-lg italic mb-4">"{testimonial.quote}"</blockquote>
//                                     <div>
//                                         <p className="font-semibold">{testimonial.name}</p>
//                                         <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </CarouselItem>
//                     ))}
//                 </CarouselContent>
//                 <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
//                 <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 b" />
//             </Carousel>
//         </div>
//     );
// }

// export default TestimonialCarousel;