'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { Input, Link, Button } from '@nextui-org/react';
import useAuth from '@/hooks/useAuth';

export type SignInProps = {
  setSelected: (val: string | number) => void;
};

const validationSchema = z.object({
  email: z.string().min(1, { message: 'Must have at least 1 character' }),
  password: z.string().min(1, { message: 'Must have at least 1 character' }),
});

type SchemaProps = z.infer<typeof validationSchema>;

export default function SignIn({ setSelected }: SignInProps) {
  const { login } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaProps>({
    resolver: zodResolver(validationSchema),
  });

  const submitForm = async (data: SchemaProps) => {
    try {
      const response = await login(data.email, data.password);

      console.log(response);

      if (response === 'success') {
        toast.success('Logged in successfully');
        router.push('/projects');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="flex flex-col gap-4 pt-4" onSubmit={handleSubmit(submitForm)}>
      <div className="flex h-[70px] flex-col">
        <Input label="Email" placeholder="Enter your email" type="email" {...register('email')} />
        <span className="pl-2 text-red-400">{errors?.email && <span>{errors.email.message}</span>}</span>
      </div>

      <div className="flex h-[70px] flex-col">
        <Input label="Password" placeholder="Enter your password" type="password" {...register('password')} />
        <span className="pl-2 text-red-400">{errors?.password && <span>{errors.password.message}</span>}</span>
      </div>

      <p className="text-center text-small">
        Need to create an account?{' '}
        <Link size="sm" className="cursor-pointer" onPress={() => setSelected('sign-up')}>
          Sign up
        </Link>
      </p>

      <div className="flex justify-end gap-2">
        <Button type="submit" fullWidth color="primary">
          Sign in
        </Button>
      </div>
    </form>
  );
}
