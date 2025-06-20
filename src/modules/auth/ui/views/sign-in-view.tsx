"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Link from 'next/link'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { OctagonAlertIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formschema = z.object({
  email: z.string().email({message: 'Email inválido'}),
  password: z.string().min(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
})


export function SignInView() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formschema>) => {
    setError(null)
    setLoading(true)
    authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/"
    },{
      onSuccess: () => {
        setLoading(false)
      },
      onError: (error) => {
        setLoading(false)
        setError(error.error.message || 'Error al iniciar sesión')
      },

    })
  }

   const onSocial = (provider: "github" | "google") => {
    setError(null)
    setLoading(true)
    authClient.signIn.social({
      provider: provider,
      callbackURL:"/"
    },{
      onSuccess: () => {
        setLoading(false)
      },
      onError: (error) => {
        setLoading(false)
        setError(error.error.message || 'Error al iniciar sesión')
      },

    })
  }

  return (
    <div className="mx-auto w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
        <p className="text-muted-foreground">Ingresa tu email para acceder a tu cuenta</p>
      </div>
      <div className="space-y-4">
        <Form {...form}>
          <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input id="email" type="email" placeholder="correo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />             
            </div>
            <div>
              <div className="flex flex-col items-center gap-1">
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label htmlFor="password">Contraseña</Label>
                      <FormControl>
                        <Input  id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>
            {!!error && (
              <Alert variant="destructive" className="bg-destructive/10 border-none">
                <OctagonAlertIcon className='h-4 w-4 !text-destructive' />
                <AlertTitle className="text-sm">{error}</AlertTitle>
              </Alert>
            )}
            
            <Button type="submit" disabled={loading} className="w-full bg-green-700 hover:bg-green-600">
              Iniciar Sesión
            </Button>
            
          </form>
        </Form>
      </div>
      <div>
        <hr className="my-4" />
      </div>
      <Button disabled={loading} 
        variant="outline" 
        className="w-full"
        onClick={() => onSocial('google')}>
        <FaGoogle />
      </Button>
      <Button
        onClick={() => onSocial('github')}
        disabled={loading} 
        variant="default" 
        className="w-full">
        <FaGithub />
      </Button>
      <div className="mt-4 text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/sign-up" className="underline">
          Regístrate
        </Link>
      </div>
    </div>
  )
}
