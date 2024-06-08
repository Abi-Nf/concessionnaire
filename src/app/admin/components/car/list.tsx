import { CarData } from 'provider/api/car';
import {
  BooleanField,
  Datagrid,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from 'react-admin';
import '../car-type/list.css';

export const CarList = () => (
  <List>
    <Datagrid rowClick="show" className="custom-card-car">
      <TextField source="id" className="custom-card-child-car" />
      <TextField source="model" className="custom-card-child-car" />
      <TextField source="name" className="custom-card-child-car" />
      <FunctionField
        source={'description'}
        label={'Description'}
        render={(record: CarData) =>
          `${record.description?.slice(0, 70) || ''}...`
        }
        className="custom-card-child-car"
      />
      <NumberField source="price" className="custom-card-child-car" />
      <TextField source="engineType" className="custom-card-child-car" />
      <NumberField source="placeNumber" className="custom-card-child-car" />
      <TextField source="color" className="custom-card-child-car" />
      <NumberField source="power" className="custom-card-child-car" />
      <BooleanField source="available" className="custom-card-child-car" />
      <BooleanField source="fav" className="custom-card-child-car" />
      <ReferenceField
        source="typeId"
        reference="car-type"
        link={'show'}
        className="custom-card-child-car"
      />
      <ReferenceField
        source="brandId"
        reference="brand"
        link={'show'}
        className="custom-card-child-car"
      />
    </Datagrid>
  </List>
);
