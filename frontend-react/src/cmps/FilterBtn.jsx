export function FilterBtn({setMenuFilter,selectedOption}) {
  function handleApply(event) {
    event.preventDefault()
    setMenuFilter(event, selectedOption)
  }

  return (
    <div className="apply-row">
  </div>
  );
}
