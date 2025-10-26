import { useAppSelector } from "./reduxHookType";

interface UseArenaReturn {
  categoriesWithIcons: any[];
  handleAcceptCategory: (data: any) => void;
  isCategoryDisabled: (categoryIcon: string) => boolean;
}

export const useArena = (updateStepData: any, setCurrentStep?: any): UseArenaReturn => {
  const main = useAppSelector((state) => state?.main);

  const handleAcceptCategory = (data: any) => {
    if (data.icon === 'robot') {
      return;
    }

    updateStepData(1, {
      name: data.name,
      id: data.id,
      icon: data.icon,
    });
    localStorage.setItem("arenaId", data.id);
    
    if (setCurrentStep) {
      setCurrentStep((prev: any) => ({ ...prev, number: 2 }));
    }
  };

  const isCategoryDisabled = (categoryIcon: string): boolean => {
    return categoryIcon === 'robot';
  };

  const categoriesWithIcons = main?.category?.map((category: any) => ({
    ...category,
    icon: category.icon || category.name.toLowerCase(),
    disabled: isCategoryDisabled(category.icon || category.name.toLowerCase()),
  })) || [];

  return {
    categoriesWithIcons,
    handleAcceptCategory,
    isCategoryDisabled,
  };
};