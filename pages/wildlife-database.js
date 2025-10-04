import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, Info, ChevronRight, Filter } from 'lucide-react';

export default function WildlifeDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');

  const wildlifeData = [
    // CRITICAL RISK - Highly Venomous Snakes
    {
      id: 1,
      name: 'Eastern Brown Snake',
      scientificName: 'Pseudonaja textilis',
      risk: 'CRITICAL',
      icon: '🐍',
      location: 'Eastern & Central Australia',
      size: '1.1m - 2.4m',
      description: 'Second most venomous land snake in the world. Responsible for most snake-bite deaths in Australia.',
      identification: 'Variable brown color, slender body, round head barely distinct from neck',
      safety: 'Do NOT approach. Back away slowly. Call 000 and professional snake catcher immediately.',
      active: 'Spring to Autumn, diurnal (day active)',
      habitat: 'Grasslands, woodlands, farms, suburban areas'
    },
    {
      id: 2,
      name: 'Tiger Snake',
      scientificName: 'Notechis scutatus',
      risk: 'CRITICAL',
      icon: '🐍',
      location: 'Southern Australia, Tasmania',
      size: '1m - 2.1m',
      description: 'Highly venomous snake with potent neurotoxic venom. Can be aggressive when threatened.',
      identification: 'Banded pattern (not always present), robust build, broad head',
      safety: 'Do not approach or corner. Back away calmly. Call snake catcher. Seek immediate medical help if bitten.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Wetlands, coastal areas, grasslands, suburban gardens near water'
    },
    {
      id: 3,
      name: 'Inland Taipan',
      scientificName: 'Oxyuranus microlepidotus',
      risk: 'CRITICAL',
      icon: '🐍',
      location: 'Central Australia (rare)',
      size: '1.8m - 2.5m',
      description: 'Most venomous land snake in the world. Fortunately, very rare and shy.',
      identification: 'Color changes seasonally (olive to dark brown), small eyes, angular head',
      safety: 'Extremely dangerous if encountered. Retreat immediately. Call wildlife authorities. Medical emergency if bitten.',
      active: 'Spring to Summer, diurnal',
      habitat: 'Remote arid regions, deep soil cracks, floodplains'
    },
    {
      id: 4,
      name: 'Coastal Taipan',
      scientificName: 'Oxyuranus scutellatus',
      risk: 'CRITICAL',
      icon: '🐍',
      location: 'Northern & Eastern coastal areas',
      size: '2m - 3m',
      description: 'Third most venomous land snake. Fast-moving and can be aggressive.',
      identification: 'Light brown to dark brown, large head, pale face, reddish eyes',
      safety: 'Extremely dangerous. Do not approach. Move away slowly. Immediate medical attention required if bitten.',
      active: 'Spring to Summer, diurnal',
      habitat: 'Sugarcane fields, grasslands, coastal scrub'
    },
    {
      id: 5,
      name: 'Death Adder',
      scientificName: 'Acanthophis antarcticus',
      risk: 'CRITICAL',
      icon: '🐍',
      location: 'Eastern & Northern Australia',
      size: '40-100cm',
      description: 'Ambush predator with potent venom. Does not flee - stays still when approached.',
      identification: 'Broad triangular head, thick body, thin tail with lure tip, grey to reddish-brown',
      safety: 'Watch where you step! Does not flee. Back away carefully. Call snake catcher. Emergency if bitten.',
      active: 'Year-round, nocturnal',
      habitat: 'Woodlands, grasslands, heaths, leaf litter'
    },
    {
      id: 6,
      name: 'Mulga Snake (King Brown)',
      scientificName: 'Pseudechis australis',
      risk: 'CRITICAL',
      icon: '🐍',
      location: 'Most of mainland Australia',
      size: '1.5m - 3m',
      description: 'Largest venomous snake in Australia. Delivers large amounts of venom.',
      identification: 'Copper to dark brown, pale head, robust build',
      safety: 'Keep distance. Can be defensive. Back away slowly. Medical emergency if bitten - delivers high venom volume.',
      active: 'Spring to Autumn, diurnal/nocturnal',
      habitat: 'Diverse - woodlands, grasslands, deserts, floodplains'
    },
    
    // CRITICAL RISK - Highly Venomous Spiders
    {
      id: 7,
      name: 'Sydney Funnel-Web Spider',
      scientificName: 'Atrax robustus',
      risk: 'CRITICAL',
      icon: '🕷️',
      location: 'Sydney region, NSW',
      size: '1-5cm body length',
      description: 'Highly aggressive and dangerously venomous. Males are more dangerous than females.',
      identification: 'Large, glossy black/dark brown, thick legs, aggressive behavior when threatened',
      safety: 'Keep clear. Call pest control immediately. Keep pets and children inside. Seek medical attention if bitten.',
      active: 'Summer, more active after rain',
      habitat: 'Moist, sheltered areas, under rocks, in burrows, gardens'
    },
    {
      id: 8,
      name: 'Tree-Dwelling Funnel-Web',
      scientificName: 'Hadronyche species',
      risk: 'CRITICAL',
      icon: '🕷️',
      location: 'Eastern Australia',
      size: '2-5cm body length',
      description: 'Similar venom to Sydney funnel-web. Found in trees and elevated areas.',
      identification: 'Dark brown to black, large fangs, builds sheet web in tree hollows',
      safety: 'Dangerous if encountered in trees or firewood. Handle wood carefully. Antivenom available. Medical emergency.',
      active: 'Year-round, nocturnal',
      habitat: 'Tree hollows, under bark, elevated structures'
    },

    // HIGH RISK
    {
      id: 9,
      name: 'Redback Spider',
      scientificName: 'Latrodectus hasselti',
      risk: 'HIGH',
      icon: '🕷️',
      location: 'All of Australia',
      size: '3-10mm body length',
      description: 'Common venomous spider found in urban areas. Females have distinctive red stripe.',
      identification: 'Black body with red/orange stripe on abdomen, females larger and more venomous',
      safety: 'Avoid contact. Safe to observe from distance. Consider professional pest control. Antivenom available.',
      active: 'Year-round, nocturnal',
      habitat: 'Dark, dry sheltered spots - sheds, mailboxes, garden furniture, toilets'
    },
    {
      id: 10,
      name: 'Red-Bellied Black Snake',
      scientificName: 'Pseudechis porphyriacus',
      risk: 'HIGH',
      icon: '🐍',
      location: 'Eastern Australia',
      size: '1.2m - 2m',
      description: 'Venomous but generally not aggressive. Less dangerous than brown snakes.',
      identification: 'Glossy black upper body, bright red/pink belly, cream/pink snout',
      safety: 'Keep distance. Usually retreats if given space. Medical attention needed if bitten but rarely fatal.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Near water - creeks, dams, wetlands, suburban water features'
    },
    {
      id: 11,
      name: 'Mouse Spider',
      scientificName: 'Missulena species',
      risk: 'HIGH',
      icon: '🕷️',
      location: 'All of Australia',
      size: '1-3cm body length',
      description: 'Potentially dangerous venom similar to funnel-web. Rarely aggressive.',
      identification: 'Large, bulky body, glossy head, males often colorful (red heads)',
      safety: 'Avoid handling. Bite can be serious. Funnel-web antivenom effective. Seek medical attention.',
      active: 'Wet season, males wander in search of females',
      habitat: 'Burrows in ground, banks, under rocks'
    },

    // MEDIUM RISK
    {
      id: 12,
      name: 'White-Tailed Spider',
      scientificName: 'Lampona species',
      risk: 'MEDIUM',
      icon: '🕷️',
      location: 'Southern & Eastern Australia',
      size: '12-18mm body length',
      description: 'Wandering spider, does not build webs. Bite can cause local pain and swelling.',
      identification: 'Dark reddish to grey body, distinctive white tip on abdomen, cigar-shaped',
      safety: 'Avoid handling. Bite causes localized pain/swelling. Clean wound, apply ice, seek medical advice if symptoms worsen.',
      active: 'Year-round, nocturnal',
      habitat: 'Inside homes, gardens, under bark, in leaf litter'
    },
    {
      id: 13,
      name: 'Australian Magpie',
      scientificName: 'Gymnorhina tibicen',
      risk: 'MEDIUM',
      icon: '🐦',
      location: 'All of Australia',
      size: '37-43cm',
      description: 'Territorial bird, especially during breeding season. Can swoop to protect nests.',
      identification: 'Black and white plumage, melodious call, red eyes in adults',
      safety: 'Avoid nesting areas during breeding season (Aug-Oct). Wear hat/helmet. Make eye contact. Protected species.',
      active: 'Year-round, diurnal (aggressive Aug-Oct)',
      habitat: 'Parks, gardens, sports fields, urban areas'
    },
    {
      id: 14,
      name: 'Lace Monitor',
      scientificName: 'Varanus varius',
      risk: 'MEDIUM',
      icon: '🦎',
      location: 'Eastern Australia',
      size: '1.5-2m',
      description: 'Large goanna, can climb trees. Usually shy but may defend itself if cornered.',
      identification: 'Dark with cream/yellow bands, long neck, forked tongue, powerful claws',
      safety: 'Keep distance. Can bite and scratch if threatened. Usually flees. Protected species. Contact wildlife rescue if needed.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Forests, woodlands, coastal areas, campgrounds'
    },
    {
      id: 15,
      name: 'Eastern Grey Kangaroo',
      scientificName: 'Macropus giganteus',
      risk: 'MEDIUM',
      icon: '🦘',
      location: 'Eastern Australia',
      size: '1-2.3m tall',
      description: 'Large marsupial, usually shy but can be aggressive if cornered or with young.',
      identification: 'Grey-brown fur, powerful hind legs, long tail, large ears',
      safety: 'Keep distance (10m+). Do not feed or approach. Can be dangerous if cornered. Contact wildlife rescue if injured.',
      active: 'Dawn/dusk, crepuscular',
      habitat: 'Grasslands, open forests, golf courses, suburban edges'
    },
    {
      id: 16,
      name: 'Red Kangaroo',
      scientificName: 'Macropus rufus',
      risk: 'MEDIUM',
      icon: '🦘',
      location: 'Inland Australia',
      size: 'Up to 2m tall',
      description: 'Largest marsupial. Males can be aggressive, especially in drought conditions.',
      identification: 'Males rusty red, females blue-grey, muscular build, long pointed ears',
      safety: 'Maintain safe distance. Males can be dangerous. Do not corner or provoke. Can kick with powerful hind legs.',
      active: 'Dawn/dusk, crepuscular',
      habitat: 'Arid and semi-arid inland regions, grasslands'
    },
    {
      id: 17,
      name: 'Cassowary',
      scientificName: 'Casuarius casuarius',
      risk: 'MEDIUM',
      icon: '🦜',
      location: 'Far North Queensland',
      size: '1.5-2m tall',
      description: 'Large flightless bird with powerful legs and sharp claws. Can be dangerous if threatened.',
      identification: 'Black plumage, blue/purple neck, distinctive helmet (casque), red wattles',
      safety: 'Keep 10m+ distance. Do not feed. Back away if approached. Can kick with dagger-like claws. Endangered - report sightings.',
      active: 'Year-round, diurnal',
      habitat: 'Tropical rainforests, nearby beaches'
    },
    {
      id: 18,
      name: 'Saltwater Crocodile',
      scientificName: 'Crocodylus porosus',
      risk: 'CRITICAL',
      icon: '🐊',
      location: 'Northern Australia',
      size: '3-7m',
      description: 'Largest living reptile. Extremely dangerous apex predator.',
      identification: 'Massive size, broad snout, armored skin, olive/grey color',
      safety: 'NEVER enter water in croc territory. Keep 50m+ from water\'s edge. Obey all warning signs. Potentially fatal.',
      active: 'Year-round, opportunistic',
      habitat: 'Rivers, estuaries, coastal areas, sometimes open ocean'
    },
    {
      id: 19,
      name: 'Freshwater Crocodile',
      scientificName: 'Crocodylus johnstoni',
      risk: 'MEDIUM',
      icon: '🐊',
      location: 'Northern Australia',
      size: '1.5-3m',
      description: 'Smaller than saltwater crocs. Less aggressive but can still bite if provoked.',
      identification: 'Narrow snout, smaller size, lighter color than saltwater crocs',
      safety: 'Do not swim in known croc waters. Keep distance. Can bite if cornered or protecting nest.',
      active: 'Year-round, more active wet season',
      habitat: 'Freshwater rivers, billabongs, wetlands'
    },
    {
      id: 20,
      name: 'Dingo',
      scientificName: 'Canis lupus dingo',
      risk: 'MEDIUM',
      icon: '🐕',
      location: 'Most of Australia',
      size: '50-60cm tall',
      description: 'Wild dog. Generally shy but can be dangerous, especially in packs or if habituated to humans.',
      identification: 'Sandy/golden coat (sometimes black/tan), erect ears, bushy tail',
      safety: 'Do not feed. Keep children close. Store food securely. Can be aggressive if protecting pups or food.',
      active: 'Dawn/dusk, crepuscular',
      habitat: 'Forests, grasslands, deserts, coastal areas'
    },

    // LOW RISK - Harmless/Beneficial
    {
      id: 21,
      name: 'Carpet Python',
      scientificName: 'Morelia spilota',
      risk: 'LOW',
      icon: '🐍',
      location: 'Northern & Eastern Australia',
      size: '2m - 4m',
      description: 'Non-venomous constrictor. Generally docile but can bite if threatened. Protected species.',
      identification: 'Distinctive carpet-like pattern, thick body, can be various colors',
      safety: 'Keep pets and children away but not dangerous to humans. Usually moves on naturally. Do not relocate without permit.',
      active: 'Year-round, nocturnal',
      habitat: 'Trees, roofs, woodpiles, suburban areas'
    },
    {
      id: 22,
      name: 'Green Tree Snake',
      scientificName: 'Dendrelaphis punctulatus',
      risk: 'LOW',
      icon: '🐍',
      location: 'Northern & Eastern Australia',
      size: '1-2m',
      description: 'Non-venomous tree-dwelling snake. Harmless to humans, beneficial pest control.',
      identification: 'Bright green or blue (sometimes yellow), slender body, large eyes',
      safety: 'Completely harmless. Do not harm - protected and beneficial. Let it move on naturally.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Trees, shrubs, gardens, near water'
    },
    {
      id: 23,
      name: 'Blue-Tongue Lizard',
      scientificName: 'Tiliqua scincoides',
      risk: 'LOW',
      icon: '🦎',
      location: 'Eastern Australia',
      size: '30-60cm',
      description: 'Harmless and beneficial reptile. Eats garden pests like snails and slugs. Protected species.',
      identification: 'Distinctive blue tongue, silvery-grey body with dark bands, stumpy tail',
      safety: 'Completely harmless to humans. Beneficial for gardens. Let it pass through naturally. Protected - do not harm.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Gardens, bushland, suburban areas'
    },
    {
      id: 24,
      name: 'Bearded Dragon',
      scientificName: 'Pogona species',
      risk: 'LOW',
      icon: '🦎',
      location: 'Most of Australia',
      size: '30-60cm',
      description: 'Harmless lizard with distinctive "beard" display. Popular as pets. Protected in wild.',
      identification: 'Spiky scales around throat (beard), grey to brown, flattens body when threatened',
      safety: 'Harmless to humans. May puff up beard as defense but won\'t attack. Protected species.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Woodlands, scrublands, deserts, rocky areas'
    },
    {
      id: 25,
      name: 'Common Brushtail Possum',
      scientificName: 'Trichosurus vulpecula',
      risk: 'LOW',
      icon: '🦡',
      location: 'All of Australia',
      size: '32-58cm + tail',
      description: 'Protected nocturnal marsupial. Common in urban areas. Can be noisy in roofs.',
      identification: 'Grey/brown fur, bushy tail, pink nose, large round ears',
      safety: 'Harmless and beneficial. Do not feed or relocate without permit. Protected species. Can scratch/bite if cornered.',
      active: 'Year-round, nocturnal',
      habitat: 'Tree hollows, roofs, gardens, urban areas'
    },
    {
      id: 26,
      name: 'Ringtail Possum',
      scientificName: 'Pseudocheirus peregrinus',
      risk: 'LOW',
      icon: '🦡',
      location: 'Eastern Australia',
      size: '30-35cm + tail',
      description: 'Smaller than brushtail, more timid. Protected species. Builds dreys (nests).',
      identification: 'Grey-brown fur, white belly, curled prehensile tail with white tip',
      safety: 'Shy and harmless. Protected species. Do not disturb nests. Will not approach humans.',
      active: 'Year-round, nocturnal',
      habitat: 'Trees, dense vegetation, gardens'
    },
    {
      id: 27,
      name: 'Sugar Glider',
      scientificName: 'Petaurus breviceps',
      risk: 'LOW',
      icon: '🐿️',
      location: 'Eastern & Northern Australia',
      size: '16-21cm + tail',
      description: 'Small gliding marsupial. Harmless and cute. Protected species.',
      identification: 'Grey with black stripe on back, gliding membrane, large eyes, bushy tail',
      safety: 'Completely harmless. Protected species. Do not attempt to catch or keep as pet.',
      active: 'Year-round, nocturnal',
      habitat: 'Eucalypt forests, woodlands, tree hollows'
    },
    {
      id: 28,
      name: 'Huntsman Spider',
      scientificName: 'Sparassidae family',
      risk: 'LOW',
      icon: '🕷️',
      location: 'All of Australia',
      size: '2-3cm body, 15cm leg span',
      description: 'Large, fast-moving spider. Looks scary but relatively harmless. Eats household pests.',
      identification: 'Large, flat body, long legs spread sideways, brown/grey color',
      safety: 'Generally harmless. May bite if handled roughly (painful but not dangerous). Beneficial - eats cockroaches and flies.',
      active: 'Year-round, nocturnal',
      habitat: 'Houses, sheds, tree bark, under rocks'
    },
    {
      id: 29,
      name: 'Jumping Spider',
      scientificName: 'Salticidae family',
      risk: 'LOW',
      icon: '🕷️',
      location: 'All of Australia',
      size: '5-15mm',
      description: 'Small, intelligent spider with excellent vision. Harmless and curious.',
      identification: 'Compact body, large forward-facing eyes, often colorful, jumps to catch prey',
      safety: 'Completely harmless to humans. Fascinating to observe. Beneficial pest control.',
      active: 'Year-round, diurnal',
      habitat: 'Gardens, walls, windows, vegetation'
    },
    {
      id: 30,
      name: 'Kookaburra',
      scientificName: 'Dacelo species',
      risk: 'LOW',
      icon: '🐦',
      location: 'Eastern & Southern Australia',
      size: '39-42cm',
      description: 'Iconic Australian bird famous for its laughing call. Carnivorous, eats snakes and lizards.',
      identification: 'Large head, stout bill, white/cream underside, brown wings, distinctive laughing call',
      safety: 'Harmless to humans. May swoop for food but not aggressive. Do not feed. Protected species.',
      active: 'Year-round, diurnal',
      habitat: 'Eucalypt forests, woodlands, parks, suburban areas'
    },
    {
      id: 31,
      name: 'Laughing Kookaburra',
      scientificName: 'Dacelo novaeguineae',
      risk: 'LOW',
      icon: '🐦',
      location: 'Eastern Australia',
      size: '40-47cm',
      description: 'Largest kingfisher. Known for loud laughing call at dawn and dusk.',
      identification: 'Brown wings with blue patches, cream underparts, large beak, laughing territorial call',
      safety: 'Completely harmless. May take food from hands. Protected species. Popular garden visitor.',
      active: 'Year-round, diurnal',
      habitat: 'Woodlands, gardens, parks, near water'
    },
    {
      id: 32,
      name: 'Sulphur-Crested Cockatoo',
      scientificName: 'Cacatua galerita',
      risk: 'LOW',
      icon: '🦜',
      location: 'Eastern & Northern Australia',
      size: '45-55cm',
      description: 'Large white parrot with yellow crest. Can be noisy and destructive to property.',
      identification: 'White plumage, yellow crest, black beak, loud screeching call',
      safety: 'Generally harmless but can bite if handled. Can damage property (wood, wiring). Protected species.',
      active: 'Year-round, diurnal',
      habitat: 'Woodlands, urban areas, farmlands, parks'
    },
    {
      id: 33,
      name: 'Rainbow Lorikeet',
      scientificName: 'Trichoglossus moluccanus',
      risk: 'LOW',
      icon: '🦜',
      location: 'Eastern Australia',
      size: '25-30cm',
      description: 'Colorful parrot, feeds on nectar. Can be very noisy in large flocks.',
      identification: 'Rainbow colored plumage - blue head, green wings, red/yellow chest',
      safety: 'Harmless but can bite if handled. Very noisy. Do not feed bread (causes disease). Protected species.',
      active: 'Year-round, diurnal',
      habitat: 'Coastal areas, rainforests, gardens, urban areas'
    },
    {
      id: 34,
      name: 'Australian White Ibis',
      scientificName: 'Threskiornis molucca',
      risk: 'LOW',
      icon: '🦩',
      location: 'All coastal Australia',
      size: '65-75cm',
      description: 'Common in urban areas. Nicknamed "bin chicken" due to scavenging habits.',
      identification: 'White plumage, black head and neck, long curved beak',
      safety: 'Harmless to humans. Can be bold around food. Do not feed. Protected species.',
      active: 'Year-round, diurnal',
      habitat: 'Parks, wetlands, rubbish bins, urban areas'
    },
    {
      id: 35,
      name: 'Echidna',
      scientificName: 'Tachyglossus aculeatus',
      risk: 'LOW',
      icon: '🦔',
      location: 'All of Australia',
      size: '30-45cm',
      description: 'Egg-laying mammal covered in spines. Harmless, eats ants and termites.',
      identification: 'Covered in spines, long snout, short legs, rolls into ball when threatened',
      safety: 'Completely harmless. Do not handle (spines can prick). Protected species. Leave undisturbed.',
      active: 'Year-round, diurnal',
      habitat: 'Forests, woodlands, grasslands, suburban areas'
    },
    {
      id: 36,
      name: 'Wombat',
      scientificName: 'Vombatus ursinus',
      risk: 'MEDIUM',
      icon: '🐻',
      location: 'Southeastern Australia',
      size: '80-120cm',
      description: 'Stocky burrowing marsupial. Can be aggressive if cornered, especially with young.',
      identification: 'Barrel-shaped, short legs, stubby tail, brown fur, powerful claws',
      safety: 'Keep distance. Can bite and scratch if threatened. Do not approach burrows. Protected species.',
      active: 'Year-round, nocturnal/crepuscular',
      habitat: 'Forests, mountains, grasslands, burrows'
    },
    {
      id: 37,
      name: 'Koala',
      scientificName: 'Phascolarctos cinereus',
      risk: 'LOW',
      icon: '🐨',
      location: 'Eastern Australia',
      size: '60-85cm',
      description: 'Tree-dwelling marsupial. Usually docile but can scratch if handled. Protected species.',
      identification: 'Grey fur, large fluffy ears, no tail, climbs eucalyptus trees',
      safety: 'Do not approach or handle. Can scratch and bite if threatened. Protected species. Report injured koalas.',
      active: 'Year-round, sleeps 18-22 hours/day',
      habitat: 'Eucalypt forests, woodlands'
    },
    {
      id: 38,
      name: 'Flying Fox (Fruit Bat)',
      scientificName: 'Pteropus species',
      risk: 'MEDIUM',
      icon: '🦇',
      location: 'Northern & Eastern Australia',
      size: 'Wingspan up to 1.5m',
      description: 'Large fruit-eating bat. Can carry diseases including lyssavirus (rabies-like).',
      identification: 'Large bat, fox-like face, dark wings, roosts in large colonies',
      safety: 'NEVER handle - can carry lyssavirus. If bitten/scratched seek immediate medical attention. Protected species.',
      active: 'Year-round, nocturnal',
      habitat: 'Rainforests, urban areas, camps in trees'
    },
    {
      id: 39,
      name: 'Platypus',
      scientificName: 'Ornithorhynchus anatinus',
      risk: 'LOW',
      icon: '🦆',
      location: 'Eastern Australia',
      size: '40-50cm',
      description: 'Unique egg-laying mammal. Males have venomous spurs on hind legs.',
      identification: 'Duck bill, beaver tail, webbed feet, brown fur',
      safety: 'Do not handle - males have venomous ankle spurs. Extremely shy. Protected species. Observe from distance.',
      active: 'Year-round, crepuscular',
      habitat: 'Freshwater rivers, streams, lakes'
    },
    {
      id: 40,
      name: 'Tasmanian Devil',
      scientificName: 'Sarcophilus harrisii',
      risk: 'MEDIUM',
      icon: '😈',
      location: 'Tasmania only',
      size: '50-80cm',
      description: 'Largest carnivorous marsupial. Can be aggressive, powerful bite.',
      identification: 'Black fur, white chest markings, large head, powerful jaws, loud screech',
      safety: 'Keep distance. Can bite with extreme force. Do not approach. Protected - endangered species.',
      active: 'Year-round, nocturnal',
      habitat: 'Forests, coastal scrub (Tasmania only)'
    },
    {
      id: 41,
      name: 'Eastern Water Dragon',
      scientificName: 'Intellagama lesueurii',
      risk: 'LOW',
      icon: '🦎',
      location: 'Eastern Australia',
      size: '60-90cm',
      description: 'Large water-loving lizard. Harmless, often seen sunbaking near water.',
      identification: 'Grey/brown with dark bands, crest along back, long tail',
      safety: 'Harmless to humans. May scratch if handled. Protected species. Popular in parks near water.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Rivers, creeks, lakes, urban waterways'
    },
    {
      id: 42,
      name: 'Frilled Lizard',
      scientificName: 'Chlamydosaurus kingii',
      risk: 'LOW',
      icon: '🦎',
      location: 'Northern Australia',
      size: '70-95cm',
      description: 'Famous for large frill display. Harmless, runs on hind legs when scared.',
      identification: 'Large frill around neck (expands when threatened), grey/brown, bipedal runner',
      safety: 'Completely harmless. Defensive display only. Protected species.',
      active: 'Wet season, diurnal',
      habitat: 'Tropical woodlands, savannas'
    },
    {
      id: 43,
      name: 'Shingleback Lizard',
      scientificName: 'Tiliqua rugosa',
      risk: 'LOW',
      icon: '🦎',
      location: 'Southern Australia',
      size: '30-40cm',
      description: 'Short-tailed skink with armored scales. Very slow-moving, harmless.',
      identification: 'Stumpy tail resembles head, rough overlapping scales, dark with cream spots',
      safety: 'Completely harmless. Slow-moving. Protected species. Popular in gardens.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Woodlands, mallee, grasslands, suburban areas'
    },
    {
      id: 44,
      name: 'Common Garden Skink',
      scientificName: 'Lampropholis guichenoti',
      risk: 'LOW',
      icon: '🦎',
      location: 'Eastern Australia',
      size: '8-12cm',
      description: 'Tiny harmless lizard, very common in gardens. Eats insects.',
      identification: 'Small, slim, brown/grey with pale stripe, quick movements',
      safety: 'Completely harmless. Beneficial pest control. Protected species.',
      active: 'Year-round, diurnal',
      habitat: 'Gardens, lawns, rockeries, woodpiles'
    },
    {
      id: 45,
      name: 'Green Tree Frog',
      scientificName: 'Litoria caerulea',
      risk: 'LOW',
      icon: '🐸',
      location: 'Northern & Eastern Australia',
      size: '8-11cm',
      description: 'Large friendly frog. Harmless, often found in homes and toilets.',
      identification: 'Bright green (sometimes brown), large toe pads, white stripe along jaw',
      safety: 'Completely harmless. Beneficial - eats mosquitoes. Can be handled gently.',
      active: 'Year-round, nocturnal',
      habitat: 'Trees, buildings, toilets, near water'
    },
    {
      id: 46,
      name: 'Cane Toad',
      scientificName: 'Rhinella marina',
      risk: 'HIGH',
      icon: '🐸',
      location: 'Northern & Eastern Australia',
      size: '10-15cm',
      description: 'Invasive species. Toxic to pets and native wildlife. Not dangerous to humans if not eaten.',
      identification: 'Large warty skin, bony ridges above eyes, parotoid glands behind eyes',
      safety: 'Toxic to pets - keep dogs/cats away. Wash hands after handling. Invasive pest - report sightings.',
      active: 'Year-round, nocturnal',
      habitat: 'Moist areas, gardens, near lights (hunting insects)'
    },
    {
      id: 47,
      name: 'Bull Ant',
      scientificName: 'Myrmecia species',
      risk: 'MEDIUM',
      icon: '🐜',
      location: 'All of Australia',
      size: '8-40mm',
      description: 'Large aggressive ant with powerful sting. Can cause allergic reactions.',
      identification: 'Large red/black ant, large mandibles, aggressive behavior',
      safety: 'Avoid nests. Sting is very painful. Can cause allergic reactions. Seek medical help if severe reaction.',
      active: 'Year-round, diurnal',
      habitat: 'Bushland, gardens, lawns, forests'
    },
    {
      id: 48,
      name: 'European Wasp',
      scientificName: 'Vespula germanica',
      risk: 'MEDIUM',
      icon: '🐝',
      location: 'Southern Australia',
      size: '12-17mm',
      description: 'Invasive wasp. Can sting multiple times. Aggressive near nests.',
      identification: 'Yellow and black stripes, triangle-shaped face markings, paperlike nests',
      safety: 'Avoid nests. Can sting repeatedly. Allergic reactions possible. Report nests to authorities.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Gardens, walls, roof cavities, underground'
    },
    {
      id: 49,
      name: 'Blue-Ringed Octopus',
      scientificName: 'Hapalochlaena species',
      risk: 'CRITICAL',
      icon: '🐙',
      location: 'Coastal Australia',
      size: '12-20cm',
      description: 'Tiny but extremely venomous. One of the world\'s most venomous animals.',
      identification: 'Small, yellow-brown with bright blue rings when threatened',
      safety: 'NEVER touch or handle. Venom is lethal. No antivenom. Seek immediate emergency care if bitten.',
      active: 'Year-round, diurnal',
      habitat: 'Rock pools, coral reefs, shallow water'
    },
    {
      id: 50,
      name: 'Box Jellyfish',
      scientificName: 'Chironex fleckeri',
      risk: 'CRITICAL',
      icon: '🪼',
      location: 'Northern Australia',
      size: 'Bell up to 30cm, tentacles 3m',
      description: 'Extremely venomous jellyfish. Can be fatal. Most dangerous during stinger season.',
      identification: 'Pale blue transparent bell, up to 60 tentacles, almost invisible in water',
      safety: 'Swim in stinger nets only. Wear stinger suit. Vinegar for stings. IMMEDIATE medical emergency.',
      active: 'October-May (stinger season), marine',
      habitat: 'Northern tropical waters, beaches, estuaries'
    },
    {
      id: 51,
      name: 'Irukandji Jellyfish',
      scientificName: 'Carukia barnesi',
      risk: 'CRITICAL',
      icon: '🪼',
      location: 'Northern Australia',
      size: '1cm bell, 1m tentacles',
      description: 'Tiny but extremely dangerous. Causes Irukandji syndrome - severe pain and potential heart failure.',
      identification: 'Tiny transparent bell (thumbnail size), almost invisible, single tentacle per corner',
      safety: 'Stinger suits offer some protection. Seek IMMEDIATE emergency care if stung. Can be fatal.',
      active: 'November-May, marine',
      habitat: 'Tropical waters, can be found in stinger nets'
    },
    {
      id: 52,
      name: 'Blue-Belly Black Snake',
      scientificName: 'Pseudechis guttatus',
      risk: 'HIGH',
      icon: '🐍',
      location: 'Queensland & NSW',
      size: '1.5-2m',
      description: 'Venomous but generally shy. Related to red-bellied black snake.',
      identification: 'Black with blue-grey belly, slender build',
      safety: 'Keep distance. Generally not aggressive. Medical attention needed if bitten.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Forests, woodlands, near streams'
    },
    {
      id: 53,
      name: 'Spotted Python',
      scientificName: 'Antaresia maculosa',
      risk: 'LOW',
      icon: '🐍',
      location: 'Northern & Eastern Australia',
      size: '90-140cm',
      description: 'Small non-venomous python. Harmless, popular as pets.',
      identification: 'Light brown with darker blotches, slender build, small head',
      safety: 'Harmless to humans. May bite if handled roughly but not dangerous. Protected species.',
      active: 'Year-round, nocturnal',
      habitat: 'Rocky areas, caves, trees, buildings'
    },
    {
      id: 54,
      name: 'Copperhead Snake',
      scientificName: 'Austrelaps species',
      risk: 'HIGH',
      icon: '🐍',
      location: 'Southeastern Australia',
      size: '1.2-1.8m',
      description: 'Venomous snake, less aggressive than browns or tigers but still dangerous.',
      identification: 'Copper, brown or grey, stocky build, often near water',
      safety: 'Keep distance. Less aggressive but still dangerous. Medical attention essential if bitten.',
      active: 'Spring to Autumn, diurnal',
      habitat: 'Wetlands, swamps, creek banks, highlands'
    },
    {
      id: 55,
      name: 'Australian Raven',
      scientificName: 'Corvus coronoides',
      risk: 'LOW',
      icon: '🐦‍⬛',
      location: 'Eastern & Southern Australia',
      size: '48-53cm',
      description: 'Intelligent corvid. Can be bold, may swoop during nesting but rarely aggressive.',
      identification: 'All black, large bill, white eyes, distinctive drawn-out call',
      safety: 'Generally harmless. May swoop during nesting season. Protected species.',
      active: 'Year-round, diurnal',
      habitat: 'Woodlands, farmlands, urban areas, parks'
    },
    {
      id: 56,
      name: 'Perentie',
      scientificName: 'Varanus giganteus',
      risk: 'MEDIUM',
      icon: '🦎',
      location: 'Arid central Australia',
      size: '1.5-2.5m',
      description: 'Australia\'s largest lizard. Usually shy but can be dangerous if cornered.',
      identification: 'Very large, yellow/cream spots on dark background, long neck, powerful tail',
      safety: 'Keep distance. Can bite, scratch and tail-whip. Usually flees. Protected species.',
      active: 'Year-round, diurnal',
      habitat: 'Deserts, rocky areas, grasslands'
    }
  ];

  const getRiskStyles = (risk) => {
    switch(risk) {
      case 'CRITICAL': 
        return { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-900', badge: 'bg-red-500' };
      case 'HIGH': 
        return { bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-900', badge: 'bg-orange-500' };
      case 'MEDIUM': 
        return { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-900', badge: 'bg-yellow-500' };
      case 'LOW': 
        return { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-900', badge: 'bg-green-500' };
      default: 
        return { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-900', badge: 'bg-gray-500' };
    }
  };

  const filteredWildlife = wildlifeData.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRisk === 'all' || animal.risk === selectedRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-3 border border-blue-400/30">
              <Shield className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Australian Wildlife Database</h1>
              <p className="text-blue-300">Complete guide to 50+ native species</p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or scientific name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
            />
          </div>

          <div className="flex gap-3">
            <Filter className="w-5 h-5 text-white self-center" />
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
            >
              <option value="all">All Risk Levels</option>
              <option value="CRITICAL">Critical Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-blue-300">
            Showing <span className="font-bold text-white">{filteredWildlife.length}</span> of {wildlifeData.length} species
          </p>
        </div>

        {/* Wildlife Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredWildlife.map((animal) => {
            const styles = getRiskStyles(animal.risk);
            return (
              <div key={animal.id} className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 hover:scale-[1.02] transition-transform duration-300">
                {/* Header */}
                <div className={`${styles.bg} border-b-4 ${styles.border} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-6xl drop-shadow-lg">{animal.icon}</span>
                      <div>
                        <h3 className={`text-2xl font-bold ${styles.text}`}>{animal.name}</h3>
                        <p className="text-sm italic text-gray-600 mt-1">{animal.scientificName}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className={`${styles.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                            {animal.risk} RISK
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 leading-relaxed">{animal.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-600 font-semibold uppercase">Location</p>
                      <p className="text-gray-900 font-medium mt-1">{animal.location}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-purple-600 font-semibold uppercase">Size</p>
                      <p className="text-gray-900 font-medium mt-1">{animal.size}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Identification</p>
                        <p className="text-sm text-gray-700">{animal.identification}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.bg} rounded-lg p-4 border-l-4 ${styles.border}`}>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`w-5 h-5 ${styles.text} flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className={`text-xs font-semibold ${styles.text} uppercase mb-1`}>Safety Advice</p>
                        <p className="text-sm text-gray-700">{animal.safety}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 text-xs text-gray-600">
                    <div className="flex-1 bg-gray-100 rounded-lg p-2">
                      <p className="font-semibold">Active:</p>
                      <p>{animal.active}</p>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-2">
                      <p className="font-semibold">Habitat:</p>
                      <p>{animal.habitat}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredWildlife.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-xl rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Search className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No species found</h3>
            <p className="text-blue-300">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
