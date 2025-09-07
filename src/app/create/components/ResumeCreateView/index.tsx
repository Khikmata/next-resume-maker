'use client'

import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { ResumeCreateForm, ResumePreview } from './components'
import { FormFieldConfig, ResumeFormData, ResumeFormHandle } from './types'

export const ResumeCreateView = () => {
  const formRef = useRef<ResumeFormHandle>(null)

  const [isContinued, setIsContinued] = useState(false)
  const [fieldConfigs, setFieldConfigs] = useState<FormFieldConfig[]>([
    { id: 'name', type: 'name', label: 'ФИО' },
  ])

  const [formData, setFormData] = useState<ResumeFormData>({
    name: '',
    age: '',
    email: '',
    experience: '',
  })

  // Update localStorage when state changes
  useEffect(() => {
    if (!isContinued) return
    localStorage.setItem(
      'resumeData',
      JSON.stringify({
        data: formData,
        fieldConfigs,
      })
    )

    // Notify other components of the update
    window.dispatchEvent(new CustomEvent('resumeDataUpdated'))
  }, [formData, fieldConfigs, isContinued])

  // Load initial data from localStorage
  useEffect(() => {
    const checkForExistingData = () => {
      try {
        const existingData = localStorage.getItem('resumeData')
        if (existingData) {
          const parsedData = JSON.parse(existingData)

          // Count how many fields have values
          const filledFields = Object.values(
            parsedData.data || parsedData
          ).filter((value) => value && value.toString().trim() !== '').length

          if (filledFields > 0) {
            toast.message('Найдены прошлые данные', {
              position: 'bottom-center',
              description: `Хотите ли вы продолжить с того места, где остановились?`,
              duration: 20000,
              style: {
                flexDirection: 'column',
                width: '40vh',
                alignItems: 'start',
              },
              descriptionClassName: 'w-full',
              action: {
                label: 'Давай!',
                onClick: () => {
                  // Update state with saved data
                  if (parsedData.fieldConfigs) {
                    setFieldConfigs(parsedData.fieldConfigs)
                  }
                  if (parsedData.data) {
                    setFormData(parsedData.data)
                  } else {
                    setFormData(parsedData)
                  }

                  setIsContinued(true)
                  formRef.current?.continue()
                  toast.success('Восстанавливаем данные', { duration: 1000 })
                },
              },
            })
          }
        }
      } catch (error) {
        setIsContinued(true)
        console.error('Error reading from localStorage:', error)
      }
    }

    const timer = setTimeout(checkForExistingData, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="justify-center align-middle w-full flex h-full items-start gap-4">
      <ResumeCreateForm
        ref={formRef}
        fieldConfigs={fieldConfigs}
        onFieldConfigsChange={setFieldConfigs}
        formData={formData}
        onFormDataChange={setFormData}
      />
      <ResumePreview FormFieldConfigs={fieldConfigs} formData={formData} />
    </div>
  )
}
