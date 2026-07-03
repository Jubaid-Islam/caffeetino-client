const Button = ({
  as: Component = "button",
  children,
  className = "",
  ...props
}) => {
  return (
    <Component
      className={`btn btn-lg rounded-lg bg-amber-900 text-white hover:bg-amber-800 border-none ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;