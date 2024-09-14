import FormPart from '../login/FormPart'
import LoginPicture from '../login/LoginPicture'

const Login = () => {
  return (
    <section className="flex items-center justify-center min-h-full w-full relative font-secondaryFont bg-primaryDarkGray z-10 xl:justify-end">
      <img src="/assets/wave.svg" alt="Image about a green wave" className="absolute bottom-0 xl:hidden" />
      <div className="hidden xl:flex justify-center items-center absolute bg-primaryGreen w-[45%] h-full left-0">
        <LoginPicture />
        <img src="/assets/wave-login.svg" alt="Image about a green wave" className="absolute h-full -top-px translate-x-full right-[2px]" />
      </div>
      <FormPart />
    </section>
  )
}

export default Login
