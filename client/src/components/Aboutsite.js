import Footer from './layouts/Footer';
import { motion } from 'framer-motion';

const Aboutsite = () => {

  const icon = {
    hidden: {
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)"
    },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)"
    }
  }


  return (
    <div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20
        }}
      >
        <div className='aboutsite'>
          <br />
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <motion.path
                  d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                >
                  <img src="/images/logo.png" alt="" />
                </motion.path>
              </div>
              <div className="col-md-8">
                <div className='quotes-about'>
                  Let's ignite our words for impact.
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <p>
                  Welcome to <b>Spark!</b> This is where you can find cool and interesting stuff to read. Whether you love blogs or you're new to them, we've got something for you. We talk about all kinds of things, like new gadgets, tips for everyday life, fun trips, and ways to grow as a person. You'll find lots of stories here that will make you curious, make you think, and maybe even change your mind about some things. We want you to join us on this journey. Let's explore new ideas together and share our experiences. So, get comfy, grab a drink, and let's start the adventure! We'll keep you updated with new stories regularly. Thanks for coming along – we're super excited to have you here!
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Aboutsite;
