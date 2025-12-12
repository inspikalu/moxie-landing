"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
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
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Moxie" width={32} height={32} />
          <span className="font-semibold text-lg gradient-moxie-text">Moxie</span>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#product" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Product
          </a>
          <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Services
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="btn-primary px-5 py-2 text-sm font-medium flex items-center gap-2"
          >
            Launch App
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

// ============ HERO SECTION ============

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Avatar/Icon */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border border-border shadow-sm">
              <Image src="/logo.png" alt="Moxie" width={48} height={48} />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 tracking-tight"
          >
            Trade prediction<br />
            <span className="text-muted-foreground">markets,</span> with{" "}
            <span className="gradient-moxie-text">leverage.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
          >
            The first prediction market perpetuals DEX on Solana. 
            Go long or short on real-world events with up to 50x leverage.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUp}>
            <a 
              href="#" 
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base font-medium"
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
    <section className="py-12 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((partner) => (
            <span key={partner} className="partner-logo text-foreground">
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="product" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-2xl md:text-3xl font-medium leading-relaxed max-w-3xl mx-auto">
            Collaborate with <span className="text-muted-foreground">prediction markets</span><br />
            to create <span className="gradient-moxie-text">impactful returns.</span>
          </p>
        </motion.div>

        {/* Product Images - Juxtaposition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="juxtapose-container max-w-5xl mx-auto"
        >
          {/* Dark mode - back */}
          <motion.div 
            className="juxtapose-back product-image-container"
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
            className="juxtapose-front product-image-container hidden md:block"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02, rotate: 0 }}
          >
            <Image 
              src="/moxie-trade light.png" 
              alt="Moxie Trading Interface - Light Mode"
              width={800}
              height={500}
              className="rounded-xl"
            />
            {/* Badge */}
            <div className="absolute -bottom-4 left-4 bg-card border border-border rounded-full px-4 py-2 shadow-lg">
              <span className="text-sm font-medium">Light & Dark Themes</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile - show both images stacked */}
        <div className="md:hidden mt-8">
          <motion.div 
            className="product-image-container"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Image 
              src="/moxie-trade light.png" 
              alt="Moxie Trading Interface - Light Mode"
              width={800}
              height={500}
              className="rounded-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES SECTION ============

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="services" ref={ref} className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-sm font-medium mb-4">
            Services
          </span>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              className="service-card card-clean"
            >
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "50x", label: "Max Leverage" },
    { value: "<1s", label: "Settlement Time" },
    { value: "0.1%", label: "Trading Fee" },
    { value: "24/7", label: "Market Access" },
  ];

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <div className="text-3xl md:text-4xl font-semibold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
            <Layers className="w-7 h-7 text-muted-foreground" />
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Ready to trade<br />
          <span className="text-muted-foreground">predictions?</span>
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#" 
            className="btn-primary px-8 py-3 text-base font-medium flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            Launch App
          </a>
          <a 
            href="https://docs.solana.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-8 py-3 text-base font-medium flex items-center gap-2"
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
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Moxie. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1.5"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              Discord
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
