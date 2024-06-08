import { Create, SimpleForm, TextInput } from 'react-admin';
import '../car-type/list.css';
export const BrandCreate = () => {
  return (
    <Create className="custom-card create">
      <SimpleForm>
        <TextInput name={'name'} source={'name'} />
        <TextInput name={'logoUrl'} source={'logoUrl'} />
      </SimpleForm>
    </Create>
  );
};
