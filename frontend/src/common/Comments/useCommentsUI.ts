export const useCommentsUI = ({
  setShowComments,
  setClosingComments,
  closingComments,
}: {
  setShowComments: (show: boolean) => void;
  setClosingComments: (closing: boolean) => void;
  closingComments: boolean;
}) => {
  const toggleComments = () => {
    if (closingComments) return;
    setClosingComments(true);
    setTimeout(() => {
      setShowComments(false);
      setClosingComments(false);
    }, 150);
  };

  const handleInputFocus = (e: React.FocusEvent) => {
    e.stopPropagation();
  };

  return {
    toggleComments,
    handleInputFocus,
  };
};
