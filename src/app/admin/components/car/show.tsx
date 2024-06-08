import {
  BooleanField,
  DeleteButton,
  NumberField,
  ReferenceField,
  RichTextField,
  Show,
  SimpleShowLayout,
  TextField,
  Toolbar,
} from 'react-admin';
import '../car-type/list.css';

export const CarShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" className="show" />
      <TextField source="model" className="show" />
      <TextField source="name" className="show" />
      <RichTextField source="description" className="show" />
      <NumberField source="price" className="show" />
      <TextField source="engineType" className="show" />
      <NumberField source="placeNumber" className="show" />
      <TextField source="color" className="show" />
      <NumberField source="power" className="show" />
      <BooleanField source="available" className="show" />
      <BooleanField source="fav" className="show" />
      <ReferenceField
        source="typeId"
        reference="car-type"
        link={'show'}
        className="show"
      />
      <ReferenceField
        source="brandId"
        reference="brand"
        link={'show'}
        className="show"
      />
    </SimpleShowLayout>
    <Toolbar>
      <DeleteButton label={'Delete'} className="delete" />
    </Toolbar>
  </Show>
);
