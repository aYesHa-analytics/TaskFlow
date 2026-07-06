// Mock Firebase config - Easy to replace with real Firebase later

export const firebaseConfig = {
  // Replace with your real Firebase config when ready
  apiKey: "mock-key",
  authDomain: "mock-project.firebaseapp.com",
  projectId: "mock-taskflow",
};

// Mock functions
export const mockAuth = {
  currentUser: null,
  signIn: (email: string) => {
    console.log("Mock login:", email);
    return Promise.resolve({ user: { email } });
  },
  signOut: () => Promise.resolve(),
};

export default { firebaseConfig, mockAuth };