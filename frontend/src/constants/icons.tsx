import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import AltRouteIcon from "@mui/icons-material/AltRoute";

export const iconMap: { [key: string]: JSX.Element } = {
  offline: <WifiOffIcon className="text-2xl mx-3 font25" />,
  optional: <AltRouteIcon className="text-2xl mx-3 font25" />,
  turbo: <NetworkCheckIcon className="text-2xl mx-3 font25" />,
  live: <RadioButtonCheckedIcon className="text-2xl mx-3 font25" />,
};

export const getIconForMode = (iconName: string): JSX.Element => {
  return iconMap[iconName] || iconMap.offline;
};