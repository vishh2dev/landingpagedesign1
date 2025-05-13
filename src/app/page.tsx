"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    image: "/hero1.webp",
    subtitle: "Its Not Just a Haircut, Its an Experience.",
    title: "Being a barber is about taking care\n of the people.",
    desc: "Our barbershop is the territory created purely for males who appreciate premium quality, time and flawless look.",
  },
  {
    image: "/hero2.webp",
    subtitle: "Classic Hair Style & Shaves.",
    title: "Our hair styles\nenhances your smile.",
    desc: "Our barbershop is the territory created purely for males who appreciate premium quality, time and flawless look.",
  },
  {
    image: "/hero3.webp",
    subtitle: "Its Not Just a Haircut, Its an Experience.",
    title: "Where mens want\nto look there very best.",
    desc: "Our barbershop is the territory created purely for males who appreciate premium quality, time and flawless look.",
  },
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const totalImages = 15; // Total number of images in your site

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    // Autoplay logic
    const autoplay = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);

    // Pause autoplay on user interaction
    const onPointerDown = () => {
      clearInterval(autoplay);
    };
    emblaApi.on("pointerDown", onPointerDown);

    return () => {
      if (emblaApi) emblaApi.off("select", onSelect);
      if (emblaApi) emblaApi.off("pointerDown", onPointerDown);
      clearInterval(autoplay);
    };
  }, [emblaApi]);

  // Add image loading detection
  useEffect(() => {
    const handleImageLoad = () => {
      setIsLoading(false);
    };

    // Get all images in the document
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
      }
    });

    // Cleanup
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
      });
    };
  }, []);

  // Fallback timeout in case some images fail to load
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 5 seconds fallback

    return () => clearTimeout(fallbackTimer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <img src="/loading.gif" alt="Loading" className="w-28 h-28 object-contain" />
      </div>
    );
  }

  return (
    <>
      <section id="home" className="relative w-full min-h-screen flex items-center justify-center bg-[#262529] overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Embla Carousel viewport */}
          <div className="h-full w-full" ref={emblaRef}>
            <div className="flex h-full">
              {slides.map((slide, idx) => (
                <div
                  className="main_slide flex items-center min-h-screen bg-cover bg-center flex-[0_0_100%] relative"
                  style={{ backgroundImage: `url(${slide.image})` }}
                  key={idx}
                >
                  <div className="absolute inset-0 bg-[#262529]/20" />
                  <div className="container mx-auto h-full flex items-center relative z-10">
                    <div className="slider_content max-w-2xl text-left text-white px-4 md:pl-24 lg:pl-32">
                      <h3 className="mb-2 text-sm md:text-xl text-[#b8a898] animate-fadeInUp">{slide.subtitle}</h3>
                      <h1 className="mb-4 text-lg md:text-6xl font-serif animate-fadeInUp">
                        {slide.title.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </h1>
                      <p className="mb-6 text-base md:text-lg animate-fadeInUp">{slide.desc}</p>
                      <a
                        href="#appointment"
                        className="default_btn bg-[#a89787] text-[#262529] font-bold px-6 py-4 text-base md:text-lg hover:bg-[#b8a898] transition-colors animate-fadeInUp inline-block"
                      >
                        MAKE APPOINTMENT
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Left Arrow */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-white text-3xl md:text-4xl p-2 hidden md:block"
          onClick={() => scrollTo((selectedIndex - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
        >
          &#60;
        </button>
        {/* Right Arrow */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-white text-3xl md:text-4xl p-2 hidden md:block"
          onClick={() => scrollTo((selectedIndex + 1) % slides.length)}
          aria-label="Next slide"
        >
          &#62;
        </button>
        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors ${selectedIndex === idx ? "bg-white/80" : "bg-white/40"}`}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="w-full bg-white py-14 md:py-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4">
          {/* Left: Text and Icon */}
          <div className="flex-1 flex flex-col items-center md:items-center text-center">
            <span className="text-lg md:text-xl text-[#a89787] font-serif mb-2">Introducing</span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#a89787] mb-3 leading-tight">
            PMC Barbershop<br />Since 2018
            </h2>
            {/* About Logo Image */}
            <div className="my-3">
              <img src="/about-logo.png" alt="About Logo" className="w-32 h-32 object-contain mx-auto" />
            </div>
            <p className="text-[#6b6b6b] text-lg mb-8 max-w-xl">
            Established in 2018, PMC Barbershop has been providing premium grooming services to the men of Denton, TX. Our mission is to deliver exceptional haircuts and grooming services in a welcoming, classic barbershop environment.
            </p>
            <a href="#" className="bg-[#a89787] text-white font-bold px-6 py-2 text-base md:text-lg hover:bg-[#b8a898] transition-colors inline-block">
              MORE ABOUT US
            </a>
          </div>
          {/* Right: Overlapping Images */}
          <div className="flex-1 flex justify-center items-center relative w-full max-w-lg min-h-[340px]">
            {/* Left/back image */}
            <div className="absolute top-8 left-0 w-48 h-48 rounded-xl overflow-hidden shadow-2xl z-0">
              <img src="/hero1.webp" alt="Barber 1" className="w-full h-full object-cover" />
            </div>
            {/* Right/middle image */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-xl overflow-hidden shadow-2xl z-10">
              <img src="/hero2.webp" alt="Barber 2" className="w-full h-full object-cover" />
            </div>
            {/* Bottom/front image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 rounded-xl overflow-hidden shadow-2xl z-20">
              <img src="/hero3.webp" alt="Barber 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="w-full bg-[#f9f6f2] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xl text-[#a89787] font-serif block mb-2">Trendy Salon & Spa</span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#222] mb-4">Our Services</h2>
            <div className="flex justify-center items-center gap-4 mb-2">
              <span className="block w-16 h-px bg-[#a89787]" />
              <img src="/heading-line.png" alt="Mustache Divider" className="w-auto" />
              <span className="block w-16 h-px bg-[#a89787]" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-[0_8px_40px_0_rgba(169,151,135,0.10)] p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
              {/* Scissors SVG */}
              <img src="/scissor.webp" alt="Scissors" className="mb-4 w-12 h-12 object-contain" />
              <h3 className="text-2xl font-serif text-[#222] mb-2">Haircut Styles</h3>
              <p className="text-[#6b6b6b]">Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-[0_8px_40px_0_rgba(169,151,135,0.10)] p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
              {/* Razor SVG */}
              <img src="/razor.webp" alt="Razor" className="mb-4 w-12 h-12 object-contain" />
              <h3 className="text-2xl font-serif text-[#222] mb-2">Beard Triming</h3>
              <p className="text-[#6b6b6b]">Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-[0_8px_40px_0_rgba(169,151,135,0.10)] p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
              {/* Brush SVG */}
              <img src="/barber-shave.webp" alt="Barber Shave" className="mb-4 w-12 h-12 object-contain" />
              <h3 className="text-2xl font-serif text-[#222] mb-2">Smooth Shave</h3>
              <p className="text-[#6b6b6b]">Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-white rounded-xl shadow-[0_8px_40px_0_rgba(169,151,135,0.10)] p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
              {/* Comb SVG */}
              <img src="/face-mask.webp" alt="Face Mask" className="mb-4 w-12 h-12 object-contain" />
              <h3 className="text-2xl font-serif text-[#222] mb-2">Face Masking</h3>
              <p className="text-[#6b6b6b]">Barber is a person whose occupation is mainly to cut dress style.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Our Barbers Section */}
      <section className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xl text-[#a89787] font-serif block mb-2">Trendy Salon & Spa</span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#222] mb-4">Our Barbers</h2>
            <div className="flex justify-center items-center gap-4 mb-2">
              <span className="block w-16 h-px bg-[#a89787]" />
              <img src="/heading-line.png" alt="Mustache Divider" className="w-auto" />
              <span className="block w-16 h-px bg-[#a89787]" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {/* Barber 1 */}
            <div className="relative group w-full aspect-square overflow-hidden">
              <img src="/team-1.jpg" alt="Barber 1" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 left-0 w-full bg-[#a89787]/90 text-white text-center py-6 px-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
                <span className="text-2xl font-serif font-semibold">Jason Rodriguez</span>
                <span className="text-sm font-semibold tracking-widest mt-1">Owner & Master Barber</span>
              </div>
            </div>
            {/* Barber 2 */}
            <div className="relative group w-full aspect-square overflow-hidden">
              <img src="/team-2.jpg" alt="Barber 2" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 left-0 w-full bg-[#a89787]/90 text-white text-center py-6 px-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
                <span className="text-2xl font-serif font-semibold">Marcus Williams</span>
                <span className="text-sm font-semibold tracking-widest mt-1">Senior Barber</span>
              </div>
            </div>
            {/* Barber 3 */}
            <div className="relative group w-full aspect-square overflow-hidden">
              <img src="/team-3.jpg" alt="Barber 3" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 left-0 w-full bg-[#a89787]/90 text-white text-center py-6 px-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
                <span className="text-2xl font-serif font-semibold">Terrence Jackson</span>
                <span className="text-sm font-semibold tracking-widest mt-1">Barber & Stylist</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Appointment Section */}
      <section id="appointment" className="w-full bg-[#232328]">
        <div className="w-full flex flex-col md:flex-row min-h-[500px] md:h-[600px]">
          {/* Left: Image */}
          <div className="md:w-1/2 w-full h-[320px] md:h-full">
            <img src="/book-bg.jpg" alt="Barber Appointment" className="w-full h-full object-cover" />
          </div>
          {/* Right: Form */}
          <div className="md:w-1/2 w-full flex items-center justify-center relative px-6 py-12 md:py-0 bg-[#232328] h-full">
            {/* World map overlay (CSS) */}
            <div className="absolute inset-0 opacity-10 bg-no-repeat bg-center bg-contain pointer-events-none" />
            <div className="relative z-10 w-full max-w-xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Make an appointment</h2>
              <p className="text-[#bdbdbd] mb-8 text-lg">Barber is a person whose occupation is mainly to cut dress groom style and shave men&apos;s and boys hair.</p>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="bg-transparent border border-[#bdbdbd] text-white px-4 py-3 focus:outline-none focus:border-[#a89787] placeholder-[#bdbdbd]" />
                <input type="email" placeholder="Your Email" className="bg-transparent border border-[#bdbdbd] text-white px-4 py-3 focus:outline-none focus:border-[#a89787] placeholder-[#bdbdbd]" />
                <input type="text" placeholder="Your Phone No" className="bg-transparent border border-[#bdbdbd] text-white px-4 py-3 focus:outline-none focus:border-[#a89787] placeholder-[#bdbdbd]" />
                <input type="text" placeholder="Your Free Time" className="bg-transparent border border-[#bdbdbd] text-white px-4 py-3 focus:outline-none focus:border-[#a89787] placeholder-[#bdbdbd]" />
                <select className="bg-transparent border border-[#bdbdbd] text-white px-4 py-3 focus:outline-none focus:border-[#a89787] placeholder-[#bdbdbd] md:col-span-1 appearance-none">
                  <option value="" className="bg-[#232328]">Services</option>
                  <option value="haircut" className="bg-[#232328]">Haircut</option>
                  <option value="beard" className="bg-[#232328]">Beard Trimming</option>
                  <option value="shave" className="bg-[#232328]">Smooth Shave</option>
                  <option value="mask" className="bg-[#232328]">Face Masking</option>
                </select>
                <select className="bg-transparent border border-[#bdbdbd] text-white px-4 py-3 focus:outline-none focus:border-[#a89787] placeholder-[#bdbdbd] md:col-span-1 appearance-none">
                  <option value="" className="bg-[#232328]">Choose Barbers</option>
                  <option value="john" className="bg-[#232328]">Jason</option>
                  <option value="mike" className="bg-[#232328]">Marcus</option>
                  <option value="alex" className="bg-[#232328]">Terrence</option>
                </select>
              </form>
              <button className="mt-8 bg-[#a89787] text-white font-bold px-6 py-2 text-base md:text-lg hover:bg-[#b8a898] transition-colors w-full md:w-auto">BOOK APPOINTMENT</button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Barber Pricing Section */}
      <section className="w-full bg-[#fcf9f6] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xl text-[#a89787] font-serif block mb-2">Save 20% On Beauty Spa</span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#222] mb-4">Our Service Prices</h2>
            <div className="flex justify-center items-center gap-4 mb-2">
              <span className="block w-16 h-px bg-[#a89787]" />
              <img src="/heading-line.png" alt="Mustache Divider" className="w-auto" />
              <span className="block w-16 h-px bg-[#a89787]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Column 1: Hair Styling */}
            <div>
              <div className="flex justify-center mb-8">
                <span className="bg-[#a89787] text-white text-xl font-serif px-8 py-2 font-semibold">Hair Styling</span>
              </div>
              <div className="space-y-8">
                {/* Service 1 */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-serif text-[#222] mr-2">Hair Cut</span>
                    <span className="flex-grow border-t border-dotted border-[#a89787] mx-2" />
                    <span className="text-3xl font-serif text-[#a89787] font-bold">$8</span>
                  </div>
                  <p className="text-[#6b6b6b] text-base">Experience precision haircuts tailored to your style. Our barbers craft clean, sharp looks that suit your personality and face shape.</p>
                </div>
                {/* Service 2 */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-serif text-[#222] mr-2">Hair Styling</span>
                    <span className="flex-grow border-t border-dotted border-[#a89787] mx-2" />
                    <span className="text-3xl font-serif text-[#a89787] font-bold">$9</span>
                  </div>
                  <p className="text-[#6b6b6b] text-base">Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                </div>
                {/* Service 3 */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-serif text-[#222] mr-2">Hair Triming</span>
                    <span className="flex-grow border-t border-dotted border-[#a89787] mx-2" />
                    <span className="text-3xl font-serif text-[#a89787] font-bold">$10</span>
                  </div>
                  <p className="text-[#6b6b6b] text-base">Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                </div>
              </div>
            </div>
            {/* Column 2: Shaving */}
            <div>
              <div className="flex justify-center mb-8">
                <span className="bg-[#a89787] text-white text-xl font-serif px-8 py-2 font-semibold">Shaving</span>
              </div>
              <div className="space-y-8">
                {/* Service 1 */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-serif text-[#222] mr-2">Clean Shaving</span>
                    <span className="flex-grow border-t border-dotted border-[#a89787] mx-2" />
                    <span className="text-3xl font-serif text-[#a89787] font-bold">$8</span>
                  </div>
                  <p className="text-[#6b6b6b] text-base">Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                </div>
                {/* Service 2 */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-serif text-[#222] mr-2">Beard Triming</span>
                    <span className="flex-grow border-t border-dotted border-[#a89787] mx-2" />
                    <span className="text-3xl font-serif text-[#a89787] font-bold">$9</span>
                  </div>
                  <p className="text-[#6b6b6b] text-base">Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                </div>
                {/* Service 3 */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-serif text-[#222] mr-2">Smooth Shave</span>
                    <span className="flex-grow border-t border-dotted border-[#a89787] mx-2" />
                    <span className="text-3xl font-serif text-[#a89787] font-bold">$10</span>
                  </div>
                  <p className="text-[#6b6b6b] text-base">Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                </div>
              </div>
            </div>
            {/* Column 3: Face Masking */}
            <div>
              <div className="flex justify-center mb-8">
                <span className="bg-[#a89787] text-white text-xl font-serif px-8 py-2 font-semibold">Face Masking</span>
              </div>
              <div className="space-y-8">
                {/* Service 1 */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-serif text-[#222] mr-2">White Facial</span>
                    <span className="flex-grow border-t border-dotted border-[#a89787] mx-2" />
                    <span className="text-3xl font-serif text-[#a89787] font-bold">$8</span>
                  </div>
                  <p className="text-[#6b6b6b] text-base">Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                </div>
                {/* Service 2 */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-serif text-[#222] mr-2">Face Cleaning</span>
                    <span className="flex-grow border-t border-dotted border-[#a89787] mx-2" />
                    <span className="text-3xl font-serif text-[#a89787] font-bold">$9</span>
                  </div>
                  <p className="text-[#6b6b6b] text-base">Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                </div>
                {/* Service 3 */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-serif text-[#222] mr-2">Bright Tuning</span>
                    <span className="flex-grow border-t border-dotted border-[#a89787] mx-2" />
                    <span className="text-3xl font-serif text-[#a89787] font-bold">$10</span>
                  </div>
                  <p className="text-[#6b6b6b] text-base">Barber is a person whose occupation is mainly to cut dress groom style and shave men.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Location Section */}
      <section id="contact" className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xl text-[#a89787] font-bold block mb-2">Visit Our Shop</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#222] mb-2">Our Location</h2>
            <div className="flex justify-center">
              <img src="/heading-line.png" alt="Section Divider" className="w-auto  mb-4" />
            </div>
            <p className="text-[#6b6b6b] text-lg">Conveniently located in Denton, TX:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Map Placeholder */}
            <div className="bg-[#232328] rounded-2xl border border-[#444] flex items-center justify-center min-h-[350px] h-full overflow-hidden">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.393964479836!2d-97.1330686848136!3d33.20724598084916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864dd1b1e7e2b6e7%3A0x6e7e2b6e7e2b6e7e!2s518%20Acme%20St%20unit%20101%2C%20Denton%2C%20TX%2076205%2C%20USA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[350px] md:h-full rounded-2xl"
              ></iframe>
            </div>
            {/* Contact Info Card */}
            <div className="bg-[#232328] rounded-2xl border border-[#444] p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>
                <span className="block w-16 h-1 bg-[#a89787] rounded mb-6" />
                {/* Address */}
                <div className="flex items-start gap-4 mb-6">
                  <span className="bg-[#a89787] rounded-full p-3 flex items-center justify-center">
                    <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21c-4.418 0-8-5.373-8-9a8 8 0 1 1 16 0c0 3.627-3.582 9-8 9z" /><circle cx="12" cy="12" r="3" /></svg>
                  </span>
                  <div>
                    <div className="text-white font-bold">Address</div>
                    <div className="text-[#bdbdbd]">518 Acme St unit 101, Denton, TX 76205, United States</div>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-4 mb-8">
                  <span className="bg-[#a89787] rounded-full p-3 flex items-center justify-center">
                    <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.22.72 3.26a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c1.04.35 2.13.59 3.26.72A2 2 0 0 1 22 16.92z" /></svg>
                  </span>
                  <div>
                    <div className="text-white font-bold">Phone</div>
                    <div className="text-[#bdbdbd]">(+123) 456 789 101</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="bg-[#a89787] text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#b8a898] transition-colors">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19V6M5 12l7-7 7 7" /></svg>
                  Get Directions
                </a>
                <a href="tel:+19408081569" className="bg-[#232328] border border-[#444] text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#333] transition-colors">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.22.72 3.26a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c1.04.35 2.13.59 3.26.72A2 2 0 0 1 22 16.92z" /></svg>
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="w-full bg-[#232328] text-[#bdbdbd] pt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          {/* Logo, Description, Social */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img src="/logo.webp" alt="Barber Shop Logo" className="w-16 h-16 object-contain" />
              <span className="text-lg font-serif text-white font-bold">BARBER SHOP</span>
            </div>
            <p className="mb-6">Our barbershop is the created for men who appreciate premium quality, time and flawless look.</p>
            <div className="flex gap-4 text-xl">
              <a href="#" aria-label="Facebook" className="hover:text-[#a89787]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"></path></svg></a>
              <a href="#" aria-label="Twitter" className="hover:text-[#a89787]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-[#a89787]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"></path>
                </svg>
              </a>
            </div>
          </div>
          {/* Headquarters */}
          <div>
            <h3 className="text-xl font-serif text-white font-bold mb-4">Headquaters</h3>
            <div className="mb-2">518 Acme St unit 101, Denton, TX 76205, United States</div>
            <div className="mb-2">info@pmcbarbershop.net</div>
            <div>(+123) 456 789 101</div>
          </div>
          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-serif text-white font-bold mb-4">Opening Hours</h3>
            <div className="mb-2">Monday - Friday 11:30am - 8:00pm</div>
            <div>Saturday - Sunday 9:30am - 9:00pm</div>
          </div>
          {/* Subscribe */}
          <div>
            <h3 className="text-xl font-serif text-white font-bold mb-4">Subscribe to our contents</h3>
            <form className="flex flex-col gap-2">
              <input type="email" placeholder="Email Address..." className="bg-[#888] text-white px-4 py-3 rounded-none focus:outline-none" />
              <button type="submit" className="bg-[#a89787] text-white font-bold py-3 rounded-none hover:bg-[#b8a898] transition-colors">SUBSCRIBE</button>
            </form>
          </div>
        </div>
        <div className="border-t border-[#333] py-6 text-center text-[#bdbdbd] text-sm flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 gap-4">
          <div>© 2025 PMC Barbershop Powered by <a href="https://vishnuvdev.kleargrowth.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">VishnuDev</a></div>
          <div className="flex gap-6 font-bold">
            <a href="#home" className="hover:text-white">HOME</a>
            <a href="#about" className="hover:text-white">ABOUT</a>
            <a href="#services" className="hover:text-white">SERVICES</a>
          </div>
        </div>
      </footer>
    </>
  );
}
