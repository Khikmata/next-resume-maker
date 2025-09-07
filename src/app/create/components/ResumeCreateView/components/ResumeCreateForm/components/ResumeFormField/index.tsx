import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/shared/components'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, X } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { FormFieldConfig, ResumeFormData } from '../../../../types'

export const ResumeFormField = ({
  fieldConfig,
  onRemove,
  form,
  onBlur,
}: {
  fieldConfig: FormFieldConfig
  onRemove: (id: string) => void
  form: UseFormReturn<ResumeFormData>
  onBlur: () => void
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fieldConfig.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-2">
      <div
        {...attributes}
        {...listeners}
        className="mt-9 p-1 cursor-grab rounded hover:bg-accent"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <FormField
          control={form.control}
          name={fieldConfig.type}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{fieldConfig.label}</FormLabel>
                {fieldConfig.type !== 'name' && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(fieldConfig.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <FormControl>
                {fieldConfig.type === 'experience' ? (
                  <Textarea rows={4} {...field} onBlur={onBlur} />
                ) : (
                  <Input
                    type={
                      fieldConfig.type === 'age'
                        ? 'number'
                        : fieldConfig.type === 'email'
                        ? 'email'
                        : 'text'
                    }
                    {...field}
                    onBlur={onBlur}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
