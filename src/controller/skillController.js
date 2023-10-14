import Skill from "../Schemas/Skill.js";


//Create
export const createSkill = async (req, res) => {
  const {title, imgSkill} = req.body;

  try {
    const newSkill = new Skill({
      title,
      imgSkill,

    });

    const SkillSaved = await newSkill.save();

    res.status(201).json(SkillSaved);
  } catch (error){
    console.log(error);
    return res.status(500).json(error);
  }
};

//Get
export const getSkill = async (req, res) => {
  try {
    const Skills = await Skill.find({});
    return res.json(Skills);
  }
  catch (error){
    return res.status(500).json({msg: error.message})
  }
};
//Delete
export const deleteSkillById = async (req, res) =>{
  try{
    const {id} = req.params;
    await Skill.findByIdAndDelete(id);
    res.json({ msg: "Skill delete"})
  } catch (error){
    return res.status(500).json({ msg: error.message})
  }
};










