"use client";

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { createClient } from '@/app/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  Button, 
  TextField, 
  FormControl, 
  FormLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  FormControlLabel, 
  Box, 
  Typography,
  Alert,
  Paper,
  Grid
} from '@mui/material'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
})

interface Category {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

interface BlogPostFormProps {
  categories: Category[]
  tags: Tag[]
  userId: string
}

export function BlogPostForm({ categories, tags, userId }: BlogPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      categoryId: '',
      tagIds: [],
      featuredImage: '',
    },
  })

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      setError(null)
      const supabase = createClient()
      
      const slug = generateSlug(values.title)

      console.log("values is : ", values);
        // First, create the post
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({
          title: values.title,
          excerpt: values.excerpt || null,
          content: values.content,
          category_id: values.categoryId || null,
          user_id: userId,
          featured_image: values.featuredImage || null,
          status: 'DRAFT',
          slug: slug,
        })
        .select()
        .single()

      if (postError) {
        console.error('Error creating post:', postError)
        throw postError
      }

      // Then, handle tag connections if any tags are selected
      if (values.tagIds?.length && post) {
        const tagConnections = values.tagIds.map((tagId) => ({
          "postId": post.id,
          "tagId": tagId,
        }))

        const { error: tagError } = await supabase
          .from('posts_on_tags')
          .insert(tagConnections)

        if (tagError) {
          console.error('Error connecting tags:', tagError)
          // Don't throw here as the post was created successfully
        }
      }

      router.push('/protected/blog')
      router.refresh()
    } catch (error) {
      console.error('Error creating post:', error)
      setError('Failed to create post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Blog Post
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/protected/blog/manage')}
          sx={{ mr: 2 }}
        >
          Manage Categories & Tags
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Title Field */}
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  required
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  placeholder="Enter post title"
                />
              )}
            />
          </Grid>

          {/* Excerpt Field */}
          <Grid item xs={12}>
            <Controller
              name="excerpt"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Excerpt"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.excerpt}
                  helperText={errors.excerpt?.message}
                  placeholder="Enter a brief excerpt of your post"
                />
              )}
            />
          </Grid>

          {/* Content Field */}
          <Grid item xs={12}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.content}>
                  <FormLabel component="legend" sx={{ mb: 1 }}>
                    Content *
                  </FormLabel>
                  <Box data-color-mode="light">
                    <MDEditor
                      value={field.value}
                      onChange={(value) => field.onChange(value || '')}
                      preview="edit"
                      height={400}
                    />
                  </Box>
                  {errors.content && (
                    <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                      {errors.content.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Featured Image Field */}
          <Grid item xs={12}>
            <Controller
              name="featuredImage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Featured Image URL"
                  fullWidth
                  error={!!errors.featuredImage}
                  helperText={errors.featuredImage?.message}
                  placeholder="Enter the URL of your featured image"
                />
              )}
            />
          </Grid>

          {/* Category Field */}
          <Grid item xs={12} md={6}>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.categoryId}>
                  <FormLabel sx={{ mb: 1 }}>Category</FormLabel>
                  <Select
                    {...field}
                    value={field.value || ''}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>Select a category</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.categoryId && (
                    <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                      {errors.categoryId.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Tags Field */}
          <Grid item xs={12}>
            <Controller
              name="tagIds"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.tagIds}>
                  <FormLabel component="legend" sx={{ mb: 1 }}>
                    Tags
                  </FormLabel>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {tags.map((tag) => (
                      <FormControlLabel
                        key={tag.id}
                        control={
                          <Checkbox
                            checked={(field.value || []).includes(tag.id)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...(field.value || []), tag.id]
                                : (field.value || []).filter((id) => id !== tag.id)
                              field.onChange(newValue)
                            }}
                          />
                        }
                        label={tag.name}
                      />
                    ))}
                  </Box>
                  {errors.tagIds && (
                    <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                      {errors.tagIds.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                size="large"
              >
                {isSubmitting ? 'Creating...' : 'Create Post'}
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => router.back()}
                size="large"
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}