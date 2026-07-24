import { generateResponse } from "../config/openRouter.js";
import Website from "../models/website.model.js";
import User from "../models/user.model.js";
import extractJson from "../utils/extractJson.js";

const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT
AND A SENIOR UI/UX ENGINEER
SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO BASIC SITES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
--------------------------------------------------
- Premium, modern UI (2026–2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- SPA-style multi-page experience
- Production-ready, readable code

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons
--------------------------------------------------
SPA VISIBILITY RULE (MANDATORY)
--------------------------------------------------
- Pages MUST NOT be hidden permanently
- If .page { display: none } is used,
  then .page.active { display: block } is REQUIRED
- At least ONE page MUST be visible on initial load
- Hiding all content is INVALID


--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home
- About
- Services / Features
- Contact

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS
- Active nav state must update
- Forms must have JS validation
- Buttons must show hover + active states
- Smooth section/page transitions

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY)
--------------------------------------------------
BEFORE RESPONDING, ENSURE:

1. Layout works on mobile, tablet, desktop
2. No horizontal scroll on mobile
3. All images are responsive
4. All sections adapt properly
5. Media queries are present and used
6. Navigation works on all screen sizes
7. At least ONE page is visible without user interaction

IF ANY CHECK FAILS → RESPONSE IS INVALID

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;

export const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "prompt is required" });
    }
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.credits < 50) {
      return res
        .status(400)
        .json({ message: "you have not enough credits to generate a website" });
    }
    const finalPrompt = masterPrompt.replace("USER_PROMPT", prompt);
    let raw = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(finalPrompt);
      parsed = await extractJson(raw);
      if (!parsed) {
        raw = await generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON.");
        parsed = await extractJson(raw);
      }
    }

    if (!parsed.code) {
      console.log("ai returned invalid response", raw);
      return res.status(400).json({ message: "ai returned invalid response" });
    }

    // Generate unique slug
    const slug = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const newWebsite = await Website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestCode: parsed.code,
      slug: slug,
      conversation: [
        {
          role: "ai",
          content: parsed.message,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    user.credits = user.credits - 50;
    await user.save();

    return res.status(201).json({
      websiteId: newWebsite._id,
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.error("Generate website error:", error);
    return res
      .status(500)
      .json({ message: `generate website error ${error.message}` });
  }
};

export const getWebsiteById = async (req, res) => {
  try {
    console.log("Getting website with ID:", req.params.id);
    console.log("For user:", req.user?._id);

    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!website) {
      return res
        .status(404)
        .json({ message: "website not found or doesn't belong to you" });
    }

    return res.status(200).json(website);
  } catch (error) {
    console.error("Get website by id error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "invalid website ID format" });
    }
    return res
      .status(500)
      .json({ message: `get website by id error ${error.message}` });
  }
};
export const changes = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    console.log("Update request - ID:", req.params.id);
    console.log("Update request - Prompt:", prompt);
    console.log("Update request - User:", req.user?._id);
    
    if (!prompt) {
      return res.status(400).json({ message: "prompt is required" });
    }
    
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    console.log("Website found:", website ? "yes" : "no");

    if (!website) {
      return res
        .status(404)
        .json({ message: "website not found or doesn't belong to you" });
    }
    const user = await User.findById(req.user._id);

    console.log("User found:", user ? "yes" : "no");
    console.log("User credits:", user?.credits);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.credits < 25) {
      return res
        .status(400)
        .json({ message: "you have not enough credits to generate a website" });
    }
    const updatePrompt=`
    UPDATE THIS HTML WEBSITE.
    CURRENT CODE:
    ${website.latestCode}

    USER REQUEST:
    ${prompt}
    RETURN RAW JSON ONLY:
    {
      "message": "short confirmation",
      "code" : "<UPDATED FULL HTML>"
    }
    `
    let raw = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(updatePrompt);
      parsed = await extractJson(raw);
      if (!parsed) {
        raw = await generateResponse(updatePrompt + "\n\nRETURN ONLY RAW JSON.");
        parsed = await extractJson(raw);
      }
    }

    if (!parsed.code) {
      console.log("ai returned invalid response", raw);
      return res.status(400).json({ message: "ai returned invalid response" });
    }

    website.latestCode = parsed.code;
    website.conversation.push({
      role: "user",
      content: prompt,
    });
    website.conversation.push({
      role: "ai",
      content: parsed.message,
    });

    await website.save();

    user.credits = user.credits - 25;
    await user.save();

    return res.status(200).json({
      message: parsed.message,
      code: parsed.code,
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.error("Changes error:", error);
    return res
      .status(500)
      .json({ message: `changes error ${error.message}` });
  }
};
export const getAll=async(req,res) => {
  try {
    const websites=await Website.find({user:req.user._id})
    return res.status(200).json(websites)
  } catch (error) {
    return res.status(500).json({ message : `get all websites error ${error}`})
  }
}

export const deploy=async (req,res)=>{
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user : req.user._id
    })

    if(!website){
      return res.status(400).json({ message: "website not found" })
    }

    if(!website.slug){
      website.slug= website.title.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,60)+website._id.toString().slice(-5)
    }
    website.deployed=true
    website.deployUrl=`${process.env.FRONTEND_URL}/site/${website.slug}`
    await website.save()
    return res.status(200).json({
      url:website.deployUrl
    })
  } catch (error) {
     return res.status(500).json({ message : `deploy websites error ${error}`})
  
  }
}

export const getBySlug=async (req,res)=>{
  try {
     const website = await Website.findOne({
      slug: req.params.slug,
      user : req.user._id
    })

    if(!website){
      return res.status(400).json({ message: "website not found" })
    }
    return res.status(200).json(website)
  } catch (error) {
     return res.status(500).json({ message : `get by slug websites error ${error}`})
  }
}

export const markDeployed = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!website) {
      return res.status(404).json({ message: "website not found" });
    }

    website.deployed = true;
    await website.save();

    return res.status(200).json({ message: "website marked as deployed" });
  } catch (error) {
    console.error("Mark deployed error:", error);
    return res.status(500).json({ message: `mark deployed error ${error.message}` });
  }
};

// Public endpoint - no authentication required
export const getPublicWebsite = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      deployed: true, // Only show deployed websites publicly
    });

    if (!website) {
      return res.status(404).json({ message: "website not found or not deployed" });
    }

    // Only return the code, not sensitive info like user ID or conversation
    return res.status(200).json({
      title: website.title,
      latestCode: website.latestCode,
    });
  } catch (error) {
    console.error("Get public website error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "invalid website ID format" });
    }
    return res.status(500).json({ message: `get public website error ${error.message}` });
  }
};
