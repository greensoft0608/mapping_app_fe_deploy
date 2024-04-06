'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input, Link, Button } from '@nextui-org/react';
import { toast } from 'react-hot-toast';

import useAuth from '@/hooks/useAuth';
import { TRegisterRes } from '@/contexts/AuthContext';

const validationSchema = z
  .object({
    email: z.string().min(1, { message: 'Must have at least 1 character' }),
    password: z.string().min(1, { message: 'Must have at least 1 character' }),
    confirmPassword: z.string().min(1, { message: 'Must have at least 1 character' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match',
  });

type SchemaProps = z.infer<typeof validationSchema>;

export type SignUpProps = {
  setSelected: (val: string | number) => void;
};

export default function SignUp({ setSelected }: SignUpProps) {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaProps>({
    resolver: zodResolver(validationSchema),
  });

  const capitalizeFirstLetter = (sentence: string) => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };

  const submitForm = async (data: SchemaProps) => {
    try {
      const response = (await signup(data.email, data.password)) as unknown as TRegisterRes;
      if (response.isRegister === true) {
        toast.success(capitalizeFirstLetter(response.message));
        setSelected('login');
      } else {
        toast.error(capitalizeFirstLetter(response.message));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="flex h-auto flex-col gap-4 pt-4" onSubmit={handleSubmit(submitForm)}>
      <div className="flex !h-[70px] flex-col">
        <Input label="Email" placeholder="Enter your email" type="email" {...register('email')} />
        <span className="pl-2 text-red-400">{errors?.email && <span>{errors.email.message}</span>}</span>
      </div>

      <div className="flex h-[70px] flex-col">
        <Input label="Password" placeholder="Enter your password" type="password" {...register('password')} />
        <span className="pl-2 text-red-400">{errors?.password && <span>{errors.password.message}</span>}</span>
      </div>

      <div className="flex h-[70px] flex-col">
        <Input
          label="Confirm password"
          placeholder="Retype your password"
          type="password"
          {...register('confirmPassword')}
        />
        <span className="pl-2 text-red-400">
          {errors?.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </span>
      </div>

      <p className="text-center text-small">
        Already have an account?{' '}
        <Link size="sm" className="cursor-pointer" onPress={() => setSelected('login')}>
          Login
        </Link>
      </p>
      <div className="flex justify-end gap-2">
        <Button type="submit" fullWidth color="primary">
          Sign up
        </Button>
      </div>
    </form>
  );
}
