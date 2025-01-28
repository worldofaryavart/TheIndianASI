"use client";

import TopicCard from "./TopicCard";
import { Grid, Typography, Container } from "@mui/material";

type Topic = {
  title: string;
  description: string;
  date: string;
  user_image: string;
  user_name: string;
  participants: number;
  likes: number;
  messages: number;
};

const topics: Topic[] = [
  {
    title: "Should India also develop their own LLM?",
    description: "The debate around developing a Large Language Model (LLM) in India has gained significant traction. Proponents argue that it would enhance national security, foster innovation, and create jobs. However, opponents raise concerns about the potential for misuse and the need for international collaboration. This topic explores the pros and cons of India developing its own LLM.",
    date: "2024-07-15",
    user_image: "/images/user.png",
    user_name: "John Doe",
    participants: 100, 
    likes: 50,
    messages: 300,
  }
];

const TopicList = () => {
  const handleTopicClick = (topic: Topic) => {
    console.log("Topic clicked:", topic.title);

  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 400,
          color: "primary.main",
          textAlign: "center",
          mb: 2
        }}
      >
        Explore Topics
      </Typography>
      <Grid container spacing={2}>
        {topics.map((topic, index) => (
          <Grid item xs={12} key={index}>
            <TopicCard topic={topic} onClick={() => handleTopicClick(topic)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TopicList;