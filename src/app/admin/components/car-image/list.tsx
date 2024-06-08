import { Datagrid, List, ReferenceField, TextField } from 'react-admin';
import '../car-type/list.css';
export const CarImageList = () => (
  <List>
    <Datagrid rowClick="show" className="custom-card">
      <TextField source="id" className="custom-card-child" />
      <TextField source="imageUrl" className="custom-card-child" />
      <ReferenceField
        source="carId"
        reference="car"
        link={'show'}
        className="custom-card-child"
      />
    </Datagrid>
  </List>
);
