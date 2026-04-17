import { Service } from "@/types/domain";

export const mockServices: Service[] = [
  {
    id: "svc-1",
    categoryId: "cleaning",
    title: "Full Home Deep Cleaning",
    tagline: "Ideal before guests, shifting, or festive resets",
    basePrice: 2499,
    rating: 4.8,
    durationMinutes: 210,
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    badges: ["Top Rated", "Weekend Favorite"],
    imageGallery: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
    ],
    about:
      "A structured room-by-room deep cleaning package designed for homes that need more than a quick surface refresh.",
    inclusions: [
      "Dust and stain treatment for accessible surfaces",
      "Bathroom deep cleaning and fixture polishing",
      "Kitchen degreasing of counters and visible exteriors",
    ],
    addOns: [
      { id: "addon-1", title: "Sofa shampooing", price: 599, durationMinutes: 35 },
      { id: "addon-2", title: "Balcony pressure wash", price: 349, durationMinutes: 20 },
    ],
    reviewSummary: {
      averageRating: 4.8,
      totalReviews: 1624,
      highlight: "Users love the attention to corners, kitchen cleanup quality, and punctual teams.",
    },
    providerName: "Spark & Shine Crew",
    nearbyLabel: "Available in 45-60 min",
    provider: {
      name: "Spark & Shine Crew",
      yearsActive: 5,
      completedJobs: 4200,
      arrivalPromise: "Team arrival ETA shared 30 minutes before the slot",
      highlights: ["Background-verified professionals", "Checklist-led execution", "Pet-safe product options"],
      trustBadges: ["Verified Partner", "4.8+ Consistent Rating", "On-time Arrival"],
    },
    ratingBreakdown: [
      { stars: 5, percentage: 78 },
      { stars: 4, percentage: 15 },
      { stars: 3, percentage: 4 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],
    isFeatured: true,
    isPopularNearby: true,
  },
  {
    id: "svc-2",
    categoryId: "ac",
    title: "Split AC Service & Inspection",
    tagline: "Cooling, noise, water leakage, and maintenance",
    basePrice: 699,
    rating: 4.7,
    durationMinutes: 75,
    heroImage:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    badges: ["Fast Response", "Trusted Pros"],
    imageGallery: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631549916768-4119b4123a48?auto=format&fit=crop&w=1200&q=80",
    ],
    about:
      "Inspection-led maintenance with filter cleaning, airflow check, and common issue diagnosis for split AC units.",
    inclusions: [
      "Indoor unit inspection and filter cleaning",
      "Cooling performance and airflow checks",
      "Water leakage and noise diagnosis",
    ],
    addOns: [
      { id: "addon-3", title: "Outdoor unit cleaning", price: 249, durationMinutes: 20 },
      { id: "addon-4", title: "Gas pressure check", price: 199, durationMinutes: 15 },
    ],
    reviewSummary: {
      averageRating: 4.7,
      totalReviews: 948,
      highlight: "Strong for quick diagnosis and same-day repair recommendations.",
    },
    providerName: "CoolFix Experts",
    nearbyLabel: "Slots available today",
    provider: {
      name: "CoolFix Experts",
      yearsActive: 6,
      completedJobs: 3100,
      arrivalPromise: "Same-day diagnostic slots when available",
      highlights: ["Cooling-first diagnostics", "Transparent repair recommendations", "Fast slot turnaround"],
      trustBadges: ["Trusted Pros", "Fast Response", "Service Warranty"],
    },
    ratingBreakdown: [
      { stars: 5, percentage: 71 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 6 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],
    isFeatured: true,
    isPopularNearby: true,
  },
  {
    id: "svc-3",
    categoryId: "salon",
    title: "Glow Facial & Cleanup",
    tagline: "A polished at-home self-care appointment",
    basePrice: 1199,
    rating: 4.9,
    durationMinutes: 90,
    heroImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    badges: ["Premium Care", "Best Seller"],
    imageGallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    ],
    about:
      "A self-care package combining cleanup, glow facial, and post-service care guidance with premium products.",
    inclusions: [
      "Skin prep and cleanup",
      "Glow facial with massage",
      "Post-care routine guidance",
    ],
    addOns: [
      { id: "addon-5", title: "Head massage", price: 399, durationMinutes: 20 },
      { id: "addon-6", title: "Detan pack", price: 299, durationMinutes: 15 },
    ],
    reviewSummary: {
      averageRating: 4.9,
      totalReviews: 1126,
      highlight: "Frequently praised for hygiene, technician professionalism, and noticeable results.",
    },
    providerName: "Glow Studio Partner",
    nearbyLabel: "Evening slots filling fast",
    provider: {
      name: "Glow Studio Partner",
      yearsActive: 4,
      completedJobs: 2700,
      arrivalPromise: "Therapist and product kit details shared before arrival",
      highlights: ["Hygiene-first setup", "Premium products", "High repeat-booking rate"],
      trustBadges: ["Premium Care", "Best Seller", "Highly Rated"],
    },
    ratingBreakdown: [
      { stars: 5, percentage: 84 },
      { stars: 4, percentage: 11 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ],
    isPopularNearby: true,
  },
  {
    id: "svc-4",
    categoryId: "plumbing",
    title: "Tap & Leakage Fix",
    tagline: "Quick plumbing support for common household issues",
    basePrice: 399,
    rating: 4.6,
    durationMinutes: 50,
    heroImage:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    badges: ["Quick Fix", "Budget Friendly"],
    imageGallery: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    ],
    about:
      "For dripping taps, loose fittings, and minor leakage points that need a reliable home visit.",
    inclusions: [
      "Tap and fitting inspection",
      "Leak source identification",
      "Minor tightening and replacement support",
    ],
    addOns: [
      { id: "addon-7", title: "Jet spray replacement", price: 249, durationMinutes: 15 },
    ],
    reviewSummary: {
      averageRating: 4.6,
      totalReviews: 602,
      highlight: "Best suited for common residential fixes and emergency home visits.",
    },
    providerName: "PipeCare Services",
    nearbyLabel: "Available in under 90 min",
    provider: {
      name: "PipeCare Services",
      yearsActive: 7,
      completedJobs: 3650,
      arrivalPromise: "Live partner status shared after assignment",
      highlights: ["Quick home visit coverage", "Common parts support", "Clear issue explanation"],
      trustBadges: ["Quick Fix", "Verified Partner", "Local Favorite"],
    },
    ratingBreakdown: [
      { stars: 5, percentage: 67 },
      { stars: 4, percentage: 21 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 2 },
    ],
  },
];
