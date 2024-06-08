import {
  DateInput,
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

// "PENDING" | "ARCHIVED" | "REJECTED" | "ACCEPTED"

const appointmentStatusChoices = [
  {
    id: 'PENDING',
    name: 'Pending',
  },
  {
    id: 'ARCHIVED',
    name: 'Archived',
  },
  {
    id: 'REJECTED',
    name: 'Rejected',
  },
  {
    id: 'ACCEPTED',
    name: 'Accepted',
  },
];

export const AppointmentEdit = () => (
  <Edit>
    <SimpleForm>
      <SelectInput
        name={'status'}
        source="status"
        choices={appointmentStatusChoices}
      />
      <TextInput name={'firstName'} source="firstName" disabled />
      <TextInput name={'lastName'} source="lastName" disabled />
      <TextInput name={'message'} source="message" disabled />
      <TextInput type={'email'} name={'email'} source="email" disabled />
      <TextInput name={'tel'} source="tel" disabled />
      <DateInput name={'date'} source="date" disabled />
      <ReferenceInput name={'carId'} source="carId" reference="car">
        <SelectInput readOnly />
      </ReferenceInput>
      <ReferenceInput name={'adminId'} source="adminId" reference="admin" />
    </SimpleForm>
  </Edit>
);
