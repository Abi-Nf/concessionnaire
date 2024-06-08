import { Create, SimpleForm, TextInput } from 'react-admin';
import './list.css';
export const CarTypeCreate = () => {
  return (
    <Create className="custom-card create">
      <SimpleForm>
        <TextInput source={'name'} name={'name'} className="input" />
        <TextInput
          name={'description'}
          source={'description'}
          className="input"
        />
      </SimpleForm>
    </Create>
  );
};
