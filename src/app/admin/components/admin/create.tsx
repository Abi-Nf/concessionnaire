import { Create, PasswordInput, SimpleForm, TextInput } from 'react-admin';
import '../car-type/list.css';
export const CreateAdmin = () => {
  return (
    <Create className="black">
      <SimpleForm>
        <TextInput name={'firstName'} source={'fistName'} />
        <TextInput name={'lastName'} source={'lastName'} />
        <TextInput name={'email'} source={'email'} />
        <PasswordInput name={'password'} source={'password'} />
      </SimpleForm>
    </Create>
  );
};
