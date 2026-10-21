export const speciesLinks = {
  1: {
    href: '/guides/how-to-identify-eastern-brown-snake-vs-common-tree-snake',
    label: 'Read the Eastern Brown Snake guide',
  },
  2: {
    href: '/guides/tiger-snake-vs-eastern-brown-how-to-tell-them-apart',
    label: 'Read the Tiger Snake guide',
  },
  3: { href: '/wildlife/inland-taipan', label: 'Read the Inland Taipan profile' },
  4: { href: '/wildlife/coastal-taipan', label: 'Read the Coastal Taipan profile' },
  5: { href: '/wildlife/common-death-adder', label: 'Read the Death Adder profile' },
  6: { href: '/wildlife/mulga-snake-king-brown', label: 'Read the Mulga Snake profile' },
  7: { href: '/wildlife/sydney-funnel-web-spider', label: 'Read the Sydney Funnel-Web Spider profile' },
  8: { href: '/wildlife/tree-dwelling-funnel-web-spider', label: 'Read the Tree-Dwelling Funnel-Web profile' },
  9: { href: '/wildlife/redback-spider', label: 'Read the Redback Spider profile' },
  10: { href: '/wildlife/red-bellied-black-snake', label: 'Read the Red-Bellied Black Snake profile' },
  11: { href: '/wildlife/mouse-spider', label: 'Read the Mouse Spider profile' },
  12: { href: '/wildlife/white-tailed-spider', label: 'Read the White-Tailed Spider profile' },
  13: { href: '/wildlife/australian-magpie', label: 'Read the Australian Magpie profile' },
  14: { href: '/wildlife/lace-monitor', label: 'Read the Lace Monitor profile' },
  15: { href: '/wildlife/eastern-grey-kangaroo', label: 'Read the Eastern Grey Kangaroo profile' },
  16: { href: '/wildlife/red-kangaroo', label: 'Read the Red Kangaroo profile' },
  17: { href: '/wildlife/southern-cassowary', label: 'Read the Cassowary profile' },
  18: { href: '/wildlife/saltwater-crocodile', label: 'Read the Saltwater Crocodile profile' },
  19: { href: '/wildlife/freshwater-crocodile', label: 'Read the Freshwater Crocodile profile' },
  20: { href: '/wildlife/dingo', label: 'Read the Dingo profile' },
  22: {
    href: '/guides/how-to-identify-eastern-brown-snake-vs-common-tree-snake',
    label: 'Read the Common Tree Snake guide',
  },
};

export function getSpeciesLink(id) {
  return speciesLinks[id] || null;
}
