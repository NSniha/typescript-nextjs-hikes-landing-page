"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Footprints,
  Heart,
  Leaf,
  MapPin,
  Menu,
  Mountain,
  Search,
  Send,
  Share2,
  SlidersHorizontal,
  Smartphone,
  Star,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  collections,
  faqs,
  features,
  stats,
  trails,
  type Difficulty,
  type Profile,
  type Trail,
} from "@/lib/data";
import { useLocalStorage } from "@/lib/use-local-storage";
import { AnimatedNumber, Reveal } from "./motion";
import { Dialog } from "./dialog";
import { PhonePreview } from "./phone-preview";
import { TrailDialog } from "./trail-dialog";

type InfoPage = "faq" | "privacy" | "terms" | "stories" | "essentials";

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a
      className="brand"
      href="#home"
      onClick={onClick}
      aria-label="SYNTASK home"
    >
      <span className="brand-dot" />
      SYNTASK<span className="brand-mark">®</span>
    </a>
  );
}

function StoreButton({
  store,
  onClick,
}: {
  store: "apple" | "google";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="store-button"
      onClick={onClick}
      aria-label={`Get notified when the ${store === "apple" ? "iOS" : "Android"} app launches`}
    >
      {store === "apple" ? (
        <svg viewBox="0 0 24 28" aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.8 14.7c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.7 1.1-4.7 1.1-1 0-2.5-1.1-4.1-1.1-2.1 0-4 1.2-5.1 3-2.2 3.7-.5 9.2 1.6 12.3 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 4-1s2.4 1 4.1 1c1.7 0 2.8-1.5 3.8-3 1.2-1.7 1.6-3.4 1.6-3.5-.1 0-3.2-1.2-3.2-4.8ZM16.7 5.7c.8-1 1.4-2.4 1.3-3.7-1.2.1-2.7.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.6 1.3.1 2.7-.7 3.5-1.7Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 26 28" aria-hidden="true">
          <path
            fill="currentColor"
            d="M1 1v26l15-13L1 1Zm2-1 15 12 4-4L3 0Zm15 16L3 28l19-8-4-4Zm2-2 4 4c2-1 2-3 0-4l-4-2v2Z"
          />
        </svg>
      )}
      <span>
        <small>{store === "apple" ? "Download on the" : "GET IT ON"}</small>
        <strong>{store === "apple" ? "App Store" : "Google Play"}</strong>
      </span>
    </button>
  );
}

