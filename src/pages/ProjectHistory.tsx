import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background: rgba(245, 245, 220, 0.9);
  border: 2px solid #8B4513;
  margin-bottom: 1rem;
`;

interface Project {
  id: number;
  name: string;
  type: string;
  date: string;
  materials: {
    cement: number;
    sand: number;
    gravel: number;
    water: number;
    additives: number;
  };
  notes: string;
}

const ProjectHistory = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Garden Planter - Celtic Design',
      type: 'Planter',
      date: '2024-03-20',
      materials: {
        cement: 25,
        sand: 50,
        gravel: 75,
        water: 15,
        additives: 2,
      },
      notes: 'Used Celtic knot pattern mold. Added stone texture for rustic look.',
    },
    {
      id: 2,
      name: 'Pathway Stones - Natural Set',
      type: 'Paving',
      date: '2024-03-15',
      materials: {
        cement: 40,
        sand: 80,
        gravel: 120,
        water: 24,
        additives: 3,
      },
      notes: 'Created irregular shapes for natural look. Added moss-like texture.',
    },
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setEditedProject({ ...project });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedProject) {
      setProjects(
        projects.map((p) => (p.id === editedProject.id ? editedProject : p))
      );
      setIsEditing(false);
      setSelectedProject(null);
      setEditedProject(null);
    }
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleClose = () => {
    setIsEditing(false);
    setSelectedProject(null);
    setEditedProject(null);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Project History
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} key={project.id}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" component="h2">
                    {project.name}
                  </Typography>
                  <Box>
                    <IconButton onClick={() => handleEdit(project)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(project.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                  Type: {project.type} | Date: {project.date}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {project.notes}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isEditing}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        {editedProject && (
          <>
            <DialogTitle>
              Edit Project
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
              <TextField
                fullWidth
                label="Project Name"
                value={editedProject.name}
                onChange={(e) =>
                  setEditedProject({ ...editedProject, name: e.target.value })
                }
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                fullWidth
                label="Project Type"
                value={editedProject.type}
                onChange={(e) =>
                  setEditedProject({ ...editedProject, type: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Materials Used:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Cement (kg)" />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      value={editedProject.materials.cement}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          materials: {
                            ...editedProject.materials,
                            cement: Number(e.target.value),
                          },
                        })
                      }
                      size="small"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Sand (kg)" />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      value={editedProject.materials.sand}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          materials: {
                            ...editedProject.materials,
                            sand: Number(e.target.value),
                          },
                        })
                      }
                      size="small"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Gravel (kg)" />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      value={editedProject.materials.gravel}
                      onChange={(e) =>
                        setEditedProject({
                          ...editedProject,
                          materials: {
                            ...editedProject.materials,
                            gravel: Number(e.target.value),
                          },
                        })
                      }
                      size="small"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={editedProject.notes}
                onChange={(e) =>
                  setEditedProject({ ...editedProject, notes: e.target.value })
                }
                sx={{ mt: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ProjectHistory; 