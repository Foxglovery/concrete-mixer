import React, { useState, useEffect } from 'react';
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
  Card,
  CardContent,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

const ScrollingText = styled.div`
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  z-index: 9999;
  white-space: nowrap;
  overflow: hidden;
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

interface MaterialPrices {
  cement: number;
  sand: number;
  gravel: number;
  water: number;
  additives: number;
}

interface Plant {
  name: string;
  type: 'vegetable' | 'herb' | 'flower' | 'fruit';
  plantingTime: string[];
  harvestTime: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GrowingZone {
  zone: string;
  description: string;
  avgTemp: string;
  plants: Plant[];
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
    color: '#808080',
  });
  const [inventory, setInventory] = useState<Inventory>({
    cement: 0,
    sand: 0,
    gravel: 0,
    water: 0,
    additives: 0,
  });
  const [prices, setPrices] = useState<MaterialPrices>({
    cement: 0,
    sand: 0,
    gravel: 0,
    water: 0,
    additives: 0,
  });
  const [selectedZone, setSelectedZone] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [scrollingText, setScrollingText] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const growingZones: GrowingZone[] = [
    {
      zone: 'Zone 3',
      description: 'Cold climate, short growing season',
      avgTemp: '-40°F to -30°F',
      plants: [
        { name: 'Kale', type: 'vegetable', plantingTime: ['Spring', 'Fall'], harvestTime: ['Summer', 'Winter'], difficulty: 'easy' },
        { name: 'Spinach', type: 'vegetable', plantingTime: ['Spring', 'Fall'], harvestTime: ['Summer', 'Winter'], difficulty: 'easy' },
        { name: 'Peas', type: 'vegetable', plantingTime: ['Spring'], harvestTime: ['Summer'], difficulty: 'easy' },
        { name: 'Radishes', type: 'vegetable', plantingTime: ['Spring', 'Fall'], harvestTime: ['Summer', 'Winter'], difficulty: 'easy' },
      ]
    },
    {
      zone: 'Zone 4',
      description: 'Cold climate, moderate growing season',
      avgTemp: '-30°F to -20°F',
      plants: [
        { name: 'Lettuce', type: 'vegetable', plantingTime: ['Spring', 'Fall'], harvestTime: ['Summer', 'Winter'], difficulty: 'easy' },
        { name: 'Carrots', type: 'vegetable', plantingTime: ['Spring'], harvestTime: ['Summer', 'Fall'], difficulty: 'medium' },
        { name: 'Beets', type: 'vegetable', plantingTime: ['Spring'], harvestTime: ['Summer', 'Fall'], difficulty: 'easy' },
        { name: 'Chives', type: 'herb', plantingTime: ['Spring'], harvestTime: ['Summer', 'Fall'], difficulty: 'easy' },
      ]
    },
    {
      zone: 'Zone 5',
      description: 'Moderate climate, good growing season',
      avgTemp: '-20°F to -10°F',
      plants: [
        { name: 'Tomatoes', type: 'vegetable', plantingTime: ['Spring'], harvestTime: ['Summer', 'Fall'], difficulty: 'medium' },
        { name: 'Basil', type: 'herb', plantingTime: ['Spring'], harvestTime: ['Summer', 'Fall'], difficulty: 'easy' },
        { name: 'Zucchini', type: 'vegetable', plantingTime: ['Spring'], harvestTime: ['Summer', 'Fall'], difficulty: 'easy' },
        { name: 'Marigolds', type: 'flower', plantingTime: ['Spring'], harvestTime: ['Summer', 'Fall'], difficulty: 'easy' },
      ]
    },
    {
      zone: 'Zone 6',
      description: 'Moderate climate, long growing season',
      avgTemp: '-10°F to 0°F',
      plants: [
        { name: 'Bell Peppers', type: 'vegetable', plantingTime: ['Spring'], harvestTime: ['Summer', 'Fall'], difficulty: 'medium' },
        { name: 'Cucumbers', type: 'vegetable', plantingTime: ['Spring'], harvestTime: ['Summer', 'Fall'], difficulty: 'medium' },
        { name: 'Rosemary', type: 'herb', plantingTime: ['Spring'], harvestTime: ['Year-round'], difficulty: 'medium' },
        { name: 'Strawberries', type: 'fruit', plantingTime: ['Spring'], harvestTime: ['Summer'], difficulty: 'medium' },
      ]
    },
    {
      zone: 'Zone 7',
      description: 'Mild climate, very long growing season',
      avgTemp: '0°F to 10°F',
      plants: [
        { name: 'Eggplant', type: 'vegetable', plantingTime: ['Spring'], harvestTime: ['Summer', 'Fall'], difficulty: 'medium' },
        { name: 'Oregano', type: 'herb', plantingTime: ['Spring'], harvestTime: ['Year-round'], difficulty: 'easy' },
        { name: 'Lavender', type: 'herb', plantingTime: ['Spring'], harvestTime: ['Summer'], difficulty: 'medium' },
        { name: 'Blueberries', type: 'fruit', plantingTime: ['Spring'], harvestTime: ['Summer'], difficulty: 'hard' },
      ]
    },
    {
      zone: 'Zone 8',
      description: 'Warm climate, year-round growing',
      avgTemp: '10°F to 20°F',
      plants: [
        { name: 'Sweet Potatoes', type: 'vegetable', plantingTime: ['Spring'], harvestTime: ['Fall'], difficulty: 'medium' },
        { name: 'Thyme', type: 'herb', plantingTime: ['Spring'], harvestTime: ['Year-round'], difficulty: 'easy' },
        { name: 'Citrus Trees', type: 'fruit', plantingTime: ['Spring'], harvestTime: ['Winter'], difficulty: 'hard' },
        { name: 'Bougainvillea', type: 'flower', plantingTime: ['Spring'], harvestTime: ['Year-round'], difficulty: 'medium' },
      ]
    },
  ];

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
  };

  const getPlantsForCurrentSeason = () => {
    if (!selectedZone) return [];
    const zone = growingZones.find(z => z.zone === selectedZone);
    if (!zone) return [];
    const currentSeason = getCurrentSeason();
    return zone.plants.filter(plant => 
      plant.plantingTime.includes(currentSeason) || plant.plantingTime.includes('Year-round')
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  // Scrolling text animation
  useEffect(() => {
    if (isScrolling && scrollingText) {
      const interval = setInterval(() => {
        setScrollPosition(prev => {
          const newPosition = prev - 2;
          if (newPosition < -window.innerWidth - 1000) {
            setIsScrolling(false);
            setScrollPosition(0);
            return 0;
          }
          return newPosition;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isScrolling, scrollingText]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitText = (text: string) => {
    setScrollingText(text);
    setIsScrolling(true);
    setScrollPosition(window.innerWidth);
    setIsDialogOpen(false);
  };

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

  const calculateTotalCost = () => {
    return (
      materialMix.cement * prices.cement +
      materialMix.sand * prices.sand +
      materialMix.gravel * prices.gravel +
      materialMix.water * prices.water +
      materialMix.additives * prices.additives
    );
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

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleOpenDialog}
              sx={{ mt: 2 }}
            >
              What's Going On?
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

            <ResultCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Cost Estimation
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cement Price (per kg)"
                      type="number"
                      value={prices.cement}
                      onChange={(e) => setPrices({ ...prices, cement: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography>$</Typography>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Sand Price (per kg)"
                      type="number"
                      value={prices.sand}
                      onChange={(e) => setPrices({ ...prices, sand: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography>$</Typography>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Gravel Price (per kg)"
                      type="number"
                      value={prices.gravel}
                      onChange={(e) => setPrices({ ...prices, gravel: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography>$</Typography>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Water Price (per L)"
                      type="number"
                      value={prices.water}
                      onChange={(e) => setPrices({ ...prices, water: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography>$</Typography>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Additives Price (per kg)"
                      type="number"
                      value={prices.additives}
                      onChange={(e) => setPrices({ ...prices, additives: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography>$</Typography>,
                      }}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Cost Breakdown
                </Typography>
                <Typography variant="body1">
                  Cement: ${(materialMix.cement * prices.cement).toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Sand: ${(materialMix.sand * prices.sand).toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Gravel: ${(materialMix.gravel * prices.gravel).toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Water: ${(materialMix.water * prices.water).toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Additives: ${(materialMix.additives * prices.additives).toFixed(2)}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" color="primary">
                  Total Cost: ${calculateTotalCost().toFixed(2)}
                </Typography>
              </CardContent>
            </ResultCard>

            <ResultCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Growing Zone & Planting Guide
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Select Your Growing Zone</InputLabel>
                  <Select
                    value={selectedZone}
                    label="Select Your Growing Zone"
                    onChange={(e) => setSelectedZone(e.target.value)}
                  >
                    {growingZones.map((zone) => (
                      <MenuItem key={zone.zone} value={zone.zone}>
                        {zone.zone} - {zone.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedZone && (
                  <>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Zone Information
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Zone:</strong> {selectedZone}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Description:</strong> {growingZones.find(z => z.zone === selectedZone)?.description}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Average Temperature Range:</strong> {growingZones.find(z => z.zone === selectedZone)?.avgTemp}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Current Season:</strong> {getCurrentSeason()}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="h6" gutterBottom>
                      Plants to Plant Right Now ({getCurrentSeason()})
                    </Typography>
                    
                    {getPlantsForCurrentSeason().length > 0 ? (
                      <List>
                        {getPlantsForCurrentSeason().map((plant, index) => (
                          <ListItem key={index} sx={{ border: '1px solid #ddd', borderRadius: 1, mb: 1 }}>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {plant.name}
                                  </Typography>
                                  <Chip 
                                    label={plant.type} 
                                    size="small" 
                                    color="primary" 
                                    variant="outlined"
                                  />
                                  <Chip 
                                    label={plant.difficulty} 
                                    size="small" 
                                    color={getDifficultyColor(plant.difficulty) as any}
                                  />
                                </Box>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    <strong>Planting Time:</strong> {plant.plantingTime.join(', ')}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    <strong>Harvest Time:</strong> {plant.harvestTime.join(', ')}
                                  </Typography>
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body1" color="text.secondary">
                        No plants are recommended for planting in {getCurrentSeason()} in {selectedZone}.
                      </Typography>
                    )}
                  </>
                )}
              </CardContent>
            </ResultCard>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Scrolling Text Overlay */}
      {isScrolling && (
        <ScrollingText>
          <div style={{ transform: `translateX(${scrollPosition}px)` }}>
            {scrollingText}
          </div>
        </ScrollingText>
      )}

      {/* Dialog for text input */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>What's Going On?</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tell us what's happening..."
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const target = e.target as HTMLInputElement;
                handleSubmitText(target.value);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={() => {
              const input = document.querySelector('input[type="text"], textarea') as HTMLInputElement;
              if (input) {
                handleSubmitText(input.value);
              }
            }}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaterialCalculator; 