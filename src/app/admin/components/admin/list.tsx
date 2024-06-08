import { Datagrid, EmailField, List, TextField } from 'react-admin';
import '../car-type/list.css';
export const AdminList = () => (
  <List>
    <Datagrid rowClick="show" className="custom-card-car">
      <TextField source="id" className="custom-card-child-car" />
      <EmailField source="email" className="custom-card-child-car" />
      <TextField source="firstName" className="custom-card-child-car" />
      <TextField source="lastName" className="custom-card-child-car" />
    </Datagrid>
  </List>
);
