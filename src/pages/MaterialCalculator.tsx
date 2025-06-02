import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Button,
  Slider,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  background: rgba(245, 245, 220, 0.9);
  border: 2px solid #8B4513;
`;

const ResultCard = styled(Card)`
  background: rgba(210, 180, 140, 0.9);
  border: 2px solid #8B4513;
  margin-top: 2rem;
`;

const ColorPreview = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  border: 2px solid #8B4513;
  background-color: ${props => props.color};
  margin: 10px 0;
`;

const InventoryCard = styled(Card)`
  background: rgba(210, 180, 140, 0.9);
  border: 2px solid #8B4513;
  margin-top: 2rem;
`;

interface MaterialMix {
  cement: number;
  sand: number;
  gravel: number;
  water: number;
  additives: number;
  color: string;
}

interface Inventory {
  cement: number;
  sand: number;
  gravel: number;
  water: number;
  additives: number;
}

const MaterialCalculator = () => {
  const [projectType, setProjectType] = useState('');
  const [dimensions, setDimensions] = useState({
    length: 0,
    width: 0,
    height: 0,
  });
  const [materialMix, setMaterialMix] = useState<MaterialMix>({
    cement: 0,
    sand: 0,
    gravel: 0,
    water: 0,
    additives: 0,
    color: '#808080', // Default gray color
  });
  const [inventory, setInventory] = useState<Inventory>({
    cement: 0,
    sand: 0,
    gravel: 0,
    water: 0,
    additives: 0,
  });

  const projectTypes = [
    { value: 'planter', label: 'Garden Planter' },
    { value: 'paving', label: 'Paving Stone' },
    { value: 'boulder', label: 'Decorative Boulder' },
    { value: 'path', label: 'Path Lining Stone' },
  ];

  const calculateMaterials = () => {
    const volume = dimensions.length * dimensions.width * dimensions.height;
    // These are example ratios - in a real app, these would be more sophisticated
    const mix = {
      cement: volume * 0.15,
      sand: volume * 0.3,
      gravel: volume * 0.45,
      water: volume * 0.1,
      additives: volume * 0.02,
      color: materialMix.color,
    };
    setMaterialMix(mix);
  };

  const getMaterialStatus = (required: number, available: number) => {
    const difference = available - required;
    if (difference >= 0) {
      return { status: 'sufficient', message: `You have ${difference.toFixed(2)} kg/L extra` };
    } else {
      return { status: 'insufficient', message: `You need ${Math.abs(difference).toFixed(2)} kg/L more` };
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Material Calculator
      </Typography>

      <StyledPaper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Project Type</InputLabel>
              <Select
                value={projectType}
                label="Project Type"
                onChange={(e) => setProjectType(e.target.value)}
              >
                {projectTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <Typography gutterBottom>Stone Color</Typography>
              <input
                type="color"
                value={materialMix.color}
                onChange={(e) => setMaterialMix({ ...materialMix, color: e.target.value })}
                style={{ width: '100%', height: '40px' }}
              />
              <ColorPreview color={materialMix.color} />
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Length (cm)"
                  type="number"
                  value={dimensions.length}
                  onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Width (cm)"
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={calculateMaterials}
              sx={{ mt: 3 }}
            >
              Calculate Materials
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <ResultCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Required Materials
                </Typography>
                <Typography variant="body1">
                  Cement: {materialMix.cement.toFixed(2)} kg
                </Typography>
                <Typography variant="body1">
                  Sand: {materialMix.sand.toFixed(2)} kg
                </Typography>
                <Typography variant="body1">
                  Gravel: {materialMix.gravel.toFixed(2)} kg
                </Typography>
                <Typography variant="body1">
                  Water: {materialMix.water.toFixed(2)} L
                </Typography>
                <Typography variant="body1">
                  Additives: {materialMix.additives.toFixed(2)} kg
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Selected Color:
                </Typography>
                <ColorPreview color={materialMix.color} />
              </CardContent>
            </ResultCard>

            <InventoryCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Your Inventory
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cement Available (kg)"
                      type="number"
                      value={inventory.cement}
                      onChange={(e) => setInventory({ ...inventory, cement: Number(e.target.value) })}
                    />
                    {materialMix.cement > 0 && (
                      <Typography variant="body2" color={getMaterialStatus(materialMix.cement, inventory.cement).status === 'sufficient' ? 'success.main' : 'error.main'}>
                        {getMaterialStatus(materialMix.cement, inventory.cement).message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Sand Available (kg)"
                      type="number"
                      value={inventory.sand}
                      onChange={(e) => setInventory({ ...inventory, sand: Number(e.target.value) })}
                    />
                    {materialMix.sand > 0 && (
                      <Typography variant="body2" color={getMaterialStatus(materialMix.sand, inventory.sand).status === 'sufficient' ? 'success.main' : 'error.main'}>
                        {getMaterialStatus(materialMix.sand, inventory.sand).message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Gravel Available (kg)"
                      type="number"
                      value={inventory.gravel}
                      onChange={(e) => setInventory({ ...inventory, gravel: Number(e.target.value) })}
                    />
                    {materialMix.gravel > 0 && (
                      <Typography variant="body2" color={getMaterialStatus(materialMix.gravel, inventory.gravel).status === 'sufficient' ? 'success.main' : 'error.main'}>
                        {getMaterialStatus(materialMix.gravel, inventory.gravel).message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Water Available (L)"
                      type="number"
                      value={inventory.water}
                      onChange={(e) => setInventory({ ...inventory, water: Number(e.target.value) })}
                    />
                    {materialMix.water > 0 && (
                      <Typography variant="body2" color={getMaterialStatus(materialMix.water, inventory.water).status === 'sufficient' ? 'success.main' : 'error.main'}>
                        {getMaterialStatus(materialMix.water, inventory.water).message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Additives Available (kg)"
                      type="number"
                      value={inventory.additives}
                      onChange={(e) => setInventory({ ...inventory, additives: Number(e.target.value) })}
                    />
                    {materialMix.additives > 0 && (
                      <Typography variant="body2" color={getMaterialStatus(materialMix.additives, inventory.additives).status === 'sufficient' ? 'success.main' : 'error.main'}>
                        {getMaterialStatus(materialMix.additives, inventory.additives).message}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </InventoryCard>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default MaterialCalculator; 