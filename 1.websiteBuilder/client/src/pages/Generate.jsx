import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

function Generate() {
  const navigate = useNavigate();
  const [prompt,setPrompt] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState("")
  
  const handleGenerateWebsite=async ()=>{
    if(!prompt.trim()){
      alert("Please describe your website")
      return
    }
    setLoading(true)
    setError("")
    setProgress(0)
    
    // Simulate progress
    const progressSteps = [
      { percent: 10, text: "Analyzing your idea..." },
      { percent: 25, text: "Designing layout..." },
      { percent: 45, text: "Crafting HTML structure..." },
      { percent: 65, text: "Styling with CSS..." },
      { percent: 80, text: "Adding interactions..." },
      { percent: 95, text: "Finalizing website..." }
    ]
    
    let currentStep = 0
    const progressInterval = setInterval(() => {
      if (currentStep < progressSteps.length) {
        setProgress(progressSteps[currentStep].percent)
        setProgressText(progressSteps[currentStep].text)
        currentStep++
      }
    }, 8000) // Change every 8 seconds
    
    try {
      const result=await axios.post(`${serverUrl}/api/website/generate`,{prompt},
        {
          withCredentials:true,
          timeout: 180000 // 3 minutes timeout
        })
        clearInterval(progressInterval)
        setProgress(100)
        setProgressText("Complete!")
        console.log("Generate result:", result)
        console.log("Website ID:", result.data.websiteId)
        const websiteId = result.data.websiteId
        setTimeout(() => navigate(`/editor/${websiteId}`), 500)
    } catch (error) {
      clearInterval(progressInterval)
      console.log("Generate error:", error)
      setLoading(false)
      setProgress(0)
      setError(error.response?.data?.message || error.message || "Failed to generate website. Please try again.")
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white">
      <div className="sticky top-0 z-40 background-blur-xl bg-black/50 border-b border-white/10">
        <div
          className="max-w-7xl mx-auto px-6 h-16 flex items-center
      justify-between"
        >
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-ig hover:bg-white/10
          transition"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-semibold">
              Geneweb<span className="text-zinc-400">.ai</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Build Websites with
            <span
              className="block bg-linear-to-r from-white to-zinc-400 bg-clip-text
            text-transparent"
            >
              Real AI Power
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            This process may take several minutes. genweb.ai focuses on quality,
            not shortcuts.
          </p>
        </motion.div>
        <div className="mb-14">
          <h1 className="text-xl font-semibold mb-2">Describe your website</h1>
          <div className="relative">
            <textarea
              onChange={(e)=>setPrompt(e.target.value)}
              value={prompt}
              placeholder="Describe your website in detail..."
              className="w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale :1.05}}
            whileTap={{ scale : 0.96}}
            onClick={handleGenerateWebsite}
            disabled={loading}
            className="px-14 py-4 rounded-2xl font-semibold text-lg bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate Website"}
          </motion.button>
        </div>
        
        {/* Progress Bar */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-zinc-400">{progressText}</p>
              <p className="text-sm text-zinc-400">{progress}%</p>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            </div>
          </motion.div>
        )}
        
        {error && (
          <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Generate;
