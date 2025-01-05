export function RenderRadioButtons({ options, groupName, selectedOption, onOptionChange }) {
    return (
      <div className="radio-list">
        {options.map((option) => (
          <div key={option} className="radio-item-wrapper">
            <label>
              <input
                type="radio"
                name={groupName}
                value={option}
                checked={selectedOption === option}
                onChange={() => onOptionChange(option)} 
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    );
  }
  