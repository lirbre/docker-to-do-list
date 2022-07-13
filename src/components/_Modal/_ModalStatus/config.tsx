import { ChangeEvent } from 'react'

import { useToDo } from '@/hooks'
import { PriorityType } from '@/types/component_types'

export const ConfigModal = () => {
  const {
    hideComplete,
    showComplete,
    shouldHide,
    addPriority,
    removePriority,
    desiredPriority,
    deleteCompletes,
    sortById,
    sortByPriority,
    byPriority,
    shouldSave,
    saveToDos,
    notSaveToDos
  } = useToDo()
  const handleHide = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.checked ? hideComplete() : showComplete()
  const handleSort = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.checked ? sortByPriority() : sortById()
  const handleFilter = (
    e: ChangeEvent<HTMLInputElement>,
    priority: PriorityType
  ) => {
    if (e.target.checked) {
      addPriority(priority)
      return
    }
    removePriority(priority)
  }
  const handleSave = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.checked ? saveToDos() : notSaveToDos()

  return (
    <div className="flex flex-col gap-2 pb-4">
      <div
        className="mx-auto flex w-11/12 items-center justify-center gap-4"
        data-cy="priority-config"
      >
        <label className="mx-auto flex w-1/3 cursor-pointer items-center justify-between gap-12 text-[#f2f2f2]">
          <small>Low:</small>
          <input
            className="h-4 w-4 bg-secondary shadow-black/20 drop-shadow-lg"
            type={'checkbox'}
            onChange={(e) => handleFilter(e, '1')}
            checked={desiredPriority.indexOf('1') !== -1}
          />
        </label>
        <label className="mx-auto flex w-1/3 cursor-pointer items-center justify-between gap-12 text-[#f2f2f2]">
          <small>Medium:</small>
          <input
            className="h-4 w-4 bg-secondary shadow-black/20 drop-shadow-lg"
            type={'checkbox'}
            onChange={(e) => handleFilter(e, '2')}
            checked={desiredPriority.indexOf('2') !== -1}
          />
        </label>
        <label className="mx-auto flex w-1/3 cursor-pointer items-center justify-between gap-12 text-[#f2f2f2]">
          <small>High:</small>
          <input
            className="h-4 w-4 bg-secondary shadow-black/20 drop-shadow-lg"
            type={'checkbox'}
            onChange={(e) => handleFilter(e, '3')}
            checked={desiredPriority.indexOf('3') !== -1}
          />
        </label>
      </div>
      <label className="mx-auto flex w-11/12 cursor-pointer items-center justify-between text-[#f2f2f2]">
        <small>Hide Completes:</small>
        <input
          className="h-4 w-4 bg-secondary shadow-black/20 drop-shadow-lg"
          type={'checkbox'}
          onChange={(e) => handleHide(e)}
          checked={shouldHide}
          data-cy="hide-config"
        />
      </label>
      <label className="mx-auto flex w-11/12 cursor-pointer items-center justify-between text-[#f2f2f2]">
        <small>Sort by Higher Priority:</small>
        <input
          className="h-4 w-4 bg-secondary shadow-black/20 drop-shadow-lg"
          type={'checkbox'}
          onChange={(e) => handleSort(e)}
          checked={byPriority}
          data-cy="sortpriority-config"
        />
      </label>
      <label className="mx-auto flex w-11/12 cursor-pointer items-center justify-between text-[#f2f2f2]">
        <small>Save List Locally:</small>
        <input
          className="h-4 w-4 bg-secondary shadow-black/20 drop-shadow-lg"
          type={'checkbox'}
          onChange={(e) => handleSave(e)}
          checked={shouldSave}
          data-cy="savels-config"
        />
      </label>
      <label className="mx-auto flex w-11/12 items-center justify-between text-[#f2f2f2]">
        <small>Delete All Completes:</small>
        <button
          onClick={() => deleteCompletes()}
          className="rounded-sm bg-[#d1342fff] py-0.5 px-3 hover:opacity-90"
          data-cy="deletecomplete-config"
        >
          <small>Delete</small>
        </button>
      </label>
    </div>
  )
}
