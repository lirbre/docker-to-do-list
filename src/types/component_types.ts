export interface CardProps {
  title: string
  priority: PriorityType
  id: number
  isComplete: boolean
}

export interface CardComponentProps {
  title: string
  priority: PriorityType
  id: number
  isComplete: boolean
  position: number
}

export interface FormProps {
  title: string
  priority: PriorityType
}

export type PriorityType = '1' | '2' | '3'
