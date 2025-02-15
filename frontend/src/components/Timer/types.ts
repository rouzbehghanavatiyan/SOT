export interface TimerProps {
  setFindingMatch: React.Dispatch<React.SetStateAction<boolean>>; 
  active: boolean;
  movieData: {
    userId?: any; 
    movieId?: any; 
  } | null; 
  setShowEditMovie: React.Dispatch<React.SetStateAction<boolean>>; 
}