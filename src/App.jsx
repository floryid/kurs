import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material'
import CurrencyConverter from './components/CurrencyConverter'
import ExchangeRateTable from './components/ExchangeRateTable'
import CurrencyChart from './components/CurrencyChart'
import PopularCurrencies from './components/PopularCurrencies'

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Kurs Mata Uang Di Dunia
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <CurrencyConverter />
          <PopularCurrencies />
          <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
            <CurrencyChart />
          </Box>
          <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
            <ExchangeRateTable />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default App