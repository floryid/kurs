import { useState } from 'react'
import { useQuery } from 'react-query'
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  TableSortLabel,
  CircularProgress,
} from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'
import axios from 'axios'

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'

const CURRENCY_INFO = {
  USD: { name: 'US Dollar', flag: '🇺🇸' },
  EUR: { name: 'Euro', flag: '🇪🇺' },
  GBP: { name: 'British Pound', flag: '🇬🇧' },
  JPY: { name: 'Japanese Yen', flag: '🇯🇵' },
  AUD: { name: 'Australian Dollar', flag: '🇦🇺' },
  CAD: { name: 'Canadian Dollar', flag: '🇨🇦' },
  CHF: { name: 'Swiss Franc', flag: '🇨🇭' },
  CNY: { name: 'Chinese Yuan', flag: '🇨🇳' },
  HKD: { name: 'Hong Kong Dollar', flag: '🇭🇰' },
  NZD: { name: 'New Zealand Dollar', flag: '🇳🇿' },
  SEK: { name: 'Swedish Krona', flag: '🇸🇪' },
  KRW: { name: 'South Korean Won', flag: '🇰🇷' },
  SGD: { name: 'Singapore Dollar', flag: '🇸🇬' },
  IDR: { name: 'Indonesian Rupiah', flag: '🇮🇩' },
  MYR: { name: 'Malaysian Ringgit', flag: '🇲🇾' },
}

function ExchangeRateTable() {
  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState('code')
  const [order, setOrder] = useState('asc')

  const { data: rates, isLoading } = useQuery('allRates', async () => {
    const response = await axios.get(API_URL)
    return response.data.rates
  })

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const formatCurrencyData = () => {
    if (!rates) return []
    return Object.entries(rates)
      .filter(([code]) => CURRENCY_INFO[code])
      .map(([code, rate]) => ({
        code,
        rate,
        ...CURRENCY_INFO[code],
      }))
      .filter(
        (currency) =>
          currency.code.toLowerCase().includes(search.toLowerCase()) ||
          currency.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const compareValue = (va, vb) => (order === 'asc' ? va > vb : va < vb)
        if (orderBy === 'code') return compareValue(a.code, b.code) ? 1 : -1
        if (orderBy === 'name') return compareValue(a.name, b.name) ? 1 : -1
        return compareValue(a.rate, b.rate) ? 1 : -1
      })
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
            Tabel Kurs Mata Uang
          </Typography>
          <TextField
            size="small"
            label="Cari Mata Uang"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 200 }}
          />
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 440, overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'code'}
                    direction={orderBy === 'code' ? order : 'asc'}
                    onClick={() => handleSort('code')}
                  >
                    Kode
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Nama Mata Uang
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === 'rate'}
                    direction={orderBy === 'rate' ? order : 'asc'}
                    onClick={() => handleSort('rate')}
                  >
                    Nilai Tukar (USD)
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">Tren</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : (
                formatCurrencyData().map((currency) => (
                  <TableRow key={currency.code} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                      </Box>
                    </TableCell>
                    <TableCell>{currency.name}</TableCell>
                    <TableCell align="right">{currency.rate.toFixed(4)}</TableCell>
                    <TableCell align="center">
                      {currency.rate > 1 ? (
                        <TrendingUp sx={{ color: 'success.main' }} />
                      ) : (
                        <TrendingDown sx={{ color: 'error.main' }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default ExchangeRateTable