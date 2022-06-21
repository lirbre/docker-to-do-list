export interface CardProps {
  title: string
  priority: 'low' | 'medium' | 'high'
  id: number
  isComplete: boolean
}

export interface CardComponentProps {
  title: string
  priority: 'low' | 'medium' | 'high'
  id: number
  isComplete: boolean
  position: number
}

export interface FormProps {
  title: string
  priority: 'low' | 'medium' | 'high'
}

export type PriorityType = 'low' | 'medium' | 'high'
