import Input from "../../../components/Input";
import SendIcon from "@mui/icons-material/Send";
import MoodIcon from "@mui/icons-material/Mood";
import StickerOverlay from "./StickerOverlay";

const MessageInput: React.FC<{
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent) => void;
  titleInputRef: React.RefObject<HTMLInputElement>;
  setShowStickers: React.Dispatch<React.SetStateAction<boolean>>;
  showStickers: boolean;
  onEmojiSelect?: any;
  onInputFocus?: (e: React.FocusEvent) => void;
}> = ({
  title,
  setTitle,
  handleSendMessage,
  onEmojiSelect,
  titleInputRef,
  setShowStickers,
  showStickers,
  onInputFocus,
}) => (
  <div className="w-full bg-white sticky border-t-[1px] border-gray-200 bottom-0 z-50 pb-2 px-3">
    <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-2">
        <div className="flex-1">
          <Input
            onFocus={onInputFocus}
            ref={titleInputRef}
            className="w-full rounded-lg border border-gray-300 font16  px-4 py-4 mt-4 mb-2 focus:outline-none"
            placeholder="Type your message..."
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => setShowStickers(!showStickers)}
          className="p-2 flex text-gray-600 hover:text-gray-800"
        >
          <MoodIcon className="col-span-1 cursor-pointer text-gray-900 font25" />
        </button>
        <button type="submit" className="text-blue-600 hover:text-blue-800">
          <SendIcon className="cursor-pointer col-span-1 text-gray-900 font25 justify-center items-center" />
        </button>
      </div>
    </form>
    {showStickers && (
      <StickerOverlay
        onEmojiSelect={onEmojiSelect}
        setShowStickers={setShowStickers}
      />
    )}
  </div>
);
export default MessageInput;
