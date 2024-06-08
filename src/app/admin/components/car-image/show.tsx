import {
  DeleteButton,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';
import '../car-type/list.css';
export const CarImageShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" className="show" />
      <TextField source="imageUrl" className="show" />
      <ReferenceField
        source="carId"
        reference="car"
        link={'show'}
        className="show"
      />
    </SimpleShowLayout>
    <DeleteButton label={'Delete'} className="delete" />
  </Show>
);
