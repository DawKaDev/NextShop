interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
}
const Button = ({type = "button", name, onClick, ...props}: ButtonProps) => {
  return (
    <button {...props}>{props.children}</button>
  );
}

export default Button;