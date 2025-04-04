import { useState } from 'react'
import { useQuery } from 'react-query'
import { Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'

const API_URL = 'https://api.exchangerate-api.com/v4/latest'

function CurrencyChart() {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')

  const { data: chartData, isLoading } = useQuery(['currencyHistory', selectedCurrency], async () => {
    const response = await axios.get(`${API_URL}/USD`)
    // Simulasi data historis karena API gratis tidak menyediakan data historis
    const today = new Date()
    const data = []
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const randomFactor = 0.98 + Math.random() * 0.04 // Random fluctuation ±2%
      data.push({
        date: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        rate: (response.data.rates[selectedCurrency] * randomFactor).toFixed(4)
      })
    }
    return data
  })

  return (
    <Card sx={{ height: '100%', minHeight: 400 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
            Grafik Nilai Tukar
          </Typography>
          
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Mata Uang</InputLabel>
            <Select
              value={selectedCurrency}
              label="Mata Uang"
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              <MenuItem value="EUR">EUR - Euro</MenuItem>
              <MenuItem value="GBP">GBP - British Pound</MenuItem>
              <MenuItem value="JPY">JPY - Japanese Yen</MenuItem>
              <MenuItem value="IDR">IDR - Indonesian Rupiah</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ height: 300, width: '100%' }}>
          {!isLoading && chartData && (
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={['auto', 'auto']}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#2196F3"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default CurrencyChart