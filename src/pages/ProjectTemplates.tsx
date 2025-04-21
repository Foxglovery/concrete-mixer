import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
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

const templates = [
  {
    id: 1,
    title: 'Classic Garden Planter',
    description: 'A timeless rectangular planter with decorative relief patterns',
    image: '/images/planter-template.jpg',
    instructions: [
      'Prepare your mold with release agent',
      'Mix concrete according to calculator specifications',
      'Pour first layer and add reinforcement mesh',
      'Pour remaining layers, tapping to remove air bubbles',
      'Allow to cure for 24-48 hours',
      'Remove mold and finish edges',
    ],
  },
  {
    id: 2,
    title: 'Natural Stone Paving',
    description: 'Irregular-shaped paving stones for a rustic pathway',
    image: '/images/paving-template.jpg',
    instructions: [
      'Create irregular-shaped mold from plywood',
      'Mix concrete with stone aggregate',
      'Pour and level surface',
      'Add texture with wire brush',
      'Cure for 48 hours',
      'Remove mold and clean edges',
    ],
  },
  {
    id: 3,
    title: 'Decorative Boulder',
    description: 'Large, natural-looking boulder for garden focal point',
    image: '/images/boulder-template.jpg',
    instructions: [
      'Build wire frame structure',
      'Mix concrete with large aggregate',
      'Apply in layers, building up shape',
      'Add texture and details',
      'Cure for 72 hours',
      'Apply final finishing touches',
    ],
  },
  {
    id: 4,
    title: 'Path Lining Stone',
    description: 'Elegant stones to border garden pathways',
    image: '/images/path-template.jpg',
    instructions: [
      'Prepare rectangular mold',
      'Mix concrete with fine aggregate',
      'Pour and level surface',
      'Add decorative pattern if desired',
      'Cure for 24 hours',
      'Remove mold and clean',
    ],
  },
];

const ProjectTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setSelectedTemplate(id);
  };

  const handleClose = () => {
    setSelectedTemplate(null);
  };

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Project Templates
      </Typography>

      <Grid container spacing={4}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={3} key={template.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={template.image}
                alt={template.title}
              />
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {template.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {template.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleOpen(template.id)}
                >
                  View Instructions
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={selectedTemplate !== null}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        {selectedTemplateData && (
          <>
            <DialogTitle>{selectedTemplateData.title}</DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <img
                  src={selectedTemplateData.image}
                  alt={selectedTemplateData.title}
                  style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {selectedTemplateData.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Instructions:
              </Typography>
              <List>
                {selectedTemplateData.instructions.map((instruction, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText primary={`${index + 1}. ${instruction}`} />
                    </ListItem>
                    {index < selectedTemplateData.instructions.length - 1 && (
                      <Divider />
                    )}
                  </React.Fragment>
                ))}
              </List>
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

export default ProjectTemplates; 