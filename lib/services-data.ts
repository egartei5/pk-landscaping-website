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
    heroImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1600&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=1600&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1600&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1542773998-9325f0a098d7?w=1600&q=80',
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug)
}