export default function HikingLanding() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("featured");
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [saved, setSaved] = useLocalStorage<string[]>("syntask:saved:v1", []);
  const [planned, setPlanned] = useLocalStorage<string[]>(
    "syntask:itinerary:v1",
    [],
  );
  const [profile, setProfile] = useLocalStorage<Profile | null>(
    "syntask:profile:v1",
    null,
  );
  const [subscribers, setSubscribers] = useLocalStorage<string[]>(
    "syntask:newsletter:v1",
    [],
  );
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [appPlatform, setAppPlatform] = useState<string | null>(null);
  const [infoPage, setInfoPage] = useState<InfoPage | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const id = new URLSearchParams(window.location.search).get("trail");
    if (id) setSelectedTrail(trails.find((t) => t.id === id) ?? null);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4200);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 769px)");
    const close = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", close);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", close);
    };
  }, [menuOpen]);

  const filtered = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const list = trails.filter(
      (trail) =>
        (category === "all" || trail.categories.includes(category)) &&
        (difficulty === "all" || trail.difficulty === difficulty) &&
        words.every((word) =>
          `${trail.name} ${trail.location} ${trail.difficulty} ${trail.categories.join(" ")}`
            .toLowerCase()
            .includes(word),
        ),
    );
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "distance") list.sort((a, b) => a.distance - b.distance);
    if (sort === "longest") list.sort((a, b) => b.distance - a.distance);
    return list;
  }, [query, category, difficulty, sort]);

  function scrollTo(id: string) {
    setMenuOpen(false);
    // Measure after filters/menu finish their React update, including in embedded previews.
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ?? 76;
      window.scrollTo({
        top: Math.max(
          0,
          target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20,
        ),
        behavior: reduce ? "instant" : "smooth",
      });
    });
  }

  function openTrail(trail: Trail) {
    setSelectedTrail(trail);
    const url = new URL(window.location.href);
    url.searchParams.set("trail", trail.id);
    window.history.replaceState(null, "", url);
  }

  function closeTrail() {
    setSelectedTrail(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("trail");
    window.history.replaceState(null, "", url);
  }

  function toggleSave(id: string) {
    const wasSaved = saved.includes(id);
    setSaved((previous) =>
      wasSaved ? previous.filter((item) => item !== id) : [...previous, id],
    );
    setToast(
      wasSaved
        ? "Hike removed from your saved list."
        : "A new adventure saved for later.",
    );
  }

  function togglePlan(id: string) {
    const exists = planned.includes(id);
    setPlanned((previous) =>
      exists ? previous.filter((item) => item !== id) : [...previous, id],
    );
    setToast(
      exists
        ? "Hike removed from your itinerary."
        : "Added to your itinerary. Something to look forward to.",
    );
  }

  function selectCollection(id: string) {
    setCategory(id);
    setQuery("");
    setSearchDraft("");
    setDifficulty("all");
    setShowFilters(true);
    requestAnimationFrame(() => scrollTo("trails"));
  }

  function clearFilters() {
    setQuery("");
    setSearchDraft("");
    setCategory("all");
    setDifficulty("all");
    setSort("featured");
  }

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    setQuery(searchDraft.trim());
    setCategory("all");
    setDifficulty("all");
    setShowFilters(true);
    scrollTo("trails");
  }

  function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = newsletterEmail.trim().toLowerCase();
    if (!subscribers.includes(email))
      setSubscribers((previous) => [...previous, email]);
    setNewsletterDone(true);
  }

  async function shareSite() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${window.location.pathname}`,
      );
      setToast("Website link copied. Share a little inspiration.");
    } catch {
      setToast("You can share this page using your browser’s address bar.");
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <Brand onClick={() => setMenuOpen(false)} />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#how-it-works">How It Works</a>
            <a href="#community">Community</a>
            <button onClick={() => setPricingOpen(true)}>Pricing</button>
          </nav>
          <div className="header-actions">
            <button
              className="saved-nav icon-button"
              aria-label={`Saved hikes, ${saved.length} saved`}
              onClick={() => setSavedOpen(true)}
            >
              <Bookmark size={17} />
              {saved.length > 0 && <span>{saved.length}</span>}
            </button>
            <button
              className="button button-white header-account"
              onClick={() => setAccountOpen(true)}
            >
              {profile ? `Hi, ${profile.name.split(" ")[0]}` : "Create Account"}
            </button>
            <button
              className="menu-button icon-button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              key="mobile"
              id="mobile-menu"
              aria-label="Mobile navigation"
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24 }}
            >
              <a href="#trails" onClick={() => setMenuOpen(false)}>
                Explore trails <ArrowUpRight size={17} />
              </a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
                How it works <ArrowUpRight size={17} />
              </a>
              <a href="#community" onClick={() => setMenuOpen(false)}>
                Community <ArrowUpRight size={17} />
              </a>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setPricingOpen(true);
                }}
              >
                Pricing <ArrowUpRight size={17} />
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setSavedOpen(true);
                }}
              >
                Saved hikes <span>{saved.length}</span>
              </button>
              <button
                className="button button-lime"
                onClick={() => {
                  setMenuOpen(false);
                  setAccountOpen(true);
                }}
              >
                {profile ? "My explorer profile" : "Create Account"}
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        <section
          className="hero"
          id="home"
          ref={heroRef}
          aria-labelledby="hero-title"
        >
          <motion.div
            className="hero-background"
            style={reduce ? undefined : { y: heroY }}
          >
            <Image
              src="/images/hero.jpg"
              alt="A peaceful hiking path beside a green forest lake"
              fill
              priority
              sizes="100vw"
              className="hero-image"
            />
          </motion.div>
          <div className="hero-shade" />
          <div className="container hero-content">
            <motion.div
              className="hero-review"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div>
                <span className="star-row" aria-label="Rated 4.5 out of 5">
                  ★★★★★
                </span>
                <span>4.5</span>
              </div>
              <p>from 1,250+ reviews</p>
            </motion.div>
            <motion.h1
              id="hero-title"
              initial={reduce ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Find The Best Hikes
              <br className="desktop-break" /> For Your Next Trip
            </motion.h1>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <form
                className="hero-search"
                role="search"
                onSubmit={submitSearch}
              >
                <Search size={19} aria-hidden="true" />
                <label className="sr-only" htmlFor="hero-search">
                  Search by city, region, or trail
                </label>
                <input
                  id="hero-search"
                  type="search"
                  placeholder="Search by city or activity"
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  maxLength={100}
                />
                <button type="submit">
                  Search <ArrowUpRight size={14} />
                </button>
              </form>
              <ul className="hero-promises">
                <li>
                  <Check />
                  Posted by community members
                </li>
                <li>
                  <Check />
                  Free platform
                </li>
                <li>
                  <Check />
                  Post your trips
                </li>
              </ul>
            </motion.div>
          </div>
          <a
            className="hero-scroll"
            href="#trails"
            aria-label="Scroll to explore trails"
          >
            <ArrowDown size={18} />
            <span>Wander a little further</span>
          </a>
          <div className="feature-strip">
            <div className="container feature-grid">
              {features.map((feature, i) => (
                <a
                  key={feature.title}
                  href={`#${feature.target}`}
                  className={`feature-item ${activeFeature === i ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveFeature(i)}
                  onFocus={() => setActiveFeature(i)}
                  onClick={() => setActiveFeature(i)}
                >
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="trails"
          className="trending-section"
          aria-labelledby="trending-title"
        >
          <Reveal className="container section-heading">
            <div>
              <p className="eyebrow">Trending hikes</p>
              <h2 id="trending-title" tabIndex={-1}>
                See what we enjoy the most
              </h2>
            </div>
            <button
              type="button"
              className="text-link"
              onClick={() => setShowFilters((value) => !value)}
              aria-expanded={showFilters}
              aria-controls="trail-filters"
            >
              {showFilters ? "Hide filters" : "See all places"}
              <ArrowUpRight size={15} />
            </button>
          </Reveal>
          <AnimatePresence>
            {(showFilters ||
              query ||
              category !== "all" ||
              difficulty !== "all") && (
              <motion.div
                id="trail-filters"
                className="container filter-wrap"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="filter-bar">
                  <div className="filter-search">
                    <Search size={17} />
                    <label htmlFor="filter-search" className="sr-only">
                      Filter trails
                    </label>
                    <input
                      id="filter-search"
                      type="search"
                      placeholder="Trail, city, or country"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <div className="select-wrap">
                    <SlidersHorizontal size={15} />
                    <label htmlFor="difficulty" className="sr-only">
                      Trail difficulty
                    </label>
                    <select
                      id="difficulty"
                      value={difficulty}
                      onChange={(e) =>
                        setDifficulty(e.target.value as Difficulty | "all")
                      }
                    >
                      <option value="all">All difficulties</option>
                      <option>Easy</option>
                      <option>Moderate</option>
                      <option>Challenging</option>
                    </select>
                    <ChevronDown size={15} />
                  </div>
                  <div className="select-wrap">
                    <label htmlFor="sort" className="sr-only">
                      Sort trails
                    </label>
                    <select
                      id="sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="featured">Featured first</option>
                      <option value="rating">Highest rated</option>
                      <option value="distance">Shortest first</option>
                      <option value="longest">Longest first</option>
                    </select>
                    <ChevronDown size={15} />
                  </div>
                  <button className="filter-reset" onClick={clearFilters}>
                    Reset <X size={14} />
                  </button>
                </div>
                <div className="filter-summary" aria-live="polite">
                  <span>
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "trail" : "trails"} to explore
                    {query && ` for “${query}”`}
                  </span>
                  {category !== "all" && (
                    <button
                      className="filter-chip"
                      onClick={() => setCategory("all")}
                    >
                      {collections.find((c) => c.id === category)?.title}
                      <X size={13} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="trail-grid">
            {filtered.map((trail, i) => (
              <Reveal
                key={trail.id}
                className="trail-reveal"
                delay={(i % 4) * 0.055}
              >
                <article className="trail-card">
                  <button
                    className="trail-open"
                    onClick={() => openTrail(trail)}
                    aria-label={`Explore ${trail.name}, ${trail.location}`}
                  >
                    <Image
                      src={trail.image}
                      alt={trail.name}
                      fill
                      sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 25vw"
                      className="trail-image"
                    />
                    <span className="trail-gradient" />
                    <span className="card-topline">
                      <span className="card-difficulty">
                        {trail.difficulty}
                      </span>
                      <span className="card-rating">
                        <Star size={12} />
                        {trail.rating}
                      </span>
                    </span>
                    <span className="trail-card-caption">
                      <span className="trail-card-name">{trail.name}</span>
                      <span className="trail-card-meta">
                        <MapPin size={12} />
                        {trail.location}
                        <span>·</span>
                        {trail.distance} km
                      </span>
                    </span>
                    <span className="hiker-avatar">
                      <Image
                        src={`/images/avatars/hiker-${trails.indexOf(trail) + 1}.jpg`}
                        alt={`Shared by ${trail.author}`}
                        fill
                        sizes="32px"
                      />
                    </span>
                    <span className="card-explore">
                      Explore trail <ArrowUpRight size={15} />
                    </span>
                  </button>
                  <button
                    className={`card-save ${saved.includes(trail.id) ? "is-saved" : ""}`}
                    onClick={() => toggleSave(trail.id)}
                    aria-label={`${saved.includes(trail.id) ? "Unsave" : "Save"} ${trail.name}`}
                    aria-pressed={saved.includes(trail.id)}
                  >
                    <Bookmark
                      size={17}
                      fill={saved.includes(trail.id) ? "currentColor" : "none"}
                    />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state container">
              <Compass size={40} />
              <h3>A different path, perhaps?</h3>
              <p>
                No trails match those filters. Try a region like “Norway” or
                explore the full collection.
              </p>
              <button className="button button-lime" onClick={clearFilters}>
                Explore all trails <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

        <section
          id="how-it-works"
          className="explore-section"
          aria-labelledby="explore-title"
        >
          <div className="container explore-layout">
            <Reveal className="explore-copy">
              <p className="eyebrow mobile-eyebrow">The world is waiting</p>
              <h2 id="explore-title">Explore Without Limits</h2>
              <p className="section-description">
                Embark on a journey to discover the world’s most captivating
                hikes with our platform. Designed for every kind of explorer,
                our site and app bring the adventure to your fingertips.
              </p>
              <ul className="check-list">
                <li>
                  <Check />
                  Plan your next hike with detailed information and user
                  reviews.
                </li>
                <li>
                  <Check />
                  Extensive collection of trails from around the globe.
                </li>
                <li>
                  <Check />
                  Experiences of a worldwide community of hikers.
                </li>
              </ul>
              <button
                className="button button-white"
                onClick={() => setAccountOpen(true)}
              >
                {profile ? "My explorer profile" : "Create Account"}
                <ArrowUpRight size={15} />
              </button>
            </Reveal>
            <div className="collection-grid">
              {collections.map((collection, i) => (
                <Reveal key={collection.id} delay={(i % 3) * 0.07}>
                  <button
                    className="collection-card"
                    onClick={() => selectCollection(collection.id)}
                    aria-label={`Explore ${collection.title.toLowerCase()} hikes`}
                  >
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      sizes="(max-width: 540px) 45vw, (max-width: 900px) 30vw, 17vw"
                    />
                    <span className="collection-gradient" />
                    <span className="collection-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                    <span className="collection-caption">
                      <strong>{collection.title}</strong>
                      <span>{collection.subtitle}</span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="the-app"
          className="app-section"
          aria-labelledby="app-title"
        >
          <div className="container">
            <div className="app-banner">
              <Reveal className="app-copy">
                <p className="eyebrow mobile-eyebrow">
                  Your next adventure, in your pocket
                </p>
                <h2 id="app-title">Your Hiking Adventures, Enhanced.</h2>
                <ul className="check-list">
                  <li>
                    <Check />
                    Never lose your way with downloadable maps accessible
                    without internet.
                  </li>
                  <li>
                    <Check />
                    Receive trail suggestions tailored to your preferences and
                    fitness level.
                  </li>
                  <li>
                    <Check />
                    Share location in real time with friends and family for
                    safety and peace of mind.
                  </li>
                </ul>
                <div className="store-buttons">
                  <StoreButton
                    store="apple"
                    onClick={() => setAppPlatform("iOS")}
                  />
                  <StoreButton
                    store="google"
                    onClick={() => setAppPlatform("Android")}
                  />
                </div>
              </Reveal>
              <Reveal className="app-preview-wrap" delay={0.12}>
                <PhonePreview onOpen={() => openTrail(trails[4])} />
              </Reveal>
            </div>
            <div
              id="community"
              className="stats-grid"
              aria-label="Our hiking community"
            >
              {stats.map((stat, i) => (
                <Reveal key={stat.label} className="stat" delay={i * 0.08}>
                  <strong className="stat-value">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </strong>
                  <h3>{stat.label}</h3>
                  <p>{stat.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mega-footer" id="footer">
        <div className="container">
          <Reveal className="footer-top">
            <div>
              <p className="eyebrow">Your next chapter starts outside</p>
              <h2>
                Good trails.
                <br />
                Great company<span className="lime">.</span>
              </h2>
            </div>
            <div className="newsletter">
              <h3>A little inspiration. A lot of fresh air.</h3>
              <p>New trails, field notes, and a gentle nudge to get outside.</p>
              <form
                onSubmit={subscribe}
                className={`newsletter-form ${newsletterDone ? "is-done" : ""}`}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    setNewsletterDone(false);
                  }}
                />
                <button type="submit" aria-label="Join the newsletter">
                  {newsletterDone ? (
                    <Check size={21} />
                  ) : (
                    <ArrowUpRight size={22} />
                  )}
                </button>
              </form>
              <p className="newsletter-note" aria-live="polite">
                {newsletterDone
                  ? "Thanks! Your signup is saved on this device for this preview."
                  : "A thoughtful note, once in a while. No spam. Just good paths."}
              </p>
            </div>
          </Reveal>
          <div className="footer-main">
            <Reveal className="footer-about">
              <Brand />
              <p>
                For the paths less taken.
                <br />
                And the people who take them.
              </p>
              <div className="footer-socials">
                <button
                  className="icon-button"
                  onClick={shareSite}
                  aria-label="Copy website link"
                >
                  <Share2 size={17} />
                </button>
                <a
                  className="icon-button"
                  href="https://www.facebook.com/sharer/sharer.php"
                  onClick={(event) => {
                    event.preventDefault();
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + window.location.pathname)}`,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  aria-label="Share this website on Facebook"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V1.4A25 25 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v8h4Z" />
                  </svg>
                </a>
                <button
                  className="icon-button"
                  onClick={() => {
                    setInfoPage("stories");
                  }}
                  aria-label="Read community stories"
                >
                  <Users size={18} />
                </button>
              </div>
            </Reveal>
            <FooterGroup
              title="Find your trail"
              links={[
                {
                  label: "Explore all hikes",
                  onClick: () => {
                    clearFilters();
                    scrollTo("trails");
                  },
                },
                {
                  label: "Scenic escapes",
                  onClick: () => selectCollection("scenic-views"),
                },
                {
                  label: "Family adventures",
                  onClick: () => selectCollection("family-trip"),
                },
                {
                  label: "A little challenge",
                  onClick: () => selectCollection("challenging"),
                },
                {
                  label: `Saved hikes${saved.length ? ` (${saved.length})` : ""}`,
                  onClick: () => setSavedOpen(true),
                },
              ]}
            />
            <FooterGroup
              title="The SYNTASK way"
              links={[
                {
                  label: "How it works",
                  onClick: () => scrollTo("how-it-works"),
                },
                {
                  label: "Our community",
                  onClick: () => scrollTo("community"),
                },
                { label: "Field notes", onClick: () => setInfoPage("stories") },
                { label: "Membership", onClick: () => setPricingOpen(true) },
                {
                  label: "Get the app",
                  onClick: () => setAppPlatform("iOS & Android"),
                },
              ]}
            />
            <FooterGroup
              title="A little guidance"
              links={[
                { label: "Help & FAQs", onClick: () => setInfoPage("faq") },
                {
                  label: "Hiking essentials",
                  onClick: () => setInfoPage("essentials"),
                },
                {
                  label: "Privacy policy",
                  onClick: () => setInfoPage("privacy"),
                },
                { label: "Terms of use", onClick: () => setInfoPage("terms") },
              ]}
            />
            <Reveal className="footer-outside" delay={0.15}>
              <div className="footer-compass">
                <Compass size={48} strokeWidth={1} />
              </div>
              <p>
                Less screen time.
                <br />
                <span>More trail time.</span>
              </p>
              <a href="#home" className="back-top" aria-label="Back to top">
                <ArrowUp size={19} />
              </a>
            </Reveal>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} SYNTASK. Made for the outside.
            </span>
            <span>
              <Leaf size={13} />
              Leave only footprints.
            </span>
            <button onClick={() => setInfoPage("privacy")}>
              Privacy & cookies <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </footer>

      {selectedTrail && (
        <TrailDialog
          trail={selectedTrail}
          saved={saved.includes(selectedTrail.id)}
          planned={planned.includes(selectedTrail.id)}
          onSave={() => toggleSave(selectedTrail.id)}
          onPlan={() => togglePlan(selectedTrail.id)}
          onClose={closeTrail}
          notify={setToast}
        />
      )}
      {accountOpen && (
        <AccountDialog
          profile={profile}
          onClose={() => setAccountOpen(false)}
          onSave={(value) => {
            setProfile(value);
            setAccountOpen(false);
            setToast(`Welcome to the trail, ${value.name.split(" ")[0]}.`);
          }}
          onSignOut={() => {
            setProfile(null);
            setAccountOpen(false);
            setToast("You’ve signed out of your local explorer profile.");
          }}
        />
      )}
      {savedOpen && (
        <Dialog
          title="Your next adventures"
          onClose={() => setSavedOpen(false)}
          className="saved-dialog"
        >
          <div className="dialog-body">
            <p className="muted">
              A little collection of places you’d rather be.{" "}
              {planned.length > 0 &&
                `${planned.length} ${planned.length === 1 ? "hike" : "hikes"} in your itinerary.`}
            </p>
            <div className="saved-list">
              {trails
                .filter((t) => saved.includes(t.id) || planned.includes(t.id))
                .map((trail) => (
                  <div className="saved-item" key={trail.id}>
                    <button
                      className="saved-item-open"
                      onClick={() => {
                        setSavedOpen(false);
                        openTrail(trail);
                      }}
                    >
                      <span className="saved-thumb">
                        <Image
                          src={trail.image}
                          alt={trail.name}
                          fill
                          sizes="90px"
                        />
                      </span>
                      <span>
                        <strong>{trail.name}</strong>
                        <small>
                          {trail.distance} km · {trail.difficulty}
                        </small>
                        {planned.includes(trail.id) && (
                          <span className="itinerary-label">
                            <Check size={11} />
                            In your itinerary
                          </span>
                        )}
                      </span>
                      <ArrowUpRight size={18} />
                    </button>
                    <button
                      className="icon-button"
                      onClick={() => {
                        if (saved.includes(trail.id))
                          setSaved((p) => p.filter((id) => id !== trail.id));
                        if (planned.includes(trail.id))
                          setPlanned((p) => p.filter((id) => id !== trail.id));
                      }}
                      aria-label={`Remove ${trail.name} from your list`}
                    >
                      <X size={17} />
                    </button>
                  </div>
                ))}
            </div>
            {saved.length === 0 && planned.length === 0 && (
              <div className="empty-state">
                <Bookmark size={35} />
                <h3>Your trail story starts here.</h3>
                <p>
                  Tap a bookmark on any hike to save a little inspiration for
                  later.
                </p>
                <button
                  className="button button-lime"
                  onClick={() => {
                    setSavedOpen(false);
                    scrollTo("trails");
                  }}
                >
                  Find my next hike <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </Dialog>
      )}
      {pricingOpen && (
        <Dialog
          title="Find your kind of adventure"
          onClose={() => setPricingOpen(false)}
          className="pricing-dialog"
        >
          <div className="dialog-body">
            <p className="muted">
              Start with a little curiosity. Exploring is always free.
            </p>
            <div className="pricing-grid">
              <div className="price-card">
                <Compass size={26} />
                <h3>Explorer</h3>
                <div className="price">
                  Free<span>forever</span>
                </div>
                <p>For a weekend well spent.</p>
                <ul className="check-list">
                  <li>
                    <Check />
                    Explore every trail
                  </li>
                  <li>
                    <Check />
                    Save your favorite hikes
                  </li>
                  <li>
                    <Check />
                    Build a personal itinerary
                  </li>
                </ul>
                <button
                  className="button button-lime"
                  onClick={() => {
                    setPricingOpen(false);
                    setAccountOpen(true);
                  }}
                >
                  Start exploring <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="price-card pro">
                <span className="subtle-label">Coming soon</span>
                <Mountain size={26} />
                <h3>Trail Pro</h3>
                <div className="price">
                  Go further<span>with the upcoming app</span>
                </div>
                <p>More possibilities, wherever you go.</p>
                <ul className="check-list">
                  <li>
                    <Check />
                    Planned offline trail maps
                  </li>
                  <li>
                    <Check />
                    Personalized recommendations
                  </li>
                  <li>
                    <Check />
                    Live adventure sharing
                  </li>
                </ul>
                <button
                  className="button button-outline"
                  onClick={() => {
                    setPricingOpen(false);
                    setAppPlatform("Trail Pro");
                  }}
                >
                  Get launch updates <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
      {appPlatform && (
        <AppDialog
          platform={appPlatform}
          onClose={() => setAppPlatform(null)}
        />
      )}
      {infoPage && (
        <InfoDialog page={infoPage} onClose={() => setInfoPage(null)} />
      )}
      <div
        className="toast-region"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              className="toast"
              key={toast}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <span className="toast-icon">
                <Check size={16} />
              </span>
              <p>{toast}</p>
              <button
                onClick={() => setToast("")}
                aria-label="Dismiss notification"
              >
                <X size={15} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; onClick: () => void }[];
}) {
  return (
    <Reveal className="footer-group" delay={0.08}>
      <h3>{title}</h3>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <button onClick={link.onClick}>
              {link.label}
              <ArrowUpRight size={12} />
            </button>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function AccountDialog({
  profile,
  onSave,
  onClose,
  onSignOut,
}: {
  profile: Profile | null;
  onSave: (p: Profile) => void;
  onClose: () => void;
  onSignOut: () => void;
}) {
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim().length < 2) return;
    onSave({ name: name.trim(), email: email.trim().toLowerCase() });
  }
  return (
    <Dialog
      title={profile ? "Your explorer profile" : "The outside is calling."}
      onClose={onClose}
    >
      <div className="dialog-body">
        <div className="welcome-icon">
          <Mountain size={32} />
        </div>
        <p className="muted">
          {profile
            ? "A familiar face, a new adventure. Update your details below."
            : "Create your explorer profile and start collecting your next adventures."}
        </p>
        <form className="stacked-form" onSubmit={submit}>
          <label htmlFor="profile-name">Your name</label>
          <input
            id="profile-name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Morgan"
          />
          <label htmlFor="profile-email">Email address</label>
          <input
            id="profile-email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <p className="small muted">
            Your profile and saved hikes stay on this device.
          </p>
          <button className="button button-lime" type="submit">
            {profile ? "Save profile" : "Let’s explore"}
            <ArrowUpRight size={17} />
          </button>
          {profile && (
            <button type="button" className="quiet-button" onClick={onSignOut}>
              Sign out of this profile
            </button>
          )}
        </form>
      </div>
    </Dialog>
  );
}

function AppDialog({
  platform,
  onClose,
}: {
  platform: string;
  onClose: () => void;
}) {
  const [signups, setSignups] = useLocalStorage<
    { email: string; platform: string }[]
  >("syntask:app-waitlist:v1", []);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <Dialog
      title={done ? "Adventure is on the horizon." : "The best is still ahead."}
      onClose={onClose}
    >
      <div className="dialog-body">
        <div className="welcome-icon">
          {done ? <Check size={30} /> : <Smartphone size={30} />}
        </div>
        {done ? (
          <>
            <h3>You’re on the preview list.</h3>
            <p className="muted">
              Your interest in {platform} has been saved on this device. We
              can’t send launch emails from this preview yet.
            </p>
            <button className="button button-lime" onClick={onClose}>
              Keep exploring <ArrowUpRight size={16} />
            </button>
          </>
        ) : (
          <>
            <p className="muted">
              We’re dreaming up a better way to explore with {platform}. Leave
              your email to save your interest in the app preview.
            </p>
            <form
              className="stacked-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  !signups.some(
                    (s) => s.email === email && s.platform === platform,
                  )
                )
                  setSignups((p) => [
                    ...p,
                    { email: email.toLowerCase().trim(), platform },
                  ]);
                setDone(true);
              }}
            >
              <label htmlFor="app-email">Email address</label>
              <input
                id="app-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                maxLength={200}
              />
              <button className="button button-lime" type="submit">
                Save my interest <Send size={16} />
              </button>
              <p className="small muted">
                App-store downloads are coming soon.
              </p>
            </form>
          </>
        )}
      </div>
    </Dialog>
  );
}

