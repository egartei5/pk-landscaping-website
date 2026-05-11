import BlogEditor from '@/components/admin/BlogEditor'

export const metadata = { title: 'New Post — PK Admin' }

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">New Post</h1>
        <p className="text-white/50 mt-1">Write and publish a new blog article.</p>
      </div>
      <BlogEditor />
    </div>
  )
}
