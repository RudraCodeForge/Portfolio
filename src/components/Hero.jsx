const Hero = () => {
  return (
    <div className="mt-3 container p-2">
      <div className="mcon mb-2">
        <div
          className="
        p-1 img-con"
        >
          <img
            src="/profile.jpg"
            alt="Prince Daksh"
            className="rounded-circle"
            width="190px"
            height="190px"
          />
        </div>
      </div>
      <h1 className="text-center">Hi, I'm Prince Daksh 👋</h1>
      <p className="text-center">
        A Software Developer & MERN Stack Enthusiast.
      </p>
      <a
        href="/Prince_Daksh_Resume.pdf"
        download
        className="mb-2 btn btn-outline-dark resume_btn"
      >
        Download Resume
      </a>
      <a
        href="mailto:jitandradaksh533@gmail.com"
        className="btn btn-primary resume_btn"
      >
        Let's Connect
      </a>
    </div>
  );
};
export default Hero;
