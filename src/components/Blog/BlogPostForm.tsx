"use client";

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'

import dynamic from 'next/dynamic'
import { useState, useRef } from 'react'
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
  Grid,
  IconButton,
  CircularProgress,
  Avatar
} from '@mui/material'
import { v4 as uuidv4 } from "uuid";
import { Camera, CloudUpload, Delete } from 'lucide-react';

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
}

export function BlogPostForm({ categories, tags }: BlogPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUploadingFeatured, setIsUploadingFeatured] = useState(false)
  const [isUploadingContent, setIsUploadingContent] = useState(false)
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>('')
  
  const router = useRouter()
  const featuredImageInputRef = useRef<HTMLInputElement>(null)
  const contentImageInputRef = useRef<HTMLInputElement>(null)
  
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
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

  const watchedFeaturedImage = watch('featuredImage')
  const watchedContent = watch('content')

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "chichore_preset"
    );

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) throw new Error("Cloudinary Cloud Name is not set!");

    const res = await axios.post<{
      secure_url: string;
      public_id: string;
      /* …other Cloudinary response props if you need them */
    }>(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);

    return res.data.secure_url;
  };

  const handleFeaturedImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploadingFeatured(true);
      setError(null);
      
      const imageUrl = await uploadToCloudinary(file);
      setValue('featuredImage', imageUrl);
      setFeaturedImagePreview(imageUrl);
      
    } catch (error) {
      console.error('Error uploading featured image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploadingFeatured(false);
      // Reset the input value so the same file can be selected again if needed
      if (featuredImageInputRef.current) {
        featuredImageInputRef.current.value = '';
      }
    }
  };

  const handleContentImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploadingContent(true);
      setError(null);
      
      const imageUrl = await uploadToCloudinary(file);
      
      // Insert the image markdown into the content at cursor position
      const imageMarkdown = `\n![Uploaded Image](${imageUrl})\n`;
      const currentContent = watchedContent || '';
      const newContent = currentContent + imageMarkdown;
      setValue('content', newContent);
      
    } catch (error) {
      console.error('Error uploading content image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploadingContent(false);
      // Reset the input value
      if (contentImageInputRef.current) {
        contentImageInputRef.current.value = '';
      }
    }
  };

  const removeFeaturedImage = () => {
    setValue('featuredImage', '');
    setFeaturedImagePreview('');
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      setError(null)
      const supabase = createClient()
      
      const slug = generateSlug(values.title)
      const now = new Date().toISOString()

      console.log("values is : ", values);
      
      // Get the current user from Supabase Auth
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        throw new Error('You must be logged in to create a post.')
      }

      console.log("Authenticated user:", user.id, user.email);

      // Check if user exists in User table
      const { data: dbUser, error: userCheckError } = await supabase
        .from('User')
        .select('id')
        .eq('id', user.id)
        .single()

      if (userCheckError && userCheckError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected if user doesn't exist
        console.error('Error checking user:', userCheckError)
        throw new Error('Error checking user existence.')
      }

      // If user doesn't exist in User table, create them
      if (!dbUser) {
        console.log("User doesn't exist in User table, creating...");
        const { error: createUserError } = await supabase
          .from('User')
          .insert({
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email!.split('@')[0],
            created_at: now,
          })
        
        if (createUserError) {
          console.error('Error creating user:', createUserError)
          throw new Error('Failed to create user record.')
        }
        console.log("User created successfully");
      } else {
        console.log("User already exists in User table");
      }

      // Now create the post
      const { data: post, error: postError } = await supabase
        .from('Post')
        .insert({
          id: uuidv4(),
          title: values.title,
          excerpt: values.excerpt || null,
          content: values.content,
          category_id: values.categoryId || null,
          user_id: user.id,
          featured_image: values.featuredImage || null,
          status: 'DRAFT',
          slug: slug,
          created_at: now,
          updated_at: now,
        })
        .select()
        .single()

      if (postError) {
        console.error('Error creating post:', postError)
        throw postError
      }

      console.log("Post created successfully:", post);

      // Then, handle tag connections if any tags are selected
      if (values.tagIds?.length && post) {
        const tagConnections = values.tagIds.map((tagId) => ({
          postId: post.id,
          tagId: tagId,
          created_at: now,
        }))

        const { error: tagError } = await supabase
          .from('PostsOnTags')
          .insert(tagConnections)

        if (tagError) {
          console.error('Error connecting tags:', tagError)
          // Don't throw here as the post was created successfully
          // Just log the error for debugging
        } else {
          console.log("Tags connected successfully");
        }
      }

      // Success! Navigate to blog page
      router.push('/protected')
      router.refresh()
    } catch (error) {
      console.error('Error creating post:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to create post. Please try again.')
      }
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

          {/* Featured Image Field */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel sx={{ mb: 2 }}>Featured Image</FormLabel>
              
              {/* Featured Image Preview */}
              {(watchedFeaturedImage || featuredImagePreview) && (
                <Box sx={{ mb: 2, position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    src={watchedFeaturedImage || featuredImagePreview}
                    alt="Featured Image Preview"
                    variant="rounded"
                    sx={{ width: 200, height: 120 }}
                  />
                  <IconButton
                    onClick={removeFeaturedImage}
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      bgcolor: 'error.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                    size="small"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {/* Featured Image Upload Button */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  style={{ display: 'none' }}
                  ref={featuredImageInputRef}
                />
                <Button
                  variant="outlined"
                  startIcon={isUploadingFeatured ? <CircularProgress size={20} /> : <Camera />}
                  onClick={() => featuredImageInputRef.current?.click()}
                  disabled={isUploadingFeatured}
                >
                  {isUploadingFeatured ? 'Uploading...' : 'Upload Featured Image'}
                </Button>

                {/* Or URL Input */}
                <Typography variant="body2" sx={{ mx: 1 }}>or</Typography>
                
                <Controller
                  name="featuredImage"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Image URL"
                      placeholder="Enter image URL"
                      size="small"
                      sx={{ flexGrow: 1 }}
                      onChange={(e) => {
                        field.onChange(e);
                        setFeaturedImagePreview(e.target.value);
                      }}
                    />
                  )}
                />
              </Box>
            </FormControl>
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
                  
                  {/* Content Image Upload Button */}
                  <Box sx={{ mb: 2 }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleContentImageUpload}
                      style={{ display: 'none' }}
                      ref={contentImageInputRef}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={isUploadingContent ? <CircularProgress size={16} /> : <CloudUpload />}
                      onClick={() => contentImageInputRef.current?.click()}
                      disabled={isUploadingContent}
                    >
                      {isUploadingContent ? 'Uploading...' : 'Add Image to Content'}
                    </Button>
                    <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
                      Upload images to insert into your blog content
                    </Typography>
                  </Box>

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
                disabled={isSubmitting || isUploadingFeatured || isUploadingContent}
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