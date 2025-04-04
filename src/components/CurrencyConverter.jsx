import { useState } from 'react'
import { useQuery } from 'react-query'
import { Card, CardContent, TextField, Typography, Box, IconButton, CircularProgress } from '@mui/material'
import { SwapHoriz } from '@mui/icons-material'
import axios from 'axios'

const API_KEY = 'YOUR_API_KEY' // Replace with your actual API key
const API_URL = 'https://api.exchangerate-api.com/v4/latest'

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('IDR')
  const [amount, setAmount] = useState(1)

  const { data: rates, isLoading } = useQuery(['exchangeRates', fromCurrency], async () => {
    const response = await axios.get(`${API_URL}/${fromCurrency}`)
    return response.data.rates
  })

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const convertedAmount = rates ? (amount * rates[toCurrency]).toFixed(2) : 0

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: 'primary.main' }}>
          Konversi Mata Uang
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Jumlah"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value)) || 0)}
            fullWidth
            InputProps={{
              inputProps: { min: 0 }
            }}
          />

          <TextField
            select
            label="Dari"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            fullWidth
            SelectProps={{
              native: true
            }}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="IDR">IDR - Indonesian Rupiah</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="GBP">GBP - British Pound</option>
          </TextField>

          <IconButton onClick={handleSwapCurrencies} color="primary" sx={{ mx: 1 }}>
            <SwapHoriz />
          </IconButton>

          <TextField
            select
            label="Ke"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            fullWidth
            SelectProps={{
              native: true
            }}
          >
            <option value="IDR">IDR - Indonesian Rupiah</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="GBP">GBP - British Pound</option>
          </TextField>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default CurrencyConverter