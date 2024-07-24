import HeaderBox from "@/components/HeaderBox";

const Home = () => {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="welcome"
            title="Welcome"
            userName="Jhon"
            subtext="Acess and manage your account"
          />
        </header>
      </div>
    </section>
  );
};

export default Home;
