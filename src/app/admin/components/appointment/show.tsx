import {
  DateField,
  DeleteButton,
  EmailField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';
import '../car-type/list.css';

export const AppointmentShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" className="show" />
      <TextField source="status" className="show" />
      <TextField source="firstName" className="show" />
      <TextField source="lastName" className="show" />
      <TextField source="message" className="show" />
      <EmailField source="email" className="show" />
      <TextField source="tel" className="show" />
      <DateField source="date" className="show" />
      <ReferenceField
        source="carId"
        reference="car"
        link={'show'}
        className="show"
      />
      <ReferenceField
        source="adminId"
        reference="admin"
        link={'show'}
        className="show"
      />
    </SimpleShowLayout>
    <DeleteButton label={'Delete'} />
  </Show>
);
