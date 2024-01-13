import Publication from "../Schemas/Publication.js"
import ImgFile from '../Schemas/Img.js'

//Create
export const createPublication = async (req, res) => {

    const { title, tech, content, date } = req.body;
    const latestImage = await ImgFile.findOne().sort({ uploadedAt: -1 }).limit(1);
    const latestImageId = latestImage._id;


  try {
    const newPublication = new Publication({
      title,
      content,
      tech,
      img: latestImageId,
      date,
    });

    const PublicationSaved = await newPublication.save();

    res.status(201).json(PublicationSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//Get
export const getPublication = async (req, res) => {
  try {
    const Publications = await Publication.find({});
    return res.json(Publications);
  }
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
};

//Update
export const updatePublicationById = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, img, date } = req.body

    const existingPublication = await Publication.findById(id);
    if (!existingPublication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    await Publication.findByIdAndUpdate(id, {
      title: title,
      content: content,
      tech: tech,
      img: img,
      date: date
    });

    const updatedPublication = await Publication.findById(id);
    return res.json(updatedPublication);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete
export const deletePublicationById = async (req, res) => {
  try {
    const { id } = req.params;
    await Publication.findByIdAndDelete(id);
    res.json({ msg: "Publication deleted" })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
}

};
