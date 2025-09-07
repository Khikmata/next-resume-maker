'use client'

import { Typography } from '@/shared/components/Typography'
import { MailIcon } from 'lucide-react'
import { FormFieldConfig, ResumeFormData } from '../../types'

interface ResumePreviewProps {
  FormFieldConfigs: FormFieldConfig[]
  formData: ResumeFormData
}

export const ResumePreview = ({
  FormFieldConfigs,
  formData,
}: ResumePreviewProps) => {
  // Function to render field based on type
  const renderField = (type: string, value: string) => {
    if (!value) return null

    switch (type) {
      case 'name':
        return (
          <Typography variant="h1" key="name">
            {value}
          </Typography>
        )
      case 'age':
        return (
          <div key="age" className="mt-4">
            <Typography variant="primary">{value} лет</Typography>
          </div>
        )
      case 'email':
        return (
          <div key="email" className="mt-2 flex gap-2">
            <MailIcon />
            <Typography variant="primary" className="text-blue-600">
              {value}
            </Typography>
          </div>
        )
      case 'experience':
        return (
          <div key="experience" className="mt-4">
            <Typography variant="h3">Опыт работы</Typography>
            <Typography variant="primary" className="whitespace-pre-line">
              {value}
            </Typography>
          </div>
        )
      default:
        return null
    }
  }

  const hasData = FormFieldConfigs.some(
    (field) => formData[field.type] && formData[field.type]!.trim() !== ''
  )

  return (
    <div className="bg-neutral-100 h-full w-full p-6 min-h-[80vh]">
      <div className="bg-white p-6 rounded-lg shadow-md mx-auto text-neutral-800">
        <div className="space-y-4 text-left">
          {hasData ? (
            FormFieldConfigs.map((field) =>
              renderField(field.type, formData[field.type] || '')
            )
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Typography variant="p">
                Заполните форму, чтобы увидеть предпросмотр резюме
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

ResumePreview.displayName = 'ResumePreview'
