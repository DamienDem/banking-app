import HomeContent from "@/components/HomeContent";
import { getCurrentUser } from "@/lib/actions/user.action";

const Home = async () => {
  const user = await getCurrentUser();

  return user ? <HomeContent user={user} /> : <div>Loading...</div>;
};

export default Home;
