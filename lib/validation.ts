import { z } from 'zod'

export const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters').max(2000),
})

export type QuoteInput = z.infer<typeof quoteSchema>

export const blogPostSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(10),
  category: z.string().min(2).max(50),
  published: z.boolean().default(false),
})

export type BlogPostInput = z.infer<typeof blogPostSchema>

export const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  rating: z.number().int().min(1).max(5),
  review: z.string().min(10).max(1000),
  service: z.string().optional(),
})

export type TestimonialInput = z.infer<typeof testimonialSchema>

export const galleryImageSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  alt: z.string().min(3).max(200),
  category: z.string().min(2).max(50),
  sortOrder: z.number().int().default(0),
})

export type GalleryImageInput = z.infer<typeof galleryImageSchema>
