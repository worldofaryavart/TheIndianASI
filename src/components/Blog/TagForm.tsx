"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/app/utils/supabase/client';
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  Paper,
} from '@mui/material';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export function TagForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);
      const supabase = createClient();      const { error: tagError } = await supabase
        .from('tag')
        .insert({
          name: values.name,
        });

      if (tagError) {
        throw tagError;
      }

      setSuccess(true);
      reset();    } catch (error) {
      console.error('Error creating tag:', error);
      if (typeof error === 'object' && error !== null) {
        const err = error as { message?: string; code?: string };
        if (err.code === '23505') {
          setError('A tag with this name already exists.');
        } else {
          setError(err.message || 'Failed to create tag. Please try again.');
        }
      } else {
        setError('Failed to create tag. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create New Tag
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Tag created successfully!
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <TextField
          {...register('name')}
          label="Tag Name"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'Creating...' : 'Create Tag'}
        </Button>
      </Box>
    </Paper>
  );
}
