export const ConfigModal = () => {
  return (
    <div className="flex flex-col gap-2">
      <label className="mx-auto flex w-11/12 items-center justify-between gap-12 text-[#f2f2f2]">
        <small>Show priorities:</small>
        <select className="w-1/2 cursor-pointer rounded-sm bg-secondary text-sm text-[#f2f2f2] shadow-black/20 drop-shadow-lg">
          <option value={''}>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </label>
      <label className="mx-auto flex w-11/12 cursor-pointer items-center justify-between text-[#f2f2f2]">
        <small>Delete when Complete:</small>
        <input
          className="h-4 w-4 bg-secondary shadow-black/20 drop-shadow-lg"
          type={'checkbox'}
        ></input>
      </label>
      <label className="mx-auto flex w-11/12 cursor-pointer items-center justify-between text-[#f2f2f2]">
        <small>Sort by Priority:</small>
        <input
          className="h-4 w-4 bg-secondary shadow-black/20 drop-shadow-lg"
          type={'checkbox'}
        ></input>
      </label>
    </div>
  )
}
