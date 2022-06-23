import { ChangeEvent } from 'react'

import { useToDo } from '@/hooks'
import { PriorityType } from '@/types/component_types'

export const ConfigModal = () => {
  const {
    hideComplete,
    showComplete,
    shouldHide,
    filterPriority,
    desiredPriority,
    deleteCompletes,
    sortById,
    sortByPriority,
    byPriority
  } = useToDo()
  const handleHide = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.checked ? hideComplete() : showComplete()
  const handleSort = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.checked ? sortByPriority() : sortById()
  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    filterPriority(e.target.value as PriorityType | 'all')
  }

  return (
    <div className="flex flex-col gap-2 pb-4">
      <label className="mx-auto flex w-11/12 items-center justify-between gap-12 text-[#f2f2f2]">
        <small>Show priorities:</small>
        <select
          value={desiredPriority}
          onChange={(e) => handleFilter(e)}
          className="w-1/2 cursor-pointer rounded-sm bg-secondary text-sm text-[#f2f2f2] shadow-black/20 drop-shadow-lg"
        >
          <option value={'all'}>All</option>
          <option value={'1'}>Low</option>
          <option value={'2'}>Medium</option>
          <option value={'3'}>High</option>
        </select>
      </label>
      <label className="mx-auto flex w-11/12 cursor-pointer items-center justify-between text-[#f2f2f2]">
        <small>Hide Completes:</small>
        <input
          className="h-4 w-4 bg-secondary shadow-black/20 drop-shadow-lg"
          type={'checkbox'}
          onChange={(e) => handleHide(e)}
          checked={shouldHide}
        />
      </label>
      <label className="mx-auto flex w-11/12 cursor-pointer items-center justify-between text-[#f2f2f2]">
        <small>Sort by Higher Priority:</small>
        <input
          className="h-4 w-4 bg-secondary shadow-black/20 drop-shadow-lg"
          type={'checkbox'}
          onChange={(e) => handleSort(e)}
          checked={byPriority}
        />
      </label>
      <label className="mx-auto flex w-11/12 items-center justify-between text-[#f2f2f2]">
        <small>Delete All Completes:</small>
        <button
          onClick={() => deleteCompletes()}
          className="rounded-sm bg-[#d1342fff] py-0.5 px-3 hover:opacity-90"
        >
          <small>Delete</small>
        </button>
      </label>
    </div>
  )
}
