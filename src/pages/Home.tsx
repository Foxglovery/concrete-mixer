import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import FileButton from '../components/FileButton';

const StyledCard = styled(motion(Card))`
  height: 100%;
  background: rgba(245, 245, 220, 0.9);
  border: 2px solid #8B4513;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const WelcomeText = styled(Typography)`
  text-align: center;
  margin-bottom: 2rem;
  color: #2F4F4F;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const FeatureGrid = styled(Grid)`
  margin-top: 2rem;
`;

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Material Calculator',
      description: 'Calculate precise amounts of cement, aggregates, and additives for your projects',
      image: '/images/calculator.jpg',
      path: '/calculator',
    },
    {
      title: 'Project Templates',
      description: 'Browse and select from various decorative stone and planter templates',
      image: '/images/templates.jpg',
      path: '/templates',
    },
    {
      title: 'Gallery',
      description: 'View inspiring examples of completed concrete casting projects',
      image: '/images/gallery.jpg',
      path: '/gallery',
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <WelcomeText variant="h2">
          Welcome to the Medieval Concrete Studio
        </WelcomeText>
        <div>
          <FileButton />
        </div>
        <Typography
          variant="h5"
          sx={{ textAlign: 'center', mb: 4, color: '#556B2F' }}
        >
          Your guide to creating beautiful concrete garden decorations
        </Typography>
      </motion.div>

      <FeatureGrid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <StyledCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <CardMedia
                component="img"
                height="200"
                image={feature.image}
                alt={feature.title}
              />
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(feature.path)}
                >
                  Explore
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </FeatureGrid>
    </Box>
  );
};

export default Home; 