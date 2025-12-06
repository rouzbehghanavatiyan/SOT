import { useState, useRef, useCallback } from "react";
import { userMessages } from "../services/nest";

interface MessageType {
  id?: number;
  userProfile: string;
  sender: number;
  recieveId: number;
  title: string;
  time: string;
  userNameSender?: string;
}

interface UseChatMessagesProps {
  userIdLogin: number;
  userReciver: number;
  initialTake?: number;
}

interface UseChatMessagesReturn {
  messages: MessageType[];
  isLoading: boolean;
  hasMore: boolean;
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  fetchMessages: (isLoadMore?: boolean) => Promise<void>;
  loadMoreMessages: () => Promise<void>;
}

export const useChatMessages = ({
  userIdLogin,
  userReciver,
  initialTake = 10,
}: UseChatMessagesProps): UseChatMessagesReturn => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const paginationRef = useRef({ 
    skip: 0, 
    take: initialTake 
  });

  const fetchMessages = useCallback(async (isLoadMore: boolean = false) => {
    if (!userIdLogin || !userReciver) return;

    try {
      setIsLoading(true);
      const res = await userMessages(
        userIdLogin,
        userReciver,
        paginationRef.current.skip,
        paginationRef.current.take
      );

      const newMessages = res?.data?.messages || [];

      setMessages(prev => {
        const previousMessages = Array.isArray(prev) ? prev : [];
        return isLoadMore 
          ? [...previousMessages, ...newMessages]
          : [...newMessages, ...previousMessages];
      });

      setHasMore(newMessages.length === paginationRef.current.take);
      
      if (isLoadMore) {
        paginationRef.current.skip += paginationRef.current.take;
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [userIdLogin, userReciver]);

  const loadMoreMessages = useCallback(async () => {
    if (hasMore && !isLoading) {
      await fetchMessages(true);
    }
  }, [hasMore, isLoading, fetchMessages]);

  return {
    messages,
    isLoading,
    hasMore,
    setMessages,
    fetchMessages,
    loadMoreMessages,
  };
};