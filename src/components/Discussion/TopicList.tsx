import TopicCard from "./TopicCard";
import { Grid, Typography, Container } from "@mui/material";

const TopicList = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4" // Changed from h3 to h5 for a smaller size
        gutterBottom
        sx={{
          fontWeight: 400,
          color: "primary.main",
          textAlign: "center",
          mb: 2 // Reduced margin-bottom from 4 to 2
        }}
      >
        Explore Topics
      </Typography>
      <Grid container spacing={2}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} key={index}>
            <TopicCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TopicList;