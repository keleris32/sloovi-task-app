import { useState } from 'react';
import DropCSS from './DropdownOptions.module.css';
import { BiTimeFive } from 'react-icons/bi';
import { AiFillCaretDown } from 'react-icons/ai';

function DropdownOptions(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => setIsOpen(!isOpen);

  const selectOption = (option) => {
    props.setSelectedOption(option);

    toggleOptions();
  };

  return (
    <div className={DropCSS.container}>
      <div className={DropCSS.header} onClick={toggleOptions}>
        {props.type === 'time' ? <BiTimeFive /> : <AiFillCaretDown />}
        <span>
          {props.selectedOption
            ? props.selectedOption?.name ?? props.selectedOption?.label
            : 'Select option'}
        </span>
      </div>
      {isOpen && (
        <div className={props.fixedHeight ? DropCSS.fixedBody : DropCSS.body}>
          {props.OPTIONS.map((option, index) => (
            <div
              key={index}
              className={DropCSS.item}
              onClick={() => selectOption(option)}
            >
              {props.type === 'user' ? option?.name : option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownOptions;
