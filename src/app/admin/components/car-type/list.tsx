import { Box, Card } from '@mui/material';
import { Datagrid, List, TextField } from 'react-admin';
import './list.css';

export const CarTypeList = () => (
  <Card>
    <List>
      <Datagrid rowClick="show" className="custom-card">
        <TextField source="id" className="custom-card-child"></TextField>
        <TextField source="name" className="custom-card-child"></TextField>
        <TextField
          source="description"
          className="custom-card-child"
        ></TextField>
      </Datagrid>
    </List>
  </Card>
);
