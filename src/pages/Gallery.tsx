import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  height: 100%;
  background: rgba(245, 245, 220, 0.9);
  border: 2px solid #8B4513;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const projects = [
  {
    id: 1,
    title: 'Medieval Garden Planter',
    description: 'A beautiful planter with Celtic knot patterns and stone texture',
    image: '/images/gallery/planter1.jpg',
    tags: ['Planter', 'Celtic', 'Stone Texture'],
    likes: 42,
    materials: ['Portland Cement', 'Fine Sand', 'Stone Aggregate'],
  },
  {
    id: 2,
    title: 'Rustic Pathway',
    description: 'Natural-looking paving stones creating a winding garden path',
    image: '/images/gallery/path1.jpg',
    tags: ['Paving', 'Natural', 'Pathway'],
    likes: 38,
    materials: ['Concrete Mix', 'Large Aggregate', 'Color Additive'],
  },
  {
    id: 3,
    title: 'Garden Boulder',
    description: 'Large decorative boulder with moss-like texture',
    image: '/images/gallery/boulder1.jpg',
    tags: ['Boulder', 'Natural', 'Focal Point'],
    likes: 56,
    materials: ['High-Strength Concrete', 'Wire Mesh', 'Texture Tools'],
  },
  {
    id: 4,
    title: 'Border Stones',
    description: 'Elegant border stones with geometric patterns',
    image: '/images/gallery/border1.jpg',
    tags: ['Border', 'Geometric', 'Decorative'],
    likes: 29,
    materials: ['White Cement', 'Fine Aggregate', 'Pattern Molds'],
  },
];

const Gallery = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setSelectedProject(id);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Project Gallery
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="250"
                image={project.image}
                alt={project.title}
              />
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(project.id)}
                  >
                    View Details
                  </Button>
                  <Box>
                    <IconButton size="small">
                      <FavoriteIcon />
                      <Typography variant="caption" sx={{ ml: 1 }}>
                        {project.likes}
                      </Typography>
                    </IconButton>
                    <IconButton size="small">
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={selectedProject !== null}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        {selectedProjectData && (
          <>
            <DialogTitle>
              {selectedProjectData.title}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <img
                  src={selectedProjectData.image}
                  alt={selectedProjectData.title}
                  style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {selectedProjectData.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Materials Used:
              </Typography>
              <Box sx={{ mb: 2 }}>
                {selectedProjectData.materials.map((material) => (
                  <Chip
                    key={material}
                    label={material}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Gallery; 