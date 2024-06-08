import { DeleteButton, Show, SimpleShowLayout, TextField } from 'react-admin';
import '../car-type/list.css';
export const BrandShow = () => (
  <Show>
    <SimpleShowLayout className="show">
      <TextField source="id" className="show" />
      <TextField source="name" className="show" />
      <TextField source="logoUrl" className="show" />
    </SimpleShowLayout>
    <DeleteButton label={'Delete'} className="delete" />
  </Show>
);
