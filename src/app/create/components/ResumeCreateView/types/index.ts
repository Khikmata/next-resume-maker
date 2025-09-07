export interface ResumeFormHandle {
  continue: () => void
}

export interface ResumeFormData {
  name: string
  age?: string
  email?: string
  experience?: string
}

export interface FormFieldConfig {
  id: string
  type: 'name' | 'age' | 'email' | 'experience'
  label: string
}
