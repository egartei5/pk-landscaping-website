import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  // Admin user (always upsert — safe to run multiple times)
  const passwordHash = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD ?? 'PkAdmin2024!Secure', 12)
  await db.adminUser.upsert({
    where: { email: process.env.ADMIN_SEED_EMAIL ?? 'admin@pklandscapingmn.com' },
    update: {},
    create: {
      email: process.env.ADMIN_SEED_EMAIL ?? 'admin@pklandscapingmn.com',
      passwordHash,
    },
  })

  // Skip testimonials + blog if already seeded
  const existing = await db.testimonial.count()
  if (existing > 0) {
    console.log('✅ Database already seeded — skipping testimonials and blog posts.')
    return
  }

  // Testimonials
  const testimonials = [
    {
      name: 'Felipe Mendoza',
      rating: 5,
      review: 'PK Landscaping Service did a fantastic job on our road paving project. From the initial assessment to the final seal coat, they were punctual, transparent about costs, and kept the site clean throughout.',
      service: 'Road Paving',
    },
    {
      name: 'Sarah K. — New Homeowner',
      rating: 5,
      review: 'I cannot say enough about how transformative their landscape services have been for my new home. When I moved in, the yard was a mess of overgrowth. Their team cleared everything quickly and came up with an elegant solution.',
      service: 'Lawn Mowing',
    },
    {
      name: 'David Thompson',
      rating: 5,
      review: 'Used them for spring and fall cleanups for two years running. Reliable, thorough, and fairly priced. The paver patio they installed last summer is still getting compliments from our neighbors.',
      service: 'Paver Installation',
    },
  ]

  for (const t of testimonials) {
    await db.testimonial.create({ data: t })
  }

  // Blog posts
  const posts = [
    {
      title: 'Preparing Your Lawn for Mowing During Extreme Weather',
      slug: 'preparing-lawn-mowing-extreme-weather',
      excerpt: 'Extreme weather can pose a significant challenge when it comes to maintaining your lawn. Learn how to adapt your mowing strategy for scorching heat, heavy rain, or biting cold.',
      content: '<p>Effective lawn care in Fargo, ND requires adapting to the region\'s demanding seasonal swings. During summer heat waves, raise your mowing height to 3–4 inches to shade soil and retain moisture. Avoid mowing wet grass — it tears blades and spreads disease. In early spring, wait until soil temperatures reach 50°F before the first cut. Always keep blades sharp; dull blades bruise grass, making it more vulnerable to drought and disease stress.</p><p>For fall preparation, gradually lower cutting height in October and complete a final cut before the first hard freeze. This prevents matting under snow, which creates conditions for snow mold. A well-timed final mow sets your lawn up for a strong spring return.</p>',
      category: 'Lawn Care',
      published: true,
      publishedAt: new Date('2025-10-15'),
    },
    {
      title: 'Seasonal Considerations for Effective Lawn Mowing',
      slug: 'seasonal-considerations-lawn-mowing',
      excerpt: 'Caring for your lawn throughout the year requires understanding how each season presents unique challenges and opportunities for maintaining a vibrant lawn.',
      content: '<p>North Dakota\'s four distinct seasons demand a flexible lawn care approach. Spring is about recovery — light fertilization, overseeding bare patches, and gradual cutting as the grass wakes up. Summer requires consistency: mow frequently enough to never remove more than one-third of the blade height at once. Watering early in the morning reduces evaporation and fungal risk.</p><p>Fall is the most important season for lawn health. Aeration in September breaks up compacted soil, and overseeding fills thin spots before winter. A balanced fertilizer application in late October strengthens roots through dormancy. By respecting each season\'s demands, your lawn will thrive year-round.</p>',
      category: 'Lawn Care',
      published: true,
      publishedAt: new Date('2025-10-14'),
    },
    {
      title: 'How Paver Installation Improves Curb Appeal and Functionality',
      slug: 'paver-installation-curb-appeal-functionality',
      excerpt: 'Paving stones are not only visually appealing but also serve multiple practical purposes. Discover how paver installation can transform your outdoor spaces.',
      content: '<p>A well-designed paver installation does more than look beautiful — it solves real problems. Uneven, muddy entries become clean, level surfaces. Bare patches beside driveways become defined garden borders. Patios transform unused backyard space into functional outdoor living areas that extend your home\'s usable square footage.</p><p>Pavers outperform concrete slabs in freeze-thaw climates like Fargo\'s. Individual units flex and settle independently, so there are no cracked slabs after a brutal winter. When a paver does shift, it can be reset without tearing up the entire surface — a long-term cost advantage. Choose permeable designs in areas prone to runoff, and your installation also helps manage stormwater naturally.</p>',
      category: 'Paving',
      published: true,
      publishedAt: new Date('2025-10-13'),
    },
    {
      title: 'Choosing the Right Materials for Landscape Road Paving',
      slug: 'choosing-materials-landscape-road-paving',
      excerpt: 'Finding durable options for outdoor paths and roads means understanding material trade-offs, climate compatibility, and long-term maintenance.',
      content: '<p>Material selection is the most consequential decision in any paving project. Asphalt is the workhorse — affordable, flexible, and quick to install. It handles heavy loads well and can be resurfaced rather than replaced. In cold climates, asphalt\'s flexibility actually helps it resist cracking better than rigid concrete. Budget for seal-coating every 3–5 years to maximize lifespan.</p><p>Concrete offers longevity and lower maintenance over decades but is more expensive upfront and prone to cracking in freeze-thaw cycles without proper expansion joint design. Gravel remains the most economical option for rural driveways and agricultural roads, offering excellent drainage and easy spot repair. For decorative applications, concrete pavers combine durability with aesthetic flexibility.</p>',
      category: 'Paving',
      published: true,
      publishedAt: new Date('2025-10-12'),
    },
    {
      title: 'The Role of Snow Removal in Maintaining Winter Curb Appeal',
      slug: 'snow-removal-winter-curb-appeal',
      excerpt: 'Maintaining your home\'s appearance in cold months is challenging as snow piles up, hides the beauty of your home, and creates safety hazards.',
      content: '<p>Snow management is about more than clearing a path — it\'s about protecting your property\'s appearance, value, and safety through Fargo\'s long winters. Prompt snow removal prevents ice bonding, which multiplies the effort required to clear surfaces and increases slip risk. Strategic snow placement during clearing preserves lawn areas and prevents drainage problems when it melts.</p><p>Professional snow removal services track forecasts and mobilize before or immediately after storms, so you never wake up to an impassable driveway. De-icing applications protect surfaces from re-freezing and reduce the physical demands on concrete and asphalt. For businesses, reliable snow service is directly tied to customer access and liability management.</p>',
      category: 'Snow Removal',
      published: true,
      publishedAt: new Date('2025-10-05'),
    },
    {
      title: 'How Snow Removal Prevents Long-Term Damage to Landscaping',
      slug: 'snow-removal-prevents-landscape-damage',
      excerpt: 'The winter season can take a toll on your landscaping, causing long-term damage if not properly managed. Learn how strategic snow removal protects your investment.',
      content: '<p>Unchecked snow accumulation harms landscaping in ways that don\'t become visible until spring. Heavy snow loads can snap branches, permanently damage shrubs, and compact turf to the point where it struggles to recover. Plow damage — when blades catch lawn edges or garden borders — is common when snow removal isn\'t managed carefully.</p><p>Strategic snow removal places accumulated snow in designated areas away from garden beds and tree root zones. It prevents ice dams on roof edges that push water under shingles. It keeps walkways safe, reducing the chance of pedestrian falls that often lead to liability issues for homeowners. Treating your snow removal as landscape protection, not just access clearance, preserves your outdoor investment through every winter.</p>',
      category: 'Snow Removal',
      published: true,
      publishedAt: new Date('2025-10-08'),
    },
    {
      title: 'The Role of Proper Foundation in Successful Paver Installation',
      slug: 'foundation-paver-installation-success',
      excerpt: 'A strong base matters for your outdoor surfaces. The foundation beneath a paver installation plays a crucial role in ensuring long-term success.',
      content: '<p>The most common cause of paver failure is inadequate base preparation. No matter how beautiful the surface material, pavers installed over an unstable base will shift, settle unevenly, and require premature replacement. A proper installation begins with excavating 6–8 inches, followed by compacted gravel base and a layer of coarse sand — each layer plate-compacted to achieve consistent density.</p><p>Edge restraints are the unsung heroes of paver longevity. Without them, the entire field gradually migrates outward under traffic and freeze-thaw pressure. Polymeric sand swept into joints locks pavers in place and resists weed growth. When all these foundation elements are executed correctly, a well-installed paver surface can last 20–30 years with minimal maintenance.</p>',
      category: 'Paving',
      published: true,
      publishedAt: new Date('2025-10-11'),
    },
    {
      title: 'Road Paving Solutions for Durable Driveway Surfaces',
      slug: 'road-paving-durable-driveway-surfaces',
      excerpt: 'Investing in long-lasting materials and techniques for your driveway ensures minimal maintenance and maximum appeal for years to come.',
      content: '<p>A quality driveway is a significant investment that should last 20–30 years with proper installation and basic maintenance. The key is starting with a well-prepared subgrade — graded to promote drainage away from structures, with problematic soft spots excavated and filled with compacted aggregate. Cutting corners on subgrade preparation is the primary cause of premature paving failure.</p><p>For asphalt, a properly installed surface is 3–4 inches of hot-mix over a 6-inch compacted gravel base. The first seal coat should be applied 6–12 months after installation, once the asphalt has fully cured. After that, seal every 3–5 years and fill cracks promptly before water infiltration causes base damage. Crack filling is the most cost-effective maintenance investment you can make.</p>',
      category: 'Paving',
      published: true,
      publishedAt: new Date('2025-10-15'),
    },
  ]

  for (const post of posts) {
    await db.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }

  // Gallery images are NOT seeded here — the public /gallery page now reads
  // from the GalleryImage table, and scripts/bootstrap.mjs populates it from
  // data/gallery.json (the real project photos) on first boot. Seeding stock
  // Unsplash placeholders here would put them on the live gallery.

  console.log('✅ Database seeded successfully')
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
