'use client'

import { Button } from '@/shared/components'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { forwardRef, useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormFieldConfig, ResumeFormData, ResumeFormHandle } from '../../types'
import { ResumeFormField } from './components'

interface ResumeCreateFormProps {
  fieldConfigs: FormFieldConfig[]
  onFieldConfigsChange: (configs: FormFieldConfig[]) => void
  formData: ResumeFormData
  onFormDataChange: (data: ResumeFormData) => void
}

export const ResumeCreateForm = forwardRef<
  ResumeFormHandle,
  ResumeCreateFormProps
>(({ fieldConfigs, onFieldConfigsChange, formData, onFormDataChange }, ref) => {
  const router = useRouter()

  const form = useForm<ResumeFormData>({
    defaultValues: formData,
  })

  // Update form when parent data changes
  useEffect(() => {
    form.reset(formData)
  }, [formData, form])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const addField = (type: 'age' | 'email' | 'experience') => {
    const id = `${type}-${Date.now()}`
    let label = ''

    switch (type) {
      case 'age':
        label = 'Возраст'
        break
      case 'email':
        label = 'Email'
        break
      case 'experience':
        label = 'Опыт работы'
        break
    }

    onFieldConfigsChange([...fieldConfigs, { id, type, label }])
  }

  const removeField = (id: string) => {
    const fieldToRemove = fieldConfigs.find((field) => field.id === id)
    if (fieldToRemove) {
      // Clear the field value
      const newFormData = { ...formData, [fieldToRemove.type]: undefined }
      onFormDataChange(newFormData)

      // Remove the field from config
      onFieldConfigsChange(fieldConfigs.filter((field) => field.id !== id))
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = fieldConfigs.findIndex((item) => item.id === active.id)
      const newIndex = fieldConfigs.findIndex((item) => item.id === over?.id)

      onFieldConfigsChange(arrayMove(fieldConfigs, oldIndex, newIndex))
    }
  }

  const updateUrlAndStorage = useCallback(
    (data: ResumeFormData) => {
      const params = new URLSearchParams()
      Object.entries(data).forEach(([key, value]) => {
        if (value) params.set(key, value.toString())
      })

      router.replace(`?${params.toString()}`, { scroll: false })
      onFormDataChange(data)
    },
    [router, onFormDataChange]
  )

  const onSubmit = (data: ResumeFormData) => {
    updateUrlAndStorage(data)
  }

  const handleBlur = useCallback(() => {
    const values = form.getValues()
    updateUrlAndStorage(values)
  }, [form, updateUrlAndStorage])

  return (
    <FormProvider {...form}>
      <div className="w-full max-w-[30vw]">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full p-4 rounded-2xl border border-accent"
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fieldConfigs}
              strategy={verticalListSortingStrategy}
            >
              {fieldConfigs.map((fieldConfig) => (
                <ResumeFormField
                  key={fieldConfig.id}
                  fieldConfig={fieldConfig}
                  onRemove={removeField}
                  form={form}
                  onBlur={handleBlur}
                />
              ))}
            </SortableContext>
          </DndContext>
        </form>
        <div className="flex flex-wrap gap-2 pt-2">
          {!fieldConfigs.some((f) => f.type === 'age') && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addField('age')}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Добавить возраст
            </Button>
          )}
          {!fieldConfigs.some((f) => f.type === 'email') && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addField('email')}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Добавить email
            </Button>
          )}
          {!fieldConfigs.some((f) => f.type === 'experience') && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addField('experience')}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Добавить опыт работы
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  )
})

ResumeCreateForm.displayName = 'ResumeCreateForm'
