import { SearchHookValue } from '@/src/hooks/useSearch';
import { apiProvider } from '@/src/provider/api-provider';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useQuery } from 'react-query';

interface Props {
  hook: SearchHookValue;
}

export const CarTypeOptions = ({ hook }: Props) => {
  const { data } = useQuery({
    queryKey: ['get-car-types'],
    queryFn: () => apiProvider.carType.all(),
  });

  return (
    <FormControl sx={{ minWidth: '6rem' }} size="small" variant="outlined">
      <InputLabel id="select-type">Type</InputLabel>
      <Select
        label="Type"
        labelId="select-type"
        variant={'outlined'}
        onChange={(v) => hook.handleTypeSelect(v.target.value as string)}
      >
        <MenuItem value="">None</MenuItem>
        {data?.map((v) => (
          <MenuItem value={v.id} key={v.id}>
            {v.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
