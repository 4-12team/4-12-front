import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { projectQueryKeys } from "@/app/_queryFactory/projectQuery";

interface projectStateType {
  projectTechStacks: string[];
  sortCondition: "RECENT" | "LIKES" | "VIEWS";
  searchString: string;
  page: number;
  size: number;
}

interface StackContextType {
  projectState: projectStateType;
  setProjectState: Dispatch<SetStateAction<projectStateType>>;
  isChangeStack: (stack: string) => void;
  isDeleteStack: (stack: string) => void;
  isChangeSearchString: (searchString: string) => void;
  isChangeCondition: (sortCondition: "RECENT" | "LIKES" | "VIEWS") => void;
  resetSearchString: () => void;
  clearStack: () => void;
}

const StackContext = createContext<StackContextType>({
  projectState: {
    projectTechStacks: [],
    sortCondition: "RECENT",
    searchString: "",
    page: 1,
    size: 1,
  },
  setProjectState: () => {},
  isChangeStack: () => {},
  isDeleteStack: () => {},
  isChangeSearchString: () => {},
  isChangeCondition: () => {},
  resetSearchString: () => {},
  clearStack: () => {},
});

export const useGetStack = () => useContext(StackContext);

function StackProvider({ children }: { children: ReactNode }) {
  const reactQueryClient = useQueryClient();
  const [projectState, setProjectState] = useState<projectStateType>({
    projectTechStacks: [],
    sortCondition: "RECENT",
    searchString: "",
    page: 1,
    size: 16,
  });
  const [stateUpdated, setStateUpdated] = useState(false); // projectState 상태가 업데이트 된 이후에 invalidateQueries 실행을 위한 함수
  const projectListQuery = projectQueryKeys.list(projectState);

  useEffect(() => {
    if (stateUpdated) {
      reactQueryClient.invalidateQueries({ queryKey: projectListQuery.queryKey });
      setStateUpdated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateUpdated]);

  const isChangeStack = useCallback((stack: string) => {
    setProjectState(prev => {
      const isAlreadyStack = prev.projectTechStacks.includes(stack);
      if (isAlreadyStack) {
        setStateUpdated(false);
        return prev;
      } else {
        setStateUpdated(true);
        return {
          ...prev,
          projectTechStacks: [stack, ...prev.projectTechStacks],
        };
      }
    });
  }, []);

  const isDeleteStack = useCallback((stack: string) => {
    setProjectState(prev => {
      const isFilterStack = prev.projectTechStacks.filter(data => stack !== data);
      setStateUpdated(true);
      return {
        ...prev,
        projectTechStacks: isFilterStack,
      };
    });
  }, []);

  const isChangeSearchString = useCallback((searchString: string) => {
    setProjectState(prev => {
      setStateUpdated(true);
      return {
        ...prev,
        searchString,
      };
    });
  }, []);

  const isChangeCondition = useCallback((sortCondition: "RECENT" | "LIKES" | "VIEWS") => {
    setProjectState(prev => {
      setStateUpdated(true);
      return {
        ...prev,
        sortCondition,
      };
    });
  }, []);

  const resetSearchString = () => {
    setProjectState(prevState => {
      setStateUpdated(true);
      return {
        ...prevState,
        searchString: "",
      };
    });
  };

  const clearStack = () => {
    setProjectState(prev => {
      setStateUpdated(true);
      return {
        ...prev,
        projectTechStacks: [],
      };
    });
  };

  return (
    <StackContext.Provider
      value={{
        projectState,
        setProjectState,
        isChangeStack,
        isDeleteStack,
        isChangeSearchString,
        isChangeCondition,
        resetSearchString,
        clearStack,
      }}>
      {children}
    </StackContext.Provider>
  );
}

export default StackProvider;
