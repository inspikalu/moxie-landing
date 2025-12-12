"use client";

import { motion, useInView, type Variants, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  TrendingUp,
  Wallet,
  ArrowRight,
  ExternalLink,
  Zap,
  Shield,
  Globe,
  Layers,
  Github,
  Twitter,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";

// ============ ANIMATION VARIANTS ============

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// ============ HEADER ============

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Moxie" width={28} height={28} className="sm:w-8 sm:h-8" />
          <span className="font-semibold text-base sm:text-lg gradient-moxie-text">Moxie</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#product" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Product
          </a>
          <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Services
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a 
            href="https://github.com/ubadineke/pred-perp-dex" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://moxie-dex.vercel.app/trade" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-4 sm:px-5 py-2 text-sm font-medium flex items-center gap-2"
          >
            Launch App
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="sm:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <a 
                href="#product" 
                className="text-base py-2 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Product
              </a>
              <a 
                href="#services" 
                className="text-base py-2 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <a 
                  href="https://github.com/ubadineke/pred-perp-dex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://moxie-dex.vercel.app/trade" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2"
                >
                  Launch App
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ============ HERO SECTION ============

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Avatar/Icon */}
          <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-card border border-border shadow-sm">
              <Image src="/logo.png" alt="Moxie" width={40} height={40} className="sm:w-12 sm:h-12" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 sm:mb-6 tracking-tight"
          >
            Trade prediction<br />
            <span className="text-muted-foreground">markets,</span> with{" "}
            <span className="gradient-moxie-text">leverage.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 px-4"
          >
            The first prediction market perpetuals DEX on Solana. 
            Go long or short on real-world events with up to 50x leverage.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUp}>
            <a 
              href="https://moxie-dex.vercel.app/trade" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-base font-medium"
            >
              Start Trading
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ PARTNERS SECTION ============

function PartnersSection() {
  const partners = [
    "Solana Foundation",
    "Polymarket",
    "Jump Crypto",
    "Multicoin Capital",
    "Paradigm",
    "Y Combinator",
  ];

  return (
    <section className="py-8 sm:py-12 border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Mobile: scrolling, Desktop: flex wrap */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-12 gap-y-4">
          {partners.map((partner) => (
            <span key={partner} className="partner-logo text-foreground text-sm sm:text-base whitespace-nowrap">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PRODUCT SECTION ============

function ProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="product" ref={ref} className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed max-w-3xl mx-auto px-2">
            Collaborate with <span className="text-muted-foreground">prediction markets</span><br className="hidden sm:block" />
            to create <span className="gradient-moxie-text">impactful returns.</span>
          </p>
        </motion.div>

        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Desktop: Juxtaposition layout */}
          <div className="hidden md:block relative">
            {/* Dark mode - back */}
            <motion.div 
              className="product-image-container relative z-10"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <Image 
                src="/moxie-trade dark.png" 
                alt="Moxie Trading Interface - Dark Mode"
                width={1200}
                height={700}
                className="rounded-xl"
                priority
              />
            </motion.div>

            {/* Light mode - front overlay */}
            <motion.div 
              className="absolute top-12 right-0 lg:-right-8 w-[55%] z-20"
              initial={{ opacity: 0, x: 60, rotate: 2 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 2 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02, rotate: 0 }}
            >
              <div className="product-image-container">
                <Image 
                  src="/moxie-trade light.png" 
                  alt="Moxie Trading Interface - Light Mode"
                  width={800}
                  height={500}
                  className="rounded-xl"
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 left-4 bg-card border border-border rounded-full px-4 py-2 shadow-lg z-30">
                <span className="text-sm font-medium">Light & Dark Themes</span>
              </div>
            </motion.div>
          </div>

          {/* Mobile: Stacked layout */}
          <div className="md:hidden space-y-6">
            <motion.div 
              className="product-image-container"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
        <Image
                src="/moxie-trade dark.png" 
                alt="Moxie Trading Interface - Dark Mode"
                width={800}
                height={500}
                className="rounded-lg"
          priority
        />
            </motion.div>
            
            <motion.div 
              className="product-image-container relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image 
                src="/moxie-trade light.png" 
                alt="Moxie Trading Interface - Light Mode"
                width={800}
                height={500}
                className="rounded-lg"
              />
              {/* Badge */}
              <div className="absolute -bottom-2 left-2 bg-card border border-border rounded-full px-3 py-1 shadow-lg">
                <span className="text-xs font-medium">Light & Dark Themes</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ SERVICES SECTION ============

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const services = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Leveraged Trading",
      description: "Trade prediction markets with up to 50x leverage on real-world outcomes.",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Real Markets",
      description: "Markets sourced from Polymarket covering elections, crypto, and global events.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Settlement",
      description: "Built on Solana for sub-second transaction finality.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Non-Custodial",
      description: "Your keys, your funds. Trade directly from your wallet.",
    },
  ];

  return (
    <section id="services" ref={ref} className="py-16 sm:py-24 px-4 sm:px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-sm font-medium">
            Services
          </span>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              className="service-card card-clean p-5 sm:p-6"
            >
              <div className="service-icon w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4">
                {service.icon}
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-2 text-center">{service.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============ STATS SECTION ============

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { value: "50x", label: "Max Leverage" },
    { value: "<1s", label: "Settlement Time" },
    { value: "0.1%", label: "Trading Fee" },
    { value: "24/7", label: "Market Access" },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============ CTA SECTION ============

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Icon */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted">
            <Layers className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground" />
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
          Ready to trade<br />
          <span className="text-muted-foreground">predictions?</span>
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a 
            href="https://moxie-dex.vercel.app/trade" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-3 text-base font-medium flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            Launch App
          </a>
          <a
            href="https://github.com/ubadineke/pred-perp-dex" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full sm:w-auto px-6 sm:px-8 py-3 text-base font-medium flex items-center justify-center gap-2"
          >
            Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ============ FOOTER ============

function Footer() {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Moxie. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm flex items-center gap-1.5"
            >
              <Twitter className="w-4 h-4" />
              <span className="hidden sm:inline">Twitter</span>
            </a>
            <a 
              href="https://github.com/ubadineke/pred-perp-dex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Discord</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN PAGE ============

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PartnersSection />
      <ProductSection />
      <ServicesSection />
      <StatsSection />
      <CTASection />
      <Footer />
      </main>
  );
}
