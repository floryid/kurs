import { useQuery } from 'react-query'
import { Card, CardContent, Typography, Box, Grid, Skeleton } from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'
import axios from 'axios'

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'

const POPULAR_CURRENCIES = [
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
]

function PopularCurrencies() {
  const { data: rates, isLoading } = useQuery('popularRates', async () => {
    const response = await axios.get(API_URL)
    return response.data.rates
  })

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: 'primary.main' }}>
          Mata Uang Populer
        </Typography>
        
        <Grid container spacing={2}>
          {POPULAR_CURRENCIES.map((currency) => (
            <Grid item xs={12} sm={6} key={currency.code}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="h4" sx={{ minWidth: 40 }}>
                  {currency.flag}
                </Typography>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                    {currency.code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currency.name}
                  </Typography>
                </Box>

                {isLoading ? (
                  <Skeleton width={80} height={24} />
                ) : (
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 'bold',
                        color: rates[currency.code] > 1 ? 'success.main' : 'error.main',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      {rates[currency.code] > 1 ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                      {rates[currency.code].toFixed(2)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      USD
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PopularCurrencies