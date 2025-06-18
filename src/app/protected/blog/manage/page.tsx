"use client";

import { CategoryForm } from '@/components/Blog/CategoryForm';
import { TagForm } from '@/components/Blog/TagForm';
import { Box, Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ManageBlogPage() {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Manage Blog Categories & Tags
        </Typography>
        <Button
          variant="outlined"
          onClick={() => router.push('/protected/new')}
        >
          Back to New Post
        </Button>
      </Box>

      <CategoryForm />
      <TagForm />
    </Container>
  );
}
