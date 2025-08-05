import React from 'react';

const AuthModal = ({ onChooseIncognito, onChooseGoogle }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50 text-white font-inter">
      <h2 className="text-3xl mb-6">Choose a mode to continue</h2>
      <div className="flex flex-col space-y-4 w-64">
        <button
          onClick={onChooseIncognito}
          className="bg-gray-800 py-3 rounded-lg text-lg font-bold hover:bg-gray-700"
        >Continue in Incognito Mode</button>
        <button
          onClick={onChooseGoogle}
          className="bg-blue-600 py-3 rounded-lg text-lg font-bold hover:bg-blue-500"
        >Continue with Google</button>
      </div>
    </div>
  );
};

export default AuthModal;
