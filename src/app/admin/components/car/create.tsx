import { RichTextInput } from 'ra-input-rich-text';
import {
  BooleanInput,
  Create,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

const engineTypeChoices = [
  {
    id: 'DIESEL',
    name: 'Diesel',
  },
  {
    id: 'HYBRID',
    name: 'Hybrid',
  },
  {
    id: 'ELECTRIC',
    name: 'Electric',
  },
  {
    id: 'GASOLINE',
    name: 'Gasoline',
  },
];

export const CarCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput name={'name'} source={'name'} />
        <TextInput name={'model'} source={'model'} />
        <RichTextInput name={'description'} source={'description'} />
        <SelectInput
          name={'engineType'}
          source={'engineType'}
          choices={engineTypeChoices}
        />
        <NumberInput name={'price'} source={'price'} />
        <NumberInput name={'placeNumber'} source={'placeNumber'} />
        <TextInput name={'color'} source={'color'} />
        <NumberInput name={'power'} source={'power'} />
        <BooleanInput
          name={'available'}
          source={'available'}
          defaultValue={true}
        />
        <BooleanInput name={'fav'} source={'fav'} label={'Favorite'} />
        <ReferenceInput
          name={'typeId'}
          source={'typeId'}
          reference={'car-type'}
          label={'Car Type'}
        />
        <ReferenceInput
          name={'brandId'}
          source={'brandId'}
          reference={'brand'}
          label={'Car Brand'}
        />
      </SimpleForm>
    </Create>
  );
};
