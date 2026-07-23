import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoginModal from "../components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { Coins } from "lucide-react";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
function Home() {
  const highlights = [
    {
      title: "AI Generated Code",
      description:
        "GenWeb.ai builds real websites - clean code, animations, responsiveness and scalable structure.",
    },
    {
      title: "Fully Responsive Layouts",
      description:
        "Adaptive designs that work flawlessly across all devices. Your website automatically adjusts to any screen size for optimal viewing experience.",
    },
    {
      title: "Production Ready Output",
      description:
        "Deploy-ready code with modern best practices. Get clean, maintainable code that's ready to ship to production immediately.",
    },
  ];

  const [openLogin, setOpenLogin] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const [websites, setWebsites]=useState(null)
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const handleLogOut=async ()=>{
    console.log("logoutclick")
    try {
      await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      dispatch(setUserData(null))
      setOpenProfile(false)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(!userData)return;
    const handleGetWebsite = async ()=>{
      
      try{
        const result=await axios.get(`${serverUrl}/api/website/get-all`,{withCredentials:true})
        setWebsites(result.data || [])
        
      } catch (error){
          console.log(error)
         
      }
    }
    handleGetWebsite()
  },[userData])

  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40
        border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold">GenWeb.ai</div>
          <div className="flex items-center gap-5">
            <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer"
            onClick={()=>navigate("/Pricing")}>
              Pricing
            </div>
            {userData && (
              <div
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full
                    bg-white/5 border border-white/10 text-sm cursor-pointer
                    hover:bg-white/10 transition" onClick={()=>navigate("/Pricing")}
              >
                <Coins size={14} className="text-yellow-400" />
                <span className="text-zinc-300">Credits</span>
                <span>{userData.credits}</span>
                <span className="font-semibold">+</span>
              </div>
            )}
            {!userData ? (
              <button
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm"
                onClick={() => setOpenLogin(true)}
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <img
                    src={
                      userData.avatar ||
                      `https://ui-avatars.com/api/?name=${userData.name}`
                    }
                    alt=""
                    className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-white/20"
                    referrerPolicy="no-referrer"
                  />
                </button>
                <AnimatePresence>
                  {openProfile && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 z-50 rounded-xl
                        bg-[#0b0b0b] border border-white/10 shadow-2xl
                        overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium truncate">
                            {userData.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {userData.email}
                          </p>
                        </div>
                        <button className="md:hidden w-full px-4 py-3 flex
                        items-center gap-2 text-sm border-b border-white/10
                         hover:bg-white/5">
                          <Coins size={14} className="text-yellow-400" />
                          <span className="text-zinc-300">Credits</span>
                          <span>{userData.credits}</span>
                          <span className="font-semibold">+</span>
                        </button>
                        <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/5"
                        onClick={()=>navigate("/dashboard")}>Dashboard</button>
                        <button 
                          onClick={handleLogOut}
                          className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5"
                        >
                          LogOut
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <section className="pt-44 pb-32 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Build Stunning Websites
          <br />
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            with AI
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg"
        >
          Describe your idea and let AI generate a modern, responsive,
          production-ready website.
        </motion.p>

        <button
          className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105
                transition mt-12" onClick={()=> userData? navigate("/dashboard"):setOpenLogin(true)}
        >{userData?"Go to dashboard":"Get started"}
        </button>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-8"
            >
              <h1 className="text-xl font-semibold mb-3">{h.title}</h1>
              <p className="text-sm text-zinc-400">{h.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {userData && websites?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <h3 className="text-2xl font-semibold mb-8">Your Websites</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websites.slice(0, 6).map((site, i) => (
              <motion.div
                key={site._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/editor/${site._id}`)}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition cursor-pointer group"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <iframe
                    srcDoc={site.latestCode}
                    className="w-full h-full pointer-events-none scale-[0.35] origin-top-left"
                    style={{ width: "285%", height: "285%" }}
                    title={site.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{site.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    {new Date(site.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          {websites.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition"
              >
                View All Websites
              </button>
            </div>
          )}
        </section>
      )}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} GenWeb.ai
      </footer>
      {openLogin && (
        <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </div>
  );
}

export default Home;
