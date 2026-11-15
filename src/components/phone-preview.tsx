"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  BatteryFull,
  Bookmark,
  Clock3,
  MapPin,
  Mountain,
  Signal,
  Star,
  Wifi,
} from "lucide-react";

export function PhonePreview({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="app-art" aria-label="Preview of the SYNTASK mobile app">
      <motion.div
        className="chat-preview"
        animate={reduce ? {} : { y: [0, -9, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      >
        <div className="chat-person">
          <span className="online-dot" />
          The weekend crew<span className="chat-count">4</span>
        </div>
        <span className="chat-time">Friday 2:00 PM</span>
        <p className="chat-bubble">What do you think about this hike? 🌲</p>
        <p className="chat-bubble sent">Already packing my bag!</p>
        <div className="chat-photos">
          <div>
            <Image
              src="/images/trails/crystal-lake.jpg"
              alt="Mountain lake shared with friends"
              fill
              sizes="140px"
            />
          </div>
          <div>
            <Image
              src="/images/trails/thunder-falls.jpg"
              alt="Forest path shared with friends"
              fill
              sizes="140px"
            />
          </div>
          <div>
            <Image
              src="/images/trails/sunset-peak.jpg"
              alt="Fjord overlook shared with friends"
              fill
              sizes="140px"
            />
          </div>
          <div>
            <Image
              src="/images/collections/family-trip.jpg"
              alt="Family hiking adventure"
              fill
              sizes="140px"
            />
            <span>+25 photos</span>
          </div>
        </div>
        <p className="chat-bubble">See you at the trailhead ☀️</p>
      </motion.div>
      <motion.button
        type="button"
        className="phone"
        onClick={onOpen}
        aria-label="Open Skyline Ridge trail details"
        whileHover={reduce ? undefined : { y: -8, rotate: -1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="phone-island" />
        <span className="phone-status">
          <span>9:41</span>
          <span>
            <Signal size={11} />
            <Wifi size={11} />
            <BatteryFull size={16} />
          </span>
        </span>
        <span className="phone-photo">
          <Image
            src="/images/trails/skyline-ridge.jpg"
            alt="Hikers below alpine mountains"
            fill
            sizes="300px"
          />
          <span className="phone-photo-nav">
            <ArrowLeft size={16} />
            <Bookmark size={16} />
          </span>
          <span className="phone-location">
            <MapPin size={11} />
            Chamonix, France
          </span>
        </span>
        <span className="phone-body">
          <strong className="phone-title">Skyline Ridge Run</strong>
          <span className="phone-meta">
            <span>
              <Clock3 size={10} />5 h 10 min
            </span>
            <span>
              <Mountain size={10} />
              920 m
            </span>
          </span>
          <span className="phone-description">
            Some paths lead to places. This one leads to a whole new
            perspective.
          </span>
          <span className="phone-tabs">
            <span>Overview</span>
            <span>Map</span>
            <span>Photos</span>
          </span>
          <span className="phone-rating">
            <span className="rating-bars">
              {[90, 73, 35].map((n, i) => (
                <span key={n}>
                  {5 - i} <Star size={7} />
                  <span style={{ width: `${n}%` }} />
                </span>
              ))}
            </span>
            <span className="phone-score">
              <strong>4.9</strong>
              <small>147 reviews</small>
            </span>
          </span>
          <span className="phone-cta">
            Let’s go outside <span>↗</span>
          </span>
        </span>
        <span className="phone-home" />
      </motion.button>
    </div>
  );
}
