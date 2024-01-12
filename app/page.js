import Feed from "./components/Feed"

const Home = () => {
  return (
    <>
    <div className='home'>
      <span>
      <h2> Discover and share fun facts</h2>
      </span>
      
      <span>
        <h2> Did You know?</h2>
      <section className='trivia'>
        There are over 1 billion people on earth
      </section>
      </span>
    </div>
    <Feed />
    </>
  )

  }

export default Home