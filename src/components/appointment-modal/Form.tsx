import { sendAppointment } from '@/src/provider/mailer';
import { z } from 'zod';
import { PropsWithChildren, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Snackbar, TextField } from '@mui/material';
import { DateTimeField } from '@mui/x-date-pickers';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiProvider } from '@/src/provider/api-provider';

interface Props {
  onSent(): void;
  carId: string;
}

const schema = z.object({
  firstName: z
    .string({ required_error: 'required value' })
    .min(1, 'required value'),
  from_name: z
    .string({ required_error: 'required value' })
    .min(1, 'required value'),
  message: z
    .string({ required_error: 'required value' })
    .min(1, 'required value'),
  email: z.string().email(),
  tel: z.string({ required_error: 'required value' }),
  date: z.string().datetime(),
});

export const Form = ({ children, carId, onSent }: PropsWithChildren<Props>) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const watchError = (label: string, key: keyof typeof errors) => {
    return {
      error: !!errors[key],
      label: errors[key]?.message || label,
    };
  };

  const handleDataToSend = async (data: z.infer<typeof schema>) => {
    try {
      await sendAppointment(formRef.current as HTMLFormElement);
      const response = await apiProvider.appointment.create({
        carId,
        date: new Date(data.date),
        message: data.message,
        tel: data.tel,
        firstName: data.firstName,
        lastName: data.from_name,
        email: data.email,
      });
      if (response.id) onSent();
      setOpen({ type: 'success', message: 'appointment sent !' });
    } catch (e) {
      setOpen({ type: 'error', message: 'cannot send appointment' });
    }
  };

  const handleClose = () => setOpen(null);

  const registerDate = () => {
    const { onChange, ...r } = register('date');
    return r;
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(handleDataToSend)}>
      <div className="pt-5 flex flex-col gap-4 relative">
        {carId ? (
          <input
            type="text"
            name="car_id"
            value={carId}
            defaultValue={carId}
            hidden
          />
        ) : null}
        <div className="flex items-center gap-2">
          <TextField
            {...register('firstName', { required: 'required value' })}
            {...watchError('Firstname', 'firstName')}
          />
          <TextField
            {...watchError('Lastname', 'from_name')}
            {...register('from_name', { required: 'required value' })}
          />
        </div>
        <TextField {...watchError('Email', 'email')} {...register('email')} />
        <TextField
          {...watchError('Phone', 'tel')}
          {...register('tel', { required: 'required value' })}
        />
        <DateTimeField
          format="y/MMMM/dd hh:mm"
          {...watchError('Availability date', 'date')}
          {...registerDate()}
          onChange={(v) => setValue('date', v?.toISOString() || '')}
        />
        <TextField
          multiline
          {...register('message', { required: 'required value' })}
          inputProps={{
            sx: { height: '14rem', maxHeight: '14rem' },
            style: { height: '14rem', maxHeight: '14rem' },
          }}
          {...watchError('Message', 'message')}
        />
      </div>
      {children}
      <Snackbar
        open={open !== null}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          severity={open?.type}
          onClose={handleClose}
          sx={{ width: '100%' }}
        >
          {open?.message}
        </Alert>
      </Snackbar>
    </form>
  );
};
