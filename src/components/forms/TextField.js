import React from 'react';
import { HelpText } from 'components';
import { INPUT_COLORS } from './input-colors';

import Input from './Input';

const TextField = ({
  id,
  label,
  helpText,
  helpTextState,
  color = 'primary',
  ...rest
}) => {
  const htmlId = id ? id : Math.random().toString(36).slice(2);
  let { label: labelStyle } = INPUT_COLORS[color];

  return (
    <div className="sm:col-span-2 mt-4">
      <label htmlFor={htmlId} className={`block text-sm font-medium ${labelStyle}`}>
        {label}
      </label>
      <div className="mt-1.5 relative">
        <Input id={htmlId} color={color} {...rest} />
        <HelpText message={helpText} state={helpTextState} />
      </div>
    </div>
  );
};

export default TextField;
