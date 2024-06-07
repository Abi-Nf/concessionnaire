'use client';
import { sendContact } from '@/src/provider/mailer';
import { z } from 'zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

type FormInput = z.infer<typeof schema>;

export const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [cantSend, cannotSend] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const handleDataToSend = async (data: FormInput) => {
    try {
      await sendContact(form.current as HTMLFormElement);
      reset();
    } catch (e) {
      cannotSend(true);
    }
  };

  const watchError = (label: string, key: keyof typeof errors) => {
    return {
      error: !!errors[key],
      label: errors[key]?.message || label,
    };
  };

  const removeSnackBar = () => cannotSend(false);

  return (
    <form
      ref={form}
      onSubmit={handleSubmit(handleDataToSend)}
      className="py-4 flex flex-col gap-4 w-[25rem] bg-zinc-100 p-2 rounded-xl"
    >
      <TextField
        fullWidth
        {...watchError('Name', 'name')}
        {...register('name', { required: 'required value' })}
      />
      <TextField
        fullWidth
        {...watchError('Email', 'email')}
        {...register('email', { required: 'required value' })}
      />
      <TextField
        fullWidth
        multiline
        {...watchError('Message', 'message')}
        inputProps={{ style: { height: '14rem', maxHeight: '14rem' } }}
        {...register('message', { required: 'required value' })}
      />
      <div>
        <Button
          type="submit"
          color="inherit"
          variant="outlined"
          className="w-[8rem] font-semibold text-gray-700"
        >
          Send
        </Button>
      </div>
      <Snackbar
        open={cantSend}
        autoHideDuration={6000}
        onClose={removeSnackBar}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={removeSnackBar}
          sx={{ width: '100%' }}
        >
          Could not send contact
        </Alert>
      </Snackbar>
    </form>
  );
};
