import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import './UserProfile.css';

interface UserProfileProps {
  avatarUrl: string;
  givenName: string;
}

function UserProfile({ avatarUrl, givenName }: UserProfileProps) {
  return (
    <div className="user-profile">
      <div className="text-container">
        <TypeAnimation
          sequence={[
            'Hi there, ',
            1000,
            `Hi there, ${givenName}!`,
            2000,
            `Welcome to Site Explorer, ${givenName}!`,
            3000,
          ]}
          wrapper="h2"
          cursor={true}
          repeat={0}
          className="gradient-text"
        />
      </div>
      <img src={avatarUrl} alt={`${givenName}'s avatar`} className="avatar" />
    </div>
  );
}

export default UserProfile;
