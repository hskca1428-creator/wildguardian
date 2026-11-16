// WildGuardian does not write first-aid instructions.
//
// Every card here is a ROUTER: it tells the reader which tier of help applies
// and sends them to official Australian health sources. We deliberately do not
// author treatment steps (temperatures, durations, bandaging, removal methods).
//
// Tiers:
//   'call000'  - possible serious exposure. Call 000 first. Nothing else on
//                this page should delay that call.
//   'getHelp'  - not usually an emergency, but get advice from a real service
//                (Poisons Information Centre 13 11 26, a doctor, or a pharmacist).
//
// Every card keeps the same id it had before, so data/species.js
// (firstAidId) does not need to change.

export const HEALTHDIRECT_SNAKE = { name: 'Healthdirect — Snake bites', url: 'https://www.healthdirect.gov.au/snake-bites' };
export const HEALTHDIRECT_SPIDER = { name: 'Healthdirect — Spider bites', url: 'https://www.healthdirect.gov.au/spider-bites' };
export const HEALTHDIRECT_SEA = { name: 'Healthdirect — Sea creature bites and stings', url: 'https://www.healthdirect.gov.au/sea-creature-stings' };
export const HEALTHDIRECT_TICK = { name: 'Healthdirect — Tick bites', url: 'https://www.healthdirect.gov.au/tick-bites' };
export const HEALTHDIRECT_ANIMAL = { name: 'Healthdirect — Dog, cat, bat and human bites', url: 'https://www.healthdirect.gov.au/dog-cat-bat-and-human-bites' };
export const ASCIA_TICKS = { name: 'ASCIA — Tick allergy', url: 'https://www.allergy.org.au/ticks' };
export const QLD_BITES = { name: 'Queensland Health — Bites and stings', url: 'https://www.qld.gov.au/health/condition/accidents-injuries-and-poisonings/bites-and-stings/bites-and-stings' };
export const QLD_MARINE = { name: 'Queensland Government — Dangerous marine life', url: 'https://www.qld.gov.au/emergency/safety/dangerous-marine' };
export const NSW_SPIDERS = { name: 'NSW Poisons Information Centre — Spiders', url: 'https://www.poisonsinfo.nsw.gov.au/bites-and-stings/spiders' };
export const BETTER_HEALTH = { name: 'Better Health Channel — Bites and stings first aid', url: 'https://www.betterhealth.vic.gov.au/health/healthyliving/bites-and-stings-first-aid' };
export const FIRE_ANTS = { name: 'National Fire Ant Eradication Program — Report a sighting', url: 'https://www.fireants.org.au' };

const CALL_000 = 'Call 000 now.';
const OPERATOR = 'Stay with the person and follow the 000 operator’s instructions.';
const ANAPHYLAXIS =
  'Difficulty breathing, swelling of the face or throat, dizziness or collapse, or widespread hives after any bite or sting: call 000 immediately.';
const POISONS = 'Not sure? Poisons Information Centre: 13 11 26.';

