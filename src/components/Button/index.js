import PropTypes from "prop-types";
import "./style.scss";

export const BUTTON_TYPES = {
  DEFAULT: 1,
  SUBMIT: 2,
};

const Button = ({ title, onClick, disabled, children, type }) => {
  const handleClick = () => {
    onClick();  
  }

  const renderButton = (buttonType) => {
    const buttonProps = {
      className: "Button",
      "data-testid": "button-test-id",
      title,
      disabled,
      onClick: handleClick
    };

    return (
      <button
        type={buttonType === BUTTON_TYPES.SUBMIT ? "submit" : "button"}
        {...buttonProps}
      >
        {children}
      </button>
    );
  };

  return renderButton(type);
};

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.number,
};

Button.defaultProps = {
  disabled: false,
  onClick: () => null,
  title: "",
  children: null,
  type: BUTTON_TYPES.DEFAULT,
}

export default Button;
