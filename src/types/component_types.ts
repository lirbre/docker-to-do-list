export interface CardProps {
  title: string
  priority: 'low' | 'medium' | 'high'
  id: number
}

export interface CardComponentProps {
  title: string
  priority: 'low' | 'medium' | 'high'
  id: number
  position: number
}

export interface FormProps {
  title: string
  priority: 'low' | 'medium' | 'high'
}

export type PriorityType = 'low' | 'medium' | 'high'
