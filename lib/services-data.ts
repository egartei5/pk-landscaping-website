export interface ServiceData {
  slug: string
  title: string
  shortDescription: string
  problem: string
  solution: string
  bullets: string[]
  icon: string
  category: string
  heroImage: string
  cardImage: string
  cardImageAlt: string
}

export const servicesData: ServiceData[] = [
  {
    slug: 'snow-removal',
    title: 'Snow Removal',
    shortDescription: 'Fast, reliable snow clearing for driveways, walkways, and commercial lots.',
    problem: 'Icy walkways and blocked driveways disrupt daily routines and pose serious safety hazards during Fargo\'s brutal winters.',
    solution: 'Our mobile crew responds quickly with advanced snow plows and de-icing equipment, clearing paths after every snowfall so you can move safely.',
    bullets: ['24/7 emergency response available', 'Residential driveways & commercial lots', 'De-icing and sand application', 'Parking lot clearing', 'Sidewalk and entryway service'],
    icon: '❄️',
    category: 'Winter',
    heroImage: '/images/commercial-snow-removal-lot-fargo.jpg',
    cardImage: '/images/commercial-snow-removal-lot-fargo.jpg',
    cardImageAlt: 'Commercial snow removal service in Fargo ND',
  },
  {
    slug: 'road-paving',
    title: 'Road Paving',
    shortDescription: 'Durable asphalt and paving solutions for driveways, roads, and commercial surfaces.',
    problem: 'Poorly maintained roads cause vehicle damage, erosion, and reduced curb appeal — costing more in repairs the longer you wait.',
    solution: 'We deliver smooth, long-lasting paving using durable materials and precise installation techniques that handle daily traffic and harsh ND weather.',
    bullets: ['Residential driveways & commercial roads', 'Asphalt installation and resurfacing', 'Crack filling and seal coating', 'Proper drainage grading', 'Long-term warranty on select projects'],
    icon: '🛣️',
    category: 'Paving',
    heroImage: '/images/land-clearing-grading-fargo.jpg',
    cardImage: '/images/land-clearing-grading-fargo.jpg',
    cardImageAlt: 'Road grading and paving preparation in Fargo ND',
  },
  {
    slug: 'paver-installation',
    title: 'Paver Installation',
    shortDescription: 'Beautiful, structured paver pathways, patios, and edging that add lasting value.',
    problem: 'Uneven ground and bare patches limit outdoor enjoyment and detract from your property\'s visual appeal and resale value.',
    solution: 'Our team installs custom paver patios, walkways, and garden edging using proven design layouts and quality materials built to last decades.',
    bullets: ['Custom patio design and installation', 'Walkways and garden paths', 'Retaining walls and edging', 'Permeable paver options', 'Supporting drainage integration'],
    icon: '🧱',
    category: 'Paving',
    heroImage: '/images/paver-patio-installation-fargo.jpg',
    cardImage: '/images/paver-walkway-herringbone-fargo.jpg',
    cardImageAlt: 'Paver walkway installation in Fargo ND',
  },
  {
    slug: 'lawn-mowing',
    title: 'Lawn Mowing',
    shortDescription: 'Consistent, professional mowing to keep your lawn healthy and immaculate all season.',
    problem: 'Overgrown lawns invite pests, hinder healthy grass growth, and create a poor first impression for your home or business.',
    solution: 'Our mowing plans use high-powered equipment tuned to your terrain, cutting at optimal heights and removing clippings responsibly.',
    bullets: ['Weekly and bi-weekly plans available', 'Edging along sidewalks and driveways', 'Clipping removal included', 'Residential and commercial properties', 'Flexible scheduling options'],
    icon: '🌿',
    category: 'Lawn Care',
    heroImage: '/images/lawn-mowing-stripes-neighborhood-fargo.jpg',
    cardImage: '/images/lawn-mowing-stripes-neighborhood-fargo.jpg',
    cardImageAlt: 'Professional lawn mowing with stripe pattern in Fargo ND',
  },
  {
    slug: 'tree-services',
    title: 'Tree Services',
    shortDescription: 'Expert tree planting, pruning, trimming, and removal to keep your landscape healthy.',
    problem: 'Overgrown, damaged, or diseased trees create safety hazards and reduce property aesthetics if left unmanaged.',
    solution: 'Our certified crew handles everything from strategic planting to safe removal, shaping trees to enhance beauty while maintaining structural integrity.',
    bullets: ['Tree planting and transplanting', 'Crown pruning and shaping', 'Dead branch removal', 'Tree trimming for clearance', 'Full tree removal with stump grinding'],
    icon: '🌳',
    category: 'Lawn Care',
    heroImage: '/images/tree-ring-paver-circle-fargo.jpg',
    cardImage: '/images/tree-ring-paver-circle-fargo.jpg',
    cardImageAlt: 'Tree care and ring landscaping in Fargo ND',
  },
  {
    slug: 'brick-lane-construction',
    title: 'Brick Lane Construction',
    shortDescription: 'Professional brick lane and hardscape construction for residential and commercial properties.',
    problem: 'Damaged or absent brick pathways reduce property value and create unsafe pedestrian surfaces that wear down quickly.',
    solution: 'We construct durable, attractive brick lanes using quality materials and expert craftsmanship, built to handle Fargo\'s freeze-thaw cycles.',
    bullets: ['Residential and commercial brick lanes', 'Custom layout and pattern design', 'Proper base preparation for longevity', 'Edging and border installation', 'Repair and restoration of existing brickwork'],
    icon: '🏗️',
    category: 'Paving',
    heroImage: '/images/paver-walkway-herringbone-fargo.jpg',
    cardImage: '/images/paver-patio-installation-fargo.jpg',
    cardImageAlt: 'Brick lane and paver construction in Fargo ND',
  },
  {
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    shortDescription: 'Thorough gutter cleaning to protect your home from water damage year-round.',
    problem: 'Clogged gutters cause water overflow, foundation damage, and ice dams in winter — often leading to thousands in structural repairs.',
    solution: 'We clear all debris, flush downspouts, and inspect for damage so your gutters flow freely and protect your home through every season.',
    bullets: ['Complete debris removal', 'Downspout flushing and inspection', 'Gutter integrity check', 'Roof edge inspection included', 'Spring and fall service plans'],
    icon: '🏠',
    category: 'Maintenance',
    heroImage: '/images/snow-removal-roof-fargo.jpg',
    cardImage: '/images/snow-removal-roof-fargo.jpg',
    cardImageAlt: 'Roof and gutter service in Fargo ND',
  },
  {
    slug: 'seasonal-cleanup',
    title: 'Seasonal Cleanup',
    shortDescription: 'Complete spring and fall cleanup to prepare your property for each season.',
    problem: 'Accumulated leaves, dead plants, and winter debris smother lawns and create breeding grounds for pests and disease.',
    solution: 'Our seasonal cleanup crews remove all debris, prep garden beds, and ensure your lawn enters each season in peak condition.',
    bullets: ['Leaf collection and removal', 'Garden bed cleanup and prep', 'Dead plant and debris removal', 'Lawn aeration available', 'Spring and fall service packages'],
    icon: '🍂',
    category: 'Lawn Care',
    heroImage: '/images/mulch-garden-rock-border-fargo.jpg',
    cardImage: '/images/landscaping-crew-planting-fargo.jpg',
    cardImageAlt: 'Seasonal landscaping cleanup crew in Fargo ND',
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug)
}
