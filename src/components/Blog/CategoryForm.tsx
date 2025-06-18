"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/app/utils/supabase/client";
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export function CategoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);
      const supabase = createClient();
      const { error: categoryError } = await supabase.from("Category").insert({
        id: uuidv4(), // Generate UUID here
        name: values.name,
        description: values.description || null,
      });

      if (categoryError) {
        throw categoryError;
      }

      setSuccess(true);
      reset();
    } catch (error) {
      console.error("Error creating category:", error);
      if (typeof error === "object" && error !== null) {
        const err = error as { message?: string; code?: string };
        if (err.code === "23505") {
          setError("A category with this name already exists.");
        } else {
          setError(
            err.message || "Failed to create category. Please try again."
          );
        }
      } else {
        setError("Failed to create category. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 500, mx: "auto", mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create New Category
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Category created successfully!
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <TextField
          {...register("name")}
          label="Category Name"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          {...register("description")}
          label="Description (Optional)"
          fullWidth
          multiline
          rows={3}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Creating..." : "Create Category"}
        </Button>
      </Box>
    </Paper>
  );
}
