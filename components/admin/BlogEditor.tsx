'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Link as TiptapLink } from '@tiptap/extension-link'
import { Image as TiptapImage } from '@tiptap/extension-image'
import {
  Bold, Italic, List, ListOrdered, Heading2, Heading3, Link2, Image,
  Quote, Code, Undo, Redo, Loader2,
} from 'lucide-react'

const CATEGORIES = ['Lawn Care', 'Snow Removal', 'Landscaping', 'Paving', 'Seasonal', 'Tips & Advice']

interface Props {
  initialData?: {
    id?: number
    title?: string
    slug?: string
    excerpt?: string
    content?: string
    category?: string
    published?: boolean
  }
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function BlogEditor({ initialData = {} }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData.title ?? '')
  const [slug, setSlug] = useState(initialData.slug ?? '')
  const [excerpt, setExcerpt] = useState(initialData.excerpt ?? '')
  const [category, setCategory] = useState(initialData.category ?? CATEGORIES[0])
  const [published, setPublished] = useState(initialData.published ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      TiptapImage,
    ],
    content: initialData.content ?? '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-64 focus:outline-none px-6 py-4',
      },
    },
  })

  function handleTitleChange(val: string) {
    setTitle(val)
    if (!initialData.slug) setSlug(slugify(val))
  }

  async function handleSave(publish?: boolean) {
    setSaving(true)
    setError('')
    const content = editor?.getHTML() ?? ''
    const method = initialData.id ? 'PUT' : 'POST'
    const url = initialData.id ? `/api/admin/blog/${initialData.id}` : '/api/admin/blog'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, excerpt, content, category, published: publish ?? published }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to save')
      }
      router.push('/admin/blog')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const ToolbarButton = useCallback(({ onClick, active, children, title }: {
    onClick: () => void
    active?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-colors ${active ? 'bg-pk-500/20 text-pk-400' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
    >
      {children}
    </button>
  ), [])

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
            className="w-full bg-pk-900 border border-white/10 rounded-xl px-4 py-3 text-white text-xl font-heading font-bold placeholder-white/20 focus:outline-none focus:border-pk-500 transition-colors"
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="url-slug"
            className="w-full bg-pk-900 border border-white/10 rounded-xl px-4 py-2.5 text-white/70 text-sm font-mono placeholder-white/20 focus:outline-none focus:border-pk-500 transition-colors"
          />
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short excerpt / meta description..."
            rows={2}
            className="w-full bg-pk-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-pk-500 transition-colors resize-none text-sm"
          />

          {/* Tiptap editor */}
          <div className="bg-pk-900 border border-white/10 rounded-xl overflow-hidden">
            {editor && (
              <div className="flex items-center gap-1 p-2 border-b border-white/10 flex-wrap">
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
                  <Bold className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
                  <Italic className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="H2">
                  <Heading2 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="H3">
                  <Heading3 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
                  <List className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
                  <ListOrdered className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
                  <Quote className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Code">
                  <Code className="w-4 h-4" />
                </ToolbarButton>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <ToolbarButton onClick={() => {
                  const url = prompt('Image URL:')
                  if (url) editor.chain().focus().setImage({ src: url }).run()
                }} title="Insert image">
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => {
                  const url = prompt('Link URL:')
                  if (url) editor.chain().focus().setLink({ href: url }).run()
                }} active={editor.isActive('link')} title="Insert link">
                  <Link2 className="w-4 h-4" />
                </ToolbarButton>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
                  <Undo className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
                  <Redo className="w-4 h-4" />
                </ToolbarButton>
              </div>
            )}
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-pk-900 rounded-xl border border-white/10 p-5 space-y-4">
            <h3 className="font-heading font-semibold text-white">Publish</h3>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={`relative w-10 h-5.5 rounded-full transition-colors ${published ? 'bg-pk-500' : 'bg-white/20'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${published ? 'translate-x-4.5' : ''}`} />
              </button>
              <span className="text-sm text-white/70">{published ? 'Published' : 'Draft'}</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="w-full bg-pk-800 hover:bg-pk-700 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/10"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Draft
              </button>
              {!published && (
                <button
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="w-full bg-pk-500 hover:bg-pk-400 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Publish Now
                </button>
              )}
            </div>
          </div>

          <div className="bg-pk-900 rounded-xl border border-white/10 p-5">
            <label className="block text-sm font-medium text-white/70 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-pk-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-pk-500 transition-colors"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
