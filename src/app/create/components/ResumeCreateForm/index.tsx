// components/ResumeForm.tsx
'use client'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/shared/components'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface ResumeFormData {
  name: string
  age: string
  email: string
  experience: string
}

export const ResumeCreateForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<ResumeFormData>({
    defaultValues: {
      name: '',
      age: '',
      email: '',
      experience: '',
    },
  })

  useEffect(() => {
    const initialData: Partial<ResumeFormData> = {}

    if (searchParams) {
      initialData.name = searchParams.get('name') || ''
      initialData.age = searchParams.get('age') || ''
      initialData.email = searchParams.get('email') || ''
      initialData.experience = searchParams.get('experience') || ''
    }

    try {
      const savedData = localStorage.getItem('resumeData')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        Object.assign(initialData, parsedData)
      }
    } catch (e) {
      console.error('Error reading from localStorage:', e)
    }

    form.reset(initialData)
  }, [form, searchParams])

  const updateUrlAndStorage = useCallback(
    (data: ResumeFormData) => {
      const params = new URLSearchParams()
      Object.entries(data).forEach(([key, value]) => {
        if (value) params.set(key, value.toString())
      })

      // Use replace instead of push to avoid adding to browser history
      router.replace(`?${params.toString()}`, { scroll: false })

      localStorage.setItem('resumeData', JSON.stringify(data))

      console.log('Form data saved:', data)
    },
    [router]
  )

  const onSubmit = (data: ResumeFormData) => {
    updateUrlAndStorage(data)
  }

  const handleBlur = useCallback(() => {
    const values = form.getValues()
    updateUrlAndStorage(values)
  }, [form, updateUrlAndStorage])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'Имя обязательно' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя *</FormLabel>
              <FormControl>
                <Input {...field} onBlur={handleBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          rules={{
            required: 'Возраст обязателен',
            min: { value: 18, message: 'Минимальный возраст: 18' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Возраст *</FormLabel>
              <FormControl>
                <Input type="number" {...field} onBlur={handleBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Неверный формат email',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} onBlur={handleBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Опыт работы</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} onBlur={handleBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  )
}
