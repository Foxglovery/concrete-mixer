import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';

// Pages
import Home from './pages/Home';
import MaterialCalculator from './pages/MaterialCalculator';
import ProjectTemplates from './pages/ProjectTemplates';
import Gallery from './pages/Gallery';
import ProjectHistory from './pages/ProjectHistory';

// Components
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<MaterialCalculator />} />
            <Route path="/templates" element={<ProjectTemplates />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/history" element={<ProjectHistory />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 