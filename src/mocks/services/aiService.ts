import { mockServices } from "@/mocks/data/services";
import { simulateFailure } from "@/mocks/utils/network";
import { SmartFinderResult } from "@/types/domain";

const intentMap = [
  {
    matchers: ["ac not cooling", "ac cooling", "water leaking ac", "ac service"],
    serviceIds: ["svc-2"],
    interpretedNeed: "AC performance issue with likely maintenance or inspection need",
    addOnSuggestion: "Gas pressure check",
    bookingTip: "Choose a same-day slot and keep the outdoor unit accessible.",
  },
  {
    matchers: ["deep cleaning before guests", "need deep cleaning", "house cleaning", "move in cleaning"],
    serviceIds: ["svc-1"],
    interpretedNeed: "Full-home cleanup need before guests or a reset event",
    addOnSuggestion: "Sofa shampooing",
    bookingTip: "Morning slots work best for larger homes and quicker drying time.",
  },
  {
    matchers: ["need facial", "salon at home", "cleanup facial"],
    serviceIds: ["svc-3"],
    interpretedNeed: "At-home beauty appointment with a premium self-care package",
    addOnSuggestion: "Head massage",
    bookingTip: "Evening slots are popular, so book earlier in the day if possible.",
  },
];

export async function getSmartServiceSuggestions(query: string): Promise<SmartFinderResult> {
  const normalized = query.trim().toLowerCase();

  return simulateFailure(async () => {
    const matchedIntent =
      intentMap.find((intent) =>
        intent.matchers.some((matcher) => normalized.includes(matcher)),
      ) ?? intentMap[0];

    return {
      interpretedNeed: matchedIntent.interpretedNeed,
      suggestions: matchedIntent.serviceIds.map((serviceId) => {
        const service = mockServices.find((item) => item.id === serviceId) ?? mockServices[0];

        return {
          serviceId,
          reason: `${service.title} is the closest match for this need based on category, duration, and typical user intent.`,
          addOnSuggestion: matchedIntent.addOnSuggestion,
          bookingTip: matchedIntent.bookingTip,
        };
      }),
    };
  });
}
