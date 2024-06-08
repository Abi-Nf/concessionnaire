'use client';
import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { SearchHookValue } from '@/src/hooks/useSearch';
import { CarTypeOptions } from './CarTypeOptions';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

interface Props {
  hook: SearchHookValue;
}

export const SearchBar = ({ hook }: Props) => {
  return (
    <div className="flex gap-2 items-end z-10 px-5 py-3 bg-zinc-800 rounded-xl shadow-lg">
      <ThemeProvider theme={darkTheme}>
        <TextField
          label="Search for vehicles"
          type="search"
          size="small"
          variant="outlined"
          onChange={hook.handleQuery}
        />

        <TextField
          inputMode="decimal"
          label="Min price"
          size="small"
          variant="outlined"
          sx={{ width: '10rem' }}
          onChange={hook.handleMinPrice}
        />

        <TextField
          inputMode="decimal"
          label="Max price"
          size="small"
          variant="outlined"
          sx={{ width: '10rem' }}
          onChange={hook.handleMaxPrice}
        />

        <FormControl sx={{ minWidth: '8rem' }} size="small" variant="outlined">
          <InputLabel id="select-motor">Motor</InputLabel>
          <Select
            label="Motor"
            labelId="select-motor"
            variant={'outlined'}
            onChange={(v) => hook.handleMotorSelect(v.target.value as string)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="HYBRID">Hybrid</MenuItem>
            <MenuItem value="DIESEL">Diesel</MenuItem>
            <MenuItem value="ELECTRIC">Electric</MenuItem>
            <MenuItem value="GASOLINE">Gasoline</MenuItem>
          </Select>
        </FormControl>

        <CarTypeOptions hook={hook} />
      </ThemeProvider>
    </div>
  );
};
