import * as MuiIcons from "@mui/icons-material";

interface IconProps {
  name: keyof typeof MuiIcons | any;
  className?: string;
  onClick?: () => void;
  // سایر props...
}

export const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = MuiIcons[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
};
