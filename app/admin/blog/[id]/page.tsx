import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import BlogEditor from '@/components/admin/BlogEditor'

export const metadata = { title: 'Edit Post — PK Admin' }

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await db.blogPost.findUnique({ where: { id: parseInt(params.id) } })
  if (!post) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">Edit Post</h1>
        <p className="text-white/50 mt-1">{post.title}</p>
      </div>
      <BlogEditor
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          published: post.published,
        }}
      />
    </div>
  )
}