export const firstAid = {
  // ---------- TIER 1: CALL 000 ----------
  snake_venomous_pit: {
    title: 'Possible venomous snake bite',
    tier: 'call000',
    headline: CALL_000,
    lines: [OPERATOR, 'Do not wait for symptoms, and do not try to identify the snake first.'],
    links: [HEALTHDIRECT_SNAKE, QLD_BITES],
  },
  snake_nonvenomous: {
    title: 'Any snake bite, even from a snake that looks harmless',
    tier: 'call000',
    headline: CALL_000,
    lines: [
      'A photo, an app result or a quick look cannot confirm what bit someone. Treat every snake bite as an emergency.',
      OPERATOR,
    ],
    links: [HEALTHDIRECT_SNAKE, QLD_BITES],
  },
  spider_pit: {
    title: 'Possible funnel-web or mouse spider bite',
    tier: 'call000',
    headline: CALL_000,
    lines: [OPERATOR, 'Do not delay the call to identify the spider.'],
    links: [HEALTHDIRECT_SPIDER, NSW_SPIDERS],
  },
  crocodile_attack: {
    title: 'Crocodile attack',
    tier: 'call000',
    headline: CALL_000,
    lines: [OPERATOR, 'Get away from the water’s edge. Do not go back in for a photo or to look.'],
    links: [QLD_MARINE],
  },
  jellyfish_sting: {
    title: 'Possible box jellyfish or Irukandji sting',
    tier: 'call000',
    headline: CALL_000,
    lines: [
      OPERATOR,
      'Serious symptoms can start well after a sting that seemed minor. Get help even if it feels mild.',
    ],
    links: [HEALTHDIRECT_SEA, QLD_MARINE],
  },
  octopus_neurotoxic_pit: {
    title: 'Possible blue-ringed octopus bite',
    tier: 'call000',
    headline: CALL_000,
    lines: [OPERATOR, 'The bite can be painless, so do not wait for pain before calling.'],
    links: [HEALTHDIRECT_SEA, QLD_MARINE],
  },
  stonefish_sting: {
    title: 'Possible stonefish sting',
    tier: 'call000',
    headline: CALL_000,
    lines: [OPERATOR],
    links: [HEALTHDIRECT_SEA, QLD_MARINE],
  },

  // ---------- TIER 2: GET HELP ----------
  spider_redback: {
    title: 'Redback spider bite',
    tier: 'getHelp',
    headline: 'Get medical advice. Do not wait for it to pass.',
    lines: [POISONS, ANAPHYLAXIS],
    links: [HEALTHDIRECT_SPIDER, NSW_SPIDERS],
  },
  spider_minor: {
    title: 'Spider bite (white-tail, huntsman, jumping spider)',
    tier: 'getHelp',
    headline: 'Get advice from a doctor, pharmacist or the Poisons Information Centre if you are worried or the bite is getting worse.',
    lines: [POISONS, ANAPHYLAXIS],
    links: [HEALTHDIRECT_SPIDER, NSW_SPIDERS],
  },
  insect_sting_allergy_watch: {
    title: 'Bull ant, bee or wasp sting',
    tier: 'getHelp',
    headline: 'Most single stings are painful but not dangerous. Allergic reactions are the risk.',
    lines: [ANAPHYLAXIS, POISONS],
    links: [BETTER_HEALTH, QLD_BITES],
  },
  tick_attachment: {
    title: 'Attached tick',
    tier: 'getHelp',
    headline: 'Do not guess. Follow current official tick guidance, and get medical help if you have had a tick allergy or are unsure.',
    lines: [ANAPHYLAXIS, 'Unwell in the days after a tick bite: see a doctor and mention the tick.'],
    links: [HEALTHDIRECT_TICK, ASCIA_TICKS],
  },
  bluebottle_sting: {
    title: 'Bluebottle sting',
    tier: 'getHelp',
    headline: 'Follow official bluebottle guidance. Get medical help for a sting to the eye or mouth, widespread stings, or a bad reaction.',
    lines: [ANAPHYLAXIS, POISONS],
    links: [HEALTHDIRECT_SEA, QLD_MARINE],
  },
  fire_ant_sting: {
    title: 'Red imported fire ant sting',
    tier: 'getHelp',
    headline: 'Move away from the nest, then get advice. Report the nest instead of treating it yourself.',
    lines: [ANAPHYLAXIS, POISONS],
    links: [FIRE_ANTS, BETTER_HEALTH],
  },
  platypus_spur: {
    title: 'Platypus spur injury',
    tier: 'getHelp',
    headline: 'Get medical help. The pain can be severe and usually needs medical pain relief.',
    lines: [POISONS],
    links: [HEALTHDIRECT_ANIMAL, QLD_BITES],
  },
  cane_toad_toxin: {
    title: 'Cane toad toxin contact',
    tier: 'getHelp',
    headline: 'Get advice from the Poisons Information Centre (13 11 26) or a doctor. For a pet, contact a vet.',
    lines: [ANAPHYLAXIS],
    links: [BETTER_HEALTH, QLD_BITES],
  },
  bat_bite_scratch: {
    title: 'Bat bite, scratch or saliva contact',
    tier: 'getHelp',
    headline: 'Get urgent medical advice after any bat bite, scratch or saliva contact, even if it looks minor.',
    lines: ['Do not handle a bat. Report a sick or injured bat to local wildlife authorities.', POISONS],
    links: [HEALTHDIRECT_ANIMAL, BETTER_HEALTH],
  },
  wildlife_bite_scratch: {
    title: 'Any wildlife bite or scratch',
    tier: 'getHelp',
    headline: 'Get medical advice about any bite or scratch that breaks the skin.',
    lines: [POISONS],
    links: [HEALTHDIRECT_ANIMAL, BETTER_HEALTH],
  },
};

export const EMERGENCY_NOTE =
  'WildGuardian is general information only and does not give medical advice. In an emergency, call 000.';

// Replaces the old "last reviewed" line, which could be read as clinical review.
export const GUIDANCE_NOTE =
  'WildGuardian does not write first-aid instructions. These cards point to official Australian health sources.';

export const TIER_LABEL = {
  call000: 'CALL 000 FIRST',
  getHelp: 'GET MEDICAL ADVICE',
};

// Footer source list: the official pages the cards link to.
export const SOURCES = [
  HEALTHDIRECT_SNAKE,
  HEALTHDIRECT_SPIDER,
  HEALTHDIRECT_SEA,
  HEALTHDIRECT_TICK,
  HEALTHDIRECT_ANIMAL,
  QLD_BITES,
  BETTER_HEALTH,
];
