"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Clock3,
  Footprints,
  MapPin,
  Mountain,
  Route,
  Share2,
  Star,
} from "lucide-react";
import { Dialog } from "./dialog";
import type { Trail } from "@/lib/data";

type Props = {
  trail: Trail;
  saved: boolean;
  planned: boolean;
  onSave: () => void;
  onPlan: () => void;
  onClose: () => void;
  notify: (message: string) => void;
};

export function TrailDialog({
  trail,
  saved,
  planned,
  onSave,
  onPlan,
  onClose,
  notify,
}: Props) {
  const [tab, setTab] = useState("Overview");

  async function share() {
    const url = new URL(window.location.href);
    url.searchParams.set("trail", trail.id);
    url.hash = "trails";
    try {
      await navigator.clipboard.writeText(url.toString());
      notify("Trail link copied. Adventure is better together.");
    } catch {
      notify("Use your browser’s address bar to copy this trail link.");
    }
  }

  return (
    <Dialog title={trail.name} className="trail-dialog" onClose={onClose}>
      <div className="trail-dialog-image">
        <Image
          src={trail.image}
          alt={`${trail.name} landscape`}
          fill
          sizes="(max-width: 740px) 100vw, 760px"
          priority
        />
        <span
          className={`difficulty difficulty-${trail.difficulty.toLowerCase()}`}
        >
          {trail.difficulty}
        </span>
      </div>
      <div className="dialog-body">
        <div className="trail-location">
          <span>
            <MapPin size={15} />
            {trail.location}
          </span>
          <span>
            <Star size={15} className="star" />
            {trail.rating} <small>({trail.reviews} reviews)</small>
          </span>
        </div>
        <div className="trail-facts">
          <div>
            <Footprints size={20} />
            <strong>{trail.distance} km</strong>
            <span>Distance</span>
          </div>
          <div>
            <Clock3 size={20} />
            <strong>{trail.duration}</strong>
            <span>Est. time</span>
          </div>
          <div>
            <Mountain size={20} />
            <strong>{trail.elevation} m</strong>
            <span>Elevation gain</span>
          </div>
          <div>
            <Route size={20} />
            <strong>Loop trail</strong>
            <span>Route type</span>
          </div>
        </div>
        <div
          className="detail-tabs"
          role="tablist"
          aria-label="Trail information"
        >
          {["Overview", "Route preview", "Reviews"].map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              id={`tab-${name.replaceAll(" ", "-")}`}
              aria-controls="trail-tabpanel"
              aria-selected={tab === name}
              onClick={() => setTab(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div
          id="trail-tabpanel"
          className="detail-tab-content"
          role="tabpanel"
          aria-labelledby={`tab-${tab.replaceAll(" ", "-")}`}
        >
          {tab === "Overview" && (
            <>
              <h3>A little outside goes a long way.</h3>
              <p>{trail.description}</p>
              <div className="trail-tip">
                <Mountain size={18} />
                <p>
                  Make a day of it. Pack water, a warm layer, and a little room
                  for the unexpected.
                </p>
              </div>
            </>
          )}
          {tab === "Route preview" && (
            <div className="route-preview">
              <svg
                viewBox="0 0 660 180"
                role="img"
                aria-label="Illustrative elevation profile, not a navigation map"
              >
                <defs>
                  <linearGradient id="elevation" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#edff00" stopOpacity=".3" />
                    <stop offset="1" stopColor="#edff00" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 150 45 133 85 140 140 90 180 107 215 66 255 84 310 30 355 49 400 27 445 70 480 61 525 108 570 116 620 141 660 144V180H0Z"
                  fill="url(#elevation)"
                />
                <path
                  d="M0 150 45 133 85 140 140 90 180 107 215 66 255 84 310 30 355 49 400 27 445 70 480 61 525 108 570 116 620 141 660 144"
                  fill="none"
                  stroke="#edff00"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="route-axis">
                <span>Start · 0 km</span>
                <span>{trail.elevation} m ascent</span>
                <span>Finish · {trail.distance} km</span>
              </div>
              <p className="muted small">
                Illustrative elevation profile. Live route navigation is planned
                for the mobile app.
              </p>
            </div>
          )}
          {tab === "Reviews" && (
            <div className="review-preview">
              <div className="review-score">
                <strong>{trail.rating}</strong>
                <span className="star-row">★★★★★</span>
                <small>{trail.reviews} community ratings</small>
              </div>
              <div>
                <h3>Leave the trail a little better.</h3>
                <p>
                  Be kind to fellow hikers, respect the wildlife, and take your
                  memories home. The review feed is part of the upcoming
                  community experience.
                </p>
                <span className="subtle-label">Community preview</span>
              </div>
            </div>
          )}
        </div>
        <div className="dialog-actions">
          <button
            className={`button ${planned ? "button-outline" : "button-lime"}`}
            onClick={onPlan}
          >
            {planned ? <Check size={17} /> : <ArrowUpRight size={17} />}
            {planned ? "Added to itinerary" : "Add to my itinerary"}
          </button>
          <button
            className="button button-outline"
            onClick={onSave}
            aria-pressed={saved}
          >
            <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
            {saved ? "Saved" : "Save hike"}
          </button>
          <button
            className="icon-button"
            onClick={share}
            aria-label="Copy trail link"
          >
            <Share2 size={19} />
          </button>
        </div>
      </div>
    </Dialog>
  );
}
