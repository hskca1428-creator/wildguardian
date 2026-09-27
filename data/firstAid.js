// First-aid protocols, keyed by id and referenced from each species entry
// (data/species.js) via `firstAidId`. Kept as a single source of truth so a
// correction only needs to be made once and applies everywhere it's used.
// General-public first-aid guidance, aligned with Australian Resuscitation
// Council / St John Ambulance Australia practice. This is general
// information, not a substitute for professional medical care.

export const firstAid = {
   snake_venomous_pit: {
    title: 'Suspected Venomous Snake Bite',
    steps: [
      'Call 000 immediately.',
      'Keep the person still and calm — do not let them walk.',
      'Apply a pressure bandage firmly over the bite, then bandage the whole limb from fingers or toes upward (Pressure Immobilisation Technique).',
      'Splint the limb to stop it moving, then keep the person still until paramedics arrive.',
      'If the person becomes unresponsive and is not breathing normally, start CPR.',
      'Do NOT wash the bite site — venom traces help identify the correct antivenom.',
      'Do NOT cut the wound, try to suck out venom, or apply a tourniquet.',
      'Note the time of the bite and any symptoms to tell paramedics.',
    ],
  },
  spider_pit: {
    title: 'Funnel-Web / Mouse Spider Bite',
    steps: [
      'Call 000 immediately — treat this the same as a venomous snake bite.',
      'Lie the person down and keep them still.',
      'Apply an elasticised pressure-immobilisation bandage over the bite, then extend it up the limb.',
      'Splint the limb, record the time of the bite, and wait for the ambulance.',
      'Do not wash the bite site, and do not delay emergency action to try to identify the spider.',
      'Antivenom is available and highly effective — getting to hospital quickly matters most.',
    ],
  },
  spider_redback: {
    title: 'Redback Spider Bite',
    steps: [
      'Do NOT use a pressure immobilisation bandage — for redback bites this can worsen pain without helping.',
      'Wash the site and apply a wrapped cold pack for about 15 minutes for pain relief.',
      'Seek medical care for severe or systemic symptoms — antivenom is available if needed.',
      'Call 000 if severe pain, sweating, or muscle weakness develops.',
    ],
  },
  spider_minor: {
    title: 'Minor Spider Bite (White-Tail, Huntsman, Jumping Spider)',
    steps: [
      'Wash the bite site with soap and water.',
      'Apply a cold pack to reduce pain and swelling.',
      'Monitor the area over the next day or two.',
      "See a doctor if you notice increasing redness, swelling, or any sign of infection.",
    ],
  },
  snake_nonvenomous: {
    title: 'Non-Venomous Snake Bite (Python, Tree Snake)',
    steps: [
      "These snakes aren't venomous, but a bite can still cause a puncture wound.",
      'Wash the wound thoroughly with soap and water.',
      'Apply an antiseptic and cover with a clean dressing.',
      "See a doctor if the wound is deep, won't stop bleeding, or your tetanus vaccination isn't current.",
    ],
  },
  crocodile_attack: {
    title: 'Crocodile Attack',
    steps: [
      'Call 000 immediately — this is a medical emergency.',
      'Get the person out of the water and away from the area.',
      'Control any bleeding with firm, direct pressure.',
      'Treat for shock: keep them warm, lying down if possible, and monitor breathing until help arrives.',
    ],
  },
  jellyfish_sting: {
    title: 'Box Jellyfish / Irukandji Sting',
    steps: [
      'Call 000 immediately — both can cause serious reactions.',
      'Generously douse the sting with vinegar for at least 30 seconds to deactivate any unfired stinging cells.',
      'Do NOT rub the area, rinse with fresh water, or apply a pressure bandage.',
      'If the person stops breathing or becomes unresponsive, begin CPR and continue until help arrives.',
      'Irukandji symptoms (severe pain, nausea, high blood pressure) can appear 20–30 minutes after a seemingly minor sting — seek care even if it felt mild at first.',
    ],
  },
  octopus_neurotoxic_pit: {
    title: 'Blue-Ringed Octopus Bite',
    steps: [
      'Call 000 immediately — the bite can be painless at first, but the venom can cause paralysis, including of breathing muscles.',
      'Apply the Pressure Immobilisation Technique, as for a venomous snake bite.',
      'Be ready to perform rescue breathing/CPR — this is the main life-saving measure if breathing is affected. Stay with the person until paramedics arrive.',
    ],
  },
  insect_sting_allergy_watch: {
    title: 'Bull Ant / European Wasp Sting',
    steps: [
      'Remove the stinger if visible (scrape a wasp sting out rather than pinching it).',
      'Apply a cold pack to reduce pain and swelling.',
      'An antihistamine can help with a local reaction.',
      "Call 000 immediately if there's difficulty breathing, swelling of the face or throat, dizziness, or widespread hives — signs of anaphylaxis.",
    ],
  },
  cane_toad_toxin: {
    title: 'Cane Toad Toxin Contact',
    steps: [
      "Cane toads secrete toxin from skin glands — the main risk is to pets that mouth them, but wash your hands thoroughly after handling one.",
      'If toxin contacts eyes or mouth, flush thoroughly with water and seek medical (or veterinary) attention.',
      'Never lick or eat a cane toad, and keep pets away from them.',
    ],
  },
  platypus_spur: {
    title: 'Platypus Spur Injury',
    steps: [
      'Male platypuses have a venomous spur on their hind legs that causes intense, long-lasting pain — not life-threatening, but very painful, sometimes for days or weeks.',
      'Call 000 or get to a hospital — pain relief often needs to be managed medically, sometimes with a local anaesthetic nerve block.',
      'There is no antivenom; treatment focuses on pain control.',
    ],
  },
  wildlife_bite_scratch: {
    title: 'General Wildlife Bite or Scratch',
    steps: [
      'Wash the wound thoroughly with soap and water.',
      'Apply pressure with a clean cloth to stop any bleeding.',
      'Check that your tetanus vaccination is up to date.',
      'See a doctor if the wound is deep, shows signs of infection, or came from an animal acting unusually.',
    ],
  },
  tick_attachment: {
    title: 'Attached Tick (Paralysis Tick)',
    steps: [
      'Do not squeeze, pull, or scratch at the tick — disturbing it can trigger a worse reaction.',
      'If you have no history of tick allergy, use a tick-killing ether-containing spray or freeze it to kill it in place, then leave it to drop off naturally, following current Australian Government guidance.',
      'If you have a known tick allergy, do not attempt removal yourself — seek medical care for removal.',
      'Call 000 immediately for any signs of anaphylaxis: difficulty breathing, swelling of the face or throat, dizziness, or widespread hives.',
      'Watch for tick paralysis symptoms over the following days (unsteady gait, weakness, difficulty swallowing) and seek medical care if they appear.',
    ],
  },
  stonefish_sting: {
    title: 'Stonefish Sting',
    steps: [
      'Call 000 or get to a hospital — this is one of the most painful marine stings and often needs medical treatment.',
      'Immerse the affected area in water as hot as the person can tolerate (not scalding) for pain relief — stonefish venom breaks down with heat.',
      'Do not remove any spine fragments yourself unless a professional directs you to.',
      'Antivenom is available for severe stonefish stings.',
    ],
  },
  fire_ant_sting: {
    title: 'Red Imported Fire Ant (RIFA) Sting',
    steps: [
      'Move away from the area calmly — disturbing a mound can bring many more ants at once.',
      'Wash the stung area with soap and water and apply a cold pack.',
      'Small blisters often form — do not scratch or pop them, as this raises infection risk.',
      'Call 000 immediately if there are signs of anaphylaxis (multiple stings, difficulty breathing, widespread hives, dizziness).',
      'Report the ant nest to your state biosecurity or agriculture authority — do not treat it yourself.',
    ],
  },
  bluebottle_sting: {
    title: 'Bluebottle Sting',
    steps: [
      'Carefully pick off any visible tentacles with fingers, a gloved hand, or tweezers — brief skin contact when removing them is not dangerous.',
      'Rinse the area with seawater, not fresh water.',
      "Immerse in hot water as hot as can be tolerated for as long as pain relief requires; if hot water isn't available, a cold pack also helps.",
      'Do NOT use vinegar on a bluebottle sting — vinegar is specific to tropical box jellyfish and can make a bluebottle sting worse.',
      'Seek medical help for widespread stings, a sting to the eye or mouth, or any signs of a severe allergic reaction.',
    ],
  },
};

export const EMERGENCY_NOTE =
  'This is general information, not a substitute for professional medical care. In an emergency, always call 000.';

// Shown in the footer of every safety-relevant page so the guidance is
// visibly sourced and dated, not just asserted.
export const LAST_REVIEWED = 'September 2026';

export const SOURCES = [
  { name: 'Healthdirect Australia — Snake bites', url: 'https://www.healthdirect.gov.au/snake-bites' },
  { name: 'Healthdirect Australia — Spider bites', url: 'https://www.healthdirect.gov.au/spider-bites' },
  { name: 'Healthdirect Australia — Bites and stings', url: 'https://healthdirect.gov.au/bites-and-stings' },
  {
    name: 'Better Health Channel — Bites and stings first aid',
    url: 'https://www.betterhealth.vic.gov.au/health/healthyliving/bites-and-stings-first-aid',
  },
];
