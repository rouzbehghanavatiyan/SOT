export interface VideoProps {
  loop?: boolean;
  playing?: boolean;
  playbackRate?: number;
  muted?: boolean;
  url: string;
  onDuration?: (duration: number) => void;
  onEnded?: () => void;
  className?: string;
  handleVideo: () => void;
  width?: string | number;
  height?: string | number;
}
