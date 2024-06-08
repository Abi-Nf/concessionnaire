import { Datagrid, List, TextField } from 'react-admin';
import '../car-type/list.css';

export const BrandList = () => (
  <List>
    <Datagrid rowClick="show" className="custom-card">
      <TextField source="id" className="custom-card-child" />
      <TextField source="name" className="custom-card-child" />
      <TextField source="logoUrl" className="custom-card-child" />
    </Datagrid>
  </List>
);
