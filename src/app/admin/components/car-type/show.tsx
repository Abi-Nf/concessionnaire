import { DeleteButton, Show, SimpleShowLayout, TextField } from 'react-admin';
import './list.css';

export const CarTypeShow = () => (
  <Show>
    <SimpleShowLayout className="show">
      <TextField source="id" className="show" />
      <TextField source="name" className="show" />
      <TextField source="description" className="show" />
    </SimpleShowLayout>
    <DeleteButton label={'Delete'} className="delete" />
  </Show>
);
