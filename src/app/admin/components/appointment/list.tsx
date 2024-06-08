import {
  Datagrid,
  DateField,
  EditButton,
  EmailField,
  List,
  ReferenceField,
  TextField,
} from 'react-admin';

import '../car-type/list.css';

export const AppointmentList = () => (
  <List>
    <Datagrid rowClick="show" className="custom-card-car">
      <TextField source="id" className="custom-card-child-car" />
      <TextField source="status" className="custom-card-child-car" />
      <TextField source="firstName" className="custom-card-child-car" />
      <TextField source="lastName" className="custom-card-child-car" />
      <TextField source="message" className="custom-card-child-car" />
      <EmailField source="email" className="custom-card-child-car" />
      <TextField source="tel" className="custom-card-child-car" />
      <DateField source="date" className="custom-card-child-car" />
      <ReferenceField
        source="carId"
        reference="car"
        link={'show'}
        className="custom-card-child-car"
      />
      <ReferenceField
        source="adminId"
        reference="admin"
        link={'show'}
        className="custom-card-child-car"
      />
      <EditButton label={'Edit'} />
    </Datagrid>
  </List>
);
