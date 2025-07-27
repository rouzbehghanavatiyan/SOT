import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../utils/tw-utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: any;
  asChild?: boolean;
  icon?: any;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      label,
      icon,
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      ...props
    },
    ref
  ) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        {...props}
        disabled={loading}
      >
        {loading ? (
          <div className="loader_btn mx-1" />
        ) : (
          <>
            <span className="mx-1">{icon}</span>
            {label}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

const buttonVariants = cva(
 "inline-flex items-center no-underline justify-center whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 font-semibold focus-visible:ring-primary-disabled disabled:pointer-events-none disabled:opacity-50 text-",
 {
 variants: {
 variant: {
 default:
 "bg-primary text-white text-md shadow hover:bg-primary-hover hover:text-white",
 green:
 "bg-green text-white text-md shadow hover:bg-gray hover:text-white",
 dark_primary: "bg_sormei !text-white shadow-sm hover:bg_sormei",
 ghost: "text-mainBlack hover:text-mainGray-dark",
 link: "text-mainBlack text-lg underline-offset-4 px-3 hover:text-mainGray-dark",
 white:
 "bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-100",
 outLine_default: "col-span-3 mt-8 border border-primary bg_tusi",
 outLine: "col-span-3 mt-8 !text-primary hover:text-primary-hover !px-0",

 outLine_secondary: "bg-white !text-secondary shadow-sm",
 outLine_gray:
 "col-span-3 mt-5 border border-mainGray-dark text-mainGray-dark hover:text-mainGray-dark-hover",
 gray: "bg-mainGray",
 },
 size: {
 default: "text-sm px-[38px] py-1 min-w-[100px] min-h-[40px]", // اضافه کردن min-width و min-height
 full: "border-none text-base py-1.5 lg:py-3 w-full lg:text-lg",
 md: "text-base w-[136px] py-1 px-[45.5px] min-w-[136px]", // اضافه کردن min-width
 sm: "lg:text-md lg:py-2 lg:px-8 px-8 py-1 text-mdd min-w-[80px] min-h-[30px]",
 smm: "lg:text-md lg:py-1 lg:px-8 px-2 py-0.5 text-smm lg:w-40 w-28 !m-0",
 xl: "text-md py-2 px-[75px] min-w-[150px]", // اضافه کردن min-width
 xxl: "text-lg py-0 px-[109.5px] min-w-[200px]", // اضافه کردن min-width
 lg: "text-lg py-3 px-[171px] min-w-[250px]", // اضافه کردن min-width
 link: "px-0 text-lg",
 icon: "size-9",
 },
 },
 defaultVariants: {
 variant: "default",
 size: "default",
 },
 }
);