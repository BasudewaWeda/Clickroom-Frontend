import iconic from "../../Images/iconic.png"

export default function About() {
  return (
    <div id='about' className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={iconic} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#2cbcff] font-bold '>What Is Click Room?</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Click Room</h1>
          <p className='justify'>
          Click Room is a web-based application that we created to help students, lecturers, and staff in borrowing rooms on campus. 
          The creation of this application is motivated by the fact that there is often a miss of communication in borrowing rooms on campus. 
          Often one room is borrowed by two parties simultaneously, which should not happen. One room can only be borrowed by one party for 
          certain reasons so that the activities that take place in the room can run effectively. Fatal consequences if this continues to happen.
          </p>
        </div>
      </div>
    </div>
  )
}