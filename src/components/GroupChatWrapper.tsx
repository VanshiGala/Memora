// // components/GroupChatWrapper.tsx
// "use client";

// import { useState } from "react";
// import { MessageCircle } from "lucide-react";
// import GroupChat from "./GroupChat";

// export default function GroupChatWrapper({ groupId, userId, username }: any) {
//   const [chatOpen, setChatOpen] = useState(false);

//   return (
//     <>
//       {/* Floating Chat Button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
//           onClick={() => setChatOpen(!chatOpen)}
//         >
//           <MessageCircle size={24} />
//         </button>
//       </div>

//       {/* Chat Drawer */}
//       {chatOpen && (
//         <div className="fixed bottom-20 right-6 w-80 h-[400px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">
//           <div className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-t-2xl">
//             Group Chat
//             <button onClick={() => setChatOpen(false)} className="ml-2 text-white">
//               ✕
//             </button>
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             <GroupChat groupId={groupId} userId={userId} username={username} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import GroupChat from "./GroupChat";

export default function GroupChatWrapper({
  groupId,
  userId,
  username,
}: {
  groupId: string;
  userId: string;
  username: string;
}) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* FLOATING CHAT BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setChatOpen(true)}
          className="group flex items-center justify-center
            w-14 h-14 rounded-full
            bg-gradient-to-br from-purple-600 to-indigo-600
            shadow-[0_0_30px_rgba(139,92,246,0.5)]
            hover:scale-110 transition-all"
        >
          <MessageCircle className="text-white group-hover:scale-110 transition" size={22} />
        </button>
      </div>

      {/* CHAT PANEL */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] h-[460px]
          rounded-3xl overflow-hidden
          bg-zinc-900/90 backdrop-blur-xl
          border border-zinc-800
          shadow-[0_0_60px_rgba(139,92,246,0.25)]
          flex flex-col animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Group Chat
              </h3>
              <p className="text-xs text-zinc-400">
                Share moments in real time
              </p>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-800 transition"
            >
              <X size={18} className="text-zinc-400 hover:text-white" />
            </button>
          </div>

          {/* CHAT BODY */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            <GroupChat
              groupId={groupId}
              userId={userId}
              username={username}
            />
          </div>
        </div>
      )}
    </>
  );
}
