import React from 'react';
import Button from '@material-ui/core/Button';

class CustomButton extends React.PureComponent {
  render() {
    const { title, handleClick, className, color, variant, disabled } = this.props;

    return (
      <Button
        disabled={disabled}
        variant={variant}
        color={color}
        onClick={handleClick}
        className={className}
      >
        {title}
      </Button>
    );
  }
}

export default CustomButton;