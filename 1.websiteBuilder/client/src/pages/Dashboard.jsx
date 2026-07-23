import React, { useEffect, useState } from 'react'
import { ArrowLeft, Rocket, Share2 } from 'lucide-react'
import { motion } from "motion/react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios'

function Dashboard() {
  const {userData} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const [websites,setWebsites]=useState(null)
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState("")
  const [copiedId,setCopiedId] = useState("null")
  const handleDeploy = async ()=> {
    try {
      const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`,
        {withCredentials:true}
      )
      window.open(`${result.data.url}`,"_blank")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    const handleGetWebsite = async ()=>{
      setLoading(true)
      try{
        const result=await axios.get(`${serverUrl}/api/website/get-all`,{withCredentials:true})
        setWebsites(result.data || [])
        setLoading(false)
      } catch (error){
          console.log(error)
          setError(error.response.data.message)
          setLoading(false)
      }
    }
    handleGetWebsite()
  },[])
  const handleCopy=async(site)=>{
    await navigator.clipboard.writeText(site.deployUrl)
    setCopiedId(site._id)
    setTimeout(()=>setCopiedId(null),2000)
  }


  return (
    <div className='min-h-screen bg-[#050505] text-white'>
      <div className='sticky top-0 z-40 background-blur-xl bg-black/50 border-b border-white/10'>
      <div className='max-w-7xl mx-auto px-6 h-16 flex items-center
      justify-between'>
        <div className='flex items-center gap-4'>
          <button className='p-2 rounded-ig hover:bg-white/10
          transition' onClick={()=>navigate("/")}><ArrowLeft size={16}/></button>
          <h1 className='text-lg font-semibold'>Dashboard</h1>

        </div>
        <button className='px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition'
        onClick={()=>navigate("/generate")}>
          + New Website

        </button>

      </div>
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <motion.div
          initial={{ opacity: 0, y: 12}}
          animate={{ opacity : 1, y: 0}}
          className='mb-10'  
        >
          <p className='text-sm text-zinc-400 mb-1'>Welcome Back</p>
          <h1 className='text-3xl font-bold'>{userData.name}</h1>
        </motion.div>
        {loading && (
          <div className='text-center text-zinc-400'>Loading Your Websites...</div>
        )}
        {error && (
          <div className='text-center text-red-400'>{error}</div>
        )}
        {!loading && !error && websites && websites.length === 0 && (
          <div className='text-center text-zinc-400'>
            <p className='mb-4'>No websites yet</p>
            <button 
              onClick={()=>navigate("/generate")}
              className='px-6 py-3 rounded-lg bg-white text-black font-semibold hover:scale-105 transition'
            >
              Create Your First Website
            </button>
          </div>
        )}
        {!loading && !error && websites && websites.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
            {websites.map((site, i) => {

              const copied=copiedId===websites._id
              return <motion.div
                key={site._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05}}
                whileHover={{ y: -6 }}
                onClick={()=>navigate(`/editor/${w._id}`)}
                className='rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition group'
              >
                {/* Preview thumbnail */}
                <div 
                  className='relative aspect-video bg-black overflow-hidden cursor-pointer'
                  onClick={() => navigate(`/editor/${site._id}`)}
                >
                  <iframe
                    srcDoc={site.latestCode}
                    className='w-full h-full pointer-events-none scale-[0.35] origin-top-left'
                    style={{ width: '285%', height: '285%' }}
                    title={site.title}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition' />
                </div>
                
                {/* Card content */}
                <div className='p-4'>
                  <h3 
                    className='text-lg font-semibold mb-2 truncate cursor-pointer hover:text-zinc-300'
                    onClick={() => navigate(`/editor/${site._id}`)}
                  >
                    {site.title}
                  </h3>
                  <p className='text-sm text-zinc-400 mb-3'>
                    Last Updated {new Date(site.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <button
                    onClick={() => navigate(`/site/${site._id}`)}
                    className='w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold hover:scale-105 transition mb-2'
                  >
                    <Rocket size={16} />
                    Deploy
                  </button>
                  
                  <motion.button
                    onClick={() => {
                      const link = `${window.location.origin}/site/${site._id}`;
                      navigator.clipboard.writeText(link);
                      alert('Link copied to clipboard!');
                    }}
                    className='w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition'
                  >
                    { copied ?(
                      <>
                      <Check size ={14}/>
                      Link Copied
                        </>
                    ):
                    <>
                    <Share2 size={16} />
                    Share Link
                    </>
                  }
                  </motion.button>
                </div>
              </motion.div>
})}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default Dashboard