function InfoDialog({
  page,
  onClose,
}: {
  page: InfoPage;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const titles: Record<InfoPage, string> = {
    faq: "A little help for your journey",
    privacy: "Your privacy matters",
    terms: "A few ground rules",
    stories: "Notes from the outside",
    essentials: "A good day starts prepared",
  };
  return (
    <Dialog title={titles[page]} onClose={onClose} className="info-dialog">
      <div className="dialog-body prose">
        {page === "faq" && (
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq" key={faq.question}>
                <button
                  aria-expanded={expanded === i}
                  aria-controls={`faq-${i}`}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  {faq.question}
                  <ChevronDown
                    size={18}
                    className={expanded === i ? "is-rotated" : ""}
                  />
                </button>
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
        {page === "privacy" && (
          <>
            <p>
              This edition of SYNTASK stores your explorer profile, saved
              trails, itinerary, and preview signups in your browser on this
              device. It does not send these details to an application server.
            </p>
            <h3>Your choices</h3>
            <p>
              You can remove saved hikes individually and sign out of your
              profile. Clearing this website’s browser storage removes all
              locally saved data.
            </p>
            <h3>Cookies and external links</h3>
            <p>
              This project does not set analytics or advertising cookies. Social
              sharing opens an external website, whose own privacy policy
              applies. Fonts and images are served with the project.
            </p>
            <p className="small muted">
              Preview privacy notice. Update this notice if you connect a
              backend, analytics, or email service.
            </p>
          </>
        )}
        {page === "terms" && (
          <>
            <p>
              Welcome to this interactive SYNTASK landing-page preview. You can
              explore sample trails, build a local saved list, and try the
              interface for personal evaluation.
            </p>
            <h3>Trail information</h3>
            <p>
              Distances, ratings, community statistics, and route profiles are
              illustrative demo content. They are not verified navigation
              information. App capabilities shown on the landing page describe a
              planned product.
            </p>
            <h3>Your adventure</h3>
            <p>
              Check current local trail information, access rules, and
              conditions before heading out. Respect the landscape, wildlife,
              and fellow walkers.
            </p>
          </>
        )}
        {page === "stories" && (
          <>
            <p className="eyebrow">A few imagined field notes</p>
            {[
              {
                title: "The walk that became a tradition",
                text: "A short Sunday loop. A flask of coffee. No big plans. Sometimes the smallest adventures are the ones we keep coming back to.",
                icon: <Heart size={22} />,
              },
              {
                title: "A new perspective, one step at a time",
                text: "The summit was lovely. But the best part was somewhere along the way: a quiet conversation, an unexpected view, a moment with nowhere else to be.",
                icon: <Mountain size={22} />,
              },
              {
                title: "Leave a little room for wonder",
                text: "Take the scenic path home. Pause when the light changes. A good hike is less about covering ground and more about noticing what’s around you.",
                icon: <Leaf size={22} />,
              },
            ].map((story) => (
              <article className="field-note" key={story.title}>
                {story.icon}
                <div>
                  <h3>{story.title}</h3>
                  <p>{story.text}</p>
                </div>
              </article>
            ))}
          </>
        )}
        {page === "essentials" && (
          <>
            <p>
              A little preparation makes room for a much better adventure.
              Here’s a practical starting point for your day bag.
            </p>
            <ul className="essentials-list">
              {[
                "Water and a little extra food",
                "Comfortable footwear with good grip",
                "Layers and weather protection",
                "A charged phone and an offline map",
                "Sun protection and a small first-aid kit",
                "A bag for carrying your litter home",
              ].map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Choose a route that suits your experience, check the local
              forecast, and let someone know your plans.
            </p>
          </>
        )}
      </div>
    </Dialog>
  );
}
