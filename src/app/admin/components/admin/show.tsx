import {
  DeleteButton,
  EmailField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

import '../car-type/list.css';

export const AdminShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" className="show" />
      <EmailField source="email" className="show" />
      <TextField source="firstName" className="show" />
      <TextField source="lastName" className="show" />
    </SimpleShowLayout>
    <DeleteButton label={'Delete'} className="delete" />
  </Show>
);
