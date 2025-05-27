// src/components/UserList.tsx
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface UserListProps {
  users: Array<{
    id: string;
    name: string;
  }>;
  currentUser: {
    id: string;
    name: string;
  } | null;
  onSelectUser: (user: any) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  currentUser,
  onSelectUser,
}) => {
  console.log(users);

  return (
    <div className="overflow-y-auto">
      {users
        .filter((user) => user.id !== currentUser?.id)
        .map((user) => (
          <div
            key={user.id}
            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
            onClick={() => onSelectUser(user)}
          >
            <AccountCircleIcon className="text-blue-500 text-4xl mr-3" />
            <div>
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">آنلاین</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserList;
