import { useAuth } from "../../context/AuthContext";
const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user?.email || "user@example.com"}</p>
      <p><strong>Wallet Address:</strong> {user?.walletAddress || "0x123...abc"}</p>
      <p><strong>Joined:</strong> {user?.joined || "2024-01-01"}</p>
      <p><strong>NFTs Owned:</strong> {user?.nftsOwned || 0}</p>
    </div>
  );
};
export default Profile;